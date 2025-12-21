import { Metadata } from 'next'
import { neon } from '@neondatabase/serverless'
import { ExecutiveCard } from '@/components/ExecutiveCard'
import { CandidateCard } from '@/components/CandidateCard'
import type { FeaturedExecutive } from '@/lib/types'
import type { CandidateProfile } from '@/lib/candidate-profiles'

export const metadata: Metadata = {
  title: 'Fractional Executives | Meet Our Community',
  description: 'Meet fractional executives who have built the lifestyle of their dreams. Browse profiles, discover stories, and connect with experienced fractional leaders.',
}

async function getFeaturedExecutives(): Promise<FeaturedExecutive[]> {
  const sql = neon(process.env.DATABASE_URL!)
  const executives = await sql`
    SELECT *
    FROM featured_executives
    WHERE status IN ('published', 'featured')
    ORDER BY
      CASE WHEN status = 'featured' THEN 0 ELSE 1 END,
      featured_order ASC NULLS LAST,
      published_at DESC
  `
  return executives as FeaturedExecutive[]
}

async function getPublicCandidates(): Promise<CandidateProfile[]> {
  const sql = neon(process.env.DATABASE_URL!)
  const candidates = await sql`
    SELECT *
    FROM candidate_profiles
    WHERE is_public = true AND profile_status = 'published'
    ORDER BY is_featured DESC, published_at DESC
    LIMIT 50
  `
  return candidates as CandidateProfile[]
}

export default async function PeoplePage() {
  const [executives, candidates] = await Promise.all([
    getFeaturedExecutives(),
    getPublicCandidates()
  ])

  const totalProfiles = executives.length + candidates.length

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 md:py-24">
        <div className="container-content">
          <div className="max-w-3xl">
            <span className="section-label text-amber-600 mb-4 block">
              {totalProfiles > 0 ? `${totalProfiles} Executives` : 'Our Community'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Community
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with fractional executives who have traded the traditional career path for
              freedom, flexibility, and a life designed on their terms.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      {executives.length > 0 && (
        <section className="py-12 md:py-16 border-b">
          <div className="container-content">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executives.map((executive) => (
                <ExecutiveCard key={executive.id} executive={executive} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Candidate Profiles */}
      {candidates.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container-content">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fractional Executives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {executives.length === 0 && candidates.length === 0 && (
        <section className="py-12 md:py-16">
          <div className="container-content">
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Be the First to Join
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Create your profile and be among the first fractional executives in our community.
              </p>
              <a href="/profile/edit" className="btn-gradient inline-flex items-center gap-2">
                Create Your Profile
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="container-content text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Are you a fractional executive?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community and showcase your expertise. Create your profile to connect
            with companies looking for fractional talent.
          </p>
          <a href="/profile/edit" className="btn-gradient inline-flex items-center gap-2">
            Create Your Profile
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  )
}
