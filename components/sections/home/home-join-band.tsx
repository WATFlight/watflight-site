import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { joinBand } from "@/content/home";

/**
 * Cream "JOIN WATFLIGHT" band (Home frame). The title is "JOIN" followed by the exact WATFlight
 * wordmark SVG from the frame, so the heading's accessible name is "JOIN WATFlight".
 *
 * Owner-directed: this closing section fills a whole viewport below the sticky header
 * (`min-height: calc(100svh - var(--header-height))`), content centered both ways, rule stacks
 * full width. The footer starts after it.
 */
export function HomeJoinBand() {
  return (
    <CtaBand
      id={joinBand.id}
      fullViewport
      title={
        <span className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span>{joinBand.lead}</span>
          <Image
            src={joinBand.wordmarkSrc}
            alt={joinBand.wordmarkAlt}
            width={457}
            height={76}
            className="h-auto w-[min(457px,72vw)]"
          />
        </span>
      }
      subtitle={joinBand.subtitle}
      description={joinBand.description}
    >
      {joinBand.actions.map(({ label, href, variant }, index) => (
        <Button key={label} href={href} variant={variant} data-arm={index === 0 ? "reveal" : undefined}>
          {label}
        </Button>
      ))}
    </CtaBand>
  );
}
