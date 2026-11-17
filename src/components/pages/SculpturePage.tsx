import {
  ArtworkGallery,
  GalleryPagination,
  LinkButtons,
  PageHeader,
  TextBlock,
} from "@/components/sections";
import { galleryBody, galleryHeader } from "@/lib/gallery";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { gallery, moreLinks, statement } from "@/content/galleries/skulptura";

/**
 * The sculpture page: banner, statement, buttons to the reviews and films, then the
 * works — the newest first, then the cycle "Where To Now?".
 *
 * Its own component rather than a `GalleryPage` variant — the statement and the buttons
 * are sections no other gallery has, which is a difference in layout, not content.
 */
export function SculpturePage({ locale }: { locale: Locale }) {
  const strings = ui[locale];

  return (
    <>
      <PageHeader {...galleryHeader(gallery, locale)} />
      <TextBlock {...statement[locale]} />
      <LinkButtons
        links={moreLinks[locale].map((link) => ({
          ...link,
          href: localizePath(link.href, locale),
        }))}
      />
      <ArtworkGallery {...galleryBody(gallery, locale)} zoomLabel={strings.enlarge} />
      <GalleryPagination
        current="/home/skulptura"
        locale={locale}
        labels={{ previous: strings.previous, next: strings.next }}
      />
    </>
  );
}
