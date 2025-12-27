import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'What is Fractional? UK Guide 2025',
  description: 'What is fractional? Complete guide to the fractional executive model and how it works for UK businesses.',
  keywords: 'what is fractional, fractional meaning, fractional executive, fractional definition, what does fractional mean',
  alternates: {
    canonical: 'https://fractional.quest/what-is-fractional',
  },
  openGraph: {
    title: 'What is Fractional? UK Guide 2025',
    description: 'Complete guide to the fractional executive model.',
    url: 'https://fractional.quest/what-is-fractional',
  },
}

const faqItems = [
  {
    question: 'What does fractional mean in business?',
    answer: 'In business, "fractional" means part-time or shared. A fractional executive works with a company for a fraction of their time (1-3 days/week), providing senior leadership without full-time commitment. The term comes from fractional ownership—sharing access to high-value assets.',
  },
  {
    question: 'What is a fractional role?',
    answer: 'A fractional role is a senior position (typically C-suite or director level) filled on a part-time basis. The executive works 1-3 days per week, often serving multiple companies, while providing the same strategic leadership as a full-time hire.',
  },
  {
    question: 'Is fractional the same as part-time?',
    answer: 'Fractional executives work part-time hours but differ from traditional part-time employees. They typically work as independent contractors, serve multiple clients, and focus on strategic leadership rather than operational tasks.',
  },
  {
    question: 'Why is fractional becoming popular?',
    answer: 'Fractional is growing because: companies can access senior talent at 50-70% lower cost; remote work has normalized flexible arrangements; experienced executives prefer portfolio careers; and businesses need expertise without permanent headcount.',
  },
]

