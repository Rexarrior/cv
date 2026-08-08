# Personal Site — Александр Родионов

The root site is a portfolio and CV. Future demos live on their own subdomains;
the routing and deployment contract is in [docs/hosting-architecture.md](docs/hosting-architecture.md).
Long-form English articles are built from Markdown and published independently
at `articles.rexarrior.fun/<slug>`.

## 🛠️ Tech Stack

- **Framework:** Vue 3 (Composition API) + TypeScript
- **Build Tool:** Vite
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **Styling:** SCSS (SASS)
- **Utilities:** VueUse (@vueuse/core)
- **Server:** Nginx (Docker)

## 📦 Installation & Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Build the static article library
npm run build:articles
```

## 🐳 Docker

```bash
# Configure mandatory secrets once
cp .env.example .env
# edit .env and replace both placeholder values with long random secrets

# Build and run (site + telemetry API)
docker compose up -d

# Stop
docker compose down

# Rebuild
docker compose up -d --build
```

Site will be available at http://localhost:3000
and the article library at http://localhost:3001 after `docker compose up`.

### Telemetry

A lightweight FastAPI + SQLite backend collects page views. Configure secrets via env (see `.env.example`):

- `STATS_TOKEN` — protects `/api/stats` and `/api/dashboard`. **Set a strong random string.**
- `IP_SALT` — salt for hashing visitor IPs.

View stats:

- Dashboard (HTML): `http://localhost:3000/api/dashboard?token=<STATS_TOKEN>`
- JSON: `http://localhost:3000/api/stats?token=<STATS_TOKEN>`

Data is stored in `./data/telemetry.db` (SQLite, WAL mode). Back up this file
and set a retention policy before treating the data as durable analytics.

`/api/track` and `/api/cv.pdf` are rate-limited by Nginx. PDF generation is also
bounded by `PDF_CONCURRENCY` (default: 2) to prevent it from starving the API.

## 📁 Project Structure

```
├── src/
│   ├── components/     # Vue components
│   ├── views/          # Page views
│   ├── stores/         # Pinia stores (data)
│   ├── router/         # Vue Router config
│   └── styles/         # SCSS styles
├── articles/
│   ├── content/        # One Markdown directory per article slug
│   ├── build.mjs       # Static article-library generator
│   └── Dockerfile      # Independent articles.rexarrior.fun image
├── public/             # Static assets
├── nginx.conf          # Nginx config
├── Dockerfile
└── docker-compose.yml
```

## 🔧 Configuration

All personal data is in `src/stores/profile.ts` — edit this file to update resume content, contacts, experience, etc.

## Adding an article

1. Create `articles/content/<slug>/article.json` and `article.md`.
2. Put local images in `articles/content/<slug>/assets/` and reference them as
   `assets/<filename>` from Markdown.
3. Run `npm run build:articles`. The generator validates the slug and metadata,
   rebuilds the library index, and writes the static site to `articles/dist/`.
4. Add the public article URL to the relevant portfolio card only after the
   article deployment is reachable.

See [docs/hosting-architecture.md](docs/hosting-architecture.md) for DNS, TLS,
reverse-proxy, and deployment details.
