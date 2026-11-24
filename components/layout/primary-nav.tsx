"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinCta, navLinks } from "@/content/site";
import { cn } from "@/lib/cn";

/** Sections whose pages live one level below them (`/news/<slug>`); the section's nav item stays active there. */
const sectionsWithChildPages = ["news"];

/**
 * A nav item is active when the ROUTE that matched is its page, or, for the sections above, a page one level
 * below it. It reads the matched route segments (`useSelectedLayoutSegments`), not the browser's path: a URL
 * that matches no route is answered with the prerendered 404, whose HTML cannot know that path, so marking an
 * item active from the browser path (the earlier `pathname.startsWith(href + "/")`) differed from the server's
 * HTML and raised a React hydration error (#418) on every unknown URL below a section, for example /about/x.
 * The route's segments are the same on the server and in the browser, and an unknown URL has none of these.
 */
function isActive(segments: string[], href: string): boolean {
  if (href === "/") return segments.length === 0;
  const section = href.slice(1);
  if (segments[0] !== section) return false;
  return segments.length === 1 || (sectionsWithChildPages.includes(section) && segments.length === 2);
}

const linkClasses =
  "nav-link type-nav hover:text-[var(--hdr-link-hover)] active:text-blue-dark";

/**
 * Primary navigation, the only Client Component in the shell. It needs the current pathname for the
 * active state (`aria-current="page"`, blue text, short blue underline sitting on the header rule)
 * and local state for the mobile disclosure menu. The menu closes on Escape (focus returns to the
 * toggle) and whenever the route changes.
 *
 * The open state stores the pathname it was opened on, so navigating closes it without an effect.
 *
 * Colors that depend on the header theme (labels, toggle, menu) deliberately have no color
 * transition: the theme swaps instantly, so a fading label would flash low contrast on the new
 * surface. The Join button keeps its transition because its colors never change with the theme.
 *
 * Icons: Menu and X come from lucide-react. They are generic UI icons with no Figma export
 * (decision D21), recorded in docs/rebuild-notes.md.
 */
export function PrimaryNav() {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isOpen = openOnPath === pathname;

  const toggle = () => setOpenOnPath(isOpen ? null : pathname);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && isOpen) {
      setOpenOnPath(null);
      toggleRef.current?.focus();
    }
  };

  const joinActive = isActive(segments, joinCta.href);

  return (
    <div className="contents" onKeyDown={handleKeyDown}>
      {/* Desktop navigation (from 1024px): Geist Medium 16/24 labels, 32px gaps (40px from 1280px,
          where there is room; at 1024px 40px would leave the logo only ~12px of air). The Join WATFlight
          button lives in its own full-height cell: the 1px left border of that cell is the divider
          between News and the button, so it runs from the header's top edge to its bottom rule.
          The button is centered in the cell with 32px on each side; the negative right margin keeps
          the button's right edge on the page margin, as in Figma. */}
      <nav aria-label="Primary" data-enter="fade" data-step="1" className="hidden lg:block">
        <ul className="flex h-full items-stretch gap-8 xl:gap-10">
          {navLinks.map(({ href, label }) => {
            const active = isActive(segments, href);
            return (
              <li key={href} className="relative flex items-center">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    linkClasses,
                    // #3F7CFF on the dark header; #1F4FBF (6.5:1) on the cream header to meet WCAG AA.
                    active ? "text-blue group-data-[theme=light]/header:text-blue-dark" : "text-[var(--hdr-fg)]",
                  )}
                >
                  {label}
                </Link>
                {active ? (
                  <span
                    aria-hidden="true"
                    className="motion-underline absolute bottom-0 left-1/2 z-10 h-[2px] w-[47px] -translate-x-1/2 bg-blue"
                  />
                ) : null}
              </li>
            );
          })}
          <li className="relative -mr-8 flex items-center border-l border-[var(--hdr-rule)] px-8">
            <Button href={joinCta.href} variant="join" aria-current={joinActive ? "page" : undefined}>
              {joinCta.label}
            </Button>
            {joinActive ? (
              <span
                aria-hidden="true"
                className="motion-underline absolute bottom-0 left-1/2 z-10 h-[2px] w-[131px] -translate-x-1/2 bg-blue"
              />
            ) : null}
          </li>
        </ul>
      </nav>

      {/* Mobile and tablet: disclosure menu below 1024px. */}
      <div data-enter="fade" data-step="1" className="flex items-center lg:hidden">
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={toggle}
          className="inline-flex size-12 items-center justify-center border border-[var(--hdr-rule-strong)] text-[var(--hdr-fg)] hover:bg-[var(--hdr-hover)]"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full z-30 border-b border-[var(--hdr-rule)] bg-[var(--hdr-bg)] lg:hidden"
      >
        <nav aria-label="Primary" className="mx-auto max-w-[1440px] px-5 pb-6 md:px-8">
          <ul>
            {navLinks.map(({ href, label }) => {
              const active = isActive(segments, href);
              return (
                <li key={href} className="border-b border-[var(--hdr-rule)]">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "type-h5 flex min-h-14 items-center hover:text-[var(--hdr-link-hover)]",
                      active ? "text-blue group-data-[theme=light]/header:text-blue-dark" : "text-[var(--hdr-fg)]",
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Button
            href={joinCta.href}
            variant="join"
            aria-current={joinActive ? "page" : undefined}
            className="mt-6 w-full"
          >
            {joinCta.label}
          </Button>
        </nav>
      </div>
    </div>
  );
}
