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

| Component   | Props                                         | Used by    | Notes                                                                                                   |
| ----------- | --------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------- |
| `Header`    | none (reads `mainNav`, `social`, `siteLogo`)  | every page | Sticky, translucent. Signature centred, nav centred beneath, social out left — the target's arrangement |
| `Footer`    | none (reads `contact`, `social`, `SITE_NAME`) | every page | Contact details rather than links — the target has no footer nav                                        |
| `MobileNav` | `items`                                       | `Header`   | **Client.** The only one — see below                                                                    |

## Sections

| Component           | Props                                      | Used by                            | Notes                                                                                                           |
| ------------------- | ------------------------------------------ | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `PageHeader`        | `title`, `intro?`, `image?`                | 4 galleries, `/novini`, both posts | Banner with the title over it from `sm` up, under it on a phone. Without `image` it degrades to a centred title |
| `ArtworkGallery`    | `artworks`, `columns?`                     | 4 galleries                        | The workhorse: one block per work — photographs, then caption. `columns` is 2 or 3                              |
| `HomeHero`          | `portrait`, `signature`, `statement`       | `/`                                | Portrait beside signature and statement; stacks below `lg`                                                      |
| `PortfolioGrid`     | `heading`, `items`                         | `/`                                | The four disciplines as title-over-image cards, 2 columns on a phone                                            |
| `GalleryPagination` | `current`                                  | 4 galleries                        | Prev/next derived from `galleryChain`, not written per page                                                     |
| `TextBlock`         | `paragraphs`, `heading?`, `tone?`, `lead?` | `/home/skulptura`, both posts      | Running prose at reading measure                                                                                |
| `VideoGrid`         | `videos`, `heading?`, `note?`              | `/home/skulptura`                  | Lazy `youtube-nocookie` iframes                                                                                 |
| `Reviews`           | `heading`, `reviews`                       | `/home/skulptura`                  | Attributed press blocks; takes any excerpt length                                                               |
| `BioProfile`        | `portrait`, `standfirst`, `groups`         | `/bio`                             | Portrait beside a grouped factual record                                                                        |
| `JournalList`       | `posts`, `emptyNote?`                      | `/novini`                          | Post list with an empty state                                                                                   |

## Page components

One composition per page, in `src/components/pages/`, rendered by each locale's thin route file.
Without these, a bilingual site duplicates every page's JSX once per language.

| Component       | Props                                | Routes | Notes                                       |
| --------------- | ------------------------------------ | -----: | ------------------------------------------- |
| `HomePage`      | `locale`                             |      2 | Hero + portfolio grid                       |
| `GalleryPage`   | `locale`, `gallery`, `canonicalHref` |      6 | Three of the four galleries, both languages |
| `SculpturePage` | `locale`                             |      2 | Its own: statement, films and press on top  |
| `BioPage`       | `locale`                             |      2 | Portrait + grouped record                   |
| `NewsPage`      | `locale`                             |      2 | Post list                                   |
| `PostPage`      | `locale`, `index`                    |      4 | One template post                           |

## UI primitives

| Component       | Props                                                 | Notes                                            |
| --------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `Container`     | `children`, `className?`, `width?`                    | `wide` (1400px) or `text` (reading measure)      |
| `Section`       | `tone?`, `id?`, `className?`                          | Full-bleed band: `paper`, `mist` or `ink`        |
| `InstagramIcon` | `className?`                                          | Inline SVG — no icon font, no image request      |
| `ZoomableImage` | `src`, `alt`, `width`, `height`, `sizes`, `priority?` | **Client.** Gallery image that opens full-screen |

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
