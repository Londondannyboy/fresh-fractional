import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Portfolio Career UK 2025',
  description: 'Portfolio career guide for executives. How to build a career across multiple roles and companies.',
  keywords: 'portfolio career, portfolio working, multiple jobs, fractional career, executive portfolio career',
  alternates: {
    canonical: 'https://fractional.quest/portfolio-career',
  },
  openGraph: {
    title: 'Portfolio Career UK 2025',
    description: 'Building a portfolio career as an executive.',
    url: 'https://fractional.quest/portfolio-career',
  },
}

const faqItems = [
  {
    question: 'What is a portfolio career?',
    answer: 'A portfolio career involves working multiple roles simultaneously rather than one full-time job. For executives, this typically means combining fractional positions, board seats, advisory roles, consulting, and sometimes investments or mentoring.',
  },
  {
    question: 'Is a portfolio career right for me?',
    answer: 'Portfolio careers suit experienced professionals (typically 15+ years) who value variety, autonomy, and flexibility. You need strong self-discipline, financial runway for the transition, and comfort with variable income.',
  },
  {
    question: 'How do I start a portfolio career?',
    answer: 'Start while still employed: take an advisory role or board seat alongside your job. Build financial runway (6-12 months expenses). Define your value proposition. Activate your network. Gradually build up portfolio roles before fully transitioning.',
  },
  {
    question: 'Can I earn more with a portfolio career?',
    answer: 'Many portfolio professionals earn more than equivalent full-time roles. With 2-3 fractional positions plus board/advisory fees, annual income of £150,000-£400,000+ is achievable for experienced executives.',
  },
]

