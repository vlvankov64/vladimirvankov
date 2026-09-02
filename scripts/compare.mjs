/**
 * Fidelity harness: screenshot the site being cloned and the local rebuild side by
 * side, at three widths, and write an HTML sheet to compare them.
 *
 * Runs inside the Playwright container — invoke it via ./scripts/compare.sh, which
 * reads the target origin from site.config.json and handles the plumbing.
 *
 *   ./scripts/compare.sh                 # every route in scripts/routes.txt
 *   ./scripts/compare.sh /about/vision   # one route
 *   ./scripts/compare.sh /about /news    # several
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

// Playwright is installed in the image at /opt/shots, not in the repo — this file
// lives under the bind-mounted /repo, so a bare `import "playwright"` would resolve
// upward from there and miss it. (NODE_PATH does not apply to ESM.)
const { chromium } = await import(
  process.env.PLAYWRIGHT_MODULE ?? "/opt/shots/node_modules/playwright/index.mjs"
);

const ORIGIN = process.env.ORIGIN;
const LOCAL = process.env.LOCAL ?? "http://web:3000";
const OUT = "reference/compare";

if (!ORIGIN) {
  console.error("ORIGIN is not set — run this through ./scripts/compare.sh.");
  process.exit(1);
}

const WIDTHS = [
  { label: "mobile", width: 390, height: 844 },
  { label: "tablet", width: 834, height: 1112 },
  { label: "desktop", width: 1440, height: 900 },
];

const slug = (route) => (route === "/" ? "index" : route.slice(1).replaceAll("/", "__"));

async function routesToRun() {
  const args = process.argv.slice(2).filter((a) => a.startsWith("/"));
  if (args.length) return args;
  const list = await readFile("scripts/routes.txt", "utf8");
  return list
    .split("\n")
    .map((line) => line.replace(/#.*$/, "").trim())
    .filter(Boolean);
}

/** Screenshot one URL at one viewport. Returns the file path, or null if it failed. */
async function shoot(browser, url, file, { width, height }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    // Freeze animation and lazy-load behaviour so two runs are comparable.
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
    // Scroll to the bottom to trigger every lazy load.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 60);
          else setTimeout(resolve, 300);
        };
        step();
      });
    });

    /*
     * Scrolling only *triggers* the lazy loads — it does not wait for them, and an
     * image caught mid-flight screenshots as an empty box that reads as a layout bug
     * which is not there.
     *
     * Wait while still parked at the bottom: scrolling back to the top first
     * deprioritises the in-flight requests for everything now off-screen, and they
     * can sit unfinished for the whole timeout.
     */
    await page
      .waitForFunction(
        () => Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
        null,
        { timeout: 20_000 },
      )
      .catch(() => console.error(`      ~ ${url} — some images never finished loading`));

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    await page.screenshot({ path: file, fullPage: true });
    return file;
  } catch (err) {
    console.error(`      ! ${url} — ${err.message.split("\n")[0]}`);
    return null;
  } finally {
    await context.close();
  }
}

const html = (results) => `<!doctype html>
<meta charset="utf-8">
<title>${ORIGIN} — original vs rebuild</title>
<style>
  :root { color-scheme: light dark; }
  body { margin:0; padding:24px; font:14px/1.5 ui-sans-serif,system-ui,sans-serif;
         background:#0f172b; color:#e2e8f0; }
  h1 { font-size:18px; margin:0 0 4px; }
  .meta { color:#90a1b9; margin-bottom:28px; }
  section { margin-bottom:56px; }
  h2 { font-size:15px; font-family:ui-monospace,monospace; color:#7dd3fc;
       border-bottom:1px solid #314158; padding-bottom:8px; }
  .row { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
         gap:20px; margin-top:20px; }
  figure { margin:0; }
  figcaption { color:#90a1b9; font-size:12px; margin-bottom:6px;
               font-family:ui-monospace,monospace; }
  .pair { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  img { width:100%; border:1px solid #314158; border-radius:6px; background:#fff;
        vertical-align:top; }
  .missing { display:grid; place-items:center; height:200px; border:1px dashed #82181a;
             border-radius:6px; color:#ff6568; font-size:12px; }
</style>
<h1>${ORIGIN} — original vs rebuild</h1>
<div class="meta">Left: <code>${ORIGIN}</code> &nbsp;·&nbsp; Right: local rebuild &nbsp;·&nbsp; ${results.length} route(s)</div>
${results
  .map(
    (r) => `<section>
  <h2>${r.route}</h2>
  <div class="row">
    ${r.shots
      .map(
        (s) => `<figure>
      <figcaption>${s.label} — ${s.width}px</figcaption>
      <div class="pair">
        ${s.original ? `<img loading="lazy" src="${path.relative(OUT, s.original)}" alt="original">` : `<div class="missing">original failed</div>`}
        ${s.local ? `<img loading="lazy" src="${path.relative(OUT, s.local)}" alt="rebuild">` : `<div class="missing">rebuild failed</div>`}
      </div>
    </figure>`,
      )
      .join("\n")}
  </div>
</section>`,
  )
  .join("\n")}
`;

const routes = await routesToRun();
await mkdir(`${OUT}/shots`, { recursive: true });

const browser = await chromium.launch();
const results = [];

for (const route of routes) {
  console.log(`  ${route}`);
  const shots = [];
  for (const vp of WIDTHS) {
    const base = `${OUT}/shots/${slug(route)}--${vp.label}`;
    const [original, local] = await Promise.all([
      shoot(browser, `${ORIGIN}${route}`, `${base}--original.png`, vp),
      shoot(browser, `${LOCAL}${route}`, `${base}--local.png`, vp),
    ]);
    shots.push({ ...vp, original, local });
  }
  results.push({ route, shots });
}

await browser.close();
await writeFile(`${OUT}/index.html`, html(results));

const failed = results.flatMap((r) => r.shots).filter((s) => !s.original || !s.local).length;
console.log(`\n  Wrote ${OUT}/index.html (${results.length} route(s), ${failed} failed shot(s))`);
