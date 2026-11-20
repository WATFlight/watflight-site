// Asset-slot registry.
//
// Every image slot measured in the approved Figma frames gets an id here. `path` stays `null`
// until an exact, approved asset exists in `public/`. `MediaFrame` renders an empty framed slot
// for `null` entries, so a missing image can never be silently replaced by unrelated photography.
// The `null` entries in this file are the machine-checkable missing-asset list.
//
// Slots for Join and News are not listed yet: those frames are flattened images and their slots
// have not been measured. Add them when those sections are built. Sponsorship's two photographs are
// listed below as crops of the owner's export of its flattened body.

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
  // The roadmap's four illustrations: original SVG artwork (vector paths and strokes, no embedded raster, no
  // external resource), redrawn as crisp, scalable replacements for the four blurry raster crops that the
  // first live-text version used. The crops of the frame's single roadmap raster ('Screenshot 2026-10-30 at
  // 9.24.24 PM 1', 1630x398, since removed from the project) served only as visual references for silhouette,
  // composition, angle, colour and density; nothing was auto-traced. They are stylistic illustrations, not
  // engineering models. Slot size = the SVG's viewBox (the crops' own sizes, so the layout is unchanged).
  "PROJ-ROADMAP-1": slot(
    326,
    172,
    "/images/projects/roadmap-concept.svg",
    "SVG redraw of the Concept picture: a blue blueprint-style aircraft with dimension lines. Transparent background.",
  ),
  "PROJ-ROADMAP-2": slot(
    330,
    157,
    "/images/projects/roadmap-simulation.svg",
    "SVG redraw of the Simulation picture: an aircraft with a tall tail fin among aerodynamic flow lines. Transparent background.",
  ),
  "PROJ-ROADMAP-3": slot(
    308,
    176,
    "/images/projects/roadmap-integration.svg",
    "SVG redraw of the Integration picture: an exploded view with two wing panels around a row of generic components. Transparent background.",
  ),
  "PROJ-ROADMAP-4": slot(
    335,
    125,
    "/images/projects/roadmap-flight.svg",
    "SVG redraw of the Flight picture: a finished aircraft with swept wings and two propellers. Transparent background.",
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

  // Sponsorship 340:771. The frame's body is one flattened, AI-generated raster ('image 34'), so these
  // two are CROPS of the owner's 3x PNG export of the frame (4320x9573), not Figma layers. Both pictures
  // are illustrative and their provenance is unverified (docs/rebuild-notes.md, "Sponsorship page").
  "SPONSORSHIP-HERO": slot(
    644,
    468,
    "/images/sponsorship/sponsorship-hero-hangar-aircraft.jpg",
    "Crop x=2254 y=670 w=1772 h=1244 of the 3x export (80px inside the design's blue corner brackets and faint inner frame, which are interface elements and are excluded); saved as JPEG q92. The slot is the bracket rectangle, 644x468 in the 1440px frame; the crop is slightly tighter. AI-generated: soft (the export upscales a lower-resolution raster) and the fuselage lettering is garbled.",
  ),
  "SPONSORSHIP-WAYS": slot(
    546,
    562,
    "/images/sponsorship/sponsorship-ways-wing-inspection.jpg",
    "Crop x=2547 y=4097 w=1479 h=1526 of the 3x export (80px inside the design's blue corner brackets and a faint blue inner frame line, excluded); saved as JPEG q92. The slot is the bracket rectangle, 546x562 in the 1440px frame. AI-generated and soft; the logo on the jacket is garbled.",
  ),
} satisfies Record<string, AssetSlot>;

export type AssetSlotId = keyof typeof assetSlots;
