@AGENTS.md

# web-clone

A framework for **cloning a website and rebuilding it properly**: scrape a live site, inventory it,
port it page by page into a Next.js codebase, and verify the rebuild against the original at three
viewport widths.

Nothing here is tied to a particular site. The target lives in **`site.config.json`** at the repo
root, and every script and metadata route reads it from there:

```json
{
  "name": "web-clone",
  "origin": "https://example.com", // the site being cloned
  "siteUrl": "https://example.com", // canonical URL of the rebuild
  "title": "Example Site",
  "description": "Placeholder description for the rebuilt site."
}
```

Rename the project in `package.json`, `package-lock.json`, `compose.yaml` and
`compose.prod.yaml` to match the clone — the framework ships `web-clone` in all four as a
placeholder. The compose files carry the Docker project name, so changing them starts a fresh set
of containers and volumes; drop the old ones with `docker compose -p <old-name> down -v`.

## The process, end to end

1. **Point at the target.** Edit `site.config.json`.
2. **Recon.** Identify the stack, the JS surface and the media roots — `docs/research-notes.md` has
   the procedure. Findings land in that file.
3. **Inventory the routes.** Crawl hrefs until the set converges, into `scripts/routes.txt` and
   `docs/routes.md`. Do not derive the list from the navigation — see the gotchas.
4. **Snapshot.** `./scripts/snapshot.sh` writes every route's HTML to `reference/raw/` (gitignored).
5. **Inventory and fetch the media.** Derive `scripts/assets.txt` from the snapshots, then
   `./scripts/fetch-assets.sh`. Record what arrived in `docs/assets.md`.
6. **Extract the design tokens** into `src/app/globals.css` and document them in
   `docs/design-tokens.md`.
7. **Port the pages, one at a time as they are asked for by name.** Use the `port-page` skill or the
   `page-porter` agent. Register each component in `docs/components.md`.
8. **Verify** with `./scripts/compare.sh <route>` — see "Verifying fidelity" below.
9. **Content changes come last**, as a separate human-driven pass over `content.ts` files.

**"Faithful" means close, not pixel-perfect.** Match the layout, structure and feel; do not chase
exact pixels. Later content passes usually change the design anyway, so time spent tuning a few
pixels is spent twice.

## There is no Node.js on this machine

Docker is the toolchain, not a deployment detail. `npm`, `next` and `tsc` do not exist on the host.
Everything goes through `./bin/dev`:

```
./bin/dev up            # dev server → http://localhost:3000
./bin/dev down          # stop (-v also drops the node_modules/.next volumes)
./bin/dev logs -f       # tail dev server output
./bin/dev check         # typecheck + lint + format:check — run before calling work done
./bin/dev typecheck     # tsc --noEmit
./bin/dev lint:fix      # ESLint --fix
./bin/dev install <pkg> # npm install; package-lock.json updates on the host
./bin/dev npm <args>    # anything else
./bin/dev prod          # build and run the production image locally
./bin/dev shell         # shell in a throwaway container
```

`./bin/dev help` lists the rest. A bare `npm run …` will fail with "command not found" — that is
the host missing Node, not a broken install.

After changing `package.json`, run `./bin/dev install` **and** `docker compose build web`: the
container's `node_modules` lives in a named volume seeded from the image, so it does not pick up
dependency changes on its own.

## Architecture

```
site.config.json              The target. One file, read by src/lib/site.ts and every script
src/app/<route>/page.tsx      Composition only — imports sections, passes content in
src/app/<route>/content.ts    Typed copy, image refs, lists  ← later content edits land here
src/app/globals.css           Tailwind v4 @theme — the design tokens
src/components/layout/        Header, nav, Footer
src/components/sections/      Page-level section blocks, exported via ./index.ts
src/components/ui/            Primitives (Container, Section, Button, …)
src/lib/nav.ts                The nav tree — one source of truth for header and footer
src/lib/site.ts               site.config.json, typed
public/                       Downloaded media, paths mirroring the target exactly
scripts/                      Scrape, fetch, compare; routes.txt and assets.txt are the inventories
reference/raw/                HTML snapshots of the target (gitignored)
reference/compare/            Comparison sheets (gitignored)
```

### If the rebuild is multilingual

A second language changes where content lives, because one page is then shared by several
routes. The layout that works, and the reasoning behind each part:

