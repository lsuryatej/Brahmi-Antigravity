# AI Design Context: Brahmi Antigravity

This repository represents a boutique, craft-led clothing brand ("Brahmi") focusing on minimalism, artisanal values, and understated premium aesthetics.

## 1. Typography (Non-Negotiable)
The typography is designed to feel "quiet" and precise.
- **Font Family**: Use the `font-mono` family for all paragraph sections.
- **Product Details**: Titles and Prices must remain ~40% smaller than standard browser defaults to maintain a minimalist look.
- **Paragraph Styles**:
  - Always apply `text-justify` to text blocks.
  - Apply `tracking-tighter` and `[word-spacing:-0.21rem]` to condense the text.
  - **Mobile Constraints**: Paragraphs must use `text-[10px]` or `text-[8px]` to preserve negative space.

## 2. Layout Principles
- **Grid Consistency**: The Collections section on the Home page must maintain a **2-column grid** on both Mobile and Laptop. Avoid switching to a full-width mobile layout unless explicitly requested.
- **Alignment**: Text blocks should be centered using `mx-auto` but internally justified for a "squared" block appearance.
- **Borders**: Avoid heavy borders. Use subtle separators or negative space to define sections (e.g., the Founders' Note).

## 3. Technology Stack
- **Framework**: Next.js 15+ (App Router).
- **Styling**: Tailwind CSS (CSS-first, utility second).
- **Animations**: 
  - GSAP (ScrollTrigger) is the primary engine for the Hero Sequence.
  - Framer Motion is used for component-level micro-animations.
- **Performance**: High-resolution videos (`public/videos/`) must be lazy-loaded or handled via the InteractionObserver pattern implemented in `Collections.tsx`.

## 4. Operational Guardrails
- **Images**: When adding products, follow the manual upload pattern established in `src/lib/mockData/products.ts`.
- **Commits**: Use conventional commit messages (`feat:`, `fix:`, `style:`) as per the project history.
