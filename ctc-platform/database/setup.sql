-- ============================================================
-- CTC Platform — Supabase Database Setup
-- Run this entire file in the Supabase SQL Editor
-- Project: Connected Through Christ Platform
-- ============================================================


-- ─── PRODUCTS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  description   TEXT,
  price         DECIMAL(10, 2) NOT NULL,
  currency      TEXT NOT NULL DEFAULT 'USD',
  category      TEXT NOT NULL CHECK (category IN ('bible', 'book', 'clothing', 'accessory', 'other')),
  image_url     TEXT,
  slug          TEXT UNIQUE NOT NULL,
  is_available  BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ─── DAILY VERSES ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS daily_verses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verse_text      TEXT NOT NULL,
  reference       TEXT NOT NULL,
  translation     TEXT NOT NULL DEFAULT 'NIV',
  scheduled_date  DATE UNIQUE NOT NULL,  -- UNIQUE enforces one verse per date
  reflection_note TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── ENQUIRIES ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enquiries (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  email               TEXT NOT NULL,
  subject             TEXT,
  message             TEXT NOT NULL,
  related_product_id  UUID REFERENCES products(id) ON DELETE SET NULL,
  status              TEXT NOT NULL DEFAULT 'new'
                        CHECK (status IN ('new', 'read', 'responded')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── ADVERTISEMENTS ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS advertisements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name  TEXT NOT NULL,
  image_url   TEXT NOT NULL,
  link_url    TEXT NOT NULL,
  placement   TEXT NOT NULL CHECK (placement IN ('homepage', 'shop', 'sidebar', 'footer')),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  start_date  DATE,
  end_date    DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ─── ROW LEVEL SECURITY (RLS) ─────────────────────────────────────────────────
-- Enable RLS on all tables — public can only read specific data

ALTER TABLE products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_verses   ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries      ENABLE ROW LEVEL SECURITY;
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

-- Products: public can read available products only
CREATE POLICY "Public can read available products"
  ON products FOR SELECT
  USING (is_available = true);

-- Daily Verses: public can read all verses
CREATE POLICY "Public can read daily verses"
  ON daily_verses FOR SELECT
  TO anon
  USING (true);

-- Enquiries: public can INSERT only (not read)
CREATE POLICY "Public can submit enquiries"
  ON enquiries FOR INSERT
  TO anon
  WITH CHECK (true);

-- Advertisements: public can read active ads within date range
CREATE POLICY "Public can read active advertisements"
  ON advertisements FOR SELECT
  TO anon
  USING (
    is_active = true
    AND (start_date IS NULL OR start_date <= CURRENT_DATE)
    AND (end_date IS NULL OR end_date >= CURRENT_DATE)
  );


-- ─── SAMPLE DATA ─────────────────────────────────────────────────────────────
-- Seed data to verify the setup works.
-- Remove or update before going live.

INSERT INTO products (name, description, price, currency, category, slug, image_url) VALUES
  ('KJV Study Bible', 'A beautifully printed King James Version Study Bible with commentary and concordance. Perfect for personal study and devotional time.', 25.00, 'USD', 'bible', 'kjv-study-bible', ''),
  ('NIV Life Application Bible', 'The bestselling Life Application Bible in the New International Version. Includes thousands of notes and application insights.', 30.00, 'USD', 'bible', 'niv-life-application-bible', ''),
  ('Devotional Diary 2026', 'A guided daily devotional journal for the year 2026, featuring Scripture prompts, reflection questions, and prayer space.', 12.00, 'USD', 'book', 'devotional-diary-2026', ''),
  ('CTC Branded T-Shirt', 'Premium quality t-shirt with the Connected Through Christ logo. Available in navy and white.', 18.00, 'USD', 'clothing', 'ctc-branded-t-shirt', ''),
  ('Faith Over Fear Bracelet', 'Handcrafted wristband with "Faith Over Fear" engraved. A daily reminder of God''s faithfulness.', 8.00, 'USD', 'accessory', 'faith-over-fear-bracelet', '');

INSERT INTO daily_verses (verse_text, reference, translation, scheduled_date, reflection_note) VALUES
  ('For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.', 'John 3:16', 'NIV', CURRENT_DATE,
   'This is perhaps the most well-known verse in the Bible. Today, let it sink in not as a familiar phrase, but as a personal promise — God''s love is for you.'),
  ('The Lord is my shepherd, I lack nothing.', 'Psalm 23:1', 'NIV', CURRENT_DATE - 1,
   'David wrote this from experience as a shepherd himself. He knew what it meant to guide and protect sheep. He trusted God would do the same for him.'),
  ('I can do all this through him who gives me strength.', 'Philippians 4:13', 'NIV', CURRENT_DATE - 2,
   'Paul wrote these words from prison — not from a place of abundance, but of hardship. True strength is not self-generated. It flows from Christ.'),
  ('Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.', 'Proverbs 3:5-6', 'NIV', CURRENT_DATE - 3, NULL),
  ('Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.', 'Joshua 1:9', 'NIV', CURRENT_DATE - 4, NULL);
