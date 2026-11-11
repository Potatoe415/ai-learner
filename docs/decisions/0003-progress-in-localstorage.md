# 0003 — Learner progress in browser localStorage

Date: 2026-11-10
Status: Accepted
Decision: Store XP, streak, completed steps and trophies in browser `localStorage` (key `agent-path:v1`), with no accounts.
Context: The path, lessons and trophies need persistent progress from the first version.
Rationale: Chosen by the user. No backend or account to build; fast to ship; can be migrated later.
Consequences: Progress is per browser and device and can be lost. No server data, no authentication. A later move to accounts needs a migration of the stored shape.
Alternatives_Rejected: Supabase with accounts (deferred: more scope before any content exists).
