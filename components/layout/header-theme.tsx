"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Switches the sticky header between its dark and light themes.
 *
 * Any element marked `data-header-theme="light"` (the cream CTA bands) counts as a light surface.
 * The header is light while one of them crosses the header's midline: a 1px horizontal strip at
 * half the header height is the observer's root, so the switch happens once as the section's edge
 * passes it (no scroll handler, no per-pixel work) and flips back as soon as the section has fully
 * left the header. Because the strip is thinner than any section, a section edge can only enter or
 * leave it once per direction, which prevents flicker at the boundary.
 *
 * The strip's rootMargin depends on the viewport height, so the observer is rebuilt when the window
 * is resized. The theme is written to the server-rendered header's `data-theme` attribute, so the
 * header never re-renders; CSS (`.site-header[data-theme="light"]`) does the rest, and the color
 * transition is removed under `prefers-reduced-motion`.
 */
export function HeaderTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    if (!header) return;

    const surfaces = Array.from(document.querySelectorAll<HTMLElement>('[data-header-theme="light"]'));
    if (surfaces.length === 0) {
      header.dataset.theme = "dark";
      return;
    }

    const overlapping = new Set<Element>();
    let observer: IntersectionObserver | null = null;
    let frame = 0;

    const connect = () => {
      observer?.disconnect();
      overlapping.clear();

      const midline = Math.round(header.getBoundingClientRect().height / 2);
      const below = Math.max(0, window.innerHeight - midline - 1);

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) overlapping.add(entry.target);
            else overlapping.delete(entry.target);
          }
          header.dataset.theme = overlapping.size > 0 ? "light" : "dark";
        },
        { rootMargin: `-${midline}px 0px -${below}px 0px`, threshold: 0 },
      );
      surfaces.forEach((surface) => observer?.observe(surface));
    };

    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(connect);
    };

    connect();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
