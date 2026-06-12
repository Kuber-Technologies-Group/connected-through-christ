// lib/admin/products.ts
import { getSupabaseAdmin } from '@/lib/supabase'

type ProductInput = {
  name: string; description: string; price: number; currency: string
  category: string; imageUrl: string; slug: string; isAvailable: boolean
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function adminGetAllProducts() {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('products').select('*').is('deleted_at', null).order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function adminGetProduct(id: string) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('products').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function adminCreateProduct(input: ProductInput) {
  const sb = getSupabaseAdmin()
  const slug = input.slug || slugify(input.name)
  const { data, error } = await sb.from('products').insert({
    name: input.name, description: input.description,
    price: input.price, currency: input.currency,
    category: input.category, image_url: input.imageUrl,
    slug, is_available: input.isAvailable,
  }).select().single()
  if (error) throw error
  return data
}

export async function adminUpdateProduct(id: string, input: Partial<ProductInput>) {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('products').update({
    ...(input.name        !== undefined && { name: input.name }),
    ...(input.description !== undefined && { description: input.description }),
    ...(input.price       !== undefined && { price: input.price }),
    ...(input.currency    !== undefined && { currency: input.currency }),
    ...(input.category    !== undefined && { category: input.category }),
    ...(input.imageUrl    !== undefined && { image_url: input.imageUrl }),
    ...(input.isAvailable !== undefined && { is_available: input.isAvailable }),
  }).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function adminSoftDeleteProduct(id: string) {
  const sb = getSupabaseAdmin()
  const { error } = await sb.from('products').update({ deleted_at: new Date().toISOString() }).eq('id', id)
  if (error) throw error
}

export async function adminUploadProductImage(file: File, productId: string): Promise<string> {
  const sb = getSupabaseAdmin()
  const ext = file.name.split('.').pop()
  const path = `products/${productId}-${Date.now()}.${ext}`
  const { error } = await sb.storage.from('ctc-media').upload(path, file, { upsert: true })
  if (error) throw error
  const { data } = sb.storage.from('ctc-media').getPublicUrl(path)
  return data.publicUrl
}
