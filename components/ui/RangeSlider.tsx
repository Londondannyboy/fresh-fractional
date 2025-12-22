'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  minValue: number
  maxValue: number
  onChange: (min: number, max: number) => void
  formatValue?: (value: number) => string
  label?: string
  className?: string
}

export function RangeSlider({
  min,
  max,
  step = 50,
  minValue,
  maxValue,
  onChange,
  formatValue = (v) => `£${v}`,
  label,
  className = '',
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100
  }

  const getValueFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current) return min
    const rect = trackRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const rawValue = min + percentage * (max - min)
    return Math.round(rawValue / step) * step
  }, [min, max, step])

  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(handle)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    const newValue = getValueFromPosition(e.clientX)

    if (isDragging === 'min') {
      const clampedValue = Math.min(newValue, maxValue - step)
      if (clampedValue !== minValue) {
        onChange(clampedValue, maxValue)
      }
    } else {
      const clampedValue = Math.max(newValue, minValue + step)
      if (clampedValue !== maxValue) {
        onChange(minValue, clampedValue)
      }
    }
  }, [isDragging, minValue, maxValue, step, getValueFromPosition, onChange])

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // Touch support
  const handleTouchStart = (handle: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(handle)
  }

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    const newValue = getValueFromPosition(touch.clientX)

    if (isDragging === 'min') {
      const clampedValue = Math.min(newValue, maxValue - step)
      if (clampedValue !== minValue) {
        onChange(clampedValue, maxValue)
      }
    } else {
      const clampedValue = Math.max(newValue, minValue + step)
      if (clampedValue !== maxValue) {
        onChange(minValue, clampedValue)
      }
    }
  }, [isDragging, minValue, maxValue, step, getValueFromPosition, onChange])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleMouseUp)
      return () => {
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDragging, handleTouchMove, handleMouseUp])

  const minPercent = getPercentage(minValue)
  const maxPercent = getPercentage(maxValue)

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-semibold text-gray-900">
            {formatValue(minValue)} - {formatValue(maxValue)}
          </span>
        </div>
      )}

      <div className="relative h-8 flex items-center">
        {/* Track background */}
        <div
          ref={trackRef}
          className="absolute w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        />

        {/* Active track */}
        <div
          className="absolute h-2 bg-blue-500 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min handle */}
        <div
          className={`absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-grab active:cursor-grabbing transform -translate-x-1/2 transition-shadow ${
            isDragging === 'min' ? 'ring-4 ring-blue-200 scale-110' : 'hover:ring-2 hover:ring-blue-100'
          }`}
          style={{ left: `${minPercent}%` }}
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleTouchStart('min')}
        />

        {/* Max handle */}
        <div
          className={`absolute w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md cursor-grab active:cursor-grabbing transform -translate-x-1/2 transition-shadow ${
            isDragging === 'max' ? 'ring-4 ring-blue-200 scale-110' : 'hover:ring-2 hover:ring-blue-100'
          }`}
          style={{ left: `${maxPercent}%` }}
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleTouchStart('max')}
        />
      </div>

      {/* Scale markers */}
      <div className="flex justify-between mt-1 px-1">
        <span className="text-xs text-gray-400">{formatValue(min)}</span>
        <span className="text-xs text-gray-400">{formatValue(max)}</span>
      </div>
    </div>
  )
}

export default RangeSlider
