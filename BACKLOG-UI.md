# BACKLOG-UI

Graphical and UX improvements requested by the user. Separate from `docs/BACKLOG.md` (technical and planning work).

Rules for agents:
- Add items only when the user gives them. Do not implement anything from this file unless the user asks to process it.
- When processing: tick `[x]` each item as soon as it is implemented and verified, one at a time, not at the end.
- Move nothing to git history by deleting: leave ticked items here until the user asks to clean up.
- Format: `- [ ] <short, verifiable description> (page or component)`.

## To do
- [x] Side menu: remove the "Profile" entry and the profile level display (the profile is moving to a classic profile button at the top right). Keep only the trail name; clicking it goes to the trail's default page. (side menu)
- [x] Lesson view (inside a sub-module): make the mascot image a bit smaller so the lesson text has more room. (lesson view)
- [x] Home page (first page on arrival): show a header and a grid of trail tiles, each tile with that trail's progress. For now there is a single real trail; add one ghost trail tile, not clickable, labelled "Coming soon" (subject not decided yet). (home page)
- [x] Rename the "Post-mortem" unit to "Case study" ("Étude de cas" in French) everywhere the learner sees it: unit labels, kickers ("Post-mortem · Klarna, 2024" becomes "Case study · Klarna, 2024"), badges, progress, zone boss text (e.g. "Knight Capital post-mortem"). Check whether the code names (`UnitKind` "Post-mortem", `PostMortem`, `postMortem`) should follow, and update `docs/PRODUCT.md`, `docs/ARCHITECTURE.md` and decisions that cite the old name (propose, edit after confirmation). (all modules)
- [x] Stop calling the module 8 final work "Capstone": call it "Personal project" ("Projet personnel" in French) everywhere the learner sees it: module title "Ethics & capstone", boss text "Capstone: your adoption plan", deliverable "Capstone adoption plan", badge text "(Capstone)", lesson text of module 8 and mentions in other modules ("feeds module 8"). (module 8)
- [x] Module view (when a module is open): move the close cross from the top left to the top right. (module view)
- [x] Module view: show the points as a plain label, no outline or pill, right after "Module 1" and the module title, in parentheses, e.g. "(25 points)". To confirm before implementing: whether the number is the points earned so far, the module total (600), or "earned / total". (module view)
- [x] Site header, visible on every page but very light, modelled on the header of https://academy.claude.com/courses (layout and lightness only; our own logo, not Claude's). Left: logo and site title "AI Academy" (working name), then two menus "Explore" and "Resources" (dropdowns, "Resources" shown as the active/open one by default). Right: a search bar (placeholder "Search", shortcut hint Ctrl K) and a "Sign in" button. To confirm before implementing: which of the search, sign-in and the two menus must work now or are visual placeholders (the request also says "for now just the logo and the title"); what the menus contain; how "Sign in" relates to the profile button at the top right (item 1). (all pages)
- [x] Optional units (general rule): any unit (sub-module) that contains code or requires coding knowledge becomes optional and is clearly labelled "Optional" wherever it appears (trail module cards, unit navigation, unit page). Today this is every Lab (modules 1 to 8 all require Python 3.10+). To confirm before implementing, because it touches the scoring rules: does a module badge still require the optional unit; are its points (200 for a Lab) kept as a bonus or removed from the module total (600) and the rank thresholds of `lib/scoring.ts`; can the learner skip it without losing progress; does a non-coder get a non-code alternative. Likely needs a decision record (touches scoring and completion rules, L2). (all modules)

## Done
