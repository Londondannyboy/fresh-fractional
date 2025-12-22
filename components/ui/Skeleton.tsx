'use client'

import React from 'react'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'shimmer' | 'none'
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'shimmer',
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 relative overflow-hidden'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-xl',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    shimmer: 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
    none: '',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  )
}

// Job Card Skeleton
export function JobCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
      {/* Image skeleton */}
      <Skeleton className="aspect-[16/10]" variant="rectangular" />

      {/* Content skeleton */}
      <div className="p-5 space-y-4">
        {/* Company */}
        <Skeleton height={20} width="60%" variant="text" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton height={14} width="100%" variant="text" />
          <Skeleton height={14} width="80%" variant="text" />
        </div>

        {/* Meta */}
        <div className="flex gap-4">
          <Skeleton height={16} width={100} variant="text" />
          <Skeleton height={16} width={80} variant="text" />
        </div>

        {/* Skills */}
        <div className="flex gap-2">
          <Skeleton height={28} width={70} variant="rounded" />
          <Skeleton height={28} width={90} variant="rounded" />
          <Skeleton height={28} width={60} variant="rounded" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <Skeleton height={16} width={80} variant="text" />
          <Skeleton height={36} width={100} variant="rounded" />
        </div>
      </div>
    </div>
  )
}

// Calculator Skeleton
export function CalculatorSkeleton() {
  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton height={24} width="40%" variant="text" />
        <Skeleton height={16} width="70%" variant="text" />
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton height={14} width={60} variant="text" />
          <Skeleton height={44} width="100%" variant="rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton height={14} width={80} variant="text" />
          <Skeleton height={44} width="100%" variant="rounded" />
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-2">
        <Skeleton height={14} width={100} variant="text" />
        <Skeleton height={8} width="100%" variant="rounded" />
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 gap-4 pt-4">
        <div className="bg-white rounded-lg p-4 space-y-2">
          <Skeleton height={12} width="60%" variant="text" />
          <Skeleton height={28} width="80%" variant="text" />
        </div>
        <div className="bg-white rounded-lg p-4 space-y-2">
          <Skeleton height={12} width="60%" variant="text" />
          <Skeleton height={28} width="80%" variant="text" />
        </div>
        <div className="bg-white rounded-lg p-4 space-y-2">
          <Skeleton height={12} width="60%" variant="text" />
          <Skeleton height={28} width="80%" variant="text" />
        </div>
      </div>
    </div>
  )
}

// Sidebar Card Skeleton
export function SidebarCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
      <Skeleton height={20} width="50%" variant="text" />
      <div className="space-y-2">
        <Skeleton height={40} width="100%" variant="rounded" />
        <Skeleton height={40} width="100%" variant="rounded" />
        <Skeleton height={40} width="100%" variant="rounded" />
      </div>
    </div>
  )
}

export default Skeleton
