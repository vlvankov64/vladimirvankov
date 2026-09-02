import type { Metadata } from "next";
import { PostPage } from "@/components/pages/PostPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Новини",
  description: "Публикация от Владимир Ванков.",
  alternates: {
    canonical: "/novini/qqqqqq",
    languages: languageAlternates("/novini/qqqqqq"),
  },
};

export default function Page() {
  return <PostPage locale="bg" index={1} />;
}
