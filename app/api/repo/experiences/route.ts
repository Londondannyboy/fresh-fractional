import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { getZepClient, ensureZepUser } from '@/lib/zep-client'

const sql = neon(process.env.DATABASE_URL!)

// POST /api/repo/experiences - Add an experience to user's repo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      companyName,
      roleTitle,
      roleType,
      startYear,
      endYear,
      isCurrent,
      industry,
      achievements,
    } = body

    if (!userId || !companyName || !roleTitle) {
      return NextResponse.json(
        { error: 'userId, companyName, and roleTitle required' },
        { status: 400 }
      )
    }

    // First, find or create the company in employer_companies table
    let company = await sql`
      SELECT id, name FROM employer_companies WHERE LOWER(name) = LOWER(${companyName}) LIMIT 1
    `

    let employerId: string
    if (company.length === 0) {
      // Create new company
      const newCompany = await sql`
        INSERT INTO employer_companies (name, industry)
        VALUES (${companyName}, ${industry || null})
        RETURNING id, name
      `
      employerId = newCompany[0].id
    } else {
      employerId = company[0].id
    }

    // Add to user_experiences
    const experience = await sql`
      INSERT INTO user_experiences (
        user_id, employer_id, company_name_raw, role_title, role_type,
        start_year, end_year, is_current, industry, achievements, confirmed
      )
      VALUES (
        ${userId}, ${employerId}, ${companyName}, ${roleTitle}, ${roleType || 'full-time'},
        ${startYear || null}, ${endYear || null}, ${isCurrent || false},
        ${industry || null}, ${achievements || null}, true
      )
      RETURNING id, role_title, company_name_raw, start_year, end_year, is_current, industry
    `

    // Sync to Zep
    const client = getZepClient()
    if (client) {
      try {
        await ensureZepUser(userId)
        await client.graph.add({
          userId,
          type: 'json',
          data: JSON.stringify({
            type: 'work_experience_added',
            company: companyName,
            role: roleTitle,
            role_type: roleType,
            start_year: startYear,
            end_year: endYear,
            is_current: isCurrent,
            industry: industry,
            timestamp: new Date().toISOString(),
          }),
        })
      } catch (zepError) {
        console.error('Zep sync error (non-fatal):', zepError)
      }
    }

    return NextResponse.json({
      success: true,
      experience: {
        ...experience[0],
        company_name: companyName,
      },
    })
  } catch (error) {
    console.error('Add experience error:', error)
    return NextResponse.json(
      { error: 'Failed to add experience', details: String(error) },
      { status: 500 }
    )
  }
}

// PUT /api/repo/experiences - Update an experience
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      userId,
      experienceId,
      companyName,
      roleTitle,
      roleType,
      startYear,
      endYear,
      isCurrent,
      industry,
      achievements,
    } = body

    if (!userId || !experienceId) {
      return NextResponse.json(
        { error: 'userId and experienceId required' },
        { status: 400 }
      )
    }

    // Update the experience
    const updated = await sql`
      UPDATE user_experiences
      SET
        company_name_raw = COALESCE(${companyName}, company_name_raw),
        role_title = COALESCE(${roleTitle}, role_title),
        role_type = COALESCE(${roleType}, role_type),
        start_year = ${startYear},
        end_year = ${endYear},
        is_current = COALESCE(${isCurrent}, is_current),
        industry = COALESCE(${industry}, industry),
        achievements = COALESCE(${achievements}, achievements)
      WHERE id = ${experienceId} AND user_id = ${userId}
      RETURNING id, role_title, company_name_raw, start_year, end_year, is_current, industry
    `

    if (updated.length === 0) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      experience: updated[0],
    })
  } catch (error) {
    console.error('Update experience error:', error)
    return NextResponse.json(
      { error: 'Failed to update experience', details: String(error) },
      { status: 500 }
    )
  }
}

// DELETE /api/repo/experiences - Remove an experience
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, experienceId } = body

    if (!userId || !experienceId) {
      return NextResponse.json(
        { error: 'userId and experienceId required' },
        { status: 400 }
      )
    }

    // Get experience info before deleting
    const expInfo = await sql`
      SELECT id, role_title, company_name_raw
      FROM user_experiences
      WHERE id = ${experienceId} AND user_id = ${userId}
    `

    if (expInfo.length === 0) {
      return NextResponse.json(
        { error: 'Experience not found' },
        { status: 404 }
      )
    }

    // Delete
    await sql`
      DELETE FROM user_experiences WHERE id = ${experienceId} AND user_id = ${userId}
    `

    return NextResponse.json({
      success: true,
      removed: {
        id: experienceId,
        role_title: expInfo[0].role_title,
        company: expInfo[0].company_name_raw,
      },
    })
  } catch (error) {
    console.error('Delete experience error:', error)
    return NextResponse.json(
      { error: 'Failed to remove experience', details: String(error) },
      { status: 500 }
    )
  }
}
