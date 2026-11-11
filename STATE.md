# STATE

Replace on every update. Max 40 lines. History lives in git and `docs/decisions/`.

Status: Trailhead model in place (task trailhead-model done 2026-11-11, decision 0006): trail "AI integration in organisations", 11 modules × 4 units, badges, points, six levels.
Focus: User review of the side menu, the Nimbus mascot, the trail and profile pages, and rank names and thresholds.
Level: L1

Context:
- Working_On: trail and profile review
- Relevant_Files: `components/SideNav.tsx`, `lib/scoring.ts`, `lib/progress.tsx`, `lib/curriculum.ts`, `components/TrailView.tsx`, `components/ProfileView.tsx`, `components/badges.tsx`
- Do_Not_Touch: `RAW_content/` (read-only source); `lib/progress.tsx` storage key `agent-path:v2` and its v1 migration
- Relevant_Decisions: 0003, 0004, 0005, 0006

Next:
- User review: rank names, thresholds, badge glyphs.
- Review lesson content of modules 0 to 10 (style, facts beyond the source).
- Run the module 7 RAGAS lab once with a real API key.
- Add a single `check` script and a test runner; the browser walk used for this task lived outside the repo.

Open_Questions:
- Hosting and deployment target?
- When to add French, and with which URL scheme (e.g. `/fr`)?
- Migrate to `src/modules/` now or later?
- Keep `CourseModule.topics` in `lib/curriculum.ts` now that lessons exist?
- Unit time estimates (200 words a minute, 20 min per deliverable): calibrate with real learners?

Blockers:
- None.
