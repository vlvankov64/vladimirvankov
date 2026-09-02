import Image from "next/image";
import Link from "next/link";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { navFor, siteLogo, social } from "@/lib/nav";
import { ui } from "@/lib/ui";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

const icons = { Instagram: InstagramIcon, Facebook: FacebookIcon } as const;

/**
 * Sticky site header, arranged as the original: the artist's signature centred at the
 * top, the flat six-item nav centred beneath it, social icons out at the left.
 *
 * The language switcher sits at the right, opposite the social icons — the original is
 * monolingual and has nothing there, and it is the conventional place to look for it.
 *
 * Server Component. Only MobileNav and LanguageSwitcher are interactive.
 */
export function Header({ locale }: { locale: Locale }) {
  const items = navFor(locale);
  const strings = ui[locale];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-paper/90 backdrop-blur-md">
      <Container className="relative flex flex-col items-center gap-3 py-4 lg:gap-4 lg:py-5">
        <ul className="absolute top-4 left-5 flex items-center gap-4 sm:left-8 lg:top-6 lg:left-12">
          {social.map((link) => {
            const Icon = icons[link.label as keyof typeof icons] ?? InstagramIcon;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-ink/60 transition-colors hover:text-accent"
                >
                  <span className="sr-only">{link.label}</span>
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="absolute top-4 right-5 sm:right-8 lg:top-6 lg:right-12">
          <LanguageSwitcher current={locale} label={strings.languageLabel} />
        </div>

        <Link href={localizePath("/", locale)} className="block">
          <Image
            src={siteLogo.src}
            alt={siteLogo.alt}
            width={siteLogo.width}
            height={siteLogo.height}
            sizes="140px"
            priority
            className="h-9 w-auto lg:h-11"
          />
        </Link>

        <nav aria-label={strings.mainNavLabel} className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-base text-ink/80 transition-colors duration-300 hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute top-12 right-3 lg:hidden">
          <MobileNav
            items={items}
            labels={{
              open: strings.openMenu,
              close: strings.closeMenu,
              nav: strings.mainNavLabel,
            }}
          />
        </div>
      </Container>
    </header>
  );
}
