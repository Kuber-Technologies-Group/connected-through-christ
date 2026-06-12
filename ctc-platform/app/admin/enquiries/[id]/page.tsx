// app/admin/enquiries/[id]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { adminGetEnquiry } from '@/lib/admin/enquiries'
import { EnquiryActions } from '@/components/admin/EnquiryActions'


export default async function EnquiryDetailPage({ params }: { params: { id: string } }) {
  const enquiry = await adminGetEnquiry(params.id).catch(() => null)
  if (!enquiry) notFound()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/enquiries" className="font-sans text-brand-muted text-sm hover:text-brand-navy mb-2 inline-block">← Back to Enquiries</Link>
        <h1 className="font-display text-brand-navy text-3xl font-medium">Enquiry</h1>
        <p className="font-sans text-brand-muted text-sm mt-1">Received {new Date(enquiry.created_at).toLocaleString('en-ZA')}</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Sender info */}
        <div className="bg-white rounded-brand-lg border border-brand-border p-6">
          <h2 className="font-sans text-xs font-bold text-brand-muted tracking-wider uppercase mb-4">From</h2>
          <div className="space-y-2">
            <p className="font-sans text-sm"><span className="font-semibold text-brand-charcoal w-20 inline-block">Name:</span> {enquiry.name}</p>
            <p className="font-sans text-sm"><span className="font-semibold text-brand-charcoal w-20 inline-block">Email:</span><a href={`mailto:${enquiry.email}`} className="text-brand-blue hover:underline ml-1">{enquiry.email}</a></p>
            {enquiry.subject && <p className="font-sans text-sm"><span className="font-semibold text-brand-charcoal w-20 inline-block">Subject:</span> {enquiry.subject}</p>}
            {enquiry.products && <p className="font-sans text-sm"><span className="font-semibold text-brand-charcoal w-20 inline-block">Product:</span> {enquiry.products.name}</p>}
          </div>
        </div>

        {/* Message */}
        <div className="bg-white rounded-brand-lg border border-brand-border p-6">
          <h2 className="font-sans text-xs font-bold text-brand-muted tracking-wider uppercase mb-4">Message</h2>
          <p className="font-sans text-sm text-brand-charcoal leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
        </div>

        {/* Actions */}
        <EnquiryActions enquiryId={enquiry.id} currentStatus={enquiry.status} email={enquiry.email} />
      </div>
    </div>
  )
}
