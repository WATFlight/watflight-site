import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/cn";
import { SponsorMarqueeRows } from "@/components/sections/home/sponsor-marquee-rows";
import { sponsorMarqueeRows } from "@/content/sponsors";
import { sponsorshipPartners } from "@/content/sponsorship";
import { h2Class } from "@/components/sections/sponsorship/styles";

// One accessible entry plus two inert, aria-hidden copies of each row's group, the same count Home uses
// (each group is about half Home's width, so two copies still cover any screen up to 5,500px wide).
const MARQUEE_COPIES = 3;

/**
 * Our partners (frame 340:771, revised after the owner's visual review): the title and one sentence, then
 * two open, full-bleed rows of white logos in Home's sponsor treatment: no enclosing border or box, the
 * page's #050505 background, the vertical grid rails running through (they paint above the logos), the same
 * artwork, text fallbacks, sizes, spacing, edge fade, pause control and loading behavior as Home's marquee.
 * Each row loops by itself, both move left at the same speed, and they start at different points in their
 * loops so they never line up into columns. The 23 organizations are split between the rows by a stored,
 * width-balanced assignment (content/sponsors.ts), each in exactly one row, so about twice as many different
 * organizations are on screen at once as in one row. Home's single row is unchanged.
 */
export function SponsorshipPartners() {
  return (
    <section aria-labelledby="sponsorship-partners-heading">
      <div className="pt-14 pb-16 md:pt-20 md:pb-20 xl:pt-[62px] xl:pb-[80px]">
        <PageContainer>
          <h2 id="sponsorship-partners-heading" data-reveal="" className={cn(h2Class, "text-ink")}>
            {sponsorshipPartners.title}
          </h2>
          <p data-reveal="" className="type-body-lg mt-4 max-w-[760px] text-ink-2 xl:mt-2.5">
            {sponsorshipPartners.description}
          </p>
        </PageContainer>

        <div data-reveal="fade" className="mt-12 md:mt-14 xl:mt-[56px]">
          <SponsorMarqueeRows
            rows={sponsorMarqueeRows}
            copies={MARQUEE_COPIES}
            labelledBy="sponsorship-partners-heading"
          />
        </div>
      </div>
    </section>
  );
}
