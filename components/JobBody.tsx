'use client'

import React from 'react'

interface JobBodyProps {
  content: string
  className?: string
}

/**
 * JobBody - Renders AI-written job descriptions
 *
 * Since Pydantic AI now writes properly formatted prose,
 * we render it simply with proper paragraph handling.
 */
export function JobBody({ content, className = '' }: JobBodyProps) {
  if (!content) return null

  // Split on double newlines (paragraph breaks) or treat as single flowing text
  const paragraphs = content
    .split(/\n\n+/)
    .map(p => p.replace(/\n/g, ' ').trim())
    .filter(p => p.length > 0)

  // If no paragraph breaks, render as single block of flowing prose
  if (paragraphs.length <= 1) {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <p className="text-lg text-gray-700 leading-8">
          {content}
        </p>
      </div>
    )
  }

  // Render multiple paragraphs
  return (
    <div className={`space-y-6 ${className}`}>
      {paragraphs.map((para, idx) => (
        <p key={idx} className="text-lg text-gray-700 leading-8">
          {para}
        </p>
      ))}
    </div>
  )
}
