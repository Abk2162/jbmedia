---
name: gsap-scrolltrigger
description: GSAP and ScrollTrigger orchestration patterns for React web applications.
---

# GSAP & ScrollTrigger React Mastery

## React Best Practices
1. **useGSAP Hook / Context Cleanup**:
   - Always wrap GSAP animations in `@gsap/react` `useGSAP` or ensure proper `ctx.revert()` in `useEffect` cleanup.
   - Prevent memory leaks and duplicate timeline instances on route navigation or hot reload.
2. **ScrollTrigger Optimization**:
   - Use `ScrollTrigger.create()` for pinned sections, parallax layers, and scrub animations.
   - Optimize performance with `will-change: transform` and avoid animating layout properties (`width`, `height`, `top`, `left`).
3. **Responsive Triggers**:
   - Use `ScrollTrigger.matchMedia()` to disable intensive animations or pin logic on mobile screens (< 768px).
