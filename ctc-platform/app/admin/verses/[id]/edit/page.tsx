import Link from 'next/link'
import { notFound } from 'next/navigation'
import { adminGetVerse } from '@/lib/admin/verses'
import { VerseForm } from '@/components/admin/VerseForm'

export default async function EditVersePage({ params }: { params: { id: string } }) {
  const verse = await adminGetVerse(params.id).catch(() => null)
  if (!verse) notFound()
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/verses" className="font-sans text-brand-muted text-sm hover:text-brand-navy mb-2 inline-block">← Back to Verses</Link>
        <h1 className="font-display text-brand-navy text-3xl font-medium">Edit Verse</h1>
        <p className="font-sans text-brand-muted text-sm mt-1">{verse.reference} — {verse.scheduled_date}</p>
      </div>
      <div className="bg-white rounded-brand-lg border border-brand-border p-8">
        <VerseForm mode="edit" verseId={verse.id} initial={{ verseText: verse.verse_text, reference: verse.reference, translation: verse.translation, scheduledDate: verse.scheduled_date, reflectionNote: verse.reflection_note ?? '' }} />
      </div>
    </div>
  )
}
