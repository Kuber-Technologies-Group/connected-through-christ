# Learning Log — Connected Through Christ Platform

**Purpose:** Every time you encounter something you don't fully understand while building this project, write it here. Ask the AI agent to explain it, then write the explanation in your own words. This becomes your personal engineering reference — built from real code you actually worked on.

---

## How to Use This File

1. When you see code or a concept you don't understand, write a question here
2. Ask the AI: *"Explain [concept] to me as if I'm learning to code, using our CTC project as the example"*
3. Write the answer in your own words under the question
4. Add a code example from the actual CTC codebase when possible

---

## Template Entry

```markdown
### [Concept Name]
**Date learned:** YYYY-MM-DD  
**Where I encountered it:** e.g. ProductCard.tsx, Supabase setup

**My question:**
[What confused me]

**What it actually means:**
[Explanation in my own words]

**Example from our project:**
[Code snippet]

**Why it matters:**
[How this affects what we're building]
```

---

## Entries

> Start adding entries here as you build. Below are a few starter entries for concepts you will definitely encounter early.

---

### What is a React Component?
**Date learned:** _fill in_  
**Where I encountered it:** Every `.tsx` file in `/components`

**My question:**
What exactly is a "component" and why do we split code into them?

**What it actually means:**
A component is a reusable piece of UI — like a LEGO brick. Instead of writing the same HTML for a product card 20 times (once for each product), I write a `ProductCard` component once and reuse it 20 times, just passing different data (name, price, image) each time.

**Example from our project:**
```tsx
// I write this ONCE:
function ProductCard({ name, price, imageUrl }: ProductCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>R{price}</p>
    </div>
  );
}

// Then use it like this for every product:
<ProductCard name="KJV Bible" price={250} imageUrl="/bibles/kjv.jpg" />
<ProductCard name="Devotional Diary" price={120} imageUrl="/books/diary.jpg" />
```

**Why it matters:**
If I want to change how every product card looks, I change it in ONE place and it updates everywhere.

---

### What are Props?
**Date learned:** _fill in_  
**Where I encountered it:** Every component file

**My question:**
What does "props" mean and why do components need them?

**What it actually means:**
Props (short for "properties") are the data you pass into a component when you use it — like filling in a form. The component defines what information it needs, and you provide it each time you use it.

**Example from our project:**
```tsx
// Component says: "I need a name, price, and imageUrl"
interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
}

// When I use it, I provide those values:
<ProductCard name="KJV Bible" price={250} imageUrl="/bibles/kjv.jpg" />
//             ↑ prop         ↑ prop       ↑ prop
```

**Why it matters:**
Props are what make components reusable. Without them, ProductCard could only ever show one specific product.

---

### What is async/await?
**Date learned:** _fill in_  
**Where I encountered it:** All database queries in `/lib/products.ts`

**My question:**
Why do we write `async` and `await` everywhere? What does it mean?

**What it actually means:**
Some operations take time — like fetching data from Supabase. `async/await` lets us say: "wait for this to finish before continuing, but don't freeze the whole page while you wait."

- `async` on a function means: "this function does something that takes time"
- `await` before a call means: "wait for THIS specific thing to finish"

**Example from our project:**
```typescript
// Without async/await (wrong - gets the result before Supabase responds)
function getProducts() {
  const result = supabase.from('products').select('*'); // returns a Promise, not data!
  return result; // this is NOT the actual products
}

// With async/await (correct - waits for Supabase to respond)
async function getProducts() {
  const { data, error } = await supabase.from('products').select('*'); // waits for data
  return data; // this IS the actual products
}
```

**Why it matters:**
Almost everything involving the database or network requires async/await. Without it, you'd return empty or undefined data every time.

---

### What is TypeScript and why do we get errors?
**Date learned:** _fill in_  
**Where I encountered it:** Every `.ts` and `.tsx` file

**My question:**
Why does TypeScript keep giving me red errors when JavaScript wouldn't?

**What it actually means:**
TypeScript checks that you're using data correctly BEFORE the code runs. If a function expects a `number` and you pass a `string`, TypeScript tells you immediately — instead of the bug showing up later when a user sees broken data.

**Example from our project:**
```typescript
// This function expects a number (price)
function formatPrice(price: number): string {
  return `R${price.toFixed(2)}`;
}

// TypeScript catches this mistake before it runs:
formatPrice("250")  // ❌ Error: 'string' is not assignable to type 'number'
formatPrice(250)    // ✅ Fine
```

**Why it matters:**
When you see a TypeScript error, it's TypeScript saving you from a bug. Fix the type error and the bug is prevented.

---

> Continue adding entries as you build. Good topics to document as you encounter them:
> - What is useState and when do I use it?
> - What is a Supabase RLS policy and how do I write one?
> - What is an API route in Next.js vs a regular page?
> - What is a slug and how do we generate one from a product name?
> - What does `?.` (optional chaining) mean in TypeScript?
> - What is a webhook and how does email delivery work?
