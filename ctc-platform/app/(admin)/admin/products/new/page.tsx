// app/admin/products/new/page.tsx
import Link from 'next/link'
import { ProductForm } from '@/components/admin/ProductForm'

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="font-sans text-brand-muted text-sm hover:text-brand-navy mb-2 inline-block">← Back to Products</Link>
        <h1 className="font-display text-brand-navy text-3xl font-medium">Add Product</h1>
      </div>
      <div className="bg-white rounded-brand-lg border border-brand-border p-8">
        <ProductForm mode="create" />
      </div>
    </div>
  )
}
