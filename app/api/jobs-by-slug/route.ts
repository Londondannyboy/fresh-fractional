import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

/**
 * Fetch job details by slugs for display in the voice UI
 */
export async function POST(request: NextRequest) {
  try {
    const { slugs } = await request.json()

    if (!slugs || !Array.isArray(slugs) || slugs.length === 0) {
      return NextResponse.json([])
    }

    // Limit to 10 jobs max
    const limitedSlugs = slugs.slice(0, 10)

    const jobs = await sql`
      SELECT
        slug,
        title,
        company_name as company,
        location,
        is_remote,
        compensation
      FROM jobs
      WHERE slug = ANY(${limitedSlugs})
        AND is_active = true
    `

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('[jobs-by-slug] Error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
