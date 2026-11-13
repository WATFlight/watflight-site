// Asset-slot registry.
//
// Every image slot measured in the approved Figma frames gets an id here. `path` stays `null`
// until an exact, approved asset exists in `public/`. `MediaFrame` renders an empty framed slot
// for `null` entries, so a missing image can never be silently replaced by unrelated photography.
// The `null` entries in this file are the machine-checkable missing-asset list.
//
// Slots for Sponsorship, Join and News are not listed yet: those frames are flattened images and
// their slots have not been measured. Add them when those sections are built.

export type AssetSlot = {
  /** Public path (for example `/images/home/hero-aircraft.png`), or `null` while the asset is missing. */
  path: string | null;
  /** Aspect-ratio basis: the slot size in the 1440px Figma frame (or the source size where noted). */
  width: number;
  height: number;
  note?: string;
};

const slot = (width: number, height: number, path: string | null, note?: string): AssetSlot => ({
  path,
  width,
  height,
  note,
});

export const assetSlots = {
  // Home 262:79
  "HOME-HERO": slot(1440, 810, "/images/home/hero-aircraft.png", "Layer 'image 10'. Left and right black gradients are applied in CSS."),
  "HOME-GLOBE": slot(993, 397, "/images/home/earth-horizon.png", "Layer 'GLOBE'. Top and left fades are applied in CSS."),
  "HOME-PROJECT": slot(
    760,
    332,
    "/images/home/hydrogen-electric-uav-program.png",
    "Layer 'Screenshot 2026-10-28 at 9.25.59 PM 1'. ENABLED by the owner. The raster has spec numbers baked into the artwork (wingspan 2.8 m, payload 2.0 kg, cruise speed 25 m/s) that no approved text supports; they are unverified and need team confirmation.",
  ),
  "HOME-PROGRESS": slot(
    2172,
    724,
    "/images/home/development-progress-blueprints.png",
    "Layer 'image 11': one source image, cropped three ways in the development-progress row. Size is the source size.",
  ),

  // About Us 262:80
  "ABOUT-HERO": slot(
    729,
    397,
    "/images/about/about-hero-workshop-team.png",
    "Layer 'Rectangle 39' (image fill, 1823x863 source). Figma crops it with object-fit: cover, centered, into 729x397; the left-to-black gradient (black to transparent at 71.154%) is applied in CSS. Provenance unverified: the picture looks illustrative, confirm it is an approved team photo.",
  ),

  // Current Project 333:496
  "PROJ-HERO": slot(1260, 420, null, "Hero image with top-to-transparent gradient"),
  "PROJ-COMP-1": slot(161, 62, null, "Component logo or render, identity unknown"),
  "PROJ-COMP-2": slot(165, 68, null, "Component logo or render, identity unknown"),
  "PROJ-COMP-3": slot(159, 64, null, "Component logo or render, identity unknown"),
  "PROJ-COMP-4": slot(181, 68, null, "Component logo or render, identity unknown"),
  "PROJ-ROADMAP": slot(1274, 311, null, "Raster in the comp; contents unverified"),
  "PROJ-GALLERY-1": slot(440, 158, null),
  "PROJ-GALLERY-2": slot(441, 188, null),
  "PROJ-GALLERY-3": slot(428, 353, null),
  "PROJ-GALLERY-4": slot(425, 353, null),
} satisfies Record<string, AssetSlot>;

export type AssetSlotId = keyof typeof assetSlots;
