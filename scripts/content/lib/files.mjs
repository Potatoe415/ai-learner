// File helpers shared by the content pipeline scripts. Paths are repository-relative with "/" separators.

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

/** Pipeline stages. Each stage reads only the previous one (content/pipeline/README.md). */
export const STAGES = {
  raw: "RAW_content",
  extracted: "content/01-extracted",
  library: "content/02-library",
  site: "content/03-lessons",
  generated: "lib/generated",
};

export const abs = (rel) => join(ROOT, ...rel.split("/"));
export const rel = (absPath) => relative(ROOT, absPath).split(sep).join("/");

/** Text with line endings normalised to LF, so hashes match on Windows and macOS. */
export const readText = (relPath) => readFileSync(abs(relPath), "utf8").replace(/\r\n?/g, "\n");

export const sha256 = (data) => createHash("sha256").update(data).digest("hex");

/** Hash of a file's normalised text (binary files: raw bytes). */
export function fileHash(relPath, { binary = false } = {}) {
  return sha256(binary ? readFileSync(abs(relPath)) : readText(relPath));
}

/** All files under a repository-relative directory, sorted, as repository-relative paths. */
export function walk(relDir) {
  const out = [];
  const visit = (dir) => {
    for (const name of readdirSync(dir).sort()) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) visit(p);
      else out.push(rel(p));
    }
  };
  if (existsSync(abs(relDir))) visit(abs(relDir));
  return out;
}
