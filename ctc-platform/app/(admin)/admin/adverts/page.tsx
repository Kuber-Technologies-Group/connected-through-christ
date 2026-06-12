import Link from 'next/link'
import { adminGetAllAdverts } from '@/lib/admin/adverts'

export default async function AdminAdvertsPage() {
  const adverts = await adminGetAllAdverts().catch(() => [])
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-brand-navy text-3xl font-medium">Advertisements</h1>
          <p className="font-sans text-brand-muted text-sm mt-1">{adverts.length} total adverts</p>
        </div>
        <Link href="/admin/adverts/new" className="btn-primary">+ Add Advert</Link>
      </div>
      <div className="bg-white rounded-brand-lg border border-brand-border overflow-hidden">
        {adverts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-brand-muted text-sm mb-4">No adverts yet.</p>
            <Link href="/admin/adverts/new" className="btn-primary">Add first advert</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-gray-50">
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Brand</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Placement</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Dates</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {adverts.map((a: { id: string; brand_name: string; placement: string; start_date: string | null; end_date: string | null; is_active: boolean }) => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-sans text-sm font-medium text-brand-charcoal">{a.brand_name}</td>
                  <td className="px-5 py-4"><span className="badge badge-navy capitalize">{a.placement}</span></td>
                  <td className="px-5 py-4 font-sans text-xs text-brand-muted">{a.start_date ?? '—'} → {a.end_date ?? '—'}</td>
                  <td className="px-5 py-4"><span className={`badge ${a.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{a.is_active ? 'Active' : 'Inactive'}</span></td>
                  <td className="px-5 py-4 text-right"><Link href={`/admin/adverts/${a.id}/edit`} className="font-sans text-brand-blue text-sm font-semibold hover:underline">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
