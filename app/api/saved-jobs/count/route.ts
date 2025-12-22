import { NextRequest, NextResponse } from 'next/server'
import { stackServerApp } from '@/stack/server'
import { createDbQuery } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser()
    if (!user) {
      return NextResponse.json({ count: 0 })
    }

    const sql = createDbQuery()

    const result = await sql`
      SELECT COUNT(*) as count
      FROM saved_jobs
      WHERE user_id = ${user.id}
    `

    return NextResponse.json({ count: parseInt((result[0] as any)?.count || '0') })
  } catch (error) {
    console.error('Error counting saved jobs:', error)
    return NextResponse.json({ count: 0 })
  }
}
