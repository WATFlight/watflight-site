import type { Metadata } from "next";
import { NewsHero } from "@/components/sections/news/news-hero";
import { NewsRecent } from "@/components/sections/news/news-recent";
import { Rule } from "@/components/ui/rule";
import { newsRobots } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description: "News and updates from the WATFlight student design team at the University of Waterloo.",
  // noindex, nofollow while the stories are samples (`newsSampleMode` in content/news.ts).
  robots: newsRobots,
};

// News & Blog (Figma frame 344:1129). The frame is the owner's 3x PNG export of a flattened, AI-generated design
// reference, rebuilt here as semantic HTML: only three of its photographs were extracted (public/images/news).
// All copy, dates and stories are provisional (content/news.ts; docs/rebuild-notes.md, "News & Blog page"). The
// three stories open SAMPLE article pages (app/news/[slug]), so this page is kept out of search indexing too
// until real stories replace them. A full-width #2B2B2B rule separates the
// featured story from Recent updates; the grid rails overlay every section, the sticky header stays dark (the
// page has no cream band) and "News" is the active nav item. The page ends without a line of its own: the shared
// footer's top rule is the single boundary.
export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <Rule />
      <NewsRecent />
    </>
  );
}
