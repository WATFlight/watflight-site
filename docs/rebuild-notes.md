# Figma rebuild notes

Working notes for the Figma-based rebuild on `rebuild/figma-hifi`. Source frames: Home `262:79`, About Us `262:80`, Current Project `333:496`, Sponsorship `340:771`, Join the Team `344:1128`, News & Blog `344:1129`, Design System `77:2` in Figma file `ZTpRvqKrFDvxGgQ71b6xjt`.

The foundation milestone covers the tokens, type scale, fonts, shared shell and primitives, and six route skeletons. Page sections, Figma assets and legacy-file deletion come later.

## Temporary fallbacks

| Item | Current state | To resolve |
|---|---|---|
| Bunken Tech Sans SC Wide / Std Wide (Medium) | Not loaded: the fonts are licensed and no files are in the repo. `--font-display-sc` and `--font-display-std` in `app/globals.css` fall back to a system sans stack, and SC headings use `font-variant-caps: small-caps`. This does **not** match the comps. | Supply licensed files, load them with `next/font/local` using `variable: '--font-bunken-sc'` and `'--font-bunken-std'`. The CSS picks them up with no other change. |
| WATFlight logo lockup | `components/ui/logo.tsx` pairs the existing raster mark (`public/images/watflight-logo.png`, same hexagon and arrow on a black rounded square) with live text for the wordmark. | Export the mark and wordmark SVGs from the approved Figma context and replace the component's contents. |

## Substitution record (decision D21)

| Where | What is used | Why |
|---|---|---|
| Mobile menu toggle | `Menu` and `X` from `lucide-react` | Generic UI icons with no Figma export. |
| Footer "Connect" | Text links only, no icons | Figma shows LinkedIn / Instagram / Discord brand icons. Those are brand marks, not generic icons, so no stand-in is used until exact SVGs are exported. |
| Logo wordmark | Live text in the display fallback font | See the logo row above. |

## Styling choices that differ from, or go beyond, the comps

- Footer link text uses `#F4F4F0` (Design System text primary); Figma sets it to pure white.
- Form-control borders use `#969690` and the focus ring uses `#6698FF` (`#1F4FBF` on cream surfaces). Both are approved accessibility adjustments (D19); `#2B2B2B` is only 1.4:1 on the canvas.
- `#666666` is defined for non-essential decoration only (3.6:1 on the canvas, fails AA for text).
- Button hover (light blue) and pressed (dark blue) states follow the Design System color roles. The Design System frame does not draw them, so they need visual review.
- The grid rails sit behind page content and appear from 1280px up. Whether Figma draws them above the cream bands is unverified.
- The stacked-bar `RuleStack` uses `#2B2B2B`. Its tone and the 2/5/8px bar sizes were read from line layers, not checked against a full-resolution render.
- Tablet and mobile layouts are derived, not designed (D20). Page margins step 20 / 32 / 48 / 64px; display and heading sizes step at 768px and 1280px.
- "LinkedIn" is spelled with a capital I (Figma has "Linkedin").

## Content that needs final verification

Nothing below has been confirmed by the team; it follows the approved Figma frames or the owner's decisions.

- **Roster (D2), provisional:** Jackie (Founder & Team Director), Shaofu (Founder & Mechanical Lead), Hiram (Electrical Lead), Manya (Software Lead). Portrait frames stay empty. These names and titles require final verification. They conflict with the legacy site, which lists Molly (Software), Danica (Business), and a different title for Jackie.
- **Journey dates (D5), provisional:** 2025 Founded, 2025 Early Development, 2026 Autonomous Aviation, Today. No current development stage may be identified until confirmed.
- **Project identity (D1):** the Hydrogen-Electric UAV Program is used as the approved direction. The Current Project frame gives no quantitative specifications, so none may be written.
- **Provisional `h1` text:** the Sponsorship, Join and News headings were read from flattened images at thumbnail scale ("PARTNER WITH WATFLIGHT", "JOIN THE TEAM.", "LATEST FROM WATFLIGHT."). Verify against full-resolution frames or supplied copy.
- **Page descriptions:** each route's metadata description is taken from approved Figma copy with the approved spelling fixes (D10). The News description is generic because that frame's copy is flattened.
- **Intentionally excluded:** coordinates display (D7), Faculty Advisory section and its Doe placeholders (D4), "Sponsor Package" button (D9), unmatched sponsor logos (D8), GitHub in the footer (D12), and the legacy competitions, sponsorship tiers, progression navigation and join steps (D16).
