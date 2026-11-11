# STATE

Replace on every update. Max 40 lines. History lives in git and `docs/decisions/`.

Status: All site content now comes from Markdown through a 4-stage pipeline (decision 0008, `content/pipeline/`): `RAW_content/` → `content/01-extracted/` (script) → `content/02-library/` (editorial, empty for now) → `content/03-lessons/` (editorial, one file per unit) → `lib/generated/` (script, not committed). The 8 modules were exported to Markdown and rebuild to identical data. Trail: 8 modules, 4 zones, all units open; home `/` (trail tiles + ghost tile), `/trail`, `/module/[n]`, `/profile`; round profile button top right.
Focus: User review of the pipeline and of the lesson content.
Level: L2 (decision 0008 logged)

Context:
- Working_On: content pipeline in place; next raw material goes through it
- Relevant_Files: `content/pipeline/README.md` (start here), `content/pipeline/lesson-format.md`, `scripts/content/`, `content/03-lessons/ai-integration/`, `lib/curriculum.ts` and `lib/lessons.ts` (types and helpers only)
- Do_Not_Touch: `RAW_content/` (read-only); `lib/generated/` (generated); `lib/progress.tsx` storage key `agent-path:v4` and its v3 migration
- Relevant_Decisions: 0006, 0007, 0008

Next:
- Feed new raw material: drop it in `RAW_content/`, `npm run content:extract`, then stage 2 notes in `content/02-library/`.
- First PDF or Word source: pick a converter for stage 1 (new dependency: ask the user).
- Move existing lessons onto library notes when they are next revised (they are based on `content/01-extracted/` directly).
- Confirm and apply the 8-module and pipeline update to `docs/PRODUCT.md` and `docs/ARCHITECTURE.md` (still describe 11 modules and TS content).
- Add tests for `scripts/content/` (parser errors, round trip) and a single `check` script.
- Module 5 cites the EU AI Act fine (€35M / 7 %) in the HR context: check the tier with the source owner.

Open_Questions:
- Automate stages 2 and 3 with the Claude API later (cost, API key)?
- Several trails on the home page: when, and which subject for the ghost tile?
- Hosting and deployment target? French, and with which URL scheme?

Blockers:
- None.
