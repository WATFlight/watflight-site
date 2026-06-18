// Navigation used by the header and side nav.
//
// A nav click jumps straight to the target section with no scroll animation, so
// the scroll-driven sections never strobe past on the way there. Manual
// scrolling is left untouched — its animations play as designed.

function targetYFor(id: string): number | null {
  if (!id || id === "#") return 0; // logo → top
  const el = document.getElementById(id);
  if (!el) return null;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(window.scrollY + el.getBoundingClientRect().top, maxY));
}

export function navigateToSection(id: string): void {
  if (typeof window === "undefined") return;
  const targetY = targetYFor(id);
  if (targetY === null) return;
  window.scrollTo(0, targetY);
}
