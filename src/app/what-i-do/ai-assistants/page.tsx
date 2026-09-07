import type { Metadata } from "next";

import { Band, Button, Kicker, PosterCta } from "@/components/primitives";
import { AssistantDemo } from "@/components/sections/assistant-demo";
import { GettingAPrice } from "@/components/sections/getting-a-price";
import { ServiceLimits } from "@/components/sections/service-limits";
import { ServiceUses, type ServiceUse } from "@/components/sections/service-uses";
import { unitedReasonAssistant } from "@/content/demos";
import { cta } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata("/what-i-do/ai-assistants"),
  title: "AI assistants",
  description:
    "An assistant that knows your business, not the internet. It reads your price list, your policies and your past replies, and answers the way you would.",
};

const uses: readonly ServiceUse[] = [
  {
    title: "Answering customers around the clock",
    body: "Out of hours is where most enquiries are lost.",
  },
  {
    title: "Taking enquiries and bookings",
    body: "Straight into your calendar, with the details you need.",
  },
  {
    title: "Looking things up for staff",
    body: '"What\'s our warranty on that?" Answered in seconds.',
  },
  {
    title: "Drafting the replies you send daily",
    body: "You still press send. It just writes the first version.",
  },
];

const limits = [
  "It won't replace anyone. It handles the repeat questions so your people get the interesting ones.",
  "It won't invent answers. If your material doesn't cover it, it hands over rather than guessing.",
  "It won't work well on a business with no written-down knowledge. Part of the job is helping you write it down.",
];

export default function AiAssistantsPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>What I do · AI assistants</Kicker>
        <h1 className="m-0 mb-5.5 max-w-[18ch] text-[38px] leading-none tracking-[-0.03em] md:text-[62px]">
          An assistant that knows your business, not the internet.
        </h1>
        <p className="m-0 mb-7 max-w-[56ch] text-base leading-[1.5] md:text-lg">
          It reads your price list, your policies and your past replies, and answers the way you
          would. When it doesn&rsquo;t know, it says so and passes it to you.
        </p>
        <Button href={cta.href} size="lg">
          Book a free call
        </Button>
      </Band>

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-[1fr_420px]">
        <div className="rule-draw-y-end border-b-2 border-[var(--color-divider)] px-5 py-8 md:border-b-0 md:py-11 md:pr-12 md:pl-16">
          <Kicker as="h2" tone="muted">
            Try it: this one is trained on my own site
          </Kicker>
          <AssistantDemo script={unitedReasonAssistant} />
        </div>
        <div className="px-5 py-8 md:py-11 md:pr-16 md:pl-11">
          <ServiceUses uses={uses} />
        </div>
      </div>

      <ServiceLimits limits={limits} />

      <GettingAPrice />

      <PosterCta headline="Curious what yours would cost?" label={cta.long} href={cta.href} />
    </>
  );
}
