import type { ReactNode } from "react";
import type { SponsorshipIconName } from "@/content/sponsorship";
import { cn } from "@/lib/cn";

// The design draws one small line icon above each "Why partner" card title and beside each "Ways to
// support" row. They are part of the flattened AI screenshot, so they cannot be extracted; these are
// simple replacements drawn for this page (a 24px grid, 1.4px round strokes, no copied artwork) that
// follow the design's subjects: people, light bulb, gear, cube, crossed tools and bars. They are
// decorative (the adjacent title says everything), so they are hidden from assistive technology.
const gearPath =
  "M10.27 4.50L10.61 2.10L13.39 2.10L13.73 4.50A7.7 7.7 0 0 1 16.08 5.47L18.02 4.01L19.99 5.98L18.53 7.92A7.7 7.7 0 0 1 19.50 10.27L21.90 10.61L21.90 13.39L19.50 13.73A7.7 7.7 0 0 1 18.53 16.08L19.99 18.02L18.02 19.99L16.08 18.53A7.7 7.7 0 0 1 13.73 19.50L13.39 21.90L10.61 21.90L10.27 19.50A7.7 7.7 0 0 1 7.92 18.53L5.98 19.99L4.01 18.02L5.47 16.08A7.7 7.7 0 0 1 4.50 13.73L2.10 13.39L2.10 10.61L4.50 10.27A7.7 7.7 0 0 1 5.47 7.92L4.01 5.98L5.98 4.01L7.92 5.47A7.7 7.7 0 0 1 10.27 4.50Z";

const shapes: Record<SponsorshipIconName, ReactNode> = {
  users: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M2.75 19.5c0-3.45 2.8-6 6.25-6s6.25 2.55 6.25 6" />
      <path d="M15.5 4.9a3.25 3.25 0 0 1 0 6.2" />
      <path d="M17.2 13.9c2.4.6 4.05 2.6 4.05 5.6" />
    </>
  ),
  bulb: (
    <>
      <path d="M9.5 18.25h5" />
      <path d="M10.25 21h3.5" />
      <path d="M12 2.75a6.25 6.25 0 0 0-3.6 11.35c.7.5 1.1 1.2 1.1 2.15h5c0-.95.4-1.65 1.1-2.15A6.25 6.25 0 0 0 12 2.75z" />
    </>
  ),
  gear: (
    <>
      <path d={gearPath} />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2.75 20 7.25v9.5l-8 4.5-8-4.5v-9z" />
      <path d="M4 7.25 12 12l8-4.75" />
      <path d="M12 12v9.25" />
    </>
  ),
  tools: (
    <>
      <g transform="rotate(45 12 12)">
        <path d="M9 2.5v4.3a3 3 0 0 0 6 0V2.5" />
        <path d="M10.5 9.6v9.9a1.5 1.5 0 0 0 3 0V9.6" />
      </g>
      <g transform="rotate(-45 12 12)">
        <path d="M12 2.5v8.6" />
        <path d="M10.2 11.1h3.6v8.4a1.8 1.8 0 0 1-3.6 0z" />
      </g>
    </>
  ),
  chart: (
    <>
      <rect x="3" y="13" width="4.5" height="8" rx="1" />
      <rect x="9.75" y="8" width="4.5" height="13" rx="1" />
      <rect x="16.5" y="3" width="4.5" height="18" rx="1" />
    </>
  ),
};

export function SponsorshipIcon({ name, className }: { name: SponsorshipIconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
    >
      {shapes[name]}
    </svg>
  );
}
