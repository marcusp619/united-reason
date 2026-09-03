import { env } from "@/env";
import { site } from "@/content/site";

/**
 * Delivery through Resend's REST API.
 *
 * Called over HTTP rather than through the SDK: this sends two kinds of plain
 * text message and needs none of what the package adds, and a dependency you
 * can replace with fifteen lines is a dependency you maintain for nothing.
 *
 * Nothing here throws. A form that explodes on a failed fetch tells the
 * visitor less than one that quietly offers them their mail client instead,
 * so every outcome is a value the caller can act on.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
/** Long enough for a cold API, short enough that nobody watches a spinner. */
const GIVE_UP_AFTER_MS = 8000;

export type Delivery =
  /** It arrived. The only outcome that lets a form say "got it". */
  | { status: "sent" }
  /** No key set. Not an error — the site simply isn't receiving mail yet. */
  | { status: "notConfigured" }
  /** It tried and didn't land. The visitor is offered their mail client. */
  | { status: "failed" };

export type Message = {
  subject: string;
  body: string;
  /** So a reply goes to the person who wrote in, not to the site's own address. */
  replyTo?: string;
};

export async function deliver(message: Message): Promise<Delivery> {
  if (!env.RESEND_API_KEY) return { status: "notConfigured" };

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: `${site.name} <${site.email}>`,
        to: [site.email],
        subject: message.subject,
        text: message.body,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(GIVE_UP_AFTER_MS),
    });

    if (!response.ok) {
      console.error(`Resend refused the message: ${response.status} ${await response.text()}`);
      return { status: "failed" };
    }

    return { status: "sent" };
  } catch (error) {
    console.error("Could not reach Resend", error);
    return { status: "failed" };
  }
}
