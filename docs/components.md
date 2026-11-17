# Components

The component registry. **Read this before building anything** — the reuse rule in `CLAUDE.md`
depends on it being current, and a near-duplicate component is a failure, not a shortcut.

## The three tiers

| Directory                  | What belongs there                                                 |
| -------------------------- | ------------------------------------------------------------------ |
| `src/components/layout/`   | Site chrome: header, navigation, footer. One instance per page     |
| `src/components/sections/` | Page-level bands. Take content as props, exported via `./index.ts` |
| `src/components/ui/`       | Primitives shared by sections: container, section band, icons      |

Sections export their prop type as `<Name>Props` alongside the component, and `content.ts` files
annotate their exports with it — that is what makes the type checker catch content drift.

## Deciding: reuse, extend, or create

1. **Existing component** — same layout, different content. Pass props.
2. **Existing component plus a prop** — same layout with a variation. Add the prop, keeping the
   default as the current behaviour.
3. **Genuinely new** — the _layout_ is new. Not justified by different copy, colours or images.

## Layout

| Component   | Props                                         | Used by    | Notes                                                                                                                |
| ----------- | --------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| `Header`    | none (reads `mainNav`, `social`, `siteLogo`)  | every page | Sticky, translucent. Signature centred as a framed home button captioned Начало / Home, nav beneath, social out left |
| `Footer`    | none (reads `contact`, `social`, `SITE_NAME`) | every page | Contact details rather than links — the target has no footer nav                                                     |
| `MobileNav` | `items`                                       | `Header`   | **Client.** The only one — see below                                                                                 |

## Sections

| Component           | Props                                        | Used by                            | Notes                                                                                                                                                                                                                                             |
| ------------------- | -------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PageHeader`        | `title`, `intro?`, `image?`, `frame?`        | 4 galleries, `/novini`, both posts | Banner with the title over it from `sm` up, under it on a phone. Without `image` it degrades to a centred title; `frame: "whole"` keeps the photo's 3:2                                                                                           |
| `ArtworkGallery`    | `artworks`, `groups?`, `columns?`, `layout?` | 4 galleries                        | The workhorse: one block per work — photographs, caption, optional `text` prose. `groups` adds titled runs (a cycle), each with optional button `links` under its heading; `layout: "justified"` sets a row at one common height with no cropping |
| `HomeHero`          | `portrait`, `signature`, `statement`         | `/`                                | Portrait beside signature and statement; stacks below `lg`                                                                                                                                                                                        |
| `PortfolioGrid`     | `heading`, `items`                           | `/`                                | The four disciplines as title-over-image cards, 2 columns on a phone                                                                                                                                                                              |
| `GalleryPagination` | `current`                                    | 4 galleries                        | Prev/next derived from `galleryChain`, not written per page                                                                                                                                                                                       |
| `TextBlock`         | `paragraphs`, `heading?`, `tone?`, `lead?`   | both posts                         | Running prose at reading measure                                                                                                                                                                                                                  |
| `VideoGrid`         | `videos`, `heading?`, `note?`                | `/filmi`                           | Lazy `youtube-nocookie` iframes                                                                                                                                                                                                                   |
| `Reviews`           | `heading`, `reviews`                         | `/recenzii`                        | Full attributed texts; `quote` for a short remark, `lang` for a text left untranslated                                                                                                                                                            |
| `BioProfile`        | `name`, `portrait`, `standfirst`, `groups`   | `/bio`                             | Name (`h1`) and portrait beside a grouped factual record; an item may carry sub-lines (a touring exhibition)                                                                                                                                      |
| `JournalList`       | `posts`, `emptyNote?`                        | `/novini`                          | Post list with an empty state                                                                                                                                                                                                                     |

## Page components

One composition per page, in `src/components/pages/`, rendered by each locale's thin route file.
Without these, a bilingual site duplicates every page's JSX once per language.

| Component     | Props                                | Routes | Notes                              |
| ------------- | ------------------------------------ | -----: | ---------------------------------- |
| `HomePage`    | `locale`                             |      2 | Hero + portfolio grid              |
| `GalleryPage` | `locale`, `gallery`, `canonicalHref` |      8 | All four galleries, both languages |
| `ReviewsPage` | `locale`                             |      2 | Page title + `Reviews`             |
| `FilmsPage`   | `locale`                             |      2 | Page title + `VideoGrid`           |
| `BioPage`     | `locale`                             |      2 | Portrait + grouped record          |
| `NewsPage`    | `locale`                             |      2 | Post list                          |
| `PostPage`    | `locale`, `index`                    |      4 | One template post                  |

## UI primitives

| Component       | Props                                                 | Notes                                                                         |
| --------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------- |
| `Container`     | `children`, `className?`, `width?`                    | `wide` (1400px) or `text` (reading measure)                                   |
| `Section`       | `tone?`, `id?`, `className?`                          | Full-bleed band: `paper`, `mist` or `ink`                                     |
| `InstagramIcon` | `className?`                                          | Inline SVG — no icon font, no image request                                   |
| `ZoomableImage` | `src`, `alt`, `width`, `height`, `sizes`, `priority?` | **Client.** Gallery image that opens full-screen                              |
| `ButtonLinks`   | `links`, `className?`                                 | Centred row of outlined button links — the sculpture cycle's Reviews / Movies |

## Client components

Two, both leaves, both for state that has nowhere else to live:

- **`MobileNav`** — the phone menu's open/closed state. Closes on link click rather than in an effect
  on `pathname`: setState-in-effect is a cascading render, and the panel would otherwise cover the
  page it just navigated to for a frame.
- **`ZoomableImage`** — the lightbox, reproducing the target's "View fullsize". Deliberately per
  image rather than a gallery-level provider, so the galleries, captions and layout all stay server
  rendered. The full view reuses the same `next/image` source, so it costs one larger transform of a
  file already cached, not a fresh download.

Everything else is a Server Component. The site ships no other client JavaScript.
