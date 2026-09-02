import { Band, Kicker } from "@/components/primitives";
import { priceSteps } from "@/content/services";

/**
 * The three steps between a visitor and a number. The same on every service
 * page — the answer to "what does this cost" shouldn't change depending on
 * which service you happened to land on.
 */
export function GettingAPrice() {
  return (
    <Band>
      <Kicker as="h2" tone="muted">
        Getting a price
      </Kicker>
      <div className="grid gap-6 md:grid-cols-3 md:gap-0">
        {priceSteps.map((step, i) => (
          <div
            key={step.n}
            className={
              i === 0
                ? "md:pr-10"
                : "rule-draw-y-start border-t-2 border-[var(--color-divider)] pt-5 md:border-t-0 md:pt-0 md:pr-10 md:pl-10"
            }
          >
            <p className="text-brand m-0 mb-2.5 text-[11px] tracking-[0.16em]">{step.n}</p>
            <h3 className="m-0 mb-2 text-[22px] md:text-[26px]">{step.title}</h3>
            <p className="text-muted m-0 text-[15px]">{step.body}</p>
          </div>
        ))}
      </div>
    </Band>
  );
}
