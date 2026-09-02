# Asset manifest

Every media file the rebuild ships, mirrored into `public/assets/` and committed — unlike the HTML
snapshots, these are what the site actually serves.

## This target

A Squarespace site: **every** image is served from `images.squarespace-cdn.com`, so
`scripts/assets.txt` holds absolute URLs rather than same-origin paths, and each is saved to
`public/assets/<basename>`. The `?format=2500w` query on each line selects the CDN's largest sensible
rendition; `scripts/fetch-assets.sh` strips it from the local filename.

**81 files, 15.9 MB** after optimisation (22.0 MB as downloaded, −28%). Four more were downloaded and then retired — see "Retired assets" below. No videos, no PDFs — the four
exhibition films are YouTube embeds, not hosted files.

## Deriving the list

```bash
grep -ohE 'data-src="(https://images\.squarespace-cdn\.com/[^"]+)"' reference/raw/*.html \
  | sed 's/data-src="//;s/"$//' | cut -d'?' -f1 | sort -u
```

**Check which prefixes the target actually uses before trusting any pattern.** Find them with:

```bash
grep -ohE '(src|data-src)="https?://[a-z0-9.-]+/' reference/raw/*.html | sort | uniq -c | sort -rn
```

Then fetch and tabulate:

```bash
./scripts/fetch-assets.sh     # → public/assets/
./bin/dev optimize            # downscale + recompress in place
./bin/dev dims                # regenerate the table below
```

## Optimisation applied

`./bin/dev optimize` with its defaults: longest edge capped at **2000 px**, JPEG re-encoded with
mozjpeg at q80 progressive, metadata stripped, EXIF orientation baked in first. Files that were
already smaller than the re-encode were left untouched rather than degraded — 13 of them.

Two source files were 4000×2667 camera originals; both are now 2000 px. Everything else arrived at
1920 px or below, which is why the saving is compression rather than resizing.

`scripts/assets-optimized.json` records the produced size per file, so re-running is a no-op and a
re-downloaded file is processed again.

## Largest files

Regenerate with `./bin/dev dims`. `Pages` counts how many snapshots reference the file.

| `/assets/_DSF6484.jpg` | 914 KB | 1920×1564 | 1 |
| `/assets/_DSF6513.jpg` | 903 KB | 1920×1920 | 1 |
| `/assets/_DSF6490.jpg` | 869 KB | 1920×1587 | 1 |
| `/assets/_DSF6533.jpg` | 780 KB | 1920×1595 | 1 |
| `/assets/_DSF6520.jpg` | 750 KB | 1898×1920 | 1 |
| `/assets/_DSF6505.jpg` | 747 KB | 1920×1918 | 1 |
| `/assets/_DSF6524.jpg` | 627 KB | 1920×1917 | 1 |
| `/assets/_DSF6508.jpg` | 563 KB | 1920×1379 | 1 |
| `/assets/_DSF6493.jpg` | 491 KB | 1525×1920 | 1 |
| `/assets/_DSF6504.jpg` | 478 KB | 1920×1433 | 1 |
| `/assets/_DSF6488.jpg` | 472 KB | 1920×1365 | 1 |
| `/assets/_DSF1901-Enhanced-NR.jpg` | 368 KB | 2000×1334 | 1 |
| `/assets/_DSF6500.jpg` | 354 KB | 1920×1519 | 1 |
| `/assets/_DSF1926-Enhanced-NR.jpg` | 350 KB | 2000×1334 | 1 |
| `/assets/DSCF1066.jpg` | 243 KB | 1920×1280 | 1 |

## Traps found in this target

- **Percent-encoded and space-bearing filenames.** One source is `signature-%283%29.png`. The
  fetcher decodes and then reduces CDN basenames to URL-safe characters (`signature-3.png`) — the
  local name is ours to choose for a CDN-hosted file, and a `%28` inside an `<Image src>` is a trap.
  This is _not_ done for same-origin paths, where the path must stay byte-identical to the target's.
- **The banner is reused as an artwork photograph.** On three of the four galleries the page's lead
  image appears again in the body. The extractor removes the first image in document order (the
  banner, rendered by `PageHeader`) and leaves the body occurrence, which is why generated counts sit
  one below the distinct-URL count on those pages.
- **The reference count needs basenames, not paths.** Snapshots cite CDN URLs, so matching the local
  `/assets/...` path reports zero for everything; `scripts/asset-dims.mjs` matches on basename too.
- **`data-image-dimensions` is the CDN's, not the file's.** Squarespace prints intrinsic dimensions
  in the markup, which is convenient — but after `./bin/dev optimize` they are stale. The dimensions
  in `content.ts` were read from the optimised files on disk, which is what `next/image` needs.
- **No `alt` text anywhere in the original.** Every `alt` in the rebuild was written for it, from the
  work's own title (`Бижу „SEA DREAMS“`, detail shots suffixed `(детайл)`).

## Retired assets

The original's four home-page category cards (`1.jpg`–`4.jpg`) are **not shipped**. Each is a
bespoke composition with the discipline name burned into the JPEG in Bulgarian: fine for a
monolingual site, but impossible to translate, and a rendered label placed over one collides with
the printed one.

No clean version of them exists in the target's media. That was checked rather than assumed —
every one of the 84 files was compared against all four by colour histogram and by coarse
structure outside the title band, first across the whole set and then within each card's own
gallery. The closest candidate scored far from a match, and the sculpture card matched nothing in
the sculpture gallery at all: those images are renders on flat grey, while the gallery photographs
are shot on a draped background.

So the cards now use an untitled photograph from each gallery, cropped to a common 16:9, with the
discipline name rendered as text — which is what lets it exist in both languages. Three of the four
are the photograph that opens the gallery the card links to; Glass Art's banner is square and would
lose too much to the crop, so that gallery's one landscape photograph is used instead.

The four URLs stay in `scripts/assets.txt`, commented out with the reason, so the decision is
visible where someone would go looking and can be reversed by uncommenting.
