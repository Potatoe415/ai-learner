# Stage 4 · Build

Reads `content/03-lessons/`. Writes `lib/generated/content.ts`. Script: `scripts/content/build.mjs` (`npm run content:build`).

## What it does

1. Parses every file with a small Markdown reader (`scripts/content/lib/markdown.mjs`): front matter, paragraphs, headings, lists, tables, fenced code, `:::` containers. No dependency.
2. Validates each file against its kind (`scripts/content/lib/read-site.mjs`) and the trail as a whole: modules numbered 1 to N, every listed unit has its file, zones and deliverables point to things that exist.
3. Reports **every** error as `file:line: message`, then stops without writing anything.
4. Writes `lib/generated/content.ts` (`TRAIL`, `ZONES`, `MODULES`, `DELIVERABLES`, `LESSONS`), typed against `lib/curriculum.ts` and `lib/lessons.ts`. The TypeScript compiler checks the result.

## Guarantees

- Same Markdown, same output. The file is only rewritten when its content changes.
- `lib/generated/` is not committed (`.gitignore`). `npm run dev`, `build` and `typecheck` run this stage first, so a fresh clone works.
- Never edit `lib/generated/`: the next build overwrites it.

## Changing the format

A new field or block means changing, together: the type in `lib/lessons.ts` or `lib/curriculum.ts`, its reader in `read-site.mjs`, [lesson-format.md](lesson-format.md), and the component that renders it.
