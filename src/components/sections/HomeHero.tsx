import Image from "next/image";
import { Container } from "@/components/ui/Container";

export type HomeHeroProps = {
  portrait: { src: string; alt: string; width: number; height: number };
  signature: { src: string; alt: string; width: number; height: number };
  statement: string;
};

/**
 * The home page opening: the artist's portrait beside his signature and a one-line
 * statement of what he works in.
 *
 * The original stacks these in a single narrow column on every width, which leaves a
 * tall portrait pushing the statement well below the fold on desktop. Here they sit
 * side by side from `lg` up and stack below it.
 */
export function HomeHero({ portrait, signature, statement }: HomeHeroProps) {
  return (
    <Container className="grid items-center gap-10 py-12 lg:grid-cols-2 lg:gap-20 lg:py-20">
      <Image
        src={portrait.src}
        alt={portrait.alt}
        width={portrait.width}
        height={portrait.height}
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        className="h-auto w-full"
      />

      <div className="flex flex-col items-start gap-8">
        <Image
          src={signature.src}
          alt={signature.alt}
          width={signature.width}
          height={signature.height}
          sizes="(max-width: 640px) 60vw, 260px"
          className="h-auto w-40 sm:w-52"
        />
        <p className="font-display text-2xl leading-snug text-balance text-ink sm:text-3xl lg:text-4xl">
          {statement}
        </p>
      </div>
    </Container>
  );
}
