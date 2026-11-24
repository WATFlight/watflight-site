import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { JoinEyebrow } from "@/components/sections/join/join-eyebrow";
import { JoinFramedPhoto } from "@/components/sections/join/join-framed-photo";
import { joinHero } from "@/content/join";

/**
 * Join hero (frame 344:1128, 1440px reference): the blue-dashed eyebrow, the one `h1` in the Display Page
 * style (it wraps to "JOIN THE / TEAM." in the text column), two intro paragraphs, a light "APPLY NOW" button
 * and a dark "LEARN MORE" button, and the workshop photograph in blue frame brackets at the right. From 1024px
 * the text and the photo are two columns (48% / 52%, so the photo is 682px wide at 1440px) centered on each
 * other, with a 32px gap that closes up from 1280px; below that the photo stacks under
 * the text. "APPLY NOW" goes to the How to Apply section and "LEARN MORE" to Subteams (in-page anchors; the
 * shell's scroll margin keeps their targets clear of the sticky header). The picture is an illustrative
 * AI-generated image (see the notes).
 */
export function JoinHero() {
  return (
    <section aria-labelledby="join-hero-heading">
      <PageContainer className="grid items-center gap-10 py-12 md:gap-12 md:py-16 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:gap-x-8 xl:gap-x-0 xl:py-24">
        <div>
          <JoinEyebrow motion="enter">{joinHero.eyebrow}</JoinEyebrow>
          <h1
            id="join-hero-heading"
            data-enter="headline"
            data-step="1"
            className="type-display-page mt-6 max-w-[560px] text-ink"
          >
            {joinHero.title}
          </h1>
          <div data-enter="rise" data-step="3" className="mt-8 flex max-w-[540px] flex-col gap-6">
            {joinHero.intro.map((paragraph) => (
              <p key={paragraph} className="type-body-lg text-ink text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
          <div data-enter="rise" data-step="4" className="mt-9 flex flex-wrap gap-4">
            <Button href={joinHero.apply.href} variant="light">
              {joinHero.apply.label}
              <span aria-hidden="true">→</span>
            </Button>
            <Button href={joinHero.learn.href} variant="dark">
              {joinHero.learn.label}
              <span className="sr-only"> {joinHero.learn.hiddenLabel}</span>
            </Button>
          </div>
        </div>

        <JoinFramedPhoto
          slot={joinHero.image.slot}
          alt={joinHero.image.alt}
          sizes="(min-width: 1440px) 682px, (min-width: 1024px) 52vw, 100vw"
          priority
        />
      </PageContainer>
    </section>
  );
}
