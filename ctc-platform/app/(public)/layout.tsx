// app/(public)/layout.tsx
// Layout for all public-facing pages — includes Navbar and Footer
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
