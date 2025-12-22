import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ } from '@/components/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

const COMPLIANCE_SERVICE_FAQS = [
  {
    question: 'What is a Fractional Compliance Officer?',
    answer: 'A Fractional Compliance Officer is an experienced compliance executive who works with your company part-time, typically 1-3 days per week. You get expert compliance leadership, regulatory expertise, and risk management without the cost of a full-time executive.',
  },
  {
    question: 'When should my company hire a Fractional Compliance Officer?',
    answer: 'Consider hiring a fractional compliance officer when: you need FCA authorisation; you\'re launching a fintech product; you\'re expanding into new regulated markets; you need GDPR or AML compliance expertise; customers are asking about your compliance practices; or you need to build a compliance programme from scratch.',
  },
  {
    question: 'How much does a Fractional Compliance Officer cost?',
    answer: 'Fractional Compliance Officers typically charge £700-£1,000 per day in the UK. At 2 days per week, this translates to roughly £70,000-£100,000 annually—compared to £120,000-£200,000+ for a full-time compliance officer.',
  },
  {
    question: 'What does a Fractional Compliance Officer do?',
    answer: 'A Fractional Compliance Officer develops compliance strategy, manages regulatory relationships, leads compliance programmes (GDPR, AML, FCA), conducts risk assessments, develops policies and procedures, delivers compliance training, and advises the board on regulatory matters.',
  },
  {
    question: 'Can a Fractional Compliance Officer help with FCA authorisation?',
    answer: 'Yes—FCA authorisation is one of the most common reasons to hire a fractional compliance officer. They can assess your readiness, develop required policies and controls, prepare application materials, manage the authorisation process, and ensure you meet ongoing regulatory obligations.',
  },
  {
    question: 'What compliance specializations are available?',
    answer: 'Fractional compliance officers typically specialise in areas such as: Financial Services (FCA, PRA); Data Protection (GDPR, Data Privacy); Anti-Money Laundering (AML/CTF); Fintech Compliance; Payment Services; Healthcare (HIPAA); or cross-industry regulatory compliance.',
  },
]

export const metadata: Metadata = {
  title: 'Hire Fractional Compliance Officer UK | Outsourced Compliance Services',
  description: 'Hire a Fractional Compliance Officer for your business. Access senior compliance leadership at a fraction of full-time cost. Expert compliance officers for FCA, GDPR, AML, and regulatory compliance. Start within days.',
  keywords: 'hire fractional compliance officer, fractional compliance services, outsourced compliance, part time compliance officer, fractional compliance uk, compliance consultant, fca compliance, gdpr compliance',
  alternates: {
    canonical: 'https://fractional.quest/fractional-compliance-services',
  },
  openGraph: {
    title: 'Hire Fractional Compliance Officer UK | Outsourced Compliance Services',
    description: 'Hire a Fractional Compliance Officer for your business. Senior compliance leadership at a fraction of full-time cost.',
    images: ['/images/fractional-compliance-services.jpg'],
    url: 'https://fractional.quest/fractional-compliance-services',
  },
}

