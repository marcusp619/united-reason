import type { Metadata } from "next";

import { Kicker } from "@/components/primitives";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { NotesIndex } from "@/components/sections/notes-index";
import { featured } from "@/content/posts";

export const metadata: Metadata = {
  alternates: { canonical: "/notes" },
  title: "Notes",
  description:
    "Plain-English notes on automating a small business. Written for owners, not developers.",
};

export default function NotesPage() {
  return (
    <>
      <section className="border-b-2 border-[var(--color-divider)] px-5 py-8 md:px-16 md:py-13">
        <Kicker>Notes</Kicker>
        <h1 className="m-0 mb-6 max-w-[20ch] text-[38px] leading-none tracking-[-0.03em] md:text-[60px]">
          Plain-English notes on automating a small business.
        </h1>
      </section>

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-2">
        {/* Modular grid block — the system's structure standing in for a photo. */}
        <div
          aria-hidden="true"
          className="grid min-h-[200px] grid-cols-4 grid-rows-4 border-b-2 border-[var(--color-divider)] md:min-h-[340px] md:border-r-2 md:border-b-0"
        >
          <div className="bg-brand col-span-2 row-span-2 border-r-2 border-b-2 border-[var(--color-divider)]" />
          <div className="col-span-2 border-r-2 border-b-2 border-[var(--color-divider)]" />
          <div className="bg-brand-200 col-start-1 row-span-2 row-start-3 border-r-2 border-b-2 border-[var(--color-divider)]" />
          <div className="bg-brand col-span-3 col-start-2 row-start-3 border-r-2 border-b-2 border-[var(--color-divider)]" />
          <div className="bg-brand-200 col-start-3 row-start-4 border-r-2 border-b-2 border-[var(--color-divider)]" />
          <div className="col-start-4 row-span-2 row-start-2 border-r-2 border-b-2 border-[var(--color-divider)]" />
        </div>

        <article className="px-5 py-8 md:px-14 md:py-12">
          <Kicker>Latest · {featured.cat}</Kicker>
          <h2 className="m-0 mb-4 max-w-[18ch] text-[28px] leading-[1.05] md:text-[38px]">
            {featured.title}
          </h2>
          <p className="m-0 mb-5 max-w-[50ch] text-base leading-[1.55]">{featured.excerpt}</p>
          <p className="text-muted m-0 text-sm">
            {featured.read} · {featured.date}
          </p>
        </article>
      </div>

      <section className="border-b-2 border-[var(--color-divider)] px-5 pb-8 md:px-16 md:pb-10">
        <div className="py-8 md:py-9">
          <NotesIndex />
        </div>
      </section>

      <section className="bg-brand-100 grid items-center gap-8 px-5 py-8 md:grid-cols-[1fr_420px] md:gap-12 md:px-16 md:py-12">
        <div>
          <h2 className="m-0 mb-2.5 max-w-[22ch] text-[26px] md:text-[32px]">
            One note a month. Nothing else, ever.
          </h2>
          <p className="text-muted m-0 text-base">
            Written for owners, not developers. Unsubscribe link at the top, where it should be.
          </p>
        </div>
        <NewsletterForm />
      </section>
    </>
  );
}
