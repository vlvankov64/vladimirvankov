import type { Metadata } from "next";
import { NewsPage } from "@/components/pages/NewsPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "News",
  description: "News and posts from Vladimir Vankov.",
  alternates: {
    canonical: "/en/novini",
    languages: languageAlternates("/novini"),
  },
};

export default function Page() {
  return <NewsPage locale="en" />;
}
