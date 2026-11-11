# Task: module-lessons

Level: L2
Status: Blocked (plan approved 2026-11-11, execution deferred by the user)
Goal: Turn the 8 MIT modules and their Complements into the 4-step lessons (Concept, Post-mortem, Lab, Deliverable) for levels 0 to 10.
Scope: `lib/lessons.ts`, new `lib/lessons/level-N.ts`, `components/LessonView.tsx`, `docs/tasks/module-lessons.md` (coverage matrix), `STATE.md`, `docs/DATA_MODEL.md`, `docs/BACKLOG.md`, `docs/decisions/`.
Do_Not_Touch: `lib/progress.tsx` (storage key `agent-path:v1`), `lib/curriculum.ts` level structure, `app/globals.css` beyond what new step renderers strictly need.

Source (outside the repo, read-only):
`M:\Users\admin\myDrive\09_llm-vault-remi\llm-vault-studies\MIT\02_Modules`
- `Module_N_Complete.md` and `Module_N_Complements.md`, N = 1..8
- `MIT_Agentic_AI_Master_Curriculum.md` (same as `content/curriculum.md`)
- `02_Modules1-5.zip`: older copy of modules 1 to 5, excluded.
- Excluded as non-lesson content: optional forums, surveys, Captain's Log, Q&A boards, Canvas navigation guide.

Assumptions:
- Content stays as TypeScript objects, one file per level in `lib/lessons/level-N.ts`, aggregated by `lib/lessons.ts`. No new dependency.
- Lessons are rewritten in our own words. No verbatim copy of MIT text, no Canvas or video links.
- Labs are guided steps with code snippets and a checklist, completed by self-declaration. Nothing is executed in the browser.
- Deliverables are templates to copy or download: security memo, 4D KPI scorecard, capstone adoption plan.
- UI language stays English (decision 0004).
- The existing level 4 concept quiz is kept.
- Complements feed the post-mortems and real cases (Klarna, Octopus Energy, etc.).

Level to source mapping:

| Levels | Source module |
|---|---|
| 0, 1, 2 | Module 1 |
| 3 | Module 2 |
| 4 | Module 3 |
| 5 | Module 4 |
| 6, 7 | Module 7 |
| 8 | Module 5 |
| 9 | Module 6 |
| 10 | Module 8 (Capstone) |

Plan:
1. Content model: add `reading`, `postMortem`, `lab`, `deliverable` types to `LessonContent` in `lib/lessons.ts`; split content into `lib/lessons/level-N.ts` → verify: `npm run typecheck`.
2. Rendering: add a renderer per step in `components/LessonView.tsx`; remove the "coming soon" placeholders and the dev "mark step done" button (or mark them `TEMP:`); keep the level 4 quiz → verify: `npm run build`, visual check of one level.
3. Content, levels 0 to 2 (module 1) with the new model, then stop and let the user validate the style → verify: typecheck + build, user review.
4. Content, levels 3 to 10, one level at a time per the mapping above → verify: typecheck + build after each level.
5. Coverage matrix: in this file, list every source chapter (Complete and Complements) with its level and step, plus the excluded items → verify: no unmapped chapter left.
6. Docs: update `STATE.md`, add a decision file and a line in `docs/decisions/INDEX.md` (content format), update `docs/DATA_MODEL.md` and `docs/BACKLOG.md`, propose (do not edit) changes to `docs/PRODUCT.md` and `docs/ARCHITECTURE.md`, delete this file, propose a commit message → verify: `npm run typecheck` and `npm run build` pass.

Acceptance_Criteria:
- [ ] Levels 0 to 10 each have all 4 steps with real content; no "coming soon" step remains.
- [ ] Every non-excluded chapter of the 16 source files appears in the coverage matrix.
- [ ] `npm run typecheck` and `npm run build` pass.
- [ ] A level can be completed end to end and the progress persists (`agent-path:v1`).
- [ ] No verbatim MIT text, no Canvas URLs in the content.

Security_Checklist: not applicable (static content, no endpoint or action added).
Related_Decisions: 0004 (English-first UI); new decision to add at the end (lesson content format).
Notes:
- Baseline commit before this task: `45b721c`.
- Source size: about 13,400 lines / 930 KB. Do the reading per module while writing its levels, not all at once.
- Open questions in `STATE.md` (MDX vs TS, XP thresholds) are settled here for content format only (TS).
