import type { Metadata } from "next";

import { Band, Button, Kicker, Tag } from "@/components/primitives";
import { services, type Service } from "@/content/services";
import { cta } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  ...pageMetadata("/what-i-do"),
  title: "What I do",
  description:
    "Three kinds of work: automating the busywork, AI assistants, and websites & small apps. Everything is quoted after a call.",
};

/** One service. Links at its own page where it has one, at the call where it doesn't. */
function ServiceRow({ service, tinted }: { service: Service; tinted: boolean }) {
  const href = service.detail ?? cta.href;
  const label = service.detail ? "See how this works →" : "Talk to me about this →";

  return (
    <div
      className={cn(
        "grid gap-4 border-b-2 border-[var(--color-divider)] px-5 py-8 md:grid-cols-[360px_1fr] md:gap-0 md:px-16 md:py-11",
        tinted && "bg-brand-100",
      )}
    >
      <div>
        <h2 className="m-0 mb-2.5 max-w-[12ch] text-[28px] md:text-[36px]">{service.title}</h2>
        <p className="text-muted m-0 text-sm">{service.timeline}</p>
      </div>
      <div>
        <p className="m-0 mb-5 max-w-[62ch] text-base leading-[1.55] md:text-[17px]">
          {service.blurb}
        </p>
        <div className="mb-4.5 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <Button href={href} variant="ghost" className="px-1 text-[15px]">
          {label}
        </Button>
      </div>
    </div>
  );
}

export default function WhatIDoPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>What I do</Kicker>
        <h1 className="m-0 mb-5 text-[40px] leading-none tracking-[-0.03em] md:text-[64px]">
          Three kinds of work.
        </h1>
        <p className="m-0 max-w-[58ch] text-base md:text-lg">
          Everything is quoted after a call. There are no packages and no hourly rate, and the
          number you get is the number you pay.
        </p>
      </Band>

      {services.map((service, i) => (
        <ServiceRow key={service.slug} service={service} tinted={i === 1} />
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
