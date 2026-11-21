import type { ReactNode } from "react";
import type { ApplyIcon, SubteamIcon } from "@/content/join";
import { cn } from "@/lib/cn";

// The Join frame's icons are part of its flattened screenshot and have no vector source, so these are
// simple line icons drawn for this page in the same subjects (a wrench, a chip, curly braces, a document,
// an envelope, two people): 1.6px round strokes in the current text color, no copied artwork. The one
// exception is the wrench, which reuses the outline wrench the About page's Mechanical discipline already
// uses (public/images/about/subteam-mechanical-wrench.svg): its two paths are inlined here, filled with the
// current text color instead of that file's fixed grey, so it is cream like the other two. They are
// decorative (aria-hidden): the adjacent heading or label already says everything.

type Glyph = { viewBox: string; width: number; height: number; shapes: ReactNode; filled?: boolean };

const subteamGlyphs: Record<SubteamIcon, Glyph> = {
  // About's wrench: an outline drawn as filled paths on a 30x30 grid (about 1.5 units thick), shown at 36px so
  // its 26-unit drawing is as big as the chip's and its outline as thick as the 1.6px strokes of the others.
  wrench: {
    viewBox: "0 0 30 30",
    width: 36,
    height: 36,
    filled: true,
    shapes: (
      <>
        <path d="M27.65 21.7583L16.9583 11.0667C17.2665 9.67096 17.1818 8.21715 16.7137 6.86667C16.2455 5.51618 15.4123 4.32185 14.3064 3.41628C13.2006 2.51071 11.8654 1.92933 10.4491 1.73669C9.03284 1.54405 7.59088 1.74769 6.28333 2.325L5.16667 2.81667L9.65 7.3L7.3 9.65833L2.81667 5.175L2.325 6.28333C1.74439 7.5908 1.53825 9.0338 1.72954 10.4515C1.92084 11.8693 2.50206 13.206 3.40843 14.3129C4.3148 15.4197 5.51071 16.2531 6.86289 16.7202C8.21506 17.1873 9.67039 17.2697 11.0667 16.9583L21.7583 27.65C21.9131 27.805 22.0969 27.9279 22.2993 28.0118C22.5016 28.0956 22.7185 28.1388 22.9375 28.1388C23.1565 28.1388 23.3734 28.0956 23.5757 28.0118C23.7781 27.9279 23.9619 27.805 24.1167 27.65L27.65 24.1167C27.805 23.9619 27.9279 23.7781 28.0118 23.5757C28.0956 23.3734 28.1388 23.1565 28.1388 22.9375C28.1388 22.7185 28.0956 22.5016 28.0118 22.2993C27.9279 22.0969 27.805 21.9131 27.65 21.7583ZM22.9333 26.475L11.5667 15.1L11.0917 15.2333C10.1871 15.4978 9.23336 15.5476 8.3062 15.3787C7.37904 15.2099 6.50406 14.8271 5.75082 14.2607C4.99757 13.6944 4.38684 12.9601 3.96717 12.1163C3.5475 11.2725 3.33047 10.3424 3.33333 9.4C3.3323 8.98568 3.37419 8.57236 3.45833 8.16667L7.3 12.0083L12.0167 7.29167L8.175 3.45833C9.19993 3.24318 10.2631 3.29739 11.2609 3.61567C12.2586 3.93395 13.1568 4.50543 13.8678 5.27436C14.5788 6.04328 15.0783 6.98339 15.3177 8.00295C15.557 9.0225 15.5279 10.0867 15.2333 11.0917L15.1 11.5667L26.475 22.9417L22.9333 26.475Z" />
        <path d="M23.3737 23.3427C23.7967 22.9196 23.7967 22.2337 23.3737 21.8106C22.9506 21.3876 22.2647 21.3876 21.8416 21.8106C21.4185 22.2337 21.4185 22.9196 21.8416 23.3427C22.2647 23.7658 22.9506 23.7658 23.3737 23.3427Z" />
      </>
    ),
  },
  chip: {
    viewBox: "0 0 40 40",
    width: 40,
    height: 40,
    shapes: (
      <>
        <rect x="9" y="9" width="22" height="22" rx="2" />
        <rect x="14.500" y="14.500" width="11" height="11" rx="1" />
        <path d="M15 4v5M20 4v5M25 4v5M15 31v5M20 31v5M25 31v5M4 15h5M4 20h5M4 25h5M31 15h5M31 20h5M31 25h5" />
      </>
    ),
  },
  braces: {
    viewBox: "0 0 40 40",
    width: 40,
    height: 40,
    shapes: (
      <>
        <path d="M15 5c-4 0-5.500 2-5.500 5.500v4c0 3-1.500 5-4.500 5.500 3 .5 4.500 2.500 4.500 5.500v4c0 3.500 1.500 5.500 5.500 5.500" />
        <path d="M25 5c4 0 5.500 2 5.500 5.500v4c0 3 1.500 5 4.500 5.500-3 .5-4.500 2.500-4.500 5.500v4c0 3.500-1.500 5.500-5.500 5.500" />
      </>
    ),
  },
};

const applyGlyphs: Record<ApplyIcon, Glyph> = {
  document: {
    viewBox: "0 0 40 40",
    width: 40,
    height: 40,
    shapes: (
      <>
        <path d="M11 4h13l8 8v22a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
        <path d="M24 4v6a2 2 0 0 0 2 2h6M14 19h12M14 25h12M14 31h7" />
      </>
    ),
  },
  mail: {
    viewBox: "0 0 40 40",
    width: 40,
    height: 40,
    shapes: (
      <>
        <rect x="3" y="8" width="34" height="24" rx="3" />
        <path d="m4.500 11 15.500 12 15.500-12" />
      </>
    ),
  },
  people: {
    viewBox: "0 0 40 40",
    width: 40,
    height: 40,
    shapes: (
      <>
        <circle cx="16" cy="12.500" r="6" />
        <path d="M4 35v-3c0-5.500 5-9 12-9s12 3.500 12 9v3" />
        <path d="M27 6.700a6 6 0 0 1 0 11.600M31 24c4 1 6.500 4 6.500 8v3" />
      </>
    ),
  },
};

function Icon({ glyph, className }: { glyph: Glyph; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={glyph.viewBox}
      width={glyph.width}
      height={glyph.height}
      fill={glyph.filled ? "currentColor" : "none"}
      stroke={glyph.filled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
    >
      {glyph.shapes}
    </svg>
  );
}

export function SubteamGlyph({ name, className }: { name: SubteamIcon; className?: string }) {
  return <Icon glyph={subteamGlyphs[name]} className={className} />;
}

export function ApplyGlyph({ name, className }: { name: ApplyIcon; className?: string }) {
  return <Icon glyph={applyGlyphs[name]} className={className} />;
}
