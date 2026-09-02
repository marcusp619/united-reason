import type { Metadata } from "next";

/**
 * The canonical URL and the Open Graph URL for a page are the same fact, and
 * setting only one of them is how they drift: `openGraph` is declared once in
 * the root layout, page metadata merges shallowly over it, so a page that sets
 * a canonical without an `openGraph.url` silently keeps the layout's — every
 * shared link resolving to the homepage. Derive both from the one path.
 */
export function pageMetadata(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: { url: path },
  };
}
