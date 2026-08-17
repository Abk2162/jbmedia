---
name: shadcn-ui-patterns
description: Patterns for implementing accessible, customizable Radix and Tailwind UI components.
---

# shadcn/ui Component Standards

## Setup & Architecture
1. **Utility Helpers**: Always utilize `cn(...)` from `clsx` and `tailwind-merge` for class merging.
2. **Accessible Primitives**:
   - `Dialog` & Lightbox: Manage focus trap, backdrop blur, ESC key closing, and ARIA labels.
   - `Tabs`: Accessible tab navigation with keyboard left/right arrow switching.
   - `Accordion`: Smooth height collapse transitions with chevron indicators.
   - `Sheet`: Slide-over drawer for mobile navigation and side panels.
3. **Custom Theme Integration**: Bind component styles directly to the Tailwind brand theme tokens.
