import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { FAQ } from '@/components/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleNews } from '@/components/RoleNews'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CIO Jobs UK | Part-Time Chief Information Officer Roles 2025',
  description: 'Fractional CIO jobs UK - Find part-time Chief Information Officer positions paying £850-£1,500/day. Browse live CIO roles for experienced IT leaders. Remote & hybrid available.',
  keywords: 'fractional cio jobs, fractional cio jobs uk, part time cio, chief information officer jobs, fractional cio opportunities, fractional cio uk, it director jobs',
  alternates: {
    canonical: 'https://fractional.quest/fractional-cio-jobs-uk',
  },
  openGraph: {
    title: 'Fractional CIO Jobs UK | Part-Time CIO Roles 2025',
    description: 'Fractional CIO jobs UK - Find part-time CIO positions paying £850-£1,500/day. Remote & hybrid available.',
    images: ['/images/fractional-cio-jobs-uk.jpg'],
    url: 'https://fractional.quest/fractional-cio-jobs-uk',
  },
}

const CIO_FAQS = [
  {
    question: 'What is a Fractional CIO?',
    answer: 'A Fractional CIO (Chief Information Officer) is an experienced IT executive who works with companies on a part-time basis, typically 1-3 days per week. They provide strategic technology leadership, digital transformation guidance, and IT governance without the cost of a full-time CIO hire.',
  },
  {
    question: 'How much do Fractional CIO jobs pay in the UK?',
    answer: 'Fractional CIO day rates in the UK typically range from £850 to £1,500 per day, depending on experience, industry, and location. London-based roles often command premium rates. Annual earnings for experienced fractional CIOs with multiple clients can exceed £200,000.',
  },
  {
    question: 'What qualifications do I need for Fractional CIO jobs?',
    answer: 'Fractional CIOs typically need 15+ years of IT experience with senior leadership roles, expertise in digital transformation, cloud strategy, cybersecurity, and IT governance. Professional certifications like TOGAF, ITIL, or CISSP are valued, along with experience managing large IT teams and budgets.',
  },
  {
    question: 'What is the difference between a CIO and CTO?',
    answer: 'A CIO focuses on internal IT operations, digital transformation, and business technology alignment. A CTO typically focuses on product technology, engineering, and external-facing technical strategy. In practice, fractional roles often blend these responsibilities depending on company needs.',
  },
]

async function getTechStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (role_category = 'Engineering' OR title ILIKE '%CIO%' OR title ILIKE '%information officer%' OR title ILIKE '%IT Director%')`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (role_category = 'Engineering' OR title ILIKE '%CIO%') AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 35, remoteCount: 14 }
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true AND (role_category = 'Engineering' OR title ILIKE '%CIO%') AND company_name IS NOT NULL
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 8
    `
    return companies.map((c: any) => c.company_name)
  } catch {
    return []
  }
}

