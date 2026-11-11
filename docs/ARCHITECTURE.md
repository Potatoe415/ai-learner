# ARCHITECTURE

Agents propose changes; the user confirms before any edit.
Every stack choice also gets a decision in `docs/decisions/`.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript 5 strict (decision 0002) |
| Backend | None. All routes are statically generated. |
| Database | None. Learner progress in browser `localStorage`, key `agent-path:v2` (decisions 0003, 0006) |
| Runtime | Node.js (version not pinned) |
| Package manager | npm (no lockfile committed yet) |
| Hosting | Not decided |
| Authentication | None (decision 0003) |
| Validation library | Not decided |
| Logger | Not decided |
| Testing | Not decided |
| Fonts | `next/font/google`: Bricolage Grotesque (display), Figtree (body) |

Design source: Claude Design artifact "Agent Path: from level 0 to level 10" (https://claude.ai/artifact/BzroGwRouuWQLwtjoLPDHo).

## Style: modular monolith

One deployable, split into modules (bounded contexts) under `src/modules/<name>/`.
Goal: any module can be understood and changed by reading only its `AGENTS.md`, its `DATA.md`, its code, and the public entries of the modules it depends on.

## Module map

Current structure, as-is (organised by layer, not yet by module):

| Area | Purpose | Owns data | Depends on |
|---|---|---|---|
| `app/` | Routes `/` (trail), `/module/[n]` (modules 0–10, SSG, `?unit=N`), `/profile`; root layout wraps `ProgressProvider` and `SideNav`. `next.config.mjs` redirects `/level/:n` and `/trophies` | none | `components/`, `lib/` |
| `components/SideNav.tsx` | App-wide side menu: trail and profile links, level and points, modules by zone with units of the open module. Desktop rail (collapsed state in `localStorage` key `agent-path:nav-collapsed`), mobile drawer | none | `badges`, `characters`, `icons`, `lib/curriculum`, `lib/progress` |
| `components/TrailView.tsx` | Trail page: trail header (points, time left, %), zone bands, module cards with units | none | `badges`, `characters`, `icons`, `lib/curriculum`, `lib/lessons`, `lib/scoring`, `lib/progress` |
| `components/LessonView.tsx` | Module shell, unit navigation (the open unit lives in `?unit=N`), module 4 quiz, badge-earned banner | none | `badges`, `characters`, `icons`, `LessonSteps`, `lib/curriculum`, `lib/lessons`, `lib/progress` |
| `components/LessonSteps.tsx` | Reading, Post-mortem, Lab and Deliverable unit renderers | none | `icons`, `lib/lessons` |
| `components/ProfileView.tsx` | Profile: rank insignia, badges / points / trails, next rank, levels, badge cabinet, deliverables | none | `badges`, `characters`, `icons`, `lib/curriculum`, `lib/scoring`, `lib/progress` |
| `components/badges.tsx`, `components/characters.tsx`, `components/icons.tsx` | Presentational SVG and images | none | none |
| `lib/curriculum.ts` | Trail, units, zones, modules, badges, deliverables | static course structure | none |
| `lib/scoring.ts` | Unit points and the six ranks | static scoring rules | `lib/curriculum` |
| `lib/lessons.ts` | Lesson content model (unit types), aggregation of modules, unit titles and time estimates | none | `lib/lessons/` |
| `lib/lessons/module-N.ts` | Lesson content of module N (0 to 10) | static lesson content | `lib/lessons` (types only) |
| `lib/progress.tsx` | Progress state, persistence, v1 migration | `localStorage` key `agent-path:v2` | `lib/curriculum`, `lib/scoring` |
| `app/globals.css` | All styles, global | none | none |

Proposed target modules (inferred — confirm): `curriculum`, `lessons`, `scoring`, `progress`, `trail`, `lesson`, `profile`; `src/shared/ui/` for characters, icons and badges.

Boundary problems observed (sampling, not a full scan):
- No `src/modules/`; feature code is split across `components/` and `lib/`.
- Zone colours repeated in `lib/curriculum.ts`, `components/badges.tsx` glyphs, `lib/scoring.ts` rank colours and `app/globals.css`.
- Mascot selector duplicated in `TrailView.tsx` and `LessonView.tsx`; date and minute formatters duplicated in `TrailView.tsx` and `ProfileView.tsx`.
- One global stylesheet for every page.

Rules:
- Dependencies flow only in the directions listed above. No cycles.
- `src/shared/` is domain-free: utilities, logger, error type, validation helpers, config loader.
- A new module needs a row here, plus `AGENTS.md` and `DATA.md` from `docs/_templates/`.

## Conventions

- Naming: PascalCase for components and their files, camelCase for functions, UPPER_CASE for static data constants (observed).
- Formatting and linting: Not defined yet (no linter or formatter configured).
- Tests: colocated inside each module. None exist yet.
- Configuration: read from the environment once at startup, validated, exposed as one typed object. No direct environment access elsewhere. Currently no environment variables.
