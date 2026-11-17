import type { Metadata } from "next";
import { SculpturePage } from "@/components/pages/SculpturePage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sculpture",
  description: "Sculpture by Vladimir Vankov, including the cycle “Where To Now?”.",
  alternates: {
    canonical: "/en/home/skulptura",
    languages: languageAlternates("/home/skulptura"),
  },
};

export default function Page() {
  return <SculpturePage locale="en" />;
}
