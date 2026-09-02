import type { Metadata } from "next";
import { NewsPage } from "@/components/pages/NewsPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Новини",
  description: "Новини и публикации от Владимир Ванков.",
  alternates: {
    canonical: "/novini",
    languages: languageAlternates("/novini"),
  },
};

export default function Page() {
  return <NewsPage locale="bg" />;
}
