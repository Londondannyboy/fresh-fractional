import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Advisory UK 2025: Part-Time Strategic Advisors',
  description: 'Guide to fractional advisory roles. How senior advisors work part-time to provide strategic guidance, mentoring, and expertise to businesses.',
  keywords: 'fractional advisory, fractional advisor, part-time advisor, strategic advisor, business advisor, executive advisor',
  alternates: {
    canonical: 'https://fractional.quest/fractional-advisory',
  },
  openGraph: {
    title: 'Fractional Advisory UK 2025: Part-Time Strategic Advisors',
    description: 'Part-time strategic advisors for growing businesses.',
    url: 'https://fractional.quest/fractional-advisory',
  },
}

const faqItems = [
  {
    question: 'What is a fractional advisor?',
    answer: 'A fractional advisor is an experienced professional who provides strategic guidance to a company on a part-time basis—typically a few hours per month. Unlike fractional executives who lead functions, advisors offer counsel without operational responsibility.',
  },
  {
    question: 'How is an advisor different from a fractional executive?',
    answer: 'Fractional executives own and lead functions (1-3 days/week), manage teams, and are accountable for outcomes. Advisors provide guidance (a few hours/month), don\'t manage people, and offer perspective without operational accountability.',
  },
  {
    question: 'How are advisors compensated?',
    answer: 'Advisors are typically compensated through equity (0.1-1%), small monthly retainers (£500-£2,000), or hourly fees. Early-stage startups often pay in equity; later-stage companies may pay cash retainers.',
  },
  {
    question: 'When should I hire an advisor vs fractional executive?',
    answer: 'Hire an advisor when you need occasional strategic guidance or industry expertise. Hire a fractional executive when you need someone to actually build and lead a function, manage people, and be accountable for results.',
  },
]

