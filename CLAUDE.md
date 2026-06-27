# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/landing site for **WATFlight**, a University of Waterloo student team building sustainable aviation technology (their first project is the MiniFlight EVTOL). It is a single-page, scroll-driven site — there is one route (`/`) that stacks section components vertically.

The repo was scaffolded from a v0 e-commerce template (`metadata.generator = "v0.app"`, README still references the old template name) and repurposed. The leftover e-commerce section files have since been removed; only the sections imported by `app/page.tsx` remain.

## Commands

```bash
pnpm dev        # local dev server at http://localhost:3000
pnpm lint       # ESLint with Next.js core-web-vitals and TypeScript rules
pnpm typecheck  # strict TypeScript check without emitting files
pnpm build      # production build (next build)
pnpm start      # serve the production build
```

- **Package manager: pnpm** (`pnpm-lock.yaml`). Do not add a second lock file.
- No test setup exists.
- Production builds enforce TypeScript errors. Run `pnpm typecheck` directly for a faster type-only check.
- `next/image` optimization is enabled. Every `fill` image must include a realistic `sizes` value.

## Deployment — main auto-deploys to production

Production (**watflight.com**) is deployed by **Vercel's native Git integration**: every push to `main` triggers a Vercel build + deploy automatically. Treat any merge/push to `main` as a production release. (The v0 integration can also push commits directly to this repo.)

There is **no GitHub Actions deploy workflow**. A former `.github/workflows/deploy.yml` ran `vercel deploy --prebuilt --prod` against a *separate, now-stale* Vercel project (`watflight-website-main`) using a `VERCEL_TOKEN` secret that kept expiring; it never deployed `watflight.com` and was removed. Don't reintroduce a CI deploy without confirming it's actually needed.

## Architecture

### Page composition
`app/page.tsx` is the entire page: it imports section components from `components/sections/` and renders them in display order. `app/layout.tsx` applies the permanent dark theme on the root element, renders the fixed Header, and loads the Inter font as `--font-inter`. To reorder/add/remove a section on the page, edit `app/page.tsx`.

Shared site content and navigation records live in `content/site-content.ts`. Keep labels, section ids, links, team records, and sponsor records there rather than duplicating them inside components.

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
Two navs, both calling **`navigateToSection(id)`** from **`lib/smooth-scroll.ts`**, which does an *instant* `window.scrollTo` (no smooth animation). This is deliberate: the scroll-driven section animations would strobe if the page animated through every section on a nav jump. Don't "fix" it by adding `behavior: "smooth"`. Their records are centralized in `content/site-content.ts`.

1. **`components/header.tsx`** — fixed top pill nav plus a `Join` CTA and the logo (→ top).
2. **`components/progression-nav.tsx`** — desktop-only right-side dot rail with continuous page progress and active-section highlighting.

Not every section appears in every nav. When adding/renaming a section, update its `id`, the relevant nav array(s), and verify by grepping `id="` rather than trusting the nav lists.

### Scroll animations
`lib/scroll-store.ts` owns the single passive scroll/resize listener and RAF scheduler. Hero updates CSS custom properties imperatively so scrolling does not rerender its image tree; ProgressionNav updates its line with `scaleY` and only changes React state when the active section changes. Keep new scroll consumers on this shared subscription.

### Styling and theming
- **Tailwind CSS v4**, CSS-first config. There is no `tailwind.config.*`; theme tokens live as CSS variables in **`app/globals.css`** (`:root` = light, `.dark` = dark). PostCSS uses `@tailwindcss/postcss`.
- The site is permanently dark; `app/layout.tsx` sets the `.dark` class directly and no theme Provider is loaded.
- `--radius: 0rem` (sharp corners are intentional across the design).
- The amber accent used by the progression nav is a hardcoded `oklch(0.78 0.14 75)`, not a theme token. The sponsor logo tiles use a hardcoded dark `oklch(0.14 0.01 250)` so reversed/white sponsor logos read on any theme.
- The live stylesheet is `app/globals.css` (imported by `app/layout.tsx`).

### Conventions
- Path alias `@/*` maps to the repo root (`@/components`, `@/content`, `@/lib`).
- Only components that use hooks or browser APIs should be Client Components. Static sections stay server-rendered.
