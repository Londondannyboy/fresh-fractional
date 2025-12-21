'use client'

import Link from 'next/link'

interface PropertyOverlayProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function PropertyOverlay({ variant = 'dark', className = '' }: PropertyOverlayProps) {
  const isDark = variant === 'dark'

  return (
    <div className={`${className}`}>
      <div
        className={`
          rounded-2xl p-6 backdrop-blur-md border
          ${isDark
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-gray-900/10 border-gray-900/20 text-gray-900'
          }
        `}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🏠</span>
          <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
            New
          </span>
        </div>
        <h3 className={`font-bold text-lg mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Fractional Ownership
        </h3>
        <p className={`text-sm mb-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
          Own a share of luxury property. Perfect for executives who want a second home without full commitment.
        </p>
        <Link
          href="/fractional-ownership-guide"
          className={`
            inline-flex items-center text-sm font-semibold gap-1 transition-colors
            ${isDark
              ? 'text-amber-400 hover:text-amber-300'
              : 'text-amber-600 hover:text-amber-700'
            }
          `}
        >
          Learn More
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default PropertyOverlay
