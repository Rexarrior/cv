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

## Adding a catalogue card

When a project is public, add one typed entry to `projectsRaw` in
`src/stores/profile.ts`. The portfolio automatically renders the catalogue only
when it has at least one entry, so the empty state does not add an unfinished
section to the CV.
