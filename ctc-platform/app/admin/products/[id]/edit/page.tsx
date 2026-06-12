// app/admin/products/[id]/edit/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { adminGetProduct } from '@/lib/admin/products'
import { ProductForm } from '@/components/admin/ProductForm'


export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await adminGetProduct(params.id).catch(() => null)
  if (!product) notFound()

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/products" className="font-sans text-brand-muted text-sm hover:text-brand-navy mb-2 inline-block">← Back to Products</Link>
        <h1 className="font-display text-brand-navy text-3xl font-medium">Edit Product</h1>
        <p className="font-sans text-brand-muted text-sm mt-1">{product.name}</p>
      </div>
      <div className="bg-white rounded-brand-lg border border-brand-border p-8">
        <ProductForm
          mode="edit"
          productId={product.id}
          initial={{
            name: product.name, description: product.description ?? '',
            price: String(product.price), currency: product.currency,
            category: product.category, imageUrl: product.image_url ?? '',
            isAvailable: product.is_available,
          }}
        />
      </div>
    </div>
  )
}
