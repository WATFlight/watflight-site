import Image from "next/image";
import type { FC } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { subteams } from "@/content/about";

/** One icon size for all three cards (the SVGs are square, so their proportions are untouched). */
const ICON_SIZE = 30;

type AboutSubteamsProps = {
  /**
   * Accepted so the page's existing call site keeps compiling. The section now has the same generous
   * bottom padding whether or not the faculty advisory (and its rule) follows, so it no longer reads it.
   */
  followedByRule?: boolean;
};

/**
 * Subteam disciplines (frame 262:80), refined after the visual review. This is an intentional,
 * owner-approved deviation from the frame's proportions (the frame draws 420x135 cards with no bottom
 * border and a detached "LEARN MORE" link under them); docs/rebuild-notes.md records it.
 *
 * - Section: 124px of padding above and below from 1280px (96px from 768px, 64px below). The team
 *   section above keeps its own bottom padding, so the visible gap above the heading is that plus this.
 * - Header row: "SUBTEAM DISCIPLINES" and "LEARN MORE" (still `/join`) share one row from 768px, the link
 *   at the right and vertically centered on the heading; on phones the link sits 16px under the heading.
 *   An invisible `::after` keeps the link's touch target about 48px high without moving the label or its
 *   underline, and the global focus ring is untouched.
 * - Cards: #0F0F0F panels with a complete 1px #444444 border, 32px padding and a 220px minimum height
 *   from 1200px (24px / 160px minimum from 768px, 20px below). The title and the icon are one centered
 *   flex row (icon 30x30, exact approved SVG), the description starts 28px below it (32px from 1200px)
 *   at one shared offset, body copy stays Geist 16/25, and its width is capped (320px on desktop, 448px
 *   below) so lines are not stretched. The cards are not interactive: no hover, no cursor change.
 * - Grid: three equal columns from 1200px, one full-width card per row below (never two plus one),
 *   inside the page margins and rails with no horizontal overflow.
 *
 * Responsive values that change at 768 and 1200px use arbitrary `min-[...]` variants throughout (Tailwind
 * emits those before the named screens, so mixing the two for one property would make `md:` win at 1200px).
 */
export const AboutSubteams: FC<AboutSubteamsProps> = () => {
  return (
    <section aria-labelledby="about-subteams-heading">
      <PageContainer className="py-16 md:py-24 xl:py-[124px]">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
          <SectionHeading as="h2" size="h2" id="about-subteams-heading" title={subteams.title} />
          {/* The ::after widens the touch target to about 48px high (it is measured from the padding box,
              so the 2px underline takes 2px off the bottom) without moving the label or underline. */}
          <TextLink
            href={subteams.link.href}
            className="relative shrink-0 after:absolute after:-inset-x-3 after:-inset-y-3.5 after:content-['']"
          >
            {subteams.link.label}
          </TextLink>
        </div>

        <ul
          role="list"
          className="mt-8 grid gap-5 min-[768px]:mt-10 min-[768px]:gap-6 min-[1200px]:mt-12 min-[1200px]:grid-cols-3"
        >
          {subteams.items.map((item) => (
            <li key={item.name} className="flex">
              <article className="flex w-full min-w-0 flex-col border border-rule-strong bg-surface p-5 min-[768px]:min-h-[160px] min-[768px]:p-6 min-[1200px]:min-h-[220px] min-[1200px]:p-8">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="type-h4 text-ink">{item.name}</h3>
                  <Image
                    src={item.icon.src}
                    alt=""
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    className="shrink-0"
                  />
                </div>
                <p className="type-body mt-7 max-w-md text-ink-2 min-[1200px]:mt-8 min-[1200px]:max-w-[20rem]">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
};
