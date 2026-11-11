# 0005 — Lesson content as typed TypeScript objects, one file per level

Date: 2026-11-11
Status: Superseded by 0008
Decision: Lesson content lives in `lib/lessons/level-N.ts` as typed objects (`Reading`, `ConceptQuiz`, `PostMortem`, `Lab`, `DeliverableStep`), aggregated by `lib/lessons.ts` and rendered by `components/LessonSteps.tsx`.
Context: The 8 MIT modules and their complements (`RAW_content/02_Modules/`) had to become the 4 steps of levels 0 to 10. `STATE.md` listed "TypeScript objects or MDX" as an open question.
Rationale: No new dependency; the compiler checks every lesson against the step types; content stays extractable for the planned French layer (decision 0004). Text is rewritten in our own words, with no verbatim source text and no course-platform links. Labs run outside the app and are completed by self-declaration (checklist); deliverables are Markdown templates to copy or download.
Consequences: Adding a lesson means editing TypeScript. Rich formatting is limited to what the step types allow (sections, bullets, tables, callouts, code blocks). Coverage of the source is tracked in `content/coverage.md`. Step XP: Concept 20, Post-mortem 20, Lab 30, Deliverable 30.
Alternatives_Rejected: MDX under `content/` (new dependencies, weaker typing of step structure). Markdown files parsed at build time (needs a parser and a schema to get the same guarantees).
