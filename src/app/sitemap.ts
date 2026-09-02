import { readFileSync } from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { defaultLocale, localeMeta, locales, localizePath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

/*
 * The route list comes from `scripts/routes.txt`, not from `src/lib/nav.ts`.
 *
 * A cloned site usually has pages reachable only from body copy, absent from every nav —
 * a nav-derived sitemap would silently omit them. routes.txt holds the canonical
 * (unprefixed) paths; each is emitted once per locale, with `alternates.languages` so a
 * crawler can pair the two language versions of a page.
 *
 * Read at build time: a static metadata route with no request-time API, so Next
 * prerenders it during `next build` where scripts/ is present. `./bin/dev prod` is what
 * proves that — the standalone image ships no scripts/.
 */
const ROUTES_FILE = path.join(process.cwd(), "scripts", "routes.txt");

function readRoutes(): string[] {
  const routes = readFileSync(ROUTES_FILE, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  const bad = routes.filter((route) => !route.startsWith("/"));
  if (bad.length > 0) {
    throw new Error(`scripts/routes.txt has entries that are not paths: ${bad.join(", ")}`);
  }
  if (new Set(routes).size !== routes.length) {
    throw new Error("scripts/routes.txt has duplicate entries");
  }

  return routes.length > 0 ? routes : ["/"];
}

const url = (canonical: string, locale: (typeof locales)[number]) =>
  `${SITE_URL}${localizePath(canonical, locale) === "/" ? "" : localizePath(canonical, locale)}`;

export default function sitemap(): MetadataRoute.Sitemap {
  // No `lastModified`, `changeFrequency` or `priority`: a clone has no real modification
  // dates, and a build timestamp on every URL is a worse signal than none.
  return readRoutes().flatMap((canonical) =>
    locales.map((locale) => ({
      url: url(canonical, locale),
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((other) => [localeMeta[other].htmlLang, url(canonical, other)]),
          ["x-default", url(canonical, defaultLocale)],
        ]),
      },
    })),
  );
}
