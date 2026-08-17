---
name: frontend-design
description: Guidelines and patterns for crafting high-fidelity, aesthetic frontend interfaces with Tailwind CSS and React.
---

# Frontend Design & Visual Craft

## Principles
1. **Brand Cohesion**: Strictly adhere to the project's color palette (Ember `#70330D`, Flame `#DB8524`, Gold scale `#FBEBC0` to `#6B4610`, Page dark `#0A0908`).
2. **Typography Hierarchy**:
   - Headers & Display: `font-anton` uppercase with tight leading (`0.88 - 1.0`).
   - Eyebrows & Nav: `font-barlow-condensed` with tracking `0.16em - 0.28em`.
   - Body & Prose: `font-barlow` with comfortable line height (`1.6 - 1.7`).
3. **Glassmorphism & Gradients**: Use subtle dark glass layers (`bg-black/60 backdrop-blur-md border border-gold-500/20`) rather than harsh solid cards.
4. **Spacing & Rhythm**: Standardize spacing tokens (`8px`, `16px`, `24px`, `40px`, `64px`, `96px`, `140px`) with container constraints (`max-w-7xl`).
