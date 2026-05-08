# CTC Platform — Project Setup Guide

## Step 1: Create the Next.js Project

In your terminal, run:

```bash
npx create-next-app@14 ctc-platform \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd ctc-platform
```

---

## Step 2: Install Dependencies

```bash
npm install @supabase/supabase-js resend
```

---

## Step 3: Copy Project Files

Copy the files from this output into your project, matching the folder structure:

```
tailwind.config.ts        → replace the generated one
app/globals.css           → replace the generated one
app/layout.tsx            → replace the generated one
app/api/enquiries/route.ts → new file
components/Navbar.tsx     → new file
components/Footer.tsx     → new file
components/ProductCard.tsx → new file
components/VerseDisplay.tsx → new file
components/ContactForm.tsx → new file
lib/supabase.ts           → new file
lib/products.ts           → new file
lib/verses.ts             → new file
lib/email.ts              → new file
types/index.ts            → new file
database/setup.sql        → run in Supabase (not in project folder)
```

---

## Step 4: Set Up Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:

1. **Supabase URL & Anon Key** — Supabase Dashboard → Settings → API
2. **Supabase Service Role Key** — same page (keep this secret)
3. **Resend API Key** — https://resend.com → API Keys
4. **CTC Admin Email** — the email that receives enquiry notifications

---

## Step 5: Set Up the Database

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Paste the entire contents of `database/setup.sql`
4. Click **Run**

This creates all tables, RLS policies, and seed data.

---

## Step 6: Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 — you should see the site running.

---

## Step 7: Verify Everything Works

- [ ] Homepage loads without errors
- [ ] No TypeScript errors in the terminal
- [ ] Supabase connection works (products appear from seed data)
- [ ] Contact form submits (check your admin email)

---

## What's Next

Once setup is confirmed working, the next session will build:

1. **Homepage** (`app/page.tsx`) — hero, verse, featured products
2. **Shop page** (`app/shop/page.tsx`) — product grid with category filter
3. **Product detail page** (`app/shop/[slug]/page.tsx`)
4. **Daily Verse page** (`app/daily-verse/page.tsx`)
5. **Contact page** (`app/contact/page.tsx`)
6. **About page** (`app/about/page.tsx`)
