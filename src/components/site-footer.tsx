import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-2 px-5 py-6 text-[13px] md:flex-row md:justify-between md:px-16 md:py-7">
      <span className="text-muted">
        {site.name} — {site.tagline}
      </span>
      <a href={`mailto:${site.email}`} className="text-muted no-underline hover:text-brand">
        {site.email}
      </a>
    </footer>
  );
}
