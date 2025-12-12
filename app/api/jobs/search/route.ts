import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export interface JobSearchResult {
  id: string
  title: string
  company: string
  location: string
  isRemote: boolean
  isFractional: boolean
  salaryRange?: string
  postedDate?: string
  url: string
  snippet?: string
  roleCategory?: string
}

export interface JobSearchResponse {
  jobs: JobSearchResult[]
  total: number
  query: {
    roleType?: string
    location?: string
    remote?: boolean
    fractional?: boolean
  }
  summary: string
}

// GET /api/jobs/search - Search jobs with filters
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams

  const roleType = params.get('role') || params.get('roleType') || ''
  const location = params.get('location') || ''
  const remote = params.get('remote') === 'true'
  const fractionalOnly = params.get('fractional') !== 'false'
  const query = params.get('q') || ''

  try {
    // Simple query with pattern matching
    const rolePattern = roleType ? `%${roleType}%` : '%'
    const locationPattern = location ? `%${location}%` : '%'
    const queryPattern = query ? `%${query}%` : '%'

    let jobs

    if (fractionalOnly) {
      jobs = await sql`
        SELECT
          id, title, company_name, location, is_remote, is_fractional,
          salary_min, salary_max, salary_currency, posted_date, url,
          description_snippet, role_category
        FROM jobs
        WHERE is_active = true
          AND (is_fractional = true OR LOWER(title) LIKE '%fractional%')
          AND LOWER(title) LIKE LOWER(${rolePattern})
          AND LOWER(COALESCE(location, '')) LIKE LOWER(${locationPattern})
          AND (
            LOWER(title) LIKE LOWER(${queryPattern})
            OR LOWER(company_name) LIKE LOWER(${queryPattern})
          )
        ORDER BY is_fractional DESC, posted_date DESC NULLS LAST
        LIMIT 20
      `
    } else {
      jobs = await sql`
        SELECT
          id, title, company_name, location, is_remote, is_fractional,
          salary_min, salary_max, salary_currency, posted_date, url,
          description_snippet, role_category
        FROM jobs
        WHERE is_active = true
          AND LOWER(title) LIKE LOWER(${rolePattern})
          AND LOWER(COALESCE(location, '')) LIKE LOWER(${locationPattern})
          AND (
            LOWER(title) LIKE LOWER(${queryPattern})
            OR LOWER(company_name) LIKE LOWER(${queryPattern})
          )
        ORDER BY is_fractional DESC, posted_date DESC NULLS LAST
        LIMIT 20
      `
    }

    // Apply remote filter in JS (simpler than complex SQL)
    if (remote) {
      jobs = jobs.filter(j => j.is_remote || (j.location && j.location.toLowerCase().includes('remote')))
    }

    // Format results
    const formattedJobs: JobSearchResult[] = jobs.map(job => ({
      id: job.id,
      title: job.title,
      company: job.company_name,
      location: job.location || 'Location not specified',
      isRemote: job.is_remote || false,
      isFractional: job.is_fractional || false,
      salaryRange: formatSalaryRange(job.salary_min, job.salary_max, job.salary_currency),
      postedDate: job.posted_date ? new Date(job.posted_date).toLocaleDateString('en-GB') : undefined,
      url: job.url,
      snippet: job.description_snippet?.slice(0, 200),
      roleCategory: job.role_category
    }))

    // Voice-friendly summary
    const summary = generateVoiceSummary(formattedJobs, { roleType, location, remote, fractional: fractionalOnly })

    return NextResponse.json({
      jobs: formattedJobs,
      total: formattedJobs.length,
      query: { roleType: roleType || undefined, location: location || undefined, remote, fractional: fractionalOnly },
      summary
    } as JobSearchResponse)
  } catch (error) {
    console.error('Jobs search error:', error)
    return NextResponse.json(
      { error: 'Search failed', details: String(error) },
      { status: 500 }
    )
  }
}

function formatSalaryRange(min?: number, max?: number, currency?: string): string | undefined {
  if (!min && !max) return undefined
  const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '£'
  if (min && max) return `${symbol}${(min/1000).toFixed(0)}k-${(max/1000).toFixed(0)}k`
  if (min) return `From ${symbol}${(min/1000).toFixed(0)}k`
  if (max) return `Up to ${symbol}${(max/1000).toFixed(0)}k`
  return undefined
}

function generateVoiceSummary(
  jobs: JobSearchResult[],
  filters: { roleType?: string; location?: string; remote?: boolean; fractional?: boolean }
): string {
  if (jobs.length === 0) {
    const roleText = filters.roleType ? `${filters.roleType} ` : ''
    const locationText = filters.location ? ` in ${filters.location}` : ''
    return `I couldn't find any ${roleText}roles${locationText} right now. Try broadening your search or check back soon.`
  }

  const fractionalCount = jobs.filter(j => j.isFractional).length
  const remoteCount = jobs.filter(j => j.isRemote).length

  let summary = `I found ${jobs.length} role${jobs.length > 1 ? 's' : ''}`
  if (filters.roleType) summary += ` matching ${filters.roleType}`
  if (filters.location) summary += ` in ${filters.location}`
  summary += '.'

  if (fractionalCount > 0) {
    summary += ` ${fractionalCount} ${fractionalCount > 1 ? 'are' : 'is'} fractional.`
  }
  if (remoteCount > 0 && !filters.remote) {
    summary += ` ${remoteCount} offer remote work.`
  }

  if (jobs.length > 0) {
    const top = jobs[0]
    summary += ` The top result is a ${top.title} at ${top.company}.`
  }

  return summary
}
