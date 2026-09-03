import { site } from "@/content/site";

/**
 * The way in when there is no delivery configured, or when delivery failed.
 *
 * Composing a message the visitor sends themselves is worse than receiving it,
 * but it is the only honest fallback: nothing claims to have been received
 * that hasn't been.
 */
export function handOffToMailClient(subject: string, body: string): void {
  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.assign(`mailto:${site.email}?${query}`);
}
