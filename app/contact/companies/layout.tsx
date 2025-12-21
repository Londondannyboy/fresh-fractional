import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Hire Fractional Executives',
  description: 'Looking to hire fractional executives? Contact us to find fractional CFOs, CTOs, CMOs and other C-suite talent for your organisation.',
  alternates: {
    canonical: 'https://fractional.quest/contact/companies',
  },
}

export default function CompaniesLayout({ children }: { children: React.ReactNode }) {
  return children
}
