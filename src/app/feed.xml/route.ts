import { noteBodies } from "@/content/notes";
import { posts } from "@/content/posts";
import { site } from "@/content/site";

/**
 * RSS for the notes.
 *
 * Over the same two registries the sitemap reads, so a note appears in the
 * feed on exactly the condition it appears anywhere else: it has a body. The
 * excerpt is the description — the same sentence the search result shows,
 * because a reader deciding whether to open it is answering the same question
 * either way.
 */

const CACHE_FOR_A_DAY = "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function itemFor(slug: string, title: string, excerpt: string, published: string): string {
  const url = `${site.url}/notes/${slug}`;
  return `    <item>
      <title>${escapeXml(title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(excerpt)}</description>
      <pubDate>${new Date(`${published}T00:00:00Z`).toUTCString()}</pubDate>
    </item>`;
}

export function GET(): Response {
  const written = posts.filter((post) => post.slug in noteBodies);
  const items = written.map((post) => itemFor(post.slug, post.title, post.excerpt, post.published));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${site.name} · notes`)}</title>
    <link>${site.url}/notes</link>
    <description>Plain-English notes on automating a small business.</description>
    <language>en</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;

  return new Response(body, {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": CACHE_FOR_A_DAY,
    },
  });
}
