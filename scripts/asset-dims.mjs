/**
 * Print a markdown table of everything in public/: size, intrinsic dimensions, and how
 * many snapshots reference it. Paste the output into docs/assets.md.
 *
 * Runs in the container (the host has no Node):
 *
 *   ./bin/dev dims
 *
 * The reference count needs `reference/raw/` to be populated — run ./scripts/snapshot.sh
 * first, or ignore that column.
 */
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".tiff"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name !== ".gitkeep") out.push(full);
  }
  return out;
}

async function snapshots() {
  try {
    const files = await readdir("reference/raw");
    return await Promise.all(
      files.filter((f) => f.endsWith(".html")).map((f) => readFile(`reference/raw/${f}`, "utf8")),
    );
  } catch {
    return [];
  }
}

const human = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;

const files = (await walk("public")).sort();
const pages = await snapshots();

const rows = [];
for (const file of files) {
  const url = `/${path.relative("public", file)}`;
  const { size } = await stat(file);

  let dimensions = "—";
  if (RASTER.has(path.extname(file).toLowerCase())) {
    try {
      const meta = await sharp(file).metadata();
      dimensions = `${meta.width}×${meta.height}`;
    } catch {
      dimensions = "unreadable";
    }
  }

  /*
   * Count by basename, not by full path: when the target serves its media from an image
   * CDN the snapshots cite absolute CDN URLs, and matching the local `/assets/...` path
   * would report zero references for every file.
   */
  const base = path.basename(file);
  rows.push({
    url,
    size,
    dimensions,
    refs: pages.filter((html) => html.includes(url) || html.includes(base)).length,
  });
}

rows.sort((a, b) => b.size - a.size);

console.log("| File | Size | Dimensions | Pages |");
console.log("| ---- | ---: | ---------- | ----: |");
for (const r of rows) {
  console.log(`| \`${r.url}\` | ${human(r.size)} | ${r.dimensions} | ${r.refs} |`);
}
console.log(`\n${rows.length} files, ${human(rows.reduce((sum, r) => sum + r.size, 0))} total`);
if (pages.length === 0) {
  console.log("(no snapshots in reference/raw/ — the Pages column is all zeroes)");
}