```
src/lib/i18n.ts               Locales, the URL scheme, Localized<T>, path helpers
src/lib/ui.ts                 Interface strings per locale (nav labels, aria text, pagination)
src/content/<page>.ts         Bilingual content, shared by every locale's route
src/components/pages/<X>.tsx  One composition per page, rendered by each locale's route
src/app/(<locale>)/layout.tsx One root layout per locale — <html lang> can only be set there
src/app/(<locale>)/…/page.tsx Thin route files: localised metadata, then the page component
```

- **The default locale stays unprefixed.** `/bio` keeps the target's live URL and the second
  language sits under `/en/bio`. Prefixing both renames every existing URL, which a rebuild of a
  live site cannot afford.
- **Reuse the default locale's slugs.** Switching language is then a pure prefix operation, so the
  switcher can never land on a page that does not exist and there is no route table to desync.
- **One root layout per locale, via route groups.** `<html lang>` is only settable in a root
  layout, so a single shared layout cannot serve two languages. Route group names never appear in
  a URL. The cost is a full document load when switching, which is right when the document's
  language changes.
- **Structure once, strings per locale.** Content modules hold each string per locale and the
  structural data (image paths, dimensions, order) exactly once. Duplicating a whole page per
  language means two copies to keep in step.
- **Components stay locale-agnostic.** They receive resolved plain strings; nothing below the page
  layer knows more than one language exists. Interface strings come from `src/lib/ui.ts`, content
  from `src/content/`, and the two are never mixed.
- **Declare the pairs.** Each route sets `alternates.canonical` plus `languages` (via a helper), so
  every page names its counterpart, and the sitemap emits one entry per locale with `xhtml:link`
  alternates.

`src/components/sections/` and `src/components/ui/` start empty on purpose: section blocks are
derived from the target's own markup, and a library carried over from a different site would push
the rebuild towards someone else's design language.

**Content is separated from layout on purpose.** Content revisions are a later pass; keeping strings
in `content.ts` makes those data edits that the type checker validates, instead of surgery on JSX.
Do not inline page copy into components.

## Conventions

- **Server Components by default.** `"use client"` only where there is real interactivity, and as
  deep in the tree as possible. A desktop dropdown is usually pure CSS hover and ships no JS. If you
  add a client boundary, say why.
- **Reuse before you create.** Read `docs/components.md` first and decide per section: existing
  component, existing component plus a prop, or genuinely new. A new component is justified when the
  _layout_ is new — not because the copy, colours or image differ.
- **Tailwind only** — no CSS modules, no styled-components. Shared patterns become components, not
  `@apply` soup.
- **Every image goes through `next/image` with an explicit `sizes` prop.** Scraped sources are
  routinely enormous; without `sizes` the optimizer serves desktop-sized images to phones. Intrinsic
  dimensions go in `docs/assets.md`. `priority` goes on the above-the-fold image and nothing else.
- **Mobile-first responsive.** Unprefixed classes are the phone layout; `sm:`/`md:`/`lg:` add to it.
  Originals are often weak here — improving it is in scope.
- **Brand colours are tokens, never hex literals in markup.** Add them to `globals.css` and record
  them in `docs/design-tokens.md`.
- Prettier and ESLint run automatically on every file written (a hook, see `.claude/settings.json`).
  Do not hand-format.

### File layout for a page

Two files per route, always:

- `src/app/<route>/content.ts` — every string, image ref and list, transcribed **verbatim** from the
  original. Each export is annotated with the section component's exported prop type, so the type
  checker catches drift.
- `src/app/<route>/page.tsx` — composition only: `metadata`, then section components spread with
  content (`<Hero {...hero} />`). No copy inlined in JSX.

Route `metadata.title` is the bare page name — `app/layout.tsx` appends the site name via
`title.template`.

### Naming

Components are `PascalCase.tsx`, one component per file, named export (no default exports outside
`app/`). Section components are re-exported from `src/components/sections/index.ts`, and their prop
types are exported alongside them as `<Name>Props`.

Asset filenames are **copied, never retyped** — see the case-sensitivity gotcha below.

## Reference material

