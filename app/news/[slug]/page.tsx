import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticle } from "@/components/sections/news/news-article";
import { findNewsStory, newsRobots, newsStories, nextNewsStory } from "@/content/news";

// One static page per story in content/news.ts (the featured story and the Recent updates cards). Any other
// slug is a normal 404 (`dynamicParams = false`, and `notFound()` as a guard). The pages carry SAMPLE bodies, so
// they are served with `noindex, nofollow` (`newsSampleMode` in content/news.ts; see the note there for what to
// change at launch).
export const dynamicParams = false;

type ArticlePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsStories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = findNewsStory(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.summary,
    robots: newsRobots,
  };
}

export default async function NewsArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const story = findNewsStory(slug);
  if (!story) notFound();
  return <NewsArticle story={story} next={nextNewsStory(story.slug)} />;
}
