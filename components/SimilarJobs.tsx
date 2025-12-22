'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface SimilarJob {
  id: string
  slug: string
  title: string
  company_name: string
  location?: string
  compensation?: string
  is_remote?: boolean
  matchScore?: number
}

interface SimilarJobsProps {
  currentJobId?: string
  roleCategory?: string
  skills?: string[]
  location?: string
  limit?: number
  className?: string
  title?: string
  showHeader?: boolean
}

export function SimilarJobs({
  currentJobId,
  roleCategory,
  skills = [],
  location,
  limit = 4,
  className = '',
  title = 'Similar Jobs',
  showHeader = true,
}: SimilarJobsProps) {
  const [jobs, setJobs] = useState<SimilarJob[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSimilarJobs() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (roleCategory) params.set('role', roleCategory)
        if (location) params.set('location', location.split(',')[0].trim())
        params.set('limit', (limit + 1).toString())
        if (currentJobId) params.set('exclude', currentJobId)

        // Try the similar jobs API first, fall back to recent jobs
        let response = await fetch(`/api/jobs/similar?${params.toString()}`)
        if (!response.ok) {
          response = await fetch(`/api/jobs-recent?${params.toString()}`)
        }

        if (response.ok) {
          const data = await response.json()
          const filtered = (data.jobs || [])
            .filter((j: SimilarJob) => j.id !== currentJobId)
            .slice(0, limit)
          setJobs(filtered)
        }
      } catch (error) {
        console.error('Error fetching similar jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSimilarJobs()
  }, [currentJobId, roleCategory, skills, location, limit])

  if (loading) {
    return (
      <div className={`bg-white rounded-xl border border-gray-200 p-5 ${className}`}>
        <div className="animate-pulse space-y-4">
          {showHeader && <div className="h-5 w-32 bg-gray-200 rounded" />}
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="space-y-2 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (jobs.length === 0) {
    return null
  }

  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-5 ${className}`}>
      {showHeader && (
        <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {title}
        </h3>
      )}
      <div className="space-y-3">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/fractional-job/${job.slug}`}
            className="block p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group"
          >
            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm line-clamp-2">
              {job.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">{job.company_name}</span>
              {job.is_remote && (
                <span className="px-1.5 py-0.5 bg-teal-100 text-teal-700 text-[10px] font-medium rounded">
                  Remote
                </span>
              )}
            </div>
            {(job.location || job.compensation) && (
              <div className="flex items-center justify-between mt-2">
                {job.location && <span className="text-xs text-gray-400">{job.location}</span>}
                {job.compensation && (
                  <span className="text-xs font-semibold text-gray-700">{job.compensation}</span>
                )}
              </div>
            )}
          </Link>
        ))}
      </div>
      {roleCategory && (
        <Link
          href={`/fractional-${roleCategory.toLowerCase()}-jobs-uk`}
          className="block text-center mt-4 pt-3 border-t border-gray-100 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View all {roleCategory} jobs →
        </Link>
      )}
    </div>
  )
}
