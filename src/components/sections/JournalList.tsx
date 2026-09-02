import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type JournalListProps = {
  posts: {
    title: string;
    href: string;
    date?: string;
    excerpt?: string;
    image?: { src: string; alt: string; width: number; height: number };
  }[];
  /** Shown when there is nothing published yet. */
  emptyNote?: string;
};

/** The news page: a list of posts, newest first. */
export function JournalList({ posts, emptyNote }: JournalListProps) {
  if (posts.length === 0) {
    return (
      <Section className="py-20">
        <Container width="text">
          <p className="text-center text-ink/60">{emptyNote}</p>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="py-12 lg:py-20">
      <Container>
        <ul className="flex flex-col gap-12 lg:gap-16">
          {posts.map((post) => (
            <li key={post.href}>
              <article className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10">
                {post.image && (
                  <Link href={post.href} className="group block overflow-hidden bg-mist/40">
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      width={post.image.width}
                      height={post.image.height}
                      sizes="(max-width: 640px) 100vw, 40vw"
                      className="h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.03]"
                    />
                  </Link>
                )}

                <div>
                  {post.date && <p className="caption-label text-ink/45">{post.date}</p>}
                  <h2 className="mt-2 font-display text-2xl text-ink lg:text-3xl">
                    <Link href={post.href} className="transition-colors hover:text-accent">
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 leading-relaxed text-ink/70">{post.excerpt}</p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
