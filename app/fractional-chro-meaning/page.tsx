import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CHRO Meaning: What Does Fractional CHRO Mean? (2025)',
  description: 'What does fractional CHRO mean? Complete definition and explanation of fractional Chief Human Resources Officers and part-time HR leadership.',
  keywords: 'fractional CHRO meaning, what does fractional CHRO mean, fractional CHRO definition, part-time CHRO explained, fractional HR director',
  alternates: {
    canonical: 'https://fractional.quest/fractional-chro-meaning',
  },
  openGraph: {
    title: 'Fractional CHRO Meaning: What Does Fractional CHRO Mean?',
    description: 'Complete definition and explanation of fractional CHROs.',
    url: 'https://fractional.quest/fractional-chro-meaning',
  },
}

const faqItems = [
  {
    question: 'What does fractional CHRO mean?',
    answer: 'A fractional CHRO is a Chief Human Resources Officer (or Chief People Officer) who works part-time with your company, typically 1-3 days per week. They provide strategic HR leadership at a fraction of full-time cost while working with multiple organizations simultaneously.',
  },
  {
    question: 'What is the difference between CHRO and CPO?',
    answer: 'CHRO (Chief Human Resources Officer) and CPO (Chief People Officer) are typically the same role with different titles. CPO is increasingly popular in tech and startups, emphasizing the people-centric approach. Both lead HR strategy at the executive level.',
  },
  {
    question: 'Is fractional CHRO the same as HR consultant?',
    answer: 'No. A fractional CHRO is an ongoing leadership role—they join your executive team, own the people function, and are accountable for outcomes. HR consultants typically work on specific projects and advise rather than lead.',
  },
  {
    question: 'When should I hire a fractional CHRO vs HR Manager?',
    answer: 'Hire a fractional CHRO when you need strategic people leadership, organizational design, and executive-level HR expertise. An HR Manager handles day-to-day HR operations but typically lacks the strategic scope and seniority of a CHRO.',
  },
]

