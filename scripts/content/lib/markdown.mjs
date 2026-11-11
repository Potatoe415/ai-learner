// Minimal Markdown reader for the site's content format (content/pipeline/lesson-format.md).
// Supports exactly: a flat front matter, paragraphs, headings, "- " lists, pipe tables,
// fenced code and one level of ":::name" containers. Anything else is a plain paragraph.
// Pure function of its input: no file system access, no state.

export class ContentError extends Error {
  constructor(file, line, message) {
    super(`${file}${line ? `:${line}` : ""}: ${message}`);
    this.name = "ContentError";
  }
}

const FENCE = /^(`{3,})(.*)$/;
const CONTAINER_OPEN = /^:::([a-z][a-z-]*)(?:\s+(.+))?$/;
const HEADING = /^(#{1,6})\s+(.+)$/;
const ITEM = /^- (.*)$/;

/** Splits text into front matter (key -> { value, line }) and blocks. CRLF is normalised to LF. */
export function parseDoc(text, file) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const fm = {};
  let i = 0;
  if (lines[0] === "---") {
    i = 1;
    for (; i < lines.length && lines[i] !== "---"; i++) {
      if (lines[i].trim() === "") continue;
      const m = /^([A-Za-z][\w.]*):(?:\s(.*))?$/.exec(lines[i]);
      if (!m) throw new ContentError(file, i + 1, 'front matter lines must read "key: value"');
      if (m[1] in fm) throw new ContentError(file, i + 1, `duplicate front matter key "${m[1]}"`);
      fm[m[1]] = { value: (m[2] ?? "").trim(), line: i + 1 };
    }
    if (i >= lines.length) throw new ContentError(file, 1, "front matter is not closed by ---");
    i++;
  }
  return { file, fm, blocks: parseBlocks(lines, i, lines.length, file, false) };
}

const startsBlock = (line) =>
  FENCE.test(line) || line.startsWith(":::") || HEADING.test(line) || line.startsWith("|") || ITEM.test(line);

function closingFence(line, fence) {
  return line.startsWith(fence) && /^`*\s*$/.test(line.slice(fence.length));
}

function parseBlocks(lines, start, end, file, inContainer) {
  const out = [];
  let i = start;
  while (i < end) {
    const line = lines[i];
    const ln = i + 1;
    if (line.trim() === "") { i++; continue; }

    let m = FENCE.exec(line);
    if (m) {
      let j = i + 1;
      while (j < end && !closingFence(lines[j], m[1])) j++;
      if (j >= end) throw new ContentError(file, ln, "code block is not closed");
      out.push({ type: "code", lang: m[2].trim(), text: lines.slice(i + 1, j).join("\n"), line: ln });
      i = j + 1;
      continue;
    }

    m = CONTAINER_OPEN.exec(line);
    if (m) {
      if (inContainer) throw new ContentError(file, ln, "containers cannot be nested");
      let j = i + 1;
      let fence = null;
      for (; j < end; j++) {
        const f = FENCE.exec(lines[j]);
        if (fence) { if (closingFence(lines[j], fence)) fence = null; }
        else if (f) fence = f[1];
        else if (lines[j].trim() === ":::") break;
      }
      if (j >= end) throw new ContentError(file, ln, `container ":::${m[1]}" is not closed by :::`);
      out.push({ type: "container", name: m[1], arg: (m[2] ?? "").trim(), blocks: parseBlocks(lines, i + 1, j, file, true), line: ln });
      i = j + 1;
      continue;
    }
    if (line.startsWith(":::")) throw new ContentError(file, ln, `unexpected "${line.trim()}"`);

    m = HEADING.exec(line);
    if (m) {
      out.push({ type: "heading", level: m[1].length, text: m[2].trim(), line: ln });
      i++;
      continue;
    }

    if (line.startsWith("|")) {
      let j = i;
      while (j < end && lines[j].startsWith("|")) j++;
      out.push(parseTable(lines.slice(i, j), file, ln));
      i = j;
      continue;
    }

    if (ITEM.test(line)) {
      const items = [];
      while (i < end && (ITEM.test(lines[i]) || (items.length && /^ {2,}\S/.test(lines[i])))) {
        const item = ITEM.exec(lines[i]);
        if (item) items.push({ text: item[1].trim(), line: i + 1 });
        else items[items.length - 1].text += ` ${lines[i].trim()}`;
        i++;
      }
      for (const it of items) if (!it.text) throw new ContentError(file, it.line, "empty list item");
      out.push({ type: "list", items, line: ln });
      continue;
    }

    const para = [];
    while (i < end && lines[i].trim() !== "" && (para.length === 0 || !startsBlock(lines[i]))) para.push(lines[i++].trim());
    out.push({ type: "paragraph", text: para.join(" "), line: ln });
  }
  return out;
}

/** "| a | b \| c |" -> ["a", "b | c"] */
export function splitRow(row) {
  const inner = row.trim().replace(/^\|/, "").replace(/(?<!\\)\|$/, "");
  return inner.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, "|"));
}

function parseTable(rows, file, line) {
  if (rows.length < 2 || !/^\|?(\s*:?-{3,}:?\s*\|)+\s*:?-{0,}:?\s*$/.test(rows[1].trim())) {
    throw new ContentError(file, line, "a table needs a header row and a |---| separator row");
  }
  const head = splitRow(rows[0]);
  const body = rows.slice(2).map((r, k) => {
    const cells = splitRow(r);
    if (cells.length !== head.length) throw new ContentError(file, line + 2 + k, `row has ${cells.length} cells, header has ${head.length}`);
    return cells;
  });
  return { type: "table", head, rows: body, line };
}
