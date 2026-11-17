import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type ReviewsProps = {
  heading: string;
  reviews: {
    author: string;
    /** The author's credit line, as the text itself gives it. */
    credit?: string;
    /** The full text, one string per paragraph. */
    paragraphs: string[];
    /**
     * Set when the text is in a language other than the page's — a review supplied in
     * one language only is printed as written, not translated.
     */
    lang?: string;
    /** A short remark (from an opening speech, say), set as a display quotation. */
    quote?: boolean;
  }[];
};

/**
 * Press and criticism, printed in full: one attributed article per writer, the author
 * and credit first so a reader knows whose words they are before reading them.
 *
 * A short remark can be set as a display quotation; full reviews run as body copy at
 * reading measure, which display type cannot carry.
 */
export function Reviews({ heading, reviews }: ReviewsProps) {
  return (
    <Section className="py-14 lg:py-24">
      <Container width="text">
        <h2 className="mb-12 font-display text-3xl text-ink lg:text-4xl">{heading}</h2>

        <div className="flex flex-col gap-16 lg:gap-20">
          {reviews.map((review) => (
            <article key={review.author} className="border-l border-accent/30 pl-6 lg:pl-8">
              <header className="mb-6">
                <h3 className="caption-label text-ink">{review.author}</h3>
                {review.credit && (
                  <p className="mt-1 text-sm whitespace-pre-line text-ink/55">{review.credit}</p>
                )}
              </header>
              <div lang={review.lang} className="flex flex-col gap-4">
                {review.paragraphs.map((paragraph) =>
                  review.quote ? (
                    <blockquote
                      key={paragraph.slice(0, 48)}
                      className="font-display text-xl leading-relaxed whitespace-pre-line text-ink/90 lg:text-2xl"
                    >
                      {paragraph}
                    </blockquote>
                  ) : (
                    <p key={paragraph.slice(0, 48)} className="leading-relaxed text-ink/75">
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
