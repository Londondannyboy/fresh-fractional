import Link from 'next/link'
import type { CandidateProfile } from '@/lib/candidate-profiles'

interface CandidateCardProps {
  candidate: CandidateProfile
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Link
      href={`/people/${candidate.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-purple-300 hover:shadow-lg transition-all"
    >
      {/* Photo */}
      <div className="aspect-[4/3] bg-gradient-to-br from-purple-100 to-purple-50 relative overflow-hidden">
        {candidate.photo_url ? (
          <img
            src={candidate.photo_url}
            alt={candidate.display_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-3xl font-bold text-purple-600">
                {candidate.display_name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
        {candidate.is_featured && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-purple-600 transition-colors">
          {candidate.display_name}
        </h3>
        {candidate.headline && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {candidate.headline}
          </p>
        )}

        {/* Role badges */}
        {candidate.role_categories && candidate.role_categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {candidate.role_categories.slice(0, 2).map((role) => (
              <span
                key={role}
                className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                {role}
              </span>
            ))}
            {candidate.role_categories.length > 2 && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{candidate.role_categories.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {candidate.based_in && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {candidate.based_in}
            </span>
          )}
          {candidate.availability && (
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {candidate.availability}
            </span>
          )}
        </div>

        {/* Day rate */}
        {(candidate.day_rate_min || candidate.day_rate_max) && (
          <div className="mt-3 pt-3 border-t text-sm">
            <span className="text-gray-500">Day rate: </span>
            <span className="font-medium text-gray-900">
              {candidate.day_rate_min && candidate.day_rate_max
                ? `£${candidate.day_rate_min} - £${candidate.day_rate_max}`
                : candidate.day_rate_min
                  ? `From £${candidate.day_rate_min}`
                  : `Up to £${candidate.day_rate_max}`}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
