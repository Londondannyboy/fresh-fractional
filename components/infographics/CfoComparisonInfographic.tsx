'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, DollarSign, Clock, Zap, Users, Briefcase } from 'lucide-react'

export function CfoComparisonInfographic() {
  const [activeTab, setActiveTab] = useState<'cost' | 'value'>('cost')

  return (
    <div className="my-12 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5">
      <div className="bg-slate-900/5 p-1">
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-200/50 p-1">
          <button
            onClick={() => setActiveTab('cost')}
            className={`relative flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === 'cost'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
            }`}
          >
            <DollarSign className="h-4 w-4" />
            Cost Analysis
          </button>
          <button
            onClick={() => setActiveTab('value')}
            className={`relative flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === 'value'
                ? 'bg-white text-blue-900 shadow-sm'
                : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
            }`}
          >
            <Zap className="h-4 w-4" />
            Strategic Value
          </button>
        </div>
      </div>

      <div className="min-h-[500px] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'cost' ? (
            <CostView key="cost" />
          ) : (
            <ValueView key="value" />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function CostView() {
  // Data for the chart
  const fullTimeCost = 302840
  const fractionalCost = 115200
  const savings = fullTimeCost - fractionalCost

  const fullTimeBreakdown = [
    { label: 'Base Salary', value: 180000, color: 'bg-slate-400' },
    { label: 'Bonuses & Benefits', value: 61840, color: 'bg-slate-300' }, // Bonus + Benefits + NI + Pension
    { label: 'Recruitment & Training', value: 41000, color: 'bg-slate-200' }, // Recruitment + Training
    { label: 'Hidden Costs', value: 20000, color: 'bg-slate-100' }, // Overhead
  ]

  const fractionalBreakdown = [
    { label: 'Annual Retainer', value: 115200, color: 'bg-blue-600' },
    { label: 'Recruitment', value: 0, color: 'bg-blue-400' },
    { label: 'Benefits', value: 0, color: 'bg-blue-300' },
    { label: 'Overhead', value: 0, color: 'bg-blue-200' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 md:flex-row"
    >
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Annual Investment Required</h3>
          <p className="mt-2 text-slate-600">
            Comparing the total cost of ownership for a typical Series A/B company (£1M-£10M revenue).
          </p>
        </div>

        <div className="space-y-4">
          {/* Full Time Bar Group */}
          <div>
            <div className="mb-2 flex justify-between text-sm font-medium text-slate-900">
              <span>Full-Time CFO</span>
              <span>£{(fullTimeCost / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex h-12 w-full overflow-hidden rounded-lg bg-slate-50 ring-1 ring-slate-900/5">
              {fullTimeBreakdown.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / fullTimeCost) * 100}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className={`${item.color} relative group`}
                >
                  <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                </motion.div>
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-400"></span>Salary</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-300"></span>Benefits</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-200"></span>Recruitment</span>
            </div>
          </div>

          {/* Fractional Bar Group */}
          <div>
            <div className="mb-2 flex justify-between text-sm font-medium text-slate-900">
              <span>Fractional CFO (2 days/wk)</span>
              <span className="text-blue-600">£{(fractionalCost / 1000).toFixed(0)}k</span>
            </div>
            <div className="relative flex h-12 w-full overflow-hidden rounded-lg bg-slate-50 ring-1 ring-slate-900/5">
              {/* Spacer to align scale roughly if max width is fullTimeCost */}
              <div className="absolute inset-0 flex">
                 {fractionalBreakdown.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / fullTimeCost) * 100}%` }} // Scale relative to full time
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className={`${item.color} relative group`}
                  >
                     <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/5" />
                  </motion.div>
                ))}
              </div>
            </div>
             <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-blue-600"></span>Fee</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-blue-900">Annual Savings</div>
              <div className="text-2xl font-bold text-blue-700">£{savings.toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 rounded-xl bg-slate-50 p-6 ring-1 ring-slate-900/5">
         <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">Where the money goes</h4>
         <ul className="space-y-4">
            <li className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                <div>
                    <strong className="text-slate-900">Recruitment Fees:</strong>
                    <p className="text-sm text-slate-600">Full-time often costs 20-30% of base salary in agency fees (£30k+). Fractional fees are £0.</p>
                </div>
            </li>
            <li className="flex items-start gap-3">
                <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" />
                <div>
                    <strong className="text-slate-900">Benefits & Equity:</strong>
                    <p className="text-sm text-slate-600">Pension, NI, healthcare, and equity grants add ~35% to base salary. Fractional covers their own.</p>
                </div>
            </li>
            <li className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <div>
                    <strong className="text-slate-900">Results Oriented:</strong>
                    <p className="text-sm text-slate-600">With Fractional, you pay strictly for output and expertise, not "seat time" or watercooler chat.</p>
                </div>
            </li>
         </ul>
      </div>
    </motion.div>
  )
}

function ValueView() {
  // Radar chart data points (0-100 scale)
  const stats = [
    { label: 'Cost Efficiency', full: 40, frac: 95 },
    { label: 'Hiring Speed', full: 20, frac: 90 },
    { label: 'Specialized Skills', full: 60, frac: 90 },
    { label: 'Availability', full: 100, frac: 40 },
    { label: 'Cultural Integration', full: 95, frac: 50 },
    { label: 'Flexibility', full: 30, frac: 95 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-8 md:flex-row"
    >
        <div className="flex items-center justify-center flex-1">
             <RadarChart stats={stats} />
        </div>

        <div className="flex-1 space-y-6">
            <div>
                <h3 className="text-xl font-bold text-slate-900">Strategic Trade-offs</h3>
                <p className="mt-2 text-slate-600">
                    While Full-Time offers presence, Fractional offers agility and efficiency.
                </p>
            </div>

            <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-600 shadow-sm" />
                    <div>
                        <strong className="text-blue-900">Fractional Strength: Agility</strong>
                        <p className="text-sm text-slate-600">
                            Superior for speed, cost, and flexibility. Ideal for specific projects (fundraising) or stages (growth).
                        </p>
                    </div>
                </div>
                 <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-slate-400 shadow-sm" />
                    <div>
                        <strong className="text-slate-900">Full-Time Strength: Presence</strong>
                        <p className="text-sm text-slate-600">
                            Unmatched for daily operational management, team building, and deep cultural integration.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-900/5">
                    <div className="mb-1 text-xs font-semibold uppercase text-slate-400">Best For</div>
                    <div className="font-medium text-slate-900">Growth & Scale-up</div>
                    <div className="text-sm text-blue-600">Fractional CFO</div>
                </div>
                 <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-900/5">
                    <div className="mb-1 text-xs font-semibold uppercase text-slate-400">Best For</div>
                    <div className="font-medium text-slate-900">IPO & Corporate</div>
                    <div className="text-sm text-slate-500">Full-Time CFO</div>
                </div>
            </div>
        </div>
    </motion.div>
  )
}

function RadarChart({ stats }: { stats: { label: string; full: number; frac: number }[] }) {
    const radius = 120
    const center = 150
    const angleStep = (Math.PI * 2) / stats.length

    const getPoint = (value: number, index: number) => {
        const angle = index * angleStep - Math.PI / 2 // Start at top
        const r = (value / 100) * radius
        const x = center + r * Math.cos(angle)
        const y = center + r * Math.sin(angle)
        return `${x},${y}`
    }

    const fullPoints = stats.map((s, i) => getPoint(s.full, i)).join(' ')
    const fracPoints = stats.map((s, i) => getPoint(s.frac, i)).join(' ')
    const axes = stats.map((s, i) => getPoint(100, i))

    return (
        <div className="relative h-[300px] w-[300px]">
            <svg width="300" height="300" className="overflow-visible">
                {/* Background Grid */}
                {[0.25, 0.5, 0.75, 1].map((scale) => (
                    <circle
                        key={scale}
                        cx={center}
                        cy={center}
                        r={radius * scale}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                    />
                ))}

                {/* Axes */}
                {axes.map((point, i) => {
                     const [x, y] = point.split(',').map(Number)
                     return (
                         <g key={i}>
                             <line x1={center} y1={center} x2={x} y2={y} stroke="#cbd5e1" strokeWidth="1" />
                             {/* Label */}
                             <foreignObject
                                x={x < center ? x - 80 : x}
                                y={y < center ? y - 20 : y}
                                width="80"
                                height="40"
                                className="overflow-visible"
                             >
                                <div className={`text-[10px] font-medium text-slate-500 ${
                                    x < center ? 'text-right pr-2' :
                                    x > center ? 'text-left pl-2' : 'text-center'
                                } ${
                                    y < center ? 'pb-1' :
                                    y > center ? 'pt-1' : ''
                                }`}>
                                    {stats[i].label}
                                </div>
                             </foreignObject>
                         </g>
                     )
                })}

                {/* Full Time Shape */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    points={fullPoints}
                    fill="#94a3b8"
                    stroke="#475569"
                    strokeWidth="2"
                    className="opacity-50"
                />

                {/* Fractional Shape */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    points={fracPoints}
                    fill="#3b82f6"
                    stroke="#2563eb"
                    strokeWidth="2"
                    className="opacity-50"
                />
            </svg>

            {/* Legend placed absolutely to avoid SVG clipping issues if not handled */}
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-4 text-xs font-medium">
                 <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-400" />
                    <span className="text-slate-600">Full-Time</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-blue-700">Fractional</span>
                 </div>
            </div>
        </div>
    )
}
