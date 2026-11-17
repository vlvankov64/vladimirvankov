# Design tokens

The live values are in `src/app/globals.css`; this file records where they came from.

## Extracting them

The target is a Squarespace site, so its theme colours arrive as HSL triples in the versioned site
stylesheet rather than as a readable palette. Find the stylesheet in the served HTML, then pull the
declarations:

```bash
ORIGIN=$(python3 -c 'import json;print(json.load(open("site.config.json"))["origin"])')
curl -s "$ORIGIN/" -o /tmp/home.html
grep -oE '<link[^>]+rel="stylesheet"[^>]*>' /tmp/home.html | grep -oE 'href="[^"]+"' | sed 's/href="//;s/"//'
curl -s "<the versioned-site-css URL>" -o /tmp/site.css
grep -oE '\-\-[a-zA-Z]+-hsl: *[0-9.]+, *[0-9.]+%, *[0-9.]+%' /tmp/site.css | sort -u
grep -oE 'font-family:[^;}]*' /tmp/site.css | sort -u | head
```

**Do not pipe token extraction through `head`** — one colour often emits several lines, and
truncating reports a partial palette as complete.

For a Tailwind target the same idea applies to `--color-*` declarations, and utility classes survive
in the markup so layout can be read directly. Neither is true here: Squarespace ships theme classes,
so everything below the palette was measured from the rendered pages rather than copied.

## Brand palette

Converted from the target's HSL declarations. Named by role, so a palette change stays out of the
markup.

| Token            | Value     | From the target's   | Role                            |
| ---------------- | --------- | ------------------- | ------------------------------- |
| `--color-ink`    | `#2a2829` | `--darkAccent-hsl`  | Body copy, headings, dark bands |
| `--color-accent` | `#253551` | `--accent-hsl`      | Links, hover states, rules      |
| `--color-mist`   | `#e0e0db` | `--lightAccent-hsl` | Quiet section grounds, footer   |
| `--color-paper`  | `#ffffff` | `--white-hsl`       | The dominant ground             |

The target also declares pure black and a set of `safe*` inverse variants; those are Squarespace's
own contrast machinery, not design decisions, and are not carried over.

Everything else in the rebuild is stock Tailwind — the default spacing scale, type scale and
container widths, with opacity modifiers (`text-ink/70`) doing the work the target does with
hand-mixed greys.

## Typography

**One face: Montserrat (sans), weights 300–600**, self-hosted via `next/font` from
`src/lib/fonts.ts`. The owner's revision of 2026-11-17 asked for a beautiful, easily readable
sans-serif everywhere, replacing the original's Cormorant Garamond + Poppins pair.

**Cyrillic is the site's primary script**, so `subsets: ["latin", "cyrillic"]` is not optional —
Poppins lacked a Cyrillic subset, which is one reason it went. On `lang="bg"` pages Montserrat
uses its Bulgarian `locl` letterforms (the cursive-style д, т, л); disable with
`font-feature-settings: "locl" 0` if the Russian-style forms are preferred.

`--font-sans` and `--font-display` both point at the Montserrat variable; `display` stays a separate
role so headings can be retuned alone. `h1`–`h3` are set to `font-light` in a base layer — at
display sizes a regular-weight sans reads heavy.

## Type scale in practice

Measured from the rendered pages. The site is a gallery, so the scale is quiet: two display sizes
and one body size carry almost everything.

| Role            | Classes                                                |
| --------------- | ------------------------------------------------------ |
| Page title      | `font-display text-3xl lg:text-6xl`                    |
| Section heading | `font-display text-3xl lg:text-4xl`                    |
| Work title      | `font-display text-xl lg:text-2xl`                     |
| Standfirst      | `font-display text-2xl lg:text-3xl leading-snug`       |
| Body            | `leading-relaxed text-ink/75`                          |
| Caption / label | `caption-label` — 11px, `tracking-[0.18em]`, uppercase |

`caption-label` is a custom utility in `globals.css` rather than a repeated class string: it appears
in the nav, the artwork dimensions, the pagination and the review credits.

## Spacing and rhythm

| Thing                      | Value                                                     |
| -------------------------- | --------------------------------------------------------- |
| Page gutter                | `px-5 sm:px-8 lg:px-12`, `max-w-[1400px]` (`Container`)   |
| Reading measure            | `max-w-3xl` (`Container width="text"`)                    |
| Section padding            | `py-12 lg:py-20`, galleries `py-14 lg:py-24`              |
| Gap between works          | `gap-20 lg:gap-32` — the gallery's most important spacing |
| Gap within a work's images | `gap-3 sm:gap-4`                                          |
| Image hover                | `scale-[1.02]`–`scale-105`, `duration-700 ease-gentle`    |

`--ease-gentle` (`cubic-bezier(0.22, 1, 0.36, 1)`) is the one custom easing, used on every image and
link transition so the whole site decelerates the same way.

Radii: none. The original uses square corners throughout, which is worth stating because a modern
default would round them and change the character of every gallery image.

## Breakpoints

Default Tailwind. The comparison harness screenshots at **390 / 834 / 1440**.

## Where the original is inconsistent, and what we normalised to

| Original                                                                                               | Ours                                 | Why                                                                                       |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Caption text set at several sizes within one gallery (`sqsrte-small` on some works, default on others) | One caption treatment for every work | The variation is an editing artefact, not a design; matching it would reproduce a mistake |
| Dimension notation mixes Cyrillic `х` and Latin `x`, spaced and not                                    | Left exactly as written              | It is copy. Transcribed verbatim, inconsistencies included                                |
| Two faces plus Squarespace's fallback stack                                                            | The same two, self-hosted            | Same appearance, one less third-party connection                                          |
| Theme greys hand-mixed per block                                                                       | `text-ink/NN` opacity steps          | Same rendered colour, one token instead of a dozen literals                               |
