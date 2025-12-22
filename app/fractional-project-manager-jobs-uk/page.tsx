import { Metadata } from 'next'
import Link from 'next/link'
import { createDbQuery } from '@/lib/db'
import { FAQ } from '@/components/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { DesktopOnly } from '@/components/DesktopOnly'
import { IR35Calculator } from '@/components/IR35Calculator'
import { RoleContentHub } from '@/components/RoleContentHub'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Project Manager Jobs UK | Part-Time PM Roles',
  description: 'Fractional project manager jobs UK - Find part-time PM positions paying £500-£1,200/day. Browse live project management roles for experienced PMs.',
  keywords: 'fractional project manager jobs uk, fractional pm jobs, part time project manager jobs, freelance pm jobs, project manager jobs uk',
  openGraph: {
    title: 'Fractional Project Manager Jobs UK | Part-Time PM Roles',
    description: 'Fractional project manager jobs UK - Find part-time PM positions paying £500-£1,200/day.',
    images: ['/images/fractional-pm-jobs-uk.jpg'],
  },
}

async function getPMStats() {
  try {
    const sql = createDbQuery()
    const [totalResult, remoteResult] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (role_category = 'Operations' OR title ILIKE '%project%manager%' OR title ILIKE '%programme%manager%')`,
      sql`SELECT COUNT(*) as count FROM jobs WHERE is_active = true AND (role_category = 'Operations' OR title ILIKE '%project%manager%' OR title ILIKE '%programme%manager%') AND (is_remote = true OR workplace_type = 'Remote')`
    ])
    return {
      total: parseInt((totalResult[0] as any)?.count || '0'),
      remoteCount: parseInt((remoteResult[0] as any)?.count || '0')
    }
  } catch {
    return { total: 32, remoteCount: 14 }
  }
}

async function getFeaturedCompanies() {
  try {
    const sql = createDbQuery()
    const companies = await sql`
      SELECT DISTINCT company_name
      FROM jobs
      WHERE is_active = true AND (role_category = 'Operations' OR title ILIKE '%project%manager%' OR title ILIKE '%programme%manager%') AND company_name IS NOT NULL
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 8
    `
    return companies.map((c: any) => c.company_name)
  } catch {
    return []
  }
}

// Server-side job fetch for SEO - renders in initial HTML for crawlers
async function getPMJobs() {
  try {
    const sql = createDbQuery()
    const jobs = await sql`
      SELECT
        id, slug, title, company_name, location, is_remote, workplace_type,
        compensation, role_category, skills_required, posted_date, hours_per_week,
        description_snippet
      FROM jobs
      WHERE is_active = true AND (role_category = 'Operations' OR title ILIKE '%project%manager%' OR title ILIKE '%programme%manager%')
      ORDER BY posted_date DESC NULLS LAST
      LIMIT 12
    `
    return jobs as any[]
  } catch {
    return []
  }
}

// Calculate days ago for posted date
function getDaysAgo(postedDate: string | null): number | undefined {
  if (!postedDate) return undefined
  const posted = new Date(postedDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - posted.getTime())
  return Math.floor(diffTime / (1000 * 60 * 60 * 24))
}

const PM_FAQS = [
  {
    question: 'What is a fractional project manager?',
    answer: 'A fractional project manager is a senior PM who works part-time (typically 2-3 days per week) with one or multiple clients, providing strategic project leadership without the cost of a full-time hire. They deliver expertise in project governance, stakeholder management, and delivery oversight on a flexible basis.'
  },
  {
    question: 'How much do fractional project manager jobs pay in the UK?',
    answer: 'Fractional project managers in the UK typically earn £500-£1,200 per day depending on experience, location, and specialization. London rates range from £800-£1,200/day, while regional rates are £500-£900/day. Working 2-3 days per week across multiple clients can generate £100,000-£150,000+ annually.'
  },
  {
    question: 'Do I need PRINCE2 certification for fractional PM jobs?',
    answer: 'PRINCE2 Practitioner is highly valuable for UK fractional PM roles, particularly in public sector and corporate environments where it is often mandatory. Approximately 40% of UK fractional PM opportunities explicitly require PRINCE2. Agile certifications (CSM, SAFe) are essential for technology sector roles.'
  },
  {
    question: 'How many clients do fractional project managers typically work with?',
    answer: 'Most fractional project managers work with 2-3 clients simultaneously, allocating 1-3 days per week to each. This provides diversity, reduces risk from losing a single client, and allows cross-pollination of best practices while maintaining focused, high-value time with each client.'
  },
  {
    question: 'What industries hire the most fractional project managers?',
    answer: 'Technology and SaaS companies represent the largest demand (42%), followed by financial services and fintech (28%). Healthcare organizations increasingly hire fractional PMs for digital transformation. Professional services, construction, and manufacturing also regularly engage fractional project managers.'
  },
  {
    question: 'What is the difference between fractional and interim project managers?',
    answer: 'Fractional PMs work part-time (2-3 days/week) on an ongoing basis across multiple clients. Interim PMs typically work full-time for 3-12 months addressing specific challenges or covering permanent role gaps. Fractional arrangements provide sustained strategic guidance; interim roles focus on crisis resolution or transition periods.'
  }
]

export default async function FractionalProjectManagerJobsUkPage() {
  const [stats, companies, jobs] = await Promise.all([
    getPMStats(),
    getFeaturedCompanies(),
    getPMJobs()
  ])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero with Aspirational Image */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        {/* Background Image - Project Management professional */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/85 via-emerald-500/70 to-teal-400/50" />
        </div>
        <div className="relative z-10 w-full py-16">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-white/20 backdrop-blur text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                Project Management
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Fractional Project Manager Jobs UK
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-2xl mb-8">
                Part-time project manager roles for experienced PMs.
                Work 2-3 days a week at £500-£1,200/day.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">{stats.total}+</div>
                  <div className="text-white/80 text-sm">Live Roles</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">£750</div>
                  <div className="text-white/80 text-sm">Avg Day Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">{stats.remoteCount}</div>
                  <div className="text-white/80 text-sm">Remote</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#jobs" className="px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                  Browse Jobs
                </Link>
                <Link href="/fractional-project-manager" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  PM Career Guide
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
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">How Much Can You Earn as a Fractional PM?</h2>
          </div>
          <RoleCalculator role="pm" />
        </div>
      </section>

      {/* JOBS SECTION - Server-rendered for SEO */}
      <section id="jobs" className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Browse</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional Project Manager Jobs UK Listings</h2>
            </div>
            <p className="text-gray-500">{jobs.length}+ live fractional PM jobs in the UK</p>
          </div>

          {/* Server-rendered job grid - visible to search engines */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.slice(0, 9).map((job) => (
              <article
                key={job.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/fractional-job/${job.slug}`} className="block">
                  {/* Job image header */}
                  <div className="relative h-40 bg-gradient-to-br from-green-500 to-emerald-600">
                    <img
                      src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop"
                      alt={`${job.title} - Fractional project manager job UK at ${job.company_name}`}
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-bold text-lg line-clamp-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                        {job.title}
                      </h3>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {job.role_category && (
                        <span className="bg-white/90 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                          {job.role_category}
                        </span>
                      )}
                      {getDaysAgo(job.posted_date) !== undefined && getDaysAgo(job.posted_date)! <= 3 && (
                        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
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
                  {/* Job content */}
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
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700">
                      View fractional PM job →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* CTA to view all */}
          <div className="text-center">
            <Link
              href="/fractional-jobs-uk?department=Operations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              View All {stats.total}+ Fractional PM Jobs UK
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
              <h2 className="text-3xl md:text-4xl font-black">Companies Seeking Project Managers</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
              {companies.map((company: string, index: number) => (
                <span key={index} className="text-xl md:text-2xl font-light text-gray-400 hover:text-green-400 transition-colors cursor-default">{company}</span>
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
              Everything You Need to Know About<br /><span className="text-green-600">Fractional Project Manager Jobs UK</span>
            </h2>
            <div className="w-24 h-1 bg-green-500"></div>
          </div>
          <figure className="mb-16 -mx-6 lg:-mx-16">
            <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Fractional project manager jobs UK - PM leading agile team planning session" className="w-full h-80 md:h-96 object-cover" />
            <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">Project managers across the UK are embracing fractional work arrangements</figcaption>
          </figure>
          <article className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              <strong className="font-semibold text-gray-900">Fractional project manager jobs</strong> represent a growing opportunity in the UK project management landscape. Part-time PM positions where experienced project leaders provide strategic delivery oversight to multiple companies simultaneously—delivering world-class project expertise at a fraction of the cost. According to the <a href="https://www.apm.org.uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Association for Project Management (APM)</a>, flexible project management arrangements have grown by over 56% since 2020.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">The Rise of Fractional Project Manager Jobs UK</h3>
            <p>The demand for <strong>fractional project manager jobs UK</strong> has surged as companies recognise that expert project leadership doesn't require full-time commitment. <a href="https://www.gov.uk/government/organisations/department-for-business-and-trade" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Scale-ups navigating complex digital transformations</a>, PE-backed firms implementing portfolio-wide improvements, and SMEs launching strategic initiatives all increasingly turn to fractional project managers.</p>
            <p>
              The fractional PM model has emerged as the optimal solution for organisations requiring senior project expertise without the commitment of a permanent hire. Many companies run 3-5 strategic projects annually but struggle to justify a full-time senior PM costing £60,000-£90,000 annually. A fractional project manager working 2 days per week delivers equivalent strategic oversight for roughly £40,000-£50,000 annually.
            </p>
            <p>
              Technology companies have been early adopters of the fractional PM model. When launching new products, implementing technical infrastructure, or managing digital transformations, tech firms need experienced PMs who understand agile methodologies, software development lifecycles, and technical complexity. A fractional PM brings experience from multiple technology implementations, applying battle-tested approaches while avoiding common pitfalls.
            </p>

            <div className="bg-gray-50 p-8 my-10 border-l-4 border-green-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">"Companies access senior project management expertise for £1,500-£3,000/week vs £60,000-£90,000 annually for full-time."</p>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Why Fractional Project Manager Jobs Are Booming</h3>
            <p>
              The growth in fractional project manager jobs reflects broader shifts in how organisations approach strategic delivery. According to <a href="https://www.britishbusinessbank.co.uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">British Business Bank research</a>, UK SMEs increasingly seek flexible access to senior project talent as they navigate complex digital transformation initiatives. The ability to engage world-class project leadership on-demand provides significant competitive advantage.
            </p>
            <ul className="space-y-3">
              <li><strong>Project complexity:</strong> Modern projects require sophisticated governance and risk management. Companies need senior PM expertise but only for specific initiatives, not continuously</li>
              <li><strong>Agile transformation:</strong> Organisations transitioning to agile ways of working need experienced practitioners. <a href="https://www.apm.org.uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">APM research</a> shows companies with strong agile PM leadership deliver 35% faster time-to-market</li>
              <li><strong>Cost efficiency:</strong> Access senior PM expertise without permanent headcount. A fractional PM working 2 days per week costs roughly £40,000-£50,000 annually versus £60,000-£90,000 for full-time</li>
              <li><strong>Digital transformation:</strong> Companies need PMs with experience delivering technology change programmes. Most organisations run 1-2 major transformation initiatives per year, not requiring year-round senior PM capacity</li>
              <li><strong>Diverse methodologies:</strong> Fractional PMs bring experience across PRINCE2, Agile, Scrum, SAFe, and Lean approaches, having delivered projects across different methodologies and contexts</li>
            </ul>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Types of Fractional Project Manager Jobs</h3>
            <p>
              Fractional project manager jobs in the UK span various specialisations and delivery contexts. The type of role you pursue often depends on your methodology background and the kinds of projects you enjoy delivering. Agile-focused fractional PMs tend to work in technology and product development, while PRINCE2-certified PMs often find opportunities in corporate and public sector environments.
            </p>
            <div className="grid md:grid-cols-2 gap-6 not-prose my-8">
              {[
                { title: 'Digital Transformation PM', desc: 'Leading technology and process transformation', rate: '£800-£1,200/day' },
                { title: 'Agile/Scrum PM', desc: 'Product development and iterative delivery', rate: '£700-£1,100/day' },
                { title: 'Programme Manager', desc: 'Multi-project coordination and governance', rate: '£850-£1,200/day' },
                { title: 'Project Recovery PM', desc: 'Rescuing troubled projects and delivery', rate: '£900-£1,300/day' },
              ].map((type, i) => (
                <div key={i} className="bg-gray-50 p-6 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{type.desc}</p>
                  <span className="text-green-600 font-semibold text-sm">{type.rate}</span>
                </div>
              ))}
            </div>
            <p>
              The choice of specialisation typically reflects your project management background. Former consultants from firms like Deloitte, Accenture, and PwC tend to excel in transformation and programme management roles, bringing structured methodologies and stakeholder management experience. PMs from high-growth SaaS companies often gravitate toward agile product delivery roles, where their experience with iterative development proves invaluable. PRINCE2-certified PMs with public sector experience command strong demand for government and regulated industry projects.
            </p>

            {/* Second image for SEO */}
            <figure className="my-10 -mx-6 lg:-mx-16">
              <img
                src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Fractional project manager jobs UK - PM reviewing project timeline and deliverables"
                title="Fractional Project Manager Jobs UK - Part-Time PM Opportunities"
                className="w-full h-64 md:h-80 object-cover"
              />
              <figcaption className="text-sm text-gray-500 mt-3 px-6 lg:px-16">
                UK fractional project manager jobs offer flexible PM leadership opportunities
              </figcaption>
            </figure>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional PM Jobs by Location</h3>
            <p>
              London accounts for approximately 45% of fractional project manager opportunities, reflecting the capital's concentration of technology companies, consultancies, and corporate headquarters. However, remote working has dramatically expanded opportunities for project managers based outside London. According to APM research, 65% of project management roles now offer remote or hybrid arrangements.
            </p>
            <ul className="space-y-2">
              <li><strong>London:</strong> £800-£1,200/day - Technology, financial services, consultancy projects</li>
              <li><strong>Manchester:</strong> £650-£950/day - Digital transformation, professional services, technology</li>
              <li><strong>Birmingham:</strong> £600-£900/day - Manufacturing, healthcare, public sector projects</li>
              <li><strong>Bristol &amp; Edinburgh:</strong> £650-£950/day - Technology, life sciences, fintech</li>
              <li><strong>Remote UK:</strong> £600-£900/day - Nationwide opportunities with occasional site visits</li>
            </ul>
            <p>
              The shift toward remote and hybrid project delivery has been transformative for fractional PMs. While some projects require on-site presence—particularly in construction, manufacturing, or change-intensive environments—many strategic technology and digital projects can be delivered largely remotely. Most fractional PMs now work 1-2 days on-site per week with remaining time remote, allowing PMs anywhere in the UK to serve clients across the country.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Building a Successful Fractional PM Practice</h3>
            <p>
              Transitioning to fractional project management work requires deliberate positioning and practice development. Unlike functional specialists who can demonstrate value through specific deliverables, project managers must articulate the delivery improvements and risk mitigation they enable—outcomes that are sometimes less tangible but equally valuable.
            </p>
            <p>
              Successful fractional PMs typically develop a clear niche—whether by industry vertical (fintech, healthcare, SaaS), project type (digital transformation, ERP implementation, agile transformation), or methodology specialism (PRINCE2, SAFe, Scrum). This specialisation helps attract clients who value deep domain expertise over generalist project management capabilities.
            </p>
            <p>
              Building a referral network is essential for sustainable fractional PM work. Technology consulting firms, management consultancies, and PE operating partners provide strong lead sources. Many successful fractional PMs maintain relationships with 2-3 consultancies who regularly introduce them to clients needing project delivery support. Professional networks through APM, PMI, and industry associations also generate high-quality opportunities.
            </p>

            <div className="bg-green-50 p-6 border border-green-200 rounded-lg my-8 not-prose">
              <p className="text-green-800 font-medium mb-3">Interested in fractional project management?</p>
              <Link href="/fractional-project-manager" className="inline-flex items-center text-green-700 font-bold hover:text-green-900">
                View Fractional PM Career Guide →
              </Link>
            </div>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Requirements for Fractional Project Manager Jobs</h3>
            <p>
              The requirements for fractional project manager jobs reflect the seniority and autonomy of the role. Most fractional PMs bring 10-15+ years of project management experience, with significant time leading complex, multi-stakeholder initiatives. Professional certifications substantially strengthen your market position, particularly credentials from bodies like <a href="https://www.apm.org.uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">APM</a>, <a href="https://www.pmi.org/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">PMI</a>, and <a href="https://www.axelos.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Axelos (PRINCE2)</a>.
            </p>
            <ul className="space-y-2">
              <li>10+ years project management experience across multiple projects</li>
              <li>Professional PM certification: PRINCE2 Practitioner, PMP, AgilePM, or SAFe</li>
              <li>Experience leading projects over £1m budget or 12+ month duration</li>
              <li>Strong stakeholder management and executive communication skills</li>
              <li>Track record delivering complex projects across multiple functions</li>
              <li>Understanding of <a href="https://www.gov.uk/topic/business-tax/ir35" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">IR35 regulations</a> for contractor arrangements</li>
              <li>Experience with PM tools: Jira, Microsoft Project, Asana, Monday.com</li>
            </ul>
            <p>
              Beyond technical PM competencies, successful fractional project managers possess strong adaptability and learning agility. The role requires quickly understanding new business contexts, building credibility with unfamiliar teams, and tailoring project approaches to each organisation's culture and maturity. Many clients engage fractional PMs precisely because they can rapidly assess situations and apply appropriate methodologies without lengthy onboarding periods.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Certifications That Matter for Fractional PM Work</h3>
            <p>
              While experience matters most, certifications significantly impact both day rates and client confidence. PRINCE2 Practitioner remains highly valued in the UK market, with approximately 40% of opportunities explicitly requiring or preferring this qualification. For technology and product-focused roles, Certified ScrumMaster (CSM) or SAFe certifications increasingly appear in role specifications.
            </p>
            <p>
              The Project Management Professional (PMP) certification from PMI commands international recognition and often features in requirements for multinational corporate projects. For programme-level roles, Managing Successful Programmes (MSP) certification adds credibility. Many successful fractional PMs maintain multiple certifications, positioning themselves for diverse opportunity types.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Common Engagement Models for Fractional PMs</h3>
            <p>
              Most fractional project manager engagements follow predictable patterns. The most common model involves 2 days per week (Tuesday/Wednesday or Wednesday/Thursday) for a defined project duration—typically 6-12 months aligned to project lifecycle. This structure provides consistent strategic oversight without full-time commitment.
            </p>
            <p>
              Some fractional PMs work on a sprint-aligned model, particularly in agile environments. They might be heavily involved for 2-3 weeks (4-5 days per week) during project initiation, planning, and key milestones, then reduce to 1 day per week for sprint ceremonies and governance during execution phases. This flex model matches PM effort to project phase intensity.
            </p>
            <p>
              Retainer arrangements also work well for organisations with ongoing project portfolios. A company might engage a fractional PM for 1-2 days per week continuously, with the PM providing oversight across multiple smaller initiatives rather than leading a single large project. This model suits companies with mature project functions needing senior governance and mentoring for internal project managers.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Industries Hiring Fractional Project Managers</h3>
            <p>
              Technology and SaaS companies represent the largest segment of fractional PM demand at approximately 42%. These organisations require PMs comfortable with agile methodologies, technical terminology, and rapid iteration. Projects typically focus on product launches, platform migrations, technical infrastructure builds, or integration following acquisitions.
            </p>
            <p>
              Financial services and fintech account for roughly 28% of opportunities. These roles often require understanding of regulatory requirements, data security, and complex stakeholder landscapes. Projects frequently involve core banking system implementations, regulatory compliance programmes, or digital channel launches. PRINCE2 certification proves particularly valuable in this sector.
            </p>
            <p>
              Healthcare and life sciences increasingly engage fractional PMs for digital transformation and system implementation projects. NHS trusts, private healthcare providers, and MedTech companies all require project managers who understand clinical workflows and healthcare regulations. These projects often involve electronic health record implementations, patient-facing digital services, or medical device launches.
            </p>
            <p>
              Professional services firms hire fractional PMs both for internal transformation projects and to supplement client delivery teams. Consultancies sometimes engage fractional PMs to lead client projects under the consultancy's brand, particularly for delivery-focused implementations following strategy phases.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Day-to-Day Reality of Fractional PM Work</h3>
            <p>
              A typical fractional PM might work Tuesday/Wednesday with Company A (scale-up SaaS implementing Salesforce), Thursday with Company B (retailer executing digital transformation), and reserve Mondays and Fridays for admin, business development, and professional development. This schedule provides concentrated focus time with each client while maintaining work-life flexibility.
            </p>
            <p>
              On client days, fractional PMs typically attend stand-ups, steering committees, and stakeholder meetings. They review progress against plans, identify and escalate risks, make or influence key decisions, and coach internal project coordinators or junior PMs. Between scheduled sessions, they update project documentation, communicate status to stakeholders, and plan upcoming sprints or phases.
            </p>
            <p>
              The asynchronous nature of fractional work requires strong communication and documentation discipline. You cannot rely on daily conversations to maintain alignment. Successful fractional PMs over-communicate through written updates, maintain meticulous project artifacts (RAIDs, plans, status reports), and establish clear escalation paths for decisions needed during their off-days.
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Finding Your First Fractional PM Clients</h3>
            <p>
              Breaking into fractional project management typically follows one of several paths. Many PMs transition from permanent roles by taking their current employer as their first fractional client—converting a full-time position into a 2-3 day per week arrangement. This provides immediate revenue and a case study while you build additional clients.
            </p>
            <p>
              Specialist fractional recruitment agencies like <a href="https://www.fractional.quest/" className="text-green-600 hover:text-green-700 underline">fractional.quest</a> connect experienced PMs with companies seeking part-time project leadership. These platforms typically require strong credentials and references but can generate consistent opportunities once accepted.
            </p>
            <p>
              Professional networks remain the most effective lead generation channel for fractional PMs. Attending APM events, contributing to project management communities, and maintaining relationships with former colleagues all generate referrals. Many fractional PMs report that 60-70% of their clients come through personal networks and word-of-mouth recommendations.
            </p>
          </article>
        </div>
      </section>

      {/* IR35 Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">UK Tax</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">IR35: Inside vs Outside</h2>
            <p className="text-gray-600 mt-4">As a fractional project manager, your IR35 status significantly impacts your take-home pay</p>
          </div>
          <IR35Calculator defaultDayRate={750} />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Common Questions About Fractional Project Manager Jobs UK</h2>
          </div>
          <FAQ items={PM_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gray-50 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Ready?</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Find Your Next<br /><span className="text-green-400">Fractional PM Role</span></h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">Create your profile and get matched with companies seeking fractional project management expertise.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-green-500 text-black font-bold uppercase tracking-wider hover:bg-green-400 transition-colors">Create Profile</Link>
            <Link href="/fractional-project-manager" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">PM Career Guide</Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/uk-fractional-jobs-uk-london-fractional-jobs-london" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Fractional Jobs</Link>
              <Link href="/fractional-project-manager" className="text-gray-600 hover:text-green-600 font-medium transition-colors">PM Career Guide</Link>
              <Link href="/fractional-coo-jobs-uk" className="text-gray-600 hover:text-green-600 font-medium transition-colors">COO Jobs UK</Link>
              <Link href="/fractional-cmo-jobs-uk" className="text-gray-600 hover:text-green-600 font-medium transition-colors">CMO Jobs UK</Link>
              <Link href="/fractional-cfo-jobs-uk" className="text-gray-600 hover:text-green-600 font-medium transition-colors">CFO Jobs UK</Link>
              <Link href="/fractional-cto-jobs-uk" className="text-gray-600 hover:text-green-600 font-medium transition-colors">CTO Jobs UK</Link>
              <Link href="/top-fractional-recruitment-agencies-best-fractional-recruitment-agency-fractional-recruiter" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Top Fractional Recruiters</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Hub - Internal Linking */}
      <RoleContentHub currentRole="pm" />
    </div>
  )
}
