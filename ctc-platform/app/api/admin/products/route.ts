// app/api/admin/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getSupabaseRoute } from '@/lib/supabase-server'
import { adminCreateProduct, adminUploadProductImage } from '@/lib/admin/products'

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseRoute()
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData    = await request.formData()
    const name        = String(formData.get('name') ?? '')
    const description = String(formData.get('description') ?? '')
    const price       = parseFloat(String(formData.get('price') ?? '0'))
    const currency    = String(formData.get('currency') ?? 'USD')
    const category    = String(formData.get('category') ?? 'other')
    const isAvailable = formData.get('isAvailable') === 'true'
    const imageFile   = formData.get('image') as File | null

    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

    const product = await adminCreateProduct({ name, description, price, currency, category, imageUrl: '', slug: '', isAvailable })

    if (imageFile && imageFile.size > 0) {
      const imageUrl = await adminUploadProductImage(imageFile, product.id)
      const { getSupabaseAdmin } = await import('@/lib/supabase')
      await getSupabaseAdmin().from('products').update({ image_url: imageUrl }).eq('id', product.id)
    }

    // Revalidate public shop pages so new product appears immediately
    revalidatePath('/shop')
    revalidatePath('/')
    revalidatePath('/admin/products')

    return NextResponse.json({ data: product }, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/products:', err)
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to create product' }, { status: 500 })
  }
}
