# Lesson format (stage 3)

The exact Markdown the build accepts. Anything outside this format is an error with `file:line`.
Real examples: `content/03-lessons/ai-integration/module-1/` and `module-3/concept-quiz.md`.

## Common rules

- Front matter between `---` lines, one `key: value` per line, values on one line. Keys are fixed per kind; unknown keys are errors.
- Every file has `kind`, `based_on` (its inputs) and, once checked, `based_on_hash`. Zone files need no `based_on`.
- A paragraph is consecutive non-empty lines (joined with a space). Separate blocks with a blank line.
- Lists use `- `. A table needs a header row and a `|---|` row; write `\|` for a pipe inside a cell.
- Containers: a line `:::name [label]`, the content, a line `:::`. They do not nest.
- Code: fenced with three or more backticks; use more backticks when the code itself contains three.

## Question (`:::check`)

Used in readings (optional) and case studies (required).

```markdown
:::check
The question, as one paragraph.

- [ ] a. Wrong option
- [x] b. Right option (exactly one [x])
- [ ] c. Wrong option

### Hint a

Feedback shown when "a" is picked.

### Explanation

Shown once the right option is picked.
:::
```

## kind: reading (`history.md`, `concept.md`)

Front matter: `kicker`, `title`, `bubble` (the mascot's line).

```markdown
Intro: one paragraph before the first ##.

## Section heading

Paragraphs, then at most one list, one table and one callout, in that order.

:::callout Field note
One paragraph.
:::

:::takeaways
- Required list of takeaways.
:::

(optional :::check)
```

## kind: case-study (`case-study.md`)

Front matter: `kicker`, `title`, `bubble`. Body: context paragraph, then the sections `## Numbers` (a table `| Value | Label |`), `## Timeline` (one `### Label` + one paragraph per event), `## Lessons` (list), a `:::check`, `## Sources` (list).

## kind: lab (`lab.md`)

Front matter: `kicker`, `title`, `duration` (e.g. `45 min`, used for the time estimate), `bubble`. Body: goal paragraph, `## Prerequisites` (list, may be empty), `## Steps` (one `### Step title` each: paragraphs, then at most one code block at the end), `## Checklist` (list; every item must be ticked to finish the lab).

## kind: deliverable (`deliverable.md`)

Front matter: `kicker`, `title`, `fileName` (download name), `bubble`. Body: purpose paragraph, `## Template` (one fenced block holding the Markdown template), `## Checklist` (list).

## kind: concept-quiz (`concept-quiz.md`, optional)

Interactive quiz that closes the Concept unit. Front matter: `kicker`, `next`, `bubble.start`, `bubble.wrong`, `bubble.right`, `solved.without.label|title|text`, `solved.with.label|title|text`. Body: the question paragraph, `## Options` (`- [ ] a. 10`, one `[x]`), `## Hints` (one `### <letter>` + paragraph per wrong option).

## kind: module (`module.md`)

Front matter: `n`, `zone` (a zone key), `title`, `sub`, `units` (comma-separated, from History, Concept, Case study, Lab, Deliverable, in display order), `optional` (comma-separated subset of `units`, may be omitted: units that need code or coding knowledge; not needed for the badge, their points are a bonus, decision 0009), `badge.name`, `badge.how`. Body: `## Topics` (list).

## kind: zone (`zones/<key>.md`)

Front matter only: `key` (= file name), `name`, `range`, `sub`, `desc`, `boss`, `color`, `tint`, `line`, `mascot` (Plug, Ward, Cap or Loop).

## kind: trail (`trail.md`)

Front matter: `name`, `desc`, `zones` (zone keys, in display order). Body: `## Deliverables`, a table `| Title | Description | Module | Tint |` (cards on the profile page).
