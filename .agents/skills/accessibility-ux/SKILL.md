---
name: accessibility-ux
description: WCAG AA standards, keyboard navigation, focus management, and responsive motion accessibility.
---

# Accessibility & Inclusive UX

## Core Rules
1. **Keyboard Nav**: All interactive elements (`<button>`, `<a>`, dialog triggers) must have visible focus rings (`focus-visible:ring-2 focus-visible:ring-gold-500`) and support `Enter`/`Space`/`Esc`.
2. **Motion Preference**: Respect `prefers-reduced-motion` across all GSAP scroll triggers, marquees, and WebGL canvases.
3. **Contrast**: Ensure text colors against dark backgrounds meet WCAG AA contrast ratio (4.5:1 minimum for body, 3:1 for large display titles).
4. **Touch Targets**: Mobile buttons and clickable cards must meet the minimum 44×44px hit target size.
