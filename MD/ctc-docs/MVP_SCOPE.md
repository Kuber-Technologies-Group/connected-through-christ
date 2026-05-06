# MVP Scope — Phase 1 & 2

**Project:** Connected Through Christ Platform  
**Phase:** 1 (Launch Website) + 2 (Admin Control Panel)  
**Target Duration:** 5–7 weeks  
**Last Updated:** May 2026  

---

## Guiding Principle

> Ship the smallest version that is genuinely useful to real community members. Everything else is Phase 3 or later.

---

## Phase 1 — What Is IN Scope

These are the only things that will be built in Phase 1. Nothing else.

### Pages

| Page | Description |
|---|---|
| Homepage | Introduces CTC, features the daily verse, links to shop and contact |
| Shop / Product Listing | Displays all products with photo, name, price, and category filter |
| Product Detail Page | Single product view with description and enquiry option |
| Daily Verse Page | Displays current verse with date; shows recent past verses |
| Contact / Enquiry Page | Simple form: name, email, message, submit |
| About Page | CTC's story, mission, and the team |

### Features

- [ ] Mobile-responsive design on all pages
- [ ] Product browsing (no payment processing yet — enquiry-based ordering)
- [ ] Daily verse displayed on homepage and its own page
- [ ] Contact form that sends an email notification to the CTC team
- [ ] Basic navigation: Home, Shop, Daily Verse, Contact

### Not In Phase 1 (Hard Boundary)

| Feature | Reason |
|---|---|
| Online payments | Requires payment provider integration — Phase 4 |
| User accounts / login | Not needed until community features — Phase 3 |
| Bible Q&A (public) | Requires moderation workflow — Phase 3 |
| Comment sections | Phase 3 |
| Brand advertising section | Phase 2 (admin panel needed first) |
| Order tracking | Phase 4 |

---

## Phase 2 — Admin Control Panel (What Is IN Scope)

Phase 2 adds the ability for CTC to manage their own platform without developer help.

### Admin Dashboard Features

| Feature | What It Does |
|---|---|
| Product management | Add, edit, delete products (name, price, photo, description, category) |
| Daily verse scheduler | Add a verse for any date; system shows correct verse each day |
| Advert management | Upload and manage brand adverts (image, link, active/inactive toggle) |
| Enquiry inbox | View and respond to contact form submissions |
| Basic analytics view | Page views, most visited products (simple, no third-party tools) |

### Admin Access Rules

- Admin panel is only accessible via a private URL (e.g. `/admin`)
- Protected by username and password
- Only CTC-authorised users can log in
- No public registration

---

## Definition of Done — Phase 1

Phase 1 is complete when ALL of the following are true:

- [ ] The website is deployed and live on a real URL
- [ ] All 6 pages are built and working on mobile and desktop
- [ ] The contact form sends a real email
- [ ] At least 5 products are displayed in the shop
- [ ] A daily verse is visible on the homepage
- [ ] The site loads in under 3 seconds on a standard mobile connection
- [ ] CTC has reviewed and approved the design

## Definition of Done — Phase 2

Phase 2 is complete when ALL of the following are true:

- [ ] Admin can log in securely
- [ ] Admin can add/edit/delete a product without developer help
- [ ] Admin can schedule a verse for a future date
- [ ] Admin can upload and activate/deactivate an advert
- [ ] Admin can view enquiries submitted through the contact form

---

## Decisions Still Needed from CTC Before Phase 1 Can Begin

| Decision | Why It's Needed |
|---|---|
| Logo files (PNG + SVG) | Required for header and favicon |
| Brand colours (hex codes or reference) | Required for all design work |
| Product list (names, prices, photos, descriptions) | Required to populate the shop |
| First 10–20 daily verses (with dates) | Required to launch the daily verse section |
| Domain name preference | Required for deployment |
| Admin email address | Required for contact form delivery |
