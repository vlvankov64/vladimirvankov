import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type PortfolioGridProps = {
  heading: string;
  items: {
    /** Discipline name: rendered over the photograph, and the link's accessible name. */
    label: string;
    href: string;
    image: { src: string; width: number; height: number };
  }[];
};

/**
 * The four disciplines as cards linking into each gallery — the original's portfolio
 * grid: two columns, one photograph each with the discipline name over it.
 *
 * The name is **rendered text**, not part of the image. The original burns it into the
 * JPEG, which fixes it to one language for ever and makes any second title collide with
 * the first; these cards use an untitled photograph from each gallery instead, so the
 * label is markup and exists in every locale. See `src/content/home.ts` for why the
 * original's four card images could not be reused.
 *
 * `label` therefore does double duty: the visible title, and the link's accessible name
 * via the image `alt` — announced once, not twice.
 *
 * Cards are cropped to a common 16:9 so the grid stays even whatever each photograph's
 * own proportions are, with a scrim to keep the title legible over any of them.
 */
export function PortfolioGrid({ heading, items }: PortfolioGridProps) {
  return (
    <Section className="pb-14 lg:pb-24">
      <Container>
        <h2 className="mb-8 text-center font-display text-3xl text-ink italic lg:mb-12 lg:text-5xl">
          {heading}
        </h2>

        <ul className="grid gap-3 sm:grid-cols-2 sm:gap-5">
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="group relative block overflow-hidden">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={item.image.src}
                    alt={item.label}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-gentle group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-ink/25 transition-colors duration-300 group-hover:bg-ink/40"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center px-4 text-center"
                  >
                    <span className="font-display text-2xl text-paper drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)] sm:text-3xl lg:text-4xl">
                      {item.label}
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
