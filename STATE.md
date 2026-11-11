# STATE

Replace on every update. Max 40 lines. History lives in git and `docs/decisions/`.

Status: Levels 0 to 10 have full 4-step lessons (task module-lessons done 2026-11-11, decision 0005).
Focus: Review the lesson content and walk a level end to end in the browser.
Level: L1

Context:
- Working_On: lesson content review
- Relevant_Files: `lib/lessons.ts`, `lib/lessons/level-N.ts`, `components/LessonSteps.tsx`, `components/LessonView.tsx`, `content/coverage.md`
- Do_Not_Touch: `RAW_content/` (read-only source); `lib/progress.tsx` storage key `agent-path:v1`
- Relevant_Decisions: 0003, 0004, 0005

Next:
- User review of levels 0 to 10: style, and facts added beyond the source (listed in the commit message).
- Visual check of each step type in the browser; confirm progress survives a reload.
- Run the level 7 RAGAS lab once with a real API key.
- Add a single `check` script; until then run `npm run typecheck` and `npm run build`.

Open_Questions:
- Hosting and deployment target?
- When to add French, and with which URL scheme (e.g. `/fr`)?
- Migrate to `src/modules/` now or later?
- XP thresholds per level (currently 400 × level; a level now gives 100 XP)?
- Keep `Level.topics` in `lib/curriculum.ts` now that lessons exist?

Blockers:
- None.
