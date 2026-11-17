import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type LinkButtonsProps = {
  /** Optional line above the buttons. */
  heading?: string;
  links: { label: string; href: string }[];
};

/**
 * A centred row of outlined buttons pointing to other pages — what is left on the
 * sculpture page where the reviews and films used to be, after they moved to their own
 * pages. Plain links styled as buttons; no client JS.
 */
export function LinkButtons({ heading, links }: LinkButtonsProps) {
  return (
    <Section tone="mist" className="py-10 lg:py-14">
      <Container className="flex flex-col items-center gap-6">
        {heading && <h2 className="text-center text-xl text-ink lg:text-2xl">{heading}</h2>}
        <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex min-w-40 items-center justify-center rounded-md border border-accent/40 bg-paper px-6 py-3 font-display text-base tracking-wide text-accent uppercase transition-colors duration-300 hover:bg-accent hover:text-paper"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
