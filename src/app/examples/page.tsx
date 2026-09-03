import type { Metadata } from "next";
import { MessageSquare, Workflow } from "lucide-react";

import { CountUp } from "@/components/count-up";
import { Band, Kicker, PosterCta } from "@/components/primitives";
import { AssistantDemo } from "@/components/sections/assistant-demo";
import { WalkthroughPlayer } from "@/components/sections/walkthrough-player";
import { invoiceRun, plumbingAssistant } from "@/content/demos";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata("/examples"),
  title: "Examples",
  description:
    "Things I've built and things I'd build for you: self-built demos, a before/after on a quoting process, and a founding-client offer.",
};

export default function ExamplesPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>Examples</Kicker>
        <h1 className="m-0 mb-5 max-w-[20ch] text-[38px] leading-none tracking-[-0.03em] md:text-[62px]">
          Things I&rsquo;ve built, and things I&rsquo;d build for you.
        </h1>
        <p className="m-0 max-w-[60ch] text-base md:text-lg">
          Straight up: this practice is new, so there&rsquo;s no logo wall here. What you get
          instead is better: working demonstrations you can run, poke at and try to break, rather
          than screenshots of somebody else&rsquo;s project.
        </p>
      </Band>

      <div data-reveal className="rule-draw grid md:grid-cols-2">
        <article className="rule-draw-y-end border-b-2 border-[var(--color-divider)] md:border-b-0">
          <div className="bg-brand-100 flex flex-col justify-center gap-5.5 border-b-2 border-[var(--color-divider)] px-5 py-8 md:px-10">
            <WalkthroughPlayer run={invoiceRun} />
            <div className="flex items-center gap-3 border-t-2 border-[var(--color-divider)] pt-4">
              <Workflow size={26} strokeWidth={2} className="text-brand" />
              <span className="text-[13px] font-bold tracking-[0.14em] uppercase">
                Every step, in order
              </span>
            </div>
          </div>
          <div className="px-5 py-7 md:px-10">
            <Kicker as="h2" className="mb-3">
              Walkthrough
            </Kicker>
            <h3 className="m-0 mb-2.5 text-[22px] md:text-[28px]">
              Invoice inbox → spreadsheet, untouched by human hands
            </h3>
            <p className="text-muted m-0 text-[15px] leading-[1.55]">
              A PDF arrives, gets read, checked and filed. The kind of thing that takes an
              afternoon, on tools most businesses are already paying for.
            </p>
          </div>
        </article>

        <article>
          <div className="flex flex-col justify-center gap-3 border-b-2 border-[var(--color-divider)] px-5 py-8 md:px-10">
            <AssistantDemo script={plumbingAssistant} />
            <div className="mt-1.5 flex items-center gap-2.5 border-t-2 border-[var(--color-divider)] pt-3.5">
              <MessageSquare size={22} strokeWidth={2} className="text-brand" />
              <span className="text-xs font-bold tracking-[0.14em] uppercase">
                Answers from your own material
              </span>
            </div>
          </div>
          <div className="px-5 py-7 md:px-10">
            <Kicker as="h2" className="mb-3">
              Demo &middot; try it
            </Kicker>
            <h3 className="m-0 mb-2.5 text-[22px] md:text-[28px]">
              An FAQ assistant answering from a price list
            </h3>
            <p className="text-muted m-0 text-[15px] leading-[1.55]">
              A stand-in firm with a stand-in price list, so nothing here is anyone&rsquo;s real
              pricing. Ask it something the list doesn&rsquo;t cover &mdash; admitting that is the
              part worth testing.
            </p>
          </div>
        </article>
      </div>

      <Band>
        <Kicker as="h2" tone="muted">
          Before / after &mdash; a quoting process
        </Kicker>
        <div className="grid border-2 border-[var(--color-divider)] md:grid-cols-2">
          <div className="rule-draw-y-end border-b-2 border-[var(--color-divider)] px-6 py-7 md:border-b-0 md:px-9">
            <h3 className="m-0 mb-2.5 text-xl">Before</h3>
            <p className="m-0 mb-4 text-[44px] leading-none tracking-[-0.04em] md:text-[56px]">
              <CountUp to={25} unit="min" />
            </p>
            <p className="m-0 mb-2.5 text-[15px] leading-[1.55]">
              Enquiry email → copied into a spreadsheet → priced by hand → typed into a template →
              sent, if someone remembers.
            </p>
            <p className="text-muted m-0 text-[15px]">
              Around 25 minutes each, two days average to send.
            </p>
          </div>
          <div className="bg-brand-100 px-6 py-7 md:px-9">
            <h3 className="m-0 mb-2.5 text-xl">After</h3>
            <p className="text-brand m-0 mb-4 text-[44px] leading-none tracking-[-0.04em] md:text-[56px]">
              <CountUp to={2} unit="min" />
            </p>
            <p className="m-0 mb-2.5 text-[15px] leading-[1.55]">
              Enquiry arrives → priced from your own rate card → draft quote waiting for approval →
              sent with one click.
            </p>
            <p className="text-brand-700 m-0 text-[15px]">Around 2 minutes each, same day.</p>
          </div>
        </div>
      </Band>

      <PosterCta
        headline="Curious what one of these costs?"
        label="See the numbers"
        href="/pricing"
      />
    </>
  );
}
