import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { gallery } from "@/content/galleries/bijuta";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Jewellery",
  description: "Art jewellery by Vladimir Vankov — silver and hand-cast crystals.",
  alternates: {
    canonical: "/en/home/bijuta",
    languages: languageAlternates("/home/bijuta"),
  },
};

export default function Page() {
  return <GalleryPage locale="en" gallery={gallery} canonicalHref="/home/bijuta" />;
}
