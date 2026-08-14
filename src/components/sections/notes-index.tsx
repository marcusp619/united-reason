"use client";

import Link from "next/link";
import { useState } from "react";

import { categories, posts, type Category } from "@/content/posts";
import { cn } from "@/lib/utils";

/** The filter chips + post rows on the Notes index. */
export function NotesIndex() {
  const [active, setActive] = useState<Category>("All");
  const visible = active === "All" ? posts : posts.filter((p) => p.cat === active);

  return (
    <>
      <div className="flex flex-wrap gap-2.5">
        {categories.map((c) => {
          const on = c === active;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(c)}
              className={cn(
                "inline-flex cursor-pointer items-center border px-4 py-2 text-sm transition-colors",
                on
                  ? "border-brand bg-brand text-ground"
                  : "text-ink hover:bg-brand-100 border-[var(--color-divider)] bg-transparent",
              )}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="px-0 pt-2 md:pt-2">
        {visible.map((p) => (
          <Link
            key={p.slug}
            href={`/notes/${p.slug}`}
            className="grid items-baseline gap-2 border-b-2 border-[var(--color-divider)] py-6 no-underline md:grid-cols-[150px_1fr_120px] md:gap-8"
          >
            <span className="text-brand text-[11px] tracking-[0.16em] uppercase">{p.cat}</span>
            <h3 className="text-ink m-0 text-[20px] md:text-[26px]">{p.title}</h3>
            <span className="text-muted text-sm md:text-right">{p.read}</span>
          </Link>
        ))}
        {visible.length === 0 && (
          <p className="text-muted py-8">Nothing filed under that yet — try another filter.</p>
        )}
      </div>
    </>
  );
}
