"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

/**
 * Cal.com inline embed, themed to Modernist.
 *
 * The mockup drew its own day/time grid; this is the real thing wearing that
 * design — real availability, real invites, no scheduling backend to own.
 * Token values are passed through Cal's `cssVarsPerTheme` so the widget reads
 * from the same palette as the rest of the site.
 */
export function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#ec3013",
            "cal-bg": "#f3f2f2",
            "cal-bg-emphasis": "#eae9e9",
            "cal-text": "#201e1d",
            "cal-border": "#201e1d66",
            "cal-border-emphasis": "#201e1d",
            "cal-border-radius": "0px",
          },
          dark: {},
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
    />
  );
}
