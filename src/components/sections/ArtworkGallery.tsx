import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ZoomableImage } from "@/components/ui/ZoomableImage";

export type GalleryImage = { src: string; alt: string; width: number; height: number };

export type Artwork = {
  /** Work title, as the original prints it. */
  title?: string;
  /** Material, technique or a one-line note — the caption lines under the title. */
  lines?: string[];
  /** Dimensions, in the original's own notation (e.g. "40 х 40"). */
  dimensions?: string;
  /** Longer prose printed after the caption, one string per paragraph. */
  text?: string[];
  images: GalleryImage[];
};

export type ArtworkGroup = {
  heading: string;
  /** One line under the heading: technique, year. */
  note?: string;
  artworks: Artwork[];
};

export type ArtworkGalleryProps = {
  /**
   * One entry per work. A work may legitimately have no photographs: the original
   * prints a caption for a piece whose image is not on the page, and dropping it would
   * lose a work it lists.
   */
  artworks: Artwork[];
  /** Titled runs of works after `artworks` — a cycle or series, each under a heading. */
  groups?: ArtworkGroup[];
  /**
   * How many images sit in a row on desktop when a work has several. The original
   * pairs a detail shot with an overview; three is its widest grouping.
   */
  columns?: 2 | 3;
  /**
   * `grid` (default): equal columns. `justified`: one row whose images share a common
   * height, each as wide as its proportions need — no cropping, no ragged row ends.
   * Suits works photographed as one portrait overview plus landscape details.
   */
  layout?: "grid" | "justified";
  /** Accessible verb for the lightbox trigger, e.g. "enlarge" — supplied per locale. */
  zoomLabel: string;
};

type WorkProps = {
  artwork: Artwork;
  columns: 2 | 3;
  layout: "grid" | "justified";
  priority: boolean;
  zoomLabel: string;
  /** h2 for top-level works, h3 inside a group's h2. */
  titleAs?: "h2" | "h3";
};

/** Tallest a justified row may get, in px. */
const MAX_ROW_HEIGHT = 720;

function Photos({ artwork, columns, layout, priority, zoomLabel }: WorkProps) {
  const { images } = artwork;
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      // A portrait photograph at the landscape width would run past the viewport.
      <div
        className={`mx-auto w-full ${images[0].height > images[0].width ? "max-w-xl" : "max-w-4xl"}`}
      >
        <ZoomableImage
          {...images[0]}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 900px"
          priority={priority}
          zoomLabel={zoomLabel}
        />
      </div>
    );
  }

  if (layout === "justified") {
    // Each image's flex-grow is its aspect ratio, so the row settles at one common
    // height with every photograph whole. Stacks full-width on a phone.
    const total = images.reduce((sum, image) => sum + image.width / image.height, 0);
    // Cap the row's height: a row of portraits would otherwise run past the viewport.
    const maxWidth = `${Math.round(total * MAX_ROW_HEIGHT)}px`;
    return (
      <div className="mx-auto flex w-full flex-col gap-3 sm:flex-row sm:gap-4" style={{ maxWidth }}>
        {images.map((image, index) => {
          const ratio = image.width / image.height;
          return (
            <div
              key={image.src}
              className="min-w-0 sm:flex-[var(--grow)_1_0%]"
              style={{ "--grow": ratio } as React.CSSProperties}
            >
              <ZoomableImage
                {...image}
                sizes={`(max-width: 640px) 100vw, ${Math.ceil((ratio / total) * 100)}vw`}
                priority={priority && index === 0}
                zoomLabel={zoomLabel}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`grid gap-3 sm:gap-4 ${
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {images.map((image, index) => (
        <ZoomableImage
          key={image.src}
          {...image}
          // Several share the row, so ask for a proportionally smaller file.
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority && index === 0}
          zoomLabel={zoomLabel}
        />
      ))}
    </div>
  );
}

function Work(props: WorkProps) {
  const { artwork, titleAs: Title = "h2" } = props;
  const hasCaption = artwork.title || artwork.lines?.length || artwork.dimensions;

  return (
    <figure className="flex flex-col gap-6">
      <Photos {...props} />

      {(hasCaption || artwork.text?.length) && (
        <figcaption className="mx-auto max-w-2xl">
          {hasCaption && (
            <div className="text-center">
              {artwork.title && (
                <Title className="font-display text-xl text-ink lg:text-2xl">{artwork.title}</Title>
              )}
              {artwork.lines?.map((line) => (
                <p key={line} className="mt-1 text-sm leading-relaxed text-ink/60">
                  {line}
                </p>
              ))}
              {artwork.dimensions && (
                <p className="mt-2 caption-label text-ink/45">{artwork.dimensions}</p>
              )}
            </div>
          )}
          {artwork.text && artwork.text.length > 0 && (
            <div className="mt-6 flex flex-col gap-4 border-t border-ink/10 pt-6">
              {artwork.text.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="leading-relaxed text-ink/75">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
}

const workKey = (artwork: Artwork, index: number) =>
  artwork.title ?? artwork.images[0]?.src ?? String(index);

/**
 * The gallery body: one block per work — its photographs, then its caption, then any
 * accompanying prose — optionally followed by titled groups of works.
 *
 * Mobile-first, and this is where the original is weakest: it lays several images in
 * a fixed row that squeezes each to a sliver on a phone. Here they stack full-width
 * below `sm` and only form a row once there is space for one.
 */
export function ArtworkGallery({
  artworks,
  groups = [],
  columns = 3,
  layout = "grid",
  zoomLabel,
}: ArtworkGalleryProps) {
  const shared = { columns, layout, zoomLabel };

  return (
    <Section className="py-14 lg:py-24">
      <Container>
        <div className="flex flex-col gap-20 lg:gap-32">
          {artworks.map((artwork, index) => (
            <Work
              key={workKey(artwork, index)}
              artwork={artwork}
              // Only the very first image of the page is above the fold.
              priority={index === 0}
              {...shared}
            />
          ))}

          {groups.map((group, groupIndex) => (
            <section key={group.heading} className="flex flex-col gap-20 lg:gap-32">
              <header className="border-t border-ink/10 pt-14 text-center lg:pt-20">
                <h2 className="font-display text-2xl tracking-wide text-ink uppercase lg:text-4xl">
                  {group.heading}
                </h2>
                {group.note && <p className="mt-3 text-ink/60">{group.note}</p>}
              </header>
              {group.artworks.map((artwork, index) => (
                <Work
                  key={workKey(artwork, index)}
                  artwork={artwork}
                  priority={artworks.length === 0 && groupIndex === 0 && index === 0}
                  titleAs="h3"
                  {...shared}
                />
              ))}
            </section>
          ))}
        </div>
      </Container>
    </Section>
  );
}
