import type { Metadata } from "next";

import { Band, Button, Kicker, PosterCta } from "@/components/primitives";
import { AssistantDemo } from "@/components/sections/assistant-demo";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "AI assistants",
  description:
    "An assistant that knows your business, not the internet. It reads your price list, your policies and your past replies, and answers the way you would.",
};

const uses = [
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

const priceSteps = [
  { n: "Step 01", title: "A call", body: "Free, thirty minutes, this week if you like." },
  { n: "Step 02", title: "A written scope", body: "Three days later, in plain English." },
  { n: "Step 03", title: "One fixed price", body: "Yes or no. No pressure either way." },
];

export default function AiAssistantsPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>What I do — AI assistants</Kicker>
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
        <div className="border-b-2 border-[var(--color-divider)] px-5 py-8 md:border-r-2 md:border-b-0 md:py-11 md:pr-12 md:pl-16">
          <Kicker tone="muted">Try it — this one is trained on my own site</Kicker>
          <AssistantDemo />
        </div>
        <div className="px-5 py-8 md:py-11 md:pr-16 md:pl-11">
          <Kicker tone="muted">What people use it for</Kicker>
          <div className="flex flex-col">
            {uses.map((u, i) => (
              <div
                key={u.title}
                className={`border-t-2 border-[var(--color-divider)] py-4 ${
                  i === uses.length - 1 ? "border-b-2" : ""
                }`}
              >
                <h4 className="m-0 mb-1 text-[17px] md:text-[19px]">{u.title}</h4>
                <p className="text-muted m-0 text-sm">{u.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-brand-100 grid gap-6 border-b-2 border-[var(--color-divider)] px-5 py-8 md:grid-cols-[340px_1fr] md:gap-10 md:px-16 md:py-12">
        <h2 className="m-0 max-w-[12ch] text-[28px] md:text-[36px]">What it won&rsquo;t do</h2>
        <div className="flex flex-col gap-3.5">
          {limits.map((l) => (
            <p key={l} className="m-0 text-base leading-[1.55] md:text-[17px]">
              {l}
            </p>
          ))}
        </div>
      </div>

      <Band>
        <Kicker tone="muted">Getting a price</Kicker>
        <div className="grid gap-6 md:grid-cols-3 md:gap-0">
          {priceSteps.map((s, i) => (
            <div
              key={s.n}
              className={
                i === 0
                  ? "md:pr-10"
                  : "border-t-2 border-[var(--color-divider)] pt-5 md:border-t-0 md:border-l-2 md:pt-0 md:pr-10 md:pl-10"
              }
            >
              <p className="text-brand m-0 mb-2.5 text-[11px] tracking-[0.16em]">{s.n}</p>
              <h3 className="m-0 mb-2 text-[22px] md:text-[26px]">{s.title}</h3>
              <p className="text-muted m-0 text-[15px]">{s.body}</p>
            </div>
          ))}
        </div>
      </Band>

      <PosterCta headline="Curious what yours would cost?" label={cta.long} href={cta.href} />
    </>
  );
}
