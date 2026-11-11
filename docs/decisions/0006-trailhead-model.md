# 0006 — Trailhead model: one trail, modules, badges, points and ranks

Date: 2026-11-11
Status: Accepted
Decision: Structure the course like Salesforce Trailhead: one trail (PAF) of 11 modules (0 to 10), each with 4 units and one badge; points per unit; six learner ranks (levels 0 to 5) that need both a badge count and a point total. Progress moves to `localStorage` key `agent-path:v2`.
Context: The user asked to follow Trailhead's method. The former "levels" 0 to 10 were course sections; "level" now means the learner's rank.
Rationale:
- Units: quiz units (Concept, Post-mortem) pay 100 / 50 / 25 by attempt, as Trailhead quizzes do; hands-on units (Lab, Deliverable) pay a fixed 200. A module is worth 600, the trail 6,600.
- Ranks: Curious (0, 0), Operator (1 badge, 400), Builder (3, 1,300), Integrator (5, 2,200), Guardian (8, 3,500), Agentic Architect (11, 4,900). Badge steps follow the zone ends. Point thresholds sit just under the worst case (450 per module), so anyone who finishes reaches every rank: never punitive.
- Each wrong option costs once, however often it is clicked. Points are fixed when a unit completes.
- v2 stores per unit `{ points, at }` and per quiz unit the wrong-answer count; it is sanitised on read. v1 is migrated once with full points per completed step and its last active day as the date, then removed.
- Zones stay as visual grouping. The XP field in lesson content, the 7-day streak and its trophy are removed.
Consequences: Routes become `/module/[n]` (with `?unit=N`) and `/profile`; `/level/:n` and `/trophies` redirect permanently. Point values live only in `lib/scoring.ts`, not in lesson content. With a single trail, badges drive the rank; points will matter more once optional content exists.
Alternatives_Rejected: Points-only ranks (lets someone rank up without finishing modules); keeping per-step XP in content files (values duplicated across 11 files); keeping the streak (not part of Trailhead, user agreed to drop it).
