# BACKLOG

Current work only. Completed work lives in git history.

## Now
- [ ] Review the lesson content of levels 0 to 10 (style, facts added beyond the source: see `content/coverage.md` and the commit notes).
- [ ] Walk one level end to end in the browser and confirm progress persists after a reload.
- [ ] Initialize git and commit a baseline, so tasks can start from a checkpoint.
- [ ] Confirm the inferred parts of `docs/PRODUCT.md`, `docs/ARCHITECTURE.md` and `docs/SECURITY.md`.

## Next
- [ ] Run the level 7 RAGAS lab once with a real API key and check the expected scores.
- [ ] Set `outputFileTracingRoot` in `next.config.mjs` (build warns about a parent `package-lock.json`).
- [ ] `lib/curriculum.ts` `Level.topics` comment says "used until full lessons are written": decide whether to keep the field.
- [ ] Add a single `check` script: typecheck + lint + tests + dependency audit (no linter or test runner yet).
- [ ] Commit `package-lock.json` after the first install on the dev machine.
- [ ] Choose hosting; record it in `docs/ARCHITECTURE.md` with a decision; create `docs/RUNBOOK.md`.
- [ ] Validate stored progress read from `localStorage` with a schema before use.
- [ ] Decide how the error and logging contract of `docs/DEBUGGING.md` applies to a client-only app; add the shared error type.
- [ ] Add secret scanning (pre-commit and CI) and dependency audit in `check`.
- [ ] French i18n layer (decision 0004).
- [ ] Define the first testable milestone.

## Migration to modules (one module per step)
- [ ] `curriculum`: move `lib/curriculum.ts` to `src/modules/curriculum/` with `AGENTS.md` and `DATA.md`.
- [ ] `lessons`: move `lib/lessons.ts`, `lib/lessons/` and `components/LessonSteps.tsx`.
- [ ] `progress`: move `lib/progress.tsx`; it owns `localStorage` key `agent-path:v1`; expose trophy ids and glyph keys from one place.
- [ ] `path`: move `components/PathView.tsx` and its styles.
- [ ] `lesson`: move `components/LessonView.tsx` and its styles.
- [ ] `trophies`: move `components/TrophiesView.tsx`, its glyphs and styles.
- [ ] Move `components/characters.tsx` and `components/icons.tsx` to `src/shared/ui/`; share one mascot selector.

## Blocked
- None.
