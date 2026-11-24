import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/cn";
import { JoinEyebrow } from "@/components/sections/join/join-eyebrow";
import { sectionTitleClass } from "@/components/sections/join/styles";
import { joinProjectCta } from "@/content/join";

/**
 * Current Project call to action (frame 344:1128, 1440px reference): the dark closing section. The eyebrow,
 * the three-line title and a dark "EXPLORE THE CURRENT PROJECT" button (to /projects) sit in their own
 * column at the left, and the aircraft picture fills the right (from 1024px, 812px wide at 1440px, a 2.8:1 band that
 * starts 24px under the rule above it and fades into the page background at its left edge); below 1024px
 * the picture stacks under the text. The text never sits on the picture, so it reads without the image.
 * The section has no line of its own at the bottom: it ends as many pixels under the picture as it starts
 * above it, and the shared footer's own top rule (one 1px #2B2B2B line) is the page's only boundary there.
 * The picture is an illustrative AI-generated image (see the notes).
 */
export function JoinCta() {
  return (
    <section aria-labelledby="join-cta-heading">
      <PageContainer className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,500fr)_minmax(0,812fr)] lg:gap-0 xl:py-6">
        <div>
          <JoinEyebrow>{joinProjectCta.eyebrow}</JoinEyebrow>
          <h2
            id="join-cta-heading"
            data-reveal=""
            className={cn(sectionTitleClass, "mt-4 max-w-[500px] text-ink text-balance")}
          >
            {joinProjectCta.title}
          </h2>
          <div data-reveal="" className="mt-8">
            <Button href={joinProjectCta.action.href} variant="dark" wrap>
              {joinProjectCta.action.label}
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>

        <div className="relative">
          <MediaFrame
            slot={joinProjectCta.image.slot}
            alt={joinProjectCta.image.alt}
            sizes="(min-width: 1440px) 812px, (min-width: 1024px) 62vw, 100vw"
            className="w-full"
          />
          {/* Fades the picture's left edge into the page background. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-canvas to-transparent"
          />
        </div>
      </PageContainer>
    </section>
  );
}
