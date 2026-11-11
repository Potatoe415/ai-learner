# STATE

Replace on every update. Max 40 lines. History lives in git and `docs/decisions/`.

Status: All site content comes from Markdown through a 4-stage pipeline (decision 0008, `content/pipeline/`). Trail: 8 modules, 4 zones, all units open; home `/` (trail tiles + ghost tile), `/trail`, `/module/[n]`, `/profile`. BACKLOG-UI fully processed: "Case study" unit (was Post-mortem, code names too), module 8 "Personal project" (was Capstone), light site header "AI Academy" (logo + title + profile button only), module view close cross top right with "(earned / total points)", optional Lab units (decision 0009).
Focus: User review of the UI changes and of the optional-unit scoring.
Level: L2 (decision 0009 logged)

Context:
- Working_On: BACKLOG-UI done; next raw material goes through the pipeline
- Relevant_Files: `content/pipeline/README.md`, `content/03-lessons/ai-integration/`, `lib/scoring.ts` (totals, bonus, ranks), `lib/curriculum.ts` (`isOptionalUnit`, `requiredUnitsOf`), `components/SideNav.tsx` (site header), `components/LessonView.tsx`
- Do_Not_Touch: `RAW_content/` (read-only); `lib/generated/` (generated); `lib/progress.tsx` storage key `agent-path:v4` and its v3 migration
- Relevant_Decisions: 0006, 0007, 0008, 0009

Next:
- Site header: Explore / Resources menus, search (Ctrl K) and Sign in were deferred ("logo and title only for now"); decide contents and how Sign in relates to the profile button.
- Optional units: a non-code alternative to the Lab for non-coders (not decided).
- French labels ("Étude de cas", "Projet personnel") when French UI arrives (decision 0004).
- Feed new raw material: drop it in `RAW_content/`, `npm run content:extract`, then stage 2 notes in `content/02-library/`.
- `docs/PRODUCT.md` and `docs/ARCHITECTURE.md` still describe 11 modules and TS content in places: confirm and apply the 8-module and pipeline update.
- Add tests for `scripts/content/` and for `lib/scoring.ts` (rank reachable with required units only), and a single `check` script.
- Module 5 cites the EU AI Act fine (€35M / 7 %) in the HR context: check the tier with the source owner.

Open_Questions:
- Automate stages 2 and 3 with the Claude API later (cost, API key)?
- Several trails on the home page: when, and which subject for the ghost tile?
- Hosting and deployment target? French, and with which URL scheme?

Blockers:
- None.
