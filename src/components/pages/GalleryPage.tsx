import { ArtworkGallery, GalleryPagination, PageHeader } from "@/components/sections";
import { galleryBody, galleryHeader, type BilingualGallery } from "@/lib/gallery";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";

/**
 * A gallery page: banner, the works, then prev/next through the four galleries.
 *
 * Shared by all four galleries and both locales — eight routes, one composition.
 */
export function GalleryPage({
  locale,
  gallery,
  canonicalHref,
}: {
  locale: Locale;
  gallery: BilingualGallery;
  /** The gallery's unprefixed path, used to find its neighbours in the chain. */
  canonicalHref: string;
}) {
  const strings = ui[locale];

  return (
    <>
      <PageHeader {...galleryHeader(gallery, locale)} />
      <ArtworkGallery {...galleryBody(gallery, locale)} zoomLabel={strings.enlarge} />
      <GalleryPagination
        current={canonicalHref}
        locale={locale}
        labels={{ previous: strings.previous, next: strings.next }}
      />
    </>
  );
}
