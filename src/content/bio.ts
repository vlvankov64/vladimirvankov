import type { Localized } from "@/lib/i18n";
import type { BioItem } from "@/components/sections";

/*
 * The biography, as the owner supplied it in both languages in the revision of
 * 2026-11-17 (2) ("Биография и изложби до 05_2026"). It replaces the text transcribed
 * from the original site.
 *
 * Transcribed verbatim, with whitespace normalised and only obvious slips corrected
 * ("Оновател", stray spaces before commas and inside quotes, a missing comma). The
 * document's own headings (ИЗЛОЖБИ, МЕЖДУНАРОДНИ ИЗЛОЖБИ, ГРУПОВИ ИЗЛОЖБИ) become the
 * group headings; "Образование" and "Професионален опит" are ours, grouping the
 * document's lines in their own order so the record can be scanned.
 */

export const name: Localized<string> = {
  bg: "Владимир Ванчев Ванков",
  en: "Vladimir Vanchev Vankov",
};

export const portrait = {
  src: "/assets/_DSF6411.jpg",
  alt: "Владимир Ванков",
  width: 1333,
  height: 2000,
};

export const standfirst: Localized<string> = {
  bg: "Художник на свободна практика с интереси в областта на скулптурата, художествената бижутерия, стъклената пластика и живописта.",
  en: "A freelance artist with interests in sculpture, fine arts, art glass and art jewellery.",
};

