// lib/admin/verses.ts
import { getSupabaseAdmin } from '@/lib/supabase'

type VerseInput = {
  verseText: string; reference: string; translation: string
  scheduledDate: string; reflectionNote?: string
}

export async function adminGetAllVerses() {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('daily_verses').select('*').order('scheduled_date', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function adminGetVerse(id: string) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('daily_verses').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function adminCreateVerse(input: VerseInput) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('daily_verses').insert({
    verse_text: input.verseText, reference: input.reference,
    translation: input.translation, scheduled_date: input.scheduledDate,
    reflection_note: input.reflectionNote || null,
  }).select().single()
  if (error) throw error
  return data
}

export async function adminUpdateVerse(id: string, input: Partial<VerseInput>) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('daily_verses').update({
    ...(input.verseText      !== undefined && { verse_text: input.verseText }),
    ...(input.reference      !== undefined && { reference: input.reference }),
    ...(input.translation    !== undefined && { translation: input.translation }),
    ...(input.scheduledDate  !== undefined && { scheduled_date: input.scheduledDate }),
    ...(input.reflectionNote !== undefined && { reflection_note: input.reflectionNote || null }),
  }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function adminDeleteVerse(id: string) {
  const sb = getSupabaseAdmin()
  const { error } = await sb.from('daily_verses').delete().eq('id', id)
  if (error) throw error
}
