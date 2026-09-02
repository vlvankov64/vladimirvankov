# Deploying to Vercel

The target is push-to-deploy: **a push to `prod` publishes the site**, every other branch gets a
private preview URL. This file is the runbook — one-time setup first, then the loop you use forever
after.

> Docker is still the local toolchain. Vercel never looks at `Dockerfile` or `compose.yaml`; it runs
> `npm install` and `next build` on its own build image. The two paths are independent, and
> `./bin/dev prod` remains the way to check what a self-hosted container would serve.

## Before you start: pick the right plan

Vercel's Hobby tier **cannot deploy from a private repository inside a GitHub organisation**, and is
limited to non-commercial personal use — which a client or company site is not. A rebuild of
someone's marketing site therefore needs a **Pro team**: $20/month, which includes one deploying seat
and $20 of monthly usage credit. People who only need to look at deployments are free (Viewer
seats); additional deploying seats are $20/month each.

A public repository on a personal account can stay on Hobby.

## One-time setup

### 1. Push the branch

Vercel deploys what is on GitHub, so the branch has to exist there first:

```bash
git push -u origin <branch>
```

### 2. Create the Vercel account and team

1. Go to <https://vercel.com/signup> and **Continue with GitHub** — signing up through GitHub is what
   links your commits to your Vercel user, which is how Vercel decides whether a commit is allowed to
   deploy.
2. Create a team (not a personal Hobby account) if the repo is a private org repo, and pick **Pro**
   when prompted. The team holds the billing and the project.

### 3. Import the repository

1. Go to <https://vercel.com/new>.
2. Choose your team, then **Import Git Repository**. The first time, GitHub asks you to install the
   **Vercel GitHub App** — install it on the owning organisation and grant access to this repository
   only. If you are not a GitHub org owner, GitHub sends the install as a request for an owner to
   approve.
3. Pick the repo. On the configure screen:
   - **Framework Preset** — should say _Next.js_ already. Leave it.
   - **Build Command / Output Directory / Install Command** — leave every one on the default.
   - **Root Directory** — `./`, leave it.
   - **Environment Variables** — none, unless the rebuild has grown a backend. A static clone has no
     secrets.
4. Press **Deploy**. The first build takes a couple of minutes; after that you get a URL like
   `<project>-<hash>.vercel.app`.

### 4. Point production at `prod`

Vercel picks `main` as the production branch by default. To make it `prod`:

1. Project → **Settings** → **Environments** → click the **Production** environment.
2. Under **Branch Tracking**, change the branch name to `prod` and **Save**.

Then create the branch when you are ready to publish. Until `prod` exists there is simply no
production deployment — a useful state to sit in while the original is still the live site, because
**preview deployments are `noindex` automatically** and cannot be picked up by search engines, while
a production deployment on a `.vercel.app` URL can be.

### 5. Node version

`package.json` pins `"engines": { "node": "24.x" }`, matching the `node:24-alpine` base in the
`Dockerfile`. Nothing to set in the dashboard; if the two ever need to diverge, the setting is
Settings → Build and Deployment → Node.js Version, and `engines` overrides it.

## The loop, from here on

```bash
git switch -c some-change
# …commits…
git push -u origin some-change        # → Vercel builds a preview URL, noindex'd
```

Open a PR and Vercel comments the preview link on it. When it is good:

```bash
git switch prod                       # first time: git switch -c prod <branch>
git merge --ff-only some-change       # or merge the PR into prod on GitHub
git push origin prod                  # → production deployment
```

That is the whole mechanism: **push to `prod` = deploy to production**, push to anything else =
private preview. No CLI and nothing to install locally — which matters here, since there is no Node
on this machine to install the Vercel CLI with.

### Rolling back

Project → **Deployments** → find the last good one → **⋯** → **Instant Rollback**. It re-points the
domain at an already-built deployment, so it takes seconds and cannot fail on a build error.

## Attaching the real domain

Do this only when the Vercel build is meant to _become_ the live site.

1. Project → **Settings** → **Domains** → **Add** → the apex domain (add the `www` host too and let
   Vercel redirect one to the other).
2. Vercel prints the exact DNS records to create — an `A` record for the apex and a `CNAME` for
   `www`. Create them wherever DNS is hosted, and leave the old records in place until Vercel shows
   the domain as **Valid**.
3. The certificate is issued automatically once DNS resolves.

`site.config.json`'s `siteUrl` is what `sitemap.xml`, `robots.txt` and every canonical/OG URL are
built from. On a `.vercel.app` URL those still advertise the configured domain — correct once it is
attached, mildly odd before. If a permanent staging host is wanted, that field is the one place to
change.

## What a static clone does and does not use

- **No environment variables, no database, no serverless functions**, as long as every route
  prerenders. `next build` marks them `○ (Static)`; anything marked `ƒ` has picked up a request-time
  API and is worth understanding before it ships.
- **`next/image` optimisation is on**, and it is the one metered thing. Vercel bills transformations
  on cache misses; Pro's included credit covers a marketing site comfortably. Source images must be
  within Vercel's 8192px limit.
- **`redirects()` in `next.config.ts` works on Vercel** — it is framework config Vercel honours, not
  something the container was doing.
- **`sitemap.ts` reads `scripts/routes.txt` at build time.** That file is committed and the route is
  static, so the read happens during the build. `outputFileTracingIncludes` in `next.config.ts`
  covers the case where that stops being true.
- **`output: "standalone"` is skipped on Vercel** (`process.env.VERCEL`), since Vercel produces its
  own output and never runs `node server.js`. It still applies to Docker builds.

## Gotchas worth knowing before they bite

- **Case-sensitive filesystems.** Vercel's build and CDN are case-sensitive, exactly like the
  production image. Scraped assets with uppercase extensions are the usual casualty — run
  `./bin/dev prod` before a release.
- **Commit authorship controls deploys.** On a private org repo, a commit only deploys if its author
  is a member of the Vercel team. If someone's pushes silently stop producing deployments, that is
  why — a Viewer seat is not enough to deploy.
- **The production `.vercel.app` URL is public and indexable.** Previews are not. If a production
  deployment exists before the domain cutover, either accept that or keep `prod` unpushed until you
  want the site live.
- **Build limit is 45 minutes.** A static site of this size takes about a minute; this only matters
  if something goes badly wrong.
