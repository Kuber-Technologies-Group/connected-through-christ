# Site Map — Connected Through Christ Platform

**Project:** Connected Through Christ Platform  
**Last Updated:** May 2026  

---

## Route Overview

```
ctc.com/
├── /                          → Homepage
├── /shop                      → Product listing (all products)
│   └── /shop/[product-slug]   → Individual product detail page
├── /daily-verse               → Today's verse + archive
├── /about                     → About CTC
├── /contact                   → Contact & enquiry form
├── /q-and-a                   → Bible Q&A (Phase 3)
│   └── /q-and-a/[slug]        → Individual answered question (Phase 3)
│
└── /admin                     → Admin panel (protected, Phase 2)
    ├── /admin/login           → Login page
    ├── /admin/dashboard       → Overview stats
    ├── /admin/products        → Manage products
    │   ├── /admin/products/new
    │   └── /admin/products/[id]/edit
    ├── /admin/verses          → Manage daily verses
    │   └── /admin/verses/new
    ├── /admin/adverts         → Manage advertisements
    │   ├── /admin/adverts/new
    │   └── /admin/adverts/[id]/edit
    ├── /admin/enquiries       → View & respond to enquiries
    │   └── /admin/enquiries/[id]
    └── /admin/questions       → Manage Q&A submissions (Phase 3)
        └── /admin/questions/[id]
```

---

## Public Pages Detail

### `/` — Homepage

**Purpose:** First impression. Communicates CTC's mission and draws visitors into the platform.

**Sections:**
1. Hero banner — tagline, CTA buttons ("Shop Now", "Today's Verse")
2. Today's Daily Verse — featured prominently
3. Featured Products — 3–4 highlighted products
4. About CTC — short paragraph + link to About page
5. Christian Brand Adverts section (Phase 2 activation)
6. Footer — navigation links, social links, contact info

---

### `/shop` — Product Listing

**Purpose:** Browse all available products.

**Sections:**
1. Page heading + category filter tabs (All / Bibles / Books / Clothing / Accessories)
2. Product grid — each card shows: image, name, price, "View Details" button
3. Empty state message if no products in a category

**Rules:**
- Only shows products where `is_available = true`
- Sorted by newest first by default

---

### `/shop/[product-slug]` — Product Detail

**Purpose:** Full information on a single product with a way to enquire.

**Sections:**
1. Product image (large)
2. Product name, price, category badge
3. Full description
4. "Enquire About This Product" button → opens enquiry form pre-filled with product name
5. Related products (optional, Phase 2)

---

### `/daily-verse` — Daily Verse

**Purpose:** Spiritual anchor for daily visitors.

**Sections:**
1. Today's verse (large, styled prominently)
2. Reference + translation
3. Optional reflection note from CTC
4. Archive list — past 30 days of verses

---

### `/about` — About CTC

**Purpose:** Build trust and communicate the ministry's story.

**Sections:**
1. CTC's story and founding
2. Mission and values
3. The team (optional photos + names)
4. CTA — "Join our community" or "Browse the shop"

---

### `/contact` — Contact & Enquiry

**Purpose:** Allow anyone to get in touch with CTC.

**Sections:**
1. Short intro text
2. Contact form: Name, Email, Subject (optional), Message
3. Submit button
4. Success message after submission

**On submit:**
- Saves enquiry to database with `status: new`
- Sends email notification to CTC admin email

---

### `/q-and-a` — Bible Q&A (Phase 3)

**Purpose:** Community space for faith questions and answers.

**Sections:**
1. Intro — what this space is for
2. "Submit a Question" button/form
3. Published Q&A list — question + short answer preview
4. Category/topic filter (optional)

---

## Admin Pages Detail

All `/admin/*` routes require authentication. Unauthenticated users are redirected to `/admin/login`.

### `/admin/dashboard`
- Total products, verses scheduled, unread enquiries, active adverts
- Quick links to add new product / add verse

### `/admin/products`
- Table of all products with: name, category, price, availability toggle, edit/delete actions
- "Add Product" button

### `/admin/verses`
- Calendar or list view of scheduled verses
- Shows dates with no verse in red/warning state
- "Add Verse" button

### `/admin/adverts`
- List of all adverts with: brand name, placement, active status, date range
- Toggle active/inactive inline
- "Add Advert" button

### `/admin/enquiries`
- List of all enquiries sorted by newest, with status badge (New / Read / Responded)
- Click to open full enquiry and write a response
- Response is sent by email and status updated

---

## Navigation Structure

**Public header navigation:**
```
[CTC Logo]    Home | Shop | Daily Verse | About | Contact
```

**Mobile navigation:**
- Hamburger menu opening to same links
- Today's verse teaser in mobile menu (optional)

**Footer navigation:**
```
Shop        |  Community    |  Info
-------     |  ----------   |  ----
All Products|  Daily Verse  |  About
Bibles      |  Q&A (Ph3)    |  Contact
Clothing    |               |  Privacy Policy
Books       |               |
```
