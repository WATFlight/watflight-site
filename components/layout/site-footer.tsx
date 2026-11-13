import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { PageContainer } from "@/components/ui/page-container";
import { Rule } from "@/components/ui/rule";
import { contact, footerNavLinks, institutionLabel, socialLinks } from "@/content/site";

const linkClasses =
  "type-body-sm text-ink transition-colors duration-150 motion-reduce:transition-none hover:text-blue-light active:text-blue-dark";

/**
 * Footer: logo lockup and institution label on the left, a vertical rule, then three columns
 * (Navigation, Contact, Connect). The two-part layout matches the Figma footer at 1440px; below
 * that the columns tighten, and below 1024px everything stacks.
 *
 * Framing: the footer is a full-width #050505 surface in the content layer. The vertical divider
 * runs the full height of the footer (it overshoots the container padding with negative margins)
 * so it meets the full-width rule that closes the page 20px above the bottom edge, instead of
 * floating as a short fragment. There is no top border: the page above ends in its own rule stack.
 */
export function SiteFooter() {
  const [emailName, emailDomain] = contact.email.split("@");

  return (
    <footer className="relative z-content bg-canvas">
      <PageContainer className="grid gap-12 py-12 md:pt-14 md:pb-[54px] lg:grid-cols-[minmax(0,1fr)_1px_auto] lg:gap-0 frame:grid-cols-[557px_1px_auto]">
        <div className="flex flex-col gap-6 lg:pr-12">
          <Link href="/" aria-label="WATFlight home" className="w-fit max-w-full">
            <Logo size="footer" />
          </Link>
          <p className="type-meta max-w-[384px] text-ink-2">{institutionLabel}</p>
        </div>

        <div
          aria-hidden="true"
          className="hidden bg-rule lg:-mt-14 lg:-mb-[54px] lg:block"
        />

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
                {/* The full address stays the link text and target. On the narrow two-column layout
                    (320px) it may break after the "@" (<wbr>), or mid-word as a last resort, instead
                    of running past the page margin; from lg up it never wraps, as before. */}
                <a href={`mailto:${contact.email}`} className={`${linkClasses} break-words lg:whitespace-nowrap`}>
                  {emailName}@<wbr />
                  {emailDomain}
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
            <ul className="type-body-sm space-y-2.5">
              {socialLinks.map(({ href, label, icon, iconSize }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClasses} inline-flex items-center gap-[13px]`}
                  >
                    <Image src={icon} alt="" width={iconSize} height={iconSize} />
                    <span>
                      {label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
      <Rule />
      <div aria-hidden="true" className="h-5" />
    </footer>
  );
}
