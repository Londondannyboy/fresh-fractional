import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Director UK 2025',
  description: 'Fractional director roles UK. Part-time director-level leadership across all business functions.',
  keywords: 'fractional director, part-time director, fractional director jobs, director level, fractional leadership',
  alternates: {
    canonical: 'https://fractional.quest/fractional-director',
  },
  openGraph: {
    title: 'Fractional Director UK 2025',
    description: 'Part-time director-level leadership for growing businesses.',
    url: 'https://fractional.quest/fractional-director',
  },
}

const faqItems = [
  {
    question: 'What is a fractional director?',
    answer: 'A fractional director is a senior leader at director level who works with companies on a part-time basis, typically 1-3 days per week. They provide experienced leadership in their function without full-time commitment or cost.',
  },
  {
    question: 'How much does a fractional director cost?',
    answer: 'Fractional directors in the UK typically charge £600-£1,200 per day depending on function and experience. At 2 days per week, this equals £60,000-£120,000 annually—compared to £80,000-£150,000+ for full-time directors.',
  },
  {
    question: 'What is the difference between fractional director and fractional C-suite?',
    answer: 'Directors typically report to C-suite and focus on execution within their function. C-suite executives set company-wide strategy and sit on the leadership team. Directors are often more hands-on; C-suite more strategic.',
  },
  {
    question: 'Which director roles can be fractional?',
    answer: 'All director roles can be fractional: Marketing Director, Finance Director, Sales Director, Product Director, HR Director, IT Director, Operations Director, Digital Director, and more.',
  },
]

