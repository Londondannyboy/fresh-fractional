import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Recruitment UK 2025: Specialist Executive Recruiters',
  description: 'Guide to fractional executive recruitment. Find specialist recruiters, platforms, and networks for part-time C-suite talent in the UK.',
  keywords: 'fractional recruitment, fractional executive recruiter, part-time executive recruitment, fractional hiring agency, interim executive recruitment',
  alternates: {
    canonical: 'https://fractional.quest/fractional-recruitment',
  },
  openGraph: {
    title: 'Fractional Recruitment UK 2025: Specialist Executive Recruiters',
    description: 'Find fractional executive recruiters and platforms.',
    url: 'https://fractional.quest/fractional-recruitment',
  },
}

const faqItems = [
  {
    question: 'Do I need a recruiter for fractional hiring?',
    answer: 'Not always. Many fractional executives are found through networks and referrals. But recruiters add value if you need help defining the role, accessing candidates outside your network, or want validation from specialists.',
  },
  {
    question: 'How much do fractional recruiters charge?',
    answer: 'Fractional recruiters typically charge 15-25% of the first year\'s engagement value (annualized monthly fee). Some work on retainer, others on success-only. Fees are lower than permanent executive search.',
  },
  {
    question: 'What about fractional platforms?',
    answer: 'Platforms like The Portfolio Collective, Graphite, and others connect businesses with fractional executives. They offer curated networks, often with vetting, and typically charge a percentage of fees or subscription.',
  },
  {
    question: 'Should I use interim or fractional recruiters?',
    answer: 'Many recruiters handle both. Interim specialists focus on full-time temporary roles; fractional specialists understand part-time ongoing engagements. Choose based on your specific need—part-time ongoing usually means fractional specialists.',
  },
]

