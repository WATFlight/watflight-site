import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { partner } from "@/content/home";
import { cn } from "@/lib/cn";

/**
 * "partner with us" (Home frame): copy and one action on the left, the exchange diagram
 * (Your Support -> Student + Project Impact) on the right from 1280px. It sits on the black panel
 * (HomeBlackoutPanel) with no dividers or boxes: alignment and whitespace carry the layout.
 * The diagram column is 520px: 214px + 17px + 35px arrow + 17px + 230px. Figma's second text box is
 * 310px wide but its visible text is under 215px, so it is trimmed to 230px here; that leaves the
 * copy column wide enough for the title on one line even in the wide display face.
 * The Figma "Sponsor Package" button is not rendered because no PDF exists.
 * Below 1280px the diagram stacks under the copy, and on phones the arrow turns downward.
 */
export function HomePartner() {
  const [support, impact] = partner.exchange;

  return (
    <section aria-labelledby="home-partner-heading" className="py-24 md:py-32 xl:py-40">
      <PageContainer className="grid gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,520px)] xl:gap-x-16 xl:gap-y-0">
        <div>
          <SectionHeading id="home-partner-heading" title={partner.title} titleClassName="text-balance" />
          <p data-reveal="" className="type-body mt-4 max-w-[533px] text-ink-2 xl:mt-[17px]">
            {partner.body}
          </p>
          <div data-reveal="" className="mt-6 xl:mt-[25px]">
            <Button href={partner.action.href} variant={partner.action.variant}>
              {partner.action.label}
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-[17px] xl:pt-[89px]">
          <ExchangeItem item={support} className="max-w-[214px]" />
          <Image
            src={partner.arrow.src}
            alt=""
            width={partner.arrow.size}
            height={partner.arrow.size}
            data-reveal="fade"
            className="shrink-0 rotate-90 md:mt-[52px] md:rotate-0"
          />
          <ExchangeItem item={impact} className="max-w-[230px]" />
        </div>
      </PageContainer>
    </section>
  );
}

function ExchangeItem({
  item,
  className,
}: {
  item: (typeof partner.exchange)[number];
  className?: string;
}) {
  return (
    <div data-reveal="" className={cn("flex w-full flex-col items-center text-center", className)}>
      <div className="flex h-[53px] items-start justify-center">
        <Image src={item.icon} alt="" width={item.iconWidth} height={item.iconHeight} />
      </div>
      <h3 className="type-h5 mt-[3px] text-ink">{item.title}</h3>
      <p className="type-body-sm mt-[15px] text-ink-2" style={{ maxWidth: item.descriptionMaxWidth }}>
        {item.description}
      </p>
    </div>
  );
}
