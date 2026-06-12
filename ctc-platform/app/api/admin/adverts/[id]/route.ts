// app/api/admin/adverts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSupabaseRoute } from '@/lib/supabase-server'
import { adminUpdateAdvert, adminDeleteAdvert, adminUploadAdvertImage } from '@/lib/admin/adverts'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseRoute()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData  = await request.formData()
    const imageFile = formData.get('image') as File | null
    let imageUrl: string | undefined
    if (imageFile && imageFile.size > 0) imageUrl = await adminUploadAdvertImage(imageFile, params.id)

    const updated = await adminUpdateAdvert(params.id, {
      brandName: String(formData.get('brandName') ?? ''),
      imageUrl,
      linkUrl:   String(formData.get('linkUrl')   ?? ''),
      placement: String(formData.get('placement') ?? ''),
      isActive:  formData.get('isActive') === 'true',
      startDate: String(formData.get('startDate') ?? '') || undefined,
      endDate:   String(formData.get('endDate')   ?? '') || undefined,
    })

    revalidatePath('/')
    revalidatePath('/shop')
    revalidatePath('/admin/adverts')

    return NextResponse.json({ data: updated })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseRoute()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await adminDeleteAdvert(params.id)

    revalidatePath('/')
    revalidatePath('/shop')
    revalidatePath('/admin/adverts')

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
