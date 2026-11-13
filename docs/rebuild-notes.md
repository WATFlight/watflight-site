# Figma rebuild notes

Working notes for the Figma-based rebuild on `rebuild/figma-hifi`. Source frames: Home `262:79`, About Us `262:80`, Current Project `333:496`, Sponsorship `340:771`, Join the Team `344:1128`, News & Blog `344:1129`, Design System `77:2` in Figma file `ZTpRvqKrFDvxGgQ71b6xjt`.

Milestones so far: the foundation (tokens, type scale, fonts, shared shell and primitives, six route skeletons), the Home page, and the About page (frame `262:80`, see "About page" below). The other four pages, remaining Figma assets and legacy-file deletion come later.

## Fonts

| Family | Source | Loaded by |
|---|---|---|
| Geist (Regular, Medium) | Google Fonts | `next/font/google` in `app/layout.tsx`, `--font-geist` |
| Bunken Tech Sans SC Wide Medium | `app/fonts/BunkenTechSansSCWide-Med.otf` (Buntype, v1.45) | `next/font/local`, `--font-bunken-sc` |
| Bunken Tech Sans Std Wide Medium | `app/fonts/BunkenTechSansStdWide-Med.otf` (Buntype, v1.36) | `next/font/local`, `--font-bunken-std` |

