import type { Localized } from "@/lib/i18n";
import type { VideoGridProps } from "@/components/sections";

/*
 * The exhibition films — YouTube embeds, unchanged. They used to sit on the sculpture
 * page; the owner's revision of 2026-11-17 moved them to their own page (/filmi), with
 * only a button left behind on the sculpture page.
 */

export const pageTitle: Localized<string> = { bg: "Филми", en: "Movies" };

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
      { id: "LZRvDU8RbqM", title: "Exhibition “Where To Now?” — film 1" },
      { id: "iDgOXRWEYg4", title: "Exhibition “Where To Now?” — film 2" },
      { id: "yz5nNCMOC4c", title: "Exhibition “Where To Now?” — film 3" },
      { id: "z1uax5QLdv8", title: "Exhibition “Where To Now?” — film 4" },
    ],
  },
};
