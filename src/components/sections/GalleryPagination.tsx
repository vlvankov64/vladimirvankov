import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Locale } from "@/lib/i18n";
import { galleryNeighbours } from "@/lib/nav";

export type GalleryPaginationProps = {
  /** The current gallery's canonical (unprefixed) href. */
  current: string;
  locale: Locale;
  labels: { previous: string; next: string };
};

/**
 * Previous / next links between the four galleries, as the original's pagination.
 *
 * Neighbours come from `galleryChain` in `src/lib/nav.ts` rather than being written
 * per page, so the chain cannot fall out of order when a gallery is added.
 */
export function GalleryPagination({ current, locale, labels }: GalleryPaginationProps) {
  const { previous, next } = galleryNeighbours(current, locale);
  if (!previous && !next) return null;

  return (
    <Section tone="mist" className="border-t border-ink/8">
      <Container className="flex items-stretch justify-between gap-4 py-10 lg:py-14">
        {previous ? (
          <Link href={previous.href} className="group flex-1 text-left">
            <span className="caption-label text-ink/45">{labels.previous}</span>
            <span className="mt-2 block font-display text-xl text-ink transition-colors group-hover:text-accent lg:text-2xl">
              {previous.label}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}

        {next ? (
          <Link href={next.href} className="group flex-1 text-right">
            <span className="caption-label text-ink/45">{labels.next}</span>
            <span className="mt-2 block font-display text-xl text-ink transition-colors group-hover:text-accent lg:text-2xl">
              {next.label}
            </span>
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </Container>
    </Section>
  );
}
