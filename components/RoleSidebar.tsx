import Link from 'next/link'

interface RoleSidebarProps {
  role: string
  relatedRoles?: string[]
}

export function RoleSidebar({ role, relatedRoles = [] }: RoleSidebarProps) {
  const roleLower = role.toLowerCase()
  const roleUpper = role.toUpperCase()

  return (
    <div className="space-y-8">
      {/* Navigation Widget */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
          {roleUpper} Resources
        </h3>
        <ul className="space-y-3 text-sm">
          <li>
            <Link href={`/fractional-${roleLower}-jobs-uk`} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              {roleUpper} Jobs
            </Link>
          </li>
          <li>
            <Link href={`/fractional-${roleLower}-services`} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              Hire a Fractional {roleUpper}
            </Link>
          </li>
          <li>
            <Link href={`/fractional-${roleLower}-salary`} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
              Salary Guide
            </Link>
          </li>
          <li>
            <Link href={`/how-to-become-fractional-${roleLower}`} className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
              How to Become a {roleUpper}
            </Link>
          </li>
        </ul>
      </div>

      {/* Related Roles Widget */}
      {relatedRoles.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            Related Roles
          </h3>
          <ul className="space-y-3 text-sm">
            {relatedRoles.map((r) => (
              <li key={r}>
                <Link href={`/fractional-${r.toLowerCase()}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                  Fractional {r}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact/CTA Widget */}
      <div className="bg-blue-600 p-6 rounded-xl text-white">
        <h3 className="font-bold text-lg mb-2">Need a {roleUpper}?</h3>
        <p className="text-blue-100 text-sm mb-4">
          We match companies with pre-vetted fractional {roleUpper}s.
        </p>
        <Link 
          href="/contact/companies" 
          className="block w-full py-2.5 bg-white text-blue-600 text-center font-bold rounded-lg hover:bg-blue-50 transition-colors text-sm"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
