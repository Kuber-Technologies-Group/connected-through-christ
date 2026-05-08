// components/VerseDisplay.tsx
import type { DailyVerse } from '@/types'

interface VerseDisplayProps {
  verse: DailyVerse
  variant?: 'hero' | 'card' | 'archive'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00') // prevent timezone shift
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ── Hero variant: large, centred, used on the Daily Verse page ─────────────
function VerseHero({ verse }: { verse: DailyVerse }) {
  return (
    <div className="bg-brand-gradient rounded-brand-lg p-8 md:p-12 text-center">
      <p className="font-sans text-brand-blue-light text-xs font-bold tracking-[0.2em] uppercase mb-6">
        {formatDate(verse.scheduledDate)}
      </p>
      <blockquote className="verse-text text-white text-2xl md:text-3xl leading-relaxed mb-6 not-italic">
        &ldquo;{verse.verseText}&rdquo;
      </blockquote>
      <p className="verse-reference text-brand-blue-light text-lg">
        — {verse.reference}
        <span className="font-sans text-white/40 text-sm font-normal ml-2">
          ({verse.translation})
        </span>
      </p>
      {verse.reflectionNote && (
        <div className="mt-8 pt-8 border-t border-white/15 max-w-2xl mx-auto">
          <p className="font-sans text-white/50 text-xs font-bold tracking-[0.15em] uppercase mb-3">
            Reflection
          </p>
          <p className="font-sans text-white/80 text-sm leading-relaxed">
            {verse.reflectionNote}
          </p>
        </div>
      )}
    </div>
  )
}

// ── Card variant: used on the homepage ────────────────────────────────────
function VerseCard({ verse }: { verse: DailyVerse }) {
  return (
    <div className="relative overflow-hidden bg-white rounded-brand-lg border border-brand-border shadow-brand-sm p-6 md:p-8">
      {/* Decorative accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-gradient rounded-l-brand-lg" />

      <div className="pl-4">
        <p className="section-label mb-4">Today&rsquo;s Verse</p>
        <blockquote className="verse-text text-xl md:text-2xl mb-4">
          &ldquo;{verse.verseText}&rdquo;
        </blockquote>
        <p className="verse-reference">
          — {verse.reference}
          <span className="font-sans text-brand-muted text-sm font-normal ml-2">
            {verse.translation}
          </span>
        </p>
        {verse.reflectionNote && (
          <p className="font-sans text-brand-muted text-sm leading-relaxed mt-4 border-t border-brand-border pt-4">
            {verse.reflectionNote}
          </p>
        )}
      </div>
    </div>
  )
}

// ── Archive variant: compact, used in the 30-day list ─────────────────────
function VerseArchive({ verse }: { verse: DailyVerse }) {
  return (
    <div className="flex gap-4 py-4 border-b border-brand-border last:border-0">
      {/* Date stamp */}
      <div className="flex-shrink-0 text-center w-12">
        <p className="font-display text-brand-navy font-semibold text-lg leading-none">
          {new Date(verse.scheduledDate + 'T00:00:00').getDate()}
        </p>
        <p className="font-sans text-brand-muted text-[10px] uppercase tracking-wider">
          {new Date(verse.scheduledDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}
        </p>
      </div>
      {/* Verse preview */}
      <div className="flex-1 min-w-0">
        <p className="font-scripture italic text-brand-charcoal text-sm leading-relaxed line-clamp-2">
          &ldquo;{verse.verseText}&rdquo;
        </p>
        <p className="font-sans text-brand-blue text-xs font-semibold mt-1">
          {verse.reference} · {verse.translation}
        </p>
      </div>
    </div>
  )
}

// ── Main export: renders the right variant ─────────────────────────────────
export function VerseDisplay({ verse, variant = 'card' }: VerseDisplayProps) {
  if (variant === 'hero')    return <VerseHero    verse={verse} />
  if (variant === 'archive') return <VerseArchive verse={verse} />
  return <VerseCard verse={verse} />
}
