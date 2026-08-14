/**
 * Single source of truth for identity and navigation.
 * Change the name, email or nav here — nothing is hardcoded in components.
 */

export const site = {
  name: "UnitedReason",
  wordmark: "UNITEDREASON",
  owner: "Mark",
  tagline: "software for small business",
  email: "hello@unitedreason.org",
  url: "https://unitedreason.org",
  callLength: "30 minutes",
  replyWindow: "one business day",
} as const;

export const nav = [
  { href: "/what-i-do", label: "What I do" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/examples", label: "Examples" },
  { href: "/notes", label: "Notes" },
] as const;

export const cta = {
  href: "/book",
  short: "Book a free call",
  long: "Book a free 30-minute call",
} as const;
