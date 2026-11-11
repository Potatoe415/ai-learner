# BACKLOG

Current work only. Completed work lives in git history.

## Now
- [ ] Initialize git and commit a baseline, so tasks can start from a checkpoint.
- [ ] Confirm the inferred parts of `docs/PRODUCT.md`, `docs/ARCHITECTURE.md` and `docs/SECURITY.md`.
- [ ] Add the first lessons from the user's content to `lib/lessons.ts`.

## Next
- [ ] Add a single `check` script: typecheck + lint + tests + dependency audit (no linter or test runner yet).
- [ ] Commit `package-lock.json` after the first install on the dev machine.
- [ ] Choose hosting; record it in `docs/ARCHITECTURE.md` with a decision; create `docs/RUNBOOK.md`.
- [ ] Decide the lesson content format: TypeScript objects (current) or MDX under `content/`.
- [ ] Add the Post-mortem, Lab and Deliverable step types to `LessonContent`.
- [ ] Mark placeholder lesson steps and the dev "mark step done" button in `LessonView.tsx` with `TEMP:`.
- [ ] Validate stored progress read from `localStorage` with a schema before use.
- [ ] Decide how the error and logging contract of `docs/DEBUGGING.md` applies to a client-only app; add the shared error type.
- [ ] Add secret scanning (pre-commit and CI) and dependency audit in `check`.
- [ ] French i18n layer (decision 0004).
- [ ] Define the first testable milestone.

## Migration to modules (one module per step)
- [ ] `curriculum`: move `lib/curriculum.ts` to `src/modules/curriculum/` with `AGENTS.md` and `DATA.md`.
- [ ] `lessons`: move `lib/lessons.ts`.
- [ ] `progress`: move `lib/progress.tsx`; it owns `localStorage` key `agent-path:v1`; expose trophy ids and glyph keys from one place.
- [ ] `path`: move `components/PathView.tsx` and its styles.
- [ ] `lesson`: move `components/LessonView.tsx` and its styles.
- [ ] `trophies`: move `components/TrophiesView.tsx`, its glyphs and styles.
- [ ] Move `components/characters.tsx` and `components/icons.tsx` to `src/shared/ui/`; share one mascot selector.

## Blocked
- None.
