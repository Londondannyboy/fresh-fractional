import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createDbQuery } from '@/lib/db'
import { JobCard } from '@/components/JobCard'
import { DesktopOnly3DGraph } from '@/components/DesktopOnly3DGraph'
import { FAQ } from '@/components/FAQ'
import { FractionalVsFullTimeComparison } from '@/components/FractionalVsFullTimeComparison'
import { FractionalRateCalculatorUK } from '@/components/FractionalRateCalculatorUK'
import { FractionalFitQuiz } from '@/components/FractionalFitQuiz'
import { UKMarketDashboard } from '@/components/UKMarketDashboard'

export const revalidate = 3600 // Revalidate every hour

export const metadata: Metadata = {
  title: 'Fractional Jobs UK 2025: 200+ Executive Roles | CFO, CTO, CMO',
  description: 'Find 200+ fractional jobs UK in 2025. CFO, CTO, CMO executive roles in London, Manchester & UK-wide. Day rates £800-£1,500. Free calculators & career quiz. Browse now.',
  keywords: 'fractional jobs UK, fractional jobs London, fractional executive jobs UK, fractional CFO jobs UK, fractional CMO jobs UK, fractional CTO jobs UK, fractional jobs 2025',
  alternates: {
    canonical: 'https://fractional.quest/fractional-jobs-uk',
  },
  openGraph: {
    title: 'Fractional Jobs UK 2025: 200+ Executive Roles | CFO, CTO, CMO',
    description: 'Find 200+ fractional jobs UK in 2025. CFO, CTO, CMO executive roles in London, Manchester & UK-wide. Day rates £800-£1,500. Free calculators & career quiz.',
    type: 'website',
    url: 'https://fractional.quest/fractional-jobs-uk',
  },
}

// UK regions with London highlighted - Focus on top 3 markets
const ukRegions = [
  { name: 'London', description: 'UK\'s largest fractional market - 60% of all UK roles', rateRange: '£900-£1,500/day', highlight: true },
  { name: 'Manchester', description: 'Northern tech hub & growing fractional market', rateRange: '£700-£1,200/day', highlight: false },
  { name: 'Birmingham', description: 'Midlands business centre', rateRange: '£650-£1,100/day', highlight: false },
]

// London areas for secondary keyword coverage
const londonAreas = [
  { name: 'City of London', description: 'Financial services & fintech', rateRange: '£1,000-£1,500/day' },
  { name: 'Shoreditch', description: 'Startups & scale-ups', rateRange: '£900-£1,400/day' },
  { name: 'Canary Wharf', description: 'Corporate & banking', rateRange: '£950-£1,300/day' },
  { name: 'Kings Cross', description: 'Tech & creative', rateRange: '£850-£1,200/day' },
]

// Success stories
const successStories = [
  {
    quote: "Fractional jobs UK offer incredible flexibility. I work with clients in London and Manchester, combining the best of both markets.",
    name: "Rachel S.",
    role: "Fractional CFO",
    area: "London & Manchester",
  },
  {
    quote: "The UK fractional market has exploded. I started with fractional jobs London but now work across the whole country remotely.",
    name: "Michael C.",
    role: "Fractional CTO",
    area: "UK-wide",
  },
  {
    quote: "Fractional jobs UK let me build a portfolio career. London rates with the flexibility to work from anywhere.",
    name: "Sophie W.",
    role: "Fractional CMO",
    area: "London",
  },
]

// Condensed FAQ items for UK Fractional Jobs (6 core questions for SEO)
const ukFractionalJobsFAQs = [
  {
    question: 'What are fractional jobs UK?',
    answer: 'Fractional jobs UK are part-time executive roles where experienced professionals work with multiple companies simultaneously. Unlike interim roles, fractional executives maintain ongoing relationships with 2-4 clients, dedicating 1-3 days per week to each.',
  },
  {
    question: 'How much do fractional jobs UK pay?',
    answer: 'Fractional jobs UK typically pay £700-£1,500 per day depending on role and location. London commands premium rates of £900-£1,500/day. Most fractional professionals work with 2-4 clients, earning £150,000-£300,000+ annually.',
  },
  {
    question: 'Where are most fractional jobs UK located?',
    answer: 'London accounts for 60% of UK fractional jobs. However, opportunities are growing rapidly in Manchester, Birmingham, and Edinburgh. Many fractional jobs UK offer remote or hybrid arrangements, allowing nationwide client service.',
  },
  {
    question: 'How do I find fractional jobs UK?',
    answer: 'Fractional.quest is the UK\'s dedicated marketplace for fractional executive jobs. Browse roles across London, Manchester, Birmingham, and UK-wide. Create a profile to get matched with opportunities matching your expertise.',
  },
  {
    question: 'Is fractional work inside or outside IR35?',
    answer: 'Most properly structured fractional roles are outside IR35. Key factors include working with multiple clients simultaneously, having control over delivery, and not being integrated like an employee. Each engagement should be individually assessed with an IR35-specialist accountant.',
  },
  {
    question: 'What qualifications do I need for fractional jobs UK?',
    answer: 'Fractional roles typically require 15+ years of experience with 5+ years in senior leadership. Professional qualifications are valued (CFOs: ACA/ACCA, CMOs: CIM/MBA) but a proven track record of delivering results is most important.',
  },
]

