// app/shop/page.tsx
import type { Metadata } from 'next'
import { getAvailableProducts } from '@/lib/products'
import { ShopClient } from './ShopClient'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse Bibles, books, clothing, and accessories from Connected Through Christ.',
}

export const revalidate = 3600

export default async function ShopPage() {
  const products = await getAvailableProducts().catch(() => [])

  return (
    <div>
      {/* ── Page Header ── */}
      <div className="bg-brand-gradient py-14 md:py-20">
        <div className="container-brand">
          <p className="section-label text-brand-blue-light mb-2">Equipped for faith</p>
          <h1 className="font-display text-white font-medium text-display-lg">
            The Shop
          </h1>
          <p className="font-sans text-white/60 text-sm mt-3 max-w-md">
            Bibles, devotionals, clothing, and accessories — all curated by the CTC team.
          </p>
        </div>
      </div>

      {/* ── Product Grid with Filter ── */}
      <div className="container-brand py-12 md:py-16">
        <ShopClient products={products} />
      </div>
    </div>
  )
}
