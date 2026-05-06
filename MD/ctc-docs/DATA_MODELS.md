# Data Models — Connected Through Christ Platform

**Project:** Connected Through Christ Platform  
**Last Updated:** May 2026  
**Scope:** Covers all four phases; Phase 1 & 2 models are marked as immediate build targets  

---

## How to Read This Document

Each model below represents a "thing" the system needs to store and work with. Think of each model like a row in a filing cabinet drawer — each one holds specific information about one item.

Fields are described in plain English first, then with their technical type.

**Priority key:**
- 🟢 Build in Phase 1 or 2
- 🟡 Build in Phase 3
- 🔴 Build in Phase 4

---

## 🟢 Product

Represents a single item available in the CTC shop.

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier (auto-generated) |
| `name` | Text | Product name, e.g. "KJV Study Bible" |
| `description` | Long text | Full product description |
| `price` | Decimal | Price in local currency (e.g. 25.00) |
| `currency` | Text | Currency code, e.g. "USD" or "ZAR" |
| `category` | Text (enum) | One of: `bible`, `book`, `clothing`, `accessory`, `other` |
| `image_url` | Text | URL to the product photo |
| `is_available` | Boolean | Whether the product is currently shown in the shop |
| `created_at` | Timestamp | When the product was added |
| `updated_at` | Timestamp | When it was last changed |

**Notes:**
- In Phase 1, no actual payment is taken — products are for display and enquiry only
- `is_available` lets admin hide a product without deleting it

---

## 🟢 DailyVerse

Represents a Bible verse or scripture passage scheduled for a specific date.

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier |
| `verse_text` | Long text | The full verse text |
| `reference` | Text | e.g. "John 3:16" or "Psalm 23:1-3" |
| `translation` | Text | Bible translation, e.g. "NIV", "KJV", "ESV" |
| `scheduled_date` | Date | The date this verse should be displayed |
| `reflection_note` | Long text (optional) | Optional short commentary from CTC team |
| `created_at` | Timestamp | When it was added |

**Notes:**
- Only one verse per date should exist (enforced at database level)
- Admin should be able to schedule verses weeks in advance
- If no verse is scheduled for today, the system falls back to the most recent past verse

---

## 🟢 Enquiry

Represents a message submitted through the contact form.

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier |
| `name` | Text | Sender's name |
| `email` | Text | Sender's email address |
| `subject` | Text (optional) | Subject of the message |
| `message` | Long text | The message body |
| `related_product_id` | UUID (optional) | If enquiry is about a specific product |
| `status` | Text (enum) | One of: `new`, `read`, `responded` |
| `created_at` | Timestamp | When submitted |

---

## 🟢 Advertisement

Represents a brand advert managed by the CTC admin team.

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier |
| `brand_name` | Text | Name of the advertising brand/ministry |
| `image_url` | Text | URL to the advert image |
| `link_url` | Text | Where clicking the ad takes the user |
| `placement` | Text (enum) | Where it appears: `homepage`, `shop`, `sidebar`, `footer` |
| `is_active` | Boolean | Whether it is currently being shown |
| `start_date` | Date (optional) | When the advert should start showing |
| `end_date` | Date (optional) | When the advert should stop showing |
| `created_at` | Timestamp | When it was created |

---

## 🟢 AdminUser

Represents a CTC team member who can log into the admin panel.

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier |
| `email` | Text | Login email address |
| `password_hash` | Text | Encrypted password (never stored as plain text) |
| `display_name` | Text | Name shown in the admin panel |
| `role` | Text (enum) | One of: `super_admin`, `editor` |
| `created_at` | Timestamp | When account was created |
| `last_login` | Timestamp | Last successful login |

---

## 🟡 BibleQuestion

Represents a question submitted by a community member (Phase 3).

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier |
| `question_text` | Long text | The question as submitted |
| `submitted_by_name` | Text (optional) | Name or alias of the submitter |
| `submitted_by_email` | Text (optional) | Contact email for the submitter |
| `answer_text` | Long text (optional) | The response from the CTC team |
| `answered_by` | UUID (FK → AdminUser) | Which admin responded |
| `status` | Text (enum) | One of: `pending`, `answered`, `published`, `rejected` |
| `is_published` | Boolean | Whether the answer is visible to the public |
| `created_at` | Timestamp | When submitted |
| `answered_at` | Timestamp | When the answer was written |

---

## 🔴 Order

Represents a customer order (Phase 4 — when payments go live).

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier |
| `customer_name` | Text | Full name of the customer |
| `customer_email` | Text | Customer email for confirmation |
| `customer_phone` | Text (optional) | Phone number |
| `delivery_address` | Long text | Full delivery address |
| `total_amount` | Decimal | Total order value |
| `currency` | Text | Currency code |
| `payment_status` | Text (enum) | One of: `pending`, `paid`, `failed`, `refunded` |
| `payment_reference` | Text | Reference from payment provider |
| `status` | Text (enum) | One of: `new`, `processing`, `shipped`, `delivered`, `cancelled` |
| `notes` | Long text (optional) | Internal notes from CTC team |
| `created_at` | Timestamp | When order was placed |

---

## 🔴 OrderItem

Represents one line in an order (Phase 4).

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique identifier |
| `order_id` | UUID (FK → Order) | Which order this belongs to |
| `product_id` | UUID (FK → Product) | Which product was ordered |
| `quantity` | Integer | How many units |
| `unit_price` | Decimal | Price at time of purchase (important: prices may change) |

---

## Relationships Summary

```
AdminUser ──(responds to)──► BibleQuestion
AdminUser ──(creates)──────► DailyVerse
AdminUser ──(manages)──────► Product
AdminUser ──(manages)──────► Advertisement

Enquiry ──(may reference)──► Product

Order ──(contains)──────────► OrderItem
OrderItem ──(references)────► Product
```

---

## Database: Supabase (PostgreSQL)

All models above map to tables in a Supabase PostgreSQL database. Key principles:

- All primary keys are UUIDs (not auto-increment integers)
- All timestamps are stored in UTC
- Passwords are never stored in plain text — use Supabase Auth or bcrypt
- Row-level security (RLS) will be enabled: public users can only read published content; admin users can read and write everything
