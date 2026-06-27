# WATFlight Website

WATFlight is a University of Waterloo student design team advancing sustainable aviation technology. This repository contains the team's single-page public website.

## Development

Requirements:

- Node.js 20+
- pnpm 10.33.3

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). If that port is occupied, Next.js will print the alternate port.

## Quality Commands

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

All three validation commands must pass before deployment. The production build uses Next.js's supported Webpack path for deterministic local and CI builds.

## Architecture

- `app/page.tsx` defines the order of the single-page sections.
- `components/sections/` contains the rendered page sections.
- `content/site-content.ts` is the source of truth for navigation, competitions, sponsors, team members, join steps, and social links.
- `components/section-heading.tsx` provides the shared heading treatment for peer sections.
- `lib/scroll-store.ts` owns the single scroll/resize listener shared by the hero and progression navigation.
- `app/globals.css` contains the Tailwind theme tokens and the small amount of global animation CSS.

Most sections are React Server Components. Only the fixed header, scroll-driven hero, and progression navigation are client components.

The site uses an Inter-first system font stack and does not fetch fonts during the production build.

## Images

Runtime images live in `public/images/` and are rendered through `next/image`. When adding a `fill` image, provide an accurate `sizes` value so the optimizer can select an appropriate source width.

## Deployment

The production site is deployed through Vercel's Git integration. A push to `main` triggers a production build and deployment.
