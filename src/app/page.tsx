import { Band, Button, Kicker, PosterCta, Tag } from "@/components/primitives";
import { cta, site } from "@/content/site";

/**
 * Homepage — variant C from the mockups ("the offer as a promise").
 * No proof required: the fold is what happens after you book, made concrete.
 */

const capabilities = [
  "Automations",
  "AI assistants",
  "Websites",
  "Small internal apps",
  "Integrations",
];

const stats = [
  { n: "10", label: "Years building" },
  { n: "01", label: "Person on your job" },
  { n: "00", label: "Surprise invoices" },
];

export default function HomePage() {
  return (
    <>
      <Band className="md:pt-18">
        <Kicker>Software consultancy for small business</Kicker>
        <h1 className="m-0 mb-7 max-w-[15ch] text-[42px] leading-[0.98] tracking-[-0.035em] md:text-[76px]">
          Bring the idea. Leave with a plan and a price.
        </h1>
        <div className="flex flex-wrap items-center gap-3.5">
          <Button href={cta.href} size="lg">
            {cta.long}
          </Button>
          <span className="text-muted text-[15px]">Thirty minutes. Free. Nothing to prepare.</span>
        </div>
      </Band>

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-2">
        <div className="border-b-2 border-[var(--color-divider)] px-5 py-8 md:border-r-2 md:border-b-0 md:px-12 md:py-12 md:pl-16">
          <Kicker>On the call</Kicker>
          <h2 className="m-0 mb-3.5 max-w-[18ch] text-[26px] md:text-[32px]">
            You talk, I ask awkward questions.
          </h2>
          <p className="m-0 mb-4.5 max-w-[44ch] text-base leading-[1.55]">
            You describe what&rsquo;s slow, expensive or embarrassing. I work out whether software
            actually fixes it — and tell you if it doesn&rsquo;t.
          </p>
          <p className="text-muted m-0 text-sm">30 minutes · free · no follow-up sequence</p>
        </div>
        <div className="px-5 py-8 md:px-12 md:py-12 md:pr-16">
          <Kicker>Three days later</Kicker>
          <h2 className="m-0 mb-3.5 max-w-[18ch] text-[26px] md:text-[32px]">
            A written scope and one fixed price.
          </h2>
          <p className="m-0 mb-4.5 max-w-[44ch] text-base leading-[1.55]">
            What I&rsquo;d build, what it does, when it&rsquo;s done and what it costs. One number,
            not a rate card. Yes or no, no hard feelings either way.
          </p>
          <p className="text-muted m-0 text-sm">Fixed price · you own everything I write</p>
        </div>
      </div>

      <Band className="flex flex-col gap-6 md:flex-row md:gap-14">
        <h2 className="m-0 max-w-[12ch] shrink-0 text-[30px] md:text-[38px]">
          If it isn&rsquo;t worth building, I&rsquo;ll say so.
        </h2>
        <p className="m-0 text-[17px] leading-[1.55] md:text-lg">
          Half the businesses I speak to don&rsquo;t need custom software — they need a setting
          changed in a tool they already pay for. I&rsquo;d rather tell you that in the first half
          hour than take the work. It costs me a project and earns me the next three.
        </p>
      </Band>

      <Band className="md:py-11">
        <Kicker tone="muted">What I build</Kicker>
        <div className="flex flex-wrap gap-2.5">
          {capabilities.map((c) => (
            <Tag key={c} variant="outline" className="px-4 py-2 text-sm">
              {c}
            </Tag>
          ))}
        </div>
      </Band>

      <div className="grid border-b-2 border-[var(--color-divider)] md:grid-cols-[340px_1fr]">
        <div className="grid grid-cols-3 border-b-2 border-[var(--color-divider)] md:grid-cols-1 md:grid-rows-3 md:border-r-2 md:border-b-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-6 md:px-7 ${
                i < stats.length - 1
                  ? "border-r-2 border-[var(--color-divider)] md:border-r-0 md:border-b-2"
                  : ""
              }`}
            >
              <p className="font-heading text-brand m-0 text-[32px] leading-none font-extrabold md:text-[46px]">
                {s.n}
              </p>
              <p className="text-muted mt-1.5 mb-0 text-[11px] tracking-[0.16em] uppercase md:text-xs">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <div className="px-5 py-8 md:px-14 md:py-13">
          <Kicker tone="muted">Who I am</Kicker>
          <h2 className="m-0 mb-3.5 max-w-[22ch] text-[26px] md:text-[32px]">
            I&rsquo;m {site.owner}. I&rsquo;ve spent ten years building software, mostly for people
            who never wanted to think about it.
          </h2>
          <p className="m-0 max-w-[60ch] text-base leading-[1.55]">
            {site.name} is deliberately one person: small enough to care about a job worth a few
            thousand, experienced enough to build it properly.
          </p>
        </div>
      </div>

      <PosterCta
        headline="The call is free and the quote is fixed."
        label={cta.long}
        href={cta.href}
      />
    </>
  );
}
