import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type BioProfileProps = {
  portrait: { src: string; alt: string; width: number; height: number };
  /** The opening line about the artist, set as a standfirst. */
  standfirst: string;
  /** Grouped factual lists: career, education, exhibitions, collections. */
  groups: { heading?: string; items: string[] }[];
};

/**
 * The biography page: portrait beside a standfirst, then the factual record in
 * grouped lists.
 *
 * The original runs one undifferentiated column of paragraphs, so career, education
 * and a twenty-line exhibition history read as a single block. The content is
 * unchanged; only the grouping is added, which is the difference between a list a
 * reader can scan and one they cannot.
 */
export function BioProfile({ portrait, standfirst, groups }: BioProfileProps) {
  return (
    <Section className="py-12 lg:py-20">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(max-width: 1024px) 100vw, 40vw"
            priority
            className="h-auto w-full"
          />

          <div>
            <p className="font-display text-2xl leading-snug text-ink lg:text-3xl">{standfirst}</p>

            <div className="mt-10 flex flex-col gap-9">
              {groups.map((group) => (
                <section key={group.heading ?? group.items[0]}>
                  {group.heading && (
                    <h2 className="mb-4 caption-label text-accent">{group.heading}</h2>
                  )}
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="border-b border-ink/8 pb-3 text-sm leading-relaxed text-ink/75 last:border-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
