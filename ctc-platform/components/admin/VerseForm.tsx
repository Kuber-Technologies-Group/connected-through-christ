// components/admin/VerseForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface VerseFormProps {
  mode: 'create' | 'edit'
  verseId?: string
  initial?: { verseText: string; reference: string; translation: string; scheduledDate: string; reflectionNote: string }
}

const TRANSLATIONS = ['NIV', 'KJV', 'ESV', 'NLT', 'NKJV', 'CSB', 'AMP']

export function VerseForm({ mode, verseId, initial }: VerseFormProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    verseText:      initial?.verseText      ?? '',
    reference:      initial?.reference      ?? '',
    translation:    initial?.translation    ?? 'NIV',
    scheduledDate:  initial?.scheduledDate  ?? '',
    reflectionNote: initial?.reflectionNote ?? '',
  })
  const [saving,   setSaving]   = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error,    setError]    = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const url    = mode === 'create' ? '/api/admin/verses' : `/api/admin/verses/${verseId}`
      const method = mode === 'create' ? 'POST' : 'PATCH'
      const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed to save') }
      router.push('/admin/verses')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!verseId || !confirm('Delete this verse? This cannot be undone.')) return
    setDeleting(true)
    const res = await fetch(`/api/admin/verses/${verseId}`, { method: 'DELETE' })
    if (res.ok) { router.push('/admin/verses'); router.refresh() }
    else { setError('Failed to delete verse'); setDeleting(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-brand"><p className="font-sans text-red-600 text-sm">{error}</p></div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="scheduledDate" className="label-brand">Date <span className="text-red-500">*</span></label>
          <input id="scheduledDate" name="scheduledDate" type="date" required value={form.scheduledDate} onChange={handleChange} className="input-brand" />
        </div>
        <div>
          <label htmlFor="translation" className="label-brand">Translation</label>
          <select id="translation" name="translation" value={form.translation} onChange={handleChange} className="input-brand">
            {TRANSLATIONS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="reference" className="label-brand">Reference <span className="text-red-500">*</span></label>
        <input id="reference" name="reference" type="text" required value={form.reference} onChange={handleChange} className="input-brand" placeholder="e.g. John 3:16" />
      </div>

      <div>
        <label htmlFor="verseText" className="label-brand">Verse Text <span className="text-red-500">*</span></label>
        <textarea id="verseText" name="verseText" rows={4} required value={form.verseText} onChange={handleChange} className="input-brand resize-none" placeholder="Enter the full verse text…" />
      </div>

      <div>
        <label htmlFor="reflectionNote" className="label-brand">Reflection Note <span className="font-normal text-brand-muted text-xs">(optional)</span></label>
        <textarea id="reflectionNote" name="reflectionNote" rows={3} value={form.reflectionNote} onChange={handleChange} className="input-brand resize-none" placeholder="Optional short reflection or commentary…" />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving…' : mode === 'create' ? 'Schedule Verse' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/verses')} className="btn-secondary">Cancel</button>
        {mode === 'edit' && (
          <button type="button" onClick={handleDelete} disabled={deleting} className="ml-auto font-sans text-red-500 text-sm font-semibold hover:text-red-700 disabled:opacity-50">
            {deleting ? 'Deleting…' : 'Delete Verse'}
          </button>
        )}
      </div>
    </form>
  )
}
