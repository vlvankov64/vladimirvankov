import { HomeHero, PortfolioGrid } from "@/components/sections";
import type { Locale } from "@/lib/i18n";
import { labelFor, localizePath } from "@/lib/nav-helpers";
import { portfolioCards, portfolioHeading, portrait, signature, statement } from "@/content/home";

/** The home page, shared by both locales. Composition only. */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <HomeHero
        portrait={{ ...portrait, alt: portrait.alt[locale] }}
        signature={{ ...signature, alt: signature.alt[locale] }}
        statement={statement[locale]}
      />
      <PortfolioGrid
        heading={portfolioHeading[locale]}
        items={portfolioCards.map((card) => ({
          label: labelFor(card.href, locale),
          href: localizePath(card.href, locale),
          image: card.image,
        }))}
      />
    </>
  );
}
