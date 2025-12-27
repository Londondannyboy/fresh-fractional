import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional Hiring UK 2025: How to Hire Fractional Executives',
  description: 'Complete guide to hiring fractional executives. How to find, evaluate, and engage part-time C-suite leaders for your business.',
  keywords: 'fractional hiring, hire fractional executive, fractional executive recruitment, part-time executive hiring, fractional CFO hiring',
  alternates: {
    canonical: 'https://fractional.quest/fractional-hiring',
  },
  openGraph: {
    title: 'Fractional Hiring UK 2025: How to Hire Fractional Executives',
    description: 'Complete guide to hiring fractional executives.',
    url: 'https://fractional.quest/fractional-hiring',
  },
}

const faqItems = [
  {
    question: 'How do I hire a fractional executive?',
    answer: 'Start by defining the role and time commitment needed. Then source candidates through your network, specialist recruiters, or fractional platforms. Interview for both expertise and fit, and agree on engagement terms including days, deliverables, and fees.',
  },
  {
    question: 'How long does it take to hire a fractional executive?',
    answer: 'Fractional hiring is typically faster than full-time—often 2-4 weeks from search to start. Because fractional executives are already experienced, there\'s less evaluation needed. Many can start within days of agreement.',
  },
  {
    question: 'Should I use a recruiter for fractional hiring?',
    answer: 'Specialist fractional recruiters can add value if you need help defining the role, accessing candidates outside your network, or validating candidates. Fees are typically 15-25% of first-year engagement value.',
  },
  {
    question: 'What should be in a fractional executive contract?',
    answer: 'Key elements include: scope of work, time commitment (days/hours), fee structure and payment terms, notice period, confidentiality, IP ownership, and termination clauses. Most use consultancy agreements rather than employment contracts.',
  },
]

