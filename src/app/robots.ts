import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/*
 * Allow everything, and point at the sitemap.
 *
 * This is a decision, not a transcription: a marketing site's purpose is to be found,
 * and a clone rarely has an admin area, search results or user content to keep out of
 * an index. Revisit it if the target genuinely needs directives — and treat anything
 * policy-shaped in the original's robots.txt (crawl-delay, AI content signals) as the
 * owner's call rather than something to copy across silently.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
