// lib/products.ts
import { supabase } from './supabase'
import type { Product, ProductCategory } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapProduct(row: any): Product {
  return {
    id:          row.id,
    name:        row.name,
    description: row.description ?? '',
    price:       Number(row.price),
    currency:    row.currency ?? 'USD',
    category:    row.category,
    imageUrl:    row.image_url ?? '',
    slug:        row.slug,
    isAvailable: row.is_available,
    createdAt:   row.created_at,
    updatedAt:   row.updated_at,
  }
}

// Wrap any Supabase call with a timeout so the page doesn't hang
async function withTimeout<T>(promise: Promise<T>, ms = 5000): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Supabase timeout')), ms)
  )
  return Promise.race([promise, timeout])
}

export async function getAvailableProducts(): Promise<Product[]> {
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false })
    )
    if (error) return []
    return (data ?? []).map(mapProduct)
  } catch {
    return []
  }
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .eq('category', category)
        .order('created_at', { ascending: false })
    )
    if (error) return []
    return (data ?? []).map(mapProduct)
  } catch {
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('is_available', true)
        .single()
    )
    if (error) return null
    return mapProduct(data)
  } catch {
    return null
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false })
        .limit(4)
    )
    if (error) return []
    return (data ?? []).map(mapProduct)
  } catch {
    return []
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const { data, error } = await withTimeout(
      supabase
        .from('products')
        .select('slug')
        .eq('is_available', true)
    )
    if (error) return []
    return (data ?? []).map((row) => row.slug)
  } catch {
    return []
  }
}
