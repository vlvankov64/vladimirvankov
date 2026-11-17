# Site structure — pages and navigation

The page inventory and porting tracker for **the current target**, which is set in
`site.config.json`. The machine-readable list is `scripts/routes.txt`;
`docs/research-notes.md` covers how the target is built, `docs/remaining-work.md` is what is left.

## This target

A Squarespace portfolio site for a sculptor, in Bulgarian: four galleries, a biography, a news
list. **11 URLs upstream, 9 pages ported**, two upstream duplicates that redirect (below).

The rebuild is **bilingual**: those 9 pages exist in Bulgarian and English, so 18 routes are built.
Bulgarian keeps the target's own unprefixed URLs; English sits under `/en`. See "Languages" below.

The target publishes a `sitemap.xml`, so the inventory came from there and was then checked against
the hrefs in the snapshots — no crawl-until-converge pass was needed.

## Building the inventory

Check for a sitemap first — it is the cheapest source when it exists:

```bash
ORIGIN=$(python3 -c 'import json;print(json.load(open("site.config.json"))["origin"])')
curl -s "$ORIGIN/robots.txt"
curl -s "$ORIGIN/sitemap.xml" | grep -oE '<loc>[^<]+' | sed 's|<loc>||'
```

Otherwise crawl, then **re-crawl until the set stops growing** — pages linked only from body copy
are routinely absent from every nav:

```bash
grep -ohE 'href="/[A-Za-z0-9/_-]*"' reference/raw/*.html | sed 's/href="//;s/"//' \
  | sort -u | comm -23 - <(sed -e 's/#.*//' -e '/^$/d' scripts/routes.txt | sort)
```

Either way, check status codes rather than assuming: `curl -sI` catches redirects (reproduce them in
`next.config.ts`) and links that 404 (do not reproduce those — record them below).

## Status key

| Status          | Meaning                                         |
| --------------- | ----------------------------------------------- |
| **done**        | Ported and checked against the comparison sheet |
| **in progress** | Started, not yet verified                       |
| **not started** | Only the raw snapshot exists                    |

## Pages

| Route                                     | Title             | Purpose                                                 |   HTML | Status   |
| ----------------------------------------- | ----------------- | ------------------------------------------------------- | -----: | -------- |
| `/`                                       | Владимир Ванков   | Portrait, signature, one-line statement, 4-item grid    | 194 KB | **done** |
| `/home/skulptura`                         | Скулптура         | New works, then the cycle with buttons to reviews/films | 2.3 MB | **done** |
| `/home/bijuta`                            | Бижута            | 12 works, 27 photographs                                | 1.2 MB | **done** |
| `/home/plastika`                          | Стъклена пластика | 13 works, 18 photographs                                | 495 KB | **done** |
| `/home/kartini`                           | Картини           | 12 works, 13 photographs                                | 1.5 MB | **done** |
| `/bio`                                    | Биография         | Owner's biography of 05/2026, both languages            | 143 KB | **done** |
| `/recenzii`                               | Рецензии          | Four reviews of the exhibition, in full                 |      — | **done** |
| `/filmi`                                  | Филми             | Four exhibition films (moved from sculpture)            |      — | **done** |
| `/novini`                                 | Новини            | News list — two template posts                          | 975 KB | **done** |
| `/novini/blog-post-title-two-tcmjn-3d33l` | (placeholder)     | Template post, real photograph                          | 1.2 MB | **done** |
| `/novini/qqqqqq`                          | (placeholder)     | Template post, real photograph                          | 128 KB | **done** |

## Languages

|                  |                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| Bulgarian (`bg`) | The default. Unprefixed — `/bio`, `/home/skulptura` — so every URL the target serves is preserved |
| English (`en`)   | Under `/en` — `/en/bio`, `/en/home/skulptura`, reusing the same slugs                             |

The original is **monolingual**. Nothing English was transcribed, because there was nothing to
transcribe: the English side is a translation, and it is new content rather than ported content.

What was translated, and what was not:

- **Translated** — navigation, section headings, interface strings, work titles and materials.
  These are short factual labels. The biography and the reviews now come from the owner in both
  languages (revision of 2026-11-17 (2)), except two reviews supplied in one language only.
  Work titles use the exhibition's own English names where its English-language review supplies
  them (Alone, Vow, Fatherhood, Unwanted Gift, After the Others…, Where Now?), rather than fresh
  coinages.
- **Not translated, because not transcribed** — the long-form authored prose. See "Content not
  transcribed" below; both languages carry the same short attributed openings and `TODO(owner)`
  markers.
