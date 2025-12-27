/**
 * Apify Jobs API Client
 *
 * Uses Fantastic.jobs actors on Apify for job data:
 * - LinkedIn API: $1.50/1000 jobs, 10M+ jobs/month
 * - Career Site API: $4/1000 jobs, 2M+ jobs
 *
 * Benefits over RapidAPI:
 * - Pay per result (not per request)
 * - Built-in scheduling
 * - Dataset persistence (reads are free)
 * - Webhooks for completion notifications
 */

const APIFY_TOKEN = process.env.APIFY_API_TOKEN
const APIFY_BASE_URL = 'https://api.apify.com/v2'

// Actor IDs
export const ACTORS = {
  LINKEDIN: 'fantastic-jobs/advanced-linkedin-job-search-api',
  CAREER_SITE: 'fantastic-jobs/career-site-job-listing-api',
} as const

// Raw job from Apify APIs (both LinkedIn and Career Site have similar structure)
export interface ApifyJob {
  id: string
  title: string
  organization: string
  organization_url?: string
  organization_logo?: string
  url: string
  date_posted: string
  date_created?: string
  date_validthrough?: string | null
  salary_raw?: string | null
  employment_type?: string[]
  locations_derived?: string[]
  cities_derived?: string[]
  countries_derived?: string[]
  remote_derived?: boolean
  source?: string
  source_type?: string
  description_text?: string
  // AI enriched fields
  ai_salary_value?: number
  ai_salary_currency?: string
  ai_salary_unittext?: string
  ai_key_skills?: string[]
  ai_benefits?: string[]
  ai_experience_level?: string
  ai_work_arrangement?: string
  ai_core_responsibilities?: string
  ai_requirements_summary?: string
}

// Our normalized job schema (same as fantastic-jobs.ts)
export interface NormalizedJob {
  title: string
  company_name: string
  company_logo: string | null
  location: string
  is_remote: boolean
  workplace_type: 'Remote' | 'Hybrid' | 'On-site'
  compensation: string | null
  role_category: string
  posted_date: Date
  valid_through: Date | null
  source_url: string
  job_source: string
  is_active: boolean
  description_snippet: string | null
  estimated_day_rate: { min: number; max: number } | null
  // Additional Apify fields
  ai_skills?: string[]
  ai_benefits?: string[]
}

// Role-based salary estimates for day rates (GBP)
const SALARY_ESTIMATES: Record<string, { min: number; max: number }> = {
  'Executive': { min: 1000, max: 2000 },
  'CEO': { min: 1000, max: 2000 },
  'CFO': { min: 900, max: 1500 },
  'Finance': { min: 900, max: 1500 },
  'CTO': { min: 850, max: 1600 },
  'Engineering': { min: 850, max: 1600 },
  'CMO': { min: 800, max: 1400 },
  'Marketing': { min: 800, max: 1400 },
  'COO': { min: 850, max: 1400 },
  'Operations': { min: 850, max: 1400 },
  'HR': { min: 700, max: 1200 },
  'CHRO': { min: 800, max: 1300 },
  'Product': { min: 800, max: 1300 },
  'CPO': { min: 800, max: 1300 },
  'Sales': { min: 750, max: 1300 },
  'CRO': { min: 800, max: 1400 },
  'CISO': { min: 900, max: 1500 },
  'default': { min: 700, max: 1200 },
}

/**
 * Categorize role based on title keywords
 */
function categorizeRole(title: string): string {
  const t = title.toLowerCase()

  if (t.includes('ceo') || t.includes('chief executive') || t.includes('managing director')) return 'Executive'
  if (t.includes('cfo') || t.includes('chief financial') || t.includes('finance director') || t.includes('accountant')) return 'Finance'
  if (t.includes('cto') || t.includes('chief technology') || t.includes('tech director') || t.includes('engineering')) return 'Engineering'
  if (t.includes('cmo') || t.includes('chief marketing') || t.includes('marketing director') || t.includes('growth')) return 'Marketing'
  if (t.includes('coo') || t.includes('chief operating') || t.includes('operations director')) return 'Operations'
  if (t.includes('chro') || t.includes('chief people') || t.includes('hr director') || t.includes('people')) return 'HR'
  if (t.includes('cpo') || t.includes('chief product') || t.includes('product director') || t.includes('head of product')) return 'Product'
  if (t.includes('cro') || t.includes('chief revenue') || t.includes('sales director') || t.includes('sales manager')) return 'Sales'
  if (t.includes('ciso') || t.includes('security') || t.includes('information security')) return 'CISO'
  if (t.includes('quality')) return 'Operations'

  return 'Executive'
}

