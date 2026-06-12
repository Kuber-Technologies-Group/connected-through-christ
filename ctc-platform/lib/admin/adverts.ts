// lib/admin/adverts.ts
import { getSupabaseAdmin } from '@/lib/supabase'

type AdvertInput = {
  brandName: string; imageUrl: string; linkUrl: string; placement: string
  isActive: boolean; startDate?: string; endDate?: string
}

export async function adminGetAllAdverts() {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('advertisements').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function adminGetAdvert(id: string) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('advertisements').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function adminCreateAdvert(input: AdvertInput) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('advertisements').insert({
    brand_name: input.brandName, image_url: input.imageUrl,
    link_url: input.linkUrl, placement: input.placement,
    is_active: input.isActive,
    start_date: input.startDate || null, end_date: input.endDate || null,
  }).select().single()
  if (error) throw error
  return data
}

export async function adminUpdateAdvert(id: string, input: Partial<AdvertInput>) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('advertisements').update({
    ...(input.brandName  !== undefined && { brand_name: input.brandName }),
    ...(input.imageUrl   !== undefined && { image_url: input.imageUrl }),
    ...(input.linkUrl    !== undefined && { link_url: input.linkUrl }),
    ...(input.placement  !== undefined && { placement: input.placement }),
    ...(input.isActive   !== undefined && { is_active: input.isActive }),
    ...(input.startDate  !== undefined && { start_date: input.startDate || null }),
    ...(input.endDate    !== undefined && { end_date: input.endDate || null }),
  }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function adminDeleteAdvert(id: string) {
  const sb = getSupabaseAdmin()
  const { error } = await sb.from('advertisements').delete().eq('id', id)
  if (error) throw error
}

export async function adminUploadAdvertImage(file: File, advertId: string): Promise<string> {
  const sb = getSupabaseAdmin()
  const ext = file.name.split('.').pop()
  const path = `adverts/${advertId}-${Date.now()}.${ext}`
  const { error } = await sb.storage.from('ctc-media').upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = sb.storage.from('ctc-media').getPublicUrl(path)
  return data.publicUrl
}
