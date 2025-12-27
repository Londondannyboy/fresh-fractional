import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { getDatasetItems, isFractionalRole, type NormalizedJob } from '@/lib/apify'

const sql = neon(process.env.DATABASE_URL!)

/**
 * POST /api/webhooks/apify
 * Webhook endpoint for Apify run completion notifications
 *
 * Apify sends a POST request when an actor run completes with:
 * - resource.defaultDatasetId: the dataset containing results
 * - eventType: 'ACTOR.RUN.SUCCEEDED' | 'ACTOR.RUN.FAILED' etc.
 */
export async function POST(request: NextRequest) {
  // Verify webhook secret (optional but recommended)
  const webhookSecret = process.env.APIFY_WEBHOOK_SECRET
  const authHeader = request.headers.get('authorization')

  if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
    console.warn('Apify webhook: invalid authorization')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await request.json()

    console.log('Apify webhook received:', {
      eventType: payload.eventType,
      actorId: payload.resource?.actorId,
      runId: payload.resource?.id,
    })

    // Only process successful runs
    if (payload.eventType !== 'ACTOR.RUN.SUCCEEDED') {
      return NextResponse.json({
        success: true,
        message: `Ignoring event type: ${payload.eventType}`,
      })
    }

    const datasetId = payload.resource?.defaultDatasetId
    if (!datasetId) {
      return NextResponse.json({
        success: false,
        error: 'No datasetId in webhook payload',
      }, { status: 400 })
    }

    // Fetch jobs from the dataset
    console.log(`Fetching jobs from Apify dataset: ${datasetId}`)
    const rawJobs = await getDatasetItems(datasetId, 500)

    if (rawJobs.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No jobs in dataset',
        stats: { fetched: 0, inserted: 0, updated: 0 },
      })
    }

    // Transform raw jobs to normalized format
    // Note: The dataset items are already transformed by getDatasetItems
    // We need to manually transform here since we're getting raw ApifyJob objects
    const jobs = rawJobs.map(job => transformApifyJobForDb(job))

    // Filter to only fractional/interim roles
    const fractionalJobs = jobs.filter(job => isFractionalRole(job.title))

    console.log(`Found ${fractionalJobs.length} fractional jobs out of ${jobs.length} total from Apify`)

    let inserted = 0
    let updated = 0
    let skipped = 0

    for (const job of fractionalJobs) {
      try {
        const slug = generateSlug(job.title, job.company_name)

        // Check if job already exists
        const existing = await sql`
          SELECT id FROM jobs WHERE source_url = ${job.source_url} OR slug = ${slug}
        `

        if (existing.length > 0) {
          // Update existing job
          await sql`
            UPDATE jobs SET
              title = ${job.title},
              company_name = ${job.company_name},
              company_logo = ${job.company_logo},
              location = ${job.location},
              is_remote = ${job.is_remote},
              workplace_type = ${job.workplace_type},
              compensation = ${job.compensation || formatDayRate(job.estimated_day_rate)},
              role_category = ${job.role_category},
              posted_date = ${job.posted_date},
              valid_through = ${job.valid_through},
              source_url = ${job.source_url},
              job_source = ${job.job_source},
              is_active = true,
              description_snippet = ${job.description_snippet},
              updated_at = NOW()
            WHERE id = ${(existing[0] as { id: string }).id}
          `
          updated++
        } else {
          // Insert new job
          await sql`
            INSERT INTO jobs (
              slug, title, company_name, company_logo, location,
              is_remote, workplace_type, compensation, role_category,
              posted_date, valid_through, source_url, job_source,
              is_active, is_fractional, description_snippet,
              created_at, updated_at
            ) VALUES (
              ${slug}, ${job.title}, ${job.company_name}, ${job.company_logo},
              ${job.location}, ${job.is_remote}, ${job.workplace_type},
              ${job.compensation || formatDayRate(job.estimated_day_rate)},
              ${job.role_category}, ${job.posted_date}, ${job.valid_through},
              ${job.source_url}, ${job.job_source}, true, true,
              ${job.description_snippet}, NOW(), NOW()
            )
            ON CONFLICT (slug) DO UPDATE SET
              title = EXCLUDED.title,
              company_name = EXCLUDED.company_name,
              is_active = true,
              updated_at = NOW()
          `
          inserted++
        }
      } catch (jobError) {
        console.error(`Error processing Apify job "${job.title}":`, jobError)
        skipped++
      }
    }

    const stats = {
      datasetId,
      fetched: jobs.length,
      fractionalFiltered: fractionalJobs.length,
      inserted,
      updated,
      skipped,
    }

    console.log('Apify webhook sync complete:', stats)

    return NextResponse.json({
      success: true,
      message: `Synced ${inserted} new jobs, updated ${updated}`,
      stats,
    })
  } catch (error) {
    console.error('Apify webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed', details: String(error) },
      { status: 500 }
    )
  }
}

