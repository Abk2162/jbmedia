# Handoff: JB Media homepage (mediajbiet.in redesign)

## Overview

A single-scroll homepage for **JB Media**, the media and branding club of JB
Institute of Engineering and Technology (JBIET), Moinabad, Hyderabad. It replaces
the club's current Google Sites page. The scroll runs:

hero (animated silk background + draggable photo sphere in a device frame) →
counter band → looping word marquee → leadership cards → recent-work carousel →
recruitment call over a drifting photo wall → footer with a giant clipped wordmark.

## About the design files

Everything in `prototypes/` is a **design reference written in HTML** — a working
prototype of the intended look and behaviour, not production code to paste in.
The `react/` folder is a **starting point**, not a finished app: a Vite + React
port of the same design with the animated pieces already implemented. Recreate or
extend it inside whatever environment the project ends up using, following that
codebase's own patterns.

## Fidelity

**High fidelity.** Colours, type, spacing, motion timing and interactions are
final and come from the bound JB Media design system. What is *not* final: every
photograph, portrait, reel cover, and all four counter figures are placeholders.

## Screens / views

One page, seven sections.

### 1. Hero
- **Purpose:** state who the club is and show the archive at a glance.
- **Layout:** `min-height:100vh`, flex column. Header (max-width 1240px, padding
  24px 32px) with logo 44px, wordmark, and a Menu button pushed right. Body is a
  grid, `repeat(auto-fit, minmax(min(320px,100%),1fr))`, 48px gap, padding
  24px 32px 96px — copy left, device right, stacking to one column under ~900px.
- **Silk background:** full-bleed WebGL canvas, `position:absolute; inset:0`,
  under a scrim `linear-gradient(180deg, rgba(10,9,8,.62), rgba(10,9,8,.24) 38%, rgba(10,9,8,.86))`.
  Ember palette: `#0B0908` → `#70330D` → `#DB8524`. **Not** the reactbits demo's
  `#ff8327` — that orange clashes with the medallion gold.
- **Device frame:** `width:min(340px,86vw)`, `aspect-ratio:34/69`, `max-height:78vh`,
  11px `#17130F` border, radius 50px, shadow `0 40px 80px rgba(0,0,0,.75)` plus
  `inset 0 0 0 1px rgba(212,162,46,.14)`. Notch 104×26px, radius 999px.
- **Infinite menu:** 20 circular tiles (104px, scaled per depth) on a Fibonacci
  sphere, perspective `fov 620`, radius `min(w*0.46, h*0.30)`, idle spin
  `0.0016 rad/frame`, drag `0.006 rad/px`, X clamped ±1.1 rad. Wrapper carries
  `z-index:1` so tiles never paint over the caption.
- **Caption:** front-most tile's title in Anton 24px over
  `linear-gradient(180deg, rgba(8,7,6,0), rgba(8,7,6,.92))`, with
  "DRAG TO SPIN" in Barlow Condensed 11px / 0.22em.
- **Buttons:** 180×50px. Gold — `--jb-gradient-gold` on `#0A0908` text, hover
  `box-shadow: 0 12px 34px rgba(212,162,46,.34)`. Outline — 1px `--jb-gold-500`,
  text `--jb-gold-300`, hover border/text one step lighter.
- **Gradual blur:** 150px tall strip at the bottom, one `backdrop-filter: blur(7px)`
  layer masked `linear-gradient(180deg, transparent, #000 78%)`, plus a solid fade
  to `#0A0908`.

### 2. Counter band
Four figures, `repeat(auto-fit, minmax(min(200px,100%),1fr))`, 96px 32px 64px
padding. Figure: Anton `clamp(56px,6vw,86px)`, line-height 0.86, filled with
`--jb-gradient-gold` via `background-clip:text`; the trailing `+` is
`rgba(212,162,46,.3)`. Under each: a 64×2px gradient rule and a Barlow Condensed
13px / 0.24em uppercase label. Values ease up (cubic ease-out, 1600ms) once, on
first intersection at threshold 0.4.

