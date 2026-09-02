import type { BilingualGallery } from "@/lib/gallery";
import type { Localized } from "@/lib/i18n";
import type { ReviewsProps, TextBlockProps, VideoGridProps } from "@/components/sections";

/*
 * The exhibition page — the largest on the site.
 *
 * Work titles are transcribed, and their English forms are the exhibition's own: its
 * English-language review names the pieces (Alone, Vow, Fatherhood, Unwanted Gift,
 * After the Others…, Where Now?), so those are used rather than fresh translations.
 *
 * The long-form prose is NOT transcribed: the exhibition statement, the reflection
 * printed beside each of the fifteen works, and the three critics' pieces are the
 * artist's and the writers' own authored work. Each field carries a short attributed
 * opening and a marker where the owner pastes the full text. Every component takes any
 * length, so pasting is the only step needed — see docs/routes.md.
 */

export const statement: Localized<TextBlockProps> = {
  bg: {
    heading: "Изложба „А сега накъде?“",
    lead: true,
    paragraphs: [
      // TODO(owner): paste the full statement from the original page here.
      "Чрез един абстрактен и минималистичен образен език анализирам някои морално-етични въпроси, неминуемо спохождащи всекиго от нас във времето.",
      "Произведенията може да видите надолу в страницата.",
    ],
  },
  en: {
    heading: "Exhibition “Where Now?”",
    lead: true,
    paragraphs: [
      // TODO(owner): paste the full statement here, translated.
      "Through an abstract, minimalist visual language I examine some of the moral and ethical questions that inevitably come to each of us in time.",
      "The works are shown further down this page.",
    ],
  },
};

export const films: Localized<VideoGridProps> = {
  bg: {
    heading: "Филми от изложбата",
    note: "За по-добро качество на картината филмите може да се гледат през YouTube на 4К.",
    videos: [
      { id: "LZRvDU8RbqM", title: "Изложба „А сега накъде?“ — филм 1" },
      { id: "iDgOXRWEYg4", title: "Изложба „А сега накъде?“ — филм 2" },
      { id: "yz5nNCMOC4c", title: "Изложба „А сега накъде?“ — филм 3" },
      { id: "z1uax5QLdv8", title: "Изложба „А сега накъде?“ — филм 4" },
    ],
  },
  en: {
    heading: "Films from the exhibition",
    note: "For better picture quality the films can be watched on YouTube in 4K.",
    videos: [
      { id: "LZRvDU8RbqM", title: "Exhibition “Where Now?” — film 1" },
      { id: "iDgOXRWEYg4", title: "Exhibition “Where Now?” — film 2" },
      { id: "yz5nNCMOC4c", title: "Exhibition “Where Now?” — film 3" },
      { id: "z1uax5QLdv8", title: "Exhibition “Where Now?” — film 4" },
    ],
  },
};

export const reviews: Localized<ReviewsProps> = {
  bg: {
    heading: "Рецензии и статии",
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
    heading: "Reviews and articles",
    reviews: [
      {
        author: "Marta Alexieva",
        credit: "Arts manager, Sibelius Academy, Academy of Fine Arts — Helsinki",
        // TODO(owner): paste the full review as further paragraphs.
        excerpt:
          "“Where Now?” is an exhibition of exceptionally high conceptual and aesthetic execution.",
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

export const gallery: BilingualGallery = {
  title: { bg: "Скулптура", en: "Sculpture" },
  noun: { bg: "Скулптура", en: "Sculpture" },
  columns: 2,
  banner: { src: "/assets/Untitled-1.jpg", width: 1920, height: 1080 },
  works: [
    {
      title: { bg: "Сам", en: "Alone" },
      photos: [{ src: "/assets/_DSF2146-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "В очакване на...", en: "Waiting for…" },
      photos: [{ src: "/assets/_DSF2063-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Приятелят", en: "The Friend" },
      photos: [{ src: "/assets/_DSF2133-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Обет", en: "Vow" },
      photos: [{ src: "/assets/_DSF2069-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Дар", en: "Gift" },
      photos: [{ src: "/assets/_DSF2071-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Бащинство", en: "Fatherhood" },
      photos: [{ src: "/assets/_DSF2076-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Майчинство", en: "Motherhood" },
      photos: [{ src: "/assets/_DSF2077-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Причинено добро, непотърсена помощ", en: "Unwanted Gift" },
      photos: [{ src: "/assets/_DSF2127-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "След другите...", en: "After the Others…" },
      photos: [{ src: "/assets/_DSF2087-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Вътрешен конфликт", en: "Inner Conflict" },
      photos: [{ src: "/assets/_DSF2088-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Силният и слабият", en: "The Strong and the Weak" },
      photos: [{ src: "/assets/_DSF2097-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Колебание", en: "Hesitation" },
      photos: [{ src: "/assets/_DSF2098-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Да посмееш да решиш", en: "Daring to Decide" },
      photos: [{ src: "/assets/_DSF2103-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "Отърсване", en: "Shedding" },
      photos: [{ src: "/assets/_DSF2116-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "А сега накъде?", en: "Where Now?" },
      photos: [{ src: "/assets/_DSF2150-Enhanced-NR.jpg", width: 1920, height: 1280 }],
    },
  ],
};
