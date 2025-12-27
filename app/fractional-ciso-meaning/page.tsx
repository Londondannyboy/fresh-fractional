import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQ } from '@/components/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CISO Meaning: What Does Fractional CISO Mean? (2025)',
  description: 'What does fractional CISO mean? Complete definition of fractional Chief Information Security Officers and part-time cybersecurity leadership.',
  keywords: 'fractional CISO meaning, what does fractional CISO mean, fractional CISO definition, part-time CISO explained, virtual CISO',
  alternates: {
    canonical: 'https://fractional.quest/fractional-ciso-meaning',
  },
  openGraph: {
    title: 'Fractional CISO Meaning: What Does Fractional CISO Mean?',
    description: 'Complete definition and explanation of fractional CISOs.',
    url: 'https://fractional.quest/fractional-ciso-meaning',
  },
}

const faqItems = [
  {
    question: 'What does fractional CISO mean?',
    answer: 'A fractional CISO is a Chief Information Security Officer who works part-time with your company, typically 1-3 days per week. They provide senior cybersecurity leadership and strategy at a fraction of full-time executive cost.',
  },
  {
    question: 'Is fractional CISO the same as virtual CISO?',
    answer: 'Very similar. Both provide part-time CISO services. "Virtual CISO" (vCISO) emphasizes remote delivery, while "fractional CISO" emphasizes part-time commitment. In practice, most fractional CISOs work primarily remotely.',
  },
  {
    question: 'Why do companies need a CISO?',
    answer: 'Companies need a CISO to manage cyber risk, ensure compliance (GDPR, ISO 27001, etc.), protect against breaches, and build security programs. Increasingly, customers and investors require evidence of security leadership.',
  },
  {
    question: 'How much does a fractional CISO cost?',
    answer: 'Fractional CISOs typically cost £2,000-£6,000 per month for 1-2 days per week. This compares to £120,000-£200,000+ for a full-time CISO salary, making it highly cost-effective for SMEs.',
  },
]

