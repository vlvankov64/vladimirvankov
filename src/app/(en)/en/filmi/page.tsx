import type { Metadata } from "next";
import { FilmsPage } from "@/components/pages/FilmsPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Movies",
  description: "Films from Vladimir Vankov's exhibition “Where To Now?”.",
  alternates: {
    canonical: "/en/filmi",
    languages: languageAlternates("/filmi"),
  },
};

export default function Page() {
  return <FilmsPage locale="en" />;
}
