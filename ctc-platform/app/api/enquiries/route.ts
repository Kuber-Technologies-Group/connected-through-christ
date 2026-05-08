// app/api/enquiries/route.ts
import { NextRequest, NextResponse } from 'next/server'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
  const limit = 5
  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }
  if (record.count >= limit) return true
  record.count++
  return false
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again in an hour.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, subject, message, relatedProductId } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // Dynamic imports keep these off the module-load critical path
    const { getSupabaseAdmin } = await import('@/lib/supabase')
    const { sendEnquiryNotificationToAdmin, sendEnquiryConfirmationToSubmitter } = await import('@/lib/email')

    const supabaseAdmin = getSupabaseAdmin()

    const { data, error } = await supabaseAdmin
      .from('enquiries')
      .insert({
        name:               name.trim(),
        email:              email.trim().toLowerCase(),
        subject:            subject?.trim() || null,
        message:            message.trim(),
        related_product_id: relatedProductId || null,
        status:             'new',
      })
      .select()
      .single()

    if (error) {
      console.error('POST /api/enquiries — DB insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save your enquiry. Please try again.' },
        { status: 500 }
      )
    }

    const enquiry = {
      id:               data.id,
      name:             data.name,
      email:            data.email,
      subject:          data.subject ?? undefined,
      message:          data.message,
      relatedProductId: data.related_product_id ?? undefined,
      status:           data.status as 'new' | 'read' | 'responded',
      createdAt:        data.created_at,
    }

    // Non-blocking — don't fail the response if email fails
    await Promise.allSettled([
      sendEnquiryNotificationToAdmin(enquiry),
      sendEnquiryConfirmationToSubmitter(enquiry),
    ])

    return NextResponse.json({ data: { id: enquiry.id } }, { status: 201 })

  } catch (error) {
    console.error('POST /api/enquiries — unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
