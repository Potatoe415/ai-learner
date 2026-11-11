# ARCHITECTURE

Agents propose changes; the user confirms before any edit.
Every stack choice also gets a decision in `docs/decisions/`.

## Stack

| Layer | Choice |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript 5 strict (decision 0002) |
| Backend | None. All routes are statically generated. |
| Database | None. Learner progress in browser `localStorage`, key `agent-path:v1` (decision 0003) |
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
| `app/` | Routes `/`, `/level/[n]` (levels 0–10, SSG), `/trophies`; root layout wraps `ProgressProvider` | none | `components/`, `lib/` |
| `components/PathView.tsx` | Path page: hero, base camp, zones, summit | none | `characters`, `icons`, `lib/curriculum`, `lib/progress` |
| `components/LessonView.tsx` | Lesson steps, concept quiz, placeholders | none | `characters`, `icons`, `lib/curriculum`, `lib/lessons`, `lib/progress` |
| `components/TrophiesView.tsx` | Profile, trophy cabinet, deliverables | none | `characters`, `icons`, `lib/curriculum`, `lib/progress` |
| `components/characters.tsx`, `components/icons.tsx` | Presentational SVG | none | none |
| `lib/curriculum.ts` | Zones, levels, trophies, deliverables | static course structure | none |
| `lib/lessons.ts` | Lesson content per level | static lesson content | none |
| `lib/progress.tsx` | Progress state and persistence | `localStorage` key `agent-path:v1` | `lib/curriculum` |
| `app/globals.css` | All styles, global | none | none |

Proposed target modules (inferred — confirm): `curriculum`, `lessons`, `progress`, `path`, `lesson`, `trophies`; `src/shared/ui/` for characters and icons.

Boundary problems observed (sampling, not a full scan):
- No `src/modules/`; feature code is split across `components/` and `lib/`.
- Trophy ids (`level-N`, `streak-7`) are built in `lib/progress.tsx` and matched by string in `TrophiesView.tsx` glyphs.
- Zone colours repeated in `lib/curriculum.ts`, `TrophiesView.tsx` glyphs and `app/globals.css`.
- Mascot selector duplicated in `PathView.tsx` and `LessonView.tsx`.
- Placeholder lesson steps and a dev-only "mark step done" button in `LessonView.tsx`, not marked `TEMP:`.
- One global stylesheet for every page.

Rules:
- Dependencies flow only in the directions listed above. No cycles.
- `src/shared/` is domain-free: utilities, logger, error type, validation helpers, config loader.
- A new module needs a row here, plus `AGENTS.md` and `DATA.md` from `docs/_templates/`.

## Conventions

- Naming: PascalCase for components and their files, camelCase for functions, UPPER_CASE for static data constants (observed).
- Formatting and linting: Not defined yet (no linter or formatter configured).
- Tests: colocated inside each module. None exist yet.
- Configuration: read from the environment once at startup, validated, exposed as one typed object. No direct environment access elsewhere. Currently no environment variables; `process.env.NODE_ENV` is read directly in `LessonView.tsx`.
