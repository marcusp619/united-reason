import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Required by @next/mdx in the App Router — MDX will not compile without it.
 *
 * Note bodies are plain markdown; the Modernist look comes from the `.prose`
 * block in globals.css rather than per-element classes here. The only override
 * is anchors, so internal links use the router instead of a full page load.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = "", children, ...props }) =>
      href.startsWith("/") ? (
        <Link href={href} {...props}>
          {children}
        </Link>
      ) : (
        <a href={href} rel="noopener noreferrer" target="_blank" {...props}>
          {children}
        </a>
      ),
    ...components,
  };
}
