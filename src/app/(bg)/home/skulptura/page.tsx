import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { gallery } from "@/content/galleries/skulptura";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Скулптура",
  description: "Скулптура от Владимир Ванков, включително цикълът „А сега накъде?“.",
  alternates: {
    canonical: "/home/skulptura",
    languages: languageAlternates("/home/skulptura"),
  },
};

export default function Page() {
  return <GalleryPage locale="bg" gallery={gallery} canonicalHref="/home/skulptura" />;
}
