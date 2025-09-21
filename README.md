# Trackman Front-End Challenge — Facilities Manager

Small React app for managing Facilities (e.g., golf clubs).
Includes a Facilities List and Create/Edit pages, shows **Open/Closed** status from working hours, enforces **default facility rules**, persists data to `localStorage`, and aims for visual parity with the provided Figma.

---

## ✨ Features

- Facilities list in responsive card grid
- Open/Closed badge based on current time (`HH:mm`, 24-hour, overnight supported)
- Create/Edit pages with validation (React Hook Form + Zod)
- Exactly one default facility at a time
  - First created is auto-default (checkbox disabled)
  - Setting a new default unmarks the previous
  - Deleting the default auto-reassigns a new default
- Data persists in `localStorage`

---

## 🧰 Tech Stack

- **React 18 + Vite + TypeScript**
- **React Router** (routing)
- **Zustand** (state + selectors)
- **React Hook Form + Zod** (forms + validation)
- **Tailwind CSS v4.1** (tokens via CSS variables)
- **Husky / Commitlint / lint-staged** (quality & Conventional Commits)

> Node **≥18** recommended.

---

## 🚀 Getting Started

```bash
# 1) Install
npm install

# 2) Run dev server
npm run dev

# 3) Build + preview production
npm run build && npm run preview
```

Open the dev server URL printed in your terminal

## 📜 NPM Scripts

- `dev` - Vite dev server
- `build` - Production build
- `preview` - Preview production build
- `lint` - ESLint
- `format` - Prettier (via lint-staged on commit)
- `typecheck` - TypeScript

## 💾 Data & Persistence

Facilities data is stored in localStorage.

- **Key**: trackman.facilities.v1
- **Shape**:
  ```typescript
  type DB = {
    version: 1;
    facilities: Facility[];
  };
  ```

Seeding: On first load, a small dataset is seeded.

- **Seed flag key**: trackman.seeded.v1

To reset:

- Go to: **Inspect** -> **Application** -> **Local Storage** and remove `trackman.facilities.v1` and `trackman.seeded.v1` and reload the page.

## 🧠 Business Rules

### Open/Closed

- Time format: 24-hour `HH:mm` (validated by Zod)
- Inclusive at opening, exclusive at closing
- Overnight hours supported:
  - If `open < close`: `now >= open && now < close`
  - If `open > close`: `now >= open || now < close`
  - If `open === close`: treated as closed

### Default Facility

- First facility is auto-default (checkbox checked & disabled)
- At most **one** default at any time
- Setting a new default unmarks the old default
  -Deleting the default auto-reassigns a new default (random pick)

### Sorting

- Default facility pinned first
- Others sorted alphabetically (locale-aware)
- Implemented in `src/utils/facilities.ts` and store selector

## 🏗️ Architecture

```bash
src/
  app/            # bootstrap + router
  assets/         # logo
  components/ui/  # UI primitives
  constants/      # constants
  data/           # seed data
  hooks/          # Hooks
  pages/          # FacilitiesList, FacilityCreate, FacilityEdit
  schemas/        # Zod schemas
  services/       # storage (localStorage CRUD)
  store/          # Zustand store (facilities + selectors)
  types/          # domain types
  utils/          # time utils, sorting
  index.css       # Tailwind v4.1 + theme tokens
```

### Pages

- `/facilities` – list (cards with “Edit”, “Delete”, “Set default”)
- `/facilities/new` – create form (auto-default on first)
- `/facilities/:id/edit` – edit form (default toggle)

## 🎨 Design System & Theming

Tailwind v4.1 with tokens (`index.css @theme`):

- **Colors**: `--color-orange-*`, `--color-grey-*`, `--color-success`, `--color-error`
- **Typography scale**: `--text-h1/h2/h3`, `--text-body`, `--text-s`
- **Utilities**: Focus rings, status colors

#### Primitives:

- **Button** – variants (primary, secondary, ghost, danger), sizes (md, sm)
- **Input** – label + hint/error, `aria-*` attributes
- **ConfirmDelete** – accessible dialog (focus trap, ESC/overlay close, return focus)
- **FacilityCard / FacilityGrid** – a11y-friendly presentational components

## 🧭 Conventional Commits & Workflow

- Commit style: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Husky + Commitlint + lint-staged enforce formatting/linting
