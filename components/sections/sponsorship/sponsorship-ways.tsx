import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/cn";
import { sponsorshipWays } from "@/content/sponsorship";
import { FramedPhoto } from "@/components/sections/sponsorship/framed-photo";
import { SponsorshipIcon } from "@/components/sections/sponsorship/sponsorship-icon";
import { cardTitleClass, h2Class } from "@/components/sections/sponsorship/styles";

/**
 * Ways to support (frame 340:771, 1440px reference): the title and a two-line paragraph at the left, a
 * list of three support types under them and a tall photograph in its corner brackets at the right
 * (546px wide, aligned to the title at the top and to the last row at the bottom). Each row is a cream
 * line icon, a thin vertical accent (blue at the top third, grey below), a title and a description,
 * with a hairline under the first two rows from the accent line to the end of the text. The photo
 * column is 41.6% of the page width from 1024px; below that it stacks under the list.
 *
 * Semantics: a list of articles, each with an `h3`. The icons are decorative and the photograph is an
 * illustrative AI image.
 */
export function SponsorshipWays() {
  const lastIndex = sponsorshipWays.items.length - 1;

  return (
    <section aria-labelledby="sponsorship-ways-heading">
      <PageContainer className="pt-14 pb-14 md:pt-20 md:pb-20 xl:pt-[85px] xl:pb-[66px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_41.6%] lg:gap-14">
          <div>
            <h2 id="sponsorship-ways-heading" className={cn(h2Class, "text-ink")}>
              {sponsorshipWays.title}
            </h2>
            <p className="type-body-lg mt-5 max-w-[700px] text-ink-2">{sponsorshipWays.description}</p>

            <ul role="list" className="mt-10 max-w-[642px] xl:mt-[57px]">
              {sponsorshipWays.items.map((item, index) => (
                <li key={item.title} className={cn(index > 0 && "pt-7 xl:pt-[30px]")}>
                  <article className="grid grid-cols-[56px_minmax(0,1fr)] md:grid-cols-[108px_minmax(0,1fr)]">
                    <div className="pt-0.5 pl-1 text-ink md:pl-7">
                      <SponsorshipIcon name={item.icon} className="size-7 md:size-10" />
                    </div>
                    <div className="relative pl-5 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-[linear-gradient(180deg,var(--color-blue)_0,var(--color-blue)_33%,var(--color-rule)_33%,var(--color-rule)_100%)] before:content-[''] md:pl-[31px]">
                      <h3 className={cn(cardTitleClass, "text-ink")}>{item.title}</h3>
                      <p className="type-body-lg mt-2.5 text-ink-2">{item.description}</p>
                    </div>
                  </article>
                  {index < lastIndex ? (
                    <span aria-hidden="true" className="mt-[22px] ml-[56px] block h-px bg-rule md:ml-[140px]" />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <FramedPhoto
            slot="SPONSORSHIP-WAYS"
            alt={sponsorshipWays.imageAlt}
            sizes="(min-width: 1440px) 546px, (min-width: 1024px) 42vw, (min-width: 768px) 560px, 100vw"
            className="md:max-w-[560px] lg:max-w-none lg:self-start"
          />
        </div>
      </PageContainer>
    </section>
  );
}
