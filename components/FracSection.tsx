/**
 * Frac Section - Reusable component for job pages
 *
 * Drop this at the top of any page to add Frac voice interface
 * Consistent styling across all pages
 */
'use client'

import Link from 'next/link'

interface FracSectionProps {
  variant?: 'banner' | 'card'
  title?: string
  description?: string
}

export function FracSection({
  variant = 'banner',
  title = "Talk with Frac",
  description = "Voice-powered job search. Just speak naturally."
}: FracSectionProps) {

  if (variant === 'banner') {
    return (
      <section className="bg-gradient-to-r from-blue-950 to-black border-b border-blue-500/20 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Content */}
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
              </div>
              <p className="text-gray-400">{description}</p>
            </div>

            {/* Right: CTA */}
            <Link
              href="/frac"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:scale-105 transition-all duration-200 flex-shrink-0"
            >
              {/* Pulsating glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 animate-pulse" />
              <div className="relative flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                Try Voice Search
              </div>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Card variant for embedding in pages
  return (
    <div className="bg-gradient-to-br from-blue-950 to-gray-900 rounded-2xl border border-blue-500/20 p-8">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>

        {/* CTA */}
        <Link
          href="/frac"
          className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:scale-105 transition-all duration-200 flex-shrink-0"
        >
          {/* Pulsating glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 animate-pulse" />
          <div className="relative flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Try Voice Search
          </div>
        </Link>
      </div>
    </div>
  )
}