Labels: EVENTS COVERED · MEMBERS · COMBINED FOLLOWERS · VIEWS ACROSS PLATFORMS.
Placeholder values 40+ / 120+ / 12K+ / 2M+.

### 3. Marquee
Full-bleed strip on `#100E0C` between two gold hairlines, 28px vertical padding.
Anton 84px words — CONNECT (cream) · COMMUNICATE (1px gold outline) · COLLABORATE
(gold gradient fill) — separated by 16px gold squares, 48px gap, translating
-50% over 30s linear, infinite, paused on hover. The triplet is the medallion
ribbon and must stay in that order.

### 4. Leadership
Section head: eyebrow "UNDER WHOSE WATCH", Anton 56px "LEADERSHIP", 96×2px gold
rule. Three cards, `repeat(auto-fit, minmax(min(280px,100%),1fr))`, 28px gap.
Card: radius 16px, 1px `rgba(212,162,46,.4)` border,
`linear-gradient(150deg,#241D17,#100E0C 55%,#191410)`, 18px padding. Portrait
frame 300px tall, dashed gold border, radius 12px. Tilt: ±16° rotateX/rotateY +
`translateZ(14px)` following the pointer, 90ms linear in, 520ms
`cubic-bezier(0.22,1,0.36,1)` back; border brightens to `rgba(212,162,46,.72)`;
a radial gold sheen fades in and tracks the pointer at 44% travel.

Names: Sri J. V. Krishna Rao (Hon. Secretary, JBES) · Prof. Ch. Sanjay (Director,
JBES) · Dr. P. C. Krishnamachary (Principal, JBIET). Each needs a **transparent
cut-out PNG**; the club's current photos are rectangular and will need background
removal.

### 5. Recent work
Circular gallery, 400px tall, `perspective:1200px`. Tiles 232×340px, radius 30px,
gold hairline, spaced 268px. Per tile: `rotateY(-x * 0.028deg)`, scale
`1 - d*0.34`, opacity `1 - d*0.72`, where `d` is normalised distance from centre.
Wraps infinitely; idle drift 0.35px/frame; drag and wheel add velocity with 0.93
damping. Each tile is an `<a>` to its Instagram reel, with a 56px play ring and a
scrim caption (title + view count).

