# JB Media — Official Web Application

Modern editorial, dark-luxe digital experience for JB Media, built with React 18, Vite, Three.js, WebGL shaders, Tailwind CSS, Framer Motion, and Lenis smooth scrolling.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Architecture

```text
src/
  ├── components/          # Reusable UI, interactive 3D WebGL & GSAP animations
  │   ├── CircularGallery.jsx  # 3D interactive reel & media carousel
  │   ├── InfiniteMenu.jsx     # WebGL spherical 3D archive browser
  │   ├── MenuPanel.jsx        # Fullscreen staggered navigation menu
  │   ├── PhoneMockup.jsx      # Photorealistic iPhone bezel viewport
  │   ├── ProfileCard.jsx      # Holographic tilt leadership profile cards
  │   ├── Silk.jsx             # WebGL interactive fluid silk background
  │   ├── SmoothScroll.jsx     # Lenis smooth scroll engine
  │   ├── SplashCursor.jsx     # Fluid pointer particle trail
  │   ├── StatsBand.jsx        # Animated metrics & achievement counters
  │   └── ui/                  # Radix UI primitives & design tokens
  ├── data/
  │   ├── gallery.json         # Media gallery archives & metadata
  │   └── site.js              # Site copy, team members, statistics & links
  ├── pages/                   # Main application route views
  │   ├── HomePage.jsx         # Hero, 3D archive, leadership, recent work
  │   ├── AboutPage.jsx        # Studio philosophy & editorial timeline
  │   ├── GalleryPage.jsx      # Dynamic media archive grid & filter system
  │   ├── TeamPage.jsx         # Executive leadership & team profiles
  │   └── JoinPage.jsx         # Recruitment & application portal
  ├── index.css                # Tailwind base, dark-editorial design tokens
  └── main.jsx                 # React DOM entry point & Router configuration
```

## ⚡ Performance Optimizations

1. **Off-Screen WebGL Culling:** Interactive canvas layers (`Silk`, `InfiniteMenu`, `CircularGallery`) automatically pause rendering loops when out of viewport.
2. **Smooth Scroll & Animation Throttling:** Optimized `requestAnimationFrame` loop driven by Lenis without layout recalculations inside render passes.
3. **Asset Optimization:** WebP compressed media assets with responsive fallbacks.
