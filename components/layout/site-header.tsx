import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { HeaderTheme } from "@/components/layout/header-theme";
import { PrimaryNav } from "@/components/layout/primary-nav";

/**
 * Sticky header. The header element is the full-viewport surface: pinned to the top
 * (`sticky top-0`), in the `z-header` layer above images and the grid rails, with the 1px bottom
 * rule (drawn by `.site-header::before`) running edge to edge. Its height is `--header-height`
 * (74px, rule included), which the layout also uses for `scroll-margin-top` (on the page content, so focus and anchors clear the header) and the full-viewport
 * Join section.
 *
 * It is dark (#050505) by default and switches to a light (#F4F4F0) surface while it overlaps a
 * cream section; HeaderTheme sets `data-theme` from an IntersectionObserver and the colors come
 * from the custom properties in app/globals.css. Only the inner content is limited to the 1440px
 * frame: Figma insets it 76px left / 64px right.
 */
export function SiteHeader() {
  return (
    <header
      data-site-header=""
      data-theme="dark"
      className="site-header group/header sticky top-0 z-header h-[var(--header-height)] w-full bg-[var(--hdr-bg)] text-[var(--hdr-fg)]"
    >
      <HeaderTheme />
      <div className="mx-auto flex h-full max-w-[1440px] items-stretch justify-between px-5 md:px-8 lg:px-12 xl:px-16 frame:pr-16 frame:pl-[76px]">
        <Link href="/" aria-label="WATFlight home" data-enter="fade" className="flex items-center">
          <Logo size="header" themed />
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}
