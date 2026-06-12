// app/api/admin/verses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSupabaseRoute } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseRoute()
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError) return NextResponse.json({ error: 'Auth error' }, { status: 401 })
    if (!session)     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    const { verseText, reference, translation, scheduledDate, reflectionNote } = body

    if (!verseText?.trim())     return NextResponse.json({ error: 'Verse text is required.' },    { status: 400 })
    if (!reference?.trim())     return NextResponse.json({ error: 'Reference is required.' },      { status: 400 })
    if (!scheduledDate?.trim()) return NextResponse.json({ error: 'Scheduled date is required.' }, { status: 400 })

    const { getSupabaseAdmin } = await import('@/lib/supabase')
    const sb = getSupabaseAdmin()

    const { data, error } = await sb
      .from('daily_verses')
      .insert({
        verse_text:      verseText.trim(),
        reference:       reference.trim(),
        translation:     (translation ?? 'NIV').trim(),
        scheduled_date:  scheduledDate.trim(),
        reflection_note: reflectionNote?.trim() || null,
      })
      .select()
      .single()

    if (error) {
      console.error('POST /api/admin/verses — DB error:', JSON.stringify(error))
      const isDupe = error.code === '23505' || error.message?.includes('unique')
      return NextResponse.json(
        { error: isDupe ? 'A verse is already scheduled for that date.' : `Database error: ${error.message}` },
        { status: isDupe ? 409 : 500 }
      )
    }

    // Revalidate public verse pages so new verse appears immediately
    revalidatePath('/daily-verse')
    revalidatePath('/')
    revalidatePath('/admin/verses')

    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('POST /api/admin/verses — unexpected error:', msg)
    return NextResponse.json({ error: msg || 'Failed to create verse' }, { status: 500 })
  }
}
