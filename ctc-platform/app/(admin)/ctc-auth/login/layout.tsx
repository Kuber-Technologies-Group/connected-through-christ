// app/(admin)/ctc-auth/login/layout.tsx
// Full-screen layout for login — no sidebar, no navbar, no footer
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
