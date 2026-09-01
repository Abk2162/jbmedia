# JB Media — React starter

Vite + React 18, no other dependencies. The five animated pieces are hand-written
(WebGL / DOM 3D / canvas) rather than pulled from `reactbits.dev`, so there is
nothing to install and every value is tuned to the JB Media gold system.

```bash
npm install
npm run dev
```

## Structure

```
src/
  index.css                 design tokens, resets, keyframes, all layout classes
  App.jsx                   the homepage: hero → counters → marquee → leadership
                            → recent work → recruitment → footer
  data/site.js              ALL copy, figures, names, reel links (placeholders)
  components/
    Silk.jsx                full-bleed WebGL silk background
    InfiniteMenu.jsx        draggable sphere of circular photo tiles
    SplashCursor.jsx        gold ink-splash pointer trail
    CircularGallery.jsx     drag/scroll reel carousel
    ProfileCard.jsx         pointer-tilt card with holographic sheen
    MenuPanel.jsx           sliding nav with gold fill + staggered reveal
    StatsBand.jsx           counters that ease up on scroll into view
```

## Assets to drop in `public/`

| File | What it is |
| --- | --- |
| `jb-media-logo.png` | the gold medallion (included in this bundle under `assets/`) |
| `campus-map.png` | screenshot of the Google Maps pin for the footer |
| `photos/*.jpg` | 20 square crops for the sphere — wire them into `SPHERE_ITEMS` |
| reel covers | one export per reel — wire into `REELS` with the permalink |
| portraits | transparent cut-out PNGs of the three leaders |

## Performance rules baked in — keep them

1. **No layout reads inside `requestAnimationFrame`.** Sizes are measured on
   mount and in a `ResizeObserver`; reading `clientWidth` per frame froze the
   page during development.
2. **Every canvas pauses off-screen.** `useOnScreen` gates Silk, InfiniteMenu
   and CircularGallery; all loops also bail on `document.hidden`.
3. **One `backdrop-filter` layer**, not a stack of three.
4. **SplashCursor disables itself** on touch devices and under
   `prefers-reduced-motion`, and caps its blob count.
5. **`box-sizing: border-box` globally** — the hero uses `width:100%` plus 32px
   padding and overflows without it.

## Using this in Google Antigravity (or any agent IDE)

Open this folder as the workspace and point the agent at `../README.md` and
`../CONTEXT.md` first — they carry the design spec and the decision history.
`src/data/site.js` is the only file that needs editing to put real content in.
