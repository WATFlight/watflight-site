import { PageContainer } from "@/components/ui/page-container";
import { NewsCard } from "@/components/sections/news/news-card";
import { sectionTitleClass } from "@/components/sections/news/styles";
import { newsRecent } from "@/content/news";
import { cn } from "@/lib/cn";

/**
 * Recent updates (frame 344:1129): a short blue rule (decorative), the `h2` and a list of two story cards (the
 * frame's other two were removed from this milestone). Two columns from 768px (28px apart; card heights follow
 * their content, equal across the row), one column below. Each card is one link to its article page. The
 * frame's "VIEW ALL NEWS" link is not drawn: every available story is already shown and the site has no separate
 * archive, so the only possible target would be this page itself.
 */
export function NewsRecent() {
  return (
    <section aria-labelledby="news-recent-heading">
      <PageContainer className="py-14 md:py-16 xl:pt-[84px] xl:pb-12">
        <span aria-hidden="true" className="block h-0.5 w-10 bg-blue" />
        <h2 id="news-recent-heading" className={cn(sectionTitleClass, "mt-5 text-ink")}>
          {newsRecent.title}
        </h2>
        <ul role="list" className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 md:gap-7">
          {newsRecent.stories.map((story) => (
            <li key={story.title} className="flex">
              <NewsCard story={story} sizes="(min-width: 1440px) 594px, (min-width: 768px) 45vw, 100vw" />
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
