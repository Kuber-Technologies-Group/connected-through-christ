// components/ContactForm.tsx
'use client'

import { useState } from 'react'
import type { EnquiryFormData } from '@/types'

interface ContactFormProps {
  prefillProductName?: string  // Pre-fills subject when coming from a product page
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validateForm(data: EnquiryFormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim())    errors.name    = 'Your name is required.'
  if (!data.email.trim())   errors.email   = 'Your email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                             errors.email   = 'Please enter a valid email address.'
  if (!data.message.trim()) errors.message = 'Please enter a message.'
  return errors
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ prefillProductName }: ContactFormProps) {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name:    '',
    email:   '',
    subject: prefillProductName ? `Enquiry about: ${prefillProductName}` : '',
    message: '',
  })
  const [errors,  setErrors]  = useState<FormErrors>({})
  const [status,  setStatus]  = useState<FormStatus>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear the error for this field as the user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  // ── Success State ──
  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6 bg-white rounded-brand-lg border border-brand-border shadow-brand-sm">
        <div className="w-14 h-14 rounded-full bg-brand-navy/8 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-brand-navy text-2xl font-medium mb-2">
          Thank you!
        </h3>
        <p className="font-sans text-brand-muted text-sm leading-relaxed max-w-xs mx-auto">
          We&rsquo;ve received your message and will be in touch with you soon.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-ghost mt-6 text-sm"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Error banner */}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-brand">
          <p className="font-sans text-red-700 text-sm">
            Something went wrong. Please try again or email us directly.
          </p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="label-brand">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Tawanda Moyo"
          className={`input-brand ${errors.name ? 'border-red-400 focus:ring-red-300/40 focus:border-red-400' : ''}`}
        />
        {errors.name && (
          <p className="mt-1.5 font-sans text-red-500 text-xs">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-brand">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`input-brand ${errors.email ? 'border-red-400 focus:ring-red-300/40 focus:border-red-400' : ''}`}
        />
        {errors.email && (
          <p className="mt-1.5 font-sans text-red-500 text-xs">{errors.email}</p>
        )}
      </div>

      {/* Subject (optional) */}
      <div>
        <label htmlFor="subject" className="label-brand">
          Subject <span className="font-sans text-brand-muted font-normal text-xs">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Product enquiry, General question…"
          className="input-brand"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label-brand">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          className={`input-brand resize-none ${errors.message ? 'border-red-400 focus:ring-red-300/40 focus:border-red-400' : ''}`}
        />
        {errors.message && (
          <p className="mt-1.5 font-sans text-red-500 text-xs">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="btn-primary w-full"
      >
        {status === 'submitting' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Sending…
          </span>
        ) : (
          'Send Message'
        )}
      </button>

    </form>
  )
}