export default function FractionalDirectorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-700 to-amber-600 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Director Roles
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Fractional<br />Director
            </h1>
            <p className="text-2xl md:text-3xl text-amber-100 leading-relaxed font-light">
              Part-time director-level leadership across all business functions.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-amber-50 border-b-4 border-amber-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg text-center border border-amber-200">
              <div className="text-3xl font-black text-amber-700">10+</div>
              <div className="text-sm text-gray-600">Director Types</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center border border-amber-200">
              <div className="text-3xl font-black text-amber-700">£600-1,200</div>
              <div className="text-sm text-gray-600">Day Rate</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center border border-amber-200">
              <div className="text-3xl font-black text-amber-700">1-3</div>
              <div className="text-sm text-gray-600">Days/Week</div>
            </div>
            <div className="bg-white p-6 rounded-lg text-center border border-amber-200">
              <div className="text-3xl font-black text-amber-700">15+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Director leading team meeting"
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
            <h2 className="text-3xl font-black text-gray-900">Fractional Director Roles</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Fractional directors provide senior leadership at the director level—below C-suite but with significant functional responsibility. They're ideal for companies that need experienced leaders but don't require (or can't afford) full-time directors.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-10">
              <Link href="/fractional-marketing-director" className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-amber-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700">Marketing Director</h3>
                <p className="text-sm text-gray-600 mb-2">Marketing strategy, team leadership, campaigns</p>
                <div className="text-amber-700 font-bold text-sm">£700-£1,100/day</div>
              </Link>

              <Link href="/fractional-finance-director" className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-amber-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700">Finance Director</h3>
                <p className="text-sm text-gray-600 mb-2">Financial management, reporting, controls</p>
                <div className="text-amber-700 font-bold text-sm">£700-£1,200/day</div>
              </Link>

              <Link href="/fractional-sales-director-jobs-uk" className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-amber-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700">Sales Director</h3>
                <p className="text-sm text-gray-600 mb-2">Sales team, pipeline, revenue delivery</p>
                <div className="text-amber-700 font-bold text-sm">£700-£1,100/day</div>
              </Link>

              <Link href="/fractional-product-director" className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-amber-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700">Product Director</h3>
                <p className="text-sm text-gray-600 mb-2">Product strategy, roadmap, PM team</p>
                <div className="text-amber-700 font-bold text-sm">£700-£1,200/day</div>
              </Link>

              <Link href="/fractional-hr-director" className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-amber-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700">HR Director</h3>
                <p className="text-sm text-gray-600 mb-2">People ops, talent, culture</p>
                <div className="text-amber-700 font-bold text-sm">£600-£1,000/day</div>
              </Link>

              <Link href="/fractional-it-director" className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-amber-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700">IT Director</h3>
                <p className="text-sm text-gray-600 mb-2">IT infrastructure, security, systems</p>
                <div className="text-amber-700 font-bold text-sm">£600-£1,100/day</div>
              </Link>

              <Link href="/fractional-operations-director" className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-amber-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700">Operations Director</h3>
                <p className="text-sm text-gray-600 mb-2">Process, efficiency, scaling</p>
                <div className="text-amber-700 font-bold text-sm">£600-£1,100/day</div>
              </Link>

              <Link href="/fractional-digital-director" className="bg-white border-2 border-gray-200 p-5 rounded-lg hover:border-amber-400 transition-colors group">
                <h3 className="font-bold text-gray-900 group-hover:text-amber-700">Digital Director</h3>
                <p className="text-sm text-gray-600 mb-2">Digital transformation, channels</p>
                <div className="text-amber-700 font-bold text-sm">£700-£1,200/day</div>
              </Link>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Director vs C-Suite</h2>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-bold text-gray-900">Aspect</th>
                    <th className="text-left py-3 font-bold text-amber-700">Fractional Director</th>
                    <th className="text-left py-3 font-bold text-gray-500">Fractional C-Suite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 font-medium">Focus</td>
                    <td className="py-3 text-amber-700">Functional execution</td>
                    <td className="py-3 text-gray-600">Company strategy</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Reports To</td>
                    <td className="py-3 text-amber-700">CEO or C-suite</td>
                    <td className="py-3 text-gray-600">CEO or Board</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Board Involvement</td>
                    <td className="py-3 text-amber-700">Occasional</td>
                    <td className="py-3 text-gray-600">Regular</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Day Rate</td>
                    <td className="py-3 text-amber-700">£600-£1,200</td>
                    <td className="py-3 text-gray-600">£800-£1,500</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Best For</td>
                    <td className="py-3 text-amber-700">Execution-focused needs</td>
                    <td className="py-3 text-gray-600">Strategic leadership</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">When to Hire a Fractional Director</h2>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Team Needs Leadership</h4>
                  <p className="text-sm text-gray-600 m-0">You have a functional team (marketing, sales, etc.) that needs senior leadership but not a C-suite executive.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Execution Focus</h4>
                  <p className="text-sm text-gray-600 m-0">Strategy exists but needs experienced hands to execute effectively.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Budget Constraints</h4>
                  <p className="text-sm text-gray-600 m-0">Can't afford full-time director salary but need the expertise level.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-amber-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Specific Capability Gap</h4>
                  <p className="text-sm text-gray-600 m-0">Need specialized expertise that doesn't exist in current team.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Fractional Director Costs</h2>

            <div className="grid md:grid-cols-3 gap-4 my-8">
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">Day Rate</div>
                <div className="text-2xl font-black text-gray-900">£600-£1,200</div>
                <div className="text-xs text-gray-500">by function</div>
              </div>
              <div className="p-6 bg-amber-50 border border-amber-200 rounded-xl text-center">
                <div className="text-sm font-bold text-amber-700 uppercase mb-2">Annual (2 days/wk)</div>
                <div className="text-2xl font-black text-gray-900">£60,000-£120,000</div>
                <div className="text-xs text-gray-500">vs £100k+ full-time</div>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">Savings</div>
                <div className="text-2xl font-black text-gray-900">40-50%</div>
                <div className="text-xs text-gray-500">vs permanent</div>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-amber-400">Summary:</strong> Fractional directors provide senior functional leadership at £600-£1,200/day. They're more execution-focused than C-suite, ideal for teams needing experienced leadership without strategic oversight.
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
      <section className="py-20 bg-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Fractional Directors</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-executive-jobs" className="px-10 py-5 bg-white text-amber-700 font-bold uppercase tracking-wider hover:bg-amber-50 transition-colors">
              Executive Jobs
            </Link>
            <Link href="/fractional-c-suite" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-amber-700 transition-colors">
              C-Suite Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fractional-c-suite" className="text-gray-600 hover:text-amber-700 font-medium">C-Suite</Link>
            <Link href="/fractional-executive-jobs" className="text-gray-600 hover:text-amber-700 font-medium">Executive Jobs</Link>
            <Link href="/fractional-roles" className="text-gray-600 hover:text-amber-700 font-medium">All Roles</Link>
            <Link href="/fractional-executive" className="text-gray-600 hover:text-amber-700 font-medium">Fractional Executive</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
