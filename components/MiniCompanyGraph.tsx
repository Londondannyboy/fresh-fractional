'use client'

import { useMemo, useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import ForceGraph2D with SSR disabled
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
      <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )
})

interface MiniCompanyGraphProps {
  companyName: string
  companyDomain?: string
  jobTitle: string
  skills?: string[]
  className?: string
}

interface GraphNode {
  id: string
  name: string
  type: 'company' | 'job' | 'skill'
  val: number
  color: string
}

interface GraphLink {
  source: string
  target: string
}

const colors = {
  company: '#f59e0b',
  job: '#3b82f6',
  skill: '#10b981'
}

export function MiniCompanyGraph({
  companyName,
  companyDomain,
  jobTitle,
  skills = [],
  className = ''
}: MiniCompanyGraphProps) {
  const graphRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 200, height: 140 })

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

  // Build graph data
  const graphData = useMemo(() => {
    const nodes: GraphNode[] = []
    const links: GraphLink[] = []

    // Company node (center)
    const shortCompany = companyName.split(' ').slice(0, 2).join(' ')
    nodes.push({
      id: 'company',
      name: shortCompany,
      type: 'company',
      val: 25,
      color: colors.company
    })

    // Job node
    const shortJob = jobTitle.split(' ').slice(0, 3).join(' ')
    nodes.push({
      id: 'job',
      name: shortJob,
      type: 'job',
      val: 15,
      color: colors.job
    })
    links.push({ source: 'company', target: 'job' })

    // Skill nodes (limit to 4 for readability)
    const displaySkills = skills.slice(0, 4)
    displaySkills.forEach((skill, i) => {
      const shortSkill = skill.split(' ').slice(0, 2).join(' ')
      nodes.push({
        id: `skill-${i}`,
        name: shortSkill,
        type: 'skill',
        val: 8,
        color: colors.skill
      })
      links.push({ source: 'job', target: `skill-${i}` })
    })

    return { nodes, links }
  }, [companyName, jobTitle, skills])

  // Zoom to fit on load
  useEffect(() => {
    if (graphRef.current) {
      setTimeout(() => {
        graphRef.current?.zoomToFit(300, 20)
      }, 500)
    }
  }, [graphData])

  if (!companyName) return null

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-1.5 mb-2">
        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Knowledge Graph</span>
      </div>
      <div
        ref={containerRef}
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden"
        style={{ height: '140px' }}
      >
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={140}
          backgroundColor="transparent"
          nodeColor={(node: any) => node.color}
          nodeVal={(node: any) => node.val}
          nodeLabel={(node: any) => node.name}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            // Draw node circle
            const size = Math.sqrt(node.val) * 2
            ctx.beginPath()
            ctx.arc(node.x, node.y, size, 0, 2 * Math.PI)
            ctx.fillStyle = node.color
            ctx.fill()

            // Draw label for company and job nodes
            if (node.type === 'company' || node.type === 'job') {
              const fontSize = node.type === 'company' ? 10 / globalScale : 8 / globalScale
              ctx.font = `600 ${fontSize}px system-ui, sans-serif`
              ctx.textAlign = 'center'
              ctx.textBaseline = 'middle'
              ctx.fillStyle = '#374151'

              const yOffset = size + fontSize
              ctx.fillText(node.name, node.x, node.y + yOffset)
            }
          }}
          linkColor={() => 'rgba(156, 163, 175, 0.5)'}
          linkWidth={1.5}
          d3AlphaDecay={0.05}
          d3VelocityDecay={0.4}
          warmupTicks={50}
          cooldownTicks={100}
          enableNodeDrag={false}
          enableZoomInteraction={false}
          enablePanInteraction={false}
        />
      </div>
    </div>
  )
}
