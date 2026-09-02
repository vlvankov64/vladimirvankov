import type { Metadata } from "next";
import { PostPage } from "@/components/pages/PostPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "News",
  description: "A post from Vladimir Vankov.",
  alternates: {
    canonical: "/en/novini/qqqqqq",
    languages: languageAlternates("/novini/qqqqqq"),
  },
};

export default function Page() {
  return <PostPage locale="en" index={1} />;
}
