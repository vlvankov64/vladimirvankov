import type { Metadata } from "next";
import { BioPage } from "@/components/pages/BioPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Biography",
  description: "Biography of Vladimir Vankov — career, education and exhibitions.",
  alternates: {
    canonical: "/en/bio",
    languages: languageAlternates("/bio"),
  },
};

export default function Page() {
  return <BioPage locale="en" />;
}
