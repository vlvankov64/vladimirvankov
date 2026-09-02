import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { gallery } from "@/content/galleries/kartini";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Paintings",
  description: "Paintings by Vladimir Vankov.",
  alternates: {
    canonical: "/en/home/kartini",
    languages: languageAlternates("/home/kartini"),
  },
};

export default function Page() {
  return <GalleryPage locale="en" gallery={gallery} canonicalHref="/home/kartini" />;
}
