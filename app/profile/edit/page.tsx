'use client'

import { useUser } from '@stackframe/stack'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ROLE_OPTIONS = ['CFO', 'CMO', 'CTO', 'COO', 'CHRO', 'CPO', 'CRO', 'CDO', 'CISO', 'Board Advisor', 'NED', 'Consultant']
const INDUSTRY_OPTIONS = ['SaaS', 'FinTech', 'HealthTech', 'E-commerce', 'EdTech', 'PropTech', 'CleanTech', 'DeepTech', 'Enterprise', 'SMB', 'Startup', 'PE/VC Backed']
const SPECIALISM_OPTIONS = ['M&A', 'Fundraising', 'IPO Prep', 'Turnaround', 'Scaling', 'GTM Strategy', 'Product Launch', 'Team Building', 'Board Reporting', 'Due Diligence', 'Financial Modelling', 'Brand Strategy', 'Digital Transformation']
const AVAILABILITY_OPTIONS = ['Available now', '1-2 days/week', '2-3 days/week', '3-4 days/week', 'Limited capacity']
const WORK_PREF_OPTIONS = ['Remote', 'Hybrid', 'On-site', 'Flexible']

export default function EditProfilePage() {
  const user = useUser({ or: 'redirect' })
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    display_name: '', headline: '', bio: '', photo_url: '',
    role_categories: [] as string[], industries: [] as string[], specialisms: [] as string[],
    years_experience: null as number | null, day_rate_min: null as number | null, day_rate_max: null as number | null,
    availability: '', work_preference: '', based_in: '', linkedin_url: '', website_url: '',
    is_public: false, profile_status: 'draft' as 'draft' | 'published'
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/candidate-profile')
        if (res.ok) {
          const profile = await res.json()
          if (profile) {
            setFormData({
              display_name: profile.display_name || '',
              headline: profile.headline || '',
              bio: profile.bio || '',
              photo_url: profile.photo_url || '',
              role_categories: profile.role_categories || [],
              industries: profile.industries || [],
              specialisms: profile.specialisms || [],
              years_experience: profile.years_experience,
              day_rate_min: profile.day_rate_min,
              day_rate_max: profile.day_rate_max,
              availability: profile.availability || '',
              work_preference: profile.work_preference || '',
              based_in: profile.based_in || '',
              linkedin_url: profile.linkedin_url || '',
              website_url: profile.website_url || '',
              is_public: profile.is_public || false,
              profile_status: profile.profile_status || 'draft',
            })
          } else if (user?.displayName) {
            setFormData(prev => ({ ...prev, display_name: user.displayName || '' }))
          }
        }
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    if (user) fetchProfile()
  }, [user])

  const handleToggle = (field: 'role_categories' | 'industries' | 'specialisms', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter(v => v !== value) : [...prev[field], value]
    }))
  }

  const handleSave = async (publish = false) => {
    setSaving(true); setError(null); setSuccess(null)
    try {
      const res = await fetch('/api/candidate-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, is_public: publish, profile_status: publish ? 'published' : 'draft' })
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save')
      const saved = await res.json()
      setFormData(saved)
      setSuccess(publish ? 'Profile published!' : 'Draft saved')
      if (publish && saved.slug) setTimeout(() => router.push(`/people/${saved.slug}`), 1500)
    } catch (e: any) { setError(e.message) }
    finally { setSaving(false) }
  }

  if (!user) return null
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full" /></div>

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/profile" className="text-gray-600 hover:text-gray-900">← Back</Link>
          <h1 className="font-bold">Edit Public Profile</h1>
          <div className="flex gap-2">
            <button onClick={() => handleSave(false)} disabled={saving} className="px-4 py-2 border rounded-lg disabled:opacity-50">Save Draft</button>
            <button onClick={() => handleSave(true)} disabled={saving || !formData.display_name} className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50">Publish</button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
        {success && <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>}

        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold">Basic Info</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Display Name *</label>
            <input type="text" value={formData.display_name} onChange={e => setFormData(p => ({ ...p, display_name: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" placeholder="John Smith" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Headline</label>
            <input type="text" value={formData.headline} onChange={e => setFormData(p => ({ ...p, headline: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" placeholder="Fractional CFO | PE/VC Specialist" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea value={formData.bio} onChange={e => setFormData(p => ({ ...p, bio: e.target.value }))} rows={4} className="w-full px-4 py-2 border rounded-lg" placeholder="Tell companies about your experience..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input type="url" value={formData.photo_url} onChange={e => setFormData(p => ({ ...p, photo_url: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." />
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold mb-4">Roles</h2>
          <div className="flex flex-wrap gap-2">
            {ROLE_OPTIONS.map(r => (
              <button key={r} onClick={() => handleToggle('role_categories', r)} className={`px-4 py-2 rounded-full text-sm ${formData.role_categories.includes(r) ? 'bg-purple-600 text-white' : 'bg-gray-100'}`}>{r}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold mb-4">Industries</h2>
          <div className="flex flex-wrap gap-2">
            {INDUSTRY_OPTIONS.map(i => (
              <button key={i} onClick={() => handleToggle('industries', i)} className={`px-4 py-2 rounded-full text-sm ${formData.industries.includes(i) ? 'bg-green-600 text-white' : 'bg-gray-100'}`}>{i}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold mb-4">Specialisms</h2>
          <div className="flex flex-wrap gap-2">
            {SPECIALISM_OPTIONS.map(s => (
              <button key={s} onClick={() => handleToggle('specialisms', s)} className={`px-4 py-2 rounded-full text-sm ${formData.specialisms.includes(s) ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold mb-4">Rates & Availability</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Day Rate Min (£)</label>
              <input type="number" value={formData.day_rate_min || ''} onChange={e => setFormData(p => ({ ...p, day_rate_min: e.target.value ? parseInt(e.target.value) : null }))} className="w-full px-4 py-2 border rounded-lg" placeholder="750" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Day Rate Max (£)</label>
              <input type="number" value={formData.day_rate_max || ''} onChange={e => setFormData(p => ({ ...p, day_rate_max: e.target.value ? parseInt(e.target.value) : null }))} className="w-full px-4 py-2 border rounded-lg" placeholder="1500" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Years Experience</label>
              <input type="number" value={formData.years_experience || ''} onChange={e => setFormData(p => ({ ...p, years_experience: e.target.value ? parseInt(e.target.value) : null }))} className="w-full px-4 py-2 border rounded-lg" placeholder="15" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Availability</label>
              <select value={formData.availability} onChange={e => setFormData(p => ({ ...p, availability: e.target.value }))} className="w-full px-4 py-2 border rounded-lg">
                <option value="">Select...</option>
                {AVAILABILITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Work Preference</label>
              <select value={formData.work_preference} onChange={e => setFormData(p => ({ ...p, work_preference: e.target.value }))} className="w-full px-4 py-2 border rounded-lg">
                <option value="">Select...</option>
                {WORK_PREF_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Based In</label>
              <input type="text" value={formData.based_in} onChange={e => setFormData(p => ({ ...p, based_in: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" placeholder="London, UK" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="font-semibold">Links</h2>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
            <input type="url" value={formData.linkedin_url} onChange={e => setFormData(p => ({ ...p, linkedin_url: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Website URL</label>
            <input type="url" value={formData.website_url} onChange={e => setFormData(p => ({ ...p, website_url: e.target.value }))} className="w-full px-4 py-2 border rounded-lg" placeholder="https://..." />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={() => handleSave(false)} disabled={saving} className="px-6 py-3 border rounded-lg font-medium disabled:opacity-50">Save Draft</button>
          <button onClick={() => handleSave(true)} disabled={saving || !formData.display_name} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium disabled:opacity-50">Publish Profile</button>
        </div>
      </main>
    </div>
  )
}
