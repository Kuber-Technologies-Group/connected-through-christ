// lib/supabase-server.ts
// Server-side Supabase client helpers using auth-helpers for cookie-based sessions

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// Use in Server Components (pages, layouts)
export function getSupabaseServer() {
  return createServerComponentClient({ cookies })
}

// Use in API Route Handlers
export function getSupabaseRoute() {
  return createRouteHandlerClient({ cookies })
}
