import { NextRequest, NextResponse } from 'next/server'
import { stackServerApp } from '@/stack/server'
import { getProfileByUserId, upsertProfile, getPublicProfiles, getPublicProfileCount } from '@/lib/candidate-profiles'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const listPublic = searchParams.get('public') === 'true'
    if (listPublic) {
      const profiles = await getPublicProfiles({ limit: 50 })
      const count = await getPublicProfileCount()
      return NextResponse.json({ profiles, count })
    }
    const user = await stackServerApp.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const profile = await getProfileByUserId(user.id)
    return NextResponse.json(profile || null)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const data = await request.json()
    if (!data.display_name?.trim()) return NextResponse.json({ error: 'Display name required' }, { status: 400 })
    const profile = await upsertProfile(user.id, data)
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