export default function FractionalCISOMeaningPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Fractional CISO Meaning: What Does Fractional CISO Mean?',
    description: 'What does fractional CISO mean? Complete definition of fractional Chief Information Security Officers.',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=1200',
    author: { '@type': 'Organization', name: 'Fractional Quest', url: 'https://fractional.quest' },
    publisher: { '@type': 'Organization', name: 'Fractional Quest', url: 'https://fractional.quest', logo: { '@type': 'ImageObject', url: 'https://fractional.quest/logo.svg' } },
    datePublished: '2025-01-01',
    dateModified: '2025-01-01',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fractional.quest/fractional-ciso-meaning' },
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
      { '@type': 'ListItem', position: 2, name: 'CISO', item: 'https://fractional.quest/fractional-ciso' },
      { '@type': 'ListItem', position: 3, name: 'CISO Meaning', item: 'https://fractional.quest/fractional-ciso-meaning' },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-700 py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block bg-white/10 backdrop-blur text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6 rounded">
              Definition Guide
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Fractional CISO<br />Meaning
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed font-light">
              What does "fractional CISO" actually mean? A complete explanation.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-16 bg-slate-100 border-b-4 border-slate-800">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white p-10 rounded-lg shadow-sm border-2 border-slate-200">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Quick Definition</h2>
            <p className="text-2xl text-gray-700 leading-relaxed font-light mb-6">
              A <strong className="font-semibold text-gray-900">fractional CISO</strong> is a Chief Information Security Officer who works part-time with your company—typically 1-3 days per week. You get senior cybersecurity leadership at a <em>fraction</em> of full-time cost.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              "Fractional" means you get a fraction of their time. They typically serve 3-6 clients simultaneously, bringing security expertise to each organization.
            </p>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Cybersecurity professional at work"
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
            <h2 className="text-3xl font-black text-gray-900">Breaking Down "Fractional CISO"</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-slate-100 border-2 border-slate-300 p-8 rounded-lg">
                <h3 className="font-bold text-slate-700 mb-3 text-xl">"Fractional"</h3>
                <p className="text-gray-700 mb-0">
                  <strong>A fraction of their time.</strong> Rather than full-time employment, a fractional CISO dedicates part of their capacity to your business—typically 1-3 days per week or equivalent hours.
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-3 text-xl">"CISO"</h3>
                <p className="text-gray-700 mb-0">
                  <strong>Chief Information Security Officer.</strong> The senior executive responsible for cybersecurity strategy, risk management, compliance, and protecting the organization from cyber threats.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Fractional CISO vs Virtual CISO</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              You'll often see "vCISO" (virtual CISO) used alongside fractional CISO. The terms are largely interchangeable:
            </p>

            <div className="overflow-x-auto my-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 font-bold text-gray-900">Term</th>
                    <th className="text-left py-3 font-bold text-gray-900">Emphasis</th>
                    <th className="text-left py-3 font-bold text-gray-900">Common Context</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-slate-50">
                    <td className="py-3 font-bold text-slate-700">Fractional CISO</td>
                    <td className="py-3">Part-time commitment</td>
                    <td className="py-3">Aligns with fractional executive trend</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Virtual CISO (vCISO)</td>
                    <td className="py-3 text-gray-600">Remote delivery</td>
                    <td className="py-3 text-gray-600">Cybersecurity industry term</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">CISO-as-a-Service</td>
                    <td className="py-3 text-gray-600">Service-based model</td>
                    <td className="py-3 text-gray-600">Managed security providers</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">Part-Time CISO</td>
                    <td className="py-3 text-gray-600">Time commitment</td>
                    <td className="py-3 text-gray-600">General business term</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">What Does a CISO Actually Do?</h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              According to the <a href="https://www.ncsc.gov.uk" target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-800">National Cyber Security Centre</a>, organizations need security leadership to manage increasingly complex cyber risks. A CISO provides that leadership.
            </p>

            <div className="grid gap-4 my-10">
              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-slate-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Security Strategy</h4>
                  <p className="text-sm text-gray-600 m-0">Develop and implement cybersecurity strategy aligned with business objectives and risk appetite.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-slate-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Risk Management</h4>
                  <p className="text-sm text-gray-600 m-0">Identify, assess, and manage cyber risks. Communicate risk to the board in business terms.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-slate-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Compliance</h4>
                  <p className="text-sm text-gray-600 m-0">Ensure compliance with regulations (GDPR, NIS2) and standards (ISO 27001, SOC 2, Cyber Essentials).</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-slate-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Incident Response</h4>
                  <p className="text-sm text-gray-600 m-0">Prepare for and manage security incidents. Develop response plans and lead during breaches.</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 border rounded-lg bg-white">
                <div className="w-1.5 bg-slate-600 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-gray-900">Security Program</h4>
                  <p className="text-sm text-gray-600 m-0">Build and mature the overall security program: policies, awareness, technology, and people.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Why Fractional CISO Makes Sense</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">The Problem</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Full-time CISOs cost £120,000-£200,000+</li>
                  <li>Cyber expertise is scarce and expensive</li>
                  <li>SMEs can't justify full-time security exec</li>
                  <li>But security leadership is increasingly required</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3">The Solution</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Fractional CISO at £2,000-£6,000/month</li>
                  <li>Senior expertise without full-time cost</li>
                  <li>Scalable as security needs grow</li>
                  <li>Meets customer and compliance requirements</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">When to Hire a Fractional CISO</h2>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <div className="bg-green-50 border-2 border-green-200 p-6 rounded-lg">
                <h3 className="font-bold text-green-700 mb-3">Good Fit:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>SMEs handling sensitive data</li>
                  <li>Companies pursuing ISO 27001 or SOC 2</li>
                  <li>B2B businesses with security questionnaires</li>
                  <li>Regulated industries (finance, health)</li>
                  <li>Post-breach recovery</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-lg">
                <h3 className="font-bold text-red-700 mb-3">May Need Full-Time:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>Large enterprises (500+ employees)</li>
                  <li>Critical national infrastructure</li>
                  <li>Financial services (FCA regulated)</li>
                  <li>Defense/government contractors</li>
                </ul>
              </div>
            </div>

            <h2 className="text-3xl font-black text-gray-900 mt-16">Cost Comparison</h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-8 bg-slate-100 border-2 border-slate-300 rounded-xl">
                <div className="text-sm font-bold text-slate-700 uppercase mb-2">Fractional CISO</div>
                <div className="text-3xl font-black text-gray-900 mb-2">£2,000-£6,000/month</div>
                <p className="text-gray-600 text-sm mb-0">1-3 days per week engagement</p>
              </div>
              <div className="p-8 bg-gray-50 border-2 border-gray-200 rounded-xl">
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">Full-Time CISO</div>
                <div className="text-3xl font-black text-gray-900 mb-2">£12,000-£18,000/month</div>
                <p className="text-gray-600 text-sm mb-0">Salary + benefits</p>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-10 rounded-lg my-8">
              <p className="text-2xl font-light leading-relaxed mb-0">
                <strong className="text-slate-400">Summary:</strong> A fractional CISO (or vCISO) is a part-time Chief Information Security Officer who provides cybersecurity leadership 1-3 days per week. "Fractional" means you get a fraction of their time at a fraction of full-time cost—ideal for SMEs needing security leadership.
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
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-6">Learn More About Fractional CISOs</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/fractional-ciso" className="px-10 py-5 bg-white text-slate-800 font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors">
              Complete CISO Guide
            </Link>
            <Link href="/fractional-ciso-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-slate-800 transition-colors">
              CISO Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/fractional-ciso" className="text-gray-600 hover:text-slate-700 font-medium">Fractional CISO</Link>
            <Link href="/fractional-cto" className="text-gray-600 hover:text-slate-700 font-medium">Fractional CTO</Link>
            <Link href="/fractional-executive-meaning" className="text-gray-600 hover:text-slate-700 font-medium">Fractional Executive Meaning</Link>
            <Link href="/what-is-fractional" className="text-gray-600 hover:text-slate-700 font-medium">What is Fractional?</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
