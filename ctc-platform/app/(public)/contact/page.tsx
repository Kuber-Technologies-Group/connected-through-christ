// app/contact/page.tsx
import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Connected Through Christ team — for product enquiries, faith questions, or general conversation.',
}

interface PageProps {
  searchParams: { subject?: string }
}

export default function ContactPage({ searchParams }: PageProps) {
  // Product detail page passes the product name as ?subject=Enquiry about: ...
  const prefillSubject = searchParams.subject
    ? decodeURIComponent(searchParams.subject)
    : undefined

  // Extract product name from subject if it's a product enquiry
  const prefillProductName = prefillSubject?.startsWith('Enquiry about: ')
    ? prefillSubject.replace('Enquiry about: ', '')
    : undefined

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="bg-brand-gradient py-14 md:py-20">
        <div className="container-brand">
          <p className="section-label text-brand-blue-light mb-2">We&rsquo;d love to hear from you</p>
          <h1 className="font-display text-white font-medium text-display-lg">
            Get in Touch
          </h1>
          <p className="font-sans text-white/60 text-sm mt-3 max-w-md">
            Whether you have a product enquiry, a faith question, or just want to connect — our team is here.
          </p>
        </div>
      </div>

      <div className="container-brand py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 max-w-5xl mx-auto">

          {/* ── Left: Info ── */}
          <div className="md:col-span-2">
            <h2 className="font-display text-brand-navy text-display-sm font-medium mb-4">
              How we can help
            </h2>
            <p className="font-sans text-brand-muted text-sm leading-relaxed mb-8">
              Send us a message using the form and we&rsquo;ll respond as soon as possible — usually within 24–48 hours.
            </p>

            {/* Contact info blocks */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-navy/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-brand-charcoal text-sm font-semibold">Email</p>
                  <p className="font-sans text-brand-muted text-sm">info@connectedthroughchrist.co.zw</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-navy/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-brand-charcoal text-sm font-semibold">Phone</p>
                  <p className="font-sans text-brand-muted text-sm">+263 778 915 232</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-navy/8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-sans text-brand-charcoal text-sm font-semibold">Response time</p>
                  <p className="font-sans text-brand-muted text-sm">Within 24–48 hours</p>
                </div>
              </div>
            </div>

            {/* Scripture accent */}
            <div className="mt-10 p-5 bg-brand-cream rounded-brand-lg border border-brand-border">
              <p className="font-scripture italic text-brand-navy text-sm leading-relaxed">
                &ldquo;Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.&rdquo;
              </p>
              <p className="font-sans text-brand-blue text-xs font-semibold mt-2">
                — Matthew 7:7, NIV
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="md:col-span-3">
            {prefillProductName && (
              <div className="mb-6 p-4 bg-brand-navy/5 rounded-brand border border-brand-navy/10">
                <p className="font-sans text-brand-navy text-sm">
                  <span className="font-semibold">Enquiring about:</span> {prefillProductName}
                </p>
              </div>
            )}
            <ContactForm prefillProductName={prefillProductName} />
          </div>

        </div>
      </div>
    </div>
  )
}
