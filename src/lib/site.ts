/**
 * Site-level constants, read from `site.config.json` at the repo root.
 *
 * That file is the one place the framework is pointed at a target: the same values
 * drive `layout.tsx`'s metadata, `sitemap.ts`, `robots.ts` and the scraping scripts
 * (`scripts/snapshot.sh`, `scripts/fetch-assets.sh`, `scripts/compare.sh`), so there
 * is nothing to keep in sync by hand.
 */
import config from "../../site.config.json";

/** Origin of the site being cloned — what the scrape and the compare sheet read from. */
export const ORIGIN = config.origin;

/** Canonical origin of *this* rebuild, no trailing slash. */
export const SITE_URL = config.siteUrl;

/** Display name, used in the header, the footer and the metadata title template. */
export const SITE_NAME = config.title;

/** Default meta description, used for any route that does not set its own. */
export const SITE_DESCRIPTION = config.description;
