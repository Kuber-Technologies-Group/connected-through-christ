# Tech Stack — Connected Through Christ Platform

**Project:** Connected Through Christ Platform  
**Last Updated:** May 2026  

---

## Overview

This document describes every technology used to build and run the CTC platform. For each tool, there is a plain-English explanation of what it is and why it was chosen — so you can understand what you're working with, not just that it exists.

---

## The Stack at a Glance

```
Browser (User's phone/laptop)
        ↕
  Next.js (Frontend + API)      ← What users see and interact with
        ↕
  Supabase (Database + Auth)    ← Where all data is stored
        ↕
  Vercel (Hosting)              ← What keeps the site live 24/7
```

---

## Frontend (What Users See)

### Next.js 14 (App Router)
**What it is:** A framework for building websites using React. It handles both the visual pages users see AND the behind-the-scenes logic that processes data.

**Why we chose it:**
- Fast page loading (pages are pre-built where possible)
- One codebase handles both the website and the API
- Excellent support from Vercel (our hosting platform)
- Large community — easy to find help and tutorials as you learn

**What you'll write in it:** React components (`.tsx` files) — reusable pieces of UI like a product card, navigation bar, or verse display block.

**Learn more:** https://nextjs.org/docs

---

### TypeScript
**What it is:** JavaScript with built-in error checking. It tells you when you make a mistake before the code runs.

**Why we chose it:** Prevents entire categories of bugs, especially as the codebase grows. It may feel slower at first, but it saves hours of debugging later.

**Example difference:**
```typescript
// JavaScript — no warning if you pass the wrong type
function showPrice(price) { return `R${price}`; }

// TypeScript — immediately warns you if price is not a number
function showPrice(price: number): string { return `R${price}`; }
```

---

### Tailwind CSS
**What it is:** A way of styling pages using short class names directly in your HTML/JSX instead of writing a separate CSS file.

**Why we chose it:** Fast to write, consistent spacing and colours, and works perfectly with Next.js.

**Example:**
```jsx
// Instead of writing a CSS file, you style inline:
<div className="bg-white rounded-lg p-4 shadow-sm">
  <h2 className="text-xl font-semibold text-gray-800">KJV Study Bible</h2>
</div>
```

---

## Backend (The Engine)

### Supabase
**What it is:** A database platform that provides:
- A **PostgreSQL database** (where all your data lives)
- **Authentication** (login/logout for admin users)
- **Storage** (for uploading product images and advert images)
- **Auto-generated API** (lets your frontend read/write data without writing a separate server)

**Why we chose it:**
- Generous free tier for getting started
- Built-in admin dashboard to view and edit your data directly
- Handles security rules (row-level security) so public users can't edit admin data
- The proposal specifies it; it's the right tool for this scale

**Learn more:** https://supabase.com/docs

---

### Next.js API Routes
**What it is:** Server-side functions built into Next.js, stored in `/app/api/`. These handle things like processing a contact form, sending an email, or returning filtered product data.

**When we use it:** For any action that should NOT happen directly in the browser — e.g. sending an email, processing sensitive data, or calling a third-party API.

---

### Resend (Email)
**What it is:** A service for sending transactional emails reliably.

**We use it for:**
- Sending the CTC admin a notification when a new enquiry arrives
- Sending a confirmation to the person who submitted an enquiry
- Future: order confirmation emails

**Why Resend over others:** Simple API, reliable delivery, generous free tier.

---

## Hosting & Infrastructure

### Vercel
**What it is:** The platform that hosts (runs and serves) the website. When you push code to GitHub, Vercel automatically builds and deploys it.

**Why we chose it:**
- Built by the same team as Next.js — deep integration
- Automatic HTTPS/SSL (your site is secure by default)
- Global CDN (your site loads fast everywhere)
- Free tier is sufficient for Phase 1 and 2
- Preview deployments — every code change gets its own test URL before going live

**Workflow:**
```
You write code → Push to GitHub → Vercel auto-deploys → Site updates live
```

---

### GitHub
**What it is:** Where your code is stored, versioned, and backed up.

**Why it matters for you:**
- Every change is tracked — you can always go back to a working version
- Enables collaboration (when the team grows)
- Required for Vercel automatic deployments

---

## Development Tools

### VS Code (Recommended Editor)
Install these extensions:
- **ESLint** — catches code quality issues
- **Prettier** — auto-formats your code
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **TypeScript** — built in, just make sure it's enabled

---

## Folder Structure (Next.js App Router)

```
/ctc-platform
├── /app                        ← All pages and API routes
│   ├── /shop
│   │   ├── page.tsx            ← /shop page
│   │   └── /[slug]
│   │       └── page.tsx        ← /shop/[product-slug] page
│   ├── /daily-verse
│   │   └── page.tsx
│   ├── /admin                  ← Protected admin pages
│   │   └── ...
│   ├── /api                    ← Server-side API routes
│   │   ├── /enquiries
│   │   │   └── route.ts
│   │   └── /verses
│   │       └── route.ts
│   ├── layout.tsx              ← Root layout (nav, footer, fonts)
│   └── page.tsx                ← Homepage
│
├── /components                 ← Reusable UI components
│   ├── ProductCard.tsx
│   ├── VerseDisplay.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
│
├── /lib                        ← Utility functions and DB helpers
│   ├── supabase.ts             ← Supabase client setup
│   └── utils.ts
│
├── /types                      ← TypeScript type definitions
│   └── index.ts                ← Product, Verse, Enquiry types etc.
│
├── /public                     ← Static assets (logo, icons)
├── tailwind.config.ts
├── next.config.ts
└── .env.local                  ← Secret keys (NEVER commit this file)
```

---

## Environment Variables

These are secret configuration values that must NEVER be committed to GitHub.

Create a `.env.local` file in the root of the project:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-side only

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
CTC_ADMIN_EMAIL=admin@connectedthroughchrist.com

# App
NEXT_PUBLIC_SITE_URL=https://ctc.com  # or localhost:3000 in dev
```

On Vercel, add these same variables under **Project Settings → Environment Variables**.

---

## Phase 4 Additions (Future)

When Phase 4 begins, the following will be added:

| Tool | Purpose |
|---|---|
| Payment Provider (TBD) | Local payment processing — options include Paystack, Paynow (ZW), or Stripe |
| Webhook handler | Receive payment confirmation from payment provider |
| Order management tables | New Supabase tables for Orders and OrderItems |
