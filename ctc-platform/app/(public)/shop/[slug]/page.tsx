// app/shop/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductBySlug, getAllProductSlugs } from '@/lib/products'
import type { ProductCategory } from '@/types'

interface PageProps {
  params: { slug: string }
}

// ── Static generation: pre-build all product pages ────────────────────────────
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs().catch(() => [])
  return slugs.map(slug => ({ slug }))
}

// ── Dynamic metadata per product ──────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug).catch(() => null)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.name,
    description: product.description,
  }
}

export const revalidate = 3600

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  bible:     'Bible',
  book:      'Book',
  clothing:  'Clothing',
  accessory: 'Accessory',
  other:     'Other',
}

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(price)
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug).catch(() => null)

  if (!product) notFound()

  return (
    <div className="container-brand py-10 md:py-16">

      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-2 font-sans text-sm text-brand-muted mb-8">
        <Link href="/" className="hover:text-brand-navy transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-navy transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-brand-charcoal font-medium truncate">{product.name}</span>
      </nav>

      {/* ── Product Content ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

        {/* ── Image ── */}
        <div className="relative aspect-square bg-brand-navy/5 rounded-brand-lg overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-navy/10 to-brand-blue/10">
              <div className="w-20 h-20 rounded-full border-2 border-brand-navy/20 flex items-center justify-center mb-3">
                <span className="font-display text-brand-navy/30 font-semibold text-lg">CTC</span>
              </div>
              <span className="font-sans text-brand-navy/30 text-sm">Image coming soon</span>
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="flex flex-col">
          {/* Category badge */}
          <span className="badge badge-navy self-start mb-4">
            {CATEGORY_LABELS[product.category]}
          </span>

          {/* Name */}
          <h1 className="font-display text-brand-navy font-medium text-display-md mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <p className="font-display text-brand-navy text-3xl font-semibold mb-6">
            {formatPrice(product.price, product.currency)}
          </p>

          {/* Divider */}
          <div className="divider-brand mb-6" />

          {/* Description */}
          <div className="flex-1 mb-8">
            <h2 className="font-sans text-brand-charcoal text-xs font-bold tracking-[0.15em] uppercase mb-3">
              About this product
            </h2>
            <p className="font-sans text-brand-charcoal leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          {/* Enquiry CTA */}
          <div className="bg-brand-cream rounded-brand-lg p-5 border border-brand-border">
            <p className="font-sans text-brand-charcoal text-sm font-semibold mb-1">
              Interested in this product?
            </p>
            <p className="font-sans text-brand-muted text-xs leading-relaxed mb-4">
              We&rsquo;re not yet processing payments online. Send us an enquiry and our team will get back to you promptly.
            </p>
            <Link
              href={`/contact?subject=Enquiry about: ${encodeURIComponent(product.name)}`}
              className="btn-primary w-full text-center"
            >
              Enquire About This Product
            </Link>
          </div>

          {/* Back link */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-brand-muted text-sm hover:text-brand-navy transition-colors mt-5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to shop
          </Link>
        </div>
      </div>
    </div>
  )
}
