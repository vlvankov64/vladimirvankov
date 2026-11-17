import Image from "next/image";
import { Container } from "@/components/ui/Container";

export type PageHeaderProps = {
  title: string;
  /** Optional standfirst under the title. */
  intro?: string;
  image?: { src: string; alt: string; width: number; height: number };
  /**
   * `wide` (default): a letterbox crop, 16:10 on phones and 21:9 from `sm`.
   * `whole`: the photograph's own 3:2 at every width, for a banner whose subject fills
   * the frame top to bottom and must not be cut — the sculpture page's drop.
   */
  frame?: "wide" | "whole";
};

/**
 * A gallery page's opening: a wide banner photograph with the title set over it.
 *
 * The title is **one** `h1` that changes position by breakpoint rather than two copies
 * shown alternately — a page with two `h1`s is a real defect, and `hidden`/`sm:block`
 * pairs are the easy way to ship one. Below `sm` it sits under the image in ink; from
 * `sm` up it overlays the image in paper over a gradient, as the original has it.
 *
 * Over a busy photograph at 390 px the original's overlaid title is close to
 * unreadable, which is why the phone layout moves it out rather than dimming it.
 */
export function PageHeader({ title, intro, image, frame = "wide" }: PageHeaderProps) {
  if (!image) {
    return (
      <Container className="pt-12 pb-8 text-center lg:pt-20">
        <h1 className="font-display text-4xl text-ink lg:text-6xl">{title}</h1>
        {intro && <p className="mx-auto mt-6 max-w-2xl text-ink/70">{intro}</p>}
      </Container>
    );
  }

  return (
    <div className="relative">
      <div
        className={`relative w-full overflow-hidden ${
          frame === "whole" ? "aspect-[3/2]" : "aspect-[16/10] sm:aspect-[21/9]"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="100vw"
          priority
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-gradient-to-t from-ink/60 via-ink/10 to-transparent sm:block"
        />
      </div>

      <div className="sm:absolute sm:inset-x-0 sm:bottom-0">
        <Container className="pt-6 sm:pt-0 sm:pb-10 lg:pb-14">
          <h1 className="font-display text-3xl text-ink sm:text-4xl sm:text-paper sm:drop-shadow-sm lg:text-6xl">
            {title}
          </h1>
        </Container>
      </div>

      {intro && (
        <Container width="text" className="pt-8">
          <p className="text-center leading-relaxed text-ink/70">{intro}</p>
        </Container>
      )}
    </div>
  );
}
