import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { PageContainer } from "@/components/ui/page-container";
import { contact, footerNavLinks, institutionLabel, socialLinks } from "@/content/site";

const linkClasses =
  "type-body-sm text-ink transition-colors duration-150 motion-reduce:transition-none hover:text-blue-light active:text-blue-dark";

/**
 * Footer: logo lockup and institution label on the left, a vertical rule, then three columns
 * (Navigation, Contact, Connect). The two-part layout matches the Figma footer at 1440px; below
 * that the columns tighten, and below 1024px everything stacks.
 *
 * Connect links are text only for now: the exact Figma social icons have not been exported, and
 * they are brand marks rather than generic icons, so no stand-in is used (decision D21).
 */
export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-rule">
      <PageContainer className="grid gap-12 py-12 md:pt-14 md:pb-[75px] lg:grid-cols-[minmax(0,1fr)_1px_auto] lg:gap-0 frame:grid-cols-[557px_1px_auto]">
        <div className="flex flex-col gap-6 lg:pr-12">
          <Link href="/" aria-label="WATFlight home" className="w-fit">
            <Logo size="footer" />
          </Link>
          <p className="type-meta max-w-[384px] text-ink-2">{institutionLabel}</p>
        </div>

        <div aria-hidden="true" className="hidden bg-rule lg:block" />

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:flex lg:gap-x-12 lg:pl-12 frame:gap-x-[116px] frame:pl-[115px]">
          <nav aria-label="Footer">
            <h2 className="type-meta mb-3.5 text-ink-2">Navigation</h2>
            <ul className="type-body-sm space-y-1">
              {footerNavLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClasses}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="type-meta mb-3.5 text-ink-2">Contact</h2>
            <ul className="type-body-sm space-y-1">
              <li>
                <a href={`mailto:${contact.email}`} className={linkClasses}>
                  {contact.email}
                </a>
              </li>
              {contact.addressLines.map((line) => (
                <li key={line} className="type-body-sm text-ink">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="type-meta mb-3.5 text-ink-2">Connect</h2>
            <ul className="type-body-sm space-y-1">
              {socialLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                    {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