// Generate JobPosting schema for Google Job Search
function generateJobPostingSchema(jobs: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': jobs.map((job, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'JobPosting',
        'title': job.title,
        'description': job.description_snippet || `${job.title} position at ${job.company_name}`,
        'datePosted': job.posted_date ? new Date(job.posted_date).toISOString() : new Date().toISOString(),
        'validThrough': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        'employmentType': 'CONTRACTOR',
        'hiringOrganization': {
          '@type': 'Organization',
          'name': job.company_name,
          'sameAs': job.company_domain ? `https://${job.company_domain}` : undefined,
        },
        'jobLocation': {
          '@type': 'Place',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': job.location || 'London',
            'addressCountry': 'GB'
          }
        },
        'baseSalary': job.compensation ? {
          '@type': 'MonetaryAmount',
          'currency': 'GBP',
          'value': {
            '@type': 'QuantitativeValue',
            'value': parseFloat(job.compensation.replace(/[^0-9]/g, '')) || 1000,
            'unitText': 'DAY'
          }
        } : undefined,
        'url': `https://fractional.quest/fractional-job/${job.slug}`
      }
    }))
  }
}

async function getUKStats() {
  try {
    const sql = createDbQuery()
    const [totalUK, totalLondon, roleStats, avgRateResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND location ILIKE '%london%'`,
      sql`
        SELECT role_category, COUNT(*) as count
        FROM jobs
        WHERE is_active = true AND role_category IS NOT NULL
        GROUP BY role_category
        ORDER BY count DESC
      `,
      sql`SELECT AVG(CAST(REGEXP_REPLACE(compensation, '[^0-9]', '', 'g') AS INTEGER)) as avg FROM jobs WHERE is_active = true AND compensation IS NOT NULL AND compensation ~ '^[£$]?[0-9]+'`
    ])

    return {
      totalUK: parseInt((totalUK[0] as any)?.count || '0'),
      totalLondon: parseInt((totalLondon[0] as any)?.count || '0'),
      roleStats: roleStats as { role_category: string; count: string }[],
      avgDayRate: Math.round(parseFloat((avgRateResult[0] as any)?.avg || '900'))
    }
  } catch (error) {
    return { totalUK: 200, totalLondon: 85, roleStats: [], avgDayRate: 900 }
  }
}

async function getUKJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date, company_domain, description_snippet
      FROM jobs
      WHERE is_active = true
      ORDER BY
        CASE WHEN location ILIKE '%london%' THEN 0 ELSE 1 END,
        posted_date DESC NULLS LAST
      LIMIT 15
    `
    return jobs
  } catch (error) {
    return []
  }
}

export default async function FractionalJobsUKPage() {
  const [stats, ukJobs] = await Promise.all([
    getUKStats(),
    getUKJobs()
  ])

  const regionJobEstimates = ukRegions.map((region, i) => ({
    ...region,
    jobs: region.name === 'London'
      ? stats.totalLondon
      : Math.max(5, Math.round(stats.totalUK * (0.15 - i * 0.02)))
  }))

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with 3D Knowledge Graph Background */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* Conditionally load 3D graph only on desktop (768px+) to avoid 32s mobile JS execution */}
        <DesktopOnly3DGraph locationFilter="london" limit={30} height="100%" isHero={true} showOverlay={true} />

        {/* Bottom-aligned content with glass panel */}
        <div className="relative z-10 w-full pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
              {/* Left: Main content */}
              <div className="max-w-2xl">
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/10">
                  <Link href="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors text-sm tracking-wide">
                    <span className="mr-2">&larr;</span> Back to Home
                  </Link>

                  <span className="inline-block bg-white/10 backdrop-blur text-white/90 px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-6">
                    {stats.totalUK}+ Fractional Jobs UK
                  </span>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                    Fractional Jobs UK<br />
                    <span className="text-white/90">& London</span>
                  </h1>

                  <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-lg">
                    Find fractional jobs UK wide. From fractional jobs London to Manchester, Birmingham and beyond. CFO, CMO, CTO roles with £800-£1,500 daily rates.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/fractional-jobs"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white text-black hover:bg-white/90 transition-all duration-200"
                    >
                      Browse Fractional Jobs UK &rarr;
                    </Link>
                    <Link
                      href="/handler/sign-up"
                      className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
                    >
                      Get Notified
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right: Stats panel */}
              <div className="w-full lg:w-auto">
                <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">{stats.totalUK}+</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">UK Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">{stats.totalLondon}+</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">London Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">&pound;{stats.avgDayRate}</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Avg Day Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-white font-mono">2.5</div>
                      <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Avg Clients</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs - MOVED HIGHER FOR SEO */}
      {(ukJobs as any[]).length > 0 && (
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-600 mb-4 block">Featured</span>
                <h2 className="text-4xl font-bold text-gray-900">Fractional Jobs UK & London</h2>
              </div>
              <Link
                href="/fractional-jobs"
                className="hidden md:inline-flex items-center text-purple-700 font-semibold hover:text-purple-900 transition-colors"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {(ukJobs as any[]).slice(0, 9).map((job: any) => {
                const postedDate = job.posted_date ? new Date(job.posted_date) : null
                const postedDaysAgo = postedDate
                  ? Math.floor((Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24))
                  : undefined

                return (
                  <Link key={job.id} href={`/fractional-job/${job.slug}`}>
                    <JobCard
                      title={job.title}
                      company={job.company_name}
                      location={job.location || 'UK'}
                      isRemote={job.is_remote || job.workplace_type === 'Remote'}
                      compensation={job.compensation}
                      roleCategory={job.role_category}
                      skills={job.skills_required || []}
                      postedDaysAgo={postedDaysAgo}
                    />
                  </Link>
                )
              })}
            </div>
            <div className="text-center">
              <Link
                href="/fractional-jobs"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-all"
              >
                View All Fractional Jobs UK &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Editorial Introduction - UK Focus */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-600 mb-4 block">Fractional Jobs UK</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Your marketplace<br />for fractional jobs UK
            </h2>
          </div>
          <div className="prose prose-xl prose-gray max-w-none space-y-8">
            <p className="text-xl text-gray-600 leading-relaxed">
              Fractional jobs UK are transforming how executives work. With London accounting for 60% of opportunities and growing markets in Manchester and Birmingham, the UK fractional executive market offers unmatched flexibility and earning potential. Day rates range from £700-£1,500, with professionals earning £150,000-£300,000+ annually.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed">
              What started primarily in London has expanded nationwide, with fractional jobs UK now available across every major city. Companies increasingly recognize that fractional executives provide the same strategic expertise as full-time hires, but with greater flexibility and cost efficiency. Most fractional jobs UK offer hybrid or remote arrangements, enabling professionals to serve clients nationwide without geographic constraints.
            </p>
          </div>
        </div>
      </section>

      {/* UK Regions - Primary Keyword Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-600 mb-4 block">Fractional Jobs UK</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Top UK Markets</h2>
            <p className="text-xl text-gray-500">Find fractional jobs UK in the top 3 markets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regionJobEstimates.map((region) => (
              <Link
                key={region.name}
                href={region.name === 'London' ? '#london-jobs' : `/fractional-jobs-${region.name.toLowerCase()}`}
                className="group"
              >
                <article className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border ${region.highlight ? 'border-purple-200 ring-2 ring-purple-100' : 'border-gray-100 hover:border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {region.name}
                      {region.highlight && <span className="ml-2 text-purple-600 text-sm font-normal">(Featured)</span>}
                    </h3>
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {region.jobs}+ jobs
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{region.description}</p>
                  <p className="text-sm font-medium text-gray-500">{region.rateRange}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* London Section - Secondary Keyword */}
      <section id="london-jobs" className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-600 mb-4 block">Fractional Jobs London</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">London Districts</h2>
            <p className="text-xl text-gray-500">Fractional jobs London - the UK's largest market</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {londonAreas.map((area) => (
              <Link
                key={area.name}
                href={`/fractional-jobs?location=${encodeURIComponent(area.name.split('/')[0])}`}
                className="group"
              >
                <article className="bg-white rounded-xl p-6 hover:bg-gray-50 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-2">
                    {area.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{area.description}</p>
                  <p className="text-sm font-medium text-purple-600">{area.rateRange}</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Role Types - UK Wide */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-600 mb-4 block">By Function</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fractional Executive Roles UK</h2>
            <p className="text-xl text-gray-500">Fractional jobs UK across all executive functions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '&#128176;', title: 'Fractional CFO Jobs UK', subtitle: 'Finance Leadership', rate: '£800-£1,400/day', role: 'CFO', link: '/fractional-cfo-jobs-uk' },
              { icon: '&#128187;', title: 'Fractional CTO Jobs UK', subtitle: 'Technology Leadership', rate: '£850-£1,500/day', link: '/fractional-cto-jobs-uk', role: 'CTO' },
              { icon: '&#128226;', title: 'Fractional CMO Jobs UK', subtitle: 'Marketing Leadership', rate: '£750-£1,200/day', link: '/fractional-cmo-jobs-uk', role: 'CMO' },
              { icon: '&#9881;', title: 'Fractional COO Jobs UK', subtitle: 'Operations Leadership', rate: '£800-£1,300/day', link: '/fractional-coo-jobs-uk', role: 'COO' },
              { icon: '&#128101;', title: 'Fractional HRD Jobs UK', subtitle: 'People Leadership', rate: '£700-£1,100/day', role: 'HR', link: '/fractional-jobs?role=HR' },
              { icon: '&#128200;', title: 'Fractional Sales Jobs UK', subtitle: 'Revenue Leadership', rate: '£750-£1,250/day', role: 'Sales', link: '/fractional-jobs?role=Sales' },
            ].map((item) => {
              const roleCount = stats.roleStats.find(r => r.role_category === item.role)?.count || '0'
              return (
                <Link
                  key={item.role}
                  href={item.link}
                  className="group"
                >
                  <article className="bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                    <span className="text-4xl mb-6 block" dangerouslySetInnerHTML={{ __html: item.icon }} />
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">{item.subtitle}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">{item.rate}</span>
                      <span className="text-sm font-medium text-purple-600">{roleCount} roles</span>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-600 mb-4 block">Free Tools</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Fractional Career Tools</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Use our free calculators and assessments to explore fractional work
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Comparison Tool */}
            <FractionalVsFullTimeComparison />

            {/* Rate Calculator */}
            <FractionalRateCalculatorUK />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-4 block">Perspectives</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Fractional Jobs UK Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, i) => (
              <article key={i} className="bg-white/5 backdrop-blur rounded-xl p-8 border border-white/10">
                <blockquote className="text-white/90 text-lg mb-8 leading-relaxed italic">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="font-semibold text-white not-italic block">{story.name}</cite>
                    <span className="text-white/60 text-sm">{story.role} &bull; {story.area}</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with JSON-LD Schema */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-600 mb-4 block">FAQ</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fractional Jobs UK - Common Questions</h2>
            <p className="text-xl text-gray-500">Everything you need to know about fractional executive careers in the UK</p>
          </div>

          <FAQ
            items={ukFractionalJobsFAQs}
            title=""
            className="max-w-3xl mx-auto"
          />
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">Explore Fractional Jobs UK</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Fractional Jobs UK by Role</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="/fractional-cfo-jobs-uk" className="hover:text-purple-700 transition-colors">Fractional CFO Jobs UK</Link></li>
                <li><Link href="/fractional-cmo-jobs-uk" className="hover:text-purple-700 transition-colors">Fractional CMO Jobs UK</Link></li>
                <li><Link href="/fractional-cto-jobs-uk" className="hover:text-purple-700 transition-colors">Fractional CTO Jobs UK</Link></li>
                <li><Link href="/fractional-coo-jobs-uk" className="hover:text-purple-700 transition-colors">Fractional COO Jobs UK</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Fractional Jobs UK by Location</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="/fractional-jobs?location=London" className="hover:text-purple-700 transition-colors">Fractional Jobs London</Link></li>
                <li><Link href="/fractional-jobs-manchester" className="hover:text-purple-700 transition-colors">Fractional Jobs Manchester</Link></li>
                <li><Link href="/fractional-jobs-birmingham" className="hover:text-purple-700 transition-colors">Fractional Jobs Birmingham</Link></li>
                <li><Link href="/fractional-jobs-edinburgh" className="hover:text-purple-700 transition-colors">Fractional Jobs Edinburgh</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Resources</h3>
              <ul className="space-y-3 text-gray-600">
                <li><Link href="/fractional-jobs" className="hover:text-purple-700 transition-colors">All Fractional Jobs UK</Link></li>
                <li><Link href="/how-to-become-a-fractional-executive" className="hover:text-purple-700 transition-colors">How to Go Fractional</Link></li>
                <li><Link href="/fractional-executive-salary-uk" className="hover:text-purple-700 transition-colors">UK Salary Guide</Link></li>
                <li><Link href="/fractional-jobs-articles" className="hover:text-purple-700 transition-colors">All Articles</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-gray-500 mb-6 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Find Fractional Jobs UK Today
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {stats.totalUK}+ fractional jobs UK including {stats.totalLondon}+ fractional jobs London. Join the UK&apos;s fastest-growing executive job market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fractional-jobs"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              Browse Fractional Jobs UK
            </Link>
            <Link
              href="/handler/sign-up"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-200"
            >
              Join the Platform
            </Link>
          </div>
        </div>
      </section>

      {/* JobPosting Schema for Google Job Search */}
      {(ukJobs as any[]).length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateJobPostingSchema(ukJobs))
          }}
        />
      )}
    </div>
  )
}
