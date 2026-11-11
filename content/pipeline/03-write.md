# Stage 3 · Write

Reads `content/02-library/` (or `content/01-extracted/` where the library does not cover a topic yet). Writes `content/03-lessons/`. Done by an agent or a human following this spec. File format: [lesson-format.md](lesson-format.md).

## Layout

```
content/03-lessons/
  <trail>/
    trail.md                   name, description, zone order, deliverables shown on the profile
    zones/<key>.md             one per zone
    module-<n>/
      module.md                title, zone, units, badge, topics
      history.md               History unit (only if the module lists it)
      concept.md               Concept unit: a reading
      concept-quiz.md          optional: interactive quiz that closes the Concept unit
      case-study.md
      lab.md
      deliverable.md
```

The site shows one trail for now; the build rejects a second trail folder until the site supports several.

## Rules

- Every fact in a lesson must come from its `based_on` inputs. Nothing from memory.
- Our own words; no verbatim source text, no course-platform links (decision 0005).
- Case studies cite their sources under `## Sources`.
- Points are not content: they live in `lib/scoring.ts`.
- Track coverage of the sources in `content/coverage.md`.
- After writing or revising a file: `npm run content:build` (format check), then `npm run content:status -- --stamp <file>`.
