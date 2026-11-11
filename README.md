# Agent Path

Learn applied agentic AI step by step, from the agent loop to your own enterprise adoption plan.
Course structure based on the MIT *Applied Agentic AI* curriculum (`content/curriculum.md`).
UI based on the Claude Design canvas "Agent Path: from level 0 to level 10", restructured on the Salesforce Trailhead model.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Structure

Trailhead model (decisions 0006, 0007): one trail, **AI integration in organisations**, of 8 modules, one per MIT module (1 to 8). Each module has 4 units (module 1 opens with a fifth, History)
(Concept, Post-mortem, Lab, Deliverable) and earns one badge. Points and badges give the learner's level (0 to 5).

| Path | Role |
| --- | --- |
| `app/page.tsx` | The trail: points, time left, % done, module cards and their units |
| `app/module/[n]` | A module: 4 units (`?unit=N` opens a unit that is done or next) |
| `app/profile` | Level insignia, badges / points / trails, next level, badge cabinet, executive templates |
| `components/characters.tsx` | Loop, Plug, Ward, Cap (images in `public/characters/`) |
| `components/badges.tsx` | Module badges and level insignia (SVG) |
| `lib/curriculum.ts` | Trail, units, zones, modules 1 to 8, badges, deliverables |
| `lib/scoring.ts` | Unit points (100 / 50 / 25 for quizzes, 200 for Lab and Deliverable) and the six levels |
| `lib/lessons.ts`, `lib/lessons/module-N.ts` | Lesson content, one file per module |
| `lib/progress.tsx` | Points, completion dates and wrong answers per unit, saved in `localStorage` (`agent-path:v3`) |

## Adding content

1. Edit `lib/lessons/module-N.ts`. Each unit is a typed object (see `lib/lessons.ts`, decision 0005).
2. Points are not set in content: they come from `lib/scoring.ts`.
3. A module is complete, and its badge earned, when its 4 units are done.

## Next steps

- French layer (i18n): extract UI strings and `lib/*` text, then add `/fr`.
- Longer lessons in MDX under `content/`.
- Accounts and synced progress (Supabase) in place of `localStorage`.
