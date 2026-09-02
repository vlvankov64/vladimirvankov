import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ZoomableImage } from "@/components/ui/ZoomableImage";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Artwork = {
  /** Work title, as the original prints it. */
  title?: string;
  /** Material, technique or a one-line note — the caption lines under the title. */
  lines?: string[];
  /** Dimensions, in the original's own notation (e.g. "40 х 40"). */
  dimensions?: string;
  images: GalleryImage[];
};

export type ArtworkGalleryProps = {
  /**
   * One entry per work. A work may legitimately have no photographs: the original
   * prints a caption for a piece whose image is not on the page, and dropping it would
   * lose a work it lists.
   */
  artworks: Artwork[];
  /**
   * How many images sit in a row on desktop when a work has several. The original
   * pairs a detail shot with an overview; three is its widest grouping.
   */
  columns?: 2 | 3;
  /** Accessible verb for the lightbox trigger, e.g. "enlarge" — supplied per locale. */
  zoomLabel: string;
};

/**
 * The gallery body: one block per work — its photographs, then its caption.
 *
 * Mobile-first, and this is where the original is weakest: it lays several images in
 * a fixed row that squeezes each to a sliver on a phone. Here they stack full-width
 * below `sm` and only form a row once there is space for one.
 */
export function ArtworkGallery({ artworks, columns = 3, zoomLabel }: ArtworkGalleryProps) {
  return (
    <Section className="py-14 lg:py-24">
      <Container>
        <div className="flex flex-col gap-20 lg:gap-32">
          {artworks.map((artwork, index) => (
            <figure
              key={artwork.title ?? artwork.images[0]?.src ?? index}
              className="flex flex-col gap-6"
            >
              {artwork.images.length > 0 && (
                <div
                  className={`grid gap-3 sm:gap-4 ${
                    artwork.images.length === 1
                      ? "mx-auto max-w-4xl"
                      : columns === 2
                        ? "sm:grid-cols-2"
                        : "sm:grid-cols-2 lg:grid-cols-3"
                  }`}
                >
                  {artwork.images.map((image, imageIndex) => (
                    <ZoomableImage
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      // One image spans the column; several share it, so ask for a
                      // proportionally smaller file at each breakpoint.
                      sizes={
                        artwork.images.length === 1
                          ? "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                      // Only the very first image of the page is above the fold.
                      priority={index === 0 && imageIndex === 0}
                      zoomLabel={zoomLabel}
                    />
                  ))}
                </div>
              )}

              {(artwork.title || artwork.lines?.length || artwork.dimensions) && (
                <figcaption className="mx-auto max-w-2xl text-center">
                  {artwork.title && (
                    <h2 className="font-display text-xl text-ink lg:text-2xl">{artwork.title}</h2>
                  )}
                  {artwork.lines?.map((line) => (
                    <p key={line} className="mt-1 text-sm leading-relaxed text-ink/60">
                      {line}
                    </p>
                  ))}
                  {artwork.dimensions && (
                    <p className="mt-2 caption-label text-ink/45">{artwork.dimensions}</p>
                  )}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
