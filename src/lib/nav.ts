import type { Locale, Localized } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";

/**
 * The navigation tree — one source of truth for the header, the footer, the gallery
 * pagination and the home page's card labels.
 *
 * `href` is always the **canonical** (unprefixed) path. `navFor(locale)` prefixes it for
 * the locale being rendered, so no localised URL is ever written by hand.
 *
 * Bulgarian labels are the target's own, verbatim. English labels are translations of
 * them; the original is monolingual, so there is no English wording to transcribe.
 */

export type NavNode = { label: string; href: string };

type NavSource = { label: Localized<string>; href: string };

const nav: NavSource[] = [
  { label: { bg: "Скулптура", en: "Sculpture" }, href: "/home/skulptura" },
  { label: { bg: "Бижута", en: "Jewellery" }, href: "/home/bijuta" },
  { label: { bg: "Стъклена пластика", en: "Glass Art" }, href: "/home/plastika" },
  { label: { bg: "Картини", en: "Paintings" }, href: "/home/kartini" },
  { label: { bg: "Биография", en: "Biography" }, href: "/bio" },
  { label: { bg: "Новини", en: "News" }, href: "/novini" },
];

/** Header and footer navigation for one locale, with hrefs already localised. */
export function navFor(locale: Locale): NavNode[] {
  return nav.map((item) => ({
    label: item.label[locale],
    href: localizePath(item.href, locale),
  }));
}

/** The label for one canonical href — used for the home page's card links. */
export function labelFor(href: string, locale: Locale): string {
  return nav.find((item) => item.href === href)?.label[locale] ?? href;
}

/**
 * The four galleries in the order the original's prev/next pagination walks them:
 * Скулптура ↔ Бижута ↔ Стъклена пластика ↔ Картини.
 */
const galleryChain = nav.slice(0, 4);

export function galleryNeighbours(
  canonicalHref: string,
  locale: Locale,
): { previous?: NavNode; next?: NavNode } {
  const index = galleryChain.findIndex((item) => item.href === canonicalHref);
  if (index === -1) return {};
  const at = (position: number): NavNode | undefined => {
    const item = galleryChain[position];
    return item && { label: item.label[locale], href: localizePath(item.href, locale) };
  };
  return { previous: at(index - 1), next: at(index + 1) };
}

/** Contact block in the footer, transcribed from the original. Not language-dependent. */
export const contact = {
  email: "vladimirvankovart@gmail.com",
  phone: "+359 896 846 889",
};

/** Social links, rendered as icons in the header and the footer. */
export const social = [
  { label: "Instagram", href: "https://www.instagram.com/vladimirvankovart/?hl=en" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61564932105649" },
];

/**
 * The header wordmark — the artist's signature, as the original uses it. A second,
 * larger signature file appears on the home page; this is the smaller header one.
 */
export const siteLogo = {
  src: "/assets/signature-2.png",
  alt: "Владимир Ванков",
  width: 782,
  height: 440,
};
