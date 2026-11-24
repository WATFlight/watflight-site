import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// Everything public is crawlable. The News pages stay crawlable on purpose: while they are samples they carry a
// `noindex` robots meta tag (`newsSampleMode` in content/news.ts), and a crawler has to be allowed to fetch them
// to see it. They are left out of the sitemap instead. Only the form endpoint is closed to crawlers.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