**Rights:** Buntype's font license limits use to the licensee's own workstation unless a separate agreement grants more (https://www.buntype.com/license.html). The owner confirmed web-embedding rights in the working session on 2026-11-11. No license document is stored in the repo; keep the agreement with the team's records.

**Files:** the two `.otf` files are byte-identical copies of the originals installed on the owner's Mac (SHA-256 `808c2fef...41dd` and `aff166a4...ef62`). They are not converted or modified, and no other Bunken file (for example the Pro family) was copied. `next/font` self-hosts them with a metric-adjusted fallback to limit layout shift. The earlier temporary `local()` references were removed.

The SC cut draws lowercase as small caps natively, so no `font-variant-caps` is applied (synthesizing small caps on top shrinks them twice: measured 491px to 405px for "our mission" at 64px).

Audit result (Home, 1440px): all 29 text roles match Figma family, weight, size, line height and letter spacing. One real fix came out of the audit: the Join band paragraph is 18/22 in Figma (not a named style), now `type-band-body`; it was 18/29.

## Assets taken from the approved Home frame (262:79)

Downloaded from the asset URLs returned by the Home design-context call; no temporary Figma URLs remain in the repo.

| Saved as | Figma layer | Used for |
|---|---|---|
| `public/images/home/hero-aircraft.png` | `image 10` | Hero photo |
| `public/images/home/earth-horizon.png` | `GLOBE` | Mission image |
| `public/images/home/hydrogen-electric-uav-program.png` | `Screenshot 2026-10-28 at 9.25.59 PM 1` | Project image beside the project card (owner approved showing it; see "Needs verification" below) |
| `public/images/home/development-progress-blueprints.png` | `image 11` | Source for the three development-progress crops |
| `public/images/home/sponsors/*.png` (8 files) | `image 16, 23, 18, 19, 20, 24, 22, 25` | Sponsor logo sources, untouched (raster fills; names are read from the wordmark printed in each logo). The marquee uses the white versions in `sponsors/white/` |
| `public/images/home/sponsors/white/*.png` (8 files) | same layers | One-colour white logo artwork made from the sources above, see "Sponsor logo treatment" |
| `public/images/brand/watflight-lockup-dark.svg` | header `LOGO` | The same vector as the lockup with its fills changed to `#050505` (paths untouched); shown while the header is on its light theme |
| `public/images/brand/watflight-lockup.svg` | header `LOGO` | Header and footer logo (the exact vector; replaces the earlier temporary lockup) |
| `public/images/brand/watflight-wordmark-dark.svg` | `WATFLIGHT-wordmark 1` (Join band) | Wordmark in the cream Join band |
| `public/images/icons/support.svg`, `airplane-departure.svg`, `arrow-right.svg` | `Vector`, `streamline-cyber-color:airplane-departure`, `ant-design:arrow-right-outlined` | "Partner with us" diagram |
| `public/images/icons/social-linkedin.svg`, `social-instagram.svg`, `social-discord.svg` | footer `akar-icons:*` | Footer social links |

Not used from the Home frame: `image 21`, the `bxs:download` icon (no Sponsor Package button), and all line/grid SVGs (rebuilt with CSS; their colors and weights were read from the SVG files).

## Needs verification before launch

- **LAUNCH BLOCKER: faculty advisors (About).** The Figma About frame shows "Dr. John Doe" (Department of Mechanical & Mechatronics Engineering) and "Dr. Jane Doe" (Department of Electrical & Computer Engineering). They are placeholders and must not ship. `content/about.ts` therefore keeps `facultyAdvisory.advisors` empty and `FacultyAdvisory` renders nothing (no heading, no rule, no empty box) while it is empty. To launch the section, the team must supply real advisors (name, department, institution, and a portrait with alt text only if one exists) and add them to that array. No names, portraits, departments or biographies were invented.
- **Journey dates (About, D5):** "2025 Founded", "2025 Early Development", "2026 Autonomous Aviation" and "TODAY Current Stage" are transcribed from the frame and are provisional. They have not been verified against the team's records and no "current development stage" claim may be added until they are. The text is unchanged from Figma, including the missing full stop on the first three descriptions.
- **About hero photo provenance (`ABOUT-HERO`):** the exact `Rectangle 39` export is used, as instructed. The picture looks illustrative rather than documentary (people in black WATFlight apparel at a workshop bench, a WATFlight banner and a whiteboard of design notes). Confirm it is an approved photo of the team, and that anyone recognisable in it has agreed to its use. The alt text describes only what is visible and does not call the people team members.
- **Team roster (About):** JACKIE (Founder & Team Director), SHAOFU (Founder & Mechanical Lead), HIRAM (Electrical Lead), MANYA (Software Lead) are the frame's names and titles, still provisional (D2). The four portrait frames are empty in the comp and stay empty on purpose (decorative, `aria-hidden`); no legacy portrait was reused.
- **Home project image (`HOME-PROJECT`, `content/assets.ts`):** shown at the owner's request. The raster has a spec readout baked into the artwork (wingspan 2.8 m, payload 2.0 kg, cruise speed 25 m/s). No approved text supports those figures and the Current Project frame gives no quantitative specifications. They are unverified technical claims: confirm them with the team, or swap in an export without the overlay before this goes live. The alt text deliberately does not repeat the numbers. To remove the image, set the slot's `path` back to `null`.

## Hidden on purpose

- **Sponsor logo `image 21` stays hidden** (319:324): an unnamed 72x72 red circuit-tree mark. It resembles the Psycraft logo (now shown, taken from Psycraft's own site), but its file was not kept, so it could not be compared. Every other logo in the Home frame is shown.

## Sponsor logo treatment and inventory (owner-directed)

No CSS filter or mask is applied to any logo. Image logos are one-colour white versions in `public/images/home/sponsors/white/`, made once from the untouched source in `public/images/home/sponsors/` by a luminance-to-alpha conversion (`sharp`, not part of the build): per pixel `alpha = original alpha x ((ink - 0.05) / 0.95) ^ gamma`, RGB set to white, trimmed to the artwork and scaled down (never up) to at most three times its display height. `ink` is `1 - luminance` for dark artwork and `luminance` for artwork drawn light on black (Ansys, Colony, VibeFlow, MKS). Two documented per-logo options extend the formula for the owner-supplied files: `inkMax` (the ink density that maps to full opacity, so a flat mid-tone ink is not rendered half transparent) is used for Siemens teal (0.53, which is the ink density of its single colour, so the result is the supplied alpha shape in solid white) and RoboHub (0.62, so purple and gray both reach near-solid white); and `metric: max` (largest RGB channel instead of Rec.709 luminance; identical for neutral pixels) is used for VibeFlow, because luminance would have rendered its saturated red mark at about 40% opacity next to a fully white wordmark. Ink density becomes white opacity, light areas become transparent, existing transparency is kept, so internal lines, lettering, counters and cut-outs survive as tone; nothing is stretched, cropped, redrawn or boxed. SVG sources were rasterised at high resolution first. The owner approved this method.

**Sourcing rules followed:** repository and Figma first, then the organization's own website or brand resources only; no logo-aggregator sites; every asset is stored locally. Figma stores its logos as raster fills (`image N` layers in Home frame 262:79), so none of them has an SVG, and the Figma MCP call limit was reached, so the layers could not be re-requested; the files already downloaded from them are the untouched sources. An organization with no verified logo shows a clean text wordmark with the supplied name (Geist Medium, `#F4F4F0` on `#050505`, about 18:1) and its logo is reported as pending; after the owner supplied seven logos, three remain (rows 5, 15 and 17). The wordmark text is the accessible name.

### Inventory: the owner's 23 names, in order, plus the preserved 20|20 Laboratory

| # | Supplied name | Shown as | Source | Local files (source, white) | Accessible name |
|---|---|---|---|---|---|
| 1 | Waterloo Institute for Sustainable Aeronautics (WISA) | image | Figma `image 18` (315:312) | `wisa.png`, `white/wisa.png` | Waterloo Institute for Sustainable Aeronautics (WISA) |
| 2 | Simantic | image | Figma `image 20` (319:321) | `simantic.png`, `white/simantic.png` | Simantic |
| 3 | Siemens | image | Owner-supplied attachment 1 (teal wordmark, transparent PNG 1800x600): treated as authoritative. Replaces the text fallback | `siemens.png`, `white/siemens.png` | Siemens |
| 4 | UTSM | image | Owner-supplied attachment 2 (360x360 PNG, white background, black wordmark, blue swoosh, red maple leaf). Replaces the text fallback. A 1px dark border line on the right edge of the file was cleared (see below) | `utsm.png`, `white/utsm.png` | UTSM |
| 5 | Waterloo Real-time Embedded Systems Lab | text | University of Waterloo ECE "Real-time Embedded Systems Lab (RESL)"; its pages carry only the Waterloo Engineering wordmark | none | Waterloo Real-time Embedded Systems Lab |
| 6 | Microchip | image | Figma `image 23` (319:333) | `microchip.png`, `white/microchip.png` | Microchip Technology |
| 7 | Fuel Cell Green Energy Lab | image | Same organization as the 20\|20 Laboratory, confirmed by the owner ("Fuel Cell Green Energy Lab is the 20/20 laboratory logo"): one entry, using the Figma `image 19` (319:318) logo. The text fallback was removed and the previously separate 20\|20 Laboratory entry is this entry | `20-20-laboratory.png`, `white/20-20-laboratory.png` | Fuel Cell and Green Energy Lab — 20\|20 Laboratory for Fuel Cell & Green Energy RD&D (the owner-specified name) |
| 8 | Kenesto | image | Figma `image 25` (319:342) | `kenesto.png`, `white/kenesto.png` | Kenesto |
| 9 | MSAM | image | Figma `image 24` (319:339) | `msam.png`, `white/msam.png` | Multi-Scale Additive Manufacturing Lab (MSAM), the name used on msam.uwaterloo.ca |
| 10 | AeroSoc | image | Figma `image 22` (319:327): opaque source (white background); one-colour dark ink on white, so the conversion removes the background without loss | `aerosoc.png`, `white/aerosoc.png` | AeroSoc, Waterloo Aviation and Aeronautics Society |
| 11 | Psycraft | image | psycraft.ca/logo.svg (official, Inkscape export). The repository's legacy `public/images/psycraft-logo.png` is the same artwork (mean alpha difference 8/255) and the legacy sponsors page names the same organization and URL | `psycraft.svg`, `white/psycraft.png` | Psycraft |
| 12 | University of Waterloo | image | Figma `image 16` (315:297) | `university-of-waterloo.png`, `white/university-of-waterloo.png` | University of Waterloo |
| 13 | Dassault System (Solidworks) | image | `https://menu.3ds.com/assets/img/logo/3ds-dark.svg`, the corporate logo served by 3ds.com. The brand portal (branding.3ds.com) needs a login, and the SOLIDWORKS logo kit could not be fetched. Dassault Systèmes was chosen because it is the organization; SOLIDWORKS is its product | `dassault-systemes.svg`, `white/dassault-systemes.png` | Dassault Systèmes (SOLIDWORKS) |
| 14 | Greener Production Group (the first list wrote "Green Production Group") | image | Owner-supplied attachment 3 (500x300 PNG, white background). The logo reads "Greener Production Group", and the owner confirmed that is the official name, used as the visible and accessible name everywhere. Replaces the text fallback | `greener-production-group.png`, `white/greener-production-group.png` | Greener Production Group |
| 15 | HOMLab | text | No lab by this name found; no official logo verified | none | HOMLab |
| 16 | Notion | image (cube mark) | `https://www.notion.com/front-static/logo-ios.png`, served by notion.com. The repository's legacy `notion-logo.svg` was not used: it is a generic icon-set glyph, not a file from Notion. The wordmark was not available separately | `notion.png`, `white/notion.png` | Notion |
| 17 | Fluid Mechanics Research Lab | text | Probably the University of Waterloo's Fluid Mechanics Research Laboratory (unconfirmed); its pages carry only the Waterloo Engineering wordmark | none | Fluid Mechanics Research Lab |
| 18 | Colony (YC F26) | image | Owner-supplied attachment 4 (500x169 PNG, opaque black, white wordmark inside its own white double-line frame). The frame is part of the supplied logo, so it is kept; only the uniform black is removed. Replaces the text fallback | `colony.png`, `white/colony.png` | Colony (YC F26) |
| 19 | T-motor | image | The T-MOTOR logo on uav-en.tmotor.com (symbol `#logo` in `/svg/symbol-defs.svg`). The sprite is stored verbatim as `t-motor-symbol-defs.svg`; `t-motor.svg` re-wraps that symbol's markup unchanged. Official capitalization is T-MOTOR | `t-motor-symbol-defs.svg`, `t-motor.svg`, `white/t-motor.png` | T-MOTOR |
| 20 | SJTU – VibeFlow | image | Owner-supplied attachment 5 (826x270 PNG, dark navy background with a faint grid, red mark, light "VibeFlow" wordmark). The logo shows only "VibeFlow"; the alt text keeps the SJTU affiliation from the list. Replaces the text fallback | `vibeflow.png`, `white/vibeflow.png` | SJTU – VibeFlow |
| 21 | MKS Servo | image | Owner-supplied attachment 6 (343x139 PNG, white italic wordmark on dark gray). The logo reads "MKS"; it is the only MKS file, so it maps to MKS Servo, and the alt text uses the list name. Replaces the text fallback | `mks-servo.png`, `white/mks-servo.png` | MKS Servo |
| 22 | RoboHub | image | Owner-supplied attachment 7 (480x480 PNG, white background, purple and gray mark and wordmark). Replaces the text fallback | `robohub.png`, `white/robohub.png` | RoboHub |
| 23 | Ansys | image | `https://www.ansys.com/content/dam/company/brand/logos/ansys-logos/ansys-logo-black-background.jpg`, the logo Ansys publishes under its brand resources (a JPEG, so converted in light-on-dark mode; the black-on-white variant is kept as `ansys.jpg`) | `ansys-black-background.jpg`, `ansys.jpg`, `white/ansys.png` | Ansys |

20 image logos and 3 text wordmarks (Waterloo Real-time Embedded Systems Lab, HOMLab, Fluid Mechanics Research Lab): 23 entries, one per supplied name, none omitted. The only merge is row 7, which the owner confirmed.

**Owner-supplied attachments.** The seven logo files the owner attached (Siemens, UTSM, Greener Production Group, Colony, VibeFlow, MKS, RoboHub) arrived as pasted images numbered 1 to 7 without their original filenames, so each was matched by what it shows (one file per organization, no ambiguous or unmatched files; the owner approved all seven mappings and confirmed the Greener Production Group spelling). They are the authoritative assets for those organizations and replaced the text fallbacks. The untouched originals are kept next to the other sources, byte for byte, named after the organization. None of them was already a white logo with transparency, so all went through the approved conversion.

**Preserved sponsors not on the owner's list:** none. 20|20 Laboratory, preserved earlier, is the Fuel Cell Green Energy Lab (row 7). Figma `image 21` (319:324, an unnamed red circuit-tree mark) stays hidden; it looks like the Psycraft logo, but its file was not kept, so it could not be compared.

**20\|20 Laboratory and the Fuel Cell Green Energy Lab are one organization.** Earlier the two were kept apart because the University of Waterloo's own pages name only the "Fuel Cell and Green Energy Lab" (director Xianguo Li) and never use "20/20" or "RD&D", which appear only on the Figma logo. The owner has now confirmed they are the same, so the text entry was removed and the logo carries both names in the owner-specified accessible name, "Fuel Cell and Green Energy Lab — 20|20 Laboratory for Fuel Cell & Green Energy RD&D".

**Third-party marks.** These are other organizations' trademarks, shown here in a one-colour treatment the owner approved. Some publish rules for their marks: Ansys's trademark usage guidelines say logos must not be cut from its website (the file used is the one it publishes as a brand resource), Notion's trademark terms make permission conditional and revocable, and Siemens and Dassault Systèmes gate their logo downloads. Confirm each sponsor's consent to the treatment before launch.

**Per-logo conversion settings and what to check:**

| Logo | Gamma | Shown at (px high, desktop) | Detail check against the source |
|---|---|---|---|
| University of Waterloo | 0.55 | 44 | Shield border, chevron bands, both lion groups and wordmark legible; gold field reads mid-grey |
| Microchip | 0.32 | 64 | Mark cut-outs and wordmark intact; mark reads light grey |
| WISA | 0.50 | 52 | Wing, three bars (fading gradient kept), letters and small print intact |
| 20\|20 Laboratory | 0.42 | 64 | Ring text, globe grid and foot present; limited by the small display size |
| simantic | 0.70 | 32 | Rounded square keeps its dot as a true cut-out |
| MSAM | 0.45 | 40 | Octagon facets and the two-tone M keep their tonal separation |
| AeroSoc | 0.80 | 46 | Lettering crisp; the small subtitle is legible only on large screens |
| Kenesto | 0.50 | 42 | Blue and orange strokes keep a tonal difference; registered mark present |
| Psycraft | 0.35 | 68 | Every circuit line, node and the two leaf shapes intact |
| T-MOTOR | 0.70 | 40 | Italic T mark, frame and tagline intact (the tagline is tiny at this size) |
| Dassault Systèmes | 0.45 | 44 | 3DS monogram counters and both wordmark lines intact |
| Notion | 0.80 | 52 | Cube outline and the N with its serifs intact |
| Ansys | 0.60 (light mode) | 36 | Slash and wordmark intact; the yellow slash reads light grey |
| Siemens | 1.00, `inkMax` 0.53 | 28 | All seven letters solid white with the supplied alpha shape; the S counters and the M notch intact |
| UTSM | 0.70, ink floor 0.08, 2px source border cleared | 48 | Italic serif letters, the swoosh's tapered tail and the maple leaf (with its stem) intact; the swoosh reads light grey where it was dark blue |
| Greener Production Group | 0.50, ink floor 0.04 | 72 | Bulb outline, ribbed cap, hanging wire and the landscape inside (as grey tones) intact; the thin three-line wordmark reads light grey |
| Colony | 1.00 (light mode), ink floor 0.08 | 44 | Frame (both lines) and the monospaced letters, including the 'y' descender, intact |
| VibeFlow | 0.80 (light mode, `metric: max`), ink floor 0.30 | 42 | Faceted mark and wordmark intact; the dark grid and a stray background speck are removed by the higher ink floor |
| MKS | 1.00 (light mode), ink floor 0.20 | 32 | Italic letters with their slashed cut-outs intact; the dark gray background is removed |
| RoboHub | 0.80, `inkMax` 0.62 | 54 | Robot head, its eyes and notches, and the cut-away R, O, B, U letterforms intact; purple and gray both read white |

**Marquee behavior with 23 entries.** The group is about 5,580px wide at 768px and up (3,985px below), so three copies cover any screen; the scroll speed is held near 42px/s (38px/s below 768px) by a duration computed from the group's width (132s, 104s below 768px). 96px separates every pair of neighbours, including across the join between copies (56px below 768px). Loading is described in "Sponsor marquee loading" below.

**Accessibility.** The marquee is a `ul` (with `role="list"`) labelled by the section heading, and its first group exposes each organization once: an image whose alt text is the organization's full name, or visible text. Repeated copies are `aria-hidden` and `inert`, with empty alt text, and contain nothing focusable. Motion pauses on hover and keyboard focus, and the keyboard-reachable "Pause sponsor scrolling" checkbox holds the pause. Under `prefers-reduced-motion: reduce` the animation and copies are removed, leaving one static, centered, wrapping list of all 23 entries. No identity is conveyed by colour: logos are white and wordmarks are text. Verified at 200% zoom (705px and 625px wide at 2x) and at 400% zoom / 320px reflow for the whole page (see the 320px reflow note below).

## Sponsor marquee loading (fix for the intermittent blank row)

**Symptom:** the logo row was sometimes empty for about three seconds.

**Root cause (reproduced).** The logos were ordinary `next/image` elements, which are `loading="lazy"` by default and are served through the on-demand `/_next/image` optimizer. (1) Nothing was requested until the section scrolled near the viewport (measured: no logo request until the scroll, first one about 0.7s in), so scrolling straight to the section started the downloads then; (2) each logo then waited for its own optimized variant, which on a cold optimizer cache (a first hit on a deployment, an edge region or an expired entry) is slow: with 2.5s of simulated optimizer latency the row was completely blank for 2.5 to 2.8s at 390px, and at 1440px five of six slots stayed empty for 2.5 to 6.5s while logos popped in one by one; (3) a slot had nothing in it until its image arrived, and the track started moving immediately; (4) the track's width also changed by 6 to 8px when the Geist font replaced the fallback (the one-word HOMLab wordmark sized itself to its text), so the loop's geometry was not fixed while content was still arriving.

**Fix.**
- The row is in the server-rendered HTML and never hidden. Each logo is a reserved slot (`.sponsor-marquee__slot`, exact width and height from the file's aspect ratio) holding the `<img>` and a short text wordmark (`wordmark` in `content/home.ts`, Geist Medium `#F4F4F0` on `#050505`, sized per logo to fit the slot, never below 11px, `aria-hidden` because the image's full-name `alt` is the accessible name). The wordmark is visible from the first byte until the image has loaded and decoded, then CSS swaps it for the logo in place (`data-state="ready"`), so nothing resizes or moves. If an image fails (`data-state="error"`) the broken-image icon is hidden and the wordmark stays. With JavaScript off, a `<noscript>` rule shows the logos.
- The images are `fetchpriority="low"` and `loading="lazy"` in the HTML, and `SponsorMarqueeController` (the only client code here) flips them all to `eager` as soon as the page's load event fires, so every unique file is downloading, normally ready, long before the section is reached (the browser still loads any that are scrolled into view first). Making them `eager` in the HTML was measured and rejected: 20 logo downloads sharing the connection delayed the hero image, which is the LCP element at desktop widths, by about 190ms (3.48s to 3.67s) on a throttled connection. Flipping at load leaves LCP and the hero's finish time identical to a run with the logos blocked (1440px: 3.45s vs 3.47s; 390px: 0.75s vs 0.78s). The hero is untouched. No logo is preloaded (`priority` is not used).
- Copies of the list request the same URLs as the real list, so each file is downloaded once: 60 `<img>` elements, 20 requests, with the browser cache disabled.
- The track animation starts paused (`animation-play-state: paused`) and the controller sets `data-motion="running"` only after fonts are ready, the images have settled (or 3s after they started loading) and the track's width has stopped changing. HOMLab's wordmark now has a fixed box (118px, its natural Geist width plus a little; RESL and Fluid Mechanics already had fixed boxes), so the track's width is identical before and after the font loads. Hover, keyboard focus and the pause checkbox still pause it; `prefers-reduced-motion: reduce` still shows the static wrapping list.

**Verification (production build, cold browser cache with `Network.setCacheDisabled`, throttled to 1.6 Mbit/s with 150ms latency, scrolling to the section at DOMContentLoaded, new browser context per run, 3 runs per width at 1920, 1440, 768, 390 and 375px, plus a run with 2.5s of simulated optimizer latency and a run with the server's image cache cleared):** zero frames with a blank row and zero frames with any blank slot; every slot goes text then logo exactly once (no pop-in, no flash, no logo disappearing); 20 requests for 20 unique files with no duplicates; zero track-width drift before the motion starts and 0.01px of slot drift after; no backward steps or jumps while moving, at 42.3px/s (38.3px/s below 768px); no layout-shift source inside the track; no horizontal overflow. The loop seam is exact at all five widths (the track jumps by exactly one group width, every slot lands within 0.0015px of its twin, gaps are 96/56px including across the join). A failed logo (request aborted) keeps its wordmark with no broken icon, and a logo delayed 6s shows its wordmark and then swaps in place.

## Stacking layers and the grid (owner-directed)

Defined once in `app/globals.css`: `z-content` (10) for `<footer>` and the horizontal `Rule`s, `z-grid` (20) for the rails, `z-header` (40) for the sticky header, `z-skip` (100) for the skip link. `<main>` is deliberately not a stacking context; image sections are `isolate`, so their inner z-indexes never leak. The rails render above photographs, graphics, logos and every section background (the Home sponsors panel has no layer of its own, so they run through it), below the header, `aria-hidden` and `pointer-events: none`. The earlier `z-panel` (30) layer, which put the panel above the rails and hid them, was removed at the owner's request. They are shown at every width, inset `--rail-inset` from the edge (8 / 14 / 28 / 50px at the base, 768, 1024 and 1280px), always inside the page margin (20 / 32 / 48 / 64px). Section rules are full-width `div`s. `Rule` is `relative z-10` so it paints above the positioned photo sections it sits between: without its own layer, a rule landing on a fractional pixel (aspect-ratio layouts at 390px, for example) was covered by the image edge and vanished between the hero and Earth images (found in the previous regression pass).

## Substitution record (decision D21)

| Where | What is used | Why |
|---|---|---|
| Mobile menu toggle | `Menu` and `X` from `lucide-react` | Generic UI icons with no Figma export. |

## Styling choices that differ from, or go beyond, the comps

- Footer link text uses `#F4F4F0` (Design System text primary); Figma sets it to pure white.
- Form-control borders use `#969690` and the focus ring uses `#6698FF` (`#1F4FBF` on cream surfaces). Both are approved accessibility adjustments (D19); `#2B2B2B` is only 1.4:1 on the canvas.
- `#666666` is defined for non-essential decoration only (3.6:1 on the canvas, fails AA for text).
- Button hover (light blue) and pressed (dark blue) states follow the Design System color roles. The Design System frame does not draw them, so they need visual review.
- The stacked-bar `RuleStack` bars are `#F4F4F0` at 2 / 5 / 8px, read from the Home frame's `Line 35/36/37` SVGs.
- The header is sticky and edge to edge (owner-directed; Figma has it static). Desktop labels are Geist Medium 16/24 (Figma 14/20) with 32px gaps (40px from 1280px), and the Join WATFlight label is 15px; the header stays 74px tall with its bottom rule drawn inside that box so the logo (36px), nav labels and the 48px button all center exactly on y = 37. The divider before the button is the left border of the button's full-height cell (32px padding each side, the button's right edge stays on the page margin), so it runs from the header's top edge to its bottom rule. The button is the dark treatment (`#0F0F0F`, 1px `#444444` border, cream text), `#3F7CFF` with `#050505` text on hover and keyboard focus, `#1F4FBF` pressed, in both header themes.
- **Focus and anchors clear the header via `scroll-margin-top` on `main` and `footer` content, not `scroll-padding-top` on `<html>`.** The padding version also counted the sticky header itself as obscured, so pressing Tab through the header while scrolled down scrolled the page up by half a screen per key press (found and fixed in this revision).
- **Header themes.** Dark (`#050505`) by default; light (`#F4F4F0`, dark logo and labels, `#1F4FBF` active label (6.5:1, WCAG AA; `#3F7CFF` on the dark header) with the underline staying `#3F7CFF`, `#444444` rules) while the header overlaps a cream band (`data-header-theme="light"`, set by `CtaBand`). `HeaderTheme` observes those bands with an IntersectionObserver whose root is a 1px strip at the header's midline, so the theme flips once per boundary with no scroll handler; the swap is instant on purpose (the logo is a different file per theme and cannot cross-fade; a fading surface would flash an unreadable frame), so there is no transition to disable under reduced motion. The light logo is the approved lockup vector with its fills changed to `#050505`. On normal viewports the header stays light to the end of the Home page, because the Join band is a full viewport tall and the footer is shorter than the viewport; on very short ones (a landscape phone, for example) it returns to dark once the footer has scrolled under it.
- **Cream buttons** (`light` variant: hero "Join WATFlight", "Explore sponsorship", "Learn more about the project") are `#F4F4F0` with `#050505` text, `#3F7CFF` on hover and keyboard focus, `#1F4FBF` pressed (owner-directed; the Design System draws no hover state). "Contact us" stays dark.
- Tablet and mobile layouts are derived, not designed (D20). Page margins step 20 / 32 / 48 / 64px; display and heading sizes step at 768px and 1280px. On Home, the hero text-over-photo overlay only applies from 1280px (below that the photo stacks under the copy); the Earth section's image always fills its section, with a top-down scrim below 1280px.
- "LinkedIn" is spelled with a capital I (Figma has "Linkedin").
- **320px reflow (owner-directed).** Two things made the page scroll sideways at 320px (400% zoom of a 1280px window): the hero heading, whose longest word ("AEROSPACE", 8.18em wide in the display face) was 327px wide in a 265px column (a 42px overflow; an earlier note blamed the footer email for this, which was wrong: the email overflowed its column by about 23px and the page by 3px), and the footer email address. The hero heading size (`type-display-hero`, below 768px) now follows the viewport, `min(40px, (100vw - 55px) / 8.3)`: 31.9px at 320px, 38.6px at 375px, 40px from about 387px, with the 1.1 line-height ratio kept; 768px and up is unchanged. In the footer, the email keeps its 14px size, complete text and `mailto:` target, and may break after the "@" (a `<wbr>`), or mid-word as a last resort (`break-words`); from 1024px (`lg`) it is `whitespace-nowrap` as before. Footer boxes at 375 to 1920px are unchanged (all 49 boxes within 0.5px at 375, 390, 768, 1024, 1280, 1440 and 1920px); only the 320 and 360px two-column layouts are 17px taller because the email takes two lines. Verified with zero horizontal overflow at 305 (320px with a classic scrollbar), 320, 375 and 390px on all six routes, with and without a scrollbar, and at 400% zoom of 1280, 1440 and 1920px windows.

## Home deviations from the Figma frame

- **No current stage in development progress.** Figma fills the first marker and 219px of the track in blue (`#102A56` fill, `#3F7CFF` stroke); all markers and the whole track use the neutral `#444444` style instead (decision D5).
- **Top-right hero label omitted.** Figma has a small "PROJECT NAME / DESCRIPTION / EST. 2025" label above the hero image. It is a placeholder plus an unverified date, and no decision covers it.
- **Coordinate block and Sponsor Package button omitted** (decisions D7, D9).
- **Project card:** "Hydrogen-Electric UAV Program" replaces "Project Name". The body is the summary already retrieved from the Current Project frame, with the approved "low-emission" fix. The image is left-anchored in its frame, as in Figma, which crops about 4% off its right edge.
- **Sponsors & partners (owner-directed redesign):** the cream logo band is gone. Sponsors and "Partner with us" form one solid-black blackout panel (`#050505`, no z-index, so the global grid rails run through it unbroken, drawn over the black, the logos and the partner graphics; they were hidden here until the owner asked for them back). It has no internal lines or boxes: no rule under the heading, no strip around the marquee, no vertical divider in the partner area; vertical space (80 to 160px) and alignment separate the parts. It has no rule stack at its top (removed at the owner's request; the stack was 33px tall, so the panel now begins directly where the Project section ends and the heading's own top padding of 80 / 112 / 128px at the base, 768 and 1280px sets the distance). Its only boundary treatment is at the bottom: the Join band's own top rule stack, which is already the next element, so no second stack is added. The marquee shows the 23 sponsor entries (see "Sponsor logo treatment") moving freely across the black field; it is server-rendered and CSS-driven (one small client controller, see "Sponsor marquee loading"), 96px between logos and between repeated groups at 768px and up (56px below), ~42px/s, a 4vw edge fade (24px minimum), pauses on hover and keyboard focus (plus a keyboard-reachable "Pause sponsor scrolling" checkbox), and becomes a static wrapping row under `prefers-reduced-motion`.
- **Earth-horizon section (owner-directed):** the image fills the section's whole framed area, from the rule above to the rule below and edge to edge, instead of Figma's 993x397 inset (47px below the top rule). Focal point `100% 30%`; the gradient keeps the Figma geometry (solid black to 51.25% of the width, fading out to the right edge), and a top-down scrim replaces it below 1280px where the copy sits above the image.
- **Join band (owner-directed):** the closing cream section is at least `100svh - var(--header-height)` tall with its content centered; the rule stacks stay full width. The Figma 41px gap above it is removed so it meets the partner section's rule directly.
- **"Partner with us" diagram column** is 520px (Figma 568px) with the second text box trimmed to 230px (Figma 310px, but its visible text is under 215px), so the title stays on one line in the wide display face.
- **Spelling fixes applied:** what's, interdisciplinary, hands-on, low-emission, real-world. No other wording was changed.
- **Footer:** the Figma `bottom rule` 21px above the page edge is reproduced; the top border added in the foundation milestone is removed so it doesn't double up under the cream band.
- **Hero, mission and progress proportions** follow the 1440px frame; the 15px classic scrollbar makes the usable width 1425px in desktop browsers that show one.

## Content that needs final verification

Nothing below has been confirmed by the team; it follows the approved Figma frames or the owner's decisions.

- **Roster (D2), provisional:** Jackie (Founder & Team Director), Shaofu (Founder & Mechanical Lead), Hiram (Electrical Lead), Manya (Software Lead). Portrait frames stay empty. These names and titles require final verification. They conflict with the legacy site, which lists Molly (Software), Danica (Business), and a different title for Jackie.
- **Journey dates (D5), provisional:** 2025 Founded, 2025 Early Development, 2026 Autonomous Aviation, Today. No current development stage may be identified until confirmed.
- **Project identity (D1):** the Hydrogen-Electric UAV Program is used as the approved direction. The Current Project frame gives no quantitative specifications, so none may be written.
- **Sponsor logos on Home:** the 23 organizations on the owner's list plus 20|20 Laboratory. Whether each is a current sponsor or partner is the team's call, and several text-only entries still need a verified identity and an official logo (see the inventory).
- **Provisional `h1` text:** the Sponsorship, Join and News headings were read from flattened images at thumbnail scale ("PARTNER WITH WATFLIGHT", "JOIN THE TEAM.", "LATEST FROM WATFLIGHT."). Verify against full-resolution frames or supplied copy.
- **Page descriptions:** each route's metadata description is taken from approved Figma copy with the approved spelling fixes (D10). The News description is generic because that frame's copy is flattened.
- **"Explore our teams"** in the Home Join band links to `/about#leadership`, which now resolves to the "meet the team" section of the About page.
- **Intentionally excluded:** coordinates display (D7), the Faculty Advisory Doe placeholders (D4; the section's structure now exists but renders nothing until real advisors are added, see the launch blocker above), "Sponsor Package" button (D9), unmatched sponsor logos (D8), GitHub in the footer (D12), and the legacy competitions, sponsorship tiers, progression navigation and join steps (D16).

## About page (frame 262:80)

Built from the About frame, the Design System frame (`77:2`) and the shared shell from Home. Sections, in order, all server components in `components/sections/about/`: `AboutHero`, `AboutJourney`, `AboutTeam`, `AboutSubteams`, `FacultyAdvisory`, `AboutCta`; copy is in `content/about.ts`. One `h1` ("ABOUT WATFLIGHT", set on two lines, one `span` per line with a space between so the accessible name is a single phrase), `h2` per section, `h3` for timeline stages, team members and disciplines. The About nav item is active through the shell's existing `aria-current` logic (no shell change).

### Assets (exported from the approved frame; no temporary Figma URL remains)

| Saved as | Figma layer | Used for |
|---|---|---|
| `public/images/about/about-hero-workshop-team.png` (1823x863 source) | `Rectangle 39` (image fill) | Hero photo, slot `ABOUT-HERO` in `content/assets.ts` |
| `public/images/about/timeline-marker.svg` (22x22) | `Group 35` | Timeline markers |
| `public/images/about/subteam-mechanical-wrench.svg` (30x30) | `clarity:wrench-line` | Mechanical card icon |
| `public/images/about/subteam-electrical-circuit-board.svg` (24x24) | `codicon:circuit-board` | Electrical card icon |
| `public/images/about/subteam-software-code-brackets.svg` (22x22) | `icon-park-outline:code-brackets` | Software card icon |

The icons and the marker are rendered at their own root size (never rescaled). Not exported: every `Line` / `grid line` SVG (rebuilt with CSS from the stroke colors and weights read from the files: `#2B2B2B` rules, `#969690` timeline line, `#3F7CFF` stems and link underline, `#1F4FBF` team accent rule), the header and footer artwork (shared, already on Home), and the full-page screenshot (visual reference only). The Figma crop of the hero is `object-fit: cover`, centered, into 729x397; the component keeps that 729:397 ratio at every width, so the crop is the same everywhere. The gradient is black at 0% to transparent at 71.154% (CSS, not baked into the file).

### Copy corrections and transcription

Applied as instructed: "design, simulating" to "designing, simulating", "unscrewed" to "unmanned", "PBC" to "PCB". Everything else is the frame's own text, including "carbon-fiber" and the absent full stops (journey intro, first three stage descriptions). The frame's off-canvas clipped duplicate "Mechanical" text inside the first advisor card is not carried over. The two "OUR JOURNEY" / "MEET THE TEAM" titles are lowercase in the source text (as "our mission" is on Home): the SC cut draws lowercase as small caps. Button labels use the site's mixed case ("Explore projects", "Join WATFlight"); the button style uppercases them.

### Layout decisions

- **Hero (1440 reference):** 578px section; headline 182px below the header; photo 729x397, 112px below the header, right edge on the right grid rail (`right: var(--rail-inset)`, width 50.625% of the 1440px frame, so it scales from 1280 to 1440px). Below 1280px the photo stacks under the copy inside the page margins. The paragraph overlaps the photo's black left edge by up to about 100px between 1280 and 1440px; the worst-case contrast behind it (pixel-measured) is 5.3:1 at 1366px and 6.1:1 or better at the other widths tested, so it stays above 4.5:1.
- **Timeline:** `ol` of four items. 1280px and up: the frame's own proportions (stems at 126, 402, 736 and 1061px from the left margin at 1440px, 181px description boxes). 768 to 1279px: four equal columns. Under 768px: a vertical timeline with the line through the markers at the left and the stem pointing to the text. The rail-to-rail line starts on the left rail's inner edge and ends on the right rail (the frame's line runs x=52 to x=1390).
- **Team:** four columns from 1024px (53px gaps from 1280px), two from 768px, one below. Frame boxes use 288.5:255 (the frame's 289/288 by 255).
- **Subteams:** three columns from 1024px, one below. Cards have a border on the top, left and right only, as drawn in the frame (no bottom border; it is one class, `border-x border-t`, if the team wants a closed box). The frame hand-places each card's text 18 to 25px from its left edge and each icon 20 to 28px from its right edge; one 20px inset is used and each icon is centered on its title. Description boxes keep the frame's 352 / 379 / 352px widths (from 1280px) so the line breaks match. "LEARN MORE" goes to `/join`; its label and underline are unchanged and an invisible `::after` makes the touch target about 46px high.
- **Faculty advisory:** the full-width rule moves into the section, so with no advisors nothing is drawn and the subteam section closes with a 104px gap before the call-to-action (35px plus the rule when advisors exist).
- **Call-to-action:** the shared `CtaBand` (550px of cream from 1280px, not Home's full-viewport band). The About frame spaces its paragraph 22px below the title and its buttons 61px below the paragraph (Home: 27px and 38px), so `CtaBand` gained two optional props, `descriptionGap` and `actionsGap`, applied as inline margins only when given. Home passes neither, so its markup is unchanged. The shared `RuleStack` is 33px at the top and bottom, so the whole band is 616px tall against the frame's 621px (31px above, 40px below); the cream area is exactly 550px. The header turns light only while the band's stacks or cream are under its midline (`data-header-theme="light"`).
- **Rails and rules:** the only full-width rule on the page is under the hero (the frame's other two are the header's own and the advisory rule). The grid rails cross every section above images and graphics.

### Typography audit (About, 1440px, production values match Figma)

| Role | Figma style | Rendered |
|---|---|---|
| H1 "ABOUT WATFLIGHT" | Bunken SC Wide Medium 64/72 | same, 2 lines |
| Hero paragraph | Geist Regular 18/29, `#969690` | same, 644px wide, 3 lines |
| "our journey", "meet the team" | Bunken SC Wide Medium 64/72 | same |
| Journey intro | Geist Regular 16/25, `#969690` | same, 500px wide, 3 lines |
| Timeline year | Geist Medium 12/16, tracking 1.44px | same |
| Timeline title / description | Geist Medium 18/26 / Geist Regular 14/21 `#969690` | same, description 181px |
| Member name | Bunken Std Wide Medium 28/36 | same |
| Member role | Geist Medium 18/26 `#969690` | same |
| "SUBTEAM DISCIPLINES" | Bunken Std Wide Medium 36/44 | same |
| Discipline name / description | Std Wide Medium 22/30 / Geist Regular 16/25 `#969690` | same, 2 lines each |
| "LEARN MORE" | Geist Regular 12/18, tracking 1.44px, `#3F7CFF` | same |
| CTA title | Bunken SC Wide Medium 64/72 | same, one line |
| CTA paragraph | Geist Regular 18/22 `#0F0F0F` | same, 536px, 2 lines |
| CTA buttons | Geist Medium 14/20, tracking 0.56px, uppercase | same |

Known, intentional differences: heading and label text is `#F4F4F0` where Figma sets pure white (Home decision); the CTA title is `#050505` where Figma sets `#000`. "Explore projects" is 197px wide against the frame's 199px (sub-pixel font metrics; the frame gives no fixed width for "Join WATFlight"). 95 box checks (positions and sizes of the hero, image, line, markers, stems, labels, frames, names, cards and link) are within 1.5px of the frame at 1440px.
