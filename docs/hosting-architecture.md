# Hosting architecture

The root domain is the portfolio's stable entry point. It owns the CV, articles
and a small project catalogue. Projects are independent deployments, not routes
inside this application.

## Routing convention

| Use case | Address | Deployment |
| --- | --- | --- |
| Portfolio, CV, article index | `rexarrior.fun` | This repository |
| Static article material | `articles.rexarrior.fun/<slug>` | Static build or object storage |
| Calculator or interactive demo | `<slug>.rexarrior.fun` | Separate frontend repository |
| Demo with an API | `<slug>.rexarrior.fun` | Separate frontend and private API service |

Subdomains avoid coupling an application's router base, cookies, cache policy
and release cadence to the portfolio. They also allow a project to be removed
without touching the root site.

## Project contract

Every project should have its own repository and `compose.yml`. Only its
frontend/edge service exposes a port to the shared reverse proxy; databases,
queues and APIs remain on the project's private Docker network. Keep secrets in
that project's deployment environment, never in the portfolio repository.

At the edge, create one virtual host per project with TLS, request-size limits,
rate limits and the security headers appropriate for that app. Add a project to
the portfolio only after its public URL, short description, source URL (when
public), status and preview image are ready.

## What belongs where

- An explanatory page, data table or image gallery belongs in static article
  material.
- A deterministic calculator belongs in a static frontend whenever practical.
- Authentication, private data, expensive computation or scheduled work justify
  a separate backend.

This repository intentionally does not proxy arbitrary future APIs under
`/api/`: that prefix is reserved for the portfolio's telemetry and CV services.

## Article library

The `articles/` directory is a small static publishing system. Each article is
stored in `articles/content/<slug>/` and contains:

- `article.json` with the slug, title, description, author, publication date,
  language, tags, and optional original-source URL;
- `article.md` with the article body;
- an optional `assets/` directory referenced with relative Markdown paths.

Run `npm run build:articles` to validate the content and generate:

- `/index.html`, the article library;
- `/<slug>/index.html`, the stable article URL;
- local image assets, metadata, canonical URLs, and a static 404 page.

The output is disposable and intentionally ignored by Git. Source Markdown and
assets are the durable publication format. Adding a second article requires no
Vue route or Nginx change: add the content directory and rebuild the image.

### Local and production deployment

The `articles` Compose service exposes the static library on port `3001`, while
the portfolio remains on `3000`:

```bash
npm run build:articles
docker compose up -d --build articles
```

For production:

1. Point the `articles.rexarrior.fun` DNS record to the same edge host as the
   portfolio.
2. Issue a certificate that covers `articles.rexarrior.fun`. The checked-in
   host config keeps `/.well-known/acme-challenge/` on `/var/www/html` so the
   existing Certbot webroot renewal remains valid.
3. Install `articles/nginx-host.conf.example` in the host Nginx configuration
   and reload Nginx. It proxies the subdomain to `127.0.0.1:3001`.
4. Rebuild only the `articles` service when article content changes.

This keeps article publishing independent from the CV frontend while retaining
plain files, reviewable diffs, immutable image caching, and no runtime database
or CMS to maintain.

## Adding a catalogue card

When a project is public, add one typed entry to `projectsRaw` in
`src/stores/profile.ts`. The portfolio automatically renders the catalogue only
when it has at least one entry, so the empty state does not add an unfinished
section to the CV.