export default function FractionalComplianceServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema.org markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Fractional Compliance Officer Services',
            description: 'Part-time compliance officer services for businesses requiring regulatory expertise without full-time commitment',
            provider: {
              '@type': 'Organization',
              name: 'Fractional.quest',
              url: 'https://fractional.quest',
            },
            areaServed: 'United Kingdom',
            audience: {
              '@type': 'BusinessAudience',
              name: 'Companies requiring compliance leadership',
            },
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '700-1000',
                priceCurrency: 'GBP',
                unitText: 'per day',
              },
            },
          }),
        }}
      />

      {/* Hero Section with Unsplash Image */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
            alt="Compliance team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/90 to-slate-900/85" />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-emerald-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Compliance Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional Compliance<br />
                <span className="text-emerald-400">Officer Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional Compliance Officer</strong> to navigate regulatory requirements.
                Senior compliance leadership, regulatory expertise, and risk management—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-emerald-400">FCA</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Authorised</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">1-3</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Days/Week</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">12+ Yrs</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Experience</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors">
                  Hire a Compliance Officer
                </Link>
                <Link href="#calculator" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional Compliance Officer */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional Compliance Officer?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional Compliance Officer</strong> is an experienced compliance executive who works with your company on a part-time basis—typically 1-3 days per week. You get strategic compliance leadership, regulatory expertise, and risk management without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike compliance consultants who perform one-off assessments, a fractional compliance officer becomes your compliance leader. They build and own your compliance programme, manage regulatory relationships, drive regulatory adherence, and ensure compliance enables your business rather than blocking it. Following <a href="https://www.fca.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">FCA regulatory standards</a> and <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">ICO data protection requirements</a>, they bring enterprise-grade compliance practices to growing companies.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-emerald-500">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Compliance is the foundation of trust. A fractional compliance officer ensures you meet regulatory requirements without breaking the bank."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Compliance as a Business Enabler</h3>
            <p>
              Many companies see compliance as a burden—something that slows things down and adds cost. A good fractional compliance officer turns this around. They implement compliance programmes that enable the business: securing regulatory approvals, building customer confidence, entering new markets, and protecting against real risks without unnecessary bureaucracy. Leveraging <a href="https://www.fca.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">FCA guidance</a> and <a href="https://www.bankofengland.co.uk/prudential-regulation" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-700 underline">PRA requirements</a>, they build compliance frameworks that scale with growth.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional Compliance Officer Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional compliance officer will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Compliance Strategy',
                description: 'Develop compliance strategy aligned with business objectives. Create roadmaps that balance regulatory requirements, risk, and business agility.',
                icon: '🎯',
              },
              {
                title: 'Regulatory Compliance',
                description: 'Ensure compliance with FCA, GDPR, AML, PSD2, and other regulatory frameworks. Manage ongoing regulatory obligations and reporting.',
                icon: '✅',
              },
              {
                title: 'Risk Assessments',
                description: 'Conduct compliance risk assessments. Identify, evaluate, and mitigate regulatory risks before they become issues.',
                icon: '⚠️',
              },
              {
                title: 'Policy Development',
                description: 'Develop and maintain policies, procedures, and controls. Ensure documentation meets regulatory requirements and operational needs.',
                icon: '📋',
              },
              {
                title: 'Regulatory Relationships',
                description: 'Manage relationships with regulators (FCA, ICO, PRA). Handle regulatory inquiries, submissions, and communications.',
                icon: '🤝',
              },
              {
                title: 'AML/CTF Programmes',
                description: 'Build and manage anti-money laundering and counter-terrorist financing programmes. Ensure KYC, transaction monitoring, and reporting compliance.',
                icon: '🔍',
              },
              {
                title: 'Compliance Training',
                description: 'Develop and deliver compliance training programmes. Build compliance culture and ensure employees understand their obligations.',
                icon: '👥',
              },
              {
                title: 'Incident Management',
                description: 'Lead compliance incident response. Manage regulatory breaches, conduct investigations, and implement corrective actions.',
                icon: '🚨',
              },
              {
                title: 'Audit & Monitoring',
                description: 'Conduct compliance audits and monitoring. Test controls, identify gaps, and ensure continuous compliance improvement.',
                icon: '📊',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-emerald-300 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Specializations */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Specializations</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Types of Compliance Expertise</h2>
            <p className="text-gray-600 mt-4">Our fractional compliance officers specialise in various regulatory areas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: 'FCA Compliance', description: 'Financial Services' },
              { name: 'GDPR & Privacy', description: 'Data Protection' },
              { name: 'AML/CTF', description: 'Anti-Money Laundering' },
              { name: 'Fintech', description: 'Digital Finance' },
              { name: 'PSD2/PSRs', description: 'Payment Services' },
              { name: 'E-Money', description: 'Electronic Money' },
              { name: 'Consumer Credit', description: 'FCA Regulated' },
              { name: 'MiFID II', description: 'Investment Services' },
              { name: 'SMCR', description: 'Senior Managers' },
            ].map((spec, index) => (
              <div key={index} className="bg-gray-50 p-4 text-center border border-gray-200">
                <div className="font-black text-gray-900">{spec.name}</div>
                <div className="text-xs text-gray-500">{spec.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Hire */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Timing</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional Compliance Officer?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'FCA Authorisation',
                description: 'Applying for FCA authorisation or approval. Need expert guidance to navigate the application process and meet regulatory requirements.',
                timing: '6-12 months before launch',
              },
              {
                scenario: 'Launching Fintech Product',
                description: 'Launching a financial services product. Need compliance expertise to ensure regulatory compliance from day one.',
                timing: 'Before product launch',
              },
              {
                scenario: 'GDPR Compliance',
                description: 'Processing customer data and need GDPR compliance. Require data protection expertise and DPO-level oversight.',
                timing: 'Before processing data',
              },
              {
                scenario: 'AML Requirements',
                description: 'Handling payments or customer funds. Need AML/CTF programme development and ongoing monitoring.',
                timing: 'Immediately',
              },
              {
                scenario: 'Market Expansion',
                description: 'Expanding into new regulated markets or jurisdictions. Need expertise in new regulatory frameworks.',
                timing: '6 months before expansion',
              },
              {
                scenario: 'Regulatory Scrutiny',
                description: 'Received regulatory inquiry or identified compliance gaps. Need immediate expert support to address issues.',
                timing: 'Immediately',
              },
              {
                scenario: 'Enterprise Customers',
                description: 'Enterprise clients asking about compliance practices. Need professional compliance function to win deals.',
                timing: 'Before losing deals',
              },
              {
                scenario: 'Fundraising',
                description: 'Investors conducting due diligence. Need to demonstrate robust compliance practices and regulatory readiness.',
                timing: '3-6 months before raise',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-emerald-600 uppercase tracking-wider">{item.timing}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Companies */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Companies Choose Fractional Compliance</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">💰</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Cost Effective</h3>
                <p className="text-gray-600 text-sm">Pay only for the time you need. Typically 50-60% less than a full-time hire when factoring in salary, benefits, and overhead.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">⚡</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Immediate Impact</h3>
                <p className="text-gray-600 text-sm">Start within days, not months. No lengthy recruitment process. Fractional officers hit the ground running with immediate value.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">🎓</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Senior Expertise</h3>
                <p className="text-gray-600 text-sm">Access highly experienced compliance professionals you couldn't afford full-time. Get expert-level guidance at a fraction of the cost.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">📈</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Scales with Growth</h3>
                <p className="text-gray-600 text-sm">Start part-time and scale up as needed. Flexible engagement that grows with your compliance requirements and business needs.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">🔧</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">No Overhead</h3>
                <p className="text-gray-600 text-sm">No recruitment fees, benefits, or office space. No notice period or redundancy costs. Pure compliance value without the HR burden.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">🌐</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Broad Experience</h3>
                <p className="text-gray-600 text-sm">Fractional officers work across multiple companies. They bring best practices, regulatory insights, and proven approaches from diverse contexts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="calculator" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculator</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How Much Does a Fractional Compliance Officer Cost?</h2>
            <p className="text-gray-600 mt-4">Compare the cost of fractional vs full-time compliance officer</p>
          </div>
          <div className="bg-white p-8 border border-gray-200 mb-8">
            <h3 className="font-bold text-gray-900 mb-4">Typical Day Rates</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50">
                <div className="text-2xl font-black text-emerald-600">£700/day</div>
                <div className="text-sm text-gray-600 mt-1">Junior/Mid-Level</div>
                <div className="text-xs text-gray-500 mt-2">3-7 years experience</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 border-2 border-emerald-500">
                <div className="text-2xl font-black text-emerald-600">£850/day</div>
                <div className="text-sm text-gray-900 mt-1 font-semibold">Most Common</div>
                <div className="text-xs text-gray-600 mt-2">8-12 years experience</div>
              </div>
              <div className="text-center p-4 bg-gray-50">
                <div className="text-2xl font-black text-emerald-600">£1,000/day</div>
                <div className="text-sm text-gray-600 mt-1">Senior/Specialist</div>
                <div className="text-xs text-gray-500 mt-2">12+ years experience</div>
              </div>
            </div>
          </div>
          <RoleCalculator role="compliance" />
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time Compliance Officer</h2>
          </div>
          <ServiceComparisonTable role="Compliance Officer" accentColor="emerald" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional Compliance Officer</h2>
          </div>
          <HireProcessStepper accentColor="emerald" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={COMPLIANCE_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-emerald-400">Fractional Compliance Officer?</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Tell us about your compliance challenges and we'll match you with pre-vetted fractional compliance officers who have navigated them before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-emerald-500 text-white font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors">
              Find a Compliance Officer
            </Link>
            <Link href="/fractional-compliance-jobs" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a Compliance Officer
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold uppercase tracking-wider text-gray-400">Related</span>
            <div className="flex flex-wrap gap-4">
              <Link href="/fractional-compliance-jobs" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">Fractional Compliance Jobs</Link>
              <Link href="/fractional-ciso-services" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">Fractional CISO</Link>
              <Link href="/fractional-cto-services" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">Fractional CTO</Link>
              <Link href="/fractional-cfo-services" className="text-gray-600 hover:text-emerald-600 font-medium transition-colors">Fractional CFO</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
