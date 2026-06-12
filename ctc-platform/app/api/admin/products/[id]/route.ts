// app/api/admin/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSupabaseRoute } from '@/lib/supabase-server'
import { adminUpdateProduct, adminSoftDeleteProduct, adminUploadProductImage } from '@/lib/admin/products'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseRoute()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData  = await request.formData()
    const imageFile = formData.get('image') as File | null
    let imageUrl: string | undefined
    if (imageFile && imageFile.size > 0) {
      imageUrl = await adminUploadProductImage(imageFile, params.id)
    }

    const updated = await adminUpdateProduct(params.id, {
      name:        String(formData.get('name') ?? ''),
      description: String(formData.get('description') ?? ''),
      price:       parseFloat(String(formData.get('price') ?? '0')),
      currency:    String(formData.get('currency') ?? 'USD'),
      category:    String(formData.get('category') ?? 'other'),
      isAvailable: formData.get('isAvailable') === 'true',
      ...(imageUrl && { imageUrl }),
    })

    // Revalidate all affected pages
    revalidatePath('/shop')
    revalidatePath(`/shop/${updated.slug}`)
    revalidatePath('/')
    revalidatePath('/admin/products')

    return NextResponse.json({ data: updated })
  } catch (err) {
    console.error('PATCH /api/admin/products/[id]:', err)
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getSupabaseRoute()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await adminSoftDeleteProduct(params.id)

    // Revalidate shop so deleted product disappears immediately
    revalidatePath('/shop')
    revalidatePath('/')
    revalidatePath('/admin/products')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/admin/products/[id]:', err)
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}