export default function FractionalRecruitmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-700 to-cyan-600 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Recruitment Guide
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Fractional<br />Recruitment
            </h1>
            <p className="text-2xl md:text-3xl text-cyan-100 leading-relaxed font-light">
              How to find the right fractional executive through recruiters, platforms, and networks.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-cyan-50 border-b-4 border-cyan-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-10 rounded-lg shadow-sm border-2 border-cyan-200">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Finding Fractional Talent</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light mb-6">
              <strong className="font-semibold text-gray-900">Fractional recruitment</strong> is the process of finding and hiring part-time executives. Unlike traditional executive search, it requires understanding of flexible engagement models, day rate structures, and the fractional executive market.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Options include specialist recruiters, fractional platforms, executive networks, and direct sourcing through your own network.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Recruitment and hiring team discussion"
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
            <h2 className="text-3xl font-black text-gray-900">Fractional Recruitment Options</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              There are several ways to find fractional executive talent, each with pros and cons:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-cyan-50 border-2 border-cyan-200 p-6 rounded-lg">
                <h3 className="font-bold text-cyan-700 mb-3">Specialist Recruiters</h3>
                <p className="text-gray-700 text-sm mb-3">Firms that specialize in fractional and interim executive recruitment.</p>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>+ Deep candidate networks</li>
                  <li>+ Market expertise</li>
                  <li>+ Validation and vetting</li>
                  <li>- 15-25% fees</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3">Fractional Platforms</h3>
                <p className="text-gray-700 text-sm mb-3">Marketplaces connecting companies with vetted fractional executives.</p>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>+ Quick access to talent</li>
                  <li>+ Pre-vetted candidates</li>
                  <li>+ Platform support</li>
                  <li>- Variable quality</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3">Executive Networks</h3>
                <p className="text-gray-700 text-sm mb-3">Membership communities of portfolio executives and fractional leaders.</p>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>+ High-quality peers</li>
                  <li>+ Community vetting</li>
                  <li>+ Referral-based</li>
                  <li>- Membership required</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3">Direct/Network</h3>
                <p className="text-gray-700 text-sm mb-3">Finding candidates through your own network, LinkedIn, referrals.</p>
                <ul className="space-y-1 text-gray-600 text-sm">
                  <li>+ No fees</li>
                  <li>+ Known quantities</li>
                  <li>+ Fast process</li>
                  <li>- Limited reach</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">UK Fractional Recruitment Firms</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Several recruitment firms specialize in fractional and interim executive placement:
            </p>

            <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-lg my-10">
              <h3 className="font-bold text-gray-900 mb-4">Types of Firms</h3>
              <div className="grid gap-6 text-sm">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Boutique Fractional Specialists</h4>
                  <p className="text-gray-600">Firms focusing specifically on fractional executive placement. Deep expertise in part-time engagement models, day rates, and the fractional market.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Interim Management Firms</h4>
                  <p className="text-gray-600">Traditional interim firms increasingly offer fractional services. Strong networks but may favor full-time interim over part-time fractional.</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Executive Search with Fractional Practice</h4>
                  <p className="text-gray-600">Large search firms (Odgers, Russell Reynolds) developing fractional capabilities. Good for senior roles but may lack fractional market depth.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Fractional Platforms</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Technology platforms have emerged to connect businesses with fractional executives:
            </p>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-cyan-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">The Portfolio Collective</h4>
                  <p className="text-sm text-gray-600 m-0">UK-focused community and platform for portfolio professionals. Members are vetted, and companies can access talent through the network.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-cyan-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Graphite</h4>
                  <p className="text-sm text-gray-600 m-0">Platform connecting companies with fractional executives, particularly strong in finance and operations roles.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-cyan-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Chief (for women)</h4>
                  <p className="text-sm text-gray-600 m-0">Network for senior women executives, many of whom offer fractional services. Strong community and peer support.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-cyan-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">LinkedIn</h4>
                  <p className="text-sm text-gray-600 m-0">Not a platform per se, but searching "fractional [role]" yields many candidates. Look for those with multiple concurrent positions.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Recruiter Fees & Models</h2>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-bold text-gray-900">Model</th>
                    <th className="text-left py-3 font-bold text-cyan-700">Typical Fee</th>
                    <th className="text-left py-3 font-bold text-gray-900">How It Works</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 font-medium">Contingent</td>
                    <td className="py-3 text-cyan-700">15-20% of year 1</td>
                    <td className="py-3 text-gray-600">Pay only on successful placement</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Retained</td>
                    <td className="py-3 text-cyan-700">20-25% of year 1</td>
                    <td className="py-3 text-gray-600">Upfront commitment, dedicated search</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Platform %</td>
                    <td className="py-3 text-cyan-700">10-20% ongoing</td>
                    <td className="py-3 text-gray-600">Percentage of ongoing fees</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Subscription</td>
                    <td className="py-3 text-cyan-700">Fixed annual fee</td>
                    <td className="py-3 text-gray-600">Access to talent pool</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">When to Use a Recruiter</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
                <h3 className="font-bold text-green-700 mb-3">Use a Recruiter When:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>You need help defining the role</li>
                  <li>Your network doesn't have the expertise</li>
                  <li>You want market validation on candidates</li>
                  <li>You're hiring multiple fractional roles</li>
                  <li>Speed is critical</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
                <h3 className="font-bold text-red-700 mb-3">Skip Recruiter When:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>You have strong referrals</li>
                  <li>Budget is very tight</li>
                  <li>The role is clearly defined</li>
                  <li>You have time to search yourself</li>
                  <li>Your network has relevant candidates</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-cyan-400">Summary:</strong> Fractional recruitment can be done through specialist recruiters (15-25% fees), platforms, networks, or direct sourcing. Choose based on your budget, time, and network reach. Many successful hires come through referrals.
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
      <section className="py-20 bg-cyan-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Find Fractional Talent</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-hiring" className="px-10 py-5 bg-white text-cyan-700 font-bold uppercase tracking-wider hover:bg-cyan-50 transition-colors">
              Hiring Guide
            </Link>
            <Link href="/fractional-executive-jobs" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-cyan-700 transition-colors">
              Browse Executives
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fractional-hiring" className="text-gray-600 hover:text-cyan-700 font-medium">Fractional Hiring</Link>
            <Link href="/fractional-executive" className="text-gray-600 hover:text-cyan-700 font-medium">Fractional Executive</Link>
            <Link href="/fractional-roles" className="text-gray-600 hover:text-cyan-700 font-medium">All Roles</Link>
            <Link href="/what-is-fractional" className="text-gray-600 hover:text-cyan-700 font-medium">What is Fractional?</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