export default function FractionalHiringPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fractional Hiring UK 2025: How to Hire Fractional Executives',
    description: 'Complete guide to hiring fractional executives. How to find, evaluate, and engage part-time C-suite leaders.',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: { '@type': 'Organization', name: 'Fractional Quest', url: 'https://fractional.quest' },
    publisher: { '@type': 'Organization', name: 'Fractional Quest', url: 'https://fractional.quest', logo: { '@type': 'ImageObject', url: 'https://fractional.quest/logo.svg' } },
    datePublished: '2025-01-01',
    dateModified: '2025-01-01',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fractional.quest/fractional-hiring' },
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
      { '@type': 'ListItem', position: 2, name: 'Hiring', item: 'https://fractional.quest/fractional-executive-services' },
      { '@type': 'ListItem', position: 3, name: 'Fractional Hiring', item: 'https://fractional.quest/fractional-hiring' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-700 to-sky-600 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Hiring Guide
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Fractional<br />Hiring
            </h1>
            <p className="text-2xl md:text-3xl text-sky-100 leading-relaxed font-light">
              How to find, evaluate, and engage the right fractional executive for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-sky-50 border-b-4 border-sky-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-sky-700 mb-2">2-4 weeks</div>
              <div className="text-gray-600">Typical time to hire</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-sky-700 mb-2">60-70%</div>
              <div className="text-gray-600">Cost savings vs full-time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-sky-700 mb-2">3-6 months</div>
              <div className="text-gray-600">Typical initial engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Interview and hiring meeting"
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
            <h2 className="text-3xl font-black text-gray-900">The Fractional Hiring Process</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Hiring a fractional executive is different from traditional recruitment. Here's a step-by-step guide:
            </p>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sky-600">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Define the Role</h4>
                  <p className="text-sm text-gray-600 m-0">Clarify what you need: Which function? What problems to solve? What outcomes are expected? How many days per week? This shapes everything else.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sky-600">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Source Candidates</h4>
                  <p className="text-sm text-gray-600 m-0">Tap your network, use specialist recruiters, or try fractional platforms. The best fractional executives often come through referrals.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sky-600">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Evaluate Fit</h4>
                  <p className="text-sm text-gray-600 m-0">Interview for relevant experience, cultural fit, and chemistry with leadership team. Check references from previous fractional engagements.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sky-600">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Agree Terms</h4>
                  <p className="text-sm text-gray-600 m-0">Negotiate days, fees, scope, and duration. Typical engagements are 1-3 days/week for 3-6 months initially, with monthly rolling thereafter.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sky-600">5</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Onboard Effectively</h4>
                  <p className="text-sm text-gray-600 m-0">Even part-time executives need proper onboarding. Introduce to team, share context, set up systems access, and align on first priorities.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Where to Find Fractional Executives</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Direct Sources</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Your network:</strong> Ask advisors, investors, peers for referrals</li>
                  <li><strong>LinkedIn:</strong> Search for "fractional [role]" + industry</li>
                  <li><strong>Industry events:</strong> Conference speakers, panelists</li>
                  <li><strong>Content creators:</strong> People sharing expertise publicly</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">Intermediaries</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Specialist recruiters:</strong> Focus on fractional/interim</li>
                  <li><strong>Fractional platforms:</strong> Marketplaces for part-time execs</li>
                  <li><strong>Executive networks:</strong> The Portfolio Collective, Chief</li>
                  <li><strong>Investors/VCs:</strong> Portfolio support networks</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Evaluating Fractional Candidates</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Unlike full-time hires, fractional executives bring immediate expertise. Focus evaluation on:
            </p>

            <div className="bg-sky-50 border-2 border-sky-200 p-8 rounded-lg my-10">
              <h3 className="font-bold text-gray-900 mb-4">Key Evaluation Criteria</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Relevant experience:</strong> Have they solved your specific challenges before?</li>
                  <li><strong>Stage fit:</strong> Have they worked at your company stage/size?</li>
                  <li><strong>Industry knowledge:</strong> Do they understand your market?</li>
                </ul>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li><strong>Working style:</strong> Can they be effective part-time?</li>
                  <li><strong>Chemistry:</strong> Will they work well with your team?</li>
                  <li><strong>References:</strong> What do previous clients say?</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Fractional vs Full-Time Hiring</h2>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-bold text-gray-900">Aspect</th>
                    <th className="text-left py-3 font-bold text-sky-700">Fractional</th>
                    <th className="text-left py-3 font-bold text-gray-500">Full-Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 font-medium">Time to hire</td>
                    <td className="py-3 text-sky-700">2-4 weeks</td>
                    <td className="py-3 text-gray-600">3-6 months</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Contract type</td>
                    <td className="py-3 text-sky-700">Consultancy agreement</td>
                    <td className="py-3 text-gray-600">Employment contract</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Notice period</td>
                    <td className="py-3 text-sky-700">Typically 1 month</td>
                    <td className="py-3 text-gray-600">3-6 months</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Risk</td>
                    <td className="py-3 text-sky-700">Low (easy to end)</td>
                    <td className="py-3 text-gray-600">High (costly to change)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Benefits/pension</td>
                    <td className="py-3 text-sky-700">Not applicable</td>
                    <td className="py-3 text-gray-600">Required</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Contract Essentials</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Fractional executives typically work under consultancy agreements rather than employment contracts. Key terms to include:
            </p>

            <ul className="text-lg space-y-3 my-8">
              <li><strong>Scope of work:</strong> Clear description of responsibilities and deliverables</li>
              <li><strong>Time commitment:</strong> Days per week/month, flexibility arrangements</li>
              <li><strong>Fees and payment:</strong> Day rate or monthly retainer, payment terms</li>
              <li><strong>Duration and notice:</strong> Initial term and rolling renewal, notice period</li>
              <li><strong>Confidentiality:</strong> Protection of sensitive business information</li>
              <li><strong>IP ownership:</strong> Work product belongs to the company</li>
              <li><strong>Non-compete:</strong> Consider restrictions on working with competitors</li>
            </ul>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-sky-400">Summary:</strong> Hiring a fractional executive is faster and lower-risk than full-time. Define the role, source through network and specialists, evaluate for fit and experience, and agree on clear terms. Typical time to hire is 2-4 weeks.
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
      <section className="py-20 bg-sky-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Ready to Hire Fractional?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-executive-jobs" className="px-10 py-5 bg-white text-sky-700 font-bold uppercase tracking-wider hover:bg-sky-50 transition-colors">
              Browse Executives
            </Link>
            <Link href="/fractional-roles" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-sky-700 transition-colors">
              All Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fractional-recruitment" className="text-gray-600 hover:text-sky-700 font-medium">Fractional Recruitment</Link>
            <Link href="/fractional-executive" className="text-gray-600 hover:text-sky-700 font-medium">Fractional Executive</Link>
            <Link href="/what-is-fractional" className="text-gray-600 hover:text-sky-700 font-medium">What is Fractional?</Link>
            <Link href="/fractional-roles" className="text-gray-600 hover:text-sky-700 font-medium">All Roles</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
