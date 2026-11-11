// Stage 1 · Extract: RAW_content/ (anything the user drops in) -> content/01-extracted/ (one Markdown file per source).
// Stateless: reads only stage 0, output path and text depend only on the source file.
// Each output records its source and the source's hash, so later stages can tell when it changed.
// An output edited by hand is never overwritten (its body hash no longer matches); pass --force to overwrite.
// Sources whose format needs a tool (PDF, Word, zip...) are listed and skipped: see content/pipeline/01-extract.md.
// Usage: npm run content:extract [-- --force]

import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { extname } from "node:path";
import { STAGES, abs, fileHash, readText, sha256, walk } from "./lib/files.mjs";

const EXTRACTOR = "extract.mjs v1";
const force = process.argv.includes("--force");

/** Extension -> function turning the source text into Markdown. */
const CONVERTERS = {
  ".md": (t) => stripFrontMatter(t),
  ".markdown": (t) => stripFrontMatter(t),
  ".txt": (t) => t,
  ".html": (t) => htmlToText(t),
  ".htm": (t) => htmlToText(t),
};

function stripFrontMatter(text) {
  if (!text.startsWith("---\n")) return text;
  const end = text.indexOf("\n---\n", 4);
  return end === -1 ? text : text.slice(end + 5);
}

/** Basic HTML -> text: keeps headings, paragraphs and list items; drops scripts, styles and tags. */
function htmlToText(html) {
  const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, "")
    .replace(/<h([1-6])[^>]*>/gi, (_, n) => `\n\n${"#".repeat(Number(n))} `)
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<(br|\/p|\/div|\/h[1-6]|\/li|\/tr)[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#\d+|[a-z]+);/gi, (m, e) => (e[0] === "#" ? String.fromCodePoint(Number(e.slice(1))) : entities[e.toLowerCase()] ?? m))
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Front matter value of `key` in an extracted file, or null. */
function frontValue(text, key) {
  const m = new RegExp(`^${key}: (.*)$`, "m").exec(text.slice(0, text.indexOf("\n---\n", 4) + 1));
  return m ? m[1] : null;
}

const bodyOf = (text) => text.slice(text.indexOf("\n---\n", 4) + 5);

const sources = walk(STAGES.raw);
const expected = new Set();
const report = { written: [], unchanged: [], kept: [], skipped: [] };

for (const src of sources) {
  const convert = CONVERTERS[extname(src).toLowerCase()];
  if (!convert) { report.skipped.push(src); continue; }

  const out = `${STAGES.extracted}/${src.slice(STAGES.raw.length + 1).replace(/\.[^./]+$/, "")}.md`;
  expected.add(out);
  const body = `${convert(readText(src)).trim()}\n`;
  const text = `---\nkind: extracted\nsource: ${src}\nsource_hash: ${fileHash(src)}\nbody_hash: ${sha256(body)}\nextractor: ${EXTRACTOR}\n---\n${body}`;

  if (existsSync(abs(out))) {
    const current = readText(out);
    if (current === text) { report.unchanged.push(out); continue; }
    const editedByHand = frontValue(current, "body_hash") !== sha256(bodyOf(current));
    if (editedByHand && !force) { report.kept.push(out); continue; }
  }
  mkdirSync(abs(out.slice(0, out.lastIndexOf("/"))), { recursive: true });
  writeFileSync(abs(out), text);
  report.written.push(out);
}

// Outputs whose source is gone (or no longer extractable) are removed, unless edited by hand.
const removed = [];
for (const out of walk(STAGES.extracted)) {
  if (expected.has(out)) continue;
  const current = readText(out);
  if (frontValue(current, "body_hash") !== sha256(bodyOf(current)) && !force) { report.kept.push(out); continue; }
  rmSync(abs(out));
  removed.push(out);
}

const list = (title, items) => (items.length ? `\n${title}:\n${items.map((i) => `  - ${i}`).join("\n")}` : "");
console.log(
  `content:extract · ${report.written.length} written, ${report.unchanged.length} unchanged, ${removed.length} removed, ${report.skipped.length} skipped` +
    list("Kept (edited by hand or source gone; rerun with --force to overwrite)", report.kept) +
    list("Skipped (format needs a tool, see content/pipeline/01-extract.md)", report.skipped) +
    list("Removed (source gone)", removed),
);
