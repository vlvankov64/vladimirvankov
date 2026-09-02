"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavNode } from "@/lib/nav";

/**
 * The phone menu. Client component because it holds open/closed state.
 *
 * Labels are passed in rather than read from a dictionary here, so this component knows
 * nothing about locales.
 */
export function MobileNav({
  items,
  labels,
}: {
  items: NavNode[];
  labels: { open: string; close: string; nav: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="relative z-50 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
      >
        <span className="sr-only">{open ? labels.close : labels.open}</span>
        <span
          aria-hidden
          className={`h-px w-6 bg-current transition-transform duration-300 ease-gentle ${
            open ? "translate-y-[3px] rotate-45" : ""
          }`}
        />
        <span
          aria-hidden
          className={`h-px w-6 bg-current transition-transform duration-300 ease-gentle ${
            open ? "-translate-y-[3px] -rotate-45" : ""
          }`}
        />
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8"
      >
        <nav aria-label={labels.nav}>
          <ul className="flex flex-col gap-6">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  // Closed here rather than in an effect on `pathname`: the panel would
                  // otherwise cover the page it just navigated to for a frame, and
                  // setState-in-effect is a cascading render.
                  onClick={() => setOpen(false)}
                  className={`font-display text-3xl transition-colors ${
                    pathname === item.href ? "text-accent" : "text-ink hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
