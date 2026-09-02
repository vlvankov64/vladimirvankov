import { Container } from "@/components/ui/Container";
import { Section, type SectionTone } from "@/components/ui/Section";

export type TextBlockProps = {
  heading?: string;
  /** Paragraphs, in order. */
  paragraphs: string[];
  tone?: SectionTone;
  /** Set the first paragraph larger, as a standfirst. */
  lead?: boolean;
};

/** A band of running prose at reading measure — statements, notes, introductions. */
export function TextBlock({ heading, paragraphs, tone = "paper", lead = false }: TextBlockProps) {
  return (
    <Section tone={tone} className="py-12 lg:py-20">
      <Container width="text">
        {heading && <h2 className="mb-8 font-display text-3xl text-ink lg:text-4xl">{heading}</h2>}
        <div className="flex flex-col gap-5">
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 48)}
              className={
                lead && index === 0
                  ? "font-display text-xl leading-relaxed text-ink lg:text-2xl"
                  : "leading-relaxed text-ink/75"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
