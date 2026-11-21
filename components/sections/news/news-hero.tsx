import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { NewsEyebrow } from "@/components/sections/news/news-eyebrow";
import { NewsFeaturedMedia } from "@/components/sections/news/news-featured-media";
import { featuredTitleClass } from "@/components/sections/news/styles";
import { assetSlots } from "@/content/assets";
import { newsFeatured, newsHero, newsHref } from "@/content/news";
import { cn } from "@/lib/cn";

/**
 * Featured news (frame 344:1129, 1440px reference): the eyebrow, the page's one `h1` (Bunken SC Wide, 56/66 from
 * 1280px as measured in the frame, so "LATEST FROM" fits the column; the Display Page size below that), a short introduction and
 * the featured story (date, `h2` title, summary) at the left, and the featured aircraft picture at the right in
 * its frame (outline, four corner marks and one faint vertical gridline, all drawn in CSS). From 1024px the text
 * and the picture are two columns (48% / 52%, so the picture is 682px wide at 1440px) centered on each other, with
 * a 32px gap that closes up from 1280px; below that they stack as heading, picture, then the story. "READ ARTICLE"
 * opens the story's sample article page (`/news/<slug>`); it is the story's only link. The frame's "01 / 04"
 * counter and arrows are not drawn: only one approved picture exists (see `NewsFeaturedMedia`).
 */
export function NewsHero() {
  const { story, slides } = newsFeatured;
  const first = assetSlots[slides[0].slot];
  const mediaSlides = slides.map((s) => ({ src: assetSlots[s.slot].path, alt: s.alt }));

  return (
    <section aria-labelledby="news-heading">
      <PageContainer className="grid items-center gap-10 py-12 md:gap-12 md:py-16 lg:grid-cols-[minmax(0,48fr)_minmax(0,52fr)] lg:gap-x-8 xl:gap-x-0 xl:py-16">
        {/* `contents` below 1024px lets the heading, the picture and the story stack in that order. */}
        <div className="contents lg:flex lg:flex-col lg:gap-16 xl:gap-20">
          <div className="order-1">
            <NewsEyebrow>{newsHero.eyebrow}</NewsEyebrow>
            <h1 id="news-heading" className="type-display-page mt-6 max-w-[600px] text-ink xl:text-[56px] xl:leading-[66px]">
              {newsHero.title}
            </h1>
            <p className="type-body-lg mt-8 max-w-[480px] text-ink-2">{newsHero.intro}</p>
          </div>

          <article aria-labelledby="news-featured-title" className="order-3">
            <p className="type-eyebrow text-ink-2">
              <time dateTime={story.dateTime}>{story.date}</time>
            </p>
            <h2 id="news-featured-title" className={cn(featuredTitleClass, "mt-5 max-w-[520px] text-balance")}>
              {story.title}
            </h2>
            <p className="type-body-lg mt-5 max-w-[520px] text-ink-2">{story.summary}</p>
            <div className="mt-8">
              <Button href={newsHref(story)} variant="light">
                READ ARTICLE
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </article>
        </div>

        <NewsFeaturedMedia
          className="order-2 lg:col-start-2 lg:row-start-1"
          slides={mediaSlides}
          width={first.width}
          height={first.height}
          sizes="(min-width: 1440px) 682px, (min-width: 1024px) 52vw, 100vw"
          priority
        />
      </PageContainer>
    </section>
  );
}
