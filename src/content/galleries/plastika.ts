import type { BilingualGallery } from "@/lib/gallery";

/*
 * Bilingual gallery content. Work titles, materials and dimensions are transcribed from
 * the original in Bulgarian; the English column is a translation of those labels, using
 * the exhibition's own English titles where its English-language review supplies them.
 * Dimensions are numbers in the target's notation and are shared by both.
 */
export const gallery: BilingualGallery = {
  title: { bg: "Стъклена пластика", en: "Glass Art" },
  noun: { bg: "Стъклена пластика", en: "Glass work" },
  columns: 3,
  banner: { src: "/assets/DSCF1008.jpg", width: 1280, height: 1280 },
  works: [
    {
      title: { bg: "В КРИСТАЛНОТО МОРЕ (ТРИПТИХ)", en: "IN THE CRYSTAL SEA (TRIPTYCH)" },
      photos: [
        { src: "/assets/DSCF0974.jpg", width: 1163, height: 1163 },
        { src: "/assets/DSCF0966.jpg", width: 1198, height: 1198 },
        // The triptych's third panel — once shown on the next row, under the next title.
        { src: "/assets/DSCF0962.jpg", width: 1246, height: 1246 },
      ],
    },
    {
      title: { bg: "ПРОЗОЧЕТО НА ТАЙНИТЕ", en: "THE WINDOW OF SECRETS" },
      photos: [{ src: "/assets/DSCF1004.jpg", width: 1252, height: 1252 }],
    },
    {
      title: { bg: "ТАЙНАТА НА ОКЕАНА", en: "THE SECRET OF THE OCEAN" },
      photos: [{ src: "/assets/DSCF0992.jpg", width: 1920, height: 1280 }],
    },
    {
      title: { bg: "БЪРЗИ СЪНИЩА", en: "SWIFT DREAMS" },
      photos: [{ src: "/assets/DSCF0977.jpg", width: 1280, height: 1920 }],
    },
    {
      title: { bg: "В ДЪЛБИНИТЕ", en: "IN THE DEPTHS" },
      photos: [{ src: "/assets/DSCF1016.jpg", width: 1280, height: 1280 }],
    },
    {
      title: { bg: "АМЕТИСТОВ ТАЛИСМАН", en: "AMETHYST TALISMAN" },
      photos: [{ src: "/assets/DSCF1008.jpg", width: 1280, height: 1280 }],
    },
    {
      title: { bg: "КРИСТАЛНО ЦВЕТЕ 1", en: "CRYSTAL FLOWER 1" },
      // Photograph swapped with Crystal Flower 8 (now 9) in the owner's revision.
      photos: [{ src: "/assets/DSCF0933.jpg", width: 1280, height: 1920 }],
    },
    {
      title: { bg: "КРИСТАЛНО ЦВЕТЕ 2", en: "CRYSTAL FLOWER 2" },
      photos: [{ src: "/assets/DSCF0932.jpg", width: 1280, height: 1920 }],
    },
    {
      title: { bg: "КРИСТАЛНО ЦВЕТЕ 3", en: "CRYSTAL FLOWER 3" },
      photos: [{ src: "/assets/DSCF0937.jpg", width: 1280, height: 1920 }],
    },
    {
      // Once shown as a second photograph of Crystal Flower 3; a separate work.
      title: { bg: "КРИСТАЛНО ЦВЕТЕ 4", en: "CRYSTAL FLOWER 4" },
      photos: [{ src: "/assets/DSCF0929.jpg", width: 1230, height: 1230 }],
    },
    {
      title: { bg: "КРИСТАЛНО ЦВЕТЕ 5", en: "CRYSTAL FLOWER 5" },
      photos: [{ src: "/assets/DSCF0948.jpg", width: 1239, height: 1239 }],
    },
    {
      title: { bg: "КРИСТАЛНО ЦВЕТЕ 6", en: "CRYSTAL FLOWER 6" },
      photos: [{ src: "/assets/DSCF0951.jpg", width: 1280, height: 1920 }],
    },
    {
      title: { bg: "КРИСТАЛНО ЦВЕТЕ 7", en: "CRYSTAL FLOWER 7" },
      lines: { bg: ["КРИСТАЛНО ЦВЕТЕ 8"], en: ["CRYSTAL FLOWER 8"] },
      photos: [{ src: "/assets/DSCF0945.jpg", width: 1231, height: 1231 }],
    },
    {
      title: { bg: "КРИСТАЛНО ЦВЕТЕ 9", en: "CRYSTAL FLOWER 9" },
      photos: [{ src: "/assets/DSCF0940.jpg", width: 1280, height: 1920 }],
    },
    {
      title: { bg: "НАСТРОЕНИЕ", en: "MOOD" },
      photos: [{ src: "/assets/DSCF0983.jpg", width: 1280, height: 1920 }],
    },
    {
      title: { bg: "ХРУМВАНЕ", en: "A SUDDEN IDEA" },
      photos: [{ src: "/assets/DSCF1021.jpg", width: 1280, height: 1280 }],
    },
  ],
};
