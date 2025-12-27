import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Team UK 2025: Building a Part-Time Leadership Team',
  description: 'Guide to building a fractional leadership team. How to combine multiple part-time executives for cost-effective C-suite coverage.',
  keywords: 'fractional team, fractional leadership team, fractional C-suite, part-time executive team, fractional management team',
  alternates: {
    canonical: 'https://fractional.quest/fractional-team',
  },
  openGraph: {
    title: 'Fractional Team UK 2025: Building a Part-Time Leadership Team',
    description: 'Build a fractional C-suite for your growing business.',
    url: 'https://fractional.quest/fractional-team',
  },
}

const faqItems = [
  {
    question: 'What is a fractional team?',
    answer: 'A fractional team is multiple part-time executives working together to provide leadership coverage. Instead of one full-time CFO, CMO, and CTO, you might have all three working 1-2 days each, creating comprehensive C-suite coverage at lower cost.',
  },
  {
    question: 'How do fractional executives work together?',
    answer: 'Effective fractional teams coordinate through regular leadership meetings, shared tools, and clear communication. Many fractional executives are experienced at working in multi-fractional environments and know how to collaborate effectively.',
  },
  {
    question: 'Is it confusing having multiple part-time leaders?',
    answer: 'It requires good communication and clear responsibilities, but most companies adapt quickly. Key is defining who owns what, establishing meeting cadences, and ensuring smooth handoffs. Many find the diversity of perspectives valuable.',
  },
  {
    question: 'How much does a fractional team cost?',
    answer: 'A typical fractional team of 2-3 executives might cost £8,000-£15,000 per month total, compared to £350,000-£500,000+ annually for the equivalent full-time hires. Significant cost savings while maintaining leadership coverage.',
  },
]

