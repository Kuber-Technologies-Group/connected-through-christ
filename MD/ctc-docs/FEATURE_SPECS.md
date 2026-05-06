# Feature Specifications — Connected Through Christ Platform

**Project:** Connected Through Christ Platform  
**Last Updated:** May 2026  

---

## How to Use This Document

Each feature is described from three perspectives:
1. **What the user sees and does** — the experience
2. **What the system does** — the behaviour
3. **Acceptance criteria** — how we know it's working correctly

Phase labels: 🟢 Phase 1 | 🔵 Phase 2 | 🟡 Phase 3 | 🔴 Phase 4

---

## 🟢 F-01: Product Browse & Listing

**Summary:** Visitors can browse all CTC products, filter by category, and click into individual products.

### User Experience
- Visitor lands on `/shop`
- Sees a grid of product cards, each showing: image, name, category badge, price
- Can click category tabs (All / Bibles / Books / Clothing / Accessories) to filter
- Can click a product card to go to its detail page

### System Behaviour
- Fetches all products from the database where `is_available = true`
- Default sort: newest first (`created_at DESC`)
- If no products in a category, shows a friendly empty message
- Product images are loaded from Supabase Storage

### Acceptance Criteria
- [ ] Grid shows correctly on mobile (1 column), tablet (2 columns), desktop (3–4 columns)
- [ ] Category filter updates the list without a full page reload
- [ ] Clicking a product navigates to the correct detail page
- [ ] Products with `is_available = false` never appear publicly
- [ ] Page loads in under 2 seconds with 20 products

---

## 🟢 F-02: Product Detail Page

**Summary:** A dedicated page for each product showing full information and an enquiry option.

### User Experience
- Visitor sees: large product image, name, price, category, full description
- "Enquire About This Product" button opens or links to contact form, pre-filled with product name
- Back link returns to the shop

### System Behaviour
- Route: `/shop/[product-slug]`
- Slug is generated from the product name (e.g. "KJV Study Bible" → `kjv-study-bible`)
- Page is statically generated at build time (fast loading)
- If product doesn't exist or is unavailable, shows a 404 page

### Acceptance Criteria
- [ ] All product fields display correctly
- [ ] Enquiry button pre-fills the product name in the contact form
- [ ] 404 shown for invalid slugs
- [ ] Page is shareable (correct URL, preview image for social sharing)

---

## 🟢 F-03: Daily Verse Display

**Summary:** A Bible verse is shown every day on the homepage and on the Daily Verse page.

### User Experience
- Homepage shows today's verse prominently in a styled block
- `/daily-verse` page shows today's verse in full (reference, translation, optional reflection)
- Below today's verse: archive list of the last 30 days

### System Behaviour
- Fetches the verse where `scheduled_date = today`
- If no verse scheduled for today, falls back to the most recent past verse
- Archive is sorted newest-to-oldest, max 30 entries
- Verse text wraps gracefully for long passages

### Acceptance Criteria
- [ ] Correct verse shown for today's date
- [ ] Fallback works when today has no verse scheduled
- [ ] Archive shows up to 30 past verses
- [ ] Verse and reference display correctly on mobile
- [ ] Long verse passages don't overflow their container

---

## 🟢 F-04: Contact & Enquiry Form

**Summary:** Any visitor can send a message or product enquiry to the CTC team.

### User Experience
- Visitor fills in: Name (required), Email (required), Subject (optional), Message (required)
- Clicks Submit
- Sees a success message: "Thank you! We'll be in touch soon."
- If errors, sees inline validation messages (e.g. "Email is required")

### System Behaviour
- On submit, form data is sent to `/api/enquiries`
- API saves the enquiry to the database with `status: new`
- API sends an email notification to the CTC admin email via Resend
- API sends a confirmation email to the submitter
- Form is reset after successful submission
- Rate limiting: max 5 submissions per IP per hour (prevents spam)

### Acceptance Criteria
- [ ] All required fields validated before submission
- [ ] Email format validated (must include @)
- [ ] Success message shown after submit
- [ ] Enquiry appears in the database with `status: new`
- [ ] Admin receives email notification within 30 seconds
- [ ] Submitter receives confirmation email
- [ ] Form cannot be submitted twice by double-clicking

---

## 🔵 F-05: Admin Product Management

**Summary:** Admin can add, edit, deactivate, and delete products without developer involvement.

