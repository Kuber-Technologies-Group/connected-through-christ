// app/shop/ShopClient.tsx
'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import type { Product, ProductCategory } from '@/types'

interface ShopClientProps {
  products: Product[]
}

type FilterCategory = 'all' | ProductCategory

const FILTER_TABS: { value: FilterCategory; label: string }[] = [
  { value: 'all',       label: 'All' },
  { value: 'bible',     label: 'Bibles' },
  { value: 'book',      label: 'Books' },
  { value: 'clothing',  label: 'Clothing' },
  { value: 'accessory', label: 'Accessories' },
  { value: 'other',     label: 'Other' },
]

export function ShopClient({ products }: ShopClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  const filtered = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter)

  return (
    <>
      {/* ── Category Filter Tabs ── */}
      <div className="flex gap-2 flex-wrap mb-10">
        {FILTER_TABS.map(({ value, label }) => {
          // Don't show 'Other' tab if there are no products in that category
          if (value !== 'all' && value !== activeFilter) {
            const hasProducts = products.some(p => p.category === value)
            if (!hasProducts && value === 'other') return null
          }

          const isActive = activeFilter === value
          return (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={`px-5 py-2 rounded-full font-sans text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? 'bg-brand-navy text-white shadow-brand-sm'
                  : 'bg-white text-brand-charcoal border border-brand-border hover:border-brand-navy hover:text-brand-navy'
              }`}
            >
              {label}
              {value !== 'all' && (
                <span className={`ml-1.5 text-xs ${isActive ? 'text-white/60' : 'text-brand-muted'}`}>
                  ({products.filter(p => p.category === value).length})
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Results count ── */}
      <p className="font-sans text-brand-muted text-xs mb-6">
        Showing {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        {activeFilter !== 'all' && ` in ${FILTER_TABS.find(t => t.value === activeFilter)?.label}`}
      </p>

      {/* ── Product Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-brand-navy/5 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-brand-navy/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h3 className="font-display text-brand-navy text-xl font-medium mb-2">
            Nothing here yet
          </h3>
          <p className="font-sans text-brand-muted text-sm">
            No products in this category right now. Check back soon.
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="btn-ghost mt-4 text-sm"
          >
            View all products
          </button>
        </div>
      )}
    </>
  )
}
