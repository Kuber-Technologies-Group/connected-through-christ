import Link from 'next/link'
import { AdvertForm } from '@/components/admin/AdvertForm'
export default function NewAdvertPage() {
  return (
    <div>
      <div className="mb-8"><Link href="/admin/adverts" className="font-sans text-brand-muted text-sm hover:text-brand-navy mb-2 inline-block">← Back to Adverts</Link><h1 className="font-display text-brand-navy text-3xl font-medium">Add Advert</h1></div>
      <div className="bg-white rounded-brand-lg border border-brand-border p-8"><AdvertForm mode="create" /></div>
    </div>
  )
}
