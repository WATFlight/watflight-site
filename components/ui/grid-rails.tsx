/**
 * Decorative vertical rails: the foreground of the technical grid.
 *
 * They sit in the `z-grid` layer (see the layer notes in app/globals.css), above photographs,
 * gradients and graphics but below the sticky header, so they cross every image area while the
 * header stays on top. They are `aria-hidden` and `pointer-events-none`, so they never block
 * clicks, taps or focus.
 *
 * Each rail is `--rail-inset` from the viewport edge (50px at 1280px and up, shrinking at smaller
 * widths so it always stays outside the page margin). On screens wider than 1440px the rails stay
 * inside the 1440px frame, as in the comps. Horizontal rules run edge to edge and cross them.
 *
 * Motion: on a full page load the grid powers up, left rail then right rail (a fade, no layout change).
 */
export function GridRails() {
  const edge = "max(var(--rail-inset), calc((100% - 1440px) / 2 + var(--rail-inset)))";

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-grid">
      <div data-rail="" data-enter="fade" data-step="1" className="absolute inset-y-0 w-px bg-rule" style={{ left: edge }} />
      <div data-rail="" data-enter="fade" data-step="2" className="absolute inset-y-0 w-px bg-rule" style={{ right: edge }} />
    </div>
  );
}
