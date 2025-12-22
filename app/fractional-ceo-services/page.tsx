import { Metadata } from 'next'
import Link from 'next/link'
import { FAQ } from '@/components/FAQ'
import { RoleCalculator } from '@/components/RoleCalculator'
import { HireProcessStepper } from '@/components/HireProcessStepper'
import { ServiceComparisonTable } from '@/components/ServiceComparisonTable'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Fractional CEO Services UK | Hire a Part-Time Chief Executive',
  description: 'Hire a Fractional CEO for your business. Access senior executive leadership at a fraction of full-time cost. Expert CEOs for growth, transformation, and strategic guidance. Start within days.',
  keywords: 'fractional ceo, fractional ceo services, hire fractional ceo, part time ceo, fractional chief executive officer, interim ceo, part-time ceo',
  alternates: {
    canonical: 'https://fractional.quest/fractional-ceo-services',
  },
  openGraph: {
    title: 'Fractional CEO Services UK | Hire a Part-Time Chief Executive',
    description: 'Hire a Fractional CEO for your business. Senior executive leadership at a fraction of full-time cost.',
    images: ['/images/fractional-ceo-services.jpg'],
    url: 'https://fractional.quest/fractional-ceo-services',
  },
}

// CEO-specific FAQ data
const CEO_SERVICE_FAQS = [
  {
    question: 'What is a Fractional CEO?',
    answer: 'A Fractional CEO is an experienced Chief Executive Officer who works with your company on a part-time basis, typically 2-3 days per week. You get senior-level executive leadership, strategic vision, and hands-on guidance at a fraction of the cost of a full-time CEO.',
  },
  {
    question: 'When should my company hire a Fractional CEO?',
    answer: 'Consider hiring a fractional CEO when: you\'re a founder transitioning out of the CEO role but not ready for a full-time replacement; your company needs strategic direction during a growth phase; you\'re preparing for a major transition (sale, merger, restructuring); you need executive leadership but can\'t justify a full-time CEO; or you want to test an external CEO before committing full-time.',
  },
  {
    question: 'How much does a Fractional CEO cost?',
    answer: 'Fractional CEOs typically charge £1,000-£1,800 per day in the UK, depending on experience and company complexity. At 2-3 days per week, this translates to roughly £100,000-£280,000 annually—compared to £200,000-£500,000+ for a full-time CEO (including salary, benefits, equity, and overhead).',
  },
  {
    question: 'What does a Fractional CEO do?',
    answer: 'A Fractional CEO sets strategic direction, provides executive leadership to the management team, represents the company to investors and stakeholders, drives business development, oversees major initiatives, builds company culture, manages board relationships, and ensures operational alignment. They act as the primary decision-maker and face of the company during their engagement.',
  },
  {
    question: 'How is a Fractional CEO different from an Interim CEO?',
    answer: 'A Fractional CEO works part-time (2-3 days/week) on an ongoing basis, complementing existing leadership. An Interim CEO works full-time (5 days/week) as a temporary replacement for a departing CEO. Fractional = part-time augmentation; Interim = full-time replacement.',
  },
  {
    question: 'How long do Fractional CEO engagements typically last?',
    answer: 'Most fractional CEO engagements start with a 6-12 month commitment and extend based on mutual fit. Many become ongoing relationships lasting 2-3+ years. Engagements can flex up (during critical periods) or down (during steady states) based on your needs, or transition to a full-time hire.',
  },
  {
    question: 'What should I look for when hiring a Fractional CEO?',
    answer: 'Look for: extensive CEO or Managing Director experience (15-20+ years); track record of business growth and transformation; relevant industry expertise; experience at companies similar to your stage and size; strong strategic thinking and vision; excellent stakeholder management skills; cultural fit with your values; and proven ability to drive results in part-time capacity.',
  },
  {
    question: 'Can a Fractional CEO work alongside a founder or existing leadership?',
    answer: 'Yes—this is one of the most common scenarios. A fractional CEO can provide strategic oversight and external perspective while the founder focuses on product, technology, or specific expertise areas. They can also mentor existing leaders and help professionalise the management team. Clear role definition and communication are key to success.',
  },
]