### User Experience
- Admin navigates to `/admin/products`
- Sees a table of all products with status, price, and action buttons
- Clicks "Add Product" → form with: Name, Description, Price, Category, Image upload, Availability toggle
- Can edit any existing product
- Can toggle availability (hides/shows on public site) without deleting
- Can delete a product (with confirmation prompt)

### System Behaviour
- Image is uploaded to Supabase Storage; `image_url` is saved to database
- Toggling availability updates `is_available` instantly
- Deleting a product removes it from the database (soft delete preferred — set a `deleted_at` field)
- All changes are immediate (no caching delay)

### Acceptance Criteria
- [ ] Admin can create a product with all fields
- [ ] Image upload works and displays preview before saving
- [ ] Toggling availability reflects on the public shop immediately
- [ ] Editing saves changes correctly
- [ ] Deleted products do not appear publicly
- [ ] Only logged-in admins can access these routes

---

## 🔵 F-06: Daily Verse Scheduler

**Summary:** Admin can schedule Bible verses for future dates from the admin panel.

### User Experience
- Admin navigates to `/admin/verses`
- Sees a calendar or list view showing which dates have verses scheduled
- Dates without a verse are visually highlighted (warning/red)
- Clicks "Add Verse" → form with: Date picker, Verse text, Reference, Translation, Reflection note (optional)
- Can edit or delete a scheduled verse

### System Behaviour
- Validates that only one verse per date can be saved (database constraint)
- Admin can schedule verses months in advance
- Changes take effect on the scheduled date automatically

### Acceptance Criteria
- [ ] Admin can schedule a verse for any future date
- [ ] Date picker prevents duplicate scheduling (warns if date already has a verse)
- [ ] Dates without a verse are visible and easy to spot
- [ ] Verse is shown correctly on the public site on the scheduled date
- [ ] Editing a verse updates it immediately

---

## 🔵 F-07: Advert Management

**Summary:** Admin can upload, manage, and toggle advertisements from Christian brands.

### User Experience
- Admin sees list of all adverts: brand name, placement, active status, date range
- Can add new advert: Brand name, Image upload, Link URL, Placement, Start/End dates, Active toggle
- Can activate/deactivate without deleting
- Can delete an advert

### System Behaviour
- Adverts are shown on the public site only when `is_active = true` AND current date is within `start_date` and `end_date`
- Multiple adverts in the same placement rotate (random order on each page load)

### Acceptance Criteria
- [ ] Advert image uploads and saves correctly
- [ ] Active toggle works immediately
- [ ] Date range respected (advert not shown before `start_date` or after `end_date`)
- [ ] Multiple adverts in same placement rotate
- [ ] Inactive adverts never appear publicly

---

## 🟡 F-08: Bible Q&A — Public Submission

**Summary:** Community members can submit Bible questions through the website.

### User Experience
- Visitor navigates to `/q-and-a`
- Sees a list of published answered questions (browsable)
- Clicks "Submit a Question"
- Fills in: Question (required), Name/alias (optional), Email (optional)
- Sees confirmation: "Your question has been submitted. We'll publish an answer soon."

### System Behaviour
- Submission saved to `BibleQuestion` table with `status: pending`
- Admin receives email notification of new question
- Question is NOT publicly visible until admin sets `status: published`

### Acceptance Criteria
- [ ] Question submits and saves to database
- [ ] Admin notified by email
- [ ] Submitted question not visible on public site until published
- [ ] Form validates that question field is not empty

---

## 🟡 F-09: Bible Q&A — Admin Response & Publishing

**Summary:** Admin can read submitted questions, write answers, and publish them publicly.

### User Experience
- Admin navigates to `/admin/questions`
- Sees list: pending questions first, then answered, then published
- Clicks a question to open it
- Writes an answer in a text editor
- Clicks "Publish" → question and answer become publicly visible
- Can unpublish or edit at any time

### Acceptance Criteria
- [ ] Answer saves correctly
- [ ] Published Q&A visible at `/q-and-a`
- [ ] Each Q&A has its own shareable URL (`/q-and-a/[slug]`)
- [ ] Admin can unpublish without deleting

---

## 🔴 F-10: Online Payment Processing

**Summary:** Customers can pay for products directly on the website. (Phase 4)

> Full specification to be written when Phase 4 begins.  
> Requires: payment provider selection, regional availability check, webhook setup.

**Known requirements:**
- Secure, PCI-compliant payment processing
- Support for local payment methods (region-dependent)
- Order confirmation emails
- Stock/availability management
- Basic order management for CTC admin
