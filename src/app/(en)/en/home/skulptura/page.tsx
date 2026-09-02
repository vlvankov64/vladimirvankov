import type { Metadata } from "next";
import { SculpturePage } from "@/components/pages/SculpturePage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sculpture",
  description: "The exhibition “Where Now?” — sculpture by Vladimir Vankov.",
  alternates: {
    canonical: "/en/home/skulptura",
    languages: languageAlternates("/home/skulptura"),
  },
};

export default function Page() {
  return <SculpturePage locale="en" />;
}