/**
 * Format AI salary data to compensation string
 */
function formatAiSalary(job: ApifyJob): string | null {
  if (!job.ai_salary_value) return job.salary_raw || null

  const currency = job.ai_salary_currency === 'GBP' ? '£' : job.ai_salary_currency || '£'
  const unit = job.ai_salary_unittext?.toLowerCase()

  if (unit === 'day') {
    return `${currency}${job.ai_salary_value}/day`
  } else if (unit === 'year') {
    // Convert annual to estimated day rate (assuming 220 working days)
    const dayRate = Math.round(job.ai_salary_value / 220)
    return `~${currency}${dayRate}/day (${currency}${(job.ai_salary_value / 1000).toFixed(0)}k/yr)`
  }

  return job.salary_raw || null
}

/**
 * Transform Apify job to our normalized schema
 */
function transformApifyJob(job: ApifyJob, source: 'linkedin' | 'career-site'): NormalizedJob {
  const roleCategory = categorizeRole(job.title)
  const location = job.locations_derived?.[0] || job.cities_derived?.[0] || 'UK'

  // Determine workplace type
  let workplaceType: 'Remote' | 'Hybrid' | 'On-site' = 'On-site'
  if (job.remote_derived) {
    workplaceType = 'Remote'
  } else if (job.ai_work_arrangement?.toLowerCase().includes('hybrid')) {
    workplaceType = 'Hybrid'
  } else if (job.title.toLowerCase().includes('hybrid')) {
    workplaceType = 'Hybrid'
  }

  // Generate description snippet
  const descriptionSnippet = job.description_text
    ? job.description_text.substring(0, 200).replace(/\s+/g, ' ').trim() + '...'
    : job.ai_core_responsibilities || null

  // Calculate valid_through
  const postedDate = new Date(job.date_posted || job.date_created || Date.now())
  const validThrough = job.date_validthrough
    ? new Date(job.date_validthrough)
    : new Date(postedDate.getTime() + 30 * 24 * 60 * 60 * 1000)

  return {
    title: job.title,
    company_name: job.organization,
    company_logo: job.organization_logo || null,
    location,
    is_remote: job.remote_derived || false,
    workplace_type: workplaceType,
    compensation: formatAiSalary(job),
    role_category: roleCategory,
    posted_date: postedDate,
    valid_through: validThrough,
    source_url: job.url,
    job_source: source === 'linkedin' ? 'LinkedIn (Apify)' : job.source || 'Career Site (Apify)',
    is_active: true,
    description_snippet: descriptionSnippet,
    estimated_day_rate: SALARY_ESTIMATES[roleCategory] || SALARY_ESTIMATES.default,
    ai_skills: job.ai_key_skills,
    ai_benefits: job.ai_benefits,
  }
}

/**
 * Run an Apify actor and wait for results
 */
export async function runActorSync(
  actorId: string,
  input: Record<string, unknown>,
  timeoutMs = 120000
): Promise<ApifyJob[]> {
  if (!APIFY_TOKEN) {
    console.warn('APIFY_API_TOKEN not set - skipping Apify fetch')
    return []
  }

  const url = `${APIFY_BASE_URL}/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}`

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), timeoutMs)

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: response.statusText }))
      console.error('Apify actor error:', error)
      return []
    }

    const jobs: ApifyJob[] = await response.json()
    return Array.isArray(jobs) ? jobs : []
  } catch (error) {
    console.error('Error running Apify actor:', error)
    return []
  }
}

/**
 * Get items from an existing Apify dataset
 */
