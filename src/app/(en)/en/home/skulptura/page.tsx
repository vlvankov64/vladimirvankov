import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { gallery } from "@/content/galleries/skulptura";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Sculpture",
  description: "Sculpture by Vladimir Vankov, including the cycle “Where To Now?”.",
  alternates: {
    canonical: "/en/home/skulptura",
    languages: languageAlternates("/home/skulptura"),
  },
};

export default function Page() {
  return <GalleryPage locale="en" gallery={gallery} canonicalHref="/home/skulptura" />;
}
