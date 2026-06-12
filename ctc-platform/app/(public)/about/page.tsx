// app/(public)/about/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Connected Through Christ is a Christ-centred initiative led by Keane T Moyo and Praise Moila, born out of a shared passion to support and strengthen the daily walk of believers.',
}

const VALUES = [
  {
    title: 'Bible Study',
    description: 'We provide tools that make Scripture accessible and practical — so the Word is not just read, but lived.',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    title: 'Consistent Devotion',
    description: 'Faith is built daily. Everything we create is designed to help believers build a rhythm that honours God every day.',
    icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Spiritual Growth',
    description: 'From diaries to devotionals, our resources are crafted to draw believers deeper into their relationship with God.',
    icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  },
  {
    title: 'Faithful Stewardship',
    description: 'We believe in honouring God with every resource — time, talent, and treasure. Our tools help you track and grow in stewardship.',
    icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-brand-gradient py-20 md:py-28">
        <div className="container-brand max-w-3xl">
          <p className="section-label text-brand-blue-light mb-3">Our story</p>
          <h1 className="font-display text-white font-medium text-display-lg leading-tight mb-6">
            Who We Are
          </h1>
          <p className="font-sans text-white/70 text-lg leading-relaxed">
            Connected Through Christ is a Christ-centred initiative born out of a shared passion
            to support and strengthen the daily walk of believers.
          </p>
        </div>
      </div>

      {/* Origin Story */}
      <section className="py-16 md:py-20">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div>
              <p className="section-label mb-3">How it started</p>
              <h2 className="font-display text-brand-navy text-display-sm font-medium mb-5">
                The Denim Diaries &amp; Beyond
              </h2>
              <p className="font-sans text-brand-charcoal leading-relaxed mb-4">
                It began with a simple yet deep desire &mdash; to grow in the knowledge of God, walk in His
                truth, and live a life of consistent Christian discipline. In a world filled with
                distractions, the need for a companion that helps believers pause, reflect, and remain
                rooted in the Word became clear.
              </p>
              <p className="font-sans text-brand-muted text-sm leading-relaxed mb-4">
                The name &ldquo;Denim Diaries&rdquo; reflects strength and simplicity &mdash; strong like faith,
                and simple like truth. Denim wears well with time, and so does a life anchored in Christ.
              </p>
              <p className="font-sans text-brand-muted text-sm leading-relaxed">
                From that first diary, Connected Through Christ grew into a resource-based movement
                that seeks to uplift, equip, and inspire the body of Christ.
              </p>
            </div>

            <div className="bg-brand-gradient rounded-brand-lg p-8">
              <p className="font-display text-white/20 text-7xl leading-none mb-2 select-none">&ldquo;</p>
              <blockquote className="font-scripture italic text-white text-xl leading-relaxed -mt-4">
                Let the word of Christ dwell in you richly&hellip;
              </blockquote>
              <p className="font-sans text-brand-blue-light text-sm font-semibold mt-4">
                &mdash; Colossians 3:16
              </p>
              <p className="font-sans text-white/50 text-xs mt-6 leading-relaxed tracking-wide uppercase">
                Keep growing. Keep serving. Keep seeking God with all your might.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-brand max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="section-label mb-2">The people behind CTC</p>
            <h2 className="font-display text-brand-navy text-display-sm font-medium">Led by Faith</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-12 h-12 rounded-full bg-brand-navy/8 flex items-center justify-center mb-4">
                <span className="font-display text-brand-navy font-semibold text-lg">K</span>
              </div>
              <h3 className="font-display text-brand-navy text-xl font-medium mb-1">Keane T Moyo</h3>
              <p className="font-sans text-brand-blue text-xs font-semibold tracking-wider uppercase mb-3">Co-Founder</p>
              <p className="font-sans text-brand-muted text-sm leading-relaxed">
                Driven by a passion for discipleship and equipping believers with practical tools
                to grow in their walk with God every single day.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border">
                <a href="mailto:moyokeane4@gmail.com" className="font-sans text-brand-blue text-xs hover:underline">moyokeane4@gmail.com</a>
              </div>
            </div>

            <div className="card p-8">
              <div className="w-12 h-12 rounded-full bg-brand-navy/8 flex items-center justify-center mb-4">
                <span className="font-display text-brand-navy font-semibold text-lg">P</span>
              </div>
              <h3 className="font-display text-brand-navy text-xl font-medium mb-1">Praise Moila</h3>
              <p className="font-sans text-brand-blue text-xs font-semibold tracking-wider uppercase mb-3">Co-Founder</p>
              <p className="font-sans text-brand-muted text-sm leading-relaxed">
                Committed to helping people worship well and live with intentional faith &mdash; building
                a community that holds each other accountable in Christ.
              </p>
              <div className="mt-4 pt-4 border-t border-brand-border">
                <a href="mailto:praise1291@gmail.com" className="font-sans text-brand-blue text-xs hover:underline">praise1291@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-brand-cream rounded-brand-lg border border-brand-border text-center">
            <p className="font-sans text-brand-charcoal text-sm leading-relaxed">
              We are members of the{" "}
              <span className="font-semibold text-brand-navy">Exalted House of The Kingdom of God Church</span>,
              under the leadership of{" "}
              <span className="font-semibold text-brand-navy">Pastor Max Moila</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-20">
        <div className="container-brand">
          <div className="text-center mb-12">
            <p className="section-label mb-2">What drives us</p>
            <h2 className="font-display text-brand-navy text-display-sm font-medium">Our Vision</h2>
            <p className="font-sans text-brand-muted text-sm mt-3 max-w-xl mx-auto leading-relaxed">
              To help people worship well &mdash; by providing tools that encourage Bible study,
              consistent devotion, spiritual growth, and faithful stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {VALUES.map(({ title, description, icon }) => (
              <div key={title} className="card p-6">
                <div className="w-10 h-10 rounded-full bg-brand-navy/8 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                  </svg>
                </div>
                <h3 className="font-display text-brand-navy text-lg font-medium mb-2">{title}</h3>
                <p className="font-sans text-brand-muted text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-14 bg-brand-navy">
        <div className="container-brand text-center max-w-xl mx-auto">
          <h2 className="font-display text-white text-display-sm font-medium mb-3">
            We supply anywhere you are
          </h2>
          <p className="font-sans text-white/60 text-sm mb-8">
            Get in touch with us directly or send an enquiry through the website.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-8 font-sans text-white/70 text-sm">
            <span>+263 77 891 5232</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>+27 69 431 0136</span>
            <span className="hidden sm:inline text-white/30">·</span>
            <span>+27 76 644 2097</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3.5 rounded-brand bg-white text-brand-navy font-sans font-bold text-sm hover:bg-brand-cream transition-colors">Browse the Shop</Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-brand border-2 border-white/30 text-white font-sans font-semibold text-sm hover:border-white/60 transition-colors">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
