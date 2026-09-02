import Link from "next/link";
import { FacebookIcon } from "@/components/ui/FacebookIcon";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n";
import { contact, navFor, social } from "@/lib/nav";
import { ui } from "@/lib/ui";

const icons = { Instagram: InstagramIcon, Facebook: FacebookIcon } as const;

/**
 * Site footer: a dark band carrying the navigation again, then the contact details and
 * social icons — the arrangement the original uses on every page.
 */
export function Footer({ locale }: { locale: Locale }) {
  const items = navFor(locale);
  const strings = ui[locale];

  return (
    <footer className="mt-auto bg-ink text-paper">
      <Container className="py-10 lg:py-12">
        <nav aria-label={strings.footerNavLabel} className="mb-8">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-display text-sm text-paper/70 transition-colors hover:text-paper lg:text-base"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-5 border-t border-paper/10 pt-8 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-8 sm:text-left">
            <p className="font-display text-base text-paper/90">{strings.siteName}</p>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-paper/60 transition-colors hover:text-paper"
            >
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="text-sm text-paper/60 transition-colors hover:text-paper"
            >
              {contact.phone}
            </a>
          </div>

          <ul className="flex items-center gap-5">
            {social.map((link) => {
              const Icon = icons[link.label as keyof typeof icons] ?? InstagramIcon;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-paper/60 transition-colors hover:text-paper"
                  >
                    <span className="sr-only">{link.label}</span>
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
