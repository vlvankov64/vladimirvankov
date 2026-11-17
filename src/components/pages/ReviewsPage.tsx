import { PageHeader, Reviews } from "@/components/sections";
import type { Locale } from "@/lib/i18n";
import { pageTitle, reviews } from "@/content/reviews";

/** The reviews of the exhibition, moved off the sculpture page. Both locales. */
export function ReviewsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHeader title={pageTitle[locale]} />
      <Reviews {...reviews[locale]} />
    </>
  );
}
