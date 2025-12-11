import { Metadata } from 'next'
import { Card } from '@/components/Card'

export const metadata: Metadata = {
  title: 'Resources & Articles | Fractional.Quest',
  description: 'Expert guides and articles about fractional executive roles, career tips, and hiring strategies.',
}

export default function ArticlesPage() {
  // TODO: Implement dynamic articles list from database in Phase 2
  // For MVP, showing placeholder content

  const articles = [
    {
      id: '1',
      slug: 'getting-started-fractional',
      title: 'Getting Started with Fractional Work',
      excerpt: 'A comprehensive guide to beginning your fractional career journey.',
      publishedAt: new Date('2025-12-01'),
    },
    {
      id: '2',
      slug: 'negotiating-day-rates',
      title: 'How to Negotiate Your Day Rate',
      excerpt: 'Expert tips on setting and negotiating competitive fractional rates.',
      publishedAt: new Date('2025-11-28'),
    },
    {
      id: '3',
      slug: 'fractional-roles-explained',
      title: 'Understanding Different Fractional Roles',
      excerpt: 'Explore the various types of fractional executive positions available.',
      publishedAt: new Date('2025-11-25'),
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-purple-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Resources & Articles</h1>
          <p className="text-xl text-gray-600">
            Expert guides and insights about fractional executive roles.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <p className="text-sm text-gray-500">
                  {article.publishedAt.toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
