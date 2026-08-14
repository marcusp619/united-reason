import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/**
 * Everything is crawlable on purpose.
 *
 * The unwritten note shells are kept out of the index with a `noindex` meta on
 * the route itself rather than a Disallow here: a path blocked in robots.txt is
 * never fetched, so the crawler never sees the noindex, and the URL can still
 * surface as a bare result. Crawl-and-noindex is what actually removes them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
