import type { Metadata } from "next";
import { GalleryPage } from "@/components/pages/GalleryPage";
import { gallery } from "@/content/galleries/bijuta";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Бижута",
  description: "Художествена бижутерия от Владимир Ванков — сребро и ръчно отляти кристали.",
  alternates: {
    canonical: "/home/bijuta",
    languages: languageAlternates("/home/bijuta"),
  },
};

export default function Page() {
  return <GalleryPage locale="bg" gallery={gallery} canonicalHref="/home/bijuta" />;
}
