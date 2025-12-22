'use client'

import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface JobPreviewTooltipProps {
  children: React.ReactNode
  title: string
  company: string
  keyDeliverables?: string[]
  description?: string
  compensation?: string
  isRemote?: boolean
}

export function JobPreviewTooltip({
  children,
  title,
  company,
  keyDeliverables = [],
  description,
  compensation,
  isRemote,
}: JobPreviewTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, 400) // Delay before showing
  }

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 100)
  }

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const tooltipWidth = 320
      const tooltipHeight = 280
      const padding = 16

      let left = rect.right + padding
      let top = rect.top

      // Check if tooltip would go off right edge
      if (left + tooltipWidth > window.innerWidth - padding) {
        left = rect.left - tooltipWidth - padding
      }

      // Check if tooltip would go off bottom edge
      if (top + tooltipHeight > window.innerHeight - padding) {
        top = window.innerHeight - tooltipHeight - padding
      }

      // Check if tooltip would go off top edge
      if (top < padding) {
        top = padding
      }

      setPosition({ top, left })
    }
  }, [isVisible])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const hasContent = keyDeliverables.length > 0 || description

  if (!hasContent) {
    return <>{children}</>
  }

  return (
    <div
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="relative"
    >
      {children}
      {isVisible && typeof document !== 'undefined' && createPortal(
        <div
          ref={tooltipRef}
          className="fixed z-[9999] w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 animate-fade-in"
          style={{ top: position.top, left: position.left }}
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
          }}
          onMouseLeave={hideTooltip}
        >
          {/* Header */}
          <div className="mb-3 pb-3 border-b border-gray-100">
            <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{title}</h4>
            <p className="text-xs text-gray-500 mt-1">{company}</p>
            <div className="flex items-center gap-2 mt-2">
              {compensation && (
                <span className="text-xs font-semibold text-gray-900">{compensation}</span>
              )}
              {isRemote && (
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs font-medium rounded-full">
                  Remote
                </span>
              )}
            </div>
          </div>

          {/* Key Deliverables */}
          {keyDeliverables.length > 0 && (
            <div className="mb-3">
              <h5 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Key Deliverables
              </h5>
              <ul className="space-y-1">
                {keyDeliverables.slice(0, 4).map((item, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                    <span className="line-clamp-2">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description snippet */}
          {description && !keyDeliverables.length && (
            <p className="text-xs text-gray-600 line-clamp-3">{description}</p>
          )}

          {/* CTA */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400">Click to view full details</span>
            <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default JobPreviewTooltip
