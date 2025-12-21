import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { neon } from '@neondatabase/serverless'
import type { FeaturedExecutive } from '@/lib/types'
import type { CandidateProfile } from '@/lib/candidate-profiles'

interface Props {
  params: Promise<{ slug: string }>
}

type ProfileData = {
  type: 'featured'
  data: FeaturedExecutive
} | {
  type: 'candidate'
  data: CandidateProfile
}

async function getProfile(slug: string): Promise<ProfileData | null> {
  const sql = neon(process.env.DATABASE_URL!)

  // First try featured executives
  const executives = await sql`
    SELECT * FROM featured_executives
    WHERE slug = ${slug} AND status IN ('published', 'featured')
  `
  if (executives.length > 0) {
    return { type: 'featured', data: executives[0] as FeaturedExecutive }
  }

  // Then try candidate profiles
  const candidates = await sql`
    SELECT * FROM candidate_profiles
    WHERE slug = ${slug} AND is_public = true AND profile_status = 'published'
  `
  if (candidates.length > 0) {
    return { type: 'candidate', data: candidates[0] as CandidateProfile }
  }

  return null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const profile = await getProfile(slug)

  if (!profile) {
    return { title: 'Profile Not Found' }
  }

  if (profile.type === 'featured') {
    const exec = profile.data
    return {
      title: `${exec.name} | Fractional ${exec.role_category || 'Executive'} Story`,
      description: exec.lifestyle_summary || exec.headline,
    }
  }

  const candidate = profile.data
  const roles = candidate.role_categories?.join(', ') || 'Executive'
  return {
    title: `${candidate.display_name} | Fractional ${roles}`,
    description: candidate.headline || candidate.bio?.slice(0, 160),
  }
}

export default async function ProfilePage({ params }: Props) {
  const { slug } = await params
  const profile = await getProfile(slug)

  if (!profile) {
    notFound()
  }

  // Render featured executive page
  if (profile.type === 'featured') {
    const executive = profile.data
    return (
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-b from-amber-50 to-white py-16 md:py-24">
          <div className="container-content">
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-gray-500">
                <li><Link href="/people" className="hover:text-gray-900">People</Link></li>
                <li>/</li>
                <li className="text-gray-900">{executive.name}</li>
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
                {executive.photo_url ? (
                  <img src={executive.photo_url} alt={executive.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>

              <div>
                {executive.role_category && (
                  <span className="section-label text-amber-600 mb-2 block">Fractional {executive.role_category}</span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{executive.name}</h1>
                {executive.headline && <p className="text-xl text-gray-600 mb-4">{executive.headline}</p>}
                {executive.based_in && (
                  <p className="flex items-center gap-2 text-teal-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Based in {executive.based_in}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="container-content">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-12">
                {executive.lifestyle_summary && (
                  <div className="p-6 bg-amber-50 rounded-xl border border-amber-100">
                    <p className="text-lg text-gray-800 italic leading-relaxed">"{executive.lifestyle_summary}"</p>
                  </div>
                )}
                {executive.why_fractional && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Why I Went Fractional</h2>
                    <div className="prose prose-lg max-w-none text-gray-600"><p>{executive.why_fractional}</p></div>
                  </div>
                )}
                {executive.typical_week && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">A Typical Week</h2>
                    <div className="prose prose-lg max-w-none text-gray-600"><p>{executive.typical_week}</p></div>
                  </div>
                )}
                {executive.lifestyle_photos && executive.lifestyle_photos.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Life as a Fractional Executive</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {executive.lifestyle_photos.map((photo, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <img src={photo} alt={`${executive.name}'s lifestyle`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {executive.specialisms && executive.specialisms.length > 0 && (
                  <div className="card-premium p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Specialisms</h3>
                    <div className="flex flex-wrap gap-2">
                      {executive.specialisms.map((spec) => (
                        <span key={spec} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{spec}</span>
                      ))}
                    </div>
                  </div>
                )}
                {executive.industries && executive.industries.length > 0 && (
                  <div className="card-premium p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Industries</h3>
                    <div className="flex flex-wrap gap-2">
                      {executive.industries.map((industry) => (
                        <span key={industry} className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">{industry}</span>
                      ))}
                    </div>
                  </div>
                )}
                {executive.years_experience && (
                  <div className="card-premium p-6">
                    <h3 className="font-bold text-gray-900 mb-2">Experience</h3>
                    <p className="text-2xl font-bold text-gray-900">{executive.years_experience}+ years</p>
                  </div>
                )}
                {executive.linkedin_url && (
                  <a href={executive.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                )}
                <Link href="/people" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                  All People
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-teal-50">
          <div className="container-content text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Inspired by {executive.name.split(' ')[0]}'s story?</h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">Start your own fractional journey. Browse roles that offer the flexibility to design your ideal life.</p>
            <Link href="/fractional-jobs" className="btn-gradient inline-flex items-center gap-2">
              Explore Fractional Roles
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    )
  }

  // Render candidate profile page
  const candidate = profile.data
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="container-content">
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              <li><Link href="/people" className="hover:text-gray-900">People</Link></li>
              <li>/</li>
              <li className="text-gray-900">{candidate.display_name}</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 flex-shrink-0 overflow-hidden">
              {candidate.photo_url ? (
                <img src={candidate.photo_url} alt={candidate.display_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl font-bold text-purple-400">{candidate.display_name.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>

            <div>
              {candidate.role_categories && candidate.role_categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {candidate.role_categories.map((role) => (
                    <span key={role} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{candidate.display_name}</h1>
              {candidate.headline && <p className="text-xl text-gray-600 mb-4">{candidate.headline}</p>}
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                {candidate.based_in && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {candidate.based_in}
                  </span>
                )}
                {candidate.availability && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {candidate.availability}
                  </span>
                )}
                {candidate.work_preference && (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {candidate.work_preference}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-content">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              {candidate.bio && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                  <div className="prose prose-lg max-w-none text-gray-600">
                    <p className="whitespace-pre-wrap">{candidate.bio}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Day Rate */}
              {(candidate.day_rate_min || candidate.day_rate_max) && (
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Day Rate</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {candidate.day_rate_min && candidate.day_rate_max
                      ? `£${candidate.day_rate_min} - £${candidate.day_rate_max}`
                      : candidate.day_rate_min
                        ? `From £${candidate.day_rate_min}`
                        : `Up to £${candidate.day_rate_max}`}
                  </p>
                </div>
              )}

              {candidate.years_experience && (
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="font-bold text-gray-900 mb-2">Experience</h3>
                  <p className="text-2xl font-bold text-gray-900">{candidate.years_experience}+ years</p>
                </div>
              )}

              {candidate.specialisms && candidate.specialisms.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Specialisms</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.specialisms.map((spec) => (
                      <span key={spec} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">{spec}</span>
                    ))}
                  </div>
                </div>
              )}

              {candidate.industries && candidate.industries.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Industries</h3>
                  <div className="flex flex-wrap gap-2">
                    {candidate.industries.map((industry) => (
                      <span key={industry} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">{industry}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3">
                {candidate.linkedin_url && (
                  <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                )}
                {candidate.website_url && (
                  <a href={candidate.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    Website
                  </a>
                )}
              </div>

              <Link href="/people" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                All People
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-purple-50">
        <div className="container-content text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Looking for fractional talent?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Browse our community of experienced fractional executives ready to help your business grow.</p>
          <Link href="/people" className="btn-gradient inline-flex items-center gap-2">
            Browse All Executives
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}
