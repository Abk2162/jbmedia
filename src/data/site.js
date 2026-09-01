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
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508997449629-303059a039c0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop"
];

export const SPHERE_ITEMS = [
  {
    id: "sp-0",
    title: "JB Media",
    description: "The Branding Hub of JBIET — where stories come alive, ideas find their stage, and every campus moment is celebrated.",
    image: "/jb-media-logo.webp",
    src: "/jb-media-logo.webp",
    category: "Branding Hub",
    accentColor: "#F5C542",
    tag: "OFFICIAL CLUB",
    link: "/about"
  },
  {
    id: "sp-1",
    title: "Vaibhav 2025",
    description: "The landmark first-ever Media Fest of JBIET — celebrating storytelling, design, literature & digital art.",
    image: PHOTO_BANK[0],
    src: PHOTO_BANK[0],
    category: "Media Fest",
    accentColor: "#f97316",
    tag: "FLAGSHIP",
    link: "/gallery"
  },
  {
    id: "sp-2",
    title: "Abhav 2K25",
    description: "National annual cultural fest uniting thousands in stage lighting, dance & electrifying live concerts.",
    image: PHOTO_BANK[1],
    src: PHOTO_BANK[1],
    category: "Cultural Fest",
    accentColor: "#00f2fe",
    tag: "NATIONAL FEST",
    link: "/gallery"
  },
  {
    id: "sp-3",
    title: "Freshers Induction",
    description: "Welcoming the newest innovators and creators into the vibrant campus culture of JBIET.",
    image: PHOTO_BANK[2],
    src: PHOTO_BANK[2],
    category: "Campus Life",
    accentColor: "#10b981",
    tag: "WELCOME",
    link: "/gallery"
  },
  {
    id: "sp-4",
    title: "Podcast & Radio JBIET",
    description: "In-depth audio interviews, thought leadership, student voices, and campus radio broadcasts.",
    image: PHOTO_BANK[3],
    src: PHOTO_BANK[3],
    category: "Broadcast",
    accentColor: "#a855f7",
    tag: "BROADCAST",
    link: "/gallery"
  },
  {
    id: "sp-5",
    title: "Traditional & Ethnic Day",
    description: "Grand heritage celebrations, traditional attire parades, and cultural performances.",
    image: PHOTO_BANK[4],
    src: PHOTO_BANK[4],
    category: "Heritage",
    accentColor: "#fbbf24",
    tag: "HERITAGE",
    link: "/gallery"
  },
  {
    id: "sp-6",
    title: "Annual Sports Meet",
    description: "High-adrenaline track finals, football championship showdowns, and athletic triumphs.",
    image: PHOTO_BANK[5],
    src: PHOTO_BANK[5],
    category: "Sports",
    accentColor: "#f43f5e",
    tag: "ATHLETICS",
    link: "/gallery"
  },
  {
    id: "sp-7",
    title: "Convocation Ceremony",
    description: "Honoring graduating engineers, academic excellence, and memorable milestone moments.",
    image: PHOTO_BANK[6],
    src: PHOTO_BANK[6],
    category: "Ceremony",
    accentColor: "#3b82f6",
    tag: "GRADUATES",
    link: "/gallery"
  },
  {
    id: "sp-8",
    title: "Campus Photowalk",
    description: "Exploring architecture, golden-hour compositions, and cinematic angles across campus.",
    image: PHOTO_BANK[8],
    src: PHOTO_BANK[8],
    category: "Photography",
    accentColor: "#ec4899",
    tag: "WORKSHOP",
    link: "/gallery"
  },
  {
    id: "sp-9",
    title: "Farewell 2K25",
    description: "Nostalgic sendoff honoring the final year batch with emotional tributes and memory films.",
    image: PHOTO_BANK[10],
    src: PHOTO_BANK[10],
    category: "Campus Life",
    accentColor: "#8b5cf6",
    tag: "FAREWELL",
    link: "/gallery"
  },
  {
    id: "sp-10",
    title: "Brand JBIET Campaigns",
    description: "Promotional campaigns, official releases, and AI-driven creative storytelling.",
    image: PHOTO_BANK[16],
    src: PHOTO_BANK[16],
    category: "Branding",
    accentColor: "#06b6d4",
    tag: "BRANDING",
    link: "/gallery"
  }
];

export const STATS = [
  { label: "Events Covered", value: 40, kind: "" },
  { label: "Active Creators", value: 120, kind: "" },
  { label: "Combined Followers", value: 12000, kind: "K" },
  { label: "Views Across Platforms", value: 2000000, kind: "M" }
];

export const LEADERSHIP = [
  {
    name: "Sri J. V. Krishna Rao",
    role: "Hon. Secretary, JBES",
    portrait: null,
    quote: "Empowering students to articulate the legacy, culture, and innovation of JBIET with integrity and professional excellence."
  },
  {
    name: "Prof. Ch. Sanjay",
    role: "Director, JBES",
    portrait: null,
    quote: "Fostering a creative ecosystem where technology meets storytelling and student leadership thrives across every domain."
  },
  {
    name: "Dr. P. C. Krishnamachary",
    role: "Principal, JBIET",
    portrait: null,
    quote: "Celebrating our vibrant campus spirit, academic milestones, and student achievements through state-of-the-art media."
  }
];

export const REELS = [
  {
    title: "Vaibhav 2025 Aftermovie Teaser",
    meta: "14.2K views",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Abhav 2K25 National Fest Glimpse",
    meta: "18.8K views",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Campus Chronicles · Golden Hour",
    meta: "9.6K views",
    cover: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Annual Sports Meet Highlights",
    meta: "11.5K views",
    cover: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Behind The Lens · The Creators",
    meta: "6.4K views",
    cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop",
    href: "https://www.instagram.com/media_jbiet/"
  },
  {
    title: "Traditional Day Celebrations",
    meta: "10.1K views",
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
