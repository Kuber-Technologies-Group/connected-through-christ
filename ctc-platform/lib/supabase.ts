// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl     = process.env.NEXT_PUBLIC_SUPABASE_URL     ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('[CTC] Supabase env vars not set — database features will return empty data until connected.')
}

// Public client (anon key) — safe in browser, respects RLS
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder'
)

// Admin client (service role) — SERVER-SIDE ONLY, bypasses RLS
export function getSupabaseAdmin() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL

  if (!url) throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL — add it to your Vercel environment variables.'
  )
  if (!serviceRoleKey) throw new Error(
    'Missing SUPABASE_SERVICE_ROLE_KEY — add it to your Vercel environment variables.'
  )

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
