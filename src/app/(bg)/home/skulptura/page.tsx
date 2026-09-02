import type { Metadata } from "next";
import { SculpturePage } from "@/components/pages/SculpturePage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Скулптура",
  description: "Изложбата „А сега накъде?“ — скулптура от Владимир Ванков.",
  alternates: {
    canonical: "/home/skulptura",
    languages: languageAlternates("/home/skulptura"),
  },
};

export default function Page() {
  return <SculpturePage locale="bg" />;
}
