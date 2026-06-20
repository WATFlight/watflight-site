# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/landing site for **WATFlight**, a University of Waterloo student team building aviation technology (their first project is the MiniFlight EVTOL). It is a single-page, scroll-driven site — there is one route (`/`) that stacks section components vertically.

The repo was scaffolded from a v0 e-commerce template (`metadata.generator = "v0.app"`, README still references the old template name) and repurposed. Several `components/sections/*` files are leftover e-commerce sections that are **not rendered** — see "Active vs. dead sections" below.

## Commands

```bash
pnpm dev      # local dev server at http://localhost:3000
pnpm build    # production build (next build)
pnpm start    # serve the production build
pnpm lint     # script is "eslint ." but eslint is NOT installed/configured — this will fail
```

- **Package manager: pnpm** (CI uses pnpm@10). A `package-lock.json` also exists but the deploy pipeline uses `pnpm-lock.yaml`; prefer pnpm to keep them from diverging.
- No test setup exists.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so **`pnpm build` will not catch type errors**. Run `pnpm exec tsc --noEmit` to type-check explicitly.
- `images.unoptimized: true` — `next/image` is used (including remote Unsplash URLs) but the Vercel image optimizer is bypassed.

## Deployment — main auto-deploys to production

`.github/workflows/deploy.yml` runs `vercel deploy --prebuilt --prod` on **every push to `main`** (and manual dispatch). The v0 integration can also push commits directly to this repo. Treat any merge/push to `main` as a production release.

## Architecture

### Page composition
`app/page.tsx` is the entire page: it imports section components from `components/sections/` and renders them in display order. `app/layout.tsx` wraps everything in `ThemeProvider` (next-themes, `defaultTheme="dark"`, `enableSystem={false}`) and the fixed `Header`, and loads the Inter font as `--font-inter`. To reorder/add/remove a section on the page, edit `app/page.tsx`.

### Section anchors and navigation (read these together)
Navigation depends on three things staying in sync:

1. Each section renders a DOM `id` (e.g. `id="technology"`). These ids are the scroll anchors.
2. **`components/header.tsx`** — fixed top pill nav; links are `href="#<id>"`.
3. **`components/progression-nav.tsx`** — desktop-only right-side dot rail. It has its own hardcoded `sections` array (`{ id, label }`) that drives both the scroll-progress indicator and active-section highlighting via `getBoundingClientRect`.

Both navs call **`navigateToSection(id)`** from **`lib/smooth-scroll.ts`**, which does an *instant* `window.scrollTo` (no smooth animation). This is deliberate: scroll-driven section animations would strobe if the page animated its way through every section on a nav jump. Don't "fix" it by adding `behavior: "smooth"`.

When adding/renaming a section you must update: the section's `id`, the matching `href` in `header.tsx`, and the `sections` array in `progression-nav.tsx`. Note the existing nav lists are already partly out of sync with the rendered ids (e.g. some ids like `accessories`/`gallery` come from dead sections and aren't in any nav) — verify ids by grepping `id="` rather than trusting the nav arrays.

### Active vs. dead sections
Rendered by `app/page.tsx`: `hero`, `philosophy`, `technology`, `editorial`, `testimonials`, `competitions`, `sponsorship`, `team`.

Present in `components/sections/` but **unused** (e-commerce leftovers — do not assume they're live): `collection-section`, `featured-products-section`, `gallery-section`, `footer-section`.

### Styling and theming
- **Tailwind CSS v4**, CSS-first config. There is no `tailwind.config.*`; theme tokens live as CSS variables in **`app/globals.css`** (`:root` = light, `.dark` = dark). PostCSS uses `@tailwindcss/postcss`.
- `--radius: 0rem` (sharp corners are intentional across the design).
- The amber accent used by the progression nav is a hardcoded `oklch(0.78 0.14 75)`, not a theme token.
- **`styles/globals.css` is dead** — nothing imports it. The live stylesheet is `app/globals.css` (imported by `app/layout.tsx`). Edit `app/globals.css`.

### UI components
`components/ui/` is shadcn/ui (~57 generated components, "new-york" style, lucide icons). Add new ones with the shadcn CLI rather than hand-writing; config is in `components.json`. Use the `cn()` helper from `lib/utils.ts` for class merging.

### Conventions
- Path alias `@/*` maps to the repo root (`@/components`, `@/lib`, `@/hooks`, `@/components/ui`).
- Section and nav components that use hooks/browser APIs are Client Components (`"use client"`); keep new interactive section logic client-side.
