// lib/verses.ts
import { supabase } from './supabase'
import type { DailyVerse } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapVerse(row: any): DailyVerse {
  return {
    id:             row.id,
    verseText:      row.verse_text,
    reference:      row.reference,
    translation:    row.translation ?? 'NIV',
    scheduledDate:  row.scheduled_date,
    reflectionNote: row.reflection_note ?? undefined,
    createdAt:      row.created_at,
  }
}

async function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Supabase timeout')), ms)
  )
  return Promise.race([promise, timeout])
}

export async function getTodaysVerse(): Promise<DailyVerse | null> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data: todayData, error: todayError } = await withTimeout(
      supabase
        .from('daily_verses')
        .select('*')
        .eq('scheduled_date', today)
        .single()
    )

    if (!todayError && todayData) return mapVerse(todayData)

    const { data: fallbackData, error: fallbackError } = await withTimeout(
      supabase
        .from('daily_verses')
        .select('*')
        .lte('scheduled_date', today)
        .order('scheduled_date', { ascending: false })
        .limit(1)
        .single()
    )

    if (fallbackError || !fallbackData) return null
    return mapVerse(fallbackData)
  } catch {
    return null
  }
}

export async function getVerseArchive(): Promise<DailyVerse[]> {
  try {
    const today = new Date().toISOString().split('T')[0]
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0]

    const { data, error } = await withTimeout(
      supabase
        .from('daily_verses')
        .select('*')
        .lte('scheduled_date', today)
        .gte('scheduled_date', fromDate)
        .order('scheduled_date', { ascending: false })
    )

    if (error) return []
    return (data ?? []).map(mapVerse)
  } catch {
    return []
  }
}
