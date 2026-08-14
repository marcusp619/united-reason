import type { Metadata } from "next";

import { Band, Kicker } from "@/components/primitives";
import { site } from "@/content/site";

export const metadata: Metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy",
  description:
    "What this site collects, what it doesn't, and what happens to anything you send. Plain English, no boilerplate.",
};

const UPDATED = "14 August 2026";

/**
 * Written to describe what the site actually does, which in two places is less
 * than a template policy would claim: the forms compose an email in your own
 * mail client rather than posting anywhere, and the site sets no cookies of
 * its own. Both are worth stating plainly rather than hedging.
 */
export default function PrivacyPage() {
  return (
    <>
      <Band reveal={false}>
        <Kicker>Privacy</Kicker>
        <h1 className="m-0 mb-5 max-w-[20ch] text-[38px] leading-none tracking-[-0.03em] md:text-[58px]">
          What this site collects, and what it doesn&rsquo;t.
        </h1>
        <p className="text-muted m-0 text-sm">Last updated {UPDATED}</p>
      </Band>

      <Band rule={false}>
        <div className="prose">
          <p>
            This site is run by {site.legalName}. It is a small business website, and it collects
            about as little as a website can while still being useful. Here is all of it.
          </p>

          <h2>Visitor numbers</h2>
          <p>
            I use Vercel Analytics to count page views and see which pages people read. It is
            cookieless and aggregate: it does not set a cookie, does not follow you between sites,
            and does not tell me who you are. I also use Vercel Speed Insights, which measures how
            fast pages load.
          </p>
          <p>
            This is why there is no cookie banner on this site. There is nothing to consent to,
            because this site sets no cookies of its own.
          </p>

          <h2>Server logs</h2>
          <p>
            The site is hosted on Vercel, which keeps standard server logs including IP addresses,
            for security and diagnostics. That is Vercel&rsquo;s infrastructure rather than
            something I built, and it is covered by their privacy policy.
          </p>

          <h2>The forms</h2>
          <p>
            This is the part most privacy policies get wrong about a site like this, so to be exact:
            the enquiry form and the newsletter form do not send anything to a server. When you
            submit either one, it opens your own email app with the message written out. Nothing
            reaches me until you press send.
          </p>
          <p>
            When you do send it, I have your email and whatever you wrote, in my inbox, the same as
            any other email. I use it to reply to you and to quote your work. I do not add you to
            anything you did not ask for, and I do not sell, rent or share it.
          </p>

          <h2>Booking a call</h2>
          <p>
            The booking calendar is a Cal.com embed. If you book, Cal.com handles that: your name,
            your email, your timezone and whatever you write in the booking form go to them and to
            me. Cal.com is a separate company with its own privacy policy and its own cookies, and
            those apply once you interact with the calendar.
          </p>
          <p>If you would rather not use it, email me instead. It reaches the same place.</p>

          <h2>What I keep, and for how long</h2>
          <p>
            Enquiries and bookings stay in my email and calendar. If we work together, I keep the
            correspondence for as long as I have business records to keep. If we do not, there is no
            system quietly holding your details for a follow-up campaign in eight months, because
            there is no campaign.
          </p>

          <h2>Fonts and third parties</h2>
          <p>
            The typeface is served from this site rather than from Google Fonts, so loading a page
            here does not tell Google you visited. Apart from Vercel, and Cal.com on the booking
            page, nothing third party runs on this site. No advertising, no tracking pixels, no
            social widgets.
          </p>

          <h2>What you can ask for</h2>
          <p>
            Email <a href={`mailto:${site.email}`}>{site.email}</a> and ask me to delete what I have
            about you, or to tell you what that is. I will do it, and you do not need to give a
            reason or cite a regulation.
          </p>

          <h2>Changes</h2>
          <p>
            If this changes, the date at the top changes. If it changes in a way that matters to
            anyone who has already contacted me, I will say so rather than quietly editing it.
          </p>

          <p>
            Questions about any of this go to <a href={`mailto:${site.email}`}>{site.email}</a>, and
            a person reads them.
          </p>
        </div>
      </Band>
    </>
  );
}
