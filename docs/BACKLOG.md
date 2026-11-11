# BACKLOG

Current work only. Completed work lives in git history.

## Now
- [ ] Review the trail and profile pages, rank names and thresholds (decision 0006).
- [ ] Review the lesson content of modules 0 to 10 (style, facts added beyond the source: see `content/coverage.md` and the commit notes).
- [ ] Confirm the inferred parts of `docs/PRODUCT.md`, `docs/ARCHITECTURE.md` and `docs/SECURITY.md`.

## Next
- [ ] Run the module 7 RAGAS lab once with a real API key and check the expected scores.
- [ ] Set `outputFileTracingRoot` in `next.config.mjs` (build warns about a parent `package-lock.json`).
- [ ] `lib/curriculum.ts` `CourseModule.topics` comment says "used until full lessons are written": decide whether to keep the field.
- [ ] Add a single `check` script: typecheck + lint + tests + dependency audit (no linter or test runner yet). First tests: `lib/scoring.ts` (worst case reaches every rank) and `lib/progress.tsx` sanitise and v1 migration.
- [ ] Commit `package-lock.json` after the first install on the dev machine.
- [ ] Choose hosting; record it in `docs/ARCHITECTURE.md` with a decision; create `docs/RUNBOOK.md`.
- [ ] Decide how the error and logging contract of `docs/DEBUGGING.md` applies to a client-only app; add the shared error type.
- [ ] Add secret scanning (pre-commit and CI) and dependency audit in `check`.
- [ ] French i18n layer (decision 0004).
- [ ] Define the first testable milestone.

## Migration to modules (one module per step)
- [ ] `curriculum`: move `lib/curriculum.ts` to `src/modules/curriculum/` with `AGENTS.md` and `DATA.md`.
- [ ] `lessons`: move `lib/lessons.ts`, `lib/lessons/` and `components/LessonSteps.tsx`.
- [ ] `scoring`: move `lib/scoring.ts`.
- [ ] `progress`: move `lib/progress.tsx`; it owns `localStorage` key `agent-path:v2`.
- [ ] `trail`: move `components/TrailView.tsx` and its styles.
- [ ] `lesson`: move `components/LessonView.tsx` and its styles.
- [ ] `profile`: move `components/ProfileView.tsx` and its styles.
- [ ] Move `components/characters.tsx`, `components/icons.tsx` and `components/badges.tsx` to `src/shared/ui/`; share one mascot selector and the date and minute formatters.

## Blocked
- None.
