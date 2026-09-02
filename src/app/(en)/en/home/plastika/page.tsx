import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { gallery } from "@/content/galleries/plastika";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Glass Art",
  description: "Glass sculpture by Vladimir Vankov.",
  alternates: {
    canonical: "/en/home/plastika",
    languages: languageAlternates("/home/plastika"),
  },
};

export default function Page() {
  return <GalleryPage locale="en" gallery={gallery} canonicalHref="/home/plastika" />;
}
