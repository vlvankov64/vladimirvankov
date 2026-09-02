import type { BilingualGallery } from "@/lib/gallery";

/*
 * Bilingual gallery content. Work titles, materials and dimensions are transcribed from
 * the original in Bulgarian; the English column is a translation of those labels, using
 * the exhibition's own English titles where its English-language review supplies them.
 * Dimensions are numbers in the target's notation and are shared by both.
 */
export const gallery: BilingualGallery = {
  title: { bg: "Картини", en: "Paintings" },
  noun: { bg: "Картина", en: "Painting" },
  columns: 2,
  banner: { src: "/assets/_DSF6488.jpg", width: 1920, height: 1365 },
  works: [
    {
      title: { bg: "ИЗГРЕВ", en: "SUNRISE" },
      lines: {
        bg: ["Свеж, бодър, лек, оптимистичен, нетърпелив, искрящ"],
        en: ["Fresh, brisk, light, optimistic, impatient, sparkling"],
      },
      dimensions: "40 х 40",
      photos: [{ src: "/assets/_DSF6520.jpg", width: 1898, height: 1920 }],
    },
    {
      title: { bg: "ЗАЛЕЗ", en: "SUNSET" },
      lines: {
        bg: ["Ярък, зрял, спокоен, уверен, небързащ, наситен ... и малко тъжен"],
        en: ["Bright, mature, calm, confident, unhurried, saturated … and a little sad"],
      },
      dimensions: "40 х 40",
      photos: [{ src: "/assets/_DSF6524.jpg", width: 1920, height: 1917 }],
    },
    {
      title: { bg: "КЪМ …", en: "TOWARDS …" },
      lines: {
        bg: ["Накъдето и да вървиш все се приближаваш към..."],
        en: ["Wherever you walk, you are always drawing closer to…"],
      },
      dimensions: "64 х 33",
      photos: [{ src: "/assets/_DSF6508.jpg", width: 1920, height: 1379 }],
    },
    {
      title: { bg: "ЗЛАТНИ НЕБЕСА", en: "GOLDEN SKIES" },
      dimensions: "24 Х 18",
      photos: [{ src: "/assets/_DSF6504.jpg", width: 1920, height: 1433 }],
    },
    {
      title: { bg: "НОЩЕН ЕКСТАЗ", en: "NIGHT ECSTASY" },
      lines: {
        bg: ["Като среднощен блус на Гери Муур"],
        en: ["Like a midnight blues by Gary Moore"],
      },
      dimensions: "30 х 25",
      photos: [{ src: "/assets/_DSF6490.jpg", width: 1920, height: 1587 }],
    },
    {
      title: { bg: "НЯКЪДЕ ТАМ, ДЪЛБОКО, ДЪЛБОКО...", en: "SOMEWHERE THERE, DEEP, DEEP…" },
      dimensions: "30 Х 25",
      photos: [{ src: "/assets/_DSF6484.jpg", width: 1920, height: 1564 }],
    },
    {
      title: { bg: "БОЖЕ, КАКВО СЕ СЛУЧВА В МЕН?", en: "GOD, WHAT IS HAPPENING INSIDE ME?" },
      dimensions: "46 х 33",
      photos: [{ src: "/assets/_DSF6488.jpg", width: 1920, height: 1365 }],
    },
    {
      title: { bg: "ТРЪПНА НЕЖНОСТ", en: "TREMBLING TENDERNESS" },
      dimensions: "30 Х 24",
      photos: [
        { src: "/assets/_DSF6493.jpg", width: 1525, height: 1920 },
        { src: "/assets/Radost-v-dushata-40x30.jpg", width: 1147, height: 855 },
      ],
    },
    {
      title: { bg: "РАДОСТ В ДУШАТА", en: "JOY IN THE SOUL" },
      dimensions: "40 х 30",
      photos: [{ src: "/assets/_DSF6505.jpg", width: 1920, height: 1918 }],
    },
    {
      title: { bg: "ИЗБОРЪТ", en: "THE CHOICE" },
      dimensions: "20 х 20",
      photos: [{ src: "/assets/_DSF6513.jpg", width: 1920, height: 1920 }],
    },
    {
      title: { bg: "АЗ, БРЪМБАРЪТ", en: "I, THE BEETLE" },
      lines: {
        bg: ["Да, животът е сложно нещо. Нанъде вървя?"],
        en: ["Yes, life is a complicated thing. Which way am I going?"],
      },
      dimensions: "30 х 30",
      // The original prints this caption with no photograph on the page.
      photos: [],
    },
    {
      title: { bg: "... И МИ Е ЛЕКО, ЛЕКО ...", en: "… AND I FEEL LIGHT, SO LIGHT …" },
      dimensions: "30 Х 24",
      photos: [{ src: "/assets/_DSF6500.jpg", width: 1920, height: 1519 }],
    },
    {
      title: { bg: "САМОТНОТО ЛИСТО", en: "THE LONELY LEAF" },
      lines: { bg: ["Първо или последно?"], en: ["First or last?"] },
      dimensions: "63 х 52",
      photos: [{ src: "/assets/_DSF6533.jpg", width: 1920, height: 1595 }],
    },
  ],
};
