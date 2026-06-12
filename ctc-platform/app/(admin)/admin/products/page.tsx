// app/admin/products/page.tsx
import Link from 'next/link'
import { adminGetAllProducts } from '@/lib/admin/products'


export default async function AdminProductsPage() {
  const products = await adminGetAllProducts().catch(() => [])

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-brand-navy text-3xl font-medium">Products</h1>
          <p className="font-sans text-brand-muted text-sm mt-1">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">+ Add Product</Link>
      </div>

      <div className="bg-white rounded-brand-lg border border-brand-border overflow-hidden">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-brand-muted text-sm mb-4">No products yet.</p>
            <Link href="/admin/products/new" className="btn-primary">Add your first product</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-gray-50">
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Product</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Category</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Price</th>
                <th className="text-left px-5 py-3 font-sans text-xs font-bold text-brand-muted tracking-wider uppercase">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {products.map((p: { id: string; name: string; category: string; price: number; currency: string; is_available: boolean }) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-sans text-sm font-medium text-brand-charcoal">{p.name}</td>
                  <td className="px-5 py-4"><span className="badge badge-navy capitalize">{p.category}</span></td>
                  <td className="px-5 py-4 font-sans text-sm text-brand-charcoal">{p.currency} {Number(p.price).toFixed(2)}</td>
                  <td className="px-5 py-4">
                    <span className={`badge ${p.is_available ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.is_available ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/admin/products/${p.id}/edit`} className="font-sans text-brand-blue text-sm font-semibold hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