export async function getDatasetItems(
  datasetId: string,
  limit = 1000,
  offset = 0
): Promise<ApifyJob[]> {
  if (!APIFY_TOKEN) return []

  const url = `${APIFY_BASE_URL}/datasets/${datasetId}/items?token=${APIFY_TOKEN}&limit=${limit}&offset=${offset}`

  try {
    const response = await fetch(url)
    if (!response.ok) return []

    const jobs: ApifyJob[] = await response.json()
    return Array.isArray(jobs) ? jobs : []
  } catch (error) {
    console.error('Error fetching dataset:', error)
    return []
  }
}

/**
 * Fetch fractional jobs from LinkedIn API
 */
export async function fetchLinkedInJobs(
  titleSearch: string[],
  locationSearch: string[] = ['United Kingdom'],
  limit = 10
): Promise<NormalizedJob[]> {
  const jobs = await runActorSync(ACTORS.LINKEDIN, {
    titleSearch,
    locationSearch,
    timeRange: '7d', // LinkedIn only supports 1h, 24h, 7d
    limit: Math.max(10, limit), // Minimum 10
    includeAi: true,
  })

  return jobs.map(job => transformApifyJob(job, 'linkedin'))
}

/**
 * Fetch jobs from Career Site API
 */
export async function fetchCareerSiteJobs(
  titleSearch: string[],
  locationSearch: string[] = ['United Kingdom'],
  limit = 10
): Promise<NormalizedJob[]> {
  const jobs = await runActorSync(ACTORS.CAREER_SITE, {
    titleSearch,
    locationSearch,
    timeRange: '6m', // Career Site supports 1h, 24h, 7d, 6m
    limit: Math.max(10, limit), // Minimum 10
    includeAi: true,
  })

  return jobs.map(job => transformApifyJob(job, 'career-site'))
}

/**
 * Search queries for fractional/interim executive roles
 */
export const LINKEDIN_SEARCH_QUERIES = [
  ['Fractional'],
  ['Interim CFO', 'Interim CTO', 'Interim CMO'],
  ['Part-time CFO', 'Part-time CMO', 'Part-time CTO'],
  ['Fractional CFO', 'Fractional CTO', 'Fractional CMO'],
  ['Portfolio Executive', 'Portfolio CFO'],
]

export const CAREER_SITE_SEARCH_QUERIES = [
  ['CFO', 'Chief Financial Officer'],
  ['CTO', 'Chief Technology Officer'],
  ['CMO', 'Chief Marketing Officer'],
  ['COO', 'Chief Operating Officer'],
]

/**
 * Sync all fractional jobs from both APIs
 */
export async function syncAllApifyJobs(): Promise<NormalizedJob[]> {
  const allJobs: NormalizedJob[] = []
  const seenUrls = new Set<string>()

  // Fetch from LinkedIn (primary source for fractional jobs)
  for (const searchTerms of LINKEDIN_SEARCH_QUERIES) {
    try {
      const jobs = await fetchLinkedInJobs(searchTerms, ['United Kingdom'], 20)

      for (const job of jobs) {
        if (!seenUrls.has(job.source_url)) {
          seenUrls.add(job.source_url)
          allJobs.push(job)
        }
      }

      // Rate limit between queries
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`Error fetching LinkedIn jobs for "${searchTerms}":`, error)
    }
  }

  // Fetch from Career Site API (UK C-Suite roles)
  for (const searchTerms of CAREER_SITE_SEARCH_QUERIES) {
    try {
      const jobs = await fetchCareerSiteJobs(searchTerms, ['United Kingdom'], 15)

      for (const job of jobs) {
        if (!seenUrls.has(job.source_url)) {
          seenUrls.add(job.source_url)
          allJobs.push(job)
        }
      }

      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error(`Error fetching Career Site jobs for "${searchTerms}":`, error)
    }
  }

  console.log(`Synced ${allJobs.length} unique jobs from Apify (LinkedIn + Career Site)`)
  return allJobs
}

/**
 * Check if a title matches fractional/interim criteria
 */
export function isFractionalRole(title: string): boolean {
  const t = title.toLowerCase()
  return (
    t.includes('fractional') ||
    t.includes('interim') ||
    t.includes('part-time') ||
    t.includes('part time') ||
    t.includes('portfolio') ||
    (t.includes('contract') && (t.includes('director') || t.includes('chief'))) ||
    (t.includes('consultant') && (t.includes('cfo') || t.includes('cmo') || t.includes('cto')))
  )
}
