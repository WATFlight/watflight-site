"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { joinCta, navLinks } from "@/content/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const linkClasses =
  "type-nav transition-colors duration-150 motion-reduce:transition-none hover:text-blue-light active:text-blue-dark";

/**
 * Primary navigation, the only Client Component in the shell. It needs the current pathname for the
 * active state (`aria-current="page"`, blue text, short blue underline sitting on the header rule)
 * and local state for the mobile disclosure menu. The menu closes on Escape (focus returns to the
 * toggle) and whenever the route changes.
 *
 * The open state stores the pathname it was opened on, so navigating closes it without an effect.
 *
 * Icons: Menu and X come from lucide-react. They are generic UI icons with no Figma export
 * (decision D21), recorded in docs/rebuild-notes.md.
 */
export function PrimaryNav() {
  const pathname = usePathname();
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

  const joinActive = isActive(pathname, joinCta.href);

  return (
    <div className="contents" onKeyDown={handleKeyDown}>
      {/* Desktop navigation: 44px gaps, 26px divider, dark CTA (Figma header frame). */}
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex h-full items-stretch gap-11">
          {navLinks.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <li key={href} className="relative flex items-center">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(linkClasses, active ? "text-blue" : "text-ink")}
                >
                  {label}
                </Link>
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-1px] left-1/2 h-[2px] w-[47px] -translate-x-1/2 bg-blue"
                  />
                ) : null}
              </li>
            );
          })}
          <li aria-hidden="true" className="flex items-center">
            <span className="h-[26px] w-px bg-rule" />
          </li>
          <li className="relative flex items-center">
            <Button href={joinCta.href} variant="dark" aria-current={joinActive ? "page" : undefined}>
              {joinCta.label}
            </Button>
            {joinActive ? (
              <span
                aria-hidden="true"
                className="absolute bottom-[-1px] left-1/2 h-[2px] w-[131px] -translate-x-1/2 bg-blue"
              />
            ) : null}
          </li>
        </ul>
      </nav>

      {/* Mobile and tablet: disclosure menu below 1024px. */}
      <div className="flex items-center lg:hidden">
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={toggle}
          className="inline-flex size-12 items-center justify-center border border-rule-strong text-ink transition-colors duration-150 motion-reduce:transition-none hover:bg-surface-2"
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!isOpen}
        className="absolute inset-x-0 top-full z-30 border-b border-rule bg-canvas lg:hidden"
      >
        <nav aria-label="Primary" className="mx-auto max-w-[1440px] px-5 pb-6 md:px-8">
          <ul>
            {navLinks.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href} className="border-b border-rule">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "type-h5 flex min-h-14 items-center transition-colors duration-150 motion-reduce:transition-none hover:text-blue-light",
                      active ? "text-blue" : "text-ink",
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
            variant="dark"
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
