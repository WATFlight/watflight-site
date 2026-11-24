import type { MetadataRoute } from "next";
import { newsHref, newsSampleMode, newsStories } from "@/content/news";
import { siteUrl } from "@/lib/seo";

// The public pages. The News listing and its articles are added only once `newsSampleMode` is switched off (they
// are noindex samples until then; see content/news.ts), so launching the real stories needs no sitemap change.
const pages = ["/", "/about", "/projects", "/sponsorship", "/join"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = newsSampleMode ? pages : [...pages, "/news", ...newsStories.map((story) => newsHref(story))];
  // Same form as each page's canonical URL, so the home page is "https://watflight.com/".
  return paths.map((path) => ({ url: `${siteUrl}${path}` }));
}
