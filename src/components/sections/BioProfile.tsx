import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/** One line of the record, or a line with sub-lines — an exhibition that toured. */
export type BioItem = string | { text: string; details: string[] };

export type BioProfileProps = {
  /** The artist's full name, as the biography opens. The page's `h1`. */
  name: string;
  portrait: { src: string; alt: string; width: number; height: number };
  /** The opening line about the artist, set as a standfirst. */
  standfirst: string;
  /** Grouped factual lists: career, education, exhibitions, collections. */
  groups: { heading?: string; items: BioItem[] }[];
};

const itemText = (item: BioItem) => (typeof item === "string" ? item : item.text);

/**
 * The biography page: portrait beside a standfirst, then the factual record in
 * grouped lists.
 *
 * The original runs one undifferentiated column of paragraphs, so career, education
 * and a twenty-line exhibition history read as a single block. The content is
 * unchanged; only the grouping is added, which is the difference between a list a
 * reader can scan and one they cannot.
 */
export function BioProfile({ name, portrait, standfirst, groups }: BioProfileProps) {
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
            <h1 className="mb-6 caption-label text-accent">{name}</h1>
            <p className="font-display text-2xl leading-snug text-ink lg:text-3xl">{standfirst}</p>

            <div className="mt-10 flex flex-col gap-9">
              {groups.map((group) => (
                <section key={group.heading ?? itemText(group.items[0])}>
                  {group.heading && (
                    <h2 className="mb-4 caption-label text-accent">{group.heading}</h2>
                  )}
                  <ul className="flex flex-col gap-3">
                    {group.items.map((item) => (
                      <li
                        key={itemText(item)}
                        className="border-b border-ink/8 pb-3 text-sm leading-relaxed text-ink/75 last:border-0"
                      >
                        {itemText(item)}
                        {typeof item !== "string" && (
                          <ul className="mt-2 flex flex-col gap-1 pl-4">
                            {item.details.map((detail) => (
                              <li key={detail} className="list-['–_'] pl-1">
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
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
