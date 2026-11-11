// Pipeline status: which files of stages 2 (library) and 3 (lessons) are stale.
// Every such file lists its inputs in front matter `based_on` (comma-separated repository paths) and
// `based_on_hash`, a 12-character hash of those inputs. When an input changes, the hash no longer matches
// and the file is reported stale: re-check it against its inputs, then stamp it.
// Read-only unless --stamp is given.
// Usage:
//   npm run content:status                       report every stale or broken file
//   npm run content:status -- --stamp <file>...  record the current hash of the inputs of these files

import { existsSync, writeFileSync } from "node:fs";
import { STAGES, abs, fileHash, readText, sha256, walk } from "./lib/files.mjs";

const ORDER = [STAGES.raw, STAGES.extracted, STAGES.library, STAGES.site];
const stageOf = (path) => ORDER.findIndex((s) => path === s || path.startsWith(`${s}/`));
const isBinary = (path) => !/\.(md|markdown|txt|html?|csv|json)$/i.test(path);

function frontMatter(text) {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) return null;
  const fm = {};
  for (const line of text.slice(4, end).split("\n")) {
    const m = /^([A-Za-z][\w.]*): (.*)$/.exec(line);
    if (m) fm[m[1]] = m[2].trim();
  }
  return { fm, end };
}

/** Inputs of a file and the hash they have now. Problems are returned, not thrown. */
function inputsOf(file, fm) {
  const problems = [];
  const inputs = (fm.based_on ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  // Trail-level settings (zones) have no source; everything else must say what it is based on.
  if (!inputs.length) return { inputs, hash: null, problems: fm.kind === "zone" ? [] : ["no based_on"] };
  const own = stageOf(file);
  for (const input of inputs) {
    if (!existsSync(abs(input))) problems.push(`input not found: ${input}`);
    else if (stageOf(input) === -1 || stageOf(input) >= own) problems.push(`input must come from an earlier stage: ${input}`);
  }
  if (problems.length) return { inputs, hash: null, problems };
  const hash = sha256(inputs.map((i) => `${i}:${fileHash(i, { binary: isBinary(i) })}`).join("\n")).slice(0, 12);
  return { inputs, hash, problems };
}

const files = [...walk(STAGES.library), ...walk(STAGES.site)].filter((f) => f.endsWith(".md") && !f.endsWith("/README.md"));
const stampArgs = process.argv.includes("--stamp") ? process.argv.slice(process.argv.indexOf("--stamp") + 1) : null;

if (stampArgs) {
  if (!stampArgs.length) { console.error("content:status --stamp needs at least one file"); process.exit(1); }
  let failed = false;
  for (const file of stampArgs.map((f) => f.replace(/\\/g, "/").replace(/^\.\//, ""))) {
    const text = existsSync(abs(file)) ? readText(file) : null;
    const parsed = text && frontMatter(text);
    if (!parsed) { console.error(`${file}: not found or no front matter`); failed = true; continue; }
    const { hash, problems } = inputsOf(file, parsed.fm);
    if (!hash) { console.error(`${file}: ${problems.join("; ")}`); failed = true; continue; }
    const head = text.slice(0, parsed.end);
    const next = /\nbased_on_hash: .*/.test(head)
      ? head.replace(/\nbased_on_hash: .*/, `\nbased_on_hash: ${hash}`)
      : head.replace(/(\nbased_on: .*)/, `$1\nbased_on_hash: ${hash}`);
    writeFileSync(abs(file), next + text.slice(parsed.end));
    console.log(`${file}: stamped ${hash}`);
  }
  process.exit(failed ? 1 : 0);
}

const stale = [];
const broken = [];
for (const file of files) {
  const parsed = frontMatter(readText(file));
  if (!parsed) { broken.push(`${file}: no front matter`); continue; }
  const { hash, problems } = inputsOf(file, parsed.fm);
  if (problems.length) broken.push(`${file}: ${problems.join("; ")}`);
  else if (hash && parsed.fm.based_on_hash !== hash) stale.push(`${file}${parsed.fm.based_on_hash ? "" : " (never stamped)"}`);
}

const list = (title, items) => (items.length ? `\n${title}:\n${items.map((i) => `  - ${i}`).join("\n")}` : "");
console.log(
  `content:status · ${files.length} files checked, ${stale.length} stale, ${broken.length} broken` +
    list("Stale (an input changed: re-check the file, then npm run content:status -- --stamp <file>)", stale) +
    list("Broken", broken),
);
process.exit(broken.length ? 1 : 0);
