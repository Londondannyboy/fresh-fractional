import { createDbQuery } from './db'

export interface CandidateProfile {
  id: number
  user_id: string
  slug: string
  display_name: string
  headline: string | null
  bio: string | null
  photo_url: string | null
  role_categories: string[]
  industries: string[]
  specialisms: string[]
  years_experience: number | null
  day_rate_min: number | null
  day_rate_max: number | null
  availability: string | null
  work_preference: string | null
  based_in: string | null
  timezone: string | null
  linkedin_url: string | null
  website_url: string | null
  is_public: boolean
  is_featured: boolean
  profile_status: 'draft' | 'published' | 'hidden'
  created_at: Date
  updated_at: Date
  published_at: Date | null
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export async function ensureUniqueSlug(baseSlug: string, excludeUserId?: string): Promise<string> {
  const sql = createDbQuery()
  let counter = 0
  while (true) {
    const testSlug = counter === 0 ? baseSlug : `${baseSlug}-${counter}`
    const existing = excludeUserId
      ? await sql`SELECT id FROM candidate_profiles WHERE slug = ${testSlug} AND user_id != ${excludeUserId} LIMIT 1`
      : await sql`SELECT id FROM candidate_profiles WHERE slug = ${testSlug} LIMIT 1`
    if (existing.length === 0) return testSlug
    counter++
  }
}

export async function getProfileByUserId(userId: string): Promise<CandidateProfile | null> {
  const sql = createDbQuery()
  const results = await sql`SELECT * FROM candidate_profiles WHERE user_id = ${userId} LIMIT 1`
  return (results[0] as CandidateProfile) || null
}

export async function getProfileBySlug(slug: string): Promise<CandidateProfile | null> {
  const sql = createDbQuery()
  const results = await sql`
    SELECT * FROM candidate_profiles
    WHERE slug = ${slug} AND is_public = true AND profile_status = 'published'
    LIMIT 1
  `
  return (results[0] as CandidateProfile) || null
}

export async function getPublicProfiles(options: {
  limit?: number
  offset?: number
  roleCategory?: string
  featured?: boolean
} = {}): Promise<CandidateProfile[]> {
  const sql = createDbQuery()
  const limit = options.limit || 50
  const offset = options.offset || 0

  if (options.featured) {
    const results = await sql`
      SELECT * FROM candidate_profiles
      WHERE is_public = true AND profile_status = 'published' AND is_featured = true
      ORDER BY published_at DESC LIMIT ${limit} OFFSET ${offset}
    `
    return results as CandidateProfile[]
  }

  if (options.roleCategory) {
    const results = await sql`
      SELECT * FROM candidate_profiles
      WHERE is_public = true AND profile_status = 'published' AND ${options.roleCategory} = ANY(role_categories)
      ORDER BY is_featured DESC, published_at DESC LIMIT ${limit} OFFSET ${offset}
    `
    return results as CandidateProfile[]
  }

  const results = await sql`
    SELECT * FROM candidate_profiles
    WHERE is_public = true AND profile_status = 'published'
    ORDER BY is_featured DESC, published_at DESC LIMIT ${limit} OFFSET ${offset}
  `
  return results as CandidateProfile[]
}

export async function getPublicProfileCount(): Promise<number> {
  const sql = createDbQuery()
  const result = await sql`SELECT COUNT(*) as count FROM candidate_profiles WHERE is_public = true AND profile_status = 'published'`
  return parseInt(result[0]?.count || '0', 10)
}

export async function upsertProfile(userId: string, data: Partial<Omit<CandidateProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>>): Promise<CandidateProfile> {
  const sql = createDbQuery()
  let slug = data.slug
  if (!slug && data.display_name) {
    slug = await ensureUniqueSlug(generateSlug(data.display_name), userId)
  }
  const isPublishing = data.is_public && data.profile_status === 'published'

  const results = await sql`
    INSERT INTO candidate_profiles (
      user_id, slug, display_name, headline, bio, photo_url,
      role_categories, industries, specialisms, years_experience,
      day_rate_min, day_rate_max, availability, work_preference,
      based_in, timezone, linkedin_url, website_url,
      is_public, is_featured, profile_status, published_at
    ) VALUES (
      ${userId}, ${slug || ''}, ${data.display_name || ''}, ${data.headline || null},
      ${data.bio || null}, ${data.photo_url || null}, ${data.role_categories || []},
      ${data.industries || []}, ${data.specialisms || []}, ${data.years_experience || null},
      ${data.day_rate_min || null}, ${data.day_rate_max || null}, ${data.availability || null},
      ${data.work_preference || null}, ${data.based_in || null}, ${data.timezone || null},
      ${data.linkedin_url || null}, ${data.website_url || null}, ${data.is_public || false},
      ${data.is_featured || false}, ${data.profile_status || 'draft'}, ${isPublishing ? new Date() : null}
    )
    ON CONFLICT (user_id) DO UPDATE SET
      slug = COALESCE(EXCLUDED.slug, candidate_profiles.slug),
      display_name = COALESCE(EXCLUDED.display_name, candidate_profiles.display_name),
      headline = COALESCE(EXCLUDED.headline, candidate_profiles.headline),
      bio = COALESCE(EXCLUDED.bio, candidate_profiles.bio),
      photo_url = COALESCE(EXCLUDED.photo_url, candidate_profiles.photo_url),
      role_categories = COALESCE(EXCLUDED.role_categories, candidate_profiles.role_categories),
      industries = COALESCE(EXCLUDED.industries, candidate_profiles.industries),
      specialisms = COALESCE(EXCLUDED.specialisms, candidate_profiles.specialisms),
      years_experience = COALESCE(EXCLUDED.years_experience, candidate_profiles.years_experience),
      day_rate_min = COALESCE(EXCLUDED.day_rate_min, candidate_profiles.day_rate_min),
      day_rate_max = COALESCE(EXCLUDED.day_rate_max, candidate_profiles.day_rate_max),
      availability = COALESCE(EXCLUDED.availability, candidate_profiles.availability),
      work_preference = COALESCE(EXCLUDED.work_preference, candidate_profiles.work_preference),
      based_in = COALESCE(EXCLUDED.based_in, candidate_profiles.based_in),
      timezone = COALESCE(EXCLUDED.timezone, candidate_profiles.timezone),
      linkedin_url = COALESCE(EXCLUDED.linkedin_url, candidate_profiles.linkedin_url),
      website_url = COALESCE(EXCLUDED.website_url, candidate_profiles.website_url),
      is_public = COALESCE(EXCLUDED.is_public, candidate_profiles.is_public),
      profile_status = COALESCE(EXCLUDED.profile_status, candidate_profiles.profile_status),
      published_at = CASE WHEN EXCLUDED.is_public = true AND EXCLUDED.profile_status = 'published' AND candidate_profiles.published_at IS NULL THEN NOW() ELSE candidate_profiles.published_at END
    RETURNING *
  `
  return results[0] as CandidateProfile
}
