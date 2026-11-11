# Agent Path

Learn applied agentic AI step by step, from the agent loop to your own enterprise adoption plan.
Course structure based on the MIT *Applied Agentic AI* curriculum (`content/curriculum.md`).
UI based on the Claude Design canvas "Agent Path: from level 0 to level 10".

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Structure

| Path | Role |
| --- | --- |
| `app/page.tsx` | The path (zones, levels, resume button) |
| `app/level/[n]` | A lesson: 4 steps (Concept, Post-mortem, Lab, Deliverable) |
| `app/trophies` | Profile, trophy cabinet, executive templates |
| `components/characters.tsx` | Loop, Plug, Ward, Cap (SVG, ported from the design) |
| `lib/curriculum.ts` | Zones, levels 0 to 10, trophies, deliverables |
| `lib/lessons.ts` | Lesson content per level (level 4 concept is playable) |
| `lib/progress.tsx` | XP, streak, steps, trophies, saved in `localStorage` |

## Adding a course

1. Open `lib/lessons.ts` and add an entry for the level number.
2. Fill `concept` (interactive question). Post-mortem, Lab and Deliverable steps are
   placeholders for now; the next step is to add them to `LessonContent`.
3. A level is complete when its 4 steps are done. In dev mode, a "mark step done" button
   lets you move through levels that have no content yet.

## Next steps

- French layer (i18n): extract UI strings and `lib/*` text, then add `/fr`.
- Longer lessons in MDX under `content/`.
- Accounts and synced progress (Supabase) in place of `localStorage`.
