import { CountUp } from "@/components/count-up";
import { Band, Kicker } from "@/components/primitives";

/**
 * One process, timed both ways. The showcase says what a job costs a week;
 * this says what one go costs, which is the number an owner can check against
 * their own morning.
 */
export function BeforeAfter() {
  return (
    <Band>
      <Kicker as="h2" tone="muted">
        Before / after: a quoting process
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
          <p className="text-muted m-0 text-[15px]">Around 25 minutes each, two days to send.</p>
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
  );
}
