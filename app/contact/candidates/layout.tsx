import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Fractional Executive Candidates',
  description: 'Register as a fractional executive candidate. Join the UK\'s leading platform for fractional CFO, CTO, CMO, and other executive roles.',
  alternates: {
    canonical: 'https://fractional.quest/contact/candidates',
  },
}

export default function CandidatesLayout({ children }: { children: React.ReactNode }) {
  return children
}
