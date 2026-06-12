// app/page.tsx
import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/products'
import { getTodaysVerse } from '@/lib/verses'
import { ProductCard } from '@/components/ProductCard'
import { VerseDisplay } from '@/components/VerseDisplay'

export const revalidate = 3600 // Revalidate every hour

export default async function HomePage() {
  // Fetch data in parallel
  const [featuredProducts, todayVerse] = await Promise.all([
    getFeaturedProducts().catch(() => []),
    getTodaysVerse().catch(() => null),
  ])

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-brand-gradient">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />

        <div className="container-brand relative py-20 md:py-28 lg:py-36">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="font-sans text-brand-blue-light text-xs font-bold tracking-[0.25em] uppercase mb-5">
              The Christ Centre Movement
            </p>

            {/* Heading */}
            <h1 className="font-display text-white font-medium leading-[1.05] mb-6">
              Faith.<br />
              Community.<br />
              <span className="text-brand-blue-light">Commerce.</span>
            </h1>

            {/* Subheading */}
            <p className="font-sans text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
              Your home for faith-based products, daily Scripture, and a community rooted in Christ.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-brand bg-white text-brand-navy font-sans font-bold text-sm tracking-wide hover:bg-brand-cream transition-colors duration-200 shadow-brand"
              >
                Browse the Shop
              </Link>
              <Link
                href="/daily-verse"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-brand border-2 border-white/30 text-white font-sans font-semibold text-sm tracking-wide hover:border-white/60 hover:bg-white/5 transition-colors duration-200"
              >
                Today&rsquo;s Verse
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TODAY'S VERSE ─────────────────────────────────────────────── */}
      {todayVerse && (
        <section className="py-16 md:py-20">
          <div className="container-brand">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="section-label">Scripture for today</p>
                <h2 className="font-display text-brand-navy text-display-sm font-medium">
                  Daily Verse
                </h2>
              </div>
              <Link
                href="/daily-verse"
                className="hidden sm:inline-flex font-sans text-brand-blue text-sm font-semibold hover:underline"
              >
                View archive →
              </Link>
            </div>

            <VerseDisplay verse={todayVerse} variant="card" />

            <div className="mt-5 sm:hidden">
              <Link
                href="/daily-verse"
                className="font-sans text-brand-blue text-sm font-semibold hover:underline"
              >
                View verse archive →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-brand">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="section-label">From our collection</p>
              <h2 className="font-display text-brand-navy text-display-sm font-medium">
                Featured Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex font-sans text-brand-blue text-sm font-semibold hover:underline"
            >
              View all →
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-sans text-brand-muted text-sm">
                Products coming soon. Check back shortly.
              </p>
            </div>
          )}

          <div className="mt-8 sm:hidden">
            <Link href="/shop" className="btn-secondary w-full text-center">
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div>
              <p className="section-label">Who we are</p>
              <h2 className="font-display text-brand-navy text-display-sm font-medium mb-5">
                Connected Through Christ
              </h2>
              <p className="font-sans text-brand-charcoal leading-relaxed mb-4">
                Connected Through Christ is a Christ-centred initiative led by Keane T Moyo and Praise Moila,
                born out of a shared passion to support and strengthen the daily walk of believers. We are
                members of the Exalted House of The Kingdom of God Church, under the leadership of Pastor Max Moila.
              </p>
              <p className="font-sans text-brand-muted text-sm leading-relaxed mb-8">
                Our vision is to help people worship well &mdash; by providing tools that encourage Bible study,
                consistent devotion, spiritual growth, and faithful stewardship. Everything we do is crafted
                with the purpose of drawing believers deeper into their relationship with God.
              </p>
              <Link href="/about" className="btn-primary">
                Our Story
              </Link>
            </div>

            {/* Decorative quote panel */}
            <div className="relative">
              <div className="bg-brand-gradient rounded-brand-lg p-8 md:p-10">
                <div className="font-display text-white/10 text-[8rem] leading-none absolute -top-4 left-6 select-none pointer-events-none">
                  &ldquo;
                </div>
                <blockquote className="verse-text text-white text-xl leading-relaxed relative">
                  Let the word of Christ dwell in you richly&hellip;
                </blockquote>
                <p className="verse-reference text-brand-blue-light mt-5">
                  &mdash; Colossians 3:16, NIV
                </p>
                <p className="font-sans text-white/50 text-xs mt-6 leading-relaxed">
                  Keep growing, keep serving, keep seeking God with all your might.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────────────────── */}
      <section className="bg-brand-navy py-14">
        <div className="container-brand text-center">
          <h2 className="font-display text-white text-display-sm font-medium mb-3">
            Have a question about Scripture?
          </h2>
          <p className="font-sans text-white/60 text-sm mb-8 max-w-md mx-auto">
            Our team is here to help. Send us a message and we&rsquo;ll respond with care.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-brand bg-white text-brand-navy font-sans font-bold text-sm tracking-wide hover:bg-brand-cream transition-colors duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}
