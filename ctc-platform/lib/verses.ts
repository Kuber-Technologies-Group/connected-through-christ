// lib/verses.ts
import { supabase } from './supabase'
import type { DailyVerse } from '@/types'

type DbRow = { [key: string]: string | number | boolean | null | undefined }

function mapVerse(row: DbRow): DailyVerse {
  return {
    id:             String(row.id ?? ''),
    verseText:      String(row.verse_text ?? ''),
    reference:      String(row.reference ?? ''),
    translation:    row.translation ? String(row.translation) : 'NIV',
    scheduledDate:  String(row.scheduled_date ?? ''),
    reflectionNote: row.reflection_note ? String(row.reflection_note) : undefined,
    createdAt:      String(row.created_at ?? ''),
  }
}

function deadline(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms)
  )
}

export async function getTodaysVerse(): Promise<DailyVerse | null> {
  try {
    const today = new Date().toISOString().split('T')[0]

    const { data: todayData, error: todayError } = await Promise.race([
      supabase.from('daily_verses').select('*').eq('scheduled_date', today).single(),
      deadline(5000),
    ])
    if (!todayError && todayData) return mapVerse(todayData as DbRow)

    const { data: fallback, error: fallbackError } = await Promise.race([
      supabase.from('daily_verses').select('*').lte('scheduled_date', today).order('scheduled_date', { ascending: false }).limit(1).single(),
      deadline(5000),
    ])
    if (fallbackError || !fallback) return null
    return mapVerse(fallback as DbRow)
  } catch { return null }
}

export async function getVerseArchive(): Promise<DailyVerse[]> {
  try {
    const today = new Date().toISOString().split('T')[0]
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0]

    const { data, error } = await Promise.race([
      supabase.from('daily_verses').select('*').lte('scheduled_date', today).gte('scheduled_date', fromDate).order('scheduled_date', { ascending: false }),
      deadline(5000),
    ])
    if (error) return []
    return (data ?? []).map((row) => mapVerse(row as DbRow))
  } catch { return [] }
}
