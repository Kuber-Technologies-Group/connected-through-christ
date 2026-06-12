import Link from 'next/link'
import { notFound } from 'next/navigation'
import { adminGetAdvert } from '@/lib/admin/adverts'
import { AdvertForm } from '@/components/admin/AdvertForm'

export default async function EditAdvertPage({ params }: { params: { id: string } }) {
  const advert = await adminGetAdvert(params.id).catch(() => null)
  if (!advert) notFound()
  return (
    <div>
      <div className="mb-8"><Link href="/admin/adverts" className="font-sans text-brand-muted text-sm hover:text-brand-navy mb-2 inline-block">← Back to Adverts</Link><h1 className="font-display text-brand-navy text-3xl font-medium">Edit Advert</h1><p className="font-sans text-brand-muted text-sm mt-1">{advert.brand_name}</p></div>
      <div className="bg-white rounded-brand-lg border border-brand-border p-8">
        <AdvertForm mode="edit" advertId={advert.id} initial={{ brandName: advert.brand_name, linkUrl: advert.link_url, placement: advert.placement, isActive: advert.is_active, startDate: advert.start_date ?? '', endDate: advert.end_date ?? '', imageUrl: advert.image_url }} />
      </div>
    </div>
  )
}
