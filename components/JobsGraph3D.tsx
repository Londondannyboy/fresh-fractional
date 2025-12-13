'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the 3D graph component with SSR disabled
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'), {
  ssr: false,
  loading: () => null
})

interface GraphNode {
  id: string
  name?: string
  group: string
  val: number
  url?: string
  color?: string
}

interface GraphLink {
  source: string
  target: string
  label?: string
}

export interface JobsGraph3DProps {
  roleFilter?: string
  limit?: number
  height?: string
}

const groupColors: Record<string, string> = {
  job: '#3b82f6',
  skill: '#10b981',
  company: '#f59e0b',
  location: '#8b5cf6',
  default: '#6366f1'
}

export function JobsGraph3D({
  roleFilter = '',
  limit = 20,
  height = '500px',
}: JobsGraph3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[], links: GraphLink[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 })

  // Fetch graph data
  useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams()
        if (roleFilter) params.set('role', roleFilter)
        params.set('limit', limit.toString())

        const response = await fetch(`/api/graph/jobs?${params}`)
        if (!response.ok) throw new Error('Failed to fetch')

        const data = await response.json()
        const graphResult = data.graph || data

        if (!graphResult.nodes || graphResult.nodes.length === 0) {
          setError(true)
          setLoading(false)
          return
        }

        // Transform data - limit connections to reduce clutter
        const linkCounts: Record<string, number> = {}
        const maxLinksPerNode = 4

        const nodes: GraphNode[] = graphResult.nodes.map((node: any) => ({
          id: node.id,
          name: node.label,
          group: node.type || 'default',
          val: node.type === 'job' ? 25 : node.type === 'company' ? 18 : 10,
          url: node.url,
          color: groupColors[node.type] || groupColors.default
        }))

        const links: GraphLink[] = (graphResult.edges || [])
          .filter((edge: any) => {
            const sourceCount = linkCounts[edge.from] || 0
            const targetCount = linkCounts[edge.to] || 0
            if (sourceCount >= maxLinksPerNode || targetCount >= maxLinksPerNode) {
              return false
            }
            linkCounts[edge.from] = sourceCount + 1
            linkCounts[edge.to] = targetCount + 1
            return true
          })
          .map((edge: any) => ({
            source: edge.from,
            target: edge.to,
            label: edge.label || ''
          }))

        setGraphData({ nodes, links })
        setLoading(false)
      } catch (err) {
        console.error('Error fetching graph data:', err)
        setError(true)
        setLoading(false)
      }
    }

    fetchData()
  }, [roleFilter, limit])

  // Handle resize
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const handleNodeClick = useCallback((node: any) => {
    if (node.url) {
      window.location.href = node.url
    } else if (node.group === 'job' && node.name) {
      const slug = (node.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      window.location.href = `/fractional-job/${slug}`
    }
  }, [])

  return (
    <div className="relative" style={{ width: '100%', height }}>
      <div
        ref={containerRef}
        className="w-full h-full rounded-xl overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 100%)',
        }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-indigo-300 text-sm">Loading 3D graph...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <svg className="w-12 h-12 text-indigo-500 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c0-1.657-4.03-3-9-3s-9 1.343-9 3m18 0a9 9 0 01-9 9m-9-9a9 9 0 019-9" />
            </svg>
            <p className="text-indigo-300 text-sm">Unable to load network data</p>
          </div>
        )}

        {!loading && !error && graphData && (
          <ForceGraph3D
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            nodeColor={(node: any) => node.color || groupColors.default}
            nodeVal={(node: any) => node.val}
            nodeLabel={(node: any) => node.name || node.id}
            nodeOpacity={0.9}
            linkColor={() => 'rgba(99, 102, 241, 0.4)'}
            linkWidth={1.5}
            linkOpacity={0.6}
            onNodeClick={handleNodeClick}
            enableNodeDrag={true}
            enableNavigationControls={true}
          />
        )}
      </div>

      {!loading && !error && (
        <>
          <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-2 rounded-lg text-[11px] text-slate-400 z-10">
            <span className="mr-3">🖱️ Drag to rotate</span>
            <span className="mr-3">🔍 Scroll to zoom</span>
            <span>👆 Click node to explore</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-black/60 px-3 py-2 rounded-lg text-[10px] z-10 flex flex-wrap gap-2 max-w-[280px]">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span className="text-slate-400">Jobs</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-slate-400">Skills</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-400">Companies</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
