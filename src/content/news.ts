import type { Localized } from "@/lib/i18n";

/*
 * The news page.
 *
 * Both entries on the original are unedited Squarespace template posts: the titles are
 * the theme's own placeholders and the bodies its filler paragraphs. The photographs are
 * real. So the structure is ported and the images kept, while the titles and bodies are
 * left for the owner to write — there is nothing in them to transcribe or translate.
 * See docs/routes.md.
 */

export const heading: Localized<string> = { bg: "Новини", en: "News" };

export const placeholderTitle: Localized<string> = {
  bg: "Публикация без заглавие",
  en: "Untitled post",
};

export const placeholderBody: Localized<string> = {
  bg: "Текстът на тази публикация предстои да бъде добавен.",
  en: "The text of this post is yet to be written.",
};

export const posts: {
  href: string;
  image: { src: string; width: number; height: number };
}[] = [
  {
    href: "/novini/blog-post-title-two-tcmjn-3d33l",
    image: { src: "/assets/_DSF1926-Enhanced-NR.jpg", width: 2000, height: 1334 },
  },
  {
    href: "/novini/qqqqqq",
    image: { src: "/assets/_DSF1901-Enhanced-NR.jpg", width: 2000, height: 1334 },
  },
];

export const imageAlt: Localized<string> = {
  bg: "Творба на Владимир Ванков",
  en: "Work by Vladimir Vankov",
};
