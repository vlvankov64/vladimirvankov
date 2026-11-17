import type { Metadata } from "next";
import { ReviewsPage } from "@/components/pages/ReviewsPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Рецензии",
  description: "Рецензии и статии за изложбата „А сега накъде?“ на Владимир Ванков.",
  alternates: {
    canonical: "/recenzii",
    languages: languageAlternates("/recenzii"),
  },
};

export default function Page() {
  return <ReviewsPage locale="bg" />;
}
