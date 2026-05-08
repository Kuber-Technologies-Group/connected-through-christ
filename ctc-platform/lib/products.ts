// lib/products.ts
import { supabase } from './supabase'
import type { Product, ProductCategory } from '@/types'

type DbRow = { [key: string]: string | number | boolean | null | undefined }

function mapProduct(row: DbRow): Product {
  return {
    id:          String(row.id ?? ''),
    name:        String(row.name ?? ''),
    description: row.description ? String(row.description) : '',
    price:       Number(row.price),
    currency:    row.currency ? String(row.currency) : 'USD',
    category:    row.category as Product['category'],
    imageUrl:    row.image_url ? String(row.image_url) : '',
    slug:        String(row.slug ?? ''),
    isAvailable: Boolean(row.is_available),
    createdAt:   String(row.created_at ?? ''),
    updatedAt:   String(row.updated_at ?? ''),
  }
}

function deadline(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms)
  )
}

export async function getAvailableProducts(): Promise<Product[]> {
  try {
    const { data, error } = await Promise.race([
      supabase.from('products').select('*').eq('is_available', true).order('created_at', { ascending: false }),
      deadline(5000),
    ])
    if (error) return []
    return (data ?? []).map((row) => mapProduct(row as DbRow))
  } catch { return [] }
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  try {
    const { data, error } = await Promise.race([
      supabase.from('products').select('*').eq('is_available', true).eq('category', category).order('created_at', { ascending: false }),
      deadline(5000),
    ])
    if (error) return []
    return (data ?? []).map((row) => mapProduct(row as DbRow))
  } catch { return [] }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await Promise.race([
      supabase.from('products').select('*').eq('slug', slug).eq('is_available', true).single(),
      deadline(5000),
    ])
    if (error || !data) return null
    return mapProduct(data as DbRow)
  } catch { return null }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await Promise.race([
      supabase.from('products').select('*').eq('is_available', true).order('created_at', { ascending: false }).limit(4),
      deadline(5000),
    ])
    if (error) return []
    return (data ?? []).map((row) => mapProduct(row as DbRow))
  } catch { return [] }
}

export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const { data, error } = await Promise.race([
      supabase.from('products').select('slug').eq('is_available', true),
      deadline(5000),
    ])
    if (error) return []
    return (data ?? []).map((row) => String((row as DbRow).slug))
  } catch { return [] }
}
