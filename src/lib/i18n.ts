/**
 * Locales, and the URL scheme that carries them.
 *
 * The default locale is **unprefixed**: Bulgarian keeps the target's own live URLs
 * (`/bio`, `/home/skulptura`) and English sits under `/en` (`/en/bio`,
 * `/en/home/skulptura`). Prefixing both would have renamed every existing URL, which a
 * rebuild of a live site cannot afford.
 *
 * English reuses the Bulgarian slugs rather than translating them. That keeps switching
 * languages a pure prefix operation — no route table to fall out of sync, and no way for
 * the switcher to land on a page that does not exist. The slugs are transliterations
 * (`skulptura`, `bijuta`) rather than Bulgarian words, so they read the same either way.
 */

export const locales = ["bg", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

/** A value that exists in every locale. */
export type Localized<T> = Record<Locale, T>;

/** What the language switcher shows, and what `<html lang>` gets. */
export const localeMeta: Localized<{ short: string; name: string; htmlLang: string }> = {
  bg: { short: "БГ", name: "Български", htmlLang: "bg" },
  en: { short: "EN", name: "English", htmlLang: "en" },
};

/** `/bio` + `en` → `/en/bio`; `/bio` + `bg` → `/bio`; `/` + `en` → `/en`. */
export function localizePath(path: string, locale: Locale): string {
  const canonical = path === "" ? "/" : path;
  if (locale === defaultLocale) return canonical;
  return canonical === "/" ? `/${locale}` : `/${locale}${canonical}`;
}

/** The inverse: strip any locale prefix, returning the canonical (Bulgarian) path. */
export function canonicalPath(path: string): string {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (path === `/${locale}`) return "/";
    if (path.startsWith(`/${locale}/`)) return path.slice(locale.length + 1);
  }
  return path || "/";
}

/** Which locale a pathname belongs to. */
export function localeFromPath(path: string): Locale {
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (path === `/${locale}` || path.startsWith(`/${locale}/`)) return locale;
  }
  return defaultLocale;
}

/**
 * `alternates.languages` for a route's metadata, so each page declares its counterpart
 * in the other language. `x-default` points at the unprefixed default.
 */
export function languageAlternates(canonical: string): Record<string, string> {
  const alternates: Record<string, string> = { "x-default": canonical };
  for (const locale of locales) {
    alternates[localeMeta[locale].htmlLang] = localizePath(canonical, locale);
  }
  return alternates;
}
