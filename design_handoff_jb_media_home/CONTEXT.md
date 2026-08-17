# Context — how this design got here

A record of what was asked for, what was decided, and what is still open. Written
so an agent or developer picking this up cold has the same footing as the people
who built it.

## The brief, in order

1. **Hero page.** Build a high-fidelity hero for JB Media, the media and branding
   club of JBIET. Warm brown/ember background, drag-drop image frame, sliding nav
   panel with gold hover fills and staggered text reveals. Ember rather than red —
   crimson is reserved for fest material.
2. **Full site wireframes.** Extended to the whole homepage scroll plus Gallery,
   Team, About Us and Join Us pages.
3. **React Bits integration.** Seven components picked off reactbits.dev, to be
   wireframed first and demonstrated after:
   Silk background · Infinite Menu · Profile Card · Splash Cursor ·
   Circular Gallery · Gradual Blur · Drift Wall.
4. **Homepage v2.** Device-frame hero (copy left, phone right) chosen over the
   centred version. Six-verticals band dropped in favour of a counter band and a
   moving word marquee, both modelled on acmklh.com. Profile cards, then circular
   gallery of Instagram reel covers, then the drift-wall recruitment section, then
   a mozilla.org-style footer ending in a giant wordmark.
5. **Live demo.** The wireframe built for real, every effect running.
6. **Menu + map + wordmark spacing.** The animated panel brought back into the
   demo, a campus-map column added beside Contact, and the footer wordmark given
   Mozilla-style breathing room.

## Decisions worth keeping

- **Ember, not #ff8327.** The reactbits Silk demo orange fights the medallion
  gold. The shader runs `#0B0908 → #70330D → #DB8524` instead.
- **Built native, not installed.** All seven effects are hand-written WebGL,
  DOM 3D, or canvas — no `ogl`, no reactbits package. Same behaviour, no install
  step, and every constant is tuned to the brand.
- **The device hero needs a mobile branch.** On a phone the frame is a phone
  inside a phone; the layout collapses to the centred, full-bleed arrangement
  (which was wireframe option 1a).
- **Marquee words are the medallion ribbon** — Connect · Communicate · Collaborate,
  always in that order. Not a new BUILD / INNOVATE / CREATE triplet, though the
  club can still ask for one.
- **Gradual blur is edge-only** — hero bottom and above the footer. Site-wide it
  reads as a smudge and costs frames.
- **Splash cursor is desktop-only**, gold-tinted, and off under reduced motion.

## Bugs found in review, and their root causes

These were real and are fixed; do not reintroduce them.

1. **Hero clipped 64px.** No global `box-sizing: border-box`, so `width:100%` plus
   32px padding measured wider than its container. Fixed with a global reset.
2. **Page froze.** A `clientWidth` read inside the rAF loop, interleaved with
   transform writes on 26 elements — classic layout thrash. Sizes are now measured
   on mount and via `ResizeObserver`.
3. **Sphere clumped.** Tile size was a fixed 104px while the radius shrank with
   the container. Tile scale is now derived from the measured radius.
4. **Tiles painted over the caption.** The sphere wrapper had `z-index:auto`, so
   per-frame tile z-indexes (125–294) competed with the caption's 5 in the same
   stacking context. The wrapper now has `z-index:1`.
5. **Nonexistent tokens.** `--jb-gold-200` / `-400` were invented; the scale is
   100/300/500/700/900 only.

## Still open

- **Photographs.** Nothing real has been supplied: 20 square crops for the sphere,
  six reel covers, three cut-out portraits, a campus-map screenshot.
- **Counter figures.** 40+ / 120+ / 12K+ / 2M+ are invented. Replace before launch.
- **Instagram.** No public API for reel covers. Either export covers by hand and
  pair them with permalinks, or run a small server-side fetch on a schedule.
- **Join form.** No backend. A Google Form embed is the cheapest route.
- **Faculty messages.** The live site has Secretary / Director / Principal pages;
  their text was never supplied.
- **Fonts.** Anton and Barlow are substitutions for the posters' real faces.
- **Abhav 2K26** has no page yet, and its poster art suggests a distinct
  script-and-crimson treatment that needs its own decision.
- **Secondary pages** (Gallery, Team, About Us, Join Us) exist only as wireframes.

## Suggested next steps

1. Drop the real photos into `react/public/` and wire `src/data/site.js`.
2. Add the mobile branch for the hero (stack under ~900px, drop the device frame).
3. Build the Join form against whatever backend the club can maintain.
4. Port the Gallery / Team / About wireframes into routes.
5. Audit on a mid-range Android before launch — five animated surfaces is the
   ceiling, and the pause-when-off-screen gating is what makes it viable.
