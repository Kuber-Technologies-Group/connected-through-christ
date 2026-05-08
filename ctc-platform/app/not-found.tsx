// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-brand py-24 md:py-36 text-center max-w-lg mx-auto">
      {/* Decorative CTC mark */}
      <div className="w-20 h-20 rounded-full border-2 border-brand-navy/15 flex items-center justify-center mx-auto mb-8">
        <span className="font-display text-brand-navy/30 font-semibold text-lg">CTC</span>
      </div>

      <h1 className="font-display text-brand-navy text-display-md font-medium mb-3">
        Page Not Found
      </h1>
      <p className="font-sans text-brand-muted text-sm leading-relaxed mb-10">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back on track.
      </p>

      {/* Scripture accent */}
      <p className="font-scripture italic text-brand-navy/60 text-base mb-10">
        &ldquo;Your word is a lamp for my feet, a light on my path.&rdquo;
        <span className="block font-sans not-italic text-brand-blue text-xs font-semibold mt-1">
          — Psalm 119:105
        </span>
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/"      className="btn-primary">Go Home</Link>
        <Link href="/shop"  className="btn-secondary">Browse Shop</Link>
      </div>
    </div>
  )
}
