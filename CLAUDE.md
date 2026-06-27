# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/landing site for **WATFlight**, a University of Waterloo student team building sustainable aviation technology (their first project is the MiniFlight EVTOL). It is a single-page, scroll-driven site — there is one route (`/`) that stacks section components vertically.

The repo was scaffolded from a v0 e-commerce template (`metadata.generator = "v0.app"`, README still references the old template name) and repurposed. The leftover e-commerce section files have since been removed; only the sections imported by `app/page.tsx` remain.

## Commands

```bash
pnpm dev      # local dev server at http://localhost:3000
pnpm build    # production build (next build)
pnpm start    # serve the production build
pnpm lint     # script is "eslint ." but eslint is NOT installed/configured — this will fail
```

- **Package manager: pnpm** (`pnpm-lock.yaml`). A `package-lock.json` also exists; pick one consistently to avoid divergence. (If `pnpm` isn't installed locally, `npm install` against `package-lock.json` also works for dev.)
- No test setup exists.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so **`pnpm build` will not catch type errors**. Run `pnpm exec tsc --noEmit` (or `npx tsc --noEmit`) to type-check explicitly.
- `images.unoptimized: true` — `next/image` is used but the Vercel image optimizer is bypassed; AVIF/WebP/PNG in `public/images/` are served as-is.

## Deployment — main auto-deploys to production

Production (**watflight.com**) is deployed by **Vercel's native Git integration**: every push to `main` triggers a Vercel build + deploy automatically. Treat any merge/push to `main` as a production release. (The v0 integration can also push commits directly to this repo.)

There is **no GitHub Actions deploy workflow**. A former `.github/workflows/deploy.yml` ran `vercel deploy --prebuilt --prod` against a *separate, now-stale* Vercel project (`watflight-website-main`) using a `VERCEL_TOKEN` secret that kept expiring; it never deployed `watflight.com` and was removed. Don't reintroduce a CI deploy without confirming it's actually needed.

## Architecture

### Page composition
`app/page.tsx` is the entire page: it imports section components from `components/sections/` and renders them in display order. `app/layout.tsx` wraps everything in `ThemeProvider` (next-themes, **`forcedTheme="dark"`** — the site is dark-only, there is no theme toggle) and the fixed `Header`, and loads the Inter font as `--font-inter`. To reorder/add/remove a section on the page, edit `app/page.tsx`.

### Rendered sections and their ids
In `app/page.tsx` order:

| Component | id(s) |
|---|---|
| `HeroSection` | `hero` |
| `TestimonialsSection` | `testimonials` |
| `CompetitionsSection` | `competitions` |
| `SponsorshipSection` | `sponsors` |
| `TeamSection` | `team`, `join` |

`TeamSection` carries **two** ids (`team` and `join`), so the header's "Join" link resolves to the team section. Earlier iterations had `philosophy` / `technology` / `editorial` sections — those files have been deleted (recoverable from git history).

### Navigation (keep these in sync with the section ids)
Two navs, both calling **`navigateToSection(id)`** from **`lib/smooth-scroll.ts`**, which does an *instant* `window.scrollTo` (no smooth animation). This is deliberate: the scroll-driven section animations would strobe if the page animated through every section on a nav jump. Don't "fix" it by adding `behavior: "smooth"`.

1. **`components/header.tsx`** — fixed top pill nav. Links are driven by a `navLinks` array (`Competitions` / `Sponsors` / `Team`) plus a `Join` CTA and the logo (→ top).
2. **`components/progression-nav.tsx`** — desktop-only right-side dot rail with its own hardcoded `sections` array (`hero` / `testimonials` / `team`); drives the scroll-progress indicator and active-section highlighting via `getBoundingClientRect`.

Not every section appears in every nav. When adding/renaming a section, update its `id`, the relevant nav array(s), and verify by grepping `id="` rather than trusting the nav lists.

### Scroll animations
Several sections (notably `hero`) compute a 0–1 scroll `progress` from `getBoundingClientRect` and drive `opacity`/`transform`/width from it. Guard divisors against zero (e.g. `scrollableHeight > 0 ? … : 0`) — an unguarded `0/0` yields `NaN`, and `Math.max(0, Math.min(1, NaN))` stays `NaN`, which React rejects as an `opacity` value and logs an error.

### Styling and theming
- **Tailwind CSS v4**, CSS-first config. There is no `tailwind.config.*`; theme tokens live as CSS variables in **`app/globals.css`** (`:root` = light, `.dark` = dark). PostCSS uses `@tailwindcss/postcss`.
- The site is **forced dark**, so the `.dark` tokens are always active and the `:root` light tokens are currently unused (kept as a base/fallback).
- `--radius: 0rem` (sharp corners are intentional across the design).
- The amber accent used by the progression nav is a hardcoded `oklch(0.78 0.14 75)`, not a theme token. The sponsor logo tiles use a hardcoded dark `oklch(0.14 0.01 250)` so reversed/white sponsor logos read on any theme.
- **`styles/globals.css` is dead** — nothing imports it. The live stylesheet is `app/globals.css` (imported by `app/layout.tsx`). Edit `app/globals.css`.

### UI components
`components/ui/` is shadcn/ui (~57 generated components, "new-york" style, lucide icons). Add new ones with the shadcn CLI rather than hand-writing; config is in `components.json`. Use the `cn()` helper from `lib/utils.ts` for class merging.

### Conventions
- Path alias `@/*` maps to the repo root (`@/components`, `@/lib`, `@/hooks`, `@/components/ui`).
- Section and nav components that use hooks/browser APIs are Client Components (`"use client"`); keep new interactive section logic client-side.
