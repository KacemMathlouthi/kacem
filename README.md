# portfolio-kacem

Kacem Mathlouthi's personal one-page portfolio — a single, dark, centered bio
with brand logos, quick links, and a few small interactions.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (design tokens in `src/index.css`)
- **shadcn/ui** conventions with **Base UI** primitives
- **lucide-react** icons, **Geist** variable font
- **Bun** for install/scripts

## Development

```bash
bun install
bun run dev        # start the dev server
bun run build      # type-check + production build
bun run lint       # eslint
bun run format     # prettier
bun run typecheck  # tsc --noEmit
```

## Project structure

```
src/
  App.tsx                     # composition: Hero + Bio + SocialLinks in the frame
  main.tsx                    # entry point
  index.css                   # Tailwind, theme tokens, and custom animations
  lib/
    brands.ts                 # per-entity logo + accent color + link (single source)
    utils.ts                  # cn() helper
  components/
    portfolio/
      hero.tsx                # the heading
      bio.tsx                 # the narrative paragraphs
      brand.tsx               # entity name: inline logo + accent + optional link
      highlight.tsx           # white-emphasis inline term
      social-links.tsx        # GitHub / LinkedIn / X / résumé + copy-email
      copy-email-button.tsx   # copy-to-clipboard with mailto fallback
      icon-swap.tsx           # blur + scale crossfade between two icons
    icons/                    # inline brand glyphs (lucide dropped these)
    pixel-perfect/            # third-party registry components
      intersection2.tsx       # the framing rails around the content
      abhinav-bento-button.tsx# glossy bento surface (renders <a> or <button>)
public/
  logos/                      # inline entity logos
  favicon.svg
```

## Customizing

- **Text** — edit the paragraphs in `src/components/portfolio/bio.tsx`. Wrap a
  key term in `<Highlight>` (white) or an entity in `<Brand {...brands.x}>`.
- **Brands** — add/adjust logos, accent colors, and links in `src/lib/brands.ts`.
  Drop a new logo in `public/logos/` and reference it there.
- **Links** — edit the `socials` array in
  `src/components/portfolio/social-links.tsx`.
- **Theme** — the app is locked to dark via `class="dark"` on `<html>`; the
  color tokens (including the unused light palette) live in `src/index.css`.

## Notes

- The **résumé** button links to `/cv.pdf` — drop your PDF at `public/cv.pdf`
  to enable it.
- Interactions respect `prefers-reduced-motion`.
