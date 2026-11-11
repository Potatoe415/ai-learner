# STATE

Replace on every update. Max 40 lines. History lives in git and `docs/decisions/`.

Status: Bootstrapped 2026-11-10 (ALIGN on the existing Next.js prototype).
Focus: Confirm inferred docs, then write the first real lesson content.
Level: L2

Context:
- Working_On: `docs/PRODUCT.md`, `docs/ARCHITECTURE.md` (inferred parts to confirm)
- Relevant_Files: `lib/curriculum.ts`, `lib/lessons.ts`, `lib/progress.tsx`, `components/LessonView.tsx`
- Do_Not_Touch: none
- Relevant_Decisions: 0001, 0002, 0003, 0004

Next:
- Execute the approved plan in `docs/tasks/module-lessons.md` (deferred by the user; baseline commit 45b721c).
- Add a single `check` script; until then run `npm run typecheck` and `npm run build`.
- Add the first lessons from the user's content into `lib/lessons.ts`.

Open_Questions:
- Hosting and deployment target?
- Which content comes first: level 1 concept, or the Post-mortem / Lab / Deliverable steps?
- Lesson content format: TypeScript objects (current) or MDX under `content/`?
- When to add French, and with which URL scheme (e.g. `/fr`)?
- Migrate to `src/modules/` now or after the first lessons?
- XP thresholds per level (currently 400 × level, placeholder)?

Blockers:
- None.
