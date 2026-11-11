# 0009 — Optional units: code units are a bonus, not needed for the badge

Date: 2026-11-11
Status: Accepted
Decision: A unit that contains code or needs coding knowledge is optional: it is labelled "Optional" wherever it appears, the module badge does not need it, and its points are a bonus on top of the module and trail totals. Today this is every Lab (all need Python 3.10+).
Context: BACKLOG-UI item "Optional units". The user chose "bonus, not required" over a label-only change or removing the points.
Rationale:
- Content declares it: `optional: Lab` in each `module.md` (comma-separated subset of `units`, checked by the build). No unit kind is optional by rule, so a future non-code Lab can stay required.
- Scoring (`lib/scoring.ts`): `moduleMaxPoints` counts required units only (400, module 1: 500; trail 3,300); `moduleBonusPoints` / `TRAIL_BONUS_POINTS` hold the optional ones (200 per module, 1,600). Bonus points still add to the learner's total and count for ranks.
- Ranks need the same badges but lower points, under the worst case of the required units alone (every quiz at 25, no Lab: 250 per module, 275 for module 1), so finishing always reaches the rank: Operator 200, Builder 700, Integrator 1,200, Guardian 1,700, Agentic Architect 2,000 (were 400 / 1,300 / 2,200 / 3,100 / 3,550).
- Badge (`lib/progress.tsx`): earned when all required units are done; badge date is the last required unit. Trail and home % done and time left count required units only.
- Storage is unchanged (`agent-path:v4`): Labs already done keep their 200 points, now counted as bonus.
Consequences: Supersedes the "a module is worth 600" and rank-threshold parts of 0006. No non-code alternative to the Lab for now. A learner may hold a badge with the Lab undone.
Alternatives_Rejected: Label only (non-coders could never earn a badge); removing Lab points (takes away the reward for doing the hardest unit).
