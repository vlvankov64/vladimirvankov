import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { gallery } from "@/content/galleries/kartini";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Картини",
  description: "Живопис от Владимир Ванков.",
  alternates: {
    canonical: "/home/kartini",
    languages: languageAlternates("/home/kartini"),
  },
};

export default function Page() {
  return <GalleryPage locale="bg" gallery={gallery} canonicalHref="/home/kartini" />;
}
