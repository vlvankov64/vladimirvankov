import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type ReviewsProps = {
  heading: string;
  /** Label for the optional link to a review's full text. */
  fullTextLabel?: string;
  reviews: {
    author: string;
    /** The author's credit line, as the original prints it. */
    credit?: string;
    /** A short opening quotation from the piece. */
    excerpt: string;
    /** Where the full text lives, if the original links it. */
    href?: string;
  }[];
};

/**
 * Press and criticism: one attributed block per writer.
 *
 * The original prints each review in full. Here each is represented by its author,
 * credit and an opening quotation — see docs/routes.md; the full texts are the
 * owner's to paste into `content.ts`, and the layout takes any length.
 */
export function Reviews({ heading, reviews, fullTextLabel = "Full text" }: ReviewsProps) {
  return (
    <Section className="py-14 lg:py-24">
      <Container width="text">
        <h2 className="mb-10 font-display text-3xl text-ink lg:text-4xl">{heading}</h2>

        <div className="flex flex-col gap-12">
          {reviews.map((review) => (
            <article key={review.author} className="border-l border-accent/30 pl-6 lg:pl-8">
              <blockquote className="font-display text-xl leading-relaxed text-ink/90 lg:text-2xl">
                {review.excerpt}
              </blockquote>
              <footer className="mt-5">
                <p className="caption-label text-ink">{review.author}</p>
                {review.credit && <p className="mt-1 text-sm text-ink/55">{review.credit}</p>}
                {review.href && (
                  <a
                    href={review.href}
                    className="mt-2 inline-block caption-label text-accent hover:underline"
                  >
                    {fullTextLabel}
                  </a>
                )}
              </footer>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
