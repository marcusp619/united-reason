"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { cta, nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b-2 border-[var(--color-divider)]">
      <div className="flex items-center gap-8 px-5 py-4 md:px-16 md:py-5">
        <Link
          href="/"
          className="font-heading text-ink mr-auto text-[15px] font-extrabold tracking-[0.04em] no-underline md:text-[19px]"
        >
          {site.wordmark}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const current = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "text-sm no-underline transition-colors",
                  current ? "text-brand" : "text-ink hover:text-brand",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={cta.href}
            className="bg-brand font-heading text-ground px-[18px] py-[11px] text-sm font-extrabold no-underline transition-colors hover:bg-[var(--color-accent-600)] active:bg-[var(--color-accent-700)]"
          >
            {cta.short}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-ink cursor-pointer bg-transparent p-1 md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col border-t-2 border-[var(--color-divider)] md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-heading text-ink border-b-2 border-[var(--color-divider)] px-5 py-4 text-lg font-extrabold no-underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            onClick={() => setOpen(false)}
            className="bg-brand font-heading text-ground px-5 py-4 text-lg font-extrabold no-underline"
          >
            {cta.long}
          </Link>
        </nav>
      )}
    </header>
  );
}
