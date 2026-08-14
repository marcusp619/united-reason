import type { Metadata } from "next";

import { Band, Button, Kicker, Tag } from "@/components/primitives";
import { services } from "@/content/services";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "What I do",
  description:
    "Three kinds of work: automating the busywork, AI assistants, and websites & small apps. Everything is quoted after a call.",
};

export default function WhatIDoPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>What I do</Kicker>
        <h1 className="m-0 mb-5 text-[40px] leading-none tracking-[-0.03em] md:text-[64px]">
          Three kinds of work.
        </h1>
        <p className="m-0 max-w-[58ch] text-base md:text-lg">
          Everything is quoted after a call. No packages, no hourly guessing, no &ldquo;from
          $X&rdquo; that turns into three times $X.
        </p>
      </Band>

      {services.map((s, i) => (
        <div
          key={s.slug}
          className={`grid gap-4 border-b-2 border-[var(--color-divider)] px-5 py-8 md:grid-cols-[360px_1fr] md:gap-0 md:px-16 md:py-11 ${
            i === 1 ? "bg-brand-100" : ""
          }`}
        >
          <div>
            <h2 className="m-0 mb-2.5 max-w-[12ch] text-[28px] md:text-[36px]">{s.title}</h2>
            <p className="text-muted m-0 text-sm">{s.timeline}</p>
          </div>
          <div>
            <p className="m-0 mb-5 max-w-[62ch] text-base leading-[1.55] md:text-[17px]">
              {s.blurb}
            </p>
            <div className="mb-4.5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
            <Button href="/what-i-do/ai-assistants" variant="ghost" className="px-1 text-[15px]">
              See how this works →
            </Button>
          </div>
        </div>
      ))}

      <Band
        rule={false}
        className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center md:gap-10"
      >
        <h2 className="m-0 max-w-[20ch] text-[26px] md:text-[34px]">
          Not sure which one you need? That&rsquo;s what the call is for.
        </h2>
        <Button href={cta.href} size="lg" className="shrink-0">
          {cta.long}
        </Button>
      </Band>
    </>
  );
}
