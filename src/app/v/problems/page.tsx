import type { Metadata } from "next";
import Link from "next/link";

import { Band, Kicker, UrMark } from "@/components/primitives";
import { ProblemPicker } from "@/components/sections/problem-picker";
import { posts } from "@/content/posts";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Home — variant B",
  robots: { index: false },
};

/**
 * Homepage — variant B from the mockups ("the problem list").
 * Opens on the jobs owners recognise; picking one swaps the panel below.
 */
export default function ProblemsVariantPage() {
  return (
    <>
      <Band reveal={false} rule={false} className="md:pb-10">
        <h1 className="m-0 mb-4 text-[38px] leading-[1.02] tracking-[-0.03em] md:text-[60px]">
          What are you still doing by hand?
        </h1>
        <p className="text-muted m-0 max-w-[52ch] text-base md:text-lg">
          Pick the one that stings. I&rsquo;ll show you what it turns into.
        </p>
      </Band>

      <ProblemPicker />

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-[300px_1fr]">
        <UrMark
          size="md"
          className="min-h-[220px] border-b-2 border-[var(--color-divider)] md:border-r-2 md:border-b-0"
        >
          <div className="border-t-2 border-white/50 pt-4">
            <p className="m-0 text-[15px] leading-[1.45]">
              One person, start to finish. No account manager, no handover.
            </p>
          </div>
        </UrMark>
        <div className="px-5 py-8 md:px-14 md:py-13">
          <Kicker tone="muted">Who you&rsquo;d be working with</Kicker>
          <h2 className="m-0 mb-4 max-w-[20ch] text-[26px] md:text-[34px]">
            Just me, {site.owner}, and I answer my own emails.
          </h2>
          <p className="m-0 max-w-[56ch] text-base leading-[1.55]">
            No account manager, no handover to a junior. You describe the problem to the person who
            writes the code, and you get the same person for the whole build and after it.
          </p>
        </div>
      </div>

      <section className="bg-ink text-ground px-5 py-9 md:px-16 md:py-13">
        <p className="text-brand-400 m-0 mb-5 text-[11px] tracking-[0.16em] uppercase">Notes</p>
        <div className="grid gap-8 md:grid-cols-3 md:gap-9">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href="/notes" className="no-underline">
              <h3 className="text-ground m-0 mb-2 text-[20px] md:text-[22px]">{p.title}</h3>
              <p className="m-0 text-[13px] text-[var(--color-neutral-400)]">{p.read} read</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
