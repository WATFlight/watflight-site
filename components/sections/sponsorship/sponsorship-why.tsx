import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/cn";
import { sponsorshipWhy } from "@/content/sponsorship";
import { SponsorshipIcon } from "@/components/sections/sponsorship/sponsorship-icon";
import { cardTitleClass, h2Class } from "@/components/sections/sponsorship/styles";

/**
 * Why partner with us (frame 340:771, 1440px reference): a short blue dash, then the title at the left
 * and a two-line paragraph at the right of one row, then three bordered cards 32px apart, each with a
 * blue line icon, a title and a description. The section starts 82px under the hero's rule and ends
 * 58px under the cards. (The design's first card also has a short blue accent on its top edge, a
 * one-off detail of the AI screenshot that is not reproduced.)
 *
 * The cards are a semantic list of articles. Three columns from 1280px (each 416px wide at 1440px),
 * one full-width card per row below, never two plus one. Card text is Geist 18/29 with its width
 * capped so lines are not stretched.
 */
export function SponsorshipWhy() {
  return (
    <section aria-labelledby="sponsorship-why-heading">
      <PageContainer className="pt-14 pb-14 md:pt-20 md:pb-16 xl:pt-[82px] xl:pb-[52px]">
        <span aria-hidden="true" className="block h-0.5 w-10 bg-blue" />
        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <h2 id="sponsorship-why-heading" className={cn(h2Class, "text-ink")}>
            {sponsorshipWhy.title}
          </h2>
          <p className="type-body-lg max-w-[480px] text-ink-2">{sponsorshipWhy.description}</p>
        </div>

        <ul role="list" className="mt-10 grid gap-6 md:mt-12 xl:mt-[52px] xl:grid-cols-3 xl:gap-8">
          {sponsorshipWhy.cards.map((card) => (
            <li key={card.title} className="flex">
              <article className="w-full min-w-0 border border-rule-strong p-6 md:p-8 xl:px-[30px] xl:pt-[38px] xl:pb-7">
                <SponsorshipIcon name={card.icon} className="size-10 text-blue" />
                <h3 className={cn(cardTitleClass, "mt-6 text-ink xl:mt-[27px]")}>{card.title}</h3>
                <p className="type-body-lg mt-3 max-w-md text-ink-2">{card.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
