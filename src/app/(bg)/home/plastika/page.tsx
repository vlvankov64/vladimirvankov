import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { gallery } from "@/content/galleries/plastika";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Стъклена пластика",
  description: "Стъклена пластика от Владимир Ванков.",
  alternates: {
    canonical: "/home/plastika",
    languages: languageAlternates("/home/plastika"),
  },
};

export default function Page() {
  return <GalleryPage locale="bg" gallery={gallery} canonicalHref="/home/plastika" />;
}