export default function WhatIsFractionalPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-800 to-indigo-700 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Complete Guide
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              What is<br />Fractional?
            </h1>
            <p className="text-2xl md:text-3xl text-indigo-100 leading-relaxed font-light">
              Everything you need to know about the fractional executive model.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-indigo-50 border-b-4 border-indigo-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-10 rounded-lg shadow-sm border-2 border-indigo-200">
            <h2 className="text-3xl font-black text-gray-900 mb-6">The Quick Answer</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light mb-6">
              <strong className="font-semibold text-gray-900">"Fractional"</strong> means part-time or shared. In the context of executives, a fractional leader works with your company 1-3 days per week, providing senior leadership at a fraction of full-time cost.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Think of it like fractional ownership of a jet or holiday home—you get access to something valuable without bearing the full cost of ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Executive team collaborating"
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
            <h2 className="text-3xl font-black text-gray-900">Understanding "Fractional"</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              The term "fractional" in business borrows from the concept of <strong>fractional ownership</strong>. Just as multiple people might share ownership of an expensive asset—a private jet, yacht, or vacation property—companies can share access to senior executive talent.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              A fractional executive works with your company for a fraction of their working week (typically 1-3 days), while potentially serving other companies with the rest of their time. You get the expertise you need, when you need it, without paying for a full-time resource.
            </p>

            <h2 className="text-3xl font-black text-gray-900 mt-16">How Fractional Works</h2>

            <div className="grid md:grid-cols-3 gap-6 my-10">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg text-center">
                <div className="text-4xl font-black text-indigo-600 mb-2">1-3</div>
                <div className="text-sm font-bold text-gray-700 uppercase mb-2">Days Per Week</div>
                <p className="text-sm text-gray-600">Regular, consistent engagement with your business</p>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg text-center">
                <div className="text-4xl font-black text-indigo-600 mb-2">50-70%</div>
                <div className="text-sm font-bold text-gray-700 uppercase mb-2">Cost Savings</div>
                <p className="text-sm text-gray-600">Compared to full-time executive hires</p>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg text-center">
                <div className="text-4xl font-black text-indigo-600 mb-2">6+</div>
                <div className="text-sm font-bold text-gray-700 uppercase mb-2">Months Typical</div>
                <p className="text-sm text-gray-600">Ongoing relationship, not project-based</p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">What Fractional Roles Exist?</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Almost any senior leadership role can be fractional. The most common include:
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-10">
              <Link href="/fractional-cfo-jobs-uk" className="bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-indigo-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600">Fractional CFO</h3>
                <p className="text-sm text-gray-600 m-0">Finance, fundraising, reporting</p>
              </Link>

              <Link href="/fractional-cmo-jobs-uk" className="bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-indigo-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600">Fractional CMO</h3>
                <p className="text-sm text-gray-600 m-0">Marketing, brand, growth</p>
              </Link>

              <Link href="/fractional-cto-jobs-uk" className="bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-indigo-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600">Fractional CTO</h3>
                <p className="text-sm text-gray-600 m-0">Technology, engineering, product</p>
              </Link>

              <Link href="/fractional-coo-jobs-uk" className="bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-indigo-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600">Fractional COO</h3>
                <p className="text-sm text-gray-600 m-0">Operations, scaling, efficiency</p>
              </Link>

              <Link href="/fractional-chro-jobs-uk" className="bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-indigo-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600">Fractional CHRO</h3>
                <p className="text-sm text-gray-600 m-0">HR, people, culture</p>
              </Link>

              <Link href="/fractional-cro-jobs-uk" className="bg-white border-2 border-gray-200 p-4 rounded-lg hover:border-indigo-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-indigo-600">Fractional CRO</h3>
                <p className="text-sm text-gray-600 m-0">Revenue, sales, customer success</p>
              </Link>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Fractional vs Other Models</h2>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-bold text-gray-900">Model</th>
                    <th className="text-left py-3 font-bold text-gray-600">Time</th>
                    <th className="text-left py-3 font-bold text-gray-600">Duration</th>
                    <th className="text-left py-3 font-bold text-gray-600">Accountability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-indigo-50">
                    <td className="py-3 font-bold text-indigo-700">Fractional</td>
                    <td className="py-3">1-3 days/week</td>
                    <td className="py-3">Ongoing (6+ months)</td>
                    <td className="py-3">Owns function</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Interim</td>
                    <td className="py-3 text-gray-600">4-5 days/week</td>
                    <td className="py-3 text-gray-600">Fixed (3-12 months)</td>
                    <td className="py-3 text-gray-600">Owns function</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Consultant</td>
                    <td className="py-3 text-gray-600">Project-based</td>
                    <td className="py-3 text-gray-600">Project scope</td>
                    <td className="py-3 text-gray-600">Advises only</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Full-Time</td>
                    <td className="py-3 text-gray-600">5 days/week</td>
                    <td className="py-3 text-gray-600">Permanent</td>
                    <td className="py-3 text-gray-600">Owns function</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Why Companies Choose Fractional</h2>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-indigo-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Cost Efficiency</h4>
                  <p className="text-sm text-gray-600 m-0">Access senior talent at 50-70% of full-time cost. Pay only for time needed.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-indigo-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Experience Level</h4>
                  <p className="text-sm text-gray-600 m-0">Often more experienced than affordable full-time hires. 15-25+ years typical.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-indigo-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Flexibility</h4>
                  <p className="text-sm text-gray-600 m-0">Scale up or down as needs change. No long-term employment obligations.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-indigo-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Speed</h4>
                  <p className="text-sm text-gray-600 m-0">Start in weeks, not months. No lengthy recruitment process.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Who Uses Fractional?</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Fractional executives are most commonly used by:
            </p>

            <ul className="text-lg space-y-3 my-8">
              <li><strong>Startups (Seed to Series B):</strong> Need senior expertise but can't afford full C-suite</li>
              <li><strong>Scale-ups:</strong> Growing fast and need to professionalize functions</li>
              <li><strong>PE-backed companies:</strong> Portfolio companies needing quick capability injection</li>
              <li><strong>SMEs:</strong> Established businesses accessing skills typically reserved for larger companies</li>
            </ul>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-indigo-400">In Summary:</strong> "Fractional" means part-time senior leadership. Executives work 1-3 days/week, providing C-suite expertise at 50-70% less than full-time cost. It's the fastest-growing model in executive hiring.
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
      <section className="py-20 bg-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Explore Fractional Roles</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-executive-jobs" className="px-10 py-5 bg-white text-indigo-800 font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors">
              Executive Jobs
            </Link>
            <Link href="/fractional-roles" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-indigo-800 transition-colors">
              All Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fractional-executive" className="text-gray-600 hover:text-indigo-700 font-medium">Fractional Executive</Link>
            <Link href="/fractional-executive-meaning" className="text-gray-600 hover:text-indigo-700 font-medium">Fractional Meaning</Link>
            <Link href="/fractional-roles" className="text-gray-600 hover:text-indigo-700 font-medium">All Roles</Link>
            <Link href="/how-to-become-a-fractional-executive" className="text-gray-600 hover:text-indigo-700 font-medium">Become Fractional</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
