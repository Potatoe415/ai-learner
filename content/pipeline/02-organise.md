# Stage 2 · Organise

Reads `content/01-extracted/`. Writes `content/02-library/`. Done by an agent or a human following this spec.

Goal: turn a pile of extracted sources into a library of topic notes filed by the site's categories, so that stage 3 can write a lesson from a handful of notes instead of whole sources.

## Layout

```
content/02-library/
  <trail>/                     same folder name as in content/03-lessons/ (e.g. ai-integration)
    module-<n>/                one folder per module of the trail
      <topic>.md               one note per topic (kebab-case name)
    _unsorted/                 material that fits no module yet
```

A note that serves several modules lives in the module where it matters most; others link to it in their `based_on`.

## Note format

```markdown
---
kind: note
based_on: content/01-extracted/<path>.md, content/01-extracted/<other>.md
based_on_hash: <set by npm run content:status -- --stamp>
topic: Prompt injection
---

## Facts
- One fact per bullet, in our own words. [Module_4_Complete §2]

## Cases
- Name, year, what happened, the numbers. [Module_4_Complements]

## Open questions
- Contradictions between sources, missing figures, things to check.
```

## Rules

- Facts only from the listed inputs. Mark each with a short source reference in brackets.
- Rewrite, do not copy. Short quotes only when the wording matters, in quotation marks.
- Contradictions go under Open questions, never silently resolved.
- After writing or revising a note: `npm run content:status -- --stamp <note>`.

## Current state

The 8 modules of `ai-integration` were written before this stage existed: their lessons are based directly on `content/01-extracted/`. New material goes through the library; existing lessons move to library notes when they are next revised.
