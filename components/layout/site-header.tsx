import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { PrimaryNav } from "@/components/layout/primary-nav";

/**
 * Static header (decision D18): logo left, navigation right, full-bleed 1px rule underneath.
 * Figma places the rule 74px from the top and insets the content 76px left / 64px right at 1440.
 * The header itself has no fill, so the decorative grid rails run behind it as in the comps; only
 * the mobile menu panel has an opaque background.
 */
export function SiteHeader() {
  return (
    <header className="relative z-20 h-[74px] border-b border-rule">
      <div className="mx-auto flex h-full max-w-[1440px] items-stretch justify-between px-5 md:px-8 lg:px-12 xl:px-16 frame:pr-16 frame:pl-[76px]">
        <Link href="/" aria-label="WATFlight home" className="flex items-center">
          <Logo size="header" />
        </Link>
        <PrimaryNav />
      </div>
    </header>
  );
}
