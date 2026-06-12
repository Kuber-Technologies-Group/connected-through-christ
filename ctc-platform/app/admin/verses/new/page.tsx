import Link from 'next/link'
import { VerseForm } from '@/components/admin/VerseForm'
export default function NewVersePage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/verses" className="font-sans text-brand-muted text-sm hover:text-brand-navy mb-2 inline-block">← Back to Verses</Link>
        <h1 className="font-display text-brand-navy text-3xl font-medium">Schedule Verse</h1>
      </div>
      <div className="bg-white rounded-brand-lg border border-brand-border p-8"><VerseForm mode="create" /></div>
    </div>
  )
}
