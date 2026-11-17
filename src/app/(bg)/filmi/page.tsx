import type { Metadata } from "next";
import { FilmsPage } from "@/components/pages/FilmsPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Филми",
  description: "Филми от изложбата „А сега накъде?“ на Владимир Ванков.",
  alternates: {
    canonical: "/filmi",
    languages: languageAlternates("/filmi"),
  },
};

export default function Page() {
  return <FilmsPage locale="bg" />;
}
