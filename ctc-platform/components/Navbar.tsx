// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/',            label: 'Home' },
  { href: '/shop',        label: 'Shop' },
  { href: '/daily-verse', label: 'Daily Verse' },
  { href: '/about',       label: 'About' },
  { href: '/contact',     label: 'Contact' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled]   = useState(false)
  const pathname = usePathname()

  // Add shadow on scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-brand' : 'border-b border-brand-border'
      }`}
    >
      <div className="container-brand">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* CTC Monogram mark — inline SVG matching the brand logo */}
            <div className="w-10 h-10 rounded-full border-2 border-brand-navy flex items-center justify-center flex-shrink-0 group-hover:bg-brand-navy transition-colors duration-200">
              <span className="font-display text-brand-navy font-semibold text-sm tracking-tight group-hover:text-white transition-colors duration-200">
                CTC
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-brand-navy font-semibold text-base leading-tight tracking-wide">
                Connected Through Christ
              </p>
              <p className="font-sans text-brand-muted text-[10px] tracking-[0.15em] uppercase leading-tight">
                The Christ Centre Movement
              </p>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 rounded-brand font-sans text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-brand-navy bg-brand-navy/8'
                      : 'text-brand-charcoal hover:text-brand-navy hover:bg-brand-navy/5'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <Link href="/contact" className="btn-primary ml-3 text-xs px-5 py-2.5">
              Get in Touch
            </Link>
          </nav>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-brand hover:bg-brand-navy/5 transition-colors"
          >
            <span className={`block h-0.5 w-5 bg-brand-navy rounded-full transition-all duration-200 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-brand-navy rounded-full transition-all duration-200 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-brand-navy rounded-full transition-all duration-200 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-brand-border bg-white animate-slide-down">
          <nav className="container-brand py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-3 rounded-brand font-sans text-sm font-semibold transition-colors duration-200 ${
                    isActive
                      ? 'text-brand-navy bg-brand-navy/8'
                      : 'text-brand-charcoal hover:text-brand-navy hover:bg-brand-navy/5'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
            <div className="pt-3 border-t border-brand-border mt-2">
              <Link href="/contact" className="btn-primary w-full text-center text-sm">
                Get in Touch
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