export default function FractionalTeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-lime-700 to-lime-600 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Team Guide
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Fractional<br />Team
            </h1>
            <p className="text-2xl md:text-3xl text-lime-100 leading-relaxed font-light">
              Build a complete leadership team with multiple part-time executives. C-suite coverage, SME cost.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-lime-50 border-b-4 border-lime-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-lime-700 mb-2">2-4</div>
              <div className="text-gray-600">Typical fractional execs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-lime-700 mb-2">£8-15k</div>
              <div className="text-gray-600">Monthly team cost</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-lime-700 mb-2">60-70%</div>
              <div className="text-gray-600">Cost savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Leadership team collaboration"
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
            <h2 className="text-3xl font-black text-gray-900">What is a Fractional Team?</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              A <strong>fractional team</strong> is a leadership team composed of multiple part-time executives working together. Rather than hiring one expensive full-time leader, you assemble several fractional executives who collectively provide comprehensive coverage.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              This approach is particularly powerful for scale-ups that need diverse C-suite expertise but can't justify or afford multiple full-time hires.
            </p>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Example Fractional Team</h2>

            <div className="bg-lime-50 border-2 border-lime-200 p-8 rounded-lg my-10">
              <h3 className="font-bold text-gray-900 mb-4">£5M Revenue Scale-Up: Fractional C-Suite</h3>
              <div className="grid gap-4 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-lime-200">
                  <div>
                    <span className="font-medium">Fractional CFO</span>
                    <span className="text-gray-500 ml-2">1 day/week</span>
                  </div>
                  <span className="text-lime-700 font-bold">£3,000/month</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-lime-200">
                  <div>
                    <span className="font-medium">Fractional CMO</span>
                    <span className="text-gray-500 ml-2">2 days/week</span>
                  </div>
                  <span className="text-lime-700 font-bold">£5,000/month</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-lime-200">
                  <div>
                    <span className="font-medium">Fractional CTO</span>
                    <span className="text-gray-500 ml-2">1 day/week</span>
                  </div>
                  <span className="text-lime-700 font-bold">£3,500/month</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-bold">Total Fractional Team</span>
                  <span className="text-lime-700 font-bold">£11,500/month (£138k/year)</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white rounded border border-lime-200">
                <p className="text-sm text-gray-600 mb-0">
                  <strong>Comparison:</strong> Full-time CFO (£150k) + CMO (£130k) + CTO (£160k) = £440k+ annually. Fractional team delivers senior leadership at ~30% of the cost.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Benefits of a Fractional Team</h2>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-lime-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Diverse Expertise</h4>
                  <p className="text-sm text-gray-600 m-0">Access multiple senior leaders with different specialties rather than being limited to one or two full-time hires.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-lime-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Cost Efficiency</h4>
                  <p className="text-sm text-gray-600 m-0">Get comprehensive C-suite coverage for the price of one full-time executive—or less.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-lime-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Flexibility</h4>
                  <p className="text-sm text-gray-600 m-0">Scale each role up or down independently. Add new functions as needed, reduce commitment where less needed.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-lime-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Fresh Perspectives</h4>
                  <p className="text-sm text-gray-600 m-0">Fractional executives work with multiple companies, bringing cross-industry insights and current best practices.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-lime-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Lower Risk</h4>
                  <p className="text-sm text-gray-600 m-0">Easier to adjust or change fractional arrangements than full-time hires. Test and iterate on team composition.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Making a Fractional Team Work</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Communication</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Regular leadership team meetings</li>
                  <li>Shared communication tools (Slack, Teams)</li>
                  <li>Clear async communication norms</li>
                  <li>Overlap days where possible</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Coordination</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Defined responsibilities and boundaries</li>
                  <li>Shared goals and OKRs</li>
                  <li>Project management visibility</li>
                  <li>Clear escalation paths</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Systems</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Shared documentation</li>
                  <li>Company calendar visibility</li>
                  <li>CRM/ERP access</li>
                  <li>Decision logs</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Culture</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Include in team events (where practical)</li>
                  <li>Treat as leadership team members</li>
                  <li>Build relationships between fractionals</li>
                  <li>Integrate with full-time team</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Common Fractional Team Combinations</h2>

            <div className="grid gap-6 my-10">
              <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Early Scale-Up (£1-5M)</h3>
                <p className="text-gray-600 text-sm mb-3">Focus on finance and growth:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded text-sm font-medium">Fractional CFO</span>
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded text-sm font-medium">Fractional CMO</span>
                </div>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Tech Scale-Up (£5-15M)</h3>
                <p className="text-gray-600 text-sm mb-3">Add tech leadership:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded text-sm font-medium">Fractional CFO</span>
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded text-sm font-medium">Fractional CTO</span>
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded text-sm font-medium">Fractional CMO</span>
                </div>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Pre-Investment (Any stage)</h3>
                <p className="text-gray-600 text-sm mb-3">Investor-ready leadership:</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded text-sm font-medium">Fractional CFO</span>
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded text-sm font-medium">Fractional COO</span>
                  <span className="px-3 py-1 bg-lime-100 text-lime-700 rounded text-sm font-medium">Fractional CHRO</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-lime-400">Summary:</strong> A fractional team combines multiple part-time executives for comprehensive leadership coverage. Typical cost is £8,000-£15,000/month for 2-4 executives—a fraction of equivalent full-time hires while providing diverse expertise.
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
      <section className="py-20 bg-lime-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Build Your Fractional Team</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-c-suite" className="px-10 py-5 bg-white text-lime-700 font-bold uppercase tracking-wider hover:bg-lime-50 transition-colors">
              C-Suite Guide
            </Link>
            <Link href="/fractional-roles" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-lime-700 transition-colors">
              All Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fractional-c-suite" className="text-gray-600 hover:text-lime-700 font-medium">Fractional C-Suite</Link>
            <Link href="/fractional-cxo" className="text-gray-600 hover:text-lime-700 font-medium">Fractional CXO</Link>
            <Link href="/fractional-executive" className="text-gray-600 hover:text-lime-700 font-medium">Fractional Executive</Link>
            <Link href="/fractional-hiring" className="text-gray-600 hover:text-lime-700 font-medium">Fractional Hiring</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
