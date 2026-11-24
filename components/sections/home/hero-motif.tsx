/**
 * Decorative layers for the Home hero's opening sequence ("hangar awakening"). Everything here is
 * aria-hidden, pointer-events: none, transparent at rest and drawn only by CSS keyframes in app/motion.css
 * (section "Home hero"), so the finished hero is exactly the designed page. It sits inside the picture's
 * own box (below the headline, above the photograph) and is laid out in the picture's 1440 x 810 frame
 * coordinates, which scale with the picture at every width.
 *
 * - A closed vignette that opens as the light passes, and a faint horizon light plane (it also answers scroll,
 *   at most 9% opaque, nothing at the top of the page).
 * - A neutral guidance trace that starts beside the call-to-action, runs to the aircraft's nose and ends in
 *   one short blue segment, one node and one confirmation pulse. It carries no numbers, labels, coordinates or measurements.
 * - Four targeting brackets that lock around the aircraft and then retire.
 * - A short rule under the headline (desktop layout only).
 * - The scroll hand-off line, drawn by scroll progress (--hp), that leaves the trace's start point and
 *   runs down into the rule that closes the hero.
 */
const stroke = { vectorEffect: "non-scaling-stroke" as const };

export function HeroMotif() {
  return (
    <div aria-hidden="true" data-hero-motif className="pointer-events-none absolute inset-0">
      <div className="hm-vignette" />
      <div className="hm-horizon" />
      <svg
        className="hm-svg absolute inset-0 h-full w-full"
        viewBox="0 0 1440 810"
        preserveAspectRatio="none"
        fill="none"
        focusable="false"
      >
        <g className="hm-xl">
          <path className="hm-line hm-headline-rule" d="M64 410H208" pathLength={1} {...stroke} />
          <path className="hm-line hm-headline-tick" d="M208 404V416" pathLength={1} {...stroke} />
        </g>
        <path className="hm-line hm-path" d="M430 548H540C660 548 735 470 790 352" pathLength={1} {...stroke} />
        <path className="hm-line hm-ext" d="M834 322L1010 258" pathLength={1} {...stroke} />
        <path className="hm-line hm-tick hm-tick-1" d="M470 541V555" pathLength={1} {...stroke} />
        <path className="hm-line hm-tick hm-tick-2" d="M510 541V555" pathLength={1} {...stroke} />
        <path className="hm-line hm-blue" d="M790 352L834 322" pathLength={1} {...stroke} />
        <circle className="hm-node hm-node-start" cx="430" cy="548" r="3.5" />
        <circle className="hm-node hm-node-ring" cx="834" cy="322" r="9" {...stroke} />
        <circle className="hm-node hm-node-dot" cx="834" cy="322" r="3" />
        <circle className="hm-node hm-node-pulse" cx="834" cy="322" r="9" {...stroke} />
      </svg>

      <span data-bracket="tl" className="hm-bracket top-[10%] left-[54.5%] border-t-[1.5px] border-l-[1.5px]" />
      <span data-bracket="tr" className="hm-bracket top-[10%] right-[2%] border-t-[1.5px] border-r-[1.5px]" />
      <span data-bracket="bl" className="hm-bracket bottom-[40.5%] left-[54.5%] border-b-[1.5px] border-l-[1.5px]" />
      <span data-bracket="br" className="hm-bracket right-[2%] bottom-[40.5%] border-r-[1.5px] border-b-[1.5px]" />

      <div data-hero-handoff className="hm-handoff" />
      <span className="hm-handoff-node" />
    </div>
  );
}
