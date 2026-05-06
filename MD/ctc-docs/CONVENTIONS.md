# Coding Conventions — Connected Through Christ Platform

**Project:** Connected Through Christ Platform  
**Last Updated:** May 2026  

> This document defines how code should be written and organised. Following these conventions means the AI agent and any future developer (including future-you) can read and continue your code without confusion.

---

## Guiding Principle

> Write code that your future self — six months from now, with no memory of writing it — can understand in under 60 seconds.

---

## File & Folder Naming

| What | Convention | Example |
|---|---|---|
| React component files | PascalCase | `ProductCard.tsx`, `VerseDisplay.tsx` |
| Page files (Next.js) | lowercase | `page.tsx`, `layout.tsx` |
| API route files | lowercase | `route.ts` |
| Utility/helper files | camelCase | `formatPrice.ts`, `getVerse.ts` |
| Type definition files | camelCase | `productTypes.ts` |
| Environment files | UPPER_SNAKE_CASE | `.env.local` |
| CSS / style files | camelCase | `globals.css` |

---

## Component Conventions

### Always use TypeScript interfaces for props

```typescript
// ✅ Correct
interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  category: 'bible' | 'book' | 'clothing' | 'accessory' | 'other';
  slug: string;
}

export function ProductCard({ name, price, imageUrl, category, slug }: ProductCardProps) {
  // ...
}

// ❌ Avoid
export function ProductCard(props: any) {
  // any = no type safety = bugs you won't catch until they happen
}
```

---

### One component per file

```
/components
  ProductCard.tsx      ← Only the ProductCard component
  VerseDisplay.tsx     ← Only the VerseDisplay component
  Navbar.tsx           ← Only the Navbar
```

---

### Keep components small and focused

If a component exceeds ~100 lines, consider splitting it.

```typescript
// ✅ Better: composed of smaller pieces
export function ProductDetailPage({ product }: Props) {
  return (
    <main>
      <ProductImages images={product.images} />
      <ProductInfo product={product} />
      <EnquiryButton productName={product.name} />
    </main>
  );
}

// ❌ Avoid: one massive component doing everything
```

---

## TypeScript Conventions

### Define all data types in `/types/index.ts`

```typescript
// /types/index.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  imageUrl: string;
  isAvailable: boolean;
  createdAt: string;
}

export type ProductCategory = 'bible' | 'book' | 'clothing' | 'accessory' | 'other';

export interface DailyVerse {
  id: string;
  verseText: string;
  reference: string;
  translation: string;
  scheduledDate: string;
  reflectionNote?: string;  // ? means optional
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

### Use camelCase for TypeScript properties, snake_case for database columns

The database uses `snake_case` (e.g. `image_url`, `is_available`). Your TypeScript types use `camelCase`. The Supabase helper in `/lib/supabase.ts` handles the conversion.

```typescript
// Database returns: { image_url: "...", is_available: true }
// Your TypeScript type: { imageUrl: "...", isAvailable: true }
```

---

## Naming Variables & Functions

Use names that explain what something IS or DOES:

```typescript
// ✅ Clear
const featuredProducts = await getFeaturedProducts();
const todayVerse = await getVerseForDate(today);
const isLoading = true;
const handleEnquirySubmit = async (data: EnquiryFormData) => { ... };

// ❌ Unclear
const data = await fetchStuff();
const x = true;
const doThing = async () => { ... };
```

---

## API Routes Convention

All API routes live in `/app/api/` and follow this pattern:

```typescript
// /app/api/enquiries/route.ts

import { NextRequest, NextResponse } from 'next/server';

// GET /api/enquiries
export async function GET(request: NextRequest) {
  try {
    // logic here
    return NextResponse.json({ data: enquiries }, { status: 200 });
  } catch (error) {
    console.error('GET /api/enquiries error:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

// POST /api/enquiries
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // validate + save
    return NextResponse.json({ data: newEnquiry }, { status: 201 });
  } catch (error) {
    console.error('POST /api/enquiries error:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
```

Rules:
- Always wrap in `try/catch`
- Always return meaningful status codes (200, 201, 400, 401, 500)
- Always log errors with context (`console.error('where it happened:', error)`)
- Never expose raw error messages to the client in production

---

## Supabase Query Convention

All Supabase queries go in `/lib/` helper files — never directly in components.

```typescript
// /lib/products.ts

import { supabase } from './supabase';
import type { Product } from '@/types';

export async function getAvailableProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_available', true)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch products: ${error.message}`);
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_available', true)
    .single();

  if (error) return null;
  return data;
}
```

---

## Tailwind CSS Conventions

### Define brand colours in `tailwind.config.ts`

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      brand: {
        primary: '#1B3A6B',    // CTC navy blue (update with actual brand colour)
        accent: '#C8A44A',     // CTC gold (update with actual brand colour)
        light: '#F5F0E8',      // CTC cream background
      }
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],  // Update with CTC brand font
    }
  }
}
```

Then use `bg-brand-primary`, `text-brand-accent` etc. — never hardcode hex values in components.

---

### Group Tailwind classes logically

```tsx
// ✅ Grouped: layout → spacing → typography → colour → interactivity
<button className="
  flex items-center justify-center
  px-6 py-3 rounded-lg
  text-sm font-semibold
  bg-brand-primary text-white
  hover:bg-brand-primary/90 transition-colors duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Enquire Now
</button>
```

---

## Git Commit Message Convention

Format: `type: short description`

| Type | When to use |
|---|---|
| `feat` | Adding a new feature |
| `fix` | Fixing a bug |
| `style` | CSS/styling changes only |
| `refactor` | Restructuring code (no feature change) |
| `content` | Adding or updating content (verses, products) |
| `docs` | Updating documentation |
| `chore` | Config, dependencies, tooling |

**Examples:**
```
feat: add product category filter to shop page
fix: daily verse fallback when no verse scheduled for today
style: update product card hover state
content: add 10 daily verses for June 2026
docs: update DATA_MODELS with Order schema
```

---

## What to Do When You Don't Understand Something

1. **Ask the AI agent** — paste the code and ask "explain this to me like I'm learning to code"
2. **Write it in your LEARNING_LOG.md** — note the concept, the explanation, and an example
3. **Don't copy code you don't understand** — ask the agent to walk through it line by line
4. **Look it up** — Next.js docs, Supabase docs, and MDN are your three best references

> The goal of these conventions is not to be restrictive — it's to make sure that when you come back to code you wrote two weeks ago, you can still read it.
