// lib/email.ts
// Email sending helpers via Resend
// SERVER-SIDE ONLY — only call from /app/api/* routes

import { Resend } from 'resend'
import type { Enquiry } from '@/types'

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = process.env.CTC_ADMIN_EMAIL!
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://connectedthroughchrist.com'
const FROM_EMAIL = 'noreply@connectedthroughchrist.com' // Update after domain verification in Resend

// ─── Notify admin of new enquiry ─────────────────────────────────────────────
export async function sendEnquiryNotificationToAdmin(enquiry: Enquiry): Promise<void> {
  const subject = enquiry.subject
    ? `New Enquiry: ${enquiry.subject}`
    : `New Enquiry from ${enquiry.name}`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
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
            Submitted via ${SITE_URL} · ${new Date(enquiry.createdAt).toLocaleString('en-ZA')}
          </p>
        </div>
      </div>
    `,
  })
}

// ─── Send confirmation to the person who submitted ───────────────────────────
export async function sendEnquiryConfirmationToSubmitter(enquiry: Enquiry): Promise<void> {
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
            We've received your message and will be in touch with you soon.
          </p>
          <blockquote style="border-left: 3px solid #4A90C4; margin: 24px 0; padding: 12px 20px; font-style: italic; font-size: 17px; color: #1B2F5E; line-height: 1.6;">
            "For where two or three gather in my name, there am I with them."
            <footer style="margin-top: 8px; font-size: 13px; color: #4A90C4; font-style: normal; font-family: sans-serif;">
              — Matthew 18:20, NIV
            </footer>
          </blockquote>
          <p style="font-family: sans-serif; font-size: 14px; color: #6B7280; line-height: 1.7; margin: 24px 0 0;">
            In the meantime, visit our shop or read today's daily verse on our website.
          </p>
        </div>
        <div style="padding: 16px 32px; background: #E5E1D8; text-align: center;">
          <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #6B7280;">
            Connected Through Christ · The Christ Centre Movement
          </p>
          <p style="margin: 4px 0 0; font-family: sans-serif; font-size: 12px; color: #6B7280;">
            <a href="${SITE_URL}" style="color: #4A90C4;">${SITE_URL}</a>
          </p>
        </div>
      </div>
    `,
  })
}
