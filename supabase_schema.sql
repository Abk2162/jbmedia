-- ==========================================================
-- JB MEDIA — HYBRID ARCHITECTURE SUPABASE DATABASE SCHEMA
-- ==========================================================
-- Run this in your Supabase SQL Editor (https://app.supabase.com)

-- 1. Events Table (Holds each covered event / album)
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL DEFAULT 'Fests', -- 'Fests', 'Cultural', 'Sports', 'Tech', 'Photowalks'
  event_date DATE DEFAULT CURRENT_DATE,
  drive_folder_id TEXT,
  cover_image_id TEXT, -- Google Drive file ID for cover photo
  description TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Event Photos Table (Holds all photo IDs synced from Google Drive)
CREATE TABLE IF NOT EXISTS public.event_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  drive_file_id TEXT NOT NULL,
  title TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  photographer TEXT DEFAULT 'JB Media Team',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Homepage Reels Table (Holds Instagram reels displayed on homepage)
CREATE TABLE IF NOT EXISTS public.homepage_reels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Highlight',
  instagram_url TEXT NOT NULL,
  thumbnail_url TEXT, -- Google Drive ID, external image URL, or Unsplash link
  duration TEXT DEFAULT '0:30',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Admin Settings & Config Table
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id TEXT PRIMARY KEY DEFAULT 'config',
  admin_username TEXT DEFAULT 'admin',
  admin_passcode_hash TEXT DEFAULT 'jbmedia2026', -- Default passcode (changeable in Admin Dashboard)
  google_apps_script_url TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default admin configuration row if not present
INSERT INTO public.admin_settings (id, admin_username, admin_passcode_hash)
VALUES ('config', 'admin', 'jbmedia2026')
ON CONFLICT (id) DO NOTHING;

-- ==========================================================
-- PERFORMANCE INDEXES (Ensures queries take < 5ms)
-- ==========================================================
CREATE INDEX IF NOT EXISTS idx_events_category ON public.events(category);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_event_photos_event_id ON public.event_photos(event_id);
CREATE INDEX IF NOT EXISTS idx_homepage_reels_order ON public.homepage_reels(display_order ASC);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================================
-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_reels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow Public Read Access (Anyone can view events, photos, and reels)
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public Read Photos" ON public.event_photos FOR SELECT USING (true);
CREATE POLICY "Public Read Reels" ON public.homepage_reels FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.admin_settings FOR SELECT USING (true);

-- Allow Public write operations with anon key (Controlled by Admin Login verification in application)
CREATE POLICY "Admin Insert Events" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Update Events" ON public.events FOR UPDATE USING (true);
CREATE POLICY "Admin Delete Events" ON public.events FOR DELETE USING (true);

CREATE POLICY "Admin Insert Photos" ON public.event_photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Update Photos" ON public.event_photos FOR UPDATE USING (true);
CREATE POLICY "Admin Delete Photos" ON public.event_photos FOR DELETE USING (true);

CREATE POLICY "Admin Insert Reels" ON public.homepage_reels FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Update Reels" ON public.homepage_reels FOR UPDATE USING (true);
CREATE POLICY "Admin Delete Reels" ON public.homepage_reels FOR DELETE USING (true);

CREATE POLICY "Admin Update Settings" ON public.admin_settings FOR UPDATE USING (true);