- **Left alone** — dimensions (`40 х 40`), contact details, and jewellery titles that are already
  English on the original (SEA DREAMS, ME BLUE…).

A native speaker should read the English once before it ships; it is a careful translation, not a
reviewed one.

## Navigation

One flat set, eight links, in this order: Скулптура, Бижута, Стъклена пластика, Картини, Биография,
Рецензии, Филми, Новини — plus Instagram and Facebook icons. Рецензии and Филми are not on the
original; they were added in the owner's revision of 2026-11-17 (see below). No dropdowns, no logo image, and no pages linked from body copy
only. Transcribed into `mainNav` in `src/lib/nav.ts`.

The four galleries are also chained by prev/next pagination at the foot of each:
Скулптура ↔ Бижута ↔ Стъклена пластика ↔ Картини. That order lives in `galleryChain`, and
`GalleryPagination` derives each page's links from it, so the chain cannot drift.

The footer carries contact details rather than links: name, email, phone.

The gallery routes keep the target's `/home/<slug>` paths. They read oddly — a gallery is not under
a home page — but they are the live URLs.

## Redirects

The target serves none. It does serve two duplicate URLs, which redirect here rather than 404:

| From     | To     | Upstream       | Reproduced in `next.config.ts` |
| -------- | ------ | -------------- | ------------------------------ |
| `/home`  | `/`    | 200, same page | yes, 308                       |
| `/bio-1` | `/bio` | 200, same page | yes, 308                       |

## Defects in the original

| Page                      | Defect                                                                                      | What we did                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `/home`, `/bio-1`         | Duplicate pages on separate URLs — two addresses for one page, splitting any search ranking | One canonical page each, with the duplicate URL redirecting                     |
| `/novini` and both posts  | Unedited Squarespace template content: placeholder titles, filler body text                 | Structure and the real photographs ported; titles and bodies left for the owner |
| Galleries at 390 px       | Multi-image rows squeeze each photograph to a sliver                                        | Images stack full-width on a phone, forming rows only from `sm` up              |
| `/bio`                    | Career, education and a 12-line exhibition record run as one undivided column               | Same lines, verbatim, grouped under the original's own labels so they scan      |
| Gallery banners at 390 px | Title overlaid on a busy photograph is close to unreadable                                  | Title sits under the image on a phone, over it from `sm` up                     |
| Every page                | No `<meta name="description">` anywhere                                                     | Per-route descriptions written from each page's own subject                     |

## Content not transcribed

Nothing outstanding. The exhibition statement was dropped by the owner; the cycle's reflections
(revision of 2026-11-17) and the reviews (revision 2) are now in full.

## Owner's revision of 2026-11-17

The first content pass, from `planned_changes/2026.11.17/корекции сайт.docx` (gitignored). It
deliberately diverges from the original, so `compare.sh` no longer matches on these points:

- Logo is a framed home button captioned Начало / Home; one sans face (Montserrat) everywhere;
  larger header and footer nav.
- Reviews and films moved to `/recenzii` and `/filmi`; the sculpture page keeps a button to each.
- Sculpture: banner and home card show the drop („А сега накъде?“); new works Пиета, Продължавам,
  Моят път first; the rest grouped as the cycle „А сега накъде“ (stereolithography, 2024), each
  with its text from the artist's documents. English titles follow those documents (Paternity,
  Maternity, Shaking Off, Where To Now?…), replacing the review-derived ones.
- Jewellery, glass and painting changes: materials, order, a new work, photo swaps and splits —
  see the comments in each `src/content/galleries/*.ts`.
- **Not done:** the biography replacement — the new text was not among the supplied files (done
  in revision 2, below).

## Owner's revision of 2026-11-17 (2)

From `planned_changes/2026.11.17-2/корекции 2.docx` and the documents beside it:

- Sculpture: the introductory statement before Пиета is gone. The buttons to the reviews and films
  sit under the cycle heading „А сега накъде“ / стереолитография, 2024. The banner is framed
  whole (`bannerFrame: "whole"`, 3:2) so the entire drop and a little of the base show.
- `/recenzii`: four texts in full, in the owner's order — Prof. Pamukchiev (an opening-speech
  remark, set as a quotation), Marta Karamihova, Erin Irwin, Boryana Mincheva. Irwin's (English
  only) and Mincheva's (Bulgarian only) are printed as written on both locales, with `lang`.
- `/bio`: replaced with the owner's „Биография и изложби до 05_2026“, both languages, including the
  new solo, international and group exhibitions.