export default function FractionalAdvisoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-600 to-amber-500 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Advisory Guide
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Fractional<br />Advisory
            </h1>
            <p className="text-2xl md:text-3xl text-amber-100 leading-relaxed font-light">
              Strategic guidance without operational commitment. Light-touch expertise on your terms.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-amber-50 border-b-4 border-amber-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-10 rounded-lg shadow-sm border-2 border-amber-200">
            <h2 className="text-3xl font-black text-gray-900 mb-6">What is Fractional Advisory?</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light mb-6">
              <strong className="font-semibold text-gray-900">Fractional advisory</strong> is when experienced professionals provide strategic guidance to companies on a light-touch, part-time basis—typically a few hours per month. Advisors offer expertise, connections, and perspective without taking on operational responsibility.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              It's the lightest form of fractional engagement, sitting between board roles and fractional executive positions.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Advisory meeting discussion"
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
            <h2 className="text-3xl font-black text-gray-900">Advisory vs Executive vs Board</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Understanding where advisory fits in the spectrum of fractional engagement:
            </p>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-bold text-gray-900">Aspect</th>
                    <th className="text-left py-3 font-bold text-amber-700">Advisor</th>
                    <th className="text-left py-3 font-bold text-gray-500">Fractional Executive</th>
                    <th className="text-left py-3 font-bold text-gray-500">Board Member</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 font-medium">Time</td>
                    <td className="py-3 text-amber-700">Few hours/month</td>
                    <td className="py-3 text-gray-600">1-3 days/week</td>
                    <td className="py-3 text-gray-600">1-2 days/month</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Accountability</td>
                    <td className="py-3 text-amber-700">None - advice only</td>
                    <td className="py-3 text-gray-600">Full - owns function</td>
                    <td className="py-3 text-gray-600">Governance/fiduciary</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Team</td>
                    <td className="py-3 text-amber-700">No direct reports</td>
                    <td className="py-3 text-gray-600">Manages people</td>
                    <td className="py-3 text-gray-600">No direct reports</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Compensation</td>
                    <td className="py-3 text-amber-700">Equity/small retainer</td>
                    <td className="py-3 text-gray-600">Monthly fee/day rate</td>
                    <td className="py-3 text-gray-600">Annual fee</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Legal status</td>
                    <td className="py-3 text-amber-700">Informal</td>
                    <td className="py-3 text-gray-600">Consultant</td>
                    <td className="py-3 text-gray-600">Director duties</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Types of Advisory Relationships</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-lg">
                <h3 className="font-bold text-amber-700 mb-3">Strategic Advisor</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Focus:</strong> Overall business strategy</li>
                  <li><strong>Typical for:</strong> CEOs, founders</li>
                  <li><strong>Time:</strong> 2-4 hours/month</li>
                  <li><strong>Value:</strong> Pattern recognition, strategic thinking</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3">Functional Advisor</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Focus:</strong> Specific function (finance, marketing, tech)</li>
                  <li><strong>Typical for:</strong> Teams lacking expertise</li>
                  <li><strong>Time:</strong> 2-4 hours/month</li>
                  <li><strong>Value:</strong> Domain expertise, best practices</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3">Industry Advisor</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Focus:</strong> Sector-specific guidance</li>
                  <li><strong>Typical for:</strong> Market entry, industry dynamics</li>
                  <li><strong>Time:</strong> As needed</li>
                  <li><strong>Value:</strong> Industry knowledge, connections</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3">Technical Advisor</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Focus:</strong> Technical decisions, architecture</li>
                  <li><strong>Typical for:</strong> Tech companies, product builds</li>
                  <li><strong>Time:</strong> 2-4 hours/month</li>
                  <li><strong>Value:</strong> Technical expertise, review</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">What Advisors Do</h2>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Strategic Guidance</h4>
                  <p className="text-sm text-gray-600 m-0">Provide perspective on strategic decisions. Challenge thinking, offer alternatives, share relevant experience.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Introductions</h4>
                  <p className="text-sm text-gray-600 m-0">Open doors to potential customers, partners, investors, and talent through their network.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Sounding Board</h4>
                  <p className="text-sm text-gray-600 m-0">Act as a trusted sounding board for the CEO or leadership team to test ideas and work through challenges.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Pattern Recognition</h4>
                  <p className="text-sm text-gray-600 m-0">Draw on experience from similar companies to help avoid pitfalls and identify opportunities.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Credibility</h4>
                  <p className="text-sm text-gray-600 m-0">Lend credibility to the company—investors, customers, and partners value experienced advisors.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Advisory Compensation</h2>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-center">
                <div className="text-sm font-bold text-amber-700 uppercase mb-2">Equity Only</div>
                <div className="text-2xl font-black text-gray-900 mb-2">0.1-1%</div>
                <div className="text-xs text-gray-500">Early-stage, 2-4 year vest</div>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">Retainer</div>
                <div className="text-2xl font-black text-gray-900 mb-2">£500-£2,000/month</div>
                <div className="text-xs text-gray-500">Cash for regular access</div>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">Hybrid</div>
                <div className="text-2xl font-black text-gray-900 mb-2">Equity + Retainer</div>
                <div className="text-xs text-gray-500">Common in later-stage</div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Finding & Engaging Advisors</h2>

            <ul className="text-lg space-y-3 my-8">
              <li><strong>Define the need:</strong> Be specific about what expertise or connections you need</li>
              <li><strong>Tap your network:</strong> Best advisors often come through warm introductions</li>
              <li><strong>Be clear on expectations:</strong> Hours, access, deliverables, compensation</li>
              <li><strong>Start informal:</strong> Coffee meetings before formal engagement</li>
              <li><strong>Set up structure:</strong> Regular cadence (monthly calls), clear communication</li>
              <li><strong>Review regularly:</strong> Assess value quarterly, adjust as needed</li>
            </ul>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-amber-400">Summary:</strong> Fractional advisory is light-touch strategic guidance—a few hours per month from experienced professionals. Advisors offer expertise and connections without operational responsibility, typically compensated through equity (0.1-1%) or small retainers.
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
      <section className="py-20 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Explore Advisory Roles</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-board-member" className="px-10 py-5 bg-white text-amber-600 font-bold uppercase tracking-wider hover:bg-amber-50 transition-colors">
              Board Roles
            </Link>
            <Link href="/portfolio-career" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-amber-600 transition-colors">
              Portfolio Career
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fractional-board-member" className="text-gray-600 hover:text-amber-600 font-medium">Board Member</Link>
            <Link href="/portfolio-executive" className="text-gray-600 hover:text-amber-600 font-medium">Portfolio Executive</Link>
            <Link href="/fractional-executive" className="text-gray-600 hover:text-amber-600 font-medium">Fractional Executive</Link>
            <Link href="/fractional-consultant" className="text-gray-600 hover:text-amber-600 font-medium">Fractional Consultant</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
