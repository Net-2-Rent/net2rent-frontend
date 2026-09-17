# net2rent-frontend

![React](https://img.shields.io/badge/React-19-61DAFB)
![Vite](https://img.shields.io/badge/Vite-bundler-646CFF)
![SCSS](https://img.shields.io/badge/SCSS-styling-CC6699)
![Status](https://img.shields.io/badge/status-MVP-brightgreen)

Frontend for the Incident Management App — two experiences in one app: a public guest portal (identify with a lodging reference + PIN, report and track incidents) and a staff backoffice (login, triage, manage lodgings and users).

**Backend repository:** [net2rent-backend](https://github.com/Net-2-Rent/net2rent-backend)

## Project Status

The MVP scope agreed with the client (net2rent) is implemented.

Implemented: the full guest portal (identification, lodging view, new incident, confirmation, incident detail) and the full staff backoffice (login, incident list, incident detail, new phone incident, lodgings management, users management, profile). Both apps have their own not-found pages.

Remaining polish and any deviations agreed with the client are tracked in the team's internal documentation.

## Tech Stack

- React 19 + Vite
- SASS/SCSS (BEM naming, no CSS Modules)
- axios (HTTP client, JWT interceptor)
- react-router-dom
- react-hook-form
- zustand (auth/session state)
- @dnd-kit (drag-and-drop, e.g. checklist reordering)
- react-phone-number-input (phone number fields)
- Geoapify geocoder autocomplete (optional address autocomplete)
- lucide-react (icons)
- Vitest + Testing Library
- ESLint + Prettier

## Project Structure
```
src/
├── app/          # Router, providers, guest/backoffice app scoping
├── features/
│   ├── auth/          # Staff login
│   ├── backoffice/    # Staff-facing pages and components
│   └── guest-portal/  # Public guest-facing pages and components
├── shared/
│   ├── api/           # HTTP client
│   ├── components/ui/ # Cross-platform components (atoms/molecules/organisms)
│   ├── constants/
│   └── utils/
├── styles/       # Shared SCSS tokens and mixins
└── hooks/
```

## Prerequisites

- Node.js (no version pinned in `package.json` yet — a recent LTS, e.g. 20+, is recommended)
- The backend ([net2rent-backend](https://github.com/Net-2-Rent/net2rent-backend)) running locally on port 8080

## Environment Variables

Copy `.env.example` to `.env` and adjust if needed:

| Variable | Required | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | Yes | Base URL of the backend, e.g. `http://localhost:8080`. The HTTP client appends `/api`. |
| `VITE_GEOAPIFY_KEY` | No | API key for the Geoapify address autocomplete used in the lodging address field. **Optional**: if it's not set, the field falls back to a plain text input and everything else works normally. Get a free key at [geoapify.com](https://www.geoapify.com/). |

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
| `/backoffice` | Redirects to `/backoffice/incidencias` |
| `/backoffice/incidencias` | Incident list |
| `/backoffice/incidencias/:id` | Incident detail |
| `/backoffice/nueva-incidencia` | New phone incident |
| `/backoffice/alojamientos` | Lodgings |
| `/backoffice/usuarios` | Users |
| `/backoffice/perfil` | Profile |

Unknown routes render a not-found page in the matching app (guest or backoffice).