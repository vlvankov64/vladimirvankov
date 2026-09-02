import { BioProfile } from "@/components/sections";
import type { Locale } from "@/lib/i18n";
import { groups, portrait, standfirst } from "@/content/bio";

/** The biography page, shared by both locales. */
export function BioPage({ locale }: { locale: Locale }) {
  return (
    <BioProfile
      portrait={portrait}
      standfirst={standfirst[locale]}
      groups={groups.map((group) => ({
        heading: group.heading[locale],
        items: group.items.map((item) => item[locale]),
      }))}
    />
  );
}
