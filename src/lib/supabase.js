import { createClient } from "@supabase/supabase-js";
import defaultGalleryData from "@/data/gallery.json";
import { REELS } from "@/data/site.js";

// Storage keys for custom client-side connection if not set in .env
const STORAGE_URL_KEY = "jbmedia_supabase_url";
const STORAGE_KEY_KEY = "jbmedia_supabase_anon_key";
const STORAGE_SCRIPT_URL_KEY = "jbmedia_apps_script_url";
const STORAGE_ADMIN_PASSCODE = "jbmedia_admin_passcode";

const envUrl = import.meta.env.VITE_SUPABASE_URL || localStorage.getItem(STORAGE_URL_KEY) || "";
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem(STORAGE_KEY_KEY) || "";

export const supabase = (envUrl && envKey)
  ? createClient(envUrl, envKey, {
      auth: { persistSession: false }
    })
  : null;

export function isSupabaseConfigured() {
  return Boolean(supabase);
}

export function saveConnectionConfig(url, key) {
  if (url) localStorage.setItem(STORAGE_URL_KEY, url.trim());
  if (key) localStorage.setItem(STORAGE_KEY_KEY, key.trim());
  window.location.reload();
}

export function getStoredAppsScriptUrl() {
  return import.meta.env.VITE_APPS_SCRIPT_URL || localStorage.getItem(STORAGE_SCRIPT_URL_KEY) || "";
}

export function saveStoredAppsScriptUrl(url) {
  localStorage.setItem(STORAGE_SCRIPT_URL_KEY, url ? url.trim() : "");
}

/* ==========================================================
   ADMIN AUTHENTICATION (Passcode / Username System)
   ========================================================== */
export async function verifyAdminCredentials(username, passcode) {
  // If Supabase is connected, check admin_settings table
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("admin_username, admin_passcode_hash")
        .eq("id", "config")
        .single();

      if (!error && data) {
        return (
          data.admin_username.toLowerCase() === username.trim().toLowerCase() &&
          data.admin_passcode_hash === passcode
        );
      }
    } catch (e) {
      console.warn("Supabase auth check fallback to local passcode", e);
    }
  }

  // Local fallback passcode (default: 'admin' / 'jbmedia2026')
  const storedPasscode = localStorage.getItem(STORAGE_ADMIN_PASSCODE) || "jbmedia2026";
  const validUser = username.trim().toLowerCase() === "admin" || username.trim().toLowerCase() === "jbmedia";
  const validPass = passcode === storedPasscode;
  return validUser && validPass;
}

export function updateLocalAdminPasscode(newPasscode) {
  localStorage.setItem(STORAGE_ADMIN_PASSCODE, newPasscode);
}

/* ==========================================================
   EVENTS & GALLERY QUERIES
   ========================================================== */

/**
 * Fetch all events (from Supabase or local fallback)
 */
export async function fetchEvents() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("events")
        .select(`
          id,
          title,
          slug,
          category,
          event_date,
          drive_folder_id,
          cover_image_id,
          description,
          is_featured,
          display_order,
          created_at,
          event_photos (count)
        `)
        .order("event_date", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map(e => ({
          ...e,
          photoCount: e.event_photos?.[0]?.count || 0
        }));
      }
    } catch (err) {
      console.warn("Using sample events due to Supabase error:", err);
    }
  }

  // Default seed events from real Google Drive albums
  return [
    {
      id: "ev-vaibhav-2k26",
      title: "VAIBHAV 2K26",
      slug: "vaibhav-2k26",
      category: "Fests",
      event_date: "2026-03-14",
      drive_folder_id: "1kxk4wZpcpDnKpRR8sOYFvSv_jKiLu_7Y",
      cover_image_id: "1GPPrayRXfRsLDhnlp47X2ZItOL32BNzu",
      description: "JBIET's flagship Media & Cultural Fest celebrating photography, cinema, design and student creators.",
      photoCount: defaultGalleryData.filter(p => p.event_id === "ev-vaibhav-2k26").length || 17
    },
    {
      id: "ev-orientation-day",
      title: "ORIENTATION DAY",
      slug: "orientation-day",
      category: "Campus Life",
      event_date: "2025-09-01",
      drive_folder_id: "1zJ5sz0jd0H1sokG2XxqNpzEpEqGuu8vV",
      cover_image_id: "1tBL4y2Bf5oNIU8jcgdBpG7oc1t4oDQmQ",
      description: "Welcoming the newest batch of students to JBIET campus with dignitary welcomes and faculty addresses.",
      photoCount: defaultGalleryData.filter(p => p.event_id === "ev-orientation-day").length || 11
    }
  ];
}

/**
 * Create a new Event in Supabase
 */