### 6. Recruitment (drift wall)
Five columns of tiles rotated -8° and scaled 1.15, alternating up/down
translate-50% loops at 28–44s, at 55% opacity, behind a radial scrim
`rgba(10,9,8,.62)` → `rgba(10,9,8,.93)`. Foreground: eyebrow "RECRUITMENTS OPEN",
Anton `clamp(48px,7vw,88px)` "THE FRAME IS READY. / ARE YOU?" (verbatim from the
club's recruitment poster), a line of body copy, and a 220×52px gold button.

### 7. Footer
Five columns, `repeat(auto-fit, minmax(min(220px,100%),1fr))`, 40px gap, 80px top
padding: Join block (Anton 38px + copy + outline button) · Site · Follow ·
Contact · Find us (map image with a gold hairline, 16/11, plus an "OPEN IN MAPS"
link). Then a hairline rule and the copyright line. Then the wordmark: Anton
`clamp(84px,19vw,282px)`, line-height 0.88, cream, `white-space:nowrap`, padding
`40px 32px 48px` — full-bleed and generously spaced like the mozilla.org footer.

## Interactions & behaviour

| Element | Behaviour |
| --- | --- |
| Menu button | Toggles a right-hand panel, `min(620px,88vw)`, `translateX(101%)` → `0`, 680ms `cubic-bezier(0.22,1,0.36,1)`; plus icon rotates to 135°; backdrop `rgba(10,9,8,.6)` fades 520ms and closes on click |
| Panel links | Gold gradient wipes in `scaleX(0→1)` from the left, 520ms; label flips to `#0A0908`; lines rise `translateY(115%→0)` staggered 70ms each, 160ms after open |
| Sphere | Pointer drag spins with inertia, easing back to idle; front tile drives the caption |
| Gallery | Drag, wheel, or idle drift; click opens the reel in a new tab |
| Profile cards | Pointer tilt + sheen (above) |
| Counters | Animate once on first scroll into view |
| Splash cursor | Additive gold blobs, radius grows to 34–124px, alpha ×0.93/frame; hidden on touch and reduced motion |

Responsive: everything is `auto-fit` grid — hero stacks to one column and the
device shrinks to `86vw`; no fixed breakpoints are needed. `prefers-reduced-motion`
kills the marquee, drift wall, and splash cursor.

## State

- `menuOpen` (bool) — panel visibility.
- `activeTitle` (string) — caption under the sphere, set by the front tile.
- `heroVisible` / `workVisible` (bool, IntersectionObserver) — pause the silk,
  sphere, and gallery loops when off-screen.
- Sphere and gallery motion live in refs, never in state — one `setState` per
  frame would re-render the tree 60×/second.
- Counter values: one state array, written from a rAF ease, guarded so it runs once.

## Design tokens

```
Gold      #FBEBC0 · #F5C542 · #D4A22E · #A97418 · #6B4610
Darks     #0A0908 page · #100E0C · #161311 · #1F1A16 · #3A2A16
Text      #F7F1E4 cream · rgba(255,255,255,.70) · rgba(255,255,255,.50)
Accent    #B3121C crimson — fest material ONLY, unused here
Lines     rgba(212,162,46,.28) rest · .55 hover/focus
Gradient  linear-gradient(160deg,#FBEBC0,#F5C542 22%,#D4A22E 48%,#A97418 74%,#F5C542)
Scrim     linear-gradient(180deg,rgba(10,9,8,0),rgba(10,9,8,.85) 70%,#0A0908)
Type      Anton (display, uppercase, 0.88–1.0 leading)
          Barlow Condensed 600 (eyebrows/buttons/nav, 0.16–0.28em tracking)
          Barlow (body, 1.6–1.7 leading)
Spacing   8 · 16 · 24 · 40 · 64 · 96 · 140; container 1240px, 32px margin
Radius    0 default · 2px buttons · 999px pills · 16px profile cards ·
          30px gallery tiles · 50px device frame
Motion    280ms colour/border · 520–680ms panel and tilt-return ·
          easing cubic-bezier(0.22,1,0.36,1)
```

Note two deliberate departures from the design system, both requested: soft
corners on the profile/gallery cards (the system defaults to 0–2px), and the
gradual-blur strip (the system says no backdrop blur). Everything else follows it.

## Assets

| Asset | Source | Status |
| --- | --- | --- |
| `assets/jb-media-logo.png` | supplied by the club | ✅ included |
| Sphere photos (20 square crops) | club archive | ❌ needed |
| Reel covers + permalinks (6) | Instagram @media_jbiet | ❌ needed |
| Leadership portraits (3, cut-out PNG) | college site | ❌ needed, background removal required |
| Campus map screenshot | Google Maps | ❌ needed |
| Fonts | Google Fonts (Anton, Barlow, Barlow Condensed) | ⚠ substitutions for the posters' real faces |

## Files

```
README.md                             this document
CONTEXT.md                            decision history, open questions, next steps
prototypes/JB Media Home Demo.html    the working high-fidelity prototype
prototypes/JB Media Wireframe.html    low-fi placement wireframes (turns 1 and 2)
assets/jb-media-logo.png              club medallion
react/                                Vite + React port to build on
```

The prototypes are Design Component files: open them in a browser and they run.
Their markup sits between `<x-dc>` tags with the logic in the `<script data-dc-script>`
block at the bottom — read them as HTML + a small class, and ignore the runtime
wrapper.
