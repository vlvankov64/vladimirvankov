import { Montserrat } from "next/font/google";

/**
 * The site's one typeface, shared by both root layouts.
 *
 * Montserrat: a clean, highly legible sans with a full Cyrillic subset — the earlier
 * Poppins had none, so Bulgarian text silently fell back to the system font. Headings
 * and body use the same family and differ by size and weight only.
 *
 * Declared once here rather than in each layout; `next/font` deduplicates either way,
 * but one declaration cannot drift.
 */
export const sans = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});
