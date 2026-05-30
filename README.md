# Personal Site — Александр Родионов

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
```

## 🐳 Docker

```bash
# Build and run
docker-compose up -d

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build
```

Site will be available at http://localhost:3000

## 📁 Project Structure

```
├── src/
│   ├── components/     # Vue components
│   ├── views/          # Page views
│   ├── stores/         # Pinia stores (data)
│   ├── router/         # Vue Router config
│   └── styles/         # SCSS styles
├── public/             # Static assets
├── nginx.conf          # Nginx config
├── Dockerfile
└── docker-compose.yml
```

## 🔧 Configuration

All personal data is in `src/stores/profile.ts` — edit this file to update resume content, contacts, experience, etc.