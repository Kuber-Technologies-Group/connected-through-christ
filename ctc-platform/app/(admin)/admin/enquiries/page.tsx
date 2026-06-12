// app/admin/enquiries/page.tsx
import Link from 'next/link'
import { adminGetAllEnquiries } from '@/lib/admin/enquiries'

const STATUS_STYLES: Record<string, string> = {
  new:       'bg-amber-50 text-amber-700',
  read:      'bg-blue-50 text-blue-700',
  responded: 'bg-emerald-50 text-emerald-700',
}


export default async function AdminEnquiriesPage() {
  const enquiries = await adminGetAllEnquiries().catch(() => [])
  const newCount  = enquiries.filter((e: { status: string }) => e.status === 'new').length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-brand-navy text-3xl font-medium">Enquiries</h1>
          <p className="font-sans text-brand-muted text-sm mt-1">{newCount} unread · {enquiries.length} total</p>
        </div>
      </div>

      <div className="bg-white rounded-brand-lg border border-brand-border overflow-hidden">
        {enquiries.length === 0 ? (
          <div className="text-center py-16"><p className="font-sans text-brand-muted text-sm">No enquiries yet.</p></div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-gray-50">
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">From</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Subject</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Date</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {enquiries.map((e: { id: string; name: string; email: string; subject: string | null; created_at: string; status: string }) => (
                <tr key={e.id} className={`hover:bg-gray-50 transition-colors ${e.status === 'new' ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-5 py-4">
                    <p className="font-sans text-sm font-semibold text-brand-charcoal">{e.name}</p>
                    <p className="font-sans text-xs text-brand-muted">{e.email}</p>
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-brand-charcoal">{e.subject ?? <span className="text-brand-muted italic">No subject</span>}</td>
                  <td className="px-5 py-4 font-sans text-xs text-brand-muted">{new Date(e.created_at).toLocaleDateString('en-ZA')}</td>
                  <td className="px-5 py-4"><span className={`badge capitalize ${STATUS_STYLES[e.status] ?? ''}`}>{e.status}</span></td>
                  <td className="px-5 py-4 text-right"><Link href={`/admin/enquiries/${e.id}`} className="font-sans text-brand-blue text-sm font-semibold hover:underline">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
