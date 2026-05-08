# Agent Context — Connected Through Christ Platform

> **How to use this file:** Paste the contents of this file at the start of every new AI session before asking for help. It gives the agent everything it needs to help you without re-explaining the project every time.

---

## Project Summary

**Client:** Connected Through Christ (CTC)  
**Developer:** Kuber Technologies  
**Type:** Christian E-Commerce & Community Platform  
**Current Phase:** Phase 1 — Launch Website  

CTC is a faith-based ministry. The platform brings together a product shop (Bibles, books, clothing), a daily Bible verse feature, a Bible Q&A section, and advertising space for Christian brands.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| File Storage | Supabase Storage |
| Email | Resend |
| Hosting | Vercel |
| Version Control | GitHub |

---

## Current Phase Scope (Phase 1 — IN SCOPE ONLY)

Build ONLY what is listed here. Do not add Phase 2, 3, or 4 features.

**Pages to build:**
- `/` — Homepage (hero, today's verse, featured products, about snippet, footer)
- `/shop` — Product listing with category filter
- `/shop/[slug]` — Product detail page
- `/daily-verse` — Today's verse + 30-day archive
- `/about` — About CTC page
- `/contact` — Contact form

**Features:**
- Product browse (no payments — enquiry only)
- Daily verse display (read from database)
- Contact form → saves to DB + sends email via Resend
- Mobile-responsive design throughout

**NOT in Phase 1:**
- Admin panel (Phase 2)
- User login/accounts (Phase 3)
- Bible Q&A public section (Phase 3)
- Payment processing (Phase 4)
- Order management (Phase 4)

---

## Folder Structure

```
/app
  /shop
    page.tsx                ← /shop
    /[slug]/page.tsx        ← /shop/[product-slug]
  /daily-verse/page.tsx
  /about/page.tsx
  /contact/page.tsx
  /api
    /enquiries/route.ts     ← POST: save enquiry + send email
    /verses/route.ts        ← GET: today's verse
  layout.tsx
  page.tsx                  ← Homepage

/components
  ProductCard.tsx
  VerseDisplay.tsx
  Navbar.tsx
  Footer.tsx
  ContactForm.tsx

/lib
  supabase.ts               ← Supabase client
  products.ts               ← Product DB queries
  verses.ts                 ← Verse DB queries
  email.ts                  ← Resend email helpers

/types
  index.ts                  ← All TypeScript interfaces
```

---

## Database Tables (Supabase)

### `products`
```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
name text NOT NULL
description text
price decimal(10,2) NOT NULL
currency text DEFAULT 'USD'
category text CHECK (category IN ('bible','book','clothing','accessory','other'))
image_url text
slug text UNIQUE NOT NULL
is_available boolean DEFAULT true
created_at timestamptz DEFAULT now()
updated_at timestamptz DEFAULT now()
```

### `daily_verses`
```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
verse_text text NOT NULL
reference text NOT NULL
translation text DEFAULT 'NIV'
scheduled_date date UNIQUE NOT NULL
reflection_note text
created_at timestamptz DEFAULT now()
```

### `enquiries`
```sql
id uuid PRIMARY KEY DEFAULT gen_random_uuid()
name text NOT NULL
email text NOT NULL
subject text
message text NOT NULL
related_product_id uuid REFERENCES products(id)
status text DEFAULT 'new' CHECK (status IN ('new','read','responded'))
created_at timestamptz DEFAULT now()
```

---

## Key TypeScript Types

```typescript
// /types/index.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: 'bible' | 'book' | 'clothing' | 'accessory' | 'other';
  imageUrl: string;
  slug: string;
  isAvailable: boolean;
  createdAt: string;
}

export interface DailyVerse {
  id: string;
  verseText: string;
  reference: string;
  translation: string;
  scheduledDate: string;
  reflectionNote?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  relatedProductId?: string;
  status: 'new' | 'read' | 'responded';
  createdAt: string;
}
```

---

## Coding Conventions (Summary)

- **TypeScript everywhere** — no `any` types
- **Components:** PascalCase filenames, one per file, typed props interface
- **DB queries:** in `/lib/*.ts` helpers only — never inline in components or pages
- **API routes:** always use try/catch, return proper HTTP status codes
- **Tailwind:** use `brand-*` colour classes (defined in `tailwind.config.ts`), never hardcode hex
- **Naming:** descriptive variable names — `featuredProducts` not `data`, `handleSubmit` not `fn`
- **Commits:** format `feat:`, `fix:`, `style:`, `content:`, `docs:`

---

## Important Constraints

1. **Mobile-first** — most CTC users will be on mobile phones. Every component must work at 375px viewport width before being styled for larger screens.
2. **No payments in Phase 1** — products use enquiry flow only
3. **Admin routes protected** — all `/admin/*` routes redirect to `/admin/login` if no session
4. **Supabase RLS** — public users can only SELECT from `products`, `daily_verses`. They cannot INSERT, UPDATE, or DELETE. Only service role key can do that (server-side only).
5. **Never commit `.env.local`** — all secrets stay in environment variables

---

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
CTC_ADMIN_EMAIL=
NEXT_PUBLIC_SITE_URL=
```

---

## Current Status

> Update this section as you progress through development.

| Item | Status |
|---|---|
| Project setup (Next.js + Supabase) | 🔄 In progress |
| Tailwind + brand colours configured | ⬜ Not started |
| Database tables created | ⬜ Not started |
| Navbar + Footer components | ⬜ Not started |
| Homepage | ⬜ Not started |
| Shop page | ⬜ Not started |
| Product detail page | ⬜ Not started |
| Daily verse page | ⬜ Not started |
| Contact form + API | ⬜ Not started |
| About page | ⬜ Not started |
| Deployed to Vercel | ⬜ Not started |

Status codes: ⬜ Not started | 🔄 In progress | ✅ Done | ⚠️ Blocked
