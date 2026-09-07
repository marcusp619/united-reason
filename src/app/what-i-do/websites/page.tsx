import type { Metadata } from "next";

import { Band, Button, Kicker, PosterCta, Tag } from "@/components/primitives";
import { GettingAPrice } from "@/components/sections/getting-a-price";
import { ServiceLimits } from "@/components/sections/service-limits";
import { ServiceUses, type ServiceUse } from "@/components/sections/service-uses";
import { cta } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  ...pageMetadata("/what-i-do/websites"),
  title: "Websites & small apps",
  description:
    "A site that reads like you talk and loads on a phone in a car park. Or the small internal tool that finally replaces the spreadsheet nobody wants to touch.",
};

const uses: readonly ServiceUse[] = [
  {
    title: "A site that sounds like you",
    body: "Not like the template it came from, and not like an agency.",
  },
  {
    title: "Taking bookings and enquiries",
    body: "Straight into your calendar, with the details you actually need.",
  },
  {
    title: "The internal tool nobody dreads",
    body: "The job the spreadsheet was doing, done properly.",
  },
  {
    title: "A rebuild that keeps your rankings",
    body: "Ten years of pages moved across without losing the traffic.",
  },
];

/**
 * The landscape from "What a website should cost in 2026", stated on the page
 * rather than left in a note. Naming the option that isn't me is the point:
 * for a five-page brochure site, the builder genuinely is the right answer.
 */
const landscape = [
  {
    who: "Build it yourself",
    price: "$200–600 a year",
    body: "Squarespace, Wix, Webflow. For five pages, a contact form and a map, this is the right answer and I'll say so on the call.",
    mine: false,
  },
  {
    who: "A marketplace freelancer",
    price: "$1,500–8,000",
    body: "Custom work, wide quality range. The risk isn't skill so much as continuity. When something breaks in eight months, will they answer?",
    mine: false,
  },
  {
    who: "An independent developer",
    price: "$4,000–12,000",
    body: "Where I sit. One person who scopes it, builds it, hands it over and is still reachable afterwards. You're paying for judgement about what not to build.",
    mine: true,
  },
  {
    who: "An agency",
    price: "$6,000–35,000+",
    body: "Strategy, design, project management, several specialists. Genuinely worth it at a certain size, though usually not at yours.",
    mine: false,
  },
];

const limits = [
  "It won't be worth it for a brochure. If your business is five pages of information and a phone number, use a builder. You'll be online this week for the price of a coffee a month.",
  "It won't come with a retainer. Most people need me about twice a year and pay for those hours when they use them. If someone quotes you a monthly fee, ask what happens in a month where nothing breaks.",
  "It won't write your copy or take your photographs. If those exist, we start. If they don't, someone has to make them, and that someone charges.",
];

export default function WebsitesPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>What I do · websites &amp; small apps</Kicker>
        <h1 className="m-0 mb-5.5 max-w-[18ch] text-[38px] leading-none tracking-[-0.03em] md:text-[62px]">
          A site that loads on a phone in a car park.
        </h1>
        <p className="m-0 mb-7 max-w-[56ch] text-base leading-[1.5] md:text-lg">
          Or the small internal tool that finally replaces the spreadsheet everybody&rsquo;s afraid
          to touch. Custom starts making sense when the site stops being a brochure and starts being
          something your business runs on.
        </p>
        <Button href={cta.href} size="lg">
          Book a free call
        </Button>
      </Band>

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-[1fr_420px]">
        <div className="rule-draw-y-end border-b-2 border-[var(--color-divider)] px-5 py-8 md:border-b-0 md:py-11 md:pr-12 md:pl-16">
          <Kicker as="h2" tone="muted">
            The four ways to get a website
          </Kicker>
          <div className="flex flex-col">
            {landscape.map((option) => (
              <div
                key={option.who}
                className="border-t-2 border-[var(--color-divider)] py-4 last:border-b-2"
              >
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="m-0 flex flex-wrap items-baseline gap-2.5 text-[19px] md:text-[22px]">
                    {option.who}
                    {option.mine && <Tag variant="accent">Where I sit</Tag>}
                  </h3>
                  <p
                    className={cn("m-0 text-[15px]", option.mine ? "text-brand-700" : "text-muted")}
                  >
                    {option.price}
                  </p>
                </div>
                <p className="m-0 max-w-[52ch] text-[15px] leading-[1.55]">{option.body}</p>
              </div>
            ))}
          </div>
          <p className="text-muted m-0 mt-4 max-w-[56ch] text-[13px] leading-[1.5]">
            Published 2026 guides put the typical professional build between $3,000 and $15,000,
            which lines up with what I see.
          </p>
        </div>
        <div className="px-5 py-8 md:py-11 md:pr-16 md:pl-11">
          <ServiceUses uses={uses} />
        </div>
      </div>

      <ServiceLimits limits={limits} />

      <Band>
        <Kicker as="h2" tone="muted">
          What actually moves the number
        </Kicker>
        <p className="m-0 mb-5 max-w-[62ch] text-base leading-[1.55] md:text-[17px]">
          Page count barely matters. Integrations do, because now two systems have to agree forever.
          So do payments, which bring tax, refunds and failure states and roughly double a simple
          build. So does migration, which is real work that&rsquo;s invisible in the finished
          product. So does the number of people who have to approve things, which nobody quotes for
          and everybody pays.
        </p>
        <Button
          href="/notes/what-a-website-should-cost"
          variant="ghost"
          className="px-1 text-[15px]"
        >
          The whole landscape, with numbers →
        </Button>
      </Band>

      <GettingAPrice />

      <PosterCta headline="Tell me what it needs to do." label={cta.long} href={cta.href} />
    </>
  );
}
