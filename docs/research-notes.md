# Research notes — how the target is built

Reconnaissance of **the site being cloned**, not of this repo. Findings that belong somewhere
specific live there instead:

| Topic                                                          | File                     |
| -------------------------------------------------------------- | ------------------------ |
| Page inventory, porting status, navigation, page-level defects | `docs/routes.md`         |
| Every media file, where it lives, size and traps               | `docs/assets.md`         |
| Colours, type scale, spacing, what we normalised               | `docs/design-tokens.md`  |
| Components built                                               | `docs/components.md`     |
| What is left, in order, and open questions                     | `docs/remaining-work.md` |

## This target: Squarespace

```
server: Squarespace
x-contextid: …
set-cookie: crumb=…
```

That one header changes the whole approach. **The markup carries no layout intent** — no utility
classes, only Squarespace's theme classes (`sqs-block`, `fe-block`, `portfolio-grid-overlay`) plus
per-block CSS inlined into `<style>` tags keyed by block id. So:

- **Structure and copy** are read from the HTML, which is fully server-rendered and complete.
- **Design** is read from the versioned site stylesheet and measured from the rendered pages. Nothing
  is copied across as a class name, unlike a Tailwind target.
- **Intrinsic image dimensions** come free: Squarespace prints `data-image-dimensions="1920x1280"` on
  every `<img>`. Useful for inventory, but stale once the files are optimised — read the final
  dimensions off disk.
- **Pages are large for what they contain.** 2.3 MB of HTML for a 15-work gallery, most of it inlined
  per-block CSS and JSON. Snapshot sizes are a poor proxy for how much is on the page here.

Blocks worth knowing by name: `sqs-block image-block` (a photograph plus optional `figcaption`),
`sqs-block html-block` (running text), `website-component-block` (the newer fluid-engine wrapper,
which the older `sqs-block` walker misses entirely), `item-pagination` (prev/next at a page's foot).

## How to redo the research

```bash
./scripts/snapshot.sh        # every route in scripts/routes.txt → reference/raw/ (gitignored)
./scripts/fetch-assets.sh    # every entry in scripts/assets.txt → public/ (committed)
./bin/dev optimize           # downscale and recompress
./bin/dev dims               # tabulate
```

Extraction of the page content itself was done with throwaway scripts kept **outside** the repo
(structure differs per platform, so there is nothing generic to keep). The model that worked here,
and is worth reusing on any gallery-shaped target: walk the `<main>` region as a token stream of
images and text, then group runs — a run of images followed by a caption run is one work, unless the
number of caption chunks equals the number of images, in which case they pair 1:1. A dimension line
terminates a chunk.

Two things that bit, both worth checking on the next target of this shape:

- The **first image in document order is the page banner** and reappears in the body on most of these
  pages. Remove exactly that one occurrence, or every count comes out wrong.
- **Per-block CSS leaks into text extraction** as pseudo-paragraphs (`#block-… {`, `@media …`).
  Filter any token containing braces before treating it as copy.

## Limits of a curl-only scrape

- Media referenced only from **CSS backgrounds** or fetched by **JS chunks** is not seen. The
  84-file list is a floor.
- Anything rendered **client-side after hydration** is invisible. Not a problem here: every page is
  fully server-rendered.
- **Form behaviour** cannot be observed. Moot here — the site has no forms.

## JavaScript surface

Very small, which is why the rebuild is almost entirely Server Components.

- **Mobile menu** — an overlay toggle. Rebuilt as `MobileNav`.
- **Lightbox** — "View fullsize" on every gallery image. Rebuilt as `ZoomableImage`.
- **Four YouTube embeds** on `/home/skulptura`, mounted eagerly by the original. Lazy here.
- **No forms, no carousels, no analytics, no third-party scripts** beyond the YouTube players.

## Noticed but not acted on

- **Two duplicate pages** on live URLs (`/home`, `/bio-1`). Redirected rather than reproduced — see
  `docs/routes.md`.
- **Two unedited template posts** under `/novini` still carrying Squarespace's placeholder titles and
  filler copy. Structure and photographs ported; the words are the owner's to write.
- **The `/home/<slug>` gallery paths** read oddly for top-level galleries, but they are the live URLs
  and inbound links depend on them.
- **Caption sizes vary within a gallery** (`sqsrte-small` on some works, not others) — an editing
  artefact, normalised to one treatment.
- **Poppins has no Cyrillic subset** on Google Fonts. The original has the same gap; Cyrillic body
  copy falls back to the system stack in both.

## The target is monolingual

Worth stating plainly, because it decides what the English side of the rebuild _is_: the target
serves Bulgarian only — no `hreflang`, no locale prefix, no language switcher, no alternate URLs.
Its `<html lang>` is `bg` on every page.

So the English half of this rebuild is **new content**, produced by translation, and not subject to
the "transcribe verbatim" rule that governs everything ported. The translation policy is recorded
in `docs/routes.md`.

## Ownership

The target is a personal portfolio site for a working artist, cloned here at the repo owner's
direction as a test of this framework; the repo is deliberately disconnected from any remote and
nothing is published. The site's `robots.txt` is Squarespace's default, which disallows a long list
of AI training crawlers — worth recording, since it is the owner's stance to honour, and it is the
reason the scrape was a direct `curl` of specific pages at explicit request rather than a crawl.

The site's own authored prose (exhibition statement, the reflections beside each work, three critics'
pieces) is **not** transcribed into this rebuild — see "Content not transcribed" in `docs/routes.md`.
