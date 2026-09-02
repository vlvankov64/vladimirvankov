import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  description:
    "Владимир Ванков работи в областта на скулптурата, художествената бижутерия, стъклената пластика и живописта.",
  alternates: {
    canonical: "/",
    languages: languageAlternates("/"),
  },
};

export default function Page() {
  return <HomePage locale="bg" />;
}
