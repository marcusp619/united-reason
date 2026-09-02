import { Band, Button, Kicker } from "@/components/primitives";
import { cta, nav } from "@/content/site";

/**
 * A 404 inside the layout, so a wrong URL still has the header, the footer and
 * a way onward. The stock Next.js page has none of those.
 */
export default function NotFound() {
  return (
    <Band reveal={false} rule={false}>
      <Kicker>404</Kicker>
      <h1 className="m-0 mb-5 max-w-[16ch] text-[40px] leading-none tracking-[-0.03em] md:text-[64px]">
        That page isn&rsquo;t here.
      </h1>
      <p className="m-0 mb-8 max-w-[52ch] text-base md:text-lg">
        Either it moved or the link was wrong. Nothing you did. Here&rsquo;s everything that does
        exist:
      </p>

      <div className="mb-9 grid max-w-[720px] border-t-2 border-[var(--color-divider)] sm:grid-cols-2">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="font-heading text-ink hover:text-brand border-b-2 border-[var(--color-divider)] px-1 py-3.5 text-[19px] font-extrabold no-underline transition-colors md:text-[22px]"
          >
            {item.label}
          </a>
        ))}
      </div>

      <Button href={cta.href} size="lg">
        {cta.long}
      </Button>
    </Band>
  );
}
