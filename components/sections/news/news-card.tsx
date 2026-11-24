import Link from "next/link";
import { MediaFrame } from "@/components/ui/media-frame";
import { cardTitleClass } from "@/components/sections/news/styles";
import { newsHref, type NewsStory } from "@/content/news";
import { cn } from "@/lib/cn";

/**
 * One story card (frame 344:1129): the picture (in its own thin outline), a meta line (category and date), an
 * `h3` title, a summary and a "Read" cue at the bottom. The whole card is ONE link to the story's article page:
 * the link is the title (so the accessible name is the story title, and there is a single focus stop per card)
 * and its `::after` covers the card. The "Read" cue is decorative (`aria-hidden`). Hover turns the title and the
 * cue light blue and the border a step lighter; keyboard focus draws the 2px focus ring around the whole card
 * (the title's own outline is replaced by it). Cards have a neutral grey border and a content-driven height;
 * cards in a row share the taller one's height and keep the cue at the bottom.
 */
export function NewsCard({ story, sizes }: { story: NewsStory; sizes: string }) {
  const { category, date, dateTime, title, summary, image } = story;

  return (
    <article
      data-card=""
      className="group relative flex w-full flex-col border border-rule p-5 transition-colors duration-150 hover:border-rule-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 motion-reduce:transition-none md:p-6"
    >
      <MediaFrame slot={image.slot} alt={image.alt} sizes={sizes} bordered motion="none" className="w-full" />
      <div className="mt-6 flex flex-1 flex-col">
        <p className="type-eyebrow text-ink-2">
          {category ? (
            <>
              {category}
              <span aria-hidden="true"> · </span>{" "}
            </>
          ) : null}
          <time dateTime={dateTime}>{date}</time>
        </p>
        <h3 className={cn(cardTitleClass, "mt-3 text-balance")}>
          <Link
            href={newsHref(story)}
            className="transition-colors duration-150 group-hover:text-blue-light after:absolute after:inset-0 after:content-[''] focus-visible:outline-none motion-reduce:transition-none"
          >
            {title}
          </Link>
        </h3>
        <p className="type-body xl:type-body-lg mt-3 text-ink-2">{summary}</p>
        <p
          aria-hidden="true"
          className="mt-auto flex items-center gap-3 pt-6 text-lg font-medium text-ink transition-colors duration-150 group-hover:text-blue-light motion-reduce:transition-none"
        >
          Read
          <span>→</span>
        </p>
      </div>
    </article>
  );
}