export async function createEvent(event) {
  const slug = (event.slug || event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) + "-" + Date.now().toString().slice(-4);
  
  // Sanitize date to valid YYYY-MM-DD
  let validDate = event.event_date;
  if (!validDate || validDate.startsWith("000") || isNaN(Date.parse(validDate))) {
    validDate = new Date().toISOString().split("T")[0];
  }

  const payload = {
    title: event.title.trim(),
    slug,
    category: event.category || "Fests",
    event_date: validDate,
    drive_folder_id: event.drive_folder_id || null,
    cover_image_id: event.cover_image_id || null,
    description: event.description || ""
  };

  if (supabase) {
    const { data, error } = await supabase.from("events").insert([payload]).select().single();
    if (error) {
      if (error.code === "42P01" || error.message?.includes("does not exist")) {
        throw new Error("Table 'events' does not exist in Supabase yet. Please open Supabase > SQL Editor, paste the contents of 'supabase_schema.sql', and click Run.");
      }
      if (error.message?.includes("row-level security") || error.code === "42501") {
        throw new Error("Row-Level Security (RLS) blocked the insert. Please run the RLS policies in 'supabase_schema.sql' in Supabase SQL Editor.");
      }
      throw new Error(`Supabase Error (${error.code || 'DB'}): ${error.message}`);
    }
    return data;
  }

  // Local fallback object
  return { id: "local-" + Date.now(), ...payload, photoCount: 0 };
}

/**
 * Update an existing Event
 */
export async function updateEvent(id, updates) {
  if (supabase) {
    const { data, error } = await supabase.from("events").update(updates).eq("id", id).select().single();
    if (error) throw error;
    return data;
  }
  return { id, ...updates };
}

/**
 * Delete an Event
 */
export async function deleteEvent(id) {
  if (supabase) {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
  return true;
}

/**
 * Fetch photos for a specific event or all photos
 */
export async function fetchEventPhotos(eventId = null) {
  if (supabase) {
    try {
      let query = supabase.from("event_photos").select("id, event_id, drive_file_id, title, tags, photographer, display_order, created_at");
      if (eventId) {
        query = query.eq("event_id", eventId);
      }
      query = query.order("display_order", { ascending: true });
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn("Supabase photos fetch error:", err);
    }
  }

  // Fallback to real synced Google Drive gallery data
  const basePhotos = eventId
    ? defaultGalleryData.filter(p => p.event_id === eventId)
    : defaultGalleryData;

  return basePhotos.map((p, idx) => ({
    id: p.id || `photo-${idx}`,
    event_id: p.event_id || "ev-vaibhav-2k26",
    drive_file_id: p.drive_file_id || p.id || "",
    thumbnailUrl: p.thumbnailUrl || (p.drive_file_id ? `https://drive.google.com/thumbnail?id=${p.drive_file_id}&sz=w800` : ""),
    hdUrl: p.hdUrl || (p.drive_file_id ? `https://drive.google.com/thumbnail?id=${p.drive_file_id}&sz=w1600` : ""),
    title: p.title || `Campus Moment ${idx + 1}`,
    tags: p.tags || ["JBIET", p.category || "Campus"],
    photographer: p.photographer || "JB Media Team",
    category: p.category || "Fests",
    eventDate: p.eventDate || "2025-2026"
  }));
}

/**
 * Batch save photos synced from Google Drive
 */
export async function saveSyncedPhotos(eventId, photosList) {
  if (!eventId || !photosList || photosList.length === 0) return [];

  const rows = photosList.map((p, index) => {
    let clean = p.name ? p.name.replace(/\.[^/.]+$/, "") : `Photo ${index + 1}`;
    clean = clean
      .replace(/[_-]\d{5,}/g, "")
      .replace(/\d{6,}/g, "")
      .replace(/[_-]+/g, " ")
      .replace(/\b(IMG|DSC|DCIM|PXL|PHOTO)\b/gi, "")
      .trim();

    return {
      event_id: eventId,
      drive_file_id: p.id,
      title: clean || `Capture ${index + 1}`,
      tags: ["JB Media", "Archive"],
      photographer: "JB Media Team",
      display_order: index
    };
  });

  if (supabase) {
    // Delete existing photos for this event to avoid duplicates on re-sync
    await supabase.from("event_photos").delete().eq("event_id", eventId);
    
    // Insert new synced list
    const { data, error } = await supabase.from("event_photos").insert(rows).select();
    if (error) throw error;

    // Set cover image to first photo if not set
    if (photosList[0]?.id) {
      await supabase.from("events").update({ cover_image_id: photosList[0].id }).eq("id", eventId);
    }
    return data;
  }

  return rows;
}

/* ==========================================================
   HOMEPAGE REELS QUERIES
   ========================================================== */

export async function fetchHomepageReels() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("homepage_reels")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn("Using sample reels due to Supabase error:", err);
    }
  }

  // Fallback to site.js default reels
  return REELS.map((r, i) => ({
    id: r.id || `reel-${i}`,
    title: r.title,
    category: r.category || "Highlight",
    instagram_url: r.url || "https://www.instagram.com/media_jbiet/",
    thumbnail_url: r.image || r.cover,
    duration: r.duration || "0:30",
    display_order: i,
    is_active: true
  }));
}

export async function createHomepageReel(reel) {
  const payload = {
    title: reel.title,
    category: reel.category || "Highlight",
    instagram_url: reel.instagram_url,
    thumbnail_url: reel.thumbnail_url || null,
    duration: reel.duration || "0:30",
    display_order: reel.display_order || 0,
    is_active: true
  };

  if (supabase) {
    const { data, error } = await supabase.from("homepage_reels").insert([payload]).select().single();
    if (error) throw error;
    return data;
  }
  return { id: "local-reel-" + Date.now(), ...payload };
}

export async function deleteHomepageReel(id) {
  if (supabase) {
    const { error } = await supabase.from("homepage_reels").delete().eq("id", id);
    if (error) throw error;
    return true;
  }
  return true;
}
