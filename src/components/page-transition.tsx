"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";

/**
 * Cross-fades page content on navigation so the header and footer read as a
 * persistent shell rather than seven separate documents.
 *
 * Keyed on the pathname: the key change is what makes React treat the old and
 * new content as an exit/enter pair instead of an in-place update, which is
 * what activates `share`. Without browser support the navigation simply
 * happens instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition key={pathname} name="page-content" share="auto" enter="auto" default="none">
      {children}
    </ViewTransition>
  );
}
