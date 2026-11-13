import Image from "next/image";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { cn } from "@/lib/cn";
import { subteams } from "@/content/about";

type AboutSubteamsProps = {
  /**
   * True while the faculty advisory section follows: its top rule then sits 35px below the link, as
   * in the frame. Without it the section closes with the roomier gap before the call-to-action.
   */
  followedByRule: boolean;
};

/**
 * Subteam disciplines (frame 262:80): three #0F0F0F cards (420x135 at 1440px, 26px apart) with a
 * 1px #444444 border on the top, left and right only (the frame draws no bottom border), the
 * discipline name in Std Wide 22/30 and its icon at the right of the same row, then the description
 * (Geist 16/25, #969690). The icons are the exact Figma exports at their own size.
 *
 * The frame places each card's text 18 to 25px from its left edge and each icon 20 to 28px from the
 * right edge (hand-placed); here every card uses one 20px inset and centers its icon on the title.
 * "LEARN MORE" sits 20px below the cards, right-aligned, and goes to /join.
 *
 * Grid: three columns from 1024px, one below. Cards are list items in an `ul`, each an `article`.
 */
export function AboutSubteams({ followedByRule }: AboutSubteamsProps) {
  return (
    <section aria-labelledby="about-subteams-heading">
      <PageContainer
        className={cn(followedByRule ? "pb-9" : "pb-20 md:pb-24 xl:pb-[104px]")}
      >
        <SectionHeading as="h2" size="h2" id="about-subteams-heading" title={subteams.title} />
        <ul role="list" className="mt-6 grid gap-6 md:mt-8 lg:grid-cols-3 xl:mt-9 xl:gap-x-[26px]">
          {subteams.items.map((item) => (
            <li key={item.name} className="flex">
              <article className="w-full border-x border-t border-rule-strong bg-surface px-5 pt-6 pb-[21px] xl:min-h-[135px]">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="type-h4 text-ink">{item.name}</h3>
                  <Image src={item.icon.src} alt="" width={item.icon.size} height={item.icon.size} className="shrink-0" />
                </div>
                <p
                  className="type-body mt-[9px] text-ink-2"
                  style={{ maxWidth: item.descriptionMaxWidth }}
                >
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex justify-end">
          {/* The ::after widens the touch target to about 46px high without moving the label or underline. */}
          <TextLink
            href={subteams.link.href}
            className="relative after:absolute after:-inset-3 after:content-['']"
          >
            {subteams.link.label}
          </TextLink>
        </div>
      </PageContainer>
    </section>
  );
}
