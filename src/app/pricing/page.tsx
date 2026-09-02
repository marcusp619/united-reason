import type { Metadata } from "next";

import { Band, Button, Kicker, PosterCta } from "@/components/primitives";
import { GettingAPrice } from "@/components/sections/getting-a-price";
import { priceBands, priceTerms } from "@/content/pricing";
import { cta, site } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = {
  ...pageMetadata("/pricing"),
  title: "Pricing",
  description:
    "Automating one workflow starts around $2,500. Websites start at $4,000 and most land between $4,000 and $12,000. One fixed number in writing before you commit.",
};

export default function PricingPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>Pricing</Kicker>
        <h1 className="m-0 mb-5 max-w-[16ch] text-[40px] leading-none tracking-[-0.03em] md:text-[64px]">
          Real numbers, before you ask for them.
        </h1>
        <p className="m-0 max-w-[58ch] text-base md:text-lg">
          Every project is quoted properly after a call, because the honest price depends on what
          the thing has to do. But you should be able to tell whether we&rsquo;re in the same
          ballpark without booking anything, so here is where it starts.
        </p>
      </Band>

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-3">
        {priceBands.map((band, i) => (
          <div
            key={band.what}
            className={`px-5 py-8 md:px-10 md:py-11 ${
              i > 0
                ? "rule-draw-y-start border-t-2 border-[var(--color-divider)] md:border-t-0 md:border-l-2"
                : ""
            }`}
          >
            <h2 className="m-0 mb-2 max-w-[14ch] text-[24px] tracking-[-0.025em] md:text-[28px]">
              {band.what}
            </h2>
            <p className="text-brand-700 m-0 mb-4 text-[22px] tracking-[-0.02em] md:text-[26px]">
              {band.from}
            </p>
            <p className="m-0 mb-5 text-[15px] leading-[1.55]">{band.body}</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {band.includes.map((line) => (
                <li
                  key={line}
                  className="text-muted border-t-2 border-[var(--color-divider)] pt-2.5 text-[14px] leading-[1.5]"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-brand-100 grid gap-6 border-b-2 border-[var(--color-divider)] px-5 py-8 md:grid-cols-[340px_1fr] md:gap-10 md:px-16 md:py-12">
        <h2 className="m-0 max-w-[14ch] text-[28px] md:text-[36px]">What the one number means</h2>
        <div data-stagger className="grid gap-6 md:grid-cols-2 md:gap-x-12">
          {priceTerms.map((term) => (
            <div key={term.title}>
              <h3 className="m-0 mb-1.5 text-[18px] md:text-[20px]">{term.title}</h3>
              <p className="m-0 max-w-[44ch] text-[15px] leading-[1.55]">{term.body}</p>
            </div>
          ))}
        </div>
      </div>

      <Band>
        <Kicker as="h2" tone="muted">
          When the answer is no
        </Kicker>
        <p className="m-0 mb-5 max-w-[62ch] text-base leading-[1.55] md:text-[17px]">
          Sometimes the arithmetic says don&rsquo;t. A job that happens twice a year won&rsquo;t
          repay a build, and a business that needs five pages and a phone number needs an afternoon
          with a template, not me. I&rsquo;d rather tell you that in a free half hour than take four
          thousand dollars for something a builder does.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <Button href="/notes/three-hours-a-week" variant="ghost" className="px-1 text-[15px]">
            Work out whether it&rsquo;s worth it →
          </Button>
          <Button
            href="/notes/what-a-website-should-cost"
            variant="ghost"
            className="px-1 text-[15px]"
          >
            What a website should cost →
          </Button>
        </div>
      </Band>

      <section className="bg-ink text-ground flex flex-col items-start justify-between gap-8 px-5 py-9 md:flex-row md:items-end md:gap-12 md:px-16 md:py-14">
        <div>
          <p className="text-brand-400 m-0 mb-4.5 text-[11px] tracking-[0.16em] uppercase">
            Founding clients
          </p>
          <h2 className="m-0 mb-3.5 max-w-[20ch] text-[30px] leading-[1.05] md:text-[42px]">
            My first three projects go out at a reduced rate.
          </h2>
          <p className="m-0 max-w-[56ch] text-base leading-[1.55] text-[var(--color-neutral-300)]">
            In exchange I&rsquo;d like to write the work up as a case study, with your name on it.
            If you&rsquo;d rather stay anonymous, the rate still stands. Ask on the call &mdash; or
            email {site.email} and I&rsquo;ll tell you whether any are left.
          </p>
        </div>
        <Button href={cta.href} variant="inverse" size="lg" className="shrink-0">
          Book a free call
        </Button>
      </section>

      <GettingAPrice />

      <PosterCta headline="Let's put a number on yours." label={cta.long} href={cta.href} />
    </>
  );
}
