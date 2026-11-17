import type { Localized } from "@/lib/i18n";
import type { ReviewsProps } from "@/components/sections";

/*
 * Press and criticism of the exhibition. These used to sit on the sculpture page; the
 * owner's revision of 2026-11-17 moved them to their own page (/recenzii), with only a
 * button left behind on the sculpture page.
 *
 * The full texts are not transcribed — see docs/routes.md, "Content not transcribed".
 */

export const pageTitle: Localized<string> = { bg: "Рецензии", en: "Reviews" };

export const reviews: Localized<ReviewsProps> = {
  bg: {
    heading: "За изложбата „А сега накъде?“",
    reviews: [
      {
        author: "Марта Алексиева",
        credit: "Артмениджър от Sibelius Academy, Academy of fine arts — Helsinki",
        // TODO(owner): paste the full review as further paragraphs.
        excerpt:
          "„А сега накъде?“ е изложба с изключително високо ниво на концептуално и естетическо изпълнение.",
      },
      {
        author: "Erin Irwin",
        credit: "Автор, изследовател и редактор в областта на изкуството, Лондон",
        // TODO(owner): paste the full review as further paragraphs.
        excerpt: "Изложба, която се оказа едновременно премислена и вълнуваща.",
      },
      {
        author: "Доц. арх. Боряна Минчева",
        credit: "Куратор на изложбата",
        // TODO(owner): paste the full curator's text as further paragraphs.
        excerpt:
          "Първата самостоятелна изложба на Владимир Ванков го представя като автор с разностранни интереси.",
      },
    ],
  },
  en: {
    heading: "On the exhibition “Where To Now?”",
    reviews: [
      {
        author: "Marta Alexieva",
        credit: "Arts manager, Sibelius Academy, Academy of Fine Arts — Helsinki",
        // TODO(owner): paste the full review as further paragraphs.
        excerpt:
          "“Where To Now?” is an exhibition of exceptionally high conceptual and aesthetic execution.",
      },
      {
        author: "Erin Irwin",
        credit: "London-based arts writer, researcher and editor",
        // TODO(owner): paste the full review as further paragraphs.
        excerpt: "An exhibition that proved to be at once thoughtful and thrilling.",
      },
      {
        author: "Assoc. Prof. Arch. Boryana Mincheva",
        credit: "Curator of the exhibition",
        // TODO(owner): paste the full curator's text as further paragraphs.
        excerpt:
          "Vladimir Vankov's first solo exhibition presents him as an artist of wide-ranging interests.",
      },
    ],
  },
};
