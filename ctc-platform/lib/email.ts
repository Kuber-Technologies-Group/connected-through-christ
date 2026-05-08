// lib/email.ts
// SERVER-SIDE ONLY — only call from /app/api/* routes

import type { Enquiry } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://connectedthroughchrist.com'
const FROM_EMAIL = 'noreply@connectedthroughchrist.com'

// Resend client is created lazily inside each function — not at module load time.
// This prevents build failures when RESEND_API_KEY is not set during `next build`.
function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('Missing RESEND_API_KEY environment variable.')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Resend } = require('resend')
  return new Resend(apiKey)
}

export async function sendEnquiryNotificationToAdmin(enquiry: Enquiry): Promise<void> {
  const resend = getResend()
  const adminEmail = process.env.CTC_ADMIN_EMAIL
  if (!adminEmail) throw new Error('Missing CTC_ADMIN_EMAIL environment variable.')

  const subject = enquiry.subject
    ? `New Enquiry: ${enquiry.subject}`
    : `New Enquiry from ${enquiry.name}`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: adminEmail,
    subject,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2C2C;">
        <div style="background: #1B2F5E; padding: 24px; text-align: center;">
          <h1 style="color: white; font-size: 20px; margin: 0; font-weight: 500; letter-spacing: 2px;">
            CONNECTED THROUGH CHRIST
          </h1>
          <p style="color: #7AB3D8; margin: 4px 0 0; font-size: 13px; font-family: sans-serif;">
            New Enquiry Received
          </p>
        </div>
        <div style="padding: 32px; background: #F7F4EF;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; font-family: sans-serif; font-size: 13px; color: #6B7280; width: 100px;">From</td>
              <td style="padding: 8px 0; font-family: sans-serif; font-size: 14px;">${enquiry.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; font-family: sans-serif; font-size: 13px; color: #6B7280;">Email</td>
              <td style="padding: 8px 0; font-family: sans-serif; font-size: 14px;">
                <a href="mailto:${enquiry.email}" style="color: #4A90C4;">${enquiry.email}</a>
              </td>
            </tr>
            ${enquiry.subject ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; font-family: sans-serif; font-size: 13px; color: #6B7280;">Subject</td>
              <td style="padding: 8px 0; font-family: sans-serif; font-size: 14px;">${enquiry.subject}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 8px 0; font-weight: bold; font-family: sans-serif; font-size: 13px; color: #6B7280; vertical-align: top;">Message</td>
              <td style="padding: 8px 0; font-family: sans-serif; font-size: 14px; line-height: 1.6;">${enquiry.message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
        </div>
        <div style="padding: 16px 32px; background: #E5E1D8; text-align: center;">
          <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #6B7280;">
            Submitted via ${SITE_URL} &middot; ${new Date(enquiry.createdAt).toLocaleString('en-ZA')}
          </p>
        </div>
      </div>
    `,
  })
}

export async function sendEnquiryConfirmationToSubmitter(enquiry: Enquiry): Promise<void> {
  const resend = getResend()

  await resend.emails.send({
    from: FROM_EMAIL,
    to: enquiry.email,
    subject: 'Thank you for reaching out — Connected Through Christ',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2C2C;">
        <div style="background: #1B2F5E; padding: 24px; text-align: center;">
          <h1 style="color: white; font-size: 20px; margin: 0; font-weight: 500; letter-spacing: 2px;">
            CONNECTED THROUGH CHRIST
          </h1>
          <p style="color: #7AB3D8; margin: 4px 0 0; font-size: 13px; font-family: sans-serif;">
            The Christ Centre Movement
          </p>
        </div>
        <div style="padding: 40px 32px; background: #F7F4EF;">
          <h2 style="font-size: 24px; font-weight: 500; color: #1B2F5E; margin: 0 0 16px;">
            Thank you, ${enquiry.name}.
          </h2>
          <p style="font-family: sans-serif; font-size: 15px; line-height: 1.7; color: #2C2C2C; margin: 0 0 16px;">
            We have received your message and will be in touch with you soon.
          </p>
          <blockquote style="border-left: 3px solid #4A90C4; margin: 24px 0; padding: 12px 20px; font-style: italic; font-size: 17px; color: #1B2F5E; line-height: 1.6;">
            &ldquo;For where two or three gather in my name, there am I with them.&rdquo;
            <footer style="margin-top: 8px; font-size: 13px; color: #4A90C4; font-style: normal; font-family: sans-serif;">
              &mdash; Matthew 18:20, NIV
            </footer>
          </blockquote>
          <p style="font-family: sans-serif; font-size: 14px; color: #6B7280; line-height: 1.7; margin: 24px 0 0;">
            In the meantime, visit our shop or read today&rsquo;s daily verse on our website.
          </p>
        </div>
        <div style="padding: 16px 32px; background: #E5E1D8; text-align: center;">
          <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #6B7280;">
            Connected Through Christ &middot; The Christ Centre Movement
          </p>
          <p style="margin: 4px 0 0; font-family: sans-serif; font-size: 12px; color: #6B7280;">
            <a href="${SITE_URL}" style="color: #4A90C4;">${SITE_URL}</a>
          </p>
        </div>
      </div>
    `,
  })
}
