-- ============================================================
-- CTC Platform — Phase 2 Database Migration
-- Run this in the Supabase SQL Editor AFTER the original setup.sql
-- ============================================================

-- 1. Add soft-delete column to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- 2. Update the public products RLS policy to also exclude soft-deleted
DROP POLICY IF EXISTS "Public can read available products" ON products;
CREATE POLICY "Public can read available products"
  ON products FOR SELECT
  USING (is_available = true AND deleted_at IS NULL);

-- 3. Ensure advertisements table exists (may already from setup.sql)
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

ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active advertisements" ON advertisements;
CREATE POLICY "Public can read active advertisements"
  ON advertisements FOR SELECT TO anon
  USING (
    is_active = true
    AND (start_date IS NULL OR start_date <= CURRENT_DATE)
    AND (end_date IS NULL OR end_date >= CURRENT_DATE)
  );

-- 4. Create Supabase Storage bucket for media uploads
-- Run this in the Storage section OR via the dashboard
-- Bucket name: ctc-media (public bucket)
-- If running via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('ctc-media', 'ctc-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'ctc-media');

-- Allow public to read media
CREATE POLICY "Public can read media"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'ctc-media');

-- Allow authenticated users to update/delete their uploads
CREATE POLICY "Authenticated users can manage media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'ctc-media');

CREATE POLICY "Authenticated users can delete media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'ctc-media');
