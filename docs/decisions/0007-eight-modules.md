# 0007 — Eight modules, one per MIT module

Date: 2026-11-11
Status: Accepted (supersedes the 11-module structure of 0006; the rest of 0006 stands)
Decision: The trail has exactly 8 modules and 8 badges. App module N covers MIT module N (`RAW_content/02_Modules/Module_N_*`), in MIT order. Each module keeps 4 units (Concept, Post-mortem, Lab, Deliverable). Zones: Workshop 1–3, Fortress 4, Field 5–6, Summit 7–8. Progress moves to `localStorage` key `agent-path:v3`.
Context: The user asked to stick to the 8 MIT modules and their content. The 11-module layout split MIT module 1 over three modules and MIT module 7 over two, and added a base camp module 0.
Rationale:
- One badge per MIT module keeps the trail faithful to the source and easy to audit (`content/coverage.md`).
- Every lesson was rewritten from the source, module by module; facts, cases and figures not in `RAW_content/02_Modules/` were removed.
- Ranks keep their names, with badge steps 0 / 1 / 3 / 5 / 7 / 8 and point thresholds 0 / 400 / 1,300 / 2,200 / 3,100 / 3,550, still under the worst case (450 per module), so finishing reaches every rank. Trail: 4,800 points.
- v1 and v2 progress is not migrated: module numbers and unit content changed, so no mapping is meaningful. Old keys are left in storage, untouched.
Consequences: Learners restart from zero. `/module/0`, `/module/9` and `/module/10` no longer exist (404). Module 7 combines Labs 3 and 4 in one lab.
Alternatives_Rejected: A variable number of units per module to keep every former unit (needs a new unit model, scoring and storage). Track order 1, 2, 3, 4, 7, 5, 6, 8 (numbers out of order on screen).
