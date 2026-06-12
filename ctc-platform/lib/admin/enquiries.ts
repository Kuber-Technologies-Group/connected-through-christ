// lib/admin/enquiries.ts
import { getSupabaseAdmin } from '@/lib/supabase'

export async function adminGetAllEnquiries() {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('enquiries').select('*, products(name)').order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function adminGetEnquiry(id: string) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('enquiries').select('*, products(name)').eq('id', id).single()
  if (error) throw error
  return data
}

export async function adminUpdateEnquiryStatus(id: string, status: 'new' | 'read' | 'responded') {
  const sb = getSupabaseAdmin()
  const { error } = await sb.from('enquiries').update({ status }).eq('id', id)
  if (error) throw error
}
