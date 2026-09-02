import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SITE_URL } from "@/lib/site";
import { ui } from "@/lib/ui";
import "../globals.css";

/*
 * Root layout for the English tree.
 *
 * There are two root layouts, one per locale, because `<html lang>` can only be set in a
 * root layout — a nested one cannot change it. Route groups make that possible: `(bg)`
 * serves the unprefixed Bulgarian routes and `(en)` the `/en` ones, and neither group
 * name appears in a URL. The cost is a full document load when switching language, which
 * is the correct behaviour when the document's language changes.
 *
 * The typefaces are declared in both layouts. `next/font` deduplicates them at build
 * time, so this is one download shared by both trees, not two.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const strings = ui.en;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: strings.siteName,
    template: `%s — ${strings.siteName}`,
  },
  description: strings.siteDescription,
};

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header locale="en" />
        <main className="flex-1">{children}</main>
        <Footer locale="en" />
      </body>
    </html>
  );
}
