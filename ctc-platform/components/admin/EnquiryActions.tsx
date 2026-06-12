// components/admin/EnquiryActions.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function EnquiryActions({ enquiryId, currentStatus, email }: { enquiryId: string; currentStatus: string; email: string }) {
  const router = useRouter()
  const [status, setStatus] = useState(currentStatus)
  const [saving, setSaving] = useState(false)

  async function updateStatus(newStatus: 'new' | 'read' | 'responded') {
    setSaving(true)
    await fetch(`/api/admin/enquiries/${enquiryId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) })
    setStatus(newStatus)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="bg-white rounded-brand-lg border border-brand-border p-6">
      <h2 className="font-sans text-xs font-bold text-brand-muted tracking-wider uppercase mb-4">Actions</h2>
      <div className="flex flex-wrap gap-3">
        {status !== 'read' && status !== 'responded' && (
          <button onClick={() => updateStatus('read')} disabled={saving} className="btn-secondary text-sm px-4 py-2">Mark as Read</button>
        )}
        {status !== 'responded' && (
          <button onClick={() => updateStatus('responded')} disabled={saving} className="btn-primary text-sm px-4 py-2">Mark as Responded</button>
        )}
        <a href={`mailto:${email}`} className="btn-secondary text-sm px-4 py-2 inline-flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          Reply by Email
        </a>
      </div>
      {saving && <p className="font-sans text-brand-muted text-xs mt-3">Saving…</p>}
    </div>
  )
}
