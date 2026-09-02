"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { canonicalPath, locales, localeMeta, localizePath, type Locale } from "@/lib/i18n";

/**
 * Language switcher: БГ / EN, linking to the same page in the other language.
 *
 * A client component because it is the one piece of chrome that needs the current URL —
 * it lives in the layout, and a server layout cannot read the pathname. It derives the
 * counterpart by stripping any locale prefix and re-adding the other one, so it can
 * never link to a page that does not exist.
 *
 * Each locale is its own root layout, so switching is a full document load. That is
 * correct here: the whole page, including `<html lang>`, changes.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const canonical = canonicalPath(pathname);

  return (
    <nav aria-label={label} className="flex items-center gap-2">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden className="text-ink/25">
              /
            </span>
          )}
          {locale === current ? (
            <span aria-current="true" className="caption-label text-ink">
              {localeMeta[locale].short}
            </span>
          ) : (
            <Link
              href={localizePath(canonical, locale)}
              hrefLang={localeMeta[locale].htmlLang}
              className="caption-label text-ink/45 transition-colors hover:text-accent"
            >
              <span className="sr-only">{localeMeta[locale].name}</span>
              <span aria-hidden>{localeMeta[locale].short}</span>
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