/**
 * Transform raw Apify job to database format
 */
function transformApifyJobForDb(raw: any): NormalizedJob {
  const roleCategory = categorizeRole(raw.title)

  let workplaceType: 'Remote' | 'Hybrid' | 'On-site' = 'On-site'
  if (raw.remote_derived) {
    workplaceType = 'Remote'
  } else if (raw.ai_work_arrangement?.toLowerCase().includes('hybrid') || raw.title.toLowerCase().includes('hybrid')) {
    workplaceType = 'Hybrid'
  }

  const postedDate = new Date(raw.date_posted || raw.date_created || Date.now())
  const validThrough = raw.date_validthrough
    ? new Date(raw.date_validthrough)
    : new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000)

  return {
    title: raw.title,
    company_name: raw.organization,
    company_logo: raw.organization_logo || null,
    location: raw.locations_derived?.[0] || raw.cities_derived?.[0] || 'UK',
    is_remote: raw.remote_derived || false,
    workplace_type: workplaceType,
    compensation: formatAiSalary(raw),
    role_category: roleCategory,
    posted_date: postedDate,
    valid_through: validThrough,
    source_url: raw.url,
    job_source: raw.source ? `${raw.source} (Apify)` : 'LinkedIn (Apify)',
    is_active: true,
    description_snippet: raw.description_text?.substring(0, 200).replace(/\s+/g, ' ').trim() + '...' || raw.ai_core_responsibilities || null,
    estimated_day_rate: SALARY_ESTIMATES[roleCategory] || SALARY_ESTIMATES.default,
  }
}

function categorizeRole(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('ceo') || t.includes('chief executive') || t.includes('managing director')) return 'Executive'
  if (t.includes('cfo') || t.includes('chief financial') || t.includes('finance director') || t.includes('accountant')) return 'Finance'
  if (t.includes('cto') || t.includes('chief technology') || t.includes('tech director') || t.includes('engineering')) return 'Engineering'
  if (t.includes('cmo') || t.includes('chief marketing') || t.includes('marketing director') || t.includes('growth')) return 'Marketing'
  if (t.includes('coo') || t.includes('chief operating') || t.includes('operations director')) return 'Operations'
  if (t.includes('chro') || t.includes('chief people') || t.includes('hr director') || t.includes('people')) return 'HR'
  if (t.includes('cpo') || t.includes('chief product') || t.includes('product director')) return 'Product'
  if (t.includes('cro') || t.includes('chief revenue') || t.includes('sales director') || t.includes('sales')) return 'Sales'
  if (t.includes('ciso') || t.includes('security')) return 'CISO'
  return 'Executive'
}

function formatAiSalary(job: any): string | null {
  if (!job.ai_salary_value) return job.salary_raw || null
  const currency = job.ai_salary_currency === 'GBP' ? '£' : job.ai_salary_currency || '£'
  const unit = job.ai_salary_unittext?.toLowerCase()
  if (unit === 'day') return `${currency}${job.ai_salary_value}/day`
  if (unit === 'year') {
    const dayRate = Math.round(job.ai_salary_value / 220)
    return `~${currency}${dayRate}/day`
  }
  return job.salary_raw || null
}

const SALARY_ESTIMATES: Record<string, { min: number; max: number }> = {
  'Executive': { min: 1000, max: 2000 },
  'Finance': { min: 900, max: 1500 },
  'Engineering': { min: 850, max: 1600 },
  'Marketing': { min: 800, max: 1400 },
  'Operations': { min: 850, max: 1400 },
  'HR': { min: 700, max: 1200 },
  'Product': { min: 800, max: 1300 },
  'Sales': { min: 750, max: 1300 },
  'CISO': { min: 900, max: 1500 },
  'default': { min: 700, max: 1200 },
}

function generateSlug(title: string, company: string): string {
  const combined = `${title} ${company}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80)
  const suffix = Math.random().toString(36).substring(2, 6)
  return `${combined}-${suffix}`
}

function formatDayRate(rate: { min: number; max: number } | null): string | null {
  if (!rate) return null
  return `£${rate.min}-£${rate.max}/day`
}

// Allow longer processing time for webhook
export const maxDuration = 120
