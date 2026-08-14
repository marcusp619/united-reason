import type { Metadata } from "next";

import { Kicker, UrMark } from "@/components/primitives";
import { CalEmbed } from "@/components/sections/cal-embed";
import { env } from "@/env";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Thirty minutes, free, no sales pitch. You describe the problem, I tell you whether software fixes it and roughly what it would take.",
};

const promises = [
  "You'll be talking to me, not a salesperson.",
  "Nothing to prepare — a rough description of the annoying bit is plenty.",
  "No follow-up sequence afterwards. One email, then it's your move.",
];

export default function BookPage() {
  return (
    <>
      <section className="border-b-2 border-[var(--color-divider)] px-5 py-8 md:px-16 md:py-13">
        <Kicker>Book a call</Kicker>
        <h1 className="m-0 mb-5 text-[38px] leading-none tracking-[-0.03em] md:text-[64px]">
          Thirty minutes, free, no sales pitch.
        </h1>
        <p className="m-0 max-w-[62ch] text-base leading-[1.5] md:text-lg">
          You describe the problem. I tell you whether software fixes it, roughly what it would
          take, and whether I&rsquo;m the right person for it. Sometimes the answer is no —
          that&rsquo;s still a useful half hour.
        </p>
      </section>

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-[340px_1fr]">
        <aside className="border-b-2 border-[var(--color-divider)] md:border-r-2 md:border-b-0">
          <UrMark size="sm" className="h-50 border-b-2 border-[var(--color-divider)] p-7">
            <p className="m-0 text-[13px] tracking-[0.16em] uppercase">30 minutes · free</p>
          </UrMark>
          <div className="px-5 py-7 md:px-8">
            <h2 className="m-0 mb-1.5 text-[22px]">
              {site.owner} · {site.name}
            </h2>
            <p className="text-muted m-0 mb-5 text-sm">Intro call · 30 min · Video or phone</p>
            <div className="flex flex-col gap-3 text-[15px] leading-[1.5]">
              {promises.map((p) => (
                <p key={p} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-h-[640px] px-2 py-6 md:px-8 md:py-9">
          <CalEmbed calLink={env.NEXT_PUBLIC_CAL_LINK} />
        </div>
      </div>

      <section className="flex flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:gap-5 md:px-16 md:py-9">
        <span className="text-muted text-[11px] tracking-[0.16em] uppercase">
          Rather write first?
        </span>
        <a
          href={`mailto:${site.email}`}
          className="font-heading text-ink inline-flex w-fit cursor-pointer items-center border border-[var(--color-divider)] px-4.5 py-3 text-sm font-extrabold no-underline hover:bg-[color-mix(in_srgb,var(--color-text)_7%,transparent)]"
        >
          Email me instead
        </a>
        <span className="text-muted text-sm">
          {site.email} — I reply within {site.replyWindow}.
        </span>
      </section>
    </>
  );
}
