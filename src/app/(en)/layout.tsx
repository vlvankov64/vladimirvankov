import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { sans } from "@/lib/fonts";
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
 * The typeface is declared once in `src/lib/fonts.ts` and shared by both trees.
 */
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
    <html lang="en" className={`${sans.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header locale="en" />
        <main className="flex-1">{children}</main>
        <Footer locale="en" />
      </body>
    </html>
  );
}
