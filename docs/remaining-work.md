# Remaining work

The ordered checklist for the current clone. This is the file that answers "what now?" at the start
of a session.

## Status

**All 9 pages ported in two languages (18 routes) and verified.** `./bin/dev check` clean, `./bin/dev build` prerenders every
route static, comparison sheets reviewed at 390 / 834 / 1440.

## Setup — done

- [x] `site.config.json` points at the target
- [x] Target domain permissions in `.claude/settings.local.json` (personal, gitignored — the shared
      `.claude/settings.json` stays free of any target-specific entry)
- [x] Recon written up in `docs/research-notes.md`
- [x] Project renamed from the framework's `web-clone` placeholder to `vladimirvankov-web` in
      `package.json`, `package-lock.json`, `compose.yaml`, `compose.prod.yaml` and
      `site.config.json`

## Inventory — done

- [x] `scripts/routes.txt` from the target's sitemap, checked against snapshot hrefs
- [x] Status codes checked; two duplicate URLs redirected in `next.config.ts`
- [x] `scripts/assets.txt` derived; 84 files fetched, optimised (22.0 → 15.9 MB) and tabulated

## Foundation — done

- [x] Palette and type scale in `src/app/globals.css`, documented
- [x] Cormorant Garamond + Poppins via `next/font`, with the Cyrillic subset
- [x] Nav, gallery chain and contact details in `src/lib/nav.ts`
- [x] `Header`, `Footer`, `MobileNav`, `Container`, `Section`

## Pages — done

- [x] `/` · `/bio` · `/novini` · both `/novini/*` posts
- [x] `/home/skulptura` · `/home/bijuta` · `/home/plastika` · `/home/kartini`
- [x] Every one of the above again under `/en`, with a БГ/EN switcher, per-locale `<html lang>`,
      canonicals and `hreflang` pairs, and a sitemap entry per locale

## Before calling it shippable

- [x] `./bin/dev check`
- [x] `./bin/dev build`
- [x] `./scripts/compare.sh` at all three widths
- [x] `./bin/dev prod` — all 9 routes 200, both redirects 308, and all 85 assets served from the
      case-sensitive Linux layer with no failures
- [ ] Deployment, if wanted — `docs/deployment.md`

## Open questions

| Question                                                                                                                                                                                                                   | Blocks                        | Raised     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------- |
| The authored prose — exhibition statement, the reflection beside each of the 15 works, three critics' pieces — is marked `TODO(owner)` in `content.ts`. Paste the full texts, or confirm the excerpts are what should ship | `/home/skulptura` reads short | this clone |
| Both `/novini` posts are unedited Squarespace template content. Real titles, dates and bodies needed, or the section should be dropped                                                                                     | `/novini` and both posts      | this clone |
| Is `Untitled-1.jpg` the intended banner for the sculpture page, or a working file left in place?                                                                                                                           | nothing — cosmetic            | this clone |
| Should the galleries move from `/home/<slug>` to `/<slug>`, with redirects from the old paths?                                                                                                                             | nothing — a decision          | this clone |
| Poppins has no Cyrillic subset; Cyrillic body copy falls back to the system stack, as it does on the original. Pick a Cyrillic-capable sans if that matters                                                                | nothing — cosmetic            | this clone |
