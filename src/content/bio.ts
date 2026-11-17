import type { Localized } from "@/lib/i18n";

/*
 * The biography: career, education and the exhibition record.
 *
 * The Bulgarian column is transcribed from the original verbatim, including its own
 * punctuation and date formats. The English column is a translation of the same factual
 * record; company, gallery and place names are kept, and exhibition titles use the
 * English forms the site itself uses where it has one (Where To Now?).
 *
 * The original prints all of it as one undivided column of paragraphs. The headings are
 * ours — the original's own inline "Образование:" and "Изложби:" labels promoted to real
 * headings so the record can be scanned. No line was reworded, reordered or dropped.
 */

export const portrait = {
  src: "/assets/_DSF6411.jpg",
  alt: "Владимир Ванков",
  width: 1333,
  height: 2000,
};

export const standfirst: Localized<string> = {
  bg: "Владимир Ванков е художник на свободна практика с интереси в областта на скулптурата, художествената бижутерия, стъклената пластика и живописта.",
  en: "Vladimir Vankov is a freelance artist whose work spans sculpture, art jewellery, glass sculpture and painting.",
};

export const groups: { heading: Localized<string>; items: Localized<string>[] }[] = [
  {
    heading: { bg: "Професионален опит", en: "Professional experience" },
    items: [
      {
        bg: "Управител, дизайнер и технолог на АЙРИС ЕООД - 1996 до момента - художествен и рекламен печат, организиране и участия в събития в сферата на културата.",
        en: "Manager, designer and production technologist at IRIS Ltd — 1996 to present — fine-art and commercial printing, organising and taking part in cultural events.",
      },
      {
        bg: "Управител, дизайнер и технолог на ДИЗАЙН ЕООД - 1994 – 2011 – специализирано в художествени и рекламни стъкло и керамика, печатало декори на голяма част от заводите и ателиета за стъкло, порцелан, керамика и емайл : “Китка” – Нови пазар, “Изида” – Елин Пелин, “Диамант” – Разград, “Бонония” – Видин, “Купроемайл” – Шумен, “Битова техника” – Добрич, “Лебед” – Нови пазар и голям брой частни ателиета, изработвало художествено стъкло за износ за Нидерландия и Франция.",
        en: "Manager, designer and production technologist at DIZAYN Ltd — 1994–2011 — specialising in fine-art and commercial glass and ceramics; printed decoration for a large share of the country's glass, porcelain, ceramic and enamel factories and studios: “Kitka” — Novi Pazar, “Izida” — Elin Pelin, “Diamant” — Razgrad, “Bononia” — Vidin, “Kuproemail” — Shumen, “Bitova Tehnika” — Dobrich, “Lebed” — Novi Pazar, and a large number of private studios; produced art glass for export to the Netherlands and France.",
      },
      {
        bg: "Управител, дизайнер и технолог в РЕВЕРК ПРИНТ - 2011 – 2020 - художествен и рекламен печат по широк набор от технологии.",
        en: "Manager, designer and production technologist at REVERK PRINT — 2011–2020 — fine-art and commercial printing across a wide range of technologies.",
      },
    ],
  },
  {
    heading: { bg: "Образование", en: "Education" },
    items: [
      {
        bg: "СУ “ Св. Климент Охридски” със специалност „Информатика“, специализация „Компютърна графика“ - 1991",
        en: "Sofia University “St. Kliment Ohridski”, degree in Informatics, specialising in Computer Graphics — 1991",
      },
      {
        bg: "Майстор от Задруга на майсторите на народните художествени занаяти – Художествена изработка на накити – 2011",
        en: "Master craftsman, Guild of Master Craftsmen of Folk Arts and Crafts — artistic jewellery making — 2011",
      },
      {
        bg: "Майстор от Национална занаятчийска камара – „Медийна техника и медиен дизайн“ – 2009",
        en: "Master craftsman, National Chamber of Crafts — “Media technology and media design” — 2009",
      },
    ],
  },
  {
    heading: { bg: "Изложби", en: "Exhibitions" },
    items: [
      {
        bg: "Самостоятелна изложба А сега накъде ? - 10.2024 - галерия 158 София",
        en: "Solo exhibition Where To Now? — 10.2024 — Gallery 158, Sofia",
      },
      {
        bg: "Пътуващи пейзажи - 2024 – галерия Папийон Варна - участие",
        en: "Travelling Landscapes — 2024 — Papillon Gallery, Varna — group show",
      },
      {
        bg: "Обособени реалности - 2023 – галерия Папийон Варна - участие",
        en: "Distinct Realities — 2023 — Papillon Gallery, Varna — group show",
      },
      {
        bg: "Хибридни обекти - 2022 – галерия Папийон Варна - участие",
        en: "Hybrid Objects — 2022 — Papillon Gallery, Varna — group show",
      },
      {
        bg: "365 преживявания - 2021 – галерия Папийон Варна - участие",
        en: "365 Experiences — 2021 — Papillon Gallery, Varna — group show",
      },
      {
        bg: "Огледални образи - 2020 – галерия Папийон Варна - участие",
        en: "Mirror Images — 2020 — Papillon Gallery, Varna — group show",
      },
      {
        bg: "Близо и далеч - 2019 – галерия Папийон Варна - участие",
        en: "Near and Far — 2019 — Papillon Gallery, Varna — group show",
      },
      {
        bg: "Игри на баланс - 2018 – галерия Папийон Варна - участие",
        en: "Games of Balance — 2018 — Papillon Gallery, Varna — group show",
      },
      {
        bg: "Резонанс - 2017 – галерия Папийон Варна - участие",
        en: "Resonance — 2017 — Papillon Gallery, Varna — group show",
      },
      {
        bg: "Коледна изложба в галерия VIVA ART – Виена – 2015 – участие",
        en: "Christmas exhibition at VIVA ART Gallery — Vienna — 2015 — group show",
      },
      {
        bg: "Самостоятелна изложба Прозорчето на тайните - Дупница галерия Околийска къща 09.2013 г.",
        en: "Solo exhibition The Window of Secrets — Okoliyska Kashta Gallery, Dupnitsa — 09.2013",
      },
      {
        bg: "Негови произведения за в частни колекции в България, Великобритания, Австрия, Белгия, Германия, Дания, Русия, Украйна, Япония, САЩ, Канада.",
        en: "His works are held in private collections in Bulgaria, the United Kingdom, Austria, Belgium, Germany, Denmark, Russia, Ukraine, Japan, the USA and Canada.",
      },
    ],
  },
];
