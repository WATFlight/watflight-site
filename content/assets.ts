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
  "PROJ-HERO": slot(
    1260,
    420,
    "/images/projects/hydrogen-electric-uav-hero.png",
    "Layer 'image 27' (2172x724 PNG with transparency, same 3:1 ratio as the slot). A black-to-transparent top-to-bottom gradient is applied in CSS over it. Not the Home project image (a different layer: Home's is 692x290 'Screenshot 2026-10-28 at 9.25.59 PM 1'). Provenance unverified: the picture looks illustrative.",
  ),
  "PROJ-COMP-1": slot(
    161,
    62,
    "/images/projects/component-propulsion-system.png",
    "Layer 'image 28' (114x44 PNG), the render beside 'Hydrogen-Electric Propulsion System'.",
  ),
  "PROJ-COMP-2": slot(
    165,
    68,
    "/images/projects/component-aircraft-power-system.png",
    "Layer 'image 29' (116x48 PNG), the render beside 'Aircraft Power System'.",
  ),
  "PROJ-COMP-3": slot(
    159,
    64,
    "/images/projects/component-flight-control-stack.png",
    "Layer 'image 30' (112x45 PNG), the render beside 'Flight Control Stack'.",
  ),
  "PROJ-COMP-4": slot(
    181,
    68,
    "/images/projects/component-uav-platform.png",
    "Layer 'image 31' (128x48 PNG), the render beside 'UAV Platform'. The frame sizes it 181 wide at a 128:48 ratio.",
  ),
  "PROJ-ROADMAP": slot(
    1274,
    311,
    "/images/projects/project-roadmap.png",
    "Layer 'Screenshot 2026-10-30 at 9.24.24 PM 1' (1630x398 PNG). One raster: the stage labels, titles and descriptions are baked into the picture, so a visually hidden list repeats them for assistive technology. Pending verification.",
  ),
  "PROJ-GALLERY-1": slot(
    440,
    158,
    "/images/projects/gallery-airframe-assembly.png",
    "Layer 'image 32' (1672x941 PNG). Frame crop: centered object-fit: cover (offset -28.48% against 28.35% centered).",
  ),
  "PROJ-GALLERY-2": slot(
    441,
    188,
    "/images/projects/gallery-systems-whiteboard.png",
    "Layer 'image 33' (1672x941 PNG). Frame crop: object-position 50% 19.8% (top offset -6.35% of the frame). The whiteboard carries handwritten figures that are unverified, see docs/rebuild-notes.md.",
  ),
  "PROJ-GALLERY-3": slot(
    428,
    353,
    "/images/projects/gallery-flight-software-monitors.png",
    "Layer 'Screenshot 2026-10-30 at 9.38.14 PM 1' (666x572 PNG). Frame crop: bottom-aligned (object-position 50% 100%, top offset -4%).",
  ),
  "PROJ-GALLERY-4": slot(
    425,
    353,
    "/images/projects/gallery-runway-flight.png",
    "Layer 'Screenshot 2026-10-30 at 9.39.10 PM 1' (682x566 PNG). Frame crop: centered object-fit: cover.",
  ),
} satisfies Record<string, AssetSlot>;

export type AssetSlotId = keyof typeof assetSlots;
