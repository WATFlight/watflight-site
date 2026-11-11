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
  /** Public path (for example `/images/home/hero.jpg`), or `null` while the asset is missing. */
  path: string | null;
  /** Slot size in the 1440px Figma frame, used for the aspect ratio. */
  width: number;
  height: number;
  note?: string;
};

const slot = (width: number, height: number, note?: string): AssetSlot => ({
  path: null,
  width,
  height,
  note,
});

export const assetSlots = {
  // Home 262:79
  "HOME-HERO": slot(1440, 810, "Hero aircraft photo with left and right black gradients"),
  "HOME-GLOBE": slot(993, 397, "Earth image with top and left fades"),
  "HOME-PROJECT": slot(760, 332, "Project image beside the project card"),
  "HOME-PROGRESS": slot(677, 212, "One source image cropped three ways; source size approximate"),

  // About Us 262:80
  "ABOUT-HERO": slot(729, 397, "Hero image with left-to-black gradient"),

  // Current Project 333:496
  "PROJ-HERO": slot(1260, 420, "Hero image with top-to-transparent gradient"),
  "PROJ-COMP-1": slot(161, 62, "Component logo or render, identity unknown"),
  "PROJ-COMP-2": slot(165, 68, "Component logo or render, identity unknown"),
  "PROJ-COMP-3": slot(159, 64, "Component logo or render, identity unknown"),
  "PROJ-COMP-4": slot(181, 68, "Component logo or render, identity unknown"),
  "PROJ-ROADMAP": slot(1274, 311, "Raster in the comp; contents unverified"),
  "PROJ-GALLERY-1": slot(440, 158),
  "PROJ-GALLERY-2": slot(441, 188),
  "PROJ-GALLERY-3": slot(428, 353),
  "PROJ-GALLERY-4": slot(425, 353),
} satisfies Record<string, AssetSlot>;

export type AssetSlotId = keyof typeof assetSlots;
