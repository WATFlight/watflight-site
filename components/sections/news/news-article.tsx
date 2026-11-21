import Link from "next/link";
import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { Rule } from "@/components/ui/rule";
import { NewsArticleBody } from "@/components/sections/news/news-article-body";
import {
  articleDeckClass,
  articleImageSizes,
  articleShellClass,
  articleTitleClass,
} from "@/components/sections/news/styles";
import { newsArticleText, newsHref, newsSampleMode, type NewsStory } from "@/content/news";
import { cn } from "@/lib/cn";

const navLinkClass =
  "type-body inline-flex min-h-11 items-start gap-2 py-2 font-medium text-ink transition-colors duration-150 hover:text-blue-light motion-reduce:transition-none";

/**
 * Article page (`/news/[slug]`), a reusable editorial template (layout reference: an owner-supplied light-theme
 * article page, used for structure and spacing only; the page keeps the site's dark theme, Bunken faces, shared
 * header and footer and rails; see docs/rebuild-notes.md, "News & Blog page"). From the top:
 *  1. a breadcrumb "News / [title]" (`nav` + `ol`; "News" links to /news, the title is plain text and wraps);
 *  2. the editorial header: category and date with the visible "SAMPLE ARTICLE" label, then the `h1` at the left
 *     and the summary (deck) at the right with the one sample notice under it from 1024px, stacked below;
 *  3. one neutral rule;
 *  4. the lead figure (16:9, never distorted) with a short neutral caption;
 *  5. the body, left-aligned (`NewsArticleBody`, from blocks);
 *  6. article navigation under one rule: "Back to News" at the left and "Next update: [title]" at the right
 *     (stacked on narrow screens). The last article has no "Next update" link.
 * The figure with its caption, the body and the navigation share ONE centered shell (`articleShellClass`: 1040px
 * at most below 1600px, 1120px at most from 1600px, the whole content width below that), so their left and right
 * edges line up and the page does not stretch to the full distance between the rails; the header keeps the full
 * content width. Paragraphs keep the shell's width so lists, figures and callouts line up with them.
 * Nothing is sticky, so nothing can overlap the shared sticky header. The picture is an illustrative
 * AI-generated image (see the notes); while `newsSampleMode` is on the label and the notice show.
 */
export function NewsArticle({ story, next }: { story: NewsStory; next?: NewsStory }) {
  const { category, date, dateTime, title, summary, image, blocks } = story;

  return (
    <PageContainer className="pt-8 pb-16 md:pt-10 xl:pt-12 xl:pb-24">
      <nav aria-label={newsArticleText.breadcrumbLabel}>
        <ol className="type-body-sm flex flex-wrap items-baseline gap-x-2 text-ink-2">
          <li>
            <Link
              href="/news"
              className="-my-3 inline-block py-3 transition-colors duration-150 hover:text-blue-light motion-reduce:transition-none"
            >
              {newsArticleText.breadcrumbNews}
            </Link>
          </li>
          <li className="flex min-w-0 gap-2">
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="min-w-0 text-ink [overflow-wrap:anywhere]">
              {title}
            </span>
          </li>
        </ol>
      </nav>

      <article aria-labelledby="news-article-title" className="mt-10 break-words md:mt-12">
        <header className="grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] xl:gap-x-24">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 lg:col-span-2">
            <p className="type-eyebrow text-ink-2">
              {category ? (
                <>
                  {category}
                  <span aria-hidden="true"> · </span>{" "}
                </>
              ) : null}
              <time dateTime={dateTime}>{date}</time>
            </p>
            {newsSampleMode ? (
              <p className="type-eyebrow border border-rule-strong px-2.5 py-1 text-ink">{newsArticleText.sampleLabel}</p>
            ) : null}
          </div>
          <h1 id="news-article-title" className={articleTitleClass}>
            {title}
          </h1>
          <div>
            <p className={cn(articleDeckClass, "max-w-[560px]")}>{summary}</p>
            {newsSampleMode ? (
              <p role="note" className="type-body-sm mt-6 max-w-[560px] border-l-2 border-rule-strong pl-4 text-ink-2">
                {newsArticleText.sampleNotice}
              </p>
            ) : null}
          </div>
        </header>

        <Rule className="mt-10 md:mt-12" />

        <figure className={cn(articleShellClass, "mt-10 md:mt-12")}>
          <MediaFrame
            slot={image.slot}
            alt={image.alt}
            sizes={articleImageSizes}
            priority
            fluid
            bordered
            className="aspect-video w-full"
          />
          <figcaption className="type-body-sm mt-3 text-ink-2">{newsArticleText.leadCaption}</figcaption>
        </figure>

        <div className={cn(articleShellClass, "mt-14 md:mt-16")}>
          <NewsArticleBody blocks={blocks} />
        </div>
      </article>

      <div className={cn(articleShellClass, "mt-14 md:mt-16")}>
        <nav
          aria-label={newsArticleText.navLabel}
          className="flex flex-col gap-2 border-t border-rule pt-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
        >
          <Link href="/news" className={navLinkClass}>
            <span aria-hidden="true">←</span>
            {newsArticleText.back}
          </Link>
          {next ? (
            <Link href={newsHref(next)} className={cn(navLinkClass, "sm:max-w-[600px] sm:text-right")}>
              <span>
                {newsArticleText.nextPrefix} {next.title}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </nav>
      </div>
    </PageContainer>
  );
}
