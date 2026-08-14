import type { Metadata } from "next";
import { Clock } from "lucide-react";

import { Band, Button, Kicker } from "@/components/primitives";
import { faqs, steps } from "@/content/services";
import { cta } from "@/content/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Four steps, no surprises: a free call, a written plan with one fixed price, weekly demos while I build, then handover and training.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>How it works</Kicker>
        <h1 className="m-0 text-[40px] leading-none tracking-[-0.03em] md:text-[66px]">
          Four steps, no surprises.
        </h1>
      </Band>

      <div className="border-b-2 border-[var(--color-divider)]">
        {steps.map((step, i) => (
          <div
            key={step.n}
            className={`grid items-start gap-4 px-5 py-7 md:grid-cols-[90px_1fr_200px] md:gap-8 md:px-16 md:py-8 ${
              i > 0 ? "border-t-2 border-[var(--color-divider)]" : ""
            }`}
          >
            <span className="font-heading text-brand text-[28px] font-extrabold md:text-[34px]">
              {step.n}
            </span>
            <div>
              <h3 className="m-0 mb-2 text-[22px] md:text-[28px]">{step.title}</h3>
              <p className="m-0 max-w-[64ch] text-base leading-[1.55]">{step.body}</p>
            </div>
            <span className="text-muted text-sm md:text-right">{step.when}</span>
          </div>
        ))}
      </div>

      <Band>
        <h2 className="m-0 mb-7 text-[28px] md:text-[36px]">The questions everyone asks me</h2>
        <dl className="grid gap-8 md:grid-cols-2 md:gap-9 md:gap-x-14">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-heading mb-2 text-[18px] font-extrabold md:text-xl">{f.q}</dt>
              <dd className="text-muted m-0 text-[15px] leading-[1.55]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Band>

      <div className="bg-brand-100 grid md:grid-cols-[320px_1fr]">
        <div className="grid-panel text-ground flex min-h-[220px] flex-col justify-between border-b-2 border-[var(--color-divider)] p-8 md:border-r-2 md:border-b-0">
          <Clock size={34} strokeWidth={2} />
          <div>
            <p className="font-heading m-0 text-[48px] leading-[0.9] font-extrabold tracking-[-0.04em] md:text-[62px]">
              30:00
            </p>
            <p className="mt-2.5 mb-0 text-[13px] tracking-[0.16em] uppercase">
              One call · no cost
            </p>
          </div>
        </div>
        <div className="px-5 py-8 md:px-14 md:py-12">
          <h2 className="m-0 mb-3.5 max-w-[22ch] text-[26px] md:text-[34px]">
            Still the fastest way to find out: half an hour, no cost.
          </h2>
          <p className="m-0 mb-6 max-w-[56ch] text-base leading-[1.55]">
            Bring the messy version of the problem. Sorting it out is my job, not your homework.
          </p>
          <Button href={cta.href} size="lg">
            {cta.long}
          </Button>
        </div>
      </div>
    </>
  );
}
