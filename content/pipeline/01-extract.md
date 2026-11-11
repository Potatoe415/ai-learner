# Stage 1 · Extract

Reads `RAW_content/`. Writes `content/01-extracted/`. Script: `scripts/content/extract.mjs` (`npm run content:extract`).

## What it does

- One output per source file, at the same relative path with a `.md` extension: `RAW_content/a/b.txt` → `content/01-extracted/a/b.md`.
- Converts text only. No rewriting, no summarising, no reordering.
- Front matter of each output:

```
kind: extracted
source: RAW_content/a/b.txt
source_hash: <sha256 of the source text>
body_hash: <sha256 of the extracted body, to detect hand edits>
extractor: extract.mjs v1
```

## Formats

| Source | Conversion |
|---|---|
| `.md`, `.markdown` | Copied; the source's own front matter is dropped (it stays in `RAW_content/`) |
| `.txt` | Copied |
| `.html`, `.htm` | Tags removed; headings, paragraphs and list items kept |
| `.pdf`, `.docx`, `.zip`, images, others | Skipped and listed. Each format needs a tool; adding one is a new dependency, so ask the user first (`AGENTS.md`) |

Until a format is supported, extract it by hand: write the Markdown to the expected output path with the front matter above. The script will keep it (hand edit) and report it.

## Guarantees

- Same source, same output, byte for byte (line endings normalised to LF).
- An output whose body no longer matches `body_hash` was edited by hand: it is kept. `--force` overwrites it.
- An output whose source is gone is removed, unless edited by hand.
