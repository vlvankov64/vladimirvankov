import type { Metadata } from "next";
import { BioPage } from "@/components/pages/BioPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Биография",
  description: "Биография на Владимир Ванков — професионален опит, образование и изложби.",
  alternates: {
    canonical: "/bio",
    languages: languageAlternates("/bio"),
  },
};

export default function Page() {
  return <BioPage locale="bg" />;
}
