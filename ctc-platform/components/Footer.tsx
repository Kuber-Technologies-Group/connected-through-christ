// components/Footer.tsx
import Link from 'next/link'

const SHOP_LINKS = [
  { href: '/shop',                    label: 'All Products' },
  { href: '/shop?category=bible',     label: 'Bibles' },
  { href: '/shop?category=book',      label: 'Books' },
  { href: '/shop?category=clothing',  label: 'Clothing' },
  { href: '/shop?category=accessory', label: 'Accessories' },
]

const COMMUNITY_LINKS = [
  { href: '/daily-verse', label: 'Daily Verse' },
  { href: '/about',       label: 'About CTC' },
  { href: '/contact',     label: 'Contact Us' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-white">

      {/* ── Main footer content ── */}
      <div className="container-brand py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0">
                <span className="font-display text-white font-semibold text-sm tracking-tight">
                  CTC
                </span>
              </div>
              <div>
                <p className="font-display text-white font-semibold text-base leading-tight tracking-wide">
                  Connected Through Christ
                </p>
                <p className="font-sans text-white/50 text-[10px] tracking-[0.15em] uppercase leading-tight">
                  The Christ Centre Movement
                </p>
              </div>
            </div>
            <p className="font-sans text-white/70 text-sm leading-relaxed max-w-xs">
              Bringing faith, community, and commerce together — so every believer has a place to grow, connect, and be equipped.
            </p>
            {/* Scripture accent */}
            <p className="font-scripture italic text-white/50 text-sm mt-5 leading-relaxed max-w-xs">
              "For where two or three gather in my name, there am I with them." — Matt 18:20
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-sans text-white/40 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-white/70 text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div>
            <h4 className="font-sans text-white/40 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Community
            </h4>
            <ul className="space-y-2.5">
              {COMMUNITY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-white/70 text-sm hover:text-white transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="container-brand py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-sans text-white/40 text-xs">
            © {year} Connected Through Christ · The Christ Centre Movement
          </p>
          <p className="font-sans text-white/40 text-xs">
            Built with faith by{' '}
            <span className="text-white/60">Kuber Technologies</span>
          </p>
        </div>
      </div>

    </footer>
  )
}
