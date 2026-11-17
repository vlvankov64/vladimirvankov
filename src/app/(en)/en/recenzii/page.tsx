import type { Metadata } from "next";
import { ReviewsPage } from "@/components/pages/ReviewsPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Reviews and articles on Vladimir Vankov's exhibition “Where To Now?”.",
  alternates: {
    canonical: "/en/recenzii",
    languages: languageAlternates("/recenzii"),
  },
};

export default function Page() {
  return <ReviewsPage locale="en" />;
}