| Path                     | What it is                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `docs/routes.md`         | **Start here.** Page inventory with title, purpose and porting status; navigation        |
| `docs/remaining-work.md` | Ordered checklist of what is left, and the open questions that block specific pages      |
| `docs/components.md`     | Every component built so far, with props and which pages use them — read before building |
| `docs/design-tokens.md`  | Palette, type scale, spacing, and what the original's inconsistencies normalised to      |
| `docs/assets.md`         | Every media file, with sizes, dimensions and traps                                       |
| `docs/research-notes.md` | How the target is built and how to redo the research; things noticed but not acted on    |
| `docs/deployment.md`     | Vercel runbook: push `prod` to publish                                                   |
| `reference/raw/*.html`   | Snapshot of every page of the target. **Gitignored** — run `./scripts/snapshot.sh`       |
| `scripts/routes.txt`     | Machine-readable route list; also drives `sitemap.ts`                                    |
| `scripts/assets.txt`     | Machine-readable media list                                                              |

If the target is itself a Tailwind site, its utility classes survive in the served markup and the
snapshots show real class names and breakpoints. Read them rather than guessing from screenshots.

## Verifying fidelity

`./scripts/compare.sh <route>` screenshots the original and the local build side by side at 390 /
834 / 1440 px and writes a sheet to `reference/compare/`. Use it rather than eyeballing a single
desktop screenshot — its job is to catch the structural mistakes that are easy to miss, not to drive
the last few pixels out.

**The bar is "a reader would call these the same page."** Worth fixing:

- sections missing, in the wrong order, or with the wrong content
- a layout that differs in kind — one column where the original has two, image on the wrong side
- anything broken or unreadable at 390 px
- wrong image, or wrong copy

Not worth fixing:

- text wrapping onto a different number of lines, or headings breaking at a different word
- a few pixels of padding, margin or border radius
- font rendering, antialiasing and image compression differences
- small colour differences that are not one of the brand tokens

If a difference is only visible by flicking between the two screenshots, it is not a difference.
Note it and move on.

## Gotchas

- **Next 16 differs from what you remember.** Its docs ship locally in
  `node_modules/next/dist/docs/` — read them before reaching for an API from memory. `AGENTS.md`
  (imported above, and regenerated by `next dev`) says the same thing.
- `LayoutProps<"/">` and friends are Next 16 generated route types. Do not hand-roll prop types for
  `layout.tsx` / `page.tsx`. They live in `.next/types/`, so on a clean checkout a typecheck fails
  with `Cannot find name 'LayoutProps'` until `./bin/dev up` or `./bin/dev build` has generated
  them once. That is the missing build cache, not a missing type.
- **`next build` must run with `NODE_ENV=production`.** The compose service sets `development` for
  the dev server, and a build that inherits it dies prerendering `/_global-error` with
  `Cannot read properties of null (reading 'useContext')` plus a wall of bogus "unique key prop"
  warnings. None of it is about your code. `./bin/dev build` pins the variable; if you invoke
  `npm run build` some other way, set it yourself.
- The dev server watches via **polling** (`WATCHPACK_POLLING`) because file events do not cross the
  macOS/Docker boundary. Hot reload has a beat of latency; that is expected, not a bug.
- `.next` and `node_modules` are Docker volumes, not host directories. They will look absent from
  the host and that is correct.
- **Asset filename case is a production-only trap.** Copy filenames from the snapshot, never retype
  them; uppercase extensions such as `.JPG` are common. Getting the case wrong **passes in dev and
  fails in production**: dev serves `public/` over the case-insensitive macOS bind mount, the
  production image over a case-sensitive Linux layer, and so does Vercel. `./bin/dev prod` catches
  it; nothing else does.
- **Expect more link sets than you think.** A header nav, a footer nav that adds pages the header
  omits, and pages linked from **neither** — reachable only from body copy. `src/lib/nav.ts` holds
  the nav trees; `scripts/routes.txt` holds the authoritative inventory.
- **The route list has no sitemap behind it.** Build it by crawling hrefs in the snapshots until it
  converges — see `docs/routes.md`. If a route seems missing, re-run the crawl rather than trusting
  the nav.
- **Do not faithfully reproduce broken links.** Originals commonly link pages that 404. Leave them
  out and flag them rather than shipping the same dead link.
- **Preserve the target's redirects.** Check with `curl -sI` while inventorying, and reproduce each
  one via `redirects()` in `next.config.ts`.
