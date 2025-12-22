'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@stackframe/stack'

export function SavedJobsCounter() {
  const user = useUser()
  const [savedCount, setSavedCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }

    // Fetch saved jobs count
    fetch('/api/saved-jobs/count')
      .then(res => res.json())
      .then(data => {
        setSavedCount(data.count || 0)
        setIsLoading(false)
      })
      .catch(() => {
        setSavedCount(0)
        setIsLoading(false)
      })
  }, [user])

  if (!user) {
    return (
      <Link
        href="/handler/sign-in"
        className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">Sign in to save jobs</p>
            <p className="text-xs text-gray-500">Track your favourite opportunities</p>
          </div>
        </div>
      </Link>
    )
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 rounded-full bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href="/saved-jobs"
      className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all group"
    >
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {savedCount !== null && savedCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {savedCount > 9 ? '9+' : savedCount}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
            Saved Jobs
          </p>
          <p className="text-xs text-gray-500">
            {savedCount === 0 ? 'No jobs saved yet' : `${savedCount} job${savedCount !== 1 ? 's' : ''} saved`}
          </p>
        </div>
        <svg className="w-4 h-4 text-gray-400 ml-auto group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}

export default SavedJobsCounter
