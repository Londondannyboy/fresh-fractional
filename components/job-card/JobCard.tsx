'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { useUser } from '@stackframe/stack'
import { AspirationalBadge } from './AspirationalBadge'
import { generateAspirationalMessage } from '@/lib/aspirational-messages'
import type { AspirationalMessageData } from '@/lib/types'

// Aspirational images for different role categories - professional people working
const ROLE_IMAGES: Record<string, string[]> = {
  'CFO': [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop', // Professional man
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop', // Professional woman
  ],
  'CTO': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', // Tech leader man
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop', // Tech leader woman
  ],
  'CMO': [
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop', // Marketing woman
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop', // Marketing man
  ],
  'COO': [
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop', // Operations leader
    'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop', // Operations woman
  ],
  'CHRO': [
    'https://images.unsplash.com/photo-1573497019236-17f8177b81e8?w=600&h=400&fit=crop', // HR professional
    'https://images.unsplash.com/photo-1573496774379-b930dba17d8b?w=600&h=400&fit=crop', // HR meeting
  ],
  'CPO': [
    'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop', // Product team
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', // Product planning
  ],
  'default': [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop', // Team collaboration
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop', // Business meeting
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop', // Laptop work
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', // Modern office
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop', // Office space
  ],
}

// Get a consistent image for a job based on its ID/title to avoid duplicates
function getJobImage(jobId: string | number | undefined, roleCategory?: string, title?: string): string {
  // Create a simple hash from jobId or title for consistent image selection
  const hashSource = String(jobId || title || Math.random())
  let hash = 0
  for (let i = 0; i < hashSource.length; i++) {
    const char = hashSource.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  hash = Math.abs(hash)

  // Try to match role category
  const normalizedRole = roleCategory?.toUpperCase() || ''
  let images = ROLE_IMAGES.default

  for (const [role, roleImages] of Object.entries(ROLE_IMAGES)) {
    if (role !== 'default' && normalizedRole.includes(role)) {
      images = roleImages
      break
    }
  }

  // Select image based on hash
  return images[hash % images.length]
}

interface JobCardProps {
  jobId?: string | number
  slug?: string
  title: string
  company: string
  location: string
  isRemote: boolean
  workplaceType?: string | null
  compensation?: string
  dayRate?: number
  currency?: string
  roleCategory?: string
  skills?: string[]
  postedDaysAgo?: number
  hoursPerWeek?: string
  className?: string
  onClick?: () => void
  // Optional: override the auto-generated message
  aspirationalMessage?: AspirationalMessageData | null
  // Additional props for compatibility
  companyDomain?: string
  description?: string
  jobSource?: string
  isSyndicated?: boolean
  postedDate?: Date
  estimatedDayRate?: { min: number; max: number }
  companyType?: 'direct' | 'recruiter' | 'job_board'
  appealSummary?: string
  keyDeliverables?: string[]
  // Image override
  imageUrl?: string
}

export function JobCard({
  jobId,
  slug,
  title,
  company,
  location,
  isRemote,
  workplaceType,
  compensation,
  dayRate,
  currency = '£',
  roleCategory,
  skills = [],
  postedDaysAgo,
  hoursPerWeek,
  className = '',
  onClick,
  aspirationalMessage: customMessage,
  // Additional props for compatibility (may not all be used yet)
  companyDomain,
  description,
  jobSource,
  isSyndicated,
  postedDate,
  estimatedDayRate,
  companyType,
  appealSummary,
  keyDeliverables,
  imageUrl,
}: JobCardProps) {
  const user = useUser()
  const [isSaved, setIsSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Get image for this job
  const jobImage = useMemo(() => {
    if (imageUrl) return imageUrl
    return getJobImage(jobId, roleCategory, title)
  }, [imageUrl, jobId, roleCategory, title])

  // Generate aspirational message based on job context
  const aspirationalMessage = useMemo(() => {
    if (customMessage !== undefined) return customMessage

    const message = generateAspirationalMessage({
      isRemote,
      workplaceType,
      location,
      hoursPerWeek,
    })

    // Convert to AspirationalMessageData format
    if (message) {
      return {
        headline: message.headline,
        subtext: message.subtext,
        type: message.type,
        icon: message.icon,
      } as AspirationalMessageData
    }
    return null
  }, [customMessage, isRemote, workplaceType, location, hoursPerWeek])

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!jobId) return

    if (!user) {
      window.location.href = '/handler/sign-in?returnUrl=' + encodeURIComponent(window.location.pathname)
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch('/api/save-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, action: isSaved ? 'remove' : 'add' })
      })

      if (response.ok) {
        setIsSaved(!isSaved)
      }
    } catch (error) {
      console.error('Failed to save job:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // Format compensation display
  const compensationDisplay = useMemo(() => {
    if (dayRate) {
      return `${currency}${dayRate.toLocaleString()}/day`
    }
    if (compensation) {
      return compensation
    }
    if (estimatedDayRate) {
      return `${currency}${estimatedDayRate.min}-${estimatedDayRate.max}/day`
    }
    return null
  }, [dayRate, currency, compensation, estimatedDayRate])

  // Format posted time
  const postedDisplay = useMemo(() => {
    if (postedDaysAgo === undefined) return null
    if (postedDaysAgo === 0) return 'Today'
    if (postedDaysAgo === 1) return 'Yesterday'
    if (postedDaysAgo < 7) return `${postedDaysAgo} days ago`
    if (postedDaysAgo < 14) return '1 week ago'
    return `${Math.floor(postedDaysAgo / 7)} weeks ago`
  }, [postedDaysAgo])

  // Location display with remote indicator
  const locationDisplay = useMemo(() => {
    if (isRemote && !location) return 'Remote'
    if (isRemote) return `${location} (Remote)`
    if (workplaceType === 'Hybrid') return `${location} (Hybrid)`
    return location || 'Location TBD'
  }, [location, isRemote, workplaceType])

  const cardContent = (
    <article
      className={`
        overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm
        hover:shadow-lg transition-all duration-300
        cursor-pointer group flex flex-col h-full
        ${className}
      `}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={jobImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />

        {/* Role category badge on image */}
        {roleCategory && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
              {roleCategory}
            </span>
          </div>
        )}

        {/* Remote badge */}
        {isRemote && (
          <div className="absolute top-3 right-3">
            <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Remote
            </span>
          </div>
        )}

        {/* Title overlay at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Company */}
        <p className="text-base font-medium text-gray-700 mb-3">
          {company}
        </p>

        {/* Meta: Location + Compensation */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {locationDisplay}
          </span>
          {compensationDisplay && (
            <span className="flex items-center gap-1.5 font-semibold text-gray-900">
              {compensationDisplay}
            </span>
          )}
        </div>

        {/* Skills - Max 3 */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="px-2.5 py-1 text-gray-400 text-xs">
                +{skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          {postedDisplay && (
            <span className="text-xs text-gray-400">
              {postedDisplay}
            </span>
          )}
          <span className="text-sm font-semibold text-gray-900 group-hover:text-teal-600 transition-colors flex items-center gap-1">
            View Role
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )

  // Wrap in Link if slug is provided
  if (slug) {
    return (
      <Link href={`/fractional-job/${slug}`} className="block h-full">
        {cardContent}
      </Link>
    )
  }

  return cardContent
}

export default JobCard
