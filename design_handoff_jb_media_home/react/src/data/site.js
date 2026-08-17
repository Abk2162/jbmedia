/**
 * All homepage content in one place.
 */

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "Team", href: "/team" },
  { label: "About Us", href: "/about" },
  { label: "Join Us", href: "/join" }
];

// Curated high-resolution crops from the college archive
export const PHOTO_BANK = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508997449629-303059a039c0?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=400&auto=format&fit=crop"
];

const TITLES = [
  "Abhav 2K26", "Freshers 2K25", "Tech Fest", "Sports Meet", "Convocation",
  "Cultural Night", "Lighting Workshop", "Farewell 2K25", "Ethnic Day", "Independence Day",
  "Hackathon 24H", "Alumni Reunion", "Guest Lecture", "NSS Green Drive", "Republic Day",
  "Open Mic Night", "Campus Photowalk", "Podcast Ep. 04", "Live Stream Hub", "Campus Dawn"
];

export const SPHERE_ITEMS = TITLES.map((title, i) => ({
  title,
  src: PHOTO_BANK[i % PHOTO_BANK.length],
  href: "/gallery"
}));

export const STATS = [
  { label: "Events Covered", value: 40, kind: "" },
  { label: "Active Members", value: 120, kind: "" },
  { label: "Combined Followers", value: 12000, kind: "K" },
  { label: "Views Across Platforms", value: 2000000, kind: "M" }
];

export const LEADERSHIP = [
  { name: "Sri J. V. Krishna Rao", role: "Hon. Secretary, JBES", portrait: null },
  { name: "Prof. Ch. Sanjay", role: "Director, JBES", portrait: null },
  { name: "Dr. P. C. Krishnamachary", role: "Principal, JBIET", portrait: null }
];

export const REELS = [
  {
    title: "Abhav 2K26 Inaugural",
    meta: "12.4K views",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Freshers Night Highlights",
    meta: "8.1K views",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Campus At Dawn",
    meta: "5.6K views",
    cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Sports Meet Track Finals",
    meta: "9.9K views",
    cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Behind The Lens · Episode 04",
    meta: "3.2K views",
    cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Ethnic Day Celebrations",
    meta: "7.4K views",
    cover: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  }
];

export const CONTACT = {
  email: "mediajbiet@gmail.com",
  phones: ["+91 95503 51643", "+91 95022 97525"],
  address: "JBIET, Moinabad",
  maps: "https://maps.google.com/?q=JB+Institute+of+Engineering+and+Technology+Moinabad",
  instagram: "https://www.instagram.com/media_jbiet/"
};
