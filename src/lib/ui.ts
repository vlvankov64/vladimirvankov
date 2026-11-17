import type { Localized } from "@/lib/i18n";

/**
 * Interface strings — the words the rebuild supplies itself rather than transcribing:
 * accessible names, the pagination labels, menu affordances.
 *
 * Page copy does **not** live here. It stays in each route's `content.ts`, which is what
 * keeps a content revision a data edit. This file is only for chrome, and only for
 * strings that appear on more than one page.
 */
export const ui: Localized<{
  /**
   * The site's name and default description, per language. `site.config.json` holds the
   * canonical (Bulgarian) name for framework use; these are what the pages render.
   */
  siteName: string;
  siteDescription: string;
  mainNavLabel: string;
  footerNavLabel: string;
  openMenu: string;
  closeMenu: string;
  enlarge: string;
  closeHint: string;
  previous: string;
  next: string;
  languageLabel: string;
  skipToContent: string;
  /** Caption under the logo, which is the home link. */
  home: string;
}> = {
  bg: {
    siteName: "Владимир Ванков",
    siteDescription:
      "Владимир Ванков работи в областта на скулптурата, художествената бижутерия, стъклената пластика и живописта.",
    mainNavLabel: "Основна навигация",
    footerNavLabel: "Навигация в долния колонтитул",
    openMenu: "Отвори менюто",
    closeMenu: "Затвори менюто",
    enlarge: "увеличи",
    closeHint: "ESC затваря",
    previous: "Предишно",
    next: "Следващо",
    languageLabel: "Език",
    skipToContent: "Към съдържанието",
    home: "Начало",
  },
  en: {
    siteName: "Vladimir Vankov",
    siteDescription:
      "Vladimir Vankov works in sculpture, art jewellery, glass sculpture and painting.",
    mainNavLabel: "Main navigation",
    footerNavLabel: "Footer navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    enlarge: "enlarge",
    closeHint: "ESC to close",
    previous: "Previous",
    next: "Next",
    languageLabel: "Language",
    skipToContent: "Skip to content",
    home: "Home",
  },
};