export const groups: { heading?: Localized<string>; items: Localized<BioItem>[] }[] = [
  {
    items: [
      {
        bg: "Роден на 10 юли 1964 г. в гр. Варна",
        en: "Born on July 10, 1964, in Varna",
      },
    ],
  },
  {
    heading: { bg: "Образование", en: "Education" },
    items: [
      {
        bg: "Средно образование завършва в родния си град.",
        en: "Graduated high school in his hometown - Varna",
      },
      {
        bg: "Висше образование завършва в СУ Климент Охридски специалност „Информатика“, специализация „Компютърна графика“ - 1991 г.",
        en: "Graduate of St. Kliment Okhridski Sofia University, Major: Informatics, Specialty Computer Graphics, in 1991.",
      },
      {
        bg: "Майстор от Задруга на майсторите на народните художествени занаяти – художествена изработка на накити – 2011 г.",
        en: "Earned the title Master of the Co-operative of Masters of Arts and Crafts for artistic jewelry in 2011.",
      },
      {
        bg: "Майстор от Национална занаятчийска камара – „Медийна техника и медиен дизайн“ – 2009 г.",
        en: "A Master of the National Chamber of Crafts, in Media Technology and Media Design in 2009.",
      },
    ],
  },
  {
    heading: { bg: "Професионален опит", en: "Professional experience" },
    items: [
      {
        bg: "Основател, управител, дизайнер и технолог на ДИЗАЙН ЕООД - от 1994 до 2013 г. – компания, специализирана в художествено и рекламно стъкло и керамика, печатала декори на голяма част от заводите и ателиетата за стъкло, порцелан, керамика и емайл : „Китка“ – Нови пазар, „Изида“ – Елин Пелин, „Диамант“ – Разград, „Бонония“ – Видин, „Купроемайл“ – Шумен, „Битова техника“ – Добрич, „Лебед“ – Нови пазар и голям брой частни ателиета, изработвала художествено стъкло за износ за Нидерландия и Франция.",
        en: "Founder of DESIGN Ltd, Manager, Designer and Production Engineer thereof, from 1994 to 2013. DESIGN Ltd was a company that specialised in art and advertising glass and ceramics products, featuring in its portfolio the décor of a major part of the glass, porcelain, ceramics, and enamel products plants and ateliers in Bulgaria, as well as of a number of private workshops. The company also created art glass products exported to the Netherlands and France.",
      },
      {
        bg: "Основател, управител, дизайнер и технолог на АЙРИС ЕООД - от 1996 до момента - компания, специализирана в сферата на художествения и рекламен печат, както и в организиране и участия в събития в сферата на културата, вписана като Културна организация в регистъра на Министерството на културата.",
        en: "Founder of IRIS Ltd, Manager, Designer and Production Engineer thereof since 1996. The company specializes in artistic and advertising print, as well as in organizing and participating in culture related events, registered as a Cultural Organization in the register of the Ministry of Culture of the Republic of Bulgaria.",
      },
    ],
  },
  {
    heading: { bg: "Изложби", en: "Exhibitions" },
    items: [
      {
        bg: "Самостоятелна изложба ИЗ ДНЕВНИКА НА ЕВАФРОДИТА - София, Галерия 158, 12.2025",
        en: "Solo exhibition FROM EVAPHRODITE’S DIARY - Sofia, Gallery 158, 12.2025",
      },
      {
        bg: {
          text: "Самостоятелна изложба А СЕГА НАКЪДЕ?",
          details: [
            "София, Галерия 158, 09.2024",
            "Дупница, Градска галерия, 11.2024",
            "Ловеч, Градска галерия „Теофан Сокеров“, 05-06.2025",
            "Варна, Галерия Радио Варна, 07.2025",
          ],
        },
        en: {
          text: "Solo exhibition WHERE TO NOW?",
          details: [
            "Sofia, Gallery 158, 09.2024",
            "Dupnitsa, City gallery, 11.2024",
            "Lovech, City gallery “Teophan Sokerov”, 05-06.2025",
            "Varna, Radio Varna gallery, 07.2025",
          ],
        },
      },
      {
        bg: "Самостоятелна изложба ПРОЗОРЧЕТО НА ТАЙНИТЕ – Дупница, Градска галерия „Околийска къща“ 09.2013 г.",
        en: "Solo Exhibition THE FENESTELLA OF SECRETS – Dupnitsa, District House City Gallery, September, 2013",
      },
    ],
  },
  {
    heading: { bg: "Международни изложби", en: "International exhibitions" },
    items: [
      {
        bg: "Venice International Art Fair 2026, Венеция, Италия, Palazzo Albrizzi-Capello, 04.2026 – участие",
        en: "Venice International Art Fair 2026, Venezia, Italy Palazzo Albrizzi-Capello, 04.2026 - Participation",
      },
      {
        bg: "Международна изложба Stories of identity II, Културния хипогеум на Италианската военноморска лига, секция Матера-Магна Греция, Матера, Италия, под патронажа на община Матера, Италианската военноморска лига и Ambiente Basilicata – 06-07.2025 – участие",
        en: "Stories of identity II, Cultural Hypogeum of the Italian Naval League, Matera-Magna Grecia Section, Matera, Italy, under the patronage of the Municipality of Matera, the Italian Naval League and Ambiente Basilicata – 06-07.2025 – Participation",
      },
      {
        bg: "Коледна изложба в галерия VIVA ART – Виена – 2015 – участие",
        en: "Christmas exhibition VIVA ART Gallery – Vienna – 2015 – Participation",
      },
    ],
  },
  {
    heading: { bg: "Групови изложби", en: "Group exhibitions" },
    items: [
      {
        bg: "Необикновената градина - 2026 – галерия Папийон Варна - участие",
        en: "Unusual Garden – 2026 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Полифония - 2025 – галерия Папийон Варна - участие",
        en: "Polyphony - 2025 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Пътуващи пейзажи - 2024 – галерия Папийон Варна - участие",
        en: "Travelling Landscapes - 2024 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Обособени реалности - 2023 – галерия Папийон Варна - участие",
        en: "Distinct Realities - 2023 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Хибридни обекти - 2022 – галерия Папийон Варна - участие",
        en: "Hybrid Objects - 2022 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "365 преживявания - 2021 – галерия Папийон Варна - участие",
        en: "365 Encounters - 2021 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Огледални образи - 2020 – галерия Папийон Варна - участие",
        en: "Mirror Images - 2020 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Близо и далеч - 2019 – галерия Папийон Варна - участие",
        en: "Near and Far - 2019 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Игри на баланс - 2018 – галерия Папийон Варна - участие",
        en: "Balance Games - 2018 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Резонанс - 2017 – галерия Папийон Варна - участие",
        en: "Resonance - 2017 – Le Papillon Gallery, Varna – Participation",
      },
      {
        bg: "Гравитиращи обекти - 2016 – галерия Папийон Варна - участие",
        en: "Gravitated objects - 2016 – Le Papillon Gallery, Varna – Participation",
      },
    ],
  },
  {
    items: [
      {
        bg: "Негови произведения са в частни колекции в България, Великобритания, Австрия, Белгия, Дания, Германия, Русия, Украйна, Япония, САЩ, Канада.",
        en: "His works are in private collections in Bulgaria, Great Britain, Austria, Belgium, Denmark, Germany, Russia, Ukraine, Japan, USA, Canada.",
      },
    ],
  },
];