export default function FractionalCHROMeaningPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fractional CHRO Meaning: What Does Fractional CHRO Mean?',
    description: 'What does fractional CHRO mean? Complete definition and explanation of fractional Chief Human Resources Officers.',
    image: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: { '@type': 'Organization', name: 'Fractional Quest', url: 'https://fractional.quest' },
    publisher: { '@type': 'Organization', name: 'Fractional Quest', url: 'https://fractional.quest', logo: { '@type': 'ImageObject', url: 'https://fractional.quest/logo.svg' } },
    datePublished: '2025-01-01',
    dateModified: '2025-01-01',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fractional.quest/fractional-chro-meaning' },
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
      { '@type': 'ListItem', position: 2, name: 'CHRO', item: 'https://fractional.quest/fractional-chro' },
      { '@type': 'ListItem', position: 3, name: 'CHRO Meaning', item: 'https://fractional.quest/fractional-chro-meaning' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-fuchsia-700 to-fuchsia-600 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Definition Guide
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Fractional CHRO<br />Meaning
            </h1>
            <p className="text-2xl md:text-3xl text-fuchsia-100 leading-relaxed font-light">
              What does "fractional CHRO" actually mean? A complete explanation.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-fuchsia-50 border-b-4 border-fuchsia-700">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-10 rounded-lg shadow-sm border-2 border-fuchsia-200">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Quick Definition</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light mb-6">
              A <strong className="font-semibold text-gray-900">fractional CHRO</strong> is a Chief Human Resources Officer (or Chief People Officer) who works part-time with your company—typically 1-3 days per week. You get senior people leadership at a <em>fraction</em> of full-time cost.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              "Fractional" means you're hiring a fraction of their time. They typically work with 2-4 companies simultaneously, dedicating strategic HR expertise to each.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="HR leadership meeting"
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
            <h2 className="text-3xl font-black text-gray-900">Breaking Down "Fractional CHRO"</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Let's understand each component of the term:
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-fuchsia-50 border-2 border-fuchsia-200 p-8 rounded-lg">
                <h3 className="font-bold text-fuchsia-700 mb-3 text-xl">"Fractional"</h3>
                <p className="text-gray-700 mb-0">
                  <strong>A fraction of their time.</strong> Rather than full-time employment, a fractional CHRO dedicates a portion of their week to your business—perhaps 1-2 days—while serving other clients with the remainder.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3 text-xl">"CHRO"</h3>
                <p className="text-gray-700 mb-0">
                  <strong>Chief Human Resources Officer.</strong> The senior executive responsible for people strategy, organizational design, talent management, culture, employee experience, and HR operations.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">CHRO vs CPO vs HRD</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              You'll encounter various titles for the senior HR leadership role. Here's how they compare:
            </p>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-bold text-gray-900">Title</th>
                    <th className="text-left py-3 font-bold text-gray-900">Full Name</th>
                    <th className="text-left py-3 font-bold text-gray-900">Typical Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-fuchsia-50">
                    <td className="py-3 font-bold text-fuchsia-700">CHRO</td>
                    <td className="py-3">Chief Human Resources Officer</td>
                    <td className="py-3">Traditional corporate, enterprise</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">CPO</td>
                    <td className="py-3 text-gray-600">Chief People Officer</td>
                    <td className="py-3 text-gray-600">Tech, startups, modern companies</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">HRD</td>
                    <td className="py-3 text-gray-600">HR Director</td>
                    <td className="py-3 text-gray-600">UK tradition, senior HR lead</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">VP People</td>
                    <td className="py-3 text-gray-600">Vice President of People</td>
                    <td className="py-3 text-gray-600">US tech companies</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              According to the <a href="https://www.cipd.org" target="_blank" rel="noopener noreferrer" className="text-fuchsia-700 hover:text-fuchsia-800">CIPD</a>, these titles are largely interchangeable at the strategic level, with "Chief People Officer" gaining popularity to emphasize the human-centric approach to workforce management.
            </p>

            <h2 className="text-3xl font-black text-gray-900 mt-16">What Does a Fractional CHRO Do?</h2>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-fuchsia-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">People Strategy</h4>
                  <p className="text-sm text-gray-600 m-0">Align people strategy with business objectives. Workforce planning, talent strategy, and organizational development.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-fuchsia-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Organizational Design</h4>
                  <p className="text-sm text-gray-600 m-0">Structure the organization for effectiveness. Reporting lines, role clarity, and team configuration.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-fuchsia-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Talent Management</h4>
                  <p className="text-sm text-gray-600 m-0">Hiring strategy, onboarding, development, performance management, and succession planning.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-fuchsia-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Culture & Engagement</h4>
                  <p className="text-sm text-gray-600 m-0">Build and maintain organizational culture. Employee engagement, values, and workplace experience.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-fuchsia-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Compliance & Risk</h4>
                  <p className="text-sm text-gray-600 m-0">Employment law compliance, employee relations, risk management, and HR policy.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Fractional CHRO vs Other Options</h2>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-bold text-gray-900">Option</th>
                    <th className="text-left py-3 font-bold text-gray-900">Commitment</th>
                    <th className="text-left py-3 font-bold text-gray-900">Cost</th>
                    <th className="text-left py-3 font-bold text-gray-900">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-fuchsia-50">
                    <td className="py-3 font-bold text-fuchsia-700">Fractional CHRO</td>
                    <td className="py-3">1-3 days/week ongoing</td>
                    <td className="py-3">£3,000-£8,000/month</td>
                    <td className="py-3">Growing companies 20-200 people</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Full-Time CHRO</td>
                    <td className="py-3 text-gray-600">5 days/week</td>
                    <td className="py-3 text-gray-600">£120,000-£200,000/year</td>
                    <td className="py-3 text-gray-600">Large organizations 500+</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">HR Manager</td>
                    <td className="py-3 text-gray-600">Full-time</td>
                    <td className="py-3 text-gray-600">£45,000-£70,000/year</td>
                    <td className="py-3 text-gray-600">Operational HR needs</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">HR Consultant</td>
                    <td className="py-3 text-gray-600">Project-based</td>
                    <td className="py-3 text-gray-600">£800-£1,500/day</td>
                    <td className="py-3 text-gray-600">Specific projects/audits</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">When to Consider a Fractional CHRO</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
                <h3 className="font-bold text-green-700 mb-3">Good Fit:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Scaling from 20-200+ employees</li>
                  <li>Need strategic HR, not just operations</li>
                  <li>Preparing for funding or exit</li>
                  <li>Culture or engagement challenges</li>
                  <li>Complex organizational change</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
                <h3 className="font-bold text-red-700 mb-3">Less Suitable:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Very small teams (under 15)</li>
                  <li>Only need payroll/admin</li>
                  <li>Heavily unionized environments</li>
                  <li>Large enterprises (need full-time)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-fuchsia-400">Summary:</strong> A fractional CHRO (or CPO) is a part-time Chief Human Resources Officer who provides strategic people leadership 1-3 days per week. "Fractional" means you get a fraction of their time at a fraction of full-time cost—ideal for growing companies that need senior HR expertise.
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
      <section className="py-20 bg-fuchsia-700 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Learn More About Fractional HR</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-chro" className="px-10 py-5 bg-white text-fuchsia-700 font-bold uppercase tracking-wider hover:bg-fuchsia-50 transition-colors">
              Complete CHRO Guide
            </Link>
            <Link href="/fractional-chro-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-fuchsia-700 transition-colors">
              CHRO Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fractional-chro" className="text-gray-600 hover:text-fuchsia-700 font-medium">Fractional CHRO</Link>
            <Link href="/part-time-chro" className="text-gray-600 hover:text-fuchsia-700 font-medium">Part-Time CHRO</Link>
            <Link href="/fractional-executive-meaning" className="text-gray-600 hover:text-fuchsia-700 font-medium">Fractional Executive Meaning</Link>
            <Link href="/what-is-fractional" className="text-gray-600 hover:text-fuchsia-700 font-medium">What is Fractional?</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