export default function PortfolioCareerPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Portfolio Career UK 2025: Complete Guide',
    description: 'Portfolio career guide for executives. How to build a career across multiple roles and companies.',
    image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: { '@type': 'Organization', name: 'Fractional Quest', url: 'https://fractional.quest' },
    publisher: { '@type': 'Organization', name: 'Fractional Quest', url: 'https://fractional.quest', logo: { '@type': 'ImageObject', url: 'https://fractional.quest/logo.svg' } },
    datePublished: '2025-01-01',
    dateModified: '2025-01-01',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fractional.quest/portfolio-career' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fractional.quest' },
      { '@type': 'ListItem', position: 2, name: 'Careers', item: 'https://fractional.quest/how-to-become-a-fractional-executive' },
      { '@type': 'ListItem', position: 3, name: 'Portfolio Career', item: 'https://fractional.quest/portfolio-career' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 to-teal-600 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Career Guide
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Portfolio<br />Career
            </h1>
            <p className="text-2xl md:text-3xl text-teal-100 leading-relaxed font-light">
              The modern executive career path. Multiple roles, varied challenges, greater flexibility.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-teal-50 border-b-4 border-teal-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-10 rounded-lg shadow-sm border-2 border-teal-200">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Portfolio Career?</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light mb-6">
              A <strong className="font-semibold text-gray-900">portfolio career</strong> means working multiple roles simultaneously rather than having one full-time job. You build a "portfolio" of work—different positions, clients, and income streams that together create a fulfilling career.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              For executives, this typically combines fractional leadership roles, board positions, advisory work, consulting, and sometimes investing or mentoring.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Professional working on multiple projects"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-xl prose-gray max-w-none">
            <h2 className="text-3xl font-black text-gray-900">Why Portfolio Careers Are Growing</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Portfolio careers have grown significantly, especially at senior levels. The <a href="https://www.cipd.org" target="_blank" rel="noopener noreferrer" className="text-teal-700 hover:text-teal-800">CIPD</a> reports that flexible working is now expected rather than exceptional. Several factors drive this trend:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">For Professionals</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Desire for variety and challenge</li>
                  <li>Work-life balance and flexibility</li>
                  <li>Autonomy and control</li>
                  <li>Higher earning potential</li>
                  <li>Continuous learning</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">For Companies</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Access senior talent affordably</li>
                  <li>Flexibility to scale up/down</li>
                  <li>Fresh external perspectives</li>
                  <li>Reduced hiring risk</li>
                  <li>Cross-industry experience</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Building Blocks of a Portfolio Career</h2>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-teal-600">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Fractional Executive Roles</h4>
                  <p className="text-sm text-gray-600 m-0">Part-time leadership positions (CFO, CMO, CTO, etc.) working 1-3 days/week per client. The core income source for most portfolio executives.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-teal-600">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Board Positions</h4>
                  <p className="text-sm text-gray-600 m-0">Non-executive director (NED) roles providing governance and oversight. Typically 1-2 days/month, fees of £20,000-£50,000+ per board.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-teal-600">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Advisory Roles</h4>
                  <p className="text-sm text-gray-600 m-0">Strategic advice to founders and CEOs. Light touch (few hours/month), often compensated with equity or small retainers.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-teal-600">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Consulting Projects</h4>
                  <p className="text-sm text-gray-600 m-0">Time-bounded engagements for specific deliverables. Higher day rates, useful for filling gaps between ongoing roles.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-teal-600">5</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Other Activities</h4>
                  <p className="text-sm text-gray-600 m-0">Investing, mentoring, speaking, writing, teaching—activities that build profile and sometimes generate income.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Transitioning to Portfolio</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Moving from full-time employment to a portfolio career requires planning. Here's a typical 12-24 month transition:
            </p>

            <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-lg my-10">
              <h3 className="font-bold text-gray-900 mb-4">Transition Timeline</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-4">
                  <div className="w-24 font-bold text-teal-700">Months 1-6</div>
                  <div className="text-gray-700">Build financial runway (6-12 months expenses). Take first advisory role alongside current job. Define your positioning.</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 font-bold text-teal-700">Months 6-12</div>
                  <div className="text-gray-700">Add board seat or second advisory. Build visibility (LinkedIn, speaking). Start networking for fractional roles.</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 font-bold text-teal-700">Months 12-18</div>
                  <div className="text-gray-700">Secure first fractional role (can overlap with notice period). Transition from full-time employment.</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-24 font-bold text-teal-700">Months 18-24</div>
                  <div className="text-gray-700">Build to 2-3 fractional clients plus boards/advisory. Reach sustainable income and pipeline.</div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Is Portfolio Right for You?</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
                <h3 className="font-bold text-green-700 mb-3">Good Fit If...</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>15+ years experience at senior level</li>
                  <li>Strong professional network</li>
                  <li>Comfortable with ambiguity</li>
                  <li>Self-motivated and disciplined</li>
                  <li>Value variety over stability</li>
                  <li>Have financial runway</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
                <h3 className="font-bold text-red-700 mb-3">Not Ideal If...</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Need income certainty</li>
                  <li>Prefer deep organizational ties</li>
                  <li>Uncomfortable selling yourself</li>
                  <li>Limited professional network</li>
                  <li>Prefer structured environments</li>
                  <li>High fixed financial commitments</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Portfolio Career Earnings</h2>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">Entry Portfolio</div>
                <div className="text-2xl font-black text-gray-900">£100,000-£150,000</div>
                <div className="text-xs text-gray-500">1-2 clients, building</div>
              </div>
              <div className="p-6 bg-teal-50 border border-teal-200 rounded-xl text-center">
                <div className="text-sm font-bold text-teal-700 uppercase mb-2">Established</div>
                <div className="text-2xl font-black text-gray-900">£150,000-£300,000</div>
                <div className="text-xs text-gray-500">2-3 fractional + boards</div>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">Senior Portfolio</div>
                <div className="text-2xl font-black text-gray-900">£300,000-£500,000+</div>
                <div className="text-xs text-gray-500">Premium clients + equity</div>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-teal-400">Summary:</strong> A portfolio career combines multiple roles—fractional, boards, advisory, consulting—into a flexible, varied career. Transition takes 12-24 months; earnings of £150,000-£400,000+ are achievable.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-8">FAQs</h2>
          <FAQ skipSchema={true} items={faqItems} title="" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Start Your Portfolio Career</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/how-to-become-a-fractional-executive" className="px-10 py-5 bg-white text-teal-700 font-bold uppercase tracking-wider hover:bg-teal-50 transition-colors">
              How to Start
            </Link>
            <Link href="/fractional-executive-jobs" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-teal-700 transition-colors">
              Find Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/portfolio-executive" className="text-gray-600 hover:text-teal-700 font-medium">Portfolio Executive</Link>
            <Link href="/fractional-executive" className="text-gray-600 hover:text-teal-700 font-medium">Fractional Executive</Link>
            <Link href="/how-to-become-a-fractional-executive" className="text-gray-600 hover:text-teal-700 font-medium">Become Fractional</Link>
            <Link href="/fractional-work" className="text-gray-600 hover:text-teal-700 font-medium">Fractional Work</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
