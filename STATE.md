# STATE

Replace on every update. Max 40 lines. History lives in git and `docs/decisions/`.

Status: 8-module trail in place (decision 0007): app module N = MIT module N, 8 badges, 4 zones (Workshop 1–3, Fortress 4, Field 5–6, Summit 7–8). Every lesson rewritten from `RAW_content/02_Modules/` and audited 2026-11-11: facts not in the module's source were removed (audit notes in the commit message, coverage in `content/coverage.md`).
Focus: User review of the rewritten lessons, the 4 zones and the new rank thresholds.
Level: L2 (decision 0007 logged)

Context:
- Working_On: 8-module review
- Relevant_Files: `lib/curriculum.ts`, `lib/scoring.ts`, `lib/progress.tsx`, `lib/lessons/module-1.ts` to `module-8.ts`, `content/coverage.md`
- Do_Not_Touch: `RAW_content/` (read-only source); `lib/progress.tsx` storage key `agent-path:v3`
- Relevant_Decisions: 0003, 0004, 0005, 0006, 0007

Next:
- User review: lesson content, zone names and Summit colour, ranks (badges 0/1/3/5/7/8, points 0/400/1,300/2,200/3,100/3,550).
- Confirm and apply the 8-module update to `docs/PRODUCT.md` and `docs/ARCHITECTURE.md` (still describe 11 modules).
- Module 5 cites the source's EU AI Act fine (€35M / 7 %) in the HR context: may not be the right tier; check with the source owner.
- Run the module 7 lab (guardrail + RAGAS) once with a real API key.
- Add a single `check` script and a test runner.

Open_Questions:
- Hosting and deployment target?
- When to add French, and with which URL scheme (e.g. `/fr`)?
- Migrate to `src/modules/` now or later?
- Unit time estimates: calibrate with real learners?

Blockers:
- None.
