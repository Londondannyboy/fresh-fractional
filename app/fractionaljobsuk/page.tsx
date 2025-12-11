import { Metadata } from 'next'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Badge } from '@/components/Badge'

export const metadata: Metadata = {
  title: 'Fractional Jobs UK - Executive & Specialist Roles',
  description: 'Browse fractional executive positions in the UK. Find CFO, CMO, CTO, and specialist roles.',
}

export default function JobsPage() {
  // TODO: Implement dynamic jobs list from database in Phase 2
  // For MVP, showing placeholder jobs

  const jobs = [
    {
      id: '1',
      title: 'Fractional CFO',
      company: 'Tech Startup Ltd',
      location: 'London, UK',
      compensation: '£600/day',
      skills: ['Finance', 'Management', 'Strategy'],
    },
    {
      id: '2',
      title: 'Fractional CMO',
      company: 'SaaS Company',
      location: 'Remote',
      compensation: '£500/day',
      skills: ['Marketing', 'Growth', 'Analytics'],
    },
    {
      id: '3',
      title: 'Fractional CTO',
      company: 'E-commerce Business',
      location: 'Manchester, UK',
      compensation: '£700/day',
      skills: ['Technology', 'Leadership', 'Architecture'],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-purple-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-black text-gray-900 mb-4">Fractional Jobs UK</h1>
          <p className="text-xl text-gray-600 mb-8">
            Browse hundreds of executive and specialist fractional roles
          </p>
          <div className="flex gap-4">
            <Button>Browse All Jobs</Button>
            <Button variant="secondary">Post a Job</Button>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="border-b bg-gray-50 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-600">
            🔄 Dynamic filtering coming in Phase 2 (location, role, remote status)
          </p>
        </div>
      </section>

      {/* Jobs List */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <p className="text-sm text-gray-500 mb-3">
                      {job.location} • {job.compensation}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="gray">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button>View</Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="mt-12 flex justify-center gap-2">
            <Button variant="secondary" disabled>1</Button>
            <Button variant="ghost">2</Button>
            <Button variant="ghost">3</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
