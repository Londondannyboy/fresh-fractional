'use client'

import { useEffect, useRef, useState } from 'react'

interface MiniCompanyGraphProps {
  companyName: string
  companyDomain?: string
  jobTitle: string
  skills?: string[]
  className?: string
}

interface Node {
  id: string
  label: string
  type: 'company' | 'job' | 'skill'
  x: number
  y: number
  color: string
  size: number
}

interface Link {
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2

    // Create nodes
    const nodes: Node[] = []
    const links: Link[] = []

    // Company node (center)
    const shortCompany = companyName.split(' ')[0].slice(0, 8)
    nodes.push({
      id: 'company',
      label: shortCompany,
      type: 'company',
      x: centerX,
      y: centerY,
      color: colors.company,
      size: 16
    })

    // Job node (above company)
    const shortJob = jobTitle.split(' ').slice(0, 2).join(' ').slice(0, 12)
    nodes.push({
      id: 'job',
      label: shortJob,
      type: 'job',
      x: centerX,
      y: centerY - 35,
      color: colors.job,
      size: 12
    })
    links.push({ source: 'company', target: 'job' })

    // Skill nodes (around the company)
    const displaySkills = skills.slice(0, 4)
    const angleStep = (Math.PI * 2) / Math.max(displaySkills.length, 1)
    const startAngle = Math.PI / 2 // Start from bottom

    displaySkills.forEach((skill, i) => {
      const angle = startAngle + (i * angleStep)
      const radius = 38
      nodes.push({
        id: `skill-${i}`,
        label: skill.slice(0, 6),
        type: 'skill',
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        color: colors.skill,
        size: 6
      })
      links.push({ source: 'job', target: `skill-${i}` })
    })

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw links
    ctx.strokeStyle = 'rgba(156, 163, 175, 0.4)'
    ctx.lineWidth = 1
    links.forEach(link => {
      const source = nodes.find(n => n.id === link.source)
      const target = nodes.find(n => n.id === link.target)
      if (source && target) {
        ctx.beginPath()
        ctx.moveTo(source.x, source.y)
        ctx.lineTo(target.x, target.y)
        ctx.stroke()
      }
    })

    // Draw nodes
    nodes.forEach(node => {
      // Node circle
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
      ctx.fillStyle = node.color
      ctx.fill()

      // Node label
      ctx.fillStyle = '#4b5563'
      ctx.font = `${node.type === 'company' ? '9px' : '7px'} system-ui`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      if (node.type === 'company') {
        ctx.fillText(node.label, node.x, node.y + node.size + 10)
      } else if (node.type === 'job') {
        ctx.fillText(node.label, node.x, node.y - node.size - 6)
      }
    })
  }, [companyName, jobTitle, skills, isHovered])

  if (!companyName) return null

  return (
    <div
      className={`${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-1.5 mb-2">
        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Knowledge Graph</span>
      </div>
      <div className="bg-gray-50 rounded-lg p-1 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={140}
          height={100}
          className="block"
        />
      </div>
    </div>
  )
}
