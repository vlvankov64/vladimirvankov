import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export type VideoGridProps = {
  heading?: string;
  note?: string;
  videos: { id: string; title: string }[];
};

/**
 * The exhibition films. YouTube embeds, as the original has them.
 *
 * `loading="lazy"` keeps the players out of the initial page load — the original
 * mounts all of them eagerly, which is most of its weight on this page — and
 * youtube-nocookie means nothing is set until a visitor actually presses play.
 */
export function VideoGrid({ heading, note, videos }: VideoGridProps) {
  return (
    <Section tone="mist" className="py-14 lg:py-20">
      <Container>
        {heading && (
          <h2 className="text-center font-display text-3xl text-ink lg:text-4xl">{heading}</h2>
        )}
        {note && (
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-ink/60">
            {note}
          </p>
        )}

        <div className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id} className="aspect-video w-full overflow-hidden bg-ink/5">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
