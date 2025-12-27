import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { syncAllApifyJobs, isFractionalRole, type NormalizedJob } from '@/lib/apify'

const sql = neon(process.env.DATABASE_URL!)

/**
 * POST /api/jobs/sync-apify
 * Manual sync endpoint to pull jobs from Apify APIs
 *
 * Can be used for:
 * - Manual syncs triggered by admin
 * - Fallback if webhooks don't work
 * - Testing the integration
 */
export async function POST(request: NextRequest) {
  // Verify authorization
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (process.env.NODE_ENV === 'production' && cronSecret) {
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  try {
    console.log('Starting Apify job sync...')

    // Fetch all jobs from both LinkedIn and Career Site APIs
    const jobs = await syncAllApifyJobs()

    if (jobs.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No jobs found from Apify APIs',
        stats: { fetched: 0, inserted: 0, updated: 0, skipped: 0 },
      })
    }

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

    // Mark old jobs as inactive (not updated in 14 days)
    const deactivated = await sql`
      UPDATE jobs SET is_active = false
      WHERE job_source LIKE '%Apify%'
        AND updated_at < NOW() - INTERVAL '14 days'
        AND is_active = true
      RETURNING id
    `

    const stats = {
      fetched: jobs.length,
      fractionalFiltered: fractionalJobs.length,
      inserted,
      updated,
      skipped,
      deactivated: deactivated.length,
    }

    console.log('Apify job sync complete:', stats)

    return NextResponse.json({
      success: true,
      message: `Synced ${inserted} new jobs, updated ${updated}, skipped ${skipped}`,
      stats,
    })
  } catch (error) {
    console.error('Apify sync error:', error)
    return NextResponse.json(
      { error: 'Sync failed', details: String(error) },
      { status: 500 }
    )
  }
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

// Allow longer processing time
export const maxDuration = 300
