// components/admin/ProductForm.tsx
'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface ProductFormProps {
  mode: 'create' | 'edit'
  productId?: string
  initial?: {
    name: string; description: string; price: string; currency: string
    category: string; imageUrl: string; isAvailable: boolean
  }
}

const CATEGORIES = ['bible', 'book', 'clothing', 'accessory', 'other']
const CURRENCIES = ['USD', 'ZAR', 'ZWL']

export function ProductForm({ mode, productId, initial }: ProductFormProps) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name:        initial?.name        ?? '',
    description: initial?.description ?? '',
    price:       initial?.price       ?? '',
    currency:    initial?.currency    ?? 'USD',
    category:    initial?.category    ?? 'bible',
    imageUrl:    initial?.imageUrl    ?? '',
    isAvailable: initial?.isAvailable ?? true,
  })
  const [imagePreview, setImagePreview] = useState(initial?.imageUrl ?? '')
  const [imageFile,    setImageFile]    = useState<File | null>(null)
  const [saving,       setSaving]       = useState(false)
  const [deleting,     setDeleting]     = useState(false)
  const [error,        setError]        = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const body = new FormData()
      Object.entries(form).forEach(([k, v]) => body.append(k, String(v)))
      if (imageFile) body.append('image', imageFile)
      if (productId) body.append('id', productId)

      const url = mode === 'create' ? '/api/admin/products' : `/api/admin/products/${productId}`
      const res = await fetch(url, { method: mode === 'create' ? 'POST' : 'PATCH', body })

      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Failed to save product')
      }

      router.push('/admin/products')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!productId) return
    if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) return
    setDeleting(true)
    const res = await fetch(`/api/admin/products/${productId}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    } else {
      setError('Failed to delete product')
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-brand">
          <p className="font-sans text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Image upload */}
      <div>
        <label className="label-brand">Product Image</label>
        <div
          onClick={() => fileRef.current?.click()}
          className="mt-1 border-2 border-dashed border-brand-border rounded-brand-lg p-6 text-center cursor-pointer hover:border-brand-navy transition-colors"
        >
          {imagePreview ? (
            <div className="relative w-40 h-40 mx-auto rounded-brand overflow-hidden">
              <Image src={imagePreview} alt="Preview" fill className="object-cover" />
            </div>
          ) : (
            <div className="py-4">
              <svg className="w-8 h-8 text-brand-muted mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="font-sans text-brand-muted text-sm">Click to upload image</p>
              <p className="font-sans text-brand-muted text-xs mt-1">PNG, JPG up to 5MB</p>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="label-brand">Product Name <span className="text-red-500">*</span></label>
        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="input-brand" placeholder="e.g. KJV Study Bible" />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="label-brand">Description</label>
        <textarea id="description" name="description" rows={4} value={form.description} onChange={handleChange} className="input-brand resize-none" placeholder="Describe the product…" />
      </div>

      {/* Price + Currency */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="label-brand">Price <span className="text-red-500">*</span></label>
          <input id="price" name="price" type="number" step="0.01" min="0" required value={form.price} onChange={handleChange} className="input-brand" placeholder="0.00" />
        </div>
        <div>
          <label htmlFor="currency" className="label-brand">Currency</label>
          <select id="currency" name="currency" value={form.currency} onChange={handleChange} className="input-brand">
            {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="label-brand">Category</label>
        <select id="category" name="category" value={form.category} onChange={handleChange} className="input-brand">
          {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
      </div>

      {/* Availability toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-brand border border-brand-border">
        <div>
          <p className="font-sans text-brand-charcoal text-sm font-semibold">Available in shop</p>
          <p className="font-sans text-brand-muted text-xs mt-0.5">Toggle off to hide without deleting</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" name="isAvailable" checked={form.isAvailable} onChange={handleChange} className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-navy"></div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? 'Saving…' : mode === 'create' ? 'Create Product' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/products')} className="btn-secondary">
          Cancel
        </button>
        {mode === 'edit' && (
          <button type="button" onClick={handleDelete} disabled={deleting} className="ml-auto font-sans text-red-500 text-sm font-semibold hover:text-red-700 disabled:opacity-50">
            {deleting ? 'Deleting…' : 'Delete Product'}
          </button>
        )}
      </div>
    </form>
  )
}
