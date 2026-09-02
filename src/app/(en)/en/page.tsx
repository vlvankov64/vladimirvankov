import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  description: "Vladimir Vankov works in sculpture, art jewellery, glass sculpture and painting.",
  alternates: {
    canonical: "/en",
    languages: languageAlternates("/"),
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
