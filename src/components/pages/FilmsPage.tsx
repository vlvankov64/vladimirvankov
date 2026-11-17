import { PageHeader, VideoGrid } from "@/components/sections";
import type { Locale } from "@/lib/i18n";
import { films, pageTitle } from "@/content/films";

/** The exhibition films, moved off the sculpture page. Both locales. */
export function FilmsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHeader title={pageTitle[locale]} />
      <VideoGrid {...films[locale]} />
    </>
  );
}
