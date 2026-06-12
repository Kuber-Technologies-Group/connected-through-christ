// app/api/admin/enquiries/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSupabaseRoute } from '@/lib/supabase-server'
import { adminUpdateEnquiryStatus } from '@/lib/admin/enquiries'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseRoute()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { status } = await request.json()
    if (!['new', 'read', 'responded'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await adminUpdateEnquiryStatus(params.id, status)

    revalidatePath('/admin/enquiries')
    revalidatePath(`/admin/enquiries/${params.id}`)

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
