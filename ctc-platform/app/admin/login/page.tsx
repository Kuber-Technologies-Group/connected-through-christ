// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AdminLoginPage() {
  const router   = useRouter()
  const supabase = createClientComponentClient()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center mx-auto mb-4">
            <span className="font-display text-white font-semibold text-lg">CTC</span>
          </div>
          <h1 className="font-display text-white text-2xl font-medium">Admin Panel</h1>
          <p className="font-sans text-white/50 text-xs mt-1 tracking-widest uppercase">Connected Through Christ</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-brand-lg p-8 shadow-brand-lg">
          <h2 className="font-display text-brand-navy text-xl font-medium mb-6">Sign in</h2>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-brand">
              <p className="font-sans text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="label-brand">Email</label>
              <input
                id="email" type="email" required autoComplete="email"
                value={email} onChange={e => setEmail(e.target.value)}
                className="input-brand"
                placeholder="admin@connectedthroughchrist.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="label-brand">Password</label>
              <input
                id="password" type="password" required autoComplete="current-password"
                value={password} onChange={e => setPassword(e.target.value)}
                className="input-brand"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={loading}
              className="btn-primary w-full mt-2"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center font-sans text-white/30 text-xs mt-6">
          This area is restricted to authorised CTC team members.
        </p>
      </div>
    </div>
  )
}
