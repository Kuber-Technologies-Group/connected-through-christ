// app/daily-verse/page.tsx
import type { Metadata } from 'next'
import { getTodaysVerse, getVerseArchive } from '@/lib/verses'
import { VerseDisplay } from '@/components/VerseDisplay'

export const metadata: Metadata = {
  title: 'Daily Verse',
  description: 'A new Bible verse every day — plus an archive of the last 30 days of Scripture from Connected Through Christ.',
}

export const revalidate = 3600

export default async function DailyVersePage() {
  const [todayVerse, archive] = await Promise.all([
    getTodaysVerse().catch(() => null),
    getVerseArchive().catch(() => []),
  ])

  // Remove today from archive list to avoid duplication
  const archiveWithoutToday = todayVerse
    ? archive.filter(v => v.id !== todayVerse.id)
    : archive

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="bg-brand-gradient py-14 md:py-20">
        <div className="container-brand">
          <p className="section-label text-brand-blue-light mb-2">Scripture for every day</p>
          <h1 className="font-display text-white font-medium text-display-lg">
            Daily Verse
          </h1>
          <p className="font-sans text-white/60 text-sm mt-3 max-w-md">
            Start each day in the Word. A new verse, every day, from the CTC team.
          </p>
        </div>
      </div>

      <div className="container-brand py-12 md:py-16">
        <div className="max-w-3xl mx-auto">

          {/* ── Today's Verse ── */}
          {todayVerse ? (
            <>
              <p className="section-label mb-3">Today</p>
              <VerseDisplay verse={todayVerse} variant="hero" />
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-brand-lg border border-brand-border">
              <p className="font-display text-brand-navy text-xl font-medium mb-2">
                No verse scheduled for today
              </p>
              <p className="font-sans text-brand-muted text-sm">
                Check back later — or browse the recent archive below.
              </p>
            </div>
          )}

          {/* ── Archive ── */}
          {archiveWithoutToday.length > 0 && (
            <div className="mt-14">
              <div className="flex items-center gap-4 mb-6">
                <p className="section-label">Recent verses</p>
                <div className="flex-1 h-px bg-brand-border" />
              </div>

              <div className="bg-white rounded-brand-lg border border-brand-border px-6 divide-y divide-brand-border">
                {archiveWithoutToday.map(verse => (
                  <VerseDisplay key={verse.id} verse={verse} variant="archive" />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
