import type { Localized } from "@/lib/i18n";
import type { PortfolioGridProps } from "@/components/sections";

/*
 * The home page: portrait, signature, a one-line statement of the artist's fields, and
 * the four disciplines as a grid.
 *
 * The Bulgarian statement is transcribed from the original; the English is a translation
 * of it. The grid labels double as the accessible names of the links, since the
 * discipline name in each card is part of the photograph rather than text.
 */

export const portrait = {
  src: "/assets/_DSF6451-2.jpg",
  alt: { bg: "Владимир Ванков в ателието", en: "Vladimir Vankov in his studio" },
  width: 1333,
  height: 2000,
};

export const signature = {
  src: "/assets/signature-3.png",
  alt: { bg: "Подпис на Владимир Ванков", en: "Vladimir Vankov's signature" },
  width: 782,
  height: 440,
};

export const statement: Localized<string> = {
  bg: "Владимир Ванков работи в областта на скулптурата, художествената бижутерия, стъклената пластика и живописта.",
  en: "Vladimir Vankov works in sculpture, art jewellery, glass sculpture and painting.",
};

export const portfolioHeading: Localized<string> = {
  bg: "Произведения",
  en: "Works",
};

/**
 * Card images, in the original's order.
 *
 * These are photographs from each gallery, not the original's own card images. The
 * original's four are bespoke compositions with the discipline name burned into the
 * JPEG in Bulgarian — fine for a monolingual site, impossible to translate, and there is
 * no clean version of them among the site's media (checked by image comparison against
 * all 84 files; nothing close). Using an untitled photograph from each gallery lets the
 * label be real text, and therefore exist in both languages.
 *
 * Each is the photograph that opens its own gallery, so a card and the page it leads to
 * show the same picture — except Glass Art, whose banner is square and would lose too
 * much to the card's 16:9 crop, so the gallery's one landscape photograph is used.
 *
 * No `alt`: the label is the link's accessible name. See `PortfolioGrid`.
 */
export const portfolioCards: {
  href: string;
  image: PortfolioGridProps["items"][number]["image"];
}[] = [
  {
    href: "/home/skulptura",
    // The drop — the work "Where To Now?" — per the owner's revision of 2026-11-17.
    image: { src: "/assets/_DSF2150-Enhanced-NR.jpg", width: 1920, height: 1280 },
  },
  { href: "/home/bijuta", image: { src: "/assets/DSCF1053.jpg", width: 1920, height: 1280 } },
  { href: "/home/plastika", image: { src: "/assets/DSCF0992.jpg", width: 1920, height: 1280 } },
  { href: "/home/kartini", image: { src: "/assets/_DSF6488.jpg", width: 1920, height: 1365 } },
];
