// app/api/admin/adverts/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSupabaseRoute } from '@/lib/supabase-server'
import { adminCreateAdvert, adminUploadAdvertImage } from '@/lib/admin/adverts'

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseRoute()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData  = await request.formData()
    const imageFile = formData.get('image') as File | null
    const tempId    = crypto.randomUUID()
    let imageUrl    = ''
    if (imageFile && imageFile.size > 0) imageUrl = await adminUploadAdvertImage(imageFile, tempId)

    const advert = await adminCreateAdvert({
      brandName: String(formData.get('brandName') ?? ''),
      imageUrl,
      linkUrl:   String(formData.get('linkUrl') ?? ''),
      placement: String(formData.get('placement') ?? 'homepage'),
      isActive:  formData.get('isActive') === 'true',
      startDate: String(formData.get('startDate') ?? '') || undefined,
      endDate:   String(formData.get('endDate')   ?? '') || undefined,
    })

    revalidatePath('/')
    revalidatePath('/shop')
    revalidatePath('/admin/adverts')

    return NextResponse.json({ data: advert }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed' }, { status: 500 })
  }
}
