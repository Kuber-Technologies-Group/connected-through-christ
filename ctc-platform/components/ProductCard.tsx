// components/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import type { Product, ProductCategory } from '@/types'

interface ProductCardProps {
  product: Product
}

// Category display labels and badge colours
const CATEGORY_CONFIG: Record<ProductCategory, { label: string; className: string }> = {
  bible:     { label: 'Bible',     className: 'badge-navy' },
  book:      { label: 'Book',      className: 'badge-blue' },
  clothing:  { label: 'Clothing',  className: 'badge-gold' },
  accessory: { label: 'Accessory', className: 'badge-navy' },
  other:     { label: 'Other',     className: 'badge-blue' },
}

function formatPrice(price: number, currency: string): string {
  // Format for display — adjust locale as needed for ZW/SA
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price)
}

export function ProductCard({ product }: ProductCardProps) {
  const { label, className } = CATEGORY_CONFIG[product.category]

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="card group flex flex-col overflow-hidden"
    >
      {/* ── Product Image ── */}
      <div className="relative aspect-[4/3] bg-brand-navy/5 overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          // Placeholder when no image is set
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-navy/10 to-brand-blue/10">
            <div className="w-12 h-12 rounded-full border-2 border-brand-navy/20 flex items-center justify-center mb-2">
              <span className="font-display text-brand-navy/30 font-semibold text-xs">CTC</span>
            </div>
            <span className="font-sans text-brand-navy/30 text-xs">No image yet</span>
          </div>
        )}

        {/* Category badge overlaid on image */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${className}`}>{label}</span>
        </div>
      </div>

      {/* ── Product Info ── */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-display text-brand-navy text-lg font-medium leading-snug mb-1 group-hover:text-brand-navy-light transition-colors duration-200">
          {product.name}
        </h3>
        <p className="font-sans text-brand-muted text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-brand-navy font-semibold text-xl">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="font-sans text-brand-blue text-xs font-semibold tracking-wide group-hover:underline">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  )
}
