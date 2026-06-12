// app/admin/dashboard/page.tsx
import Link from 'next/link'
import { getSupabaseServer } from '@/lib/supabase-server'

async function getStats() {
  const supabase = getSupabaseServer()
  const [products, verses, enquiries, adverts] = await Promise.all([
    supabase.from('products').select('id', { count: 'exact' }).is('deleted_at', null),
    supabase.from('daily_verses').select('id', { count: 'exact' }),
    supabase.from('enquiries').select('id', { count: 'exact' }).eq('status', 'new'),
    supabase.from('advertisements').select('id', { count: 'exact' }).eq('is_active', true),
  ])
  return {
    products:  products.count  ?? 0,
    verses:    verses.count    ?? 0,
    newEnquiries: enquiries.count ?? 0,
    activeAdverts: adverts.count ?? 0,
  }
}


export default async function DashboardPage() {
  const stats = await getStats().catch(() => ({ products: 0, verses: 0, newEnquiries: 0, activeAdverts: 0 }))

  const STATS = [
    { label: 'Products',       value: stats.products,      href: '/admin/products',  color: 'bg-brand-navy' },
    { label: 'Verses Scheduled', value: stats.verses,      href: '/admin/verses',    color: 'bg-brand-blue' },
    { label: 'New Enquiries',  value: stats.newEnquiries,  href: '/admin/enquiries', color: 'bg-amber-600' },
    { label: 'Active Adverts', value: stats.activeAdverts, href: '/admin/adverts',   color: 'bg-emerald-600' },
  ]

  const QUICK_ACTIONS = [
    { label: 'Add Product',  href: '/admin/products/new',  desc: 'Add a new product to the shop' },
    { label: 'Schedule Verse', href: '/admin/verses/new',  desc: 'Add a Bible verse for a date' },
    { label: 'Add Advert',   href: '/admin/adverts/new',   desc: 'Upload a brand advertisement' },
    { label: 'View Enquiries', href: '/admin/enquiries',   desc: 'Read messages from visitors' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-brand-navy text-3xl font-medium">Dashboard</h1>
        <p className="font-sans text-brand-muted text-sm mt-1">Welcome back. Here&rsquo;s what&rsquo;s happening on the platform.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STATS.map(({ label, value, href, color }) => (
          <Link key={href} href={href} className="bg-white rounded-brand-lg border border-brand-border p-5 hover:shadow-brand transition-shadow">
            <div className={`w-8 h-1 rounded-full ${color} mb-3`} />
            <p className="font-display text-brand-navy text-3xl font-semibold">{value}</p>
            <p className="font-sans text-brand-muted text-xs mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="font-sans text-brand-charcoal text-xs font-bold tracking-[0.15em] uppercase mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {QUICK_ACTIONS.map(({ label, href, desc }) => (
          <Link key={href} href={href} className="bg-white rounded-brand-lg border border-brand-border p-5 hover:border-brand-navy hover:shadow-brand-sm transition-all group">
            <p className="font-sans text-brand-navy font-semibold text-sm group-hover:text-brand-navy-dark">{label}</p>
            <p className="font-sans text-brand-muted text-xs mt-1 leading-relaxed">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
