// components/admin/AdvertForm.tsx
'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface AdvertFormProps {
  mode: 'create' | 'edit'; advertId?: string
  initial?: { brandName: string; linkUrl: string; placement: string; isActive: boolean; startDate: string; endDate: string; imageUrl: string }
}
const PLACEMENTS = ['homepage', 'shop', 'sidebar', 'footer']

export function AdvertForm({ mode, advertId, initial }: AdvertFormProps) {
  const router  = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({ brandName: initial?.brandName ?? '', linkUrl: initial?.linkUrl ?? '', placement: initial?.placement ?? 'homepage', isActive: initial?.isActive ?? true, startDate: initial?.startDate ?? '', endDate: initial?.endDate ?? '' })
  const [imagePreview, setImagePreview] = useState(initial?.imageUrl ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setImageFile(file); setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setSaving(true)
    try {
      const body = new FormData()
      Object.entries(form).forEach(([k, v]) => body.append(k, String(v)))
      if (imageFile) body.append('image', imageFile)
      if (advertId) body.append('id', advertId)
      const url = mode === 'create' ? '/api/admin/adverts' : `/api/admin/adverts/${advertId}`
      const res = await fetch(url, { method: mode === 'create' ? 'POST' : 'PATCH', body })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed to save') }
      router.push('/admin/adverts'); router.refresh()
    } catch (err) { setError(err instanceof Error ? err.message : 'Something went wrong'); setSaving(false) }
  }

  async function handleDelete() {
    if (!advertId || !confirm('Delete this advert?')) return
    setDeleting(true)
    const res = await fetch(`/api/admin/adverts/${advertId}`, { method: 'DELETE' })
    if (res.ok) { router.push('/admin/adverts'); router.refresh() }
    else { setError('Failed to delete'); setDeleting(false) }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-brand"><p className="font-sans text-red-600 text-sm">{error}</p></div>}
      
      <div>
        <label className="label-brand">Advert Image <span className="text-red-500">*</span></label>
        <div onClick={() => fileRef.current?.click()} className="mt-1 border-2 border-dashed border-brand-border rounded-brand-lg p-6 text-center cursor-pointer hover:border-brand-navy transition-colors">
          {imagePreview ? (
            <div className="relative h-32 w-full rounded-brand overflow-hidden"><Image src={imagePreview} alt="Preview" fill className="object-contain" /></div>
          ) : (
            <div className="py-4"><p className="font-sans text-brand-muted text-sm">Click to upload advert image</p><p className="font-sans text-brand-muted text-xs mt-1">Recommended: 1200×300px PNG or JPG</p></div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </div>

      <div><label htmlFor="brandName" className="label-brand">Brand Name <span className="text-red-500">*</span></label><input id="brandName" name="brandName" type="text" required value={form.brandName} onChange={handleChange} className="input-brand" placeholder="e.g. Faith & Co Ministries" /></div>
      <div><label htmlFor="linkUrl" className="label-brand">Link URL <span className="text-red-500">*</span></label><input id="linkUrl" name="linkUrl" type="url" required value={form.linkUrl} onChange={handleChange} className="input-brand" placeholder="https://brandwebsite.com" /></div>
      <div><label htmlFor="placement" className="label-brand">Placement</label><select id="placement" name="placement" value={form.placement} onChange={handleChange} className="input-brand">{PLACEMENTS.map(p => <option key={p} value={p} className="capitalize">{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}</select></div>

      <div className="grid grid-cols-2 gap-4">
        <div><label htmlFor="startDate" className="label-brand">Start Date <span className="font-normal text-xs text-brand-muted">(optional)</span></label><input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} className="input-brand" /></div>
        <div><label htmlFor="endDate" className="label-brand">End Date <span className="font-normal text-xs text-brand-muted">(optional)</span></label><input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} className="input-brand" /></div>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-brand border border-brand-border">
        <div><p className="font-sans text-brand-charcoal text-sm font-semibold">Active</p><p className="font-sans text-brand-muted text-xs mt-0.5">Show this advert on the public site</p></div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-navy"></div>
        </label>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving…' : mode === 'create' ? 'Create Advert' : 'Save Changes'}</button>
        <button type="button" onClick={() => router.push('/admin/adverts')} className="btn-secondary">Cancel</button>
        {mode === 'edit' && <button type="button" onClick={handleDelete} disabled={deleting} className="ml-auto font-sans text-red-500 text-sm font-semibold hover:text-red-700 disabled:opacity-50">{deleting ? 'Deleting…' : 'Delete Advert'}</button>}
      </div>
    </form>
  )
}
