import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Portfolio Executive UK 2025',
  description: 'Portfolio executive guide. How experienced leaders build multi-client careers working across companies.',
  keywords: 'portfolio executive, portfolio career, fractional executive, multiple roles, executive portfolio',
  alternates: {
    canonical: 'https://fractional.quest/portfolio-executive',
  },
  openGraph: {
    title: 'Portfolio Executive UK 2025',
    description: 'Building a portfolio executive career.',
    url: 'https://fractional.quest/portfolio-executive',
  },
}

const faqItems = [
  {
    question: 'What is a portfolio executive?',
    answer: 'A portfolio executive is a senior leader who works with multiple companies simultaneously rather than holding one full-time role. They combine fractional executive positions, board seats, advisory roles, and consulting to create a diverse career portfolio.',
  },
  {
    question: 'How many clients do portfolio executives have?',
    answer: 'Most portfolio executives work with 2-4 clients at any time. This typically includes 1-2 fractional roles (1-2 days/week each), plus advisory or board positions. Total commitment usually equals or exceeds full-time hours.',
  },
  {
    question: 'How much do portfolio executives earn?',
    answer: 'Portfolio executives in the UK typically earn £150,000-£400,000+ annually, often exceeding what they made in full-time roles. Income comes from multiple sources: fractional fees, board fees, advisory retainers, and consulting projects.',
  },
  {
    question: 'Is portfolio executive the same as fractional?',
    answer: 'Fractional is one component of a portfolio career. A portfolio executive might have 2 fractional roles, 1 board seat, and 2 advisory positions—creating a portfolio of multiple income streams and challenges.',
  },
]

export default function PortfolioExecutivePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-800 to-violet-700 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Career Model
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Portfolio<br />Executive
            </h1>
            <p className="text-2xl md:text-3xl text-violet-100 leading-relaxed font-light">
              Building a career across multiple companies. The modern executive path.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-violet-50 border-b-4 border-violet-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-10 rounded-lg shadow-sm border-2 border-violet-200">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is a Portfolio Executive?</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light mb-6">
              A <strong className="font-semibold text-gray-900">portfolio executive</strong> is a senior leader who works with multiple organisations simultaneously—combining fractional roles, board positions, advisory work, and consulting into a diversified career portfolio.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Rather than dedicating themselves to one employer, portfolio executives spread their expertise across 2-4+ companies, creating variety, flexibility, and often higher total earnings.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Executive working across multiple projects"
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
            <h2 className="text-3xl font-black text-gray-900">The Portfolio Executive Model</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Portfolio executives have emerged as a major career model for experienced leaders. According to the <a href="https://www.iod.com" target="_blank" rel="noopener noreferrer" className="text-violet-700 hover:text-violet-800">Institute of Directors</a>, portfolio careers are now mainstream at senior levels, driven by flexible working norms and changing attitudes to employment.
            </p>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Components of a Portfolio Career</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Fractional Roles</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>1-3 days/week per client</li>
                  <li>Ongoing leadership positions</li>
                  <li>Own function and team</li>
                  <li>Typically 1-2 concurrent</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Board Positions</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Non-executive director roles</li>
                  <li>1-2 days/month each</li>
                  <li>Governance and oversight</li>
                  <li>Often 2-4 boards</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Advisory Roles</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Strategic advice to founders/CEOs</li>
                  <li>Few hours per month</li>
                  <li>Often equity-compensated</li>
                  <li>Lighter commitment</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Consulting Projects</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Specific project delivery</li>
                  <li>Time-bounded engagements</li>
                  <li>Higher day rates</li>
                  <li>Gap-filler income</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Example Portfolio Structure</h2>

            <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-lg my-10">
              <h3 className="font-bold text-gray-900 mb-4">Typical Portfolio Executive Week</h3>
              <div className="grid gap-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Fractional CFO - Tech Scale-up</span>
                  <span className="text-violet-700 font-bold">2 days/week</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Fractional CFO - PE Portfolio Co</span>
                  <span className="text-violet-700 font-bold">1 day/week</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">NED - FinTech Startup</span>
                  <span className="text-gray-600">2 days/month</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium">Advisor - 3 Early-Stage Companies</span>
                  <span className="text-gray-600">4 hours/month each</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-bold">Total Weekly Commitment</span>
                  <span className="text-violet-700 font-bold">~4 days/week</span>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Portfolio Executive Earnings</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="p-8 bg-violet-50 border-2 border-violet-200 rounded-xl">
                <div className="text-sm font-bold text-violet-700 uppercase mb-2">Annual Income Range</div>
                <div className="text-3xl font-black text-gray-900 mb-2">£150,000-£400,000+</div>
                <p className="text-gray-600 text-sm mb-0">Often exceeds previous full-time salary</p>
              </div>
              <div className="p-8 bg-gray-50 border-2 border-gray-200 rounded-xl">
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">Income Diversification</div>
                <div className="text-3xl font-black text-gray-900 mb-2">4-8 Sources</div>
                <p className="text-gray-600 text-sm mb-0">Reduced risk through multiple clients</p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Benefits of Portfolio Executive Life</h2>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-violet-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Variety</h4>
                  <p className="text-sm text-gray-600 m-0">Work across different companies, industries, and challenges. Never get bored.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-violet-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Flexibility</h4>
                  <p className="text-sm text-gray-600 m-0">Control your schedule. Work when and where you want within client needs.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-violet-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Income Diversification</h4>
                  <p className="text-sm text-gray-600 m-0">Multiple income streams reduce risk. Lose one client, not all your income.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-violet-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Higher Earnings</h4>
                  <p className="text-sm text-gray-600 m-0">Many portfolio executives earn more than equivalent full-time roles.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-violet-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Continuous Learning</h4>
                  <p className="text-sm text-gray-600 m-0">Exposure to different companies keeps skills sharp and knowledge current.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Building a Portfolio Career</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Transitioning to portfolio executive life typically takes 12-24 months. Key steps include:
            </p>

            <ul className="text-lg space-y-3 my-8">
              <li><strong>Build runway:</strong> Have 6-12 months expenses saved before transitioning</li>
              <li><strong>Start while employed:</strong> Take first advisory or board role alongside current job</li>
              <li><strong>Define your niche:</strong> Be specific about function, industry, and stage</li>
              <li><strong>Activate network:</strong> Most early roles come through existing connections</li>
              <li><strong>Build presence:</strong> LinkedIn, content, speaking to establish credibility</li>
            </ul>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-violet-400">Summary:</strong> Portfolio executives work across 2-4+ companies, combining fractional roles, boards, and advisory positions. Earnings of £150,000-£400,000+ are achievable with variety and flexibility.
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
      <section className="py-20 bg-violet-800 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Start Your Portfolio Career</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/how-to-become-a-fractional-executive" className="px-10 py-5 bg-white text-violet-800 font-bold uppercase tracking-wider hover:bg-violet-50 transition-colors">
              How to Start
            </Link>
            <Link href="/fractional-executive-jobs" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-violet-800 transition-colors">
              Find Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/portfolio-career" className="text-gray-600 hover:text-violet-700 font-medium">Portfolio Career</Link>
            <Link href="/fractional-executive" className="text-gray-600 hover:text-violet-700 font-medium">Fractional Executive</Link>
            <Link href="/how-to-become-a-fractional-executive" className="text-gray-600 hover:text-violet-700 font-medium">Become Fractional</Link>
            <Link href="/fractional-executive-jobs" className="text-gray-600 hover:text-violet-700 font-medium">Executive Jobs</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
