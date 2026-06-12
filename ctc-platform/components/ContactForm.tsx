// components/ContactForm.tsx
'use client'

import { useState } from 'react'
import type { EnquiryFormData } from '@/types'

interface ContactFormProps {
  prefillProductName?: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

// ── WhatsApp config ───────────────────────────────────────────────────────────
// Add your two numbers here in international format (no + or spaces)
const WHATSAPP_NUMBERS = [
  '263779146262',  // Number 1 — replace with real CTC number
  '263717683861',  // Number 2 — replace with real CTC number
]

function pickRandomNumber(): string {
  return WHATSAPP_NUMBERS[Math.floor(Math.random() * WHATSAPP_NUMBERS.length)]
}

function buildWhatsAppUrl(formData: EnquiryFormData): string {
  const number = pickRandomNumber()

  const lines = [
    `*New Enquiry — Connected Through Christ*`,
    ``,
    `*From:* ${formData.name}`,
    `*Email:* ${formData.email}`,
    formData.subject ? `*Subject:* ${formData.subject}` : null,
    ``,
    `*Message:*`,
    formData.message,
    ``,
    `_Sent via connectedthroughchrist.co.zw_`,
  ]
    .filter((l) => l !== null)
    .join('\n')

  const encoded = encodeURIComponent(lines)
  return `https://api.whatsapp.com/send/?phone=${number}&text=${encoded}&type=phone_number&app_absent=0`
}

// ─────────────────────────────────────────────────────────────────────────────

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
  const [errors,       setErrors]       = useState<FormErrors>({})
  const [status,       setStatus]       = useState<FormStatus>('idle')
  const [whatsappUrl,  setWhatsappUrl]  = useState<string>('')
  const [savedFormData, setSavedFormData] = useState<EnquiryFormData | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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

      // Build the WhatsApp URL with the submitted data before clearing the form
      setWhatsappUrl(buildWhatsAppUrl(formData))
      setSavedFormData(formData)
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  // ── Success state: prompt user to send via WhatsApp ──────────────────────
  if (status === 'success' && savedFormData) {
    return (
      <div className="bg-white rounded-brand-lg border border-brand-border shadow-brand-sm overflow-hidden">

        {/* Top confirmation bar */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <div>
            <p className="font-sans text-emerald-800 text-sm font-semibold">Enquiry saved successfully</p>
            <p className="font-sans text-emerald-600 text-xs">Now send it to our team via WhatsApp below</p>
          </div>
        </div>

        {/* Message preview */}
        <div className="px-6 pt-5 pb-4">
          <p className="font-sans text-brand-charcoal text-xs font-bold tracking-[0.15em] uppercase mb-3">
            Your message preview
          </p>
          <div className="bg-gray-50 rounded-brand border border-brand-border p-4 font-sans text-sm text-brand-charcoal leading-relaxed whitespace-pre-wrap">
            <span className="font-bold">New Enquiry — Connected Through Christ</span>
            {'\n\n'}
            <span className="font-semibold">From:</span> {savedFormData.name}{'\n'}
            <span className="font-semibold">Email:</span> {savedFormData.email}{'\n'}
            {savedFormData.subject && (
              <><span className="font-semibold">Subject:</span> {savedFormData.subject}{'\n'}</>
            )}
            {'\n'}
            <span className="font-semibold">Message:</span>{'\n'}
            {savedFormData.message}
            {'\n\n'}
            <span className="text-brand-muted text-xs italic">Sent via connectedthroughchrist.com</span>
          </div>
        </div>

        {/* WhatsApp send button */}
        <div className="px-6 pb-6 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-brand font-sans font-bold text-sm text-white transition-colors duration-200"
            style={{ backgroundColor: '#25D366' }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#1ebe5d')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#25D366')}
          >
            {/* WhatsApp icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.134.558 4.136 1.535 5.874L.057 23.215a.75.75 0 00.916.916l5.34-1.478A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.505-5.243-1.387l-.375-.217-3.882 1.075 1.074-3.882-.217-.375A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Open WhatsApp &amp; Send
          </a>

          <p className="font-sans text-brand-muted text-xs text-center leading-relaxed">
            WhatsApp will open with your message ready. Review it, then tap <strong>Send</strong>.
          </p>

          <button
            onClick={() => { setStatus('idle'); setSavedFormData(null) }}
            className="w-full font-sans text-brand-muted text-xs hover:text-brand-navy transition-colors py-1"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-brand">
          <p className="font-sans text-red-700 text-sm">
            Something went wrong. Please try again or contact us directly on WhatsApp.
          </p>
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="label-brand">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name" name="name" type="text" autoComplete="name"
          value={formData.name} onChange={handleChange}
          placeholder="e.g. Tawanda Moyo"
          className={`input-brand ${errors.name ? 'border-red-400 focus:border-red-400' : ''}`}
        />
        {errors.name && <p className="mt-1.5 font-sans text-red-500 text-xs">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="label-brand">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="email" name="email" type="email" autoComplete="email"
          value={formData.email} onChange={handleChange}
          placeholder="you@example.com"
          className={`input-brand ${errors.email ? 'border-red-400 focus:border-red-400' : ''}`}
        />
        {errors.email && <p className="mt-1.5 font-sans text-red-500 text-xs">{errors.email}</p>}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="label-brand">
          Subject <span className="font-sans text-brand-muted font-normal text-xs">(optional)</span>
        </label>
        <input
          id="subject" name="subject" type="text"
          value={formData.subject} onChange={handleChange}
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
          id="message" name="message" rows={5}
          value={formData.message} onChange={handleChange}
          placeholder="How can we help you?"
          className={`input-brand resize-none ${errors.message ? 'border-red-400 focus:border-red-400' : ''}`}
        />
        {errors.message && <p className="mt-1.5 font-sans text-red-500 text-xs">{errors.message}</p>}
      </div>

      {/* Submit */}
      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        {status === 'submitting' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Saving…
          </span>
        ) : (
          'Continue to WhatsApp'
        )}
      </button>

      <p className="font-sans text-brand-muted text-xs text-center">
        Your message will be saved, then you&rsquo;ll send it to us via WhatsApp.
      </p>

    </form>
  )
}
