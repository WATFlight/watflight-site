import type { Metadata } from "next";

/** The production origin. Canonical URLs, Open Graph URLs, the sitemap and robots.txt are all built from it. */
export const siteUrl = "https://watflight.com";
export const siteName = "WATFlight";

/**
 * Social preview image: a 1200x630 crop of the Home hero photograph (`public/og-image.jpg`). It carries no text
 * and no new artwork, so it stays in step with the approved picture.
 */
export const socialImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "A WATFlight aircraft on a dark, reflective floor.",
};

type PageSeo = {
  /** A page title (the root layout adds " | WATFlight") or `{ absolute }` for a title that stands alone. */
  title: string | { absolute: string };
  description: string;
  /** The page's own path, for example "/about". It becomes the canonical URL and the Open Graph URL. */
  path: string;
};

/**
 * Metadata for an indexable page: title, description, canonical URL, Open Graph and Twitter card. Not used for the
 * News pages while they are samples (they stay `noindex` and carry no canonical or share card of their own; see
 * `newsSampleMode` in content/news.ts).
 */
export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const shownTitle = typeof title === "string" ? `${title} | ${siteName}` : title.absolute;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName,
      locale: "en_CA",
      url: path,
      title: shownTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shownTitle,
      description,
      images: [socialImage.url],
    },
  };
}
