import {
  ArtworkGallery,
  GalleryPagination,
  PageHeader,
  Reviews,
  TextBlock,
  VideoGrid,
} from "@/components/sections";
import { galleryBody, galleryHeader } from "@/lib/gallery";
import type { Locale } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { films, gallery, reviews, statement } from "@/content/galleries/skulptura";

/**
 * The exhibition page: banner, statement, films, press, then the fifteen works.
 *
 * Its own component rather than a `GalleryPage` variant — three sections no other
 * gallery has, which is a difference in layout rather than in content.
 */
export function SculpturePage({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <>
      <PageHeader {...galleryHeader(gallery, locale)} />
      <TextBlock {...statement[locale]} />
      <VideoGrid {...films[locale]} />
      <Reviews {...reviews[locale]} fullTextLabel={strings.fullText} />
      <ArtworkGallery {...galleryBody(gallery, locale)} zoomLabel={strings.enlarge} />
      <GalleryPagination
        current="/home/skulptura"
        locale={locale}
        labels={{ previous: strings.previous, next: strings.next }}
      />
    </>
  );
}
