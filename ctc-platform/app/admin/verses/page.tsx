// app/admin/verses/page.tsx
import Link from 'next/link'
import { adminGetAllVerses } from '@/lib/admin/verses'


export default async function AdminVersesPage() {
  const verses = await adminGetAllVerses().catch(() => [])
  const today  = new Date().toISOString().split('T')[0]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-brand-navy text-3xl font-medium">Daily Verses</h1>
          <p className="font-sans text-brand-muted text-sm mt-1">{verses.length} verses scheduled</p>
        </div>
        <Link href="/admin/verses/new" className="btn-primary">+ Schedule Verse</Link>
      </div>

      <div className="bg-white rounded-brand-lg border border-brand-border overflow-hidden">
        {verses.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-brand-muted text-sm mb-4">No verses scheduled yet.</p>
            <Link href="/admin/verses/new" className="btn-primary">Schedule the first verse</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-gray-50">
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Date</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Reference</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Translation</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Preview</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {verses.map((v: { id: string; scheduled_date: string; reference: string; translation: string; verse_text: string }) => {
                const isToday = v.scheduled_date === today
                const isPast  = v.scheduled_date < today
                const isScheduled = v.scheduled_date >= today
                
                return (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-sm font-medium text-brand-charcoal">{v.scheduled_date}</span>
                        {isToday && <span className="badge bg-brand-blue/10 text-brand-blue">Today</span>}
                        {isPast && !isToday && <span className="badge bg-gray-100 text-gray-500">Past</span>}
                        {isScheduled && !isToday && !isPast && <span className="badge bg-green-100 text-green-500">Scheduled</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 font-sans text-sm text-brand-charcoal font-medium">{v.reference}</td>
                    <td className="px-5 py-4"><span className="badge badge-navy">{v.translation}</span></td>
                    <td className="px-5 py-4 font-sans text-sm text-brand-muted max-w-xs truncate">{v.verse_text}</td>
                    <td className="px-5 py-4 text-right">
                      <Link href={`/admin/verses/${v.id}/edit`} className="font-sans text-brand-blue text-sm font-semibold hover:underline">Edit</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