async function getCIOJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date, hours_per_week,
        description_snippet
      FROM jobs
      WHERE is_active = true AND (title ILIKE '%CIO%' OR title ILIKE '%information officer%' OR title ILIKE '%IT Director%' OR role_category = 'Engineering')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 12
    `
    return jobs as any[]
  } catch {
    return []
  }
}

function getDaysAgo(postedDate: string | null): number | undefined {
  if (!postedDate) return undefined
  const posted = new Date(postedDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - posted.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

export default async function FractionalCIOJobsUKPage() {
  const [stats, companies, jobs] = await Promise.all([
    getTechStats(),
    getFeaturedCompanies(),
    getCIOJobs()
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/85 via-indigo-600/70 to-purple-500/50" />
        </div>
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                IT Leadership
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fractional CIO Jobs UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
                Part-time Chief Information Officer roles for experienced IT leaders.
                Lead digital transformation 2-3 days a week at £850-£1,500/day.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">{stats.total}+</div>
                  <div className="text-white/80 text-sm">Live Roles</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">£1,100</div>
                  <div className="text-white/80 text-sm">Avg Day Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">{stats.remoteCount}</div>
                  <div className="text-white/80 text-sm">Remote</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#jobs" className="px-8 py-4 bg-white text-indigo-700 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  Browse Jobs
                </Link>
                <Link href="/fractional-cio-services" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  CIO Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculator</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">How Much Can You Earn as a Fractional CIO?</h2>
          </div>
          <RoleCalculator role="cto" />
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CIO Jobs UK Listings</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live fractional CIO jobs in the UK</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.slice(0, 9).map((job) => (
              <article
                key={job.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/fractional-job/${job.slug}`} className="block">
                  <div className="relative h-40 bg-gradient-to-br from-indigo-500 to-purple-600">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop"
                      alt={`${job.title} - Fractional CIO job UK at ${job.company_name}`}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg line-clamp-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        {job.title}
                      </h3>
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      {job.role_category && (
                        <span className="bg-white/90 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                          {job.role_category}
                        </span>
                      )}
                      {getDaysAgo(job.posted_date) !== undefined && getDaysAgo(job.posted_date)! <= 3 && (
                        <span className="bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    {job.is_remote && (
                      <span className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Remote
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 font-medium mb-2">{job.company_name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {job.location || 'UK'}
                      </span>
                      {job.compensation && (
                        <span className="font-semibold text-gray-900">{job.compensation}</span>
                      )}
                    </div>
                    {job.description_snippet && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{job.description_snippet}</p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                      View fractional CIO job →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/fractional-jobs-uk?department=Engineering"
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition-colors"
            >
              View All {stats.total}+ Technology Jobs
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Companies Hiring */}
      {companies.length > 0 && (
        <section className="py-16 bg-gray-50 text-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 block">Who's Hiring</span>
              <h2 className="text-3xl md:text-4xl font-black">Companies Seeking CIOs</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-indigo-400 transition-colors cursor-default">{company}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Editorial Content */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-4 block">The Guide</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
              Everything You Need to Know About<br /><span className="text-indigo-600">Fractional CIO Jobs UK</span>
            </h2>
            <div className="w-24 h-1 bg-indigo-600"></div>
          </div>
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Fractional CIO jobs</strong> represent the future of IT leadership. Part-time Chief Information Officer positions where experienced technology leaders drive digital transformation across multiple organisations—delivering enterprise-grade IT strategy at a fraction of the cost.
            </p>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">The Rise of Fractional CIO Jobs UK</h3>
            <p>The UK market for <strong>fractional CIO jobs UK</strong> has grown significantly as organisations recognise they need strategic IT leadership but may not require a full-time executive. This is particularly true for mid-market companies undergoing digital transformation, private equity portfolio companies, and organisations with complex IT challenges.</p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-indigo-600">
              <p className="text-xl font-semibold text-gray-900 mb-0">"Companies access CIO expertise for £2,500-£6,000/week instead of £15,000+ monthly for full-time."</p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Fractional CIO Jobs</h3>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Digital Transformation CIO', desc: 'Leading technology modernisation initiatives', rate: '£1,000-£1,400/day' },
                { title: 'IT Governance CIO', desc: 'Establishing IT frameworks and compliance', rate: '£900-£1,300/day' },
                { title: 'M&A Integration CIO', desc: 'Technology due diligence and integration', rate: '£1,100-£1,500/day' },
                { title: 'Scale-up CIO', desc: 'Building IT infrastructure for growth', rate: '£950-£1,350/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-indigo-600 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Requirements for Fractional CIO Jobs</h3>
            <ul className="space-y-2">
              <li>15+ years IT experience, 5+ in CIO or IT Director roles</li>
              <li>Digital transformation and cloud migration experience</li>
              <li>IT governance, security, and compliance expertise</li>
              <li>Vendor management and IT procurement skills</li>
              <li>Board-level communication and stakeholder management</li>
            </ul>
          </article>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">IR35: Inside vs Outside</h2>
            <p className="text-gray-600 mt-4">As a fractional CIO, your IR35 status significantly impacts your take-home pay</p>
          </div>
          <IR35Calculator defaultDayRate={1100} />
        </div>
      </section>

      {/* News */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <RoleNews category="Engineering" title="Latest Technology & IT News" limit={3} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional CIO Jobs UK</h2>
          </div>
          <FAQ items={CIO_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gray-50 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Ready?</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Find Your Next<br /><span className="text-indigo-400">Fractional CIO Role</span></h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Create your profile and get matched with companies seeking fractional IT leadership.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-indigo-600 text-white font-bold uppercase tracking-wider hover:bg-indigo-700 transition-colors">Create Profile</Link>
            <Link href="/fractional-cio-services" className="px-10 py-5 border-2 border-gray-400 text-gray-600 font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">CIO Services</Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/fractional-jobs-uk" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">All Jobs</Link>
              <Link href="/fractional-cio-services" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">CIO Services</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">CTO Jobs</Link>
              <Link href="/fractional-ciso-jobs-uk" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">CISO Jobs</Link>
            </div>
          </div>
        </div>
      </section>

      <RoleContentHub currentRole="cto" />
    </div>
  )
}
