// app/about/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Connected Through Christ — the Christ Centre Movement and our mission to bring faith, community, and commerce together.',
}

const VALUES = [
  {
    title: 'Faith-First',
    description: 'Every decision we make starts with Scripture. Our products, our content, and our community are all rooted in the Word of God.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    ),
  },
  {
    title: 'Community',
    description: 'We believe faith grows best in community. This platform is a gathering place — for questions, encouragement, and shared life in Christ.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    ),
  },
  {
    title: 'Accessibility',
    description: 'Faith resources should be within reach of everyone — on any device, at any budget. We design with mobile users and local contexts in mind.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3.75h3m-3 3.75h3" />
    ),
  },
  {
    title: 'Trust',
    description: 'We take seriously the responsibility of being a faith platform. Everything published here is curated with integrity and biblical care.',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    ),
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ── */}
      <div className="bg-brand-gradient py-20 md:py-28">
        <div className="container-brand max-w-3xl">
          <p className="section-label text-brand-blue-light mb-3">Our story</p>
          <h1 className="font-display text-white font-medium text-display-lg leading-tight mb-6">
            Who We Are
          </h1>
          <p className="font-sans text-white/70 text-lg leading-relaxed">
            Connected Through Christ is a registered Christian initiative born out of a genuine passion for people and their relationship with God. Founded by Keane T Moyo in association with Praise Moila, the initiative seeks to unite believers from different church denominations, cultures, and backgrounds under one common purpose advancing the Kingdom of God and raising a Christ-like generation.
          </p>
          <p className="font-sans mt-4 text-white/70 text-lg leading-relaxed">
            We believe that Christianity is not limited to the church building alone, but can be expressed through creativity, innovation, and everyday life. Connected Through Christ creates a space where believers can freely use their God-given gifts and talents to spread the Gospel in ways that connect with today’s generation.
          </p>
        </div>
      </div>

      {/* ── Mission ── */}
      <section className="py-16 md:py-20">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="section-label mb-3">Why we exist</p>
              <h2 className="font-display text-brand-navy text-display-sm font-medium mb-5">
                Our Mission
              </h2>
              <p className="font-sans text-brand-charcoal leading-relaxed mb-4">
                Our mission is to inspire and equip people around the world to evangelize through their creativity and skills. Whether through fashion, music, art, design, public speaking, media, or innovation, we believe every talent can be used to glorify God and impact lives.
              </p>
              <p className="font-sans text-brand-muted text-sm leading-relaxed">
                We believe the church doesn&rsquo;t end at the door of a building. It continues in homes, on phones, and in everyday conversations. This platform is our expression of that belief.
              </p>
            </div>

            {/* Pull quote */}
            <div className="bg-brand-cream rounded-brand-lg p-8 border border-brand-border">
              <p className="font-display text-brand-navy/20 text-7xl leading-none mb-2 select-none">&ldquo;</p>
              <blockquote className="font-scripture italic text-brand-navy text-xl leading-relaxed -mt-4">
                For where two or three gather in my name, there am I with them.
              </blockquote>
              <p className="font-sans text-brand-blue text-sm font-semibold mt-4">
                — Matthew 18:20, NIV
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-brand">
          <div className="text-center mb-12">
            <p className="section-label mb-2">What guides us</p>
            <h2 className="font-display text-brand-navy text-display-sm font-medium">
              Our Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {VALUES.map(({ title, description, icon }) => (
              <div key={title} className="card p-6">
                <div className="w-10 h-10 rounded-full bg-brand-navy/8 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {icon}
                  </svg>
                </div>
                <h3 className="font-display text-brand-navy text-lg font-medium mb-2">
                  {title}
                </h3>
                <p className="font-sans text-brand-muted text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20">
        <div className="container-brand text-center max-w-xl mx-auto">
          <h2 className="font-display text-brand-navy text-display-sm font-medium mb-4">
            Ready to connect?
          </h2>
          <p className="font-sans text-brand-muted text-sm leading-relaxed mb-8">
            Browse our shop, read today&rsquo;s verse, or send us a message. We&rsquo;d love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-primary">Browse the Shop</Link>
            <Link href="/contact" className="btn-secondary">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
