import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Self-hosted in a container: emit a minimal server bundle for the runner stage.
   *
   * Vercel builds its own output and never runs `node server.js`, so the option is
   * skipped there rather than left to be ignored. `VERCEL` is set to "1" on every
   * Vercel build; locally and in Docker it is unset and the standalone bundle that
   * `./bin/dev prod` depends on is emitted as before.
   */
  output: process.env.VERCEL ? undefined : "standalone",

  /*
   * `sitemap.ts` reads scripts/routes.txt from the project root. It is a fully static
   * route — prerendered at build, where the file is present — so this include is a
   * no-op today (Next skips routes with no server trace). It is here so that if the
   * sitemap ever gains a request-time API and becomes a function, the file it reads
   * ships with it instead of 500-ing on the first request.
   */
  outputFileTracingIncludes: {
    "/sitemap.xml": ["./scripts/routes.txt"],
  },

  images: {
    // Scraped media tends to be enormous and unoptimised; next/image re-encodes to
    // these formats at request time.
    formats: ["image/avif", "image/webp"],
  },

  /*
   * The target serves no redirects of its own, but it does serve two duplicate URLs:
   * /home returns the same page as /, and /bio-1 the same page as /bio (both 200, see
   * docs/routes.md). Those are live URLs, so they redirect here rather than 404 —
   * one canonical page per address, without dropping an address.
   */
  redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/bio-1", destination: "/bio", permanent: true },
    ];
  },
};

export default nextConfig;
