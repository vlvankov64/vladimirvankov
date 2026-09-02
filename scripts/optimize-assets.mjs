/**
 * Downscale and recompress everything in public/, in place.
 *
 *   ./bin/dev optimize                 # defaults: 2000px longest edge, JPEG q80
 *   ./bin/dev optimize --max 2600      # different cap
 *   ./bin/dev optimize --quality 85
 *   ./bin/dev optimize --dry-run
 *
 * Why this exists: scraped media is sized for whatever the original's CDN felt like,
 * routinely 3–20× larger than any layout uses. `next/image` re-encodes at request time,
 * but it still has to read, decode and store those originals, and they are committed to
 * the repo — so the source files are worth fixing once, here.
 *
 * What it does per raster image: strips metadata, resizes so the longest edge is at most
 * --max (never upscales), then re-encodes — mozjpeg for JPEG, palette-quantised PNG,
 * effort-6 WebP. Rewrites the file only when the result is actually smaller, so a
 * well-optimised source is left alone rather than degraded.
 *
 * Idempotent: `scripts/assets-optimized.json` records the byte size this script produced
 * for each file, and a file whose size still matches is skipped. Re-download a file and it
 * gets processed again.
 */
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : Number(args[i + 1]);
};
const MAX = flag("max", 2000);
const QUALITY = flag("quality", 80);
const DRY = args.includes("--dry-run");
const MANIFEST = "scripts/assets-optimized.json";
const HANDLED = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name !== ".gitkeep") out.push(full);
  }
  return out;
}

const human = (b) =>
  b >= 1048576 ? `${(b / 1048576).toFixed(1)} MB` : `${Math.round(b / 1024)} KB`;

let manifest = {};
try {
  manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
} catch {
  /* first run */
}

const files = (await walk("public")).sort();
let before = 0;
let after = 0;
let touched = 0;
let skipped = 0;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  const { size } = await stat(file);

  if (!HANDLED.has(ext)) {
    before += size;
    after += size;
    continue;
  }
  if (manifest[file] === size) {
    before += size;
    after += size;
    skipped++;
    continue;
  }

  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

  let pipeline = sharp(input).rotate(); // honour EXIF orientation before stripping it
  if (longest > MAX) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX : undefined,
      height: meta.height > meta.width ? MAX : undefined,
      withoutEnlargement: true,
    });
  }
  if (ext === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9, palette: true });
  } else if (ext === ".webp") {
    pipeline = pipeline.webp({ quality: QUALITY, effort: 6 });
  } else {
    pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true });
  }

  const output = await pipeline.toBuffer();
  const outMeta = await sharp(output).metadata();
  const shrank = output.length < size;

  before += size;
  after += shrank ? output.length : size;

  const label = `${meta.width}×${meta.height}`;
  if (!shrank) {
    console.log(`  keep  ${human(size).padStart(8)}  ${label.padEnd(11)} ${file}`);
    manifest[file] = size;
    continue;
  }

  console.log(
    `  ${DRY ? "would" : "write"} ${human(output.length).padStart(8)}  ` +
      `${`${outMeta.width}×${outMeta.height}`.padEnd(11)} ${file} ` +
      `(was ${human(size)} ${label}, −${Math.round((1 - output.length / size) * 100)}%)`,
  );
  if (!DRY) {
    await writeFile(file, output);
    manifest[file] = output.length;
  }
  touched++;
}

if (!DRY) {
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
}

console.log(
  `\n  ${files.length} files · ${touched} rewritten · ${skipped} already optimised\n` +
    `  ${human(before)} → ${human(after)} (−${before ? Math.round((1 - after / before) * 100) : 0}%)` +
    `${DRY ? "  [dry run, nothing written]" : ""}`,
);