export default function FractionalCEOServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Aspirational Image */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1920&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/90 via-indigo-600/80 to-indigo-500/60" />
        </div>
        <div className="relative z-10 w-full py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors text-sm tracking-wide">
              <span className="mr-2">←</span> Back to Home
            </Link>
            <div className="max-w-4xl">
              <span className="inline-block bg-white text-black px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Executive Leadership
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tight">
                Fractional CEO<br />
                <span className="text-white/70">Services UK</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl mb-8">
                Hire a <strong className="text-white">Fractional CEO</strong> to lead your business forward.
                Senior executive leadership, strategic vision, and proven expertise—at a fraction of full-time cost.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">50%</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Cost Savings</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">2-3</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">Days/Week</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-black text-white">7 Days</div>
                  <div className="text-white/60 text-sm uppercase tracking-wider">To Start</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="#contact" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
                  Hire a Fractional CEO
                </Link>
                <Link href="#calculator" className="px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  Calculate Savings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is a Fractional CEO */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Overview</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What is a Fractional CEO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none">
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8 font-light">
              A <strong className="font-semibold text-gray-900">Fractional CEO</strong> is an experienced Chief Executive Officer who works with your company on a part-time basis—typically 2-3 days per week. You get the strategic leadership, executive expertise, and business acumen of a senior CEO without the commitment and cost of a full-time hire.
            </p>
            <p>
              Unlike consultants who advise from the sidelines, a fractional CEO becomes your executive leader. They set strategic direction, lead your management team, represent your company to stakeholders and investors, make critical business decisions, and take ownership of business outcomes—just not five days a week.
            </p>
            <div className="bg-gray-50 p-8 my-10 border-l-4 border-gray-900">
              <p className="text-xl font-semibold text-gray-900 mb-0">
                "Companies access CEO expertise for £4,000-£8,000 per week instead of £15,000+ monthly for a full-time CEO."
              </p>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mt-12 mb-4">Fractional CEO vs Full-Time CEO</h3>
            <p>
              A full-time CEO costs £200,000-£500,000 in total compensation, including salary, benefits, equity, and overhead. According to <a href="https://www.ons.gov.uk/employmentandlabourmarket" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">ONS data</a>, executive compensation in the UK has risen significantly, making full-time C-suite hires increasingly expensive for growing companies. For many businesses, full-time is unnecessary—you need CEO-level thinking on strategy and growth, but not 40 hours weekly.
            </p>
            <p>
              A fractional CEO gives you exactly what you need: senior executive leadership scaled to your actual requirements. This model is particularly effective for founder-led businesses where the founder wants to remain involved but needs experienced executive partnership. As your company grows, you can increase their time—or transition to a full-time hire when the role justifies it. Most fractional CEOs work through <a href="https://www.gov.uk/limited-company-formation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 underline">limited companies</a>, ensuring tax efficiency and professional structure.
            </p>
          </div>
        </div>
      </section>

      {/* Key Responsibilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Responsibilities</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">What Does a Fractional CEO Do?</h2>
            <p className="text-xl text-gray-600 mt-4">Core responsibilities your fractional CEO will own</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Strategic Direction',
                description: 'Set company vision and strategy. Define goals, priorities, and growth initiatives. Make critical business decisions aligned with long-term objectives.',
                icon: '🎯',
              },
              {
                title: 'Executive Leadership',
                description: 'Lead and develop the management team. Build a high-performance leadership culture. Provide mentorship and accountability to key executives.',
                icon: '👔',
              },
              {
                title: 'Stakeholder Management',
                description: 'Manage relationships with investors, board members, and key partners. Represent the company externally and build strategic relationships.',
                icon: '🤝',
              },
              {
                title: 'Business Development',
                description: 'Drive revenue growth through partnerships, new markets, and strategic initiatives. Identify and pursue major business opportunities.',
                icon: '📈',
              },
              {
                title: 'Operational Excellence',
                description: 'Ensure operational alignment across departments. Build scalable processes and systems. Drive execution of strategic initiatives.',
                icon: '⚙️',
              },
              {
                title: 'Company Culture',
                description: 'Shape and reinforce company values and culture. Lead through transitions and change. Build an organisation that can scale effectively.',
                icon: '🏢',
              },
              {
                title: 'Fundraising & M&A',
                description: 'Lead fundraising processes and investor relations. Evaluate M&A opportunities. Prepare the company for exit or acquisition scenarios.',
                icon: '💼',
              },
              {
                title: 'Crisis Management',
                description: 'Navigate challenging situations and major pivots. Provide steady leadership during uncertainty. Make tough decisions when needed.',
                icon: '🛡️',
              },
              {
                title: 'Board Reporting',
                description: 'Manage board relationships and communications. Prepare comprehensive board materials. Ensure governance and compliance standards.',
                icon: '📊',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:border-gray-400 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Benefits</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Why Hire a Fractional CEO?</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                title: 'Cost Efficiency',
                description: 'Access CEO-level expertise at 40-60% less than a full-time hire. Pay only for the time you need—typically £100,000-£280,000 per year versus £300,000+ for full-time.',
                stat: '50%',
                statLabel: 'Cost Savings',
              },
              {
                title: 'Immediate Impact',
                description: 'Skip the 6-12 month executive recruitment process. Fractional CEOs are seasoned professionals who can start within days and make immediate impact.',
                stat: '7',
                statLabel: 'Days to Start',
              },
              {
                title: 'Deep Experience',
                description: 'Get a CEO with 20+ years of business leadership who has navigated your challenges before. Many have scaled companies through major growth phases and exits.',
                stat: '20+',
                statLabel: 'Years Experience',
              },
              {
                title: 'Strategic Flexibility',
                description: 'Scale leadership up during critical periods, scale down during steady states. No long-term commitments—engagements flex with your business needs.',
                stat: '2-4',
                statLabel: 'Days/Week Flex',
              },
              {
                title: 'External Perspective',
                description: 'Fractional CEOs work across multiple companies and industries. They bring fresh thinking, proven playbooks, and objective insights you won\'t get from an internal-only perspective.',
                stat: '3-5',
                statLabel: 'Companies Seen',
              },
              {
                title: 'Risk Mitigation',
                description: 'Test executive leadership before committing to a full-time hire. Assess cultural fit and leadership style with lower risk and investment.',
                stat: '6-12',
                statLabel: 'Month Trial',
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-6 p-6 bg-gray-50 border-l-4 border-gray-900">
                <div className="flex-shrink-0 text-center">
                  <div className="text-3xl font-black text-gray-900">{benefit.stat}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{benefit.statLabel}</div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
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
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">When Should You Hire a Fractional CEO?</h2>
          </div>
          <div className="prose prose-lg prose-gray max-w-none mb-8">
            <p>
              The right time to hire a fractional CEO depends on your company's stage and challenges. Here are the most common scenarios:
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                scenario: 'Founder Transition',
                description: 'You\'re a technical founder who wants to step back from the CEO role but aren\'t ready to hire full-time. A fractional CEO can lead the business while you focus on product or technology.',
                timing: 'When founder needs to focus',
              },
              {
                scenario: 'Growth Phase Leadership',
                description: 'Your company is scaling rapidly and needs experienced executive leadership to navigate growth challenges, build teams, and establish processes.',
                timing: 'During rapid scaling',
              },
              {
                scenario: 'Strategic Transformation',
                description: 'You\'re pivoting business model, entering new markets, or undertaking major strategic shifts that require experienced change leadership.',
                timing: '3-6 months before change',
              },
              {
                scenario: 'Pre-Exit Preparation',
                description: 'You\'re preparing for acquisition, merger, or sale. You need an experienced CEO to professionalise operations and maximise valuation.',
                timing: '12-18 months before exit',
              },
              {
                scenario: 'Management Team Development',
                description: 'Your leadership team needs development and the business needs experienced executive oversight to reach the next level of maturity.',
                timing: 'When team needs growth',
              },
              {
                scenario: 'Investor Requirements',
                description: 'Investors or board members have requested stronger executive leadership but you\'re not ready for a full-time CEO commitment yet.',
                timing: 'Immediately after request',
              },
              {
                scenario: 'Bridging Leadership Gaps',
                description: 'You need CEO-level leadership during a transition period—between CEOs, during recruitment, or while testing the need for a full-time role.',
                timing: 'During transition period',
              },
              {
                scenario: 'Strategic Initiatives',
                description: 'You have major initiatives (fundraising, market expansion, restructuring) that need dedicated executive leadership and expertise.',
                timing: 'At initiative launch',
              },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2">{item.scenario}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <span className="inline-block text-xs font-bold text-gray-700 uppercase tracking-wider">{item.timing}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section id="calculator" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Calculator</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How Much Does a Fractional CEO Cost?</h2>
            <p className="text-gray-600 mt-4">Compare the cost of fractional vs full-time CEO</p>
          </div>
          <RoleCalculator role="ceo" />
          <div className="mt-8 prose prose-gray max-w-none">
            <h3 className="text-xl font-bold text-gray-900">Typical Fractional CEO Pricing</h3>
            <ul className="text-gray-600">
              <li><strong>Day Rate:</strong> £1,000-£1,800 per day (depending on experience and company complexity)</li>
              <li><strong>Monthly Retainer:</strong> £4,000-£10,000 for 2-3 days per week</li>
              <li><strong>Annual Cost:</strong> £100,000-£280,000 (vs £300,000+ for full-time including equity)</li>
            </ul>
            <p className="text-sm text-gray-500">
              Pricing varies based on the CEO's experience, your industry, company size, and complexity of the role.
              Specialist expertise (e.g., turnaround, PE-backed, international) commands premium rates.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Comparison</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional vs Interim vs Full-Time CEO</h2>
            <p className="text-gray-600 mt-4">Choose the right model for your needs</p>
          </div>
          <ServiceComparisonTable role="CEO" accentColor="indigo" />
        </div>
      </section>

      {/* How to Hire */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Process</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">How to Hire a Fractional CEO</h2>
            <p className="text-gray-600 mt-4">From first conversation to start date in as little as 7 days</p>
          </div>
          <HireProcessStepper accentColor="indigo" />
          <div className="mt-12 prose prose-gray max-w-none">
            <h3 className="text-xl font-bold text-gray-900">What to Look For</h3>
            <ul className="text-gray-600">
              <li><strong>Proven CEO Experience:</strong> Have they led companies at your stage and in your industry?</li>
              <li><strong>Track Record of Growth:</strong> Can they demonstrate successful business scaling and transformation?</li>
              <li><strong>Strategic Thinking:</strong> Do they think strategically and bring vision beyond day-to-day operations?</li>
              <li><strong>Leadership Style:</strong> Will their leadership approach work with your team and company culture?</li>
              <li><strong>Availability & Commitment:</strong> Can they commit to the time you need and be present for critical decisions?</li>
              <li><strong>References & Results:</strong> Can they show concrete results from previous fractional or CEO engagements?</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">Industries</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Fractional CEOs by Industry</h2>
            <p className="text-gray-600 mt-4">Specialists with deep sector experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'SaaS & Technology', description: 'Product-market fit, scaling, tech strategy, investor readiness', link: '/fractional-jobs-saas' },
              { name: 'E-commerce & DTC', description: 'Brand building, growth strategy, channel expansion, operations', link: '/fractional-jobs-ecommerce' },
              { name: 'FinTech', description: 'Regulatory navigation, funding strategy, market positioning', link: '/fractional-jobs-finance' },
              { name: 'Healthcare & HealthTech', description: 'Clinical partnerships, regulatory compliance, scaling care delivery', link: '/fractional-jobs-healthcare' },
              { name: 'Professional Services', description: 'Partnership models, service scaling, brand positioning', link: '/fractional-jobs-professional-services' },
              { name: 'Startups & Scale-ups', description: 'Founder transitions, growth acceleration, investor relations', link: '/fractional-jobs-startups' },
            ].map((industry, index) => (
              <Link key={index} href={industry.link} className="block bg-white p-6 border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all">
                <h3 className="font-bold text-gray-900 mb-2">{industry.name}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900">Frequently Asked Questions</h2>
          </div>
          <FAQ items={CEO_SERVICE_FAQS} title="" />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 md:py-28 bg-gray-50 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
            Ready to Hire a<br /><span className="text-gray-400">Fractional CEO?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Tell us about your needs and we'll match you with pre-vetted fractional CEOs who fit your requirements. Start conversations within 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/handler/sign-up" className="px-10 py-5 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors">
              Find a Fractional CEO
            </Link>
            <Link href="/fractional-ceo-jobs-uk" className="px-10 py-5 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
              I'm a CEO Looking for Roles
            </Link>
          </div>
        </div>
      </section>

      {/* Related CEO Resources */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900 mb-2">Complete CEO Resource Hub</h2>
            <p className="text-gray-600">Explore our comprehensive guides for businesses and CEO professionals</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-3">For Businesses</h3>
              <div className="space-y-2">
                <Link href="/interim-ceo" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">Interim CEO Services</Link>
                <Link href="/fractional-ceo-vs-full-time" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional vs Full-Time CEO</Link>
                <Link href="/when-to-hire-fractional-ceo" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">When to Hire a CEO</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-3">For CEO Professionals</h3>
              <div className="space-y-2">
                <Link href="/fractional-ceo-jobs-uk" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional CEO Jobs</Link>
                <Link href="/how-to-become-fractional-ceo" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">Become a Fractional CEO</Link>
                <Link href="/fractional-ceo-salary" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">CEO Salary Guide</Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-600 mb-3">Other Fractional Roles</h3>
              <div className="space-y-2">
                <Link href="/fractional-cfo-services" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional CFO</Link>
                <Link href="/fractional-cmo-services" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional CMO</Link>
                <Link href="/fractional-cto-services" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional CTO</Link>
                <Link href="/fractional-coo-services" className="block text-gray-600 hover:text-blue-600 font-medium transition-colors">Fractional COO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Fractional CEO Services',
            description: 'Professional fractional CEO services providing part-time executive leadership for growing businesses in the UK.',
            provider: {
              '@type': 'Organization',
              name: 'Fractional Quest',
              url: 'https://fractional.quest',
            },
            areaServed: {
              '@type': 'Country',
              name: 'United Kingdom',
            },
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '1000-1800',
                priceCurrency: 'GBP',
                unitText: 'per day',
              },
            },
          }),
        }}
      />
    </div>
  )
}
