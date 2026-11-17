import type { ArtworkGalleryProps, PageHeaderProps } from "@/components/sections";
import type { Locale, Localized } from "@/lib/i18n";

/**
 * Bilingual gallery content, and the resolvers that turn it into section props.
 *
 * Content files hold each string once per locale and the structural data — image paths,
 * dimensions, order — exactly once. Duplicating a whole gallery per language would mean
 * 84 image entries twice, with two copies to keep in step.
 *
 * Section components stay locale-agnostic: they receive plain resolved strings, so
 * nothing below this layer knows that more than one language exists.
 */

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
};

export type BilingualWork = {
  title?: Localized<string>;
  /** Material, technique or a one-line note. */
  lines?: Localized<string[]>;
  /** Dimensions in the target's own notation — numbers, so not translated. */
  dimensions?: string;
  /**
   * Prose printed after the work — for the "Where To Now?" cycle, the reflection the
   * artist treats as an integral part of each piece. One string per paragraph.
   */
  text?: Localized<string[]>;
  /**
   * Photographs of this work. May be empty: the original prints a caption for a work
   * whose photograph is not on the page, and dropping it would lose a listed work.
   */
  photos: GalleryPhoto[];
};

/** A titled run of works after the ungrouped ones — a cycle or a series. */
export type BilingualWorkGroup = {
  heading: Localized<string>;
  /** One line under the heading: technique, year. */
  note?: Localized<string>;
  works: BilingualWork[];
};

export type BilingualGallery = {
  /** Page title, and the noun used to build each image's alt text. */
  title: Localized<string>;
  noun: Localized<string>;
  banner: GalleryPhoto;
  columns?: 2 | 3;
  layout?: ArtworkGalleryProps["layout"];
  works: BilingualWork[];
  groups?: BilingualWorkGroup[];
};

const detailWord: Localized<string> = { bg: "детайл", en: "detail" };
const quote: Localized<[string, string]> = { bg: ["„", "“"], en: ["“", "”"] };

/** Alt text, built rather than stored: 84 photographs would otherwise carry it twice. */
function altFor(gallery: BilingualGallery, work: BilingualWork, index: number, locale: Locale) {
  const noun = gallery.noun[locale];
  const title = work.title?.[locale];
  const [open, close] = quote[locale];
  const base = title ? `${noun} ${open}${title}${close}` : noun;
  return index === 0 ? base : `${base} (${detailWord[locale]})`;
}

export function galleryHeader(gallery: BilingualGallery, locale: Locale): PageHeaderProps {
  return {
    title: gallery.title[locale],
    image: {
      src: gallery.banner.src,
      alt: `${gallery.title[locale]} — Vladimir Vankov`,
      width: gallery.banner.width,
      height: gallery.banner.height,
    },
  };
}

/**
 * Everything `ArtworkGallery` needs except `zoomLabel`, which is an interface string the
 * page supplies from `src/lib/ui.ts` — content and chrome come from different places.
 */
export function galleryBody(
  gallery: BilingualGallery,
  locale: Locale,
): Omit<ArtworkGalleryProps, "zoomLabel"> {
  const resolve = (work: BilingualWork) => ({
    title: work.title?.[locale],
    lines: work.lines?.[locale],
    dimensions: work.dimensions,
    text: work.text?.[locale],
    images: work.photos.map((photo, index) => ({
      src: photo.src,
      alt: altFor(gallery, work, index, locale),
      width: photo.width,
      height: photo.height,
    })),
  });

  return {
    columns: gallery.columns,
    layout: gallery.layout,
    artworks: gallery.works.map(resolve),
    groups: gallery.groups?.map((group) => ({
      heading: group.heading[locale],
      note: group.note?.[locale],
      artworks: group.works.map(resolve),
    })),
  };
}
