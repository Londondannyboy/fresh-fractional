'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoHeroBackgroundProps {
  playbackId?: string
  fallbackGradient?: boolean
  opacity?: number
}

export function VideoHeroBackground({
  playbackId,
  fallbackGradient = true,
  opacity = 0.3
}: VideoHeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0 // Normal playback speed
    }
  }, [isLoaded])

  // If no playback ID or error, show gradient fallback
  if (!playbackId || hasError) {
    if (!fallbackGradient) return null
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900" />
        {/* Animated pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="heroGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#heroGrid)" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Element - full opacity, overlays handle darkening */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <source src={`https://stream.mux.com/${playbackId}/high.mp4`} type="video/mp4" />
        <source src={`https://stream.mux.com/${playbackId}.m3u8`} type="application/x-mpegURL" />
      </video>

      {/* Loading state - gradient while video loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 animate-pulse" />
      )}

      {/* No overlay - let video show fully */}
    </div>
  )
}
