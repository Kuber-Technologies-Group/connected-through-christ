// app/layout.tsx
import type { Metadata } from 'next'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Connected Through Christ',
    template: '%s | Connected Through Christ',
  },
  description: 'Faith, community, and commerce — all in one place. Browse our shop, read today\'s verse, and connect with the Christ Centre Movement.',
  keywords: ['Christian', 'faith', 'Bible', 'CTC', 'Connected Through Christ', 'Christ Centre Movement'],
  openGraph: {
    siteName: 'Connected Through Christ',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded via link tag for best performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Lato:wght@300;400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-brand-cream antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
