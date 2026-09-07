# net2rent-frontend

![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-bundler-646CFF)
![SCSS](https://img.shields.io/badge/SCSS-styling-CC6699)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

Frontend for the Incident Management App — two experiences in one app: a public guest portal (identify with a lodging reference + PIN, report and track incidents) and a staff backoffice (login, triage, manage lodgings and users).

**Backend repository:** [net2rent-backend](https://github.com/Net-2-Rent/net2rent-backend)

## Project Status

Implemented: full guest portal flow (identification, lodging view, new incident, confirmation, incident detail), staff login, incident triage and detail screens, new phone-incident form, lodgings and users management.

Pending: the backoffice incident list (`/backoffice/incidencias`) is still a placeholder.

`/sandbox` and `/sandbox/backoffice` are internal development routes, not part of the product — they should not be relied on and are expected to be removed before delivery.

## Tech Stack

- React 19 + Vite
- SASS/SCSS (BEM naming, no CSS Modules)
- axios (HTTP client, JWT interceptor)
- react-router-dom
- react-hook-form
- zustand (auth/session state)
- lucide-react (icons)
- Vitest + Testing Library

## Project Structure
```
src/
├── app/ # Router, providers, guest/backoffice app scoping
├── features/
│ ├── auth/ # Staff login
│ ├── backoffice/ # Staff-facing pages and components
│ └── guest-portal/ # Public guest-facing pages and components
├── shared/
│ ├── api/ # HTTP clients
│ ├── components/ui/ # Cross-platform components (atoms/molecules/organisms)
│ ├── constants/
│ └── utils/
├── styles/ # Shared SCSS tokens and mixins
└── hooks/
```


## Prerequisites

- Node.js (no version pinned in `package.json` yet — a recent LTS, e.g. 20+, is recommended)
- The backend ([net2rent-backend](https://github.com/Net-2-Rent/net2rent-backend)) running locally on port 8080

## Environment Variables

Copy `.env.example` to `.env` and adjust if needed:

| Variable | Description |
| :--- | :--- |
| `VITE_API_URL` | Base URL of the backend, e.g. `http://localhost:8080` |

Note: this variable is read by the guest portal's HTTP client (`guestHttpClient.js`). The staff client (`shared/api/httpClient.js`) currently has the backend URL hardcoded to `http://localhost:8080/api` instead — if your backend runs elsewhere, edit that file directly for now.

## Local Setup

1. Clone the repo and install dependencies:
```bash
   git clone git@github.com:Net-2-Rent/net2rent-frontend.git
   cd net2rent-frontend
   git checkout <your-branch>
   npm install
```
2. Start the dev server:
```bash
   npm run dev
```
   Served by default at `http://localhost:5173/`.

## Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (Vitest) |

## Routes Reference

**Guest portal** (public)

| Route | Screen |
| :--- | :--- |
| `/` | Identification (lodging reference + PIN) |
| `/alojamiento` | Guest's lodging and incident list |
| `/incidencias/nueva` | New incident form |
| `/incidencias/confirmacion/:code` | Confirmation screen |
| `/incidencias/:id` | Incident detail (guest view) |

**Backoffice** (staff, requires login)

| Route | Screen |
| :--- | :--- |
| `/login` | Staff login |
| `/backoffice` | Index |
| `/backoffice/incidencias` | Incident list — placeholder, not implemented yet |
| `/backoffice/incidencias/:id` | Incident detail |
| `/backoffice/nueva-incidencia` | New phone incident |
| `/backoffice/alojamientos` | Lodgings |
| `/backoffice/usuarios` | Users |
| `/backoffice/perfil` | Profile |

## Related Documentation

- [`VOCABULARIO.md`](./VOCABULARIO.md) — domain naming conventions.