/**
 * Decorative vertical rails, 50px inside each edge of the 1440px frame, from the Figma "grid line"
 * layers. Shown from 1280px up only: below that the page margin is too tight for them. They sit
 * behind page content (z-0), so solid bands such as the cream CTA band cover them.
 */
export function GridRails() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden xl:block">
      <div
        className="absolute inset-y-0 w-px bg-rule"
        style={{ left: "max(50px, calc((100% - 1440px) / 2 + 50px))" }}
      />
      <div
        className="absolute inset-y-0 w-px bg-rule"
        style={{ right: "max(50px, calc((100% - 1440px) / 2 + 50px))" }}
      />
    </div>
  );
}
