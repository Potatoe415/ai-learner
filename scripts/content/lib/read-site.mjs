// Stage 4 reader: turns the parsed Markdown of content/03-site/ into the site's data objects.
// One function per file kind. Each one validates its document strictly and fails with file:line.
// Format reference: content/pipeline/lesson-format.md.

import { ContentError } from "./markdown.mjs";

const COMMON_KEYS = ["kind", "based_on", "based_on_hash"];

/** Reads front matter key `key`. Unknown keys are rejected by `checkKeys`. */
function fmGet(doc, key, { optional = false } = {}) {
  const entry = doc.fm[key];
  if (!entry || entry.value === "") {
    if (optional) return undefined;
    throw new ContentError(doc.file, 1, `front matter needs "${key}"`);
  }
  return entry.value;
}

function fmInt(doc, key) {
  const v = fmGet(doc, key);
  if (!/^\d+$/.test(v)) throw new ContentError(doc.file, doc.fm[key].line, `"${key}" must be a whole number`);
  return Number(v);
}

function checkKeys(doc, kind, keys) {
  const allowed = new Set([...COMMON_KEYS, ...keys]);
  for (const [k, { line }] of Object.entries(doc.fm)) {
    if (!allowed.has(k)) throw new ContentError(doc.file, line, `unknown front matter key "${k}" for kind "${kind}"`);
  }
  if (fmGet(doc, "kind") !== kind) throw new ContentError(doc.file, doc.fm.kind.line, `expected kind "${kind}", found "${doc.fm.kind.value}"`);
}

const fail = (doc, block, msg) => { throw new ContentError(doc.file, block?.line, msg); };

/** Splits blocks into the part before the first `##` and one group per `##` heading. */
function byH2(blocks) {
  const head = [];
  const groups = [];
  for (const b of blocks) {
    if (b.type === "heading" && b.level === 2) groups.push({ heading: b, blocks: [] });
    else if (groups.length) groups.at(-1).blocks.push(b);
    else head.push(b);
  }
  return { head, groups };
}

/** Splits blocks into one group per `###` heading. Blocks before the first one are not allowed. */
function byH3(doc, blocks, what) {
  const groups = [];
  for (const b of blocks) {
    if (b.type === "heading" && b.level === 3) groups.push({ heading: b, blocks: [] });
    else if (groups.length) groups.at(-1).blocks.push(b);
    else fail(doc, b, `${what}: start each entry with a "### " heading`);
  }
  return groups;
}

function onlyParagraph(doc, blocks, where, line) {
  if (blocks.length !== 1 || blocks[0].type !== "paragraph") fail(doc, blocks[0] ?? { line }, `${where}: expected exactly one paragraph`);
  return blocks[0].text;
}

function onlyList(doc, blocks, where, line, { optional = false } = {}) {
  if (blocks.length === 0 && optional) return [];
  if (blocks.length !== 1 || blocks[0].type !== "list") fail(doc, blocks[0] ?? { line }, `${where}: expected exactly one "- " list`);
  return blocks[0].items.map((i) => i.text);
}

/** Named `##` groups, all required unless listed in `optional`, no others allowed. */
function namedGroups(doc, groups, names, optional = []) {
  const out = {};
  for (const g of groups) {
    if (!names.includes(g.heading.text)) fail(doc, g.heading, `unexpected section "## ${g.heading.text}" (allowed: ${names.join(", ")})`);
    if (out[g.heading.text]) fail(doc, g.heading, `duplicate section "## ${g.heading.text}"`);
    out[g.heading.text] = g;
  }
  for (const n of names) if (!out[n] && !optional.includes(n)) fail(doc, null, `missing section "## ${n}"`);
  return out;
}

const OPTION = /^\[( |x)\] ([a-z])\. (.+)$/;

function readOptions(doc, list, valueKey) {
  let correct = null;
  const options = list.items.map((it) => {
    const m = OPTION.exec(it.text);
    if (!m) fail(doc, it, 'options read "[ ] a. text", the right one "[x] b. text"');
    if (m[1] === "x") {
      if (correct) fail(doc, it, "only one option can be marked [x]");
      correct = m[2];
    }
    return { id: m[2], [valueKey]: m[3] };
  });
  const ids = options.map((o) => o.id);
  if (new Set(ids).size !== ids.length) fail(doc, list, "option letters must be unique");
  if (!correct) fail(doc, list, "mark the right option with [x]");
  return { options, correct };
}

/** `:::check` container: prompt, options, `### Hint <id>` entries and `### Explanation`. */
function readQuestion(doc, container) {
  const [prompt, list, ...rest] = container.blocks;
  if (prompt?.type !== "paragraph") fail(doc, container, "check: start with the question as one paragraph");
  if (list?.type !== "list") fail(doc, prompt, "check: list the options right after the question");
  const { options, correct } = readOptions(doc, list, "text");
  const hints = {};
  let explanation;
  for (const g of byH3(doc, rest, "check")) {
    const text = onlyParagraph(doc, g.blocks, `### ${g.heading.text}`, g.heading.line);
    const hint = /^Hint ([a-z])$/.exec(g.heading.text);
    if (hint) {
      if (!options.some((o) => o.id === hint[1]) || hint[1] === correct) fail(doc, g.heading, `"${g.heading.text}" must name a wrong option`);
      hints[hint[1]] = text;
    } else if (g.heading.text === "Explanation") explanation = text;
    else fail(doc, g.heading, `check: unexpected "### ${g.heading.text}" (use "### Hint <letter>" or "### Explanation")`);
  }
  if (!explanation) fail(doc, container, 'check: add "### Explanation"');
  return { prompt: prompt.text, options, correct, hints, explanation };
}

function takeContainers(doc, blocks, names) {
  const found = {};
  const rest = [];
  for (const b of blocks) {
    if (b.type === "container" && names.includes(b.name)) {
      if (found[b.name]) fail(doc, b, `only one ":::${b.name}" allowed`);
      found[b.name] = b;
    } else rest.push(b);
  }
  return { found, rest };
}

function readSection(doc, g) {
  const section = { heading: g.heading.text, body: [] };
  for (const b of g.blocks) {
    if (b.type === "paragraph") section.body.push(b.text);
    else if (b.type === "list" && !section.bullets) section.bullets = b.items.map((i) => i.text);
    else if (b.type === "table" && !section.table) section.table = { head: b.head, rows: b.rows };
    else if (b.type === "container" && b.name === "callout" && !section.callout) {
      if (!b.arg) fail(doc, b, 'callout needs a label: ":::callout Field note"');
      section.callout = { label: b.arg, text: onlyParagraph(doc, b.blocks, "callout", b.line) };
    } else fail(doc, b, `section "${section.heading}": a section holds paragraphs, then at most one list, one table and one callout`);
  }
  return section;
}

export function readReading(doc) {
  checkKeys(doc, "reading", ["kicker", "title", "bubble"]);
  const { found, rest } = takeContainers(doc, doc.blocks, ["takeaways", "check"]);
  const { head, groups } = byH2(rest);
  if (!found.takeaways) fail(doc, null, 'add a ":::takeaways" list');
  const reading = {
    kicker: fmGet(doc, "kicker"),
    title: fmGet(doc, "title"),
    intro: onlyParagraph(doc, head, "intro (text before the first ##)", 1),
    sections: groups.map((g) => readSection(doc, g)),
    takeaways: onlyList(doc, found.takeaways.blocks, "takeaways", found.takeaways.line),
    bubble: fmGet(doc, "bubble"),
  };
  if (found.check) reading.check = readQuestion(doc, found.check);
  return reading;
}

export function readPostMortem(doc) {
  checkKeys(doc, "post-mortem", ["kicker", "title", "bubble"]);
  const { found, rest } = takeContainers(doc, doc.blocks, ["check"]);
  const { head, groups } = byH2(rest);
  const s = namedGroups(doc, groups, ["Numbers", "Timeline", "Lessons", "Sources"]);
  const numbers = s.Numbers.blocks;
  if (numbers.length !== 1 || numbers[0].type !== "table" || numbers[0].head.join("|") !== "Value|Label") {
    fail(doc, s.Numbers.heading, '"## Numbers" holds one table with the columns "Value | Label"');
  }
  if (!found.check) fail(doc, null, 'add a ":::check" question');
  return {
    kicker: fmGet(doc, "kicker"),
    title: fmGet(doc, "title"),
    context: onlyParagraph(doc, head, "context (text before the first ##)", 1),
    numbers: numbers[0].rows.map(([value, label]) => ({ value, label })),
    timeline: byH3(doc, s.Timeline.blocks, "timeline").map((g) => ({ label: g.heading.text, text: onlyParagraph(doc, g.blocks, `### ${g.heading.text}`, g.heading.line) })),
    lessons: onlyList(doc, s.Lessons.blocks, "## Lessons", s.Lessons.heading.line),
    question: readQuestion(doc, found.check),
    sources: onlyList(doc, s.Sources.blocks, "## Sources", s.Sources.heading.line),
    bubble: fmGet(doc, "bubble"),
  };
}

export function readLab(doc) {
  checkKeys(doc, "lab", ["kicker", "title", "duration", "bubble"]);
  const { head, groups } = byH2(doc.blocks);
  const s = namedGroups(doc, groups, ["Prerequisites", "Steps", "Checklist"]);
  const steps = byH3(doc, s.Steps.blocks, "steps").map((g) => {
    const step = { title: g.heading.text, body: [] };
    g.blocks.forEach((b, k) => {
      if (b.type === "paragraph" && !step.code) step.body.push(b.text);
      else if (b.type === "code" && k === g.blocks.length - 1) step.code = { lang: b.lang, text: b.text };
      else fail(doc, b, `step "${step.title}": paragraphs, then at most one code block at the end`);
    });
    return step;
  });
  return {
    kicker: fmGet(doc, "kicker"),
    title: fmGet(doc, "title"),
    goal: onlyParagraph(doc, head, "goal (text before the first ##)", 1),
    duration: fmGet(doc, "duration"),
    prerequisites: onlyList(doc, s.Prerequisites.blocks, "## Prerequisites", s.Prerequisites.heading.line, { optional: true }),
    steps,
    checklist: onlyList(doc, s.Checklist.blocks, "## Checklist", s.Checklist.heading.line),
    bubble: fmGet(doc, "bubble"),
  };
}

export function readDeliverable(doc) {
  checkKeys(doc, "deliverable", ["kicker", "title", "fileName", "bubble"]);
  const { head, groups } = byH2(doc.blocks);
  const s = namedGroups(doc, groups, ["Template", "Checklist"]);
  const tpl = s.Template.blocks;
  if (tpl.length !== 1 || tpl[0].type !== "code") fail(doc, s.Template.heading, '"## Template" holds exactly one fenced code block');
  return {
    kicker: fmGet(doc, "kicker"),
    title: fmGet(doc, "title"),
    purpose: onlyParagraph(doc, head, "purpose (text before the first ##)", 1),
    fileName: fmGet(doc, "fileName"),
    // A template is a file: it always ends with a newline.
    template: `${tpl[0].text}\n`,
    checklist: onlyList(doc, s.Checklist.blocks, "## Checklist", s.Checklist.heading.line),
    bubble: fmGet(doc, "bubble"),
  };
}

const QUIZ_KEYS = ["kicker", "next", "bubble.start", "bubble.wrong", "bubble.right",
  "solved.without.label", "solved.without.title", "solved.without.text", "solved.with.label", "solved.with.title", "solved.with.text"];

export function readConceptQuiz(doc) {
  checkKeys(doc, "concept-quiz", QUIZ_KEYS);
  const { head, groups } = byH2(doc.blocks);
  const s = namedGroups(doc, groups, ["Options", "Hints"]);
  const list = s.Options.blocks[0];
  if (s.Options.blocks.length !== 1 || list.type !== "list") fail(doc, s.Options.heading, '"## Options" holds one list');
  const { options, correct } = readOptions(doc, list, "value");
  const hints = {};
  for (const g of byH3(doc, s.Hints.blocks, "hints")) {
    const id = g.heading.text;
    if (!options.some((o) => o.id === id) || id === correct) fail(doc, g.heading, `"### ${id}" must name a wrong option`);
    hints[id] = onlyParagraph(doc, g.blocks, `### ${id}`, g.heading.line);
  }
  const solved = (side) => ({ label: fmGet(doc, `solved.${side}.label`), title: fmGet(doc, `solved.${side}.title`), text: fmGet(doc, `solved.${side}.text`) });
  return {
    kicker: fmGet(doc, "kicker"),
    question: onlyParagraph(doc, head, "question (text before the first ##)", 1),
    options,
    correct,
    hints,
    solved: { without: solved("without"), with: solved("with") },
    bubbles: { start: fmGet(doc, "bubble.start"), wrong: fmGet(doc, "bubble.wrong"), right: fmGet(doc, "bubble.right") },
    next: fmGet(doc, "next"),
  };
}

export const UNIT_KINDS = ["History", "Concept", "Post-mortem", "Lab", "Deliverable"];

export function readModule(doc) {
  checkKeys(doc, "module", ["n", "zone", "title", "sub", "units", "badge.name", "badge.how"]);
  const units = fmGet(doc, "units").split(",").map((u) => u.trim());
  for (const u of units) if (!UNIT_KINDS.includes(u)) fail(doc, doc.fm.units, `unknown unit "${u}" (allowed: ${UNIT_KINDS.join(", ")})`);
  if (new Set(units).size !== units.length) fail(doc, doc.fm.units, "a unit kind appears twice");
  const { head, groups } = byH2(doc.blocks);
  if (head.length) fail(doc, head[0], 'module files hold only front matter and "## Topics"');
  const s = namedGroups(doc, groups, ["Topics"]);
  return {
    n: fmInt(doc, "n"),
    zone: fmGet(doc, "zone"),
    title: fmGet(doc, "title"),
    sub: fmGet(doc, "sub"),
    units,
    topics: onlyList(doc, s.Topics.blocks, "## Topics", s.Topics.heading.line),
    badge: { name: fmGet(doc, "badge.name"), how: fmGet(doc, "badge.how") },
  };
}

const MASCOTS = ["Plug", "Ward", "Cap", "Loop"];

export function readZone(doc) {
  checkKeys(doc, "zone", ["key", "name", "range", "sub", "desc", "boss", "color", "tint", "line", "mascot"]);
  if (doc.blocks.length) fail(doc, doc.blocks[0], "zone files hold only front matter");
  const mascot = fmGet(doc, "mascot");
  if (!MASCOTS.includes(mascot)) fail(doc, doc.fm.mascot, `mascot must be one of ${MASCOTS.join(", ")}`);
  const zone = {};
  for (const k of ["key", "name", "range", "sub", "desc", "boss", "color", "tint", "line"]) zone[k] = fmGet(doc, k);
  return { ...zone, mascot };
}

export function readTrail(doc) {
  checkKeys(doc, "trail", ["name", "desc", "zones"]);
  const { head, groups } = byH2(doc.blocks);
  if (head.length) fail(doc, head[0], 'trail files hold only front matter and "## Deliverables"');
  const s = namedGroups(doc, groups, ["Deliverables"]);
  const t = s.Deliverables.blocks[0];
  if (s.Deliverables.blocks.length !== 1 || t.type !== "table" || t.head.join("|") !== "Title|Description|Module|Tint") {
    fail(doc, s.Deliverables.heading, '"## Deliverables" holds one table with the columns "Title | Description | Module | Tint"');
  }
  return {
    trail: { name: fmGet(doc, "name"), desc: fmGet(doc, "desc") },
    zoneKeys: fmGet(doc, "zones").split(",").map((z) => z.trim()),
    deliverables: t.rows.map(([title, desc, module, tint], k) => {
      if (!/^\d+$/.test(module)) fail(doc, { line: t.line + 2 + k }, "Module must be a module number");
      return { title, desc, module: Number(module), tint };
    }),
  };
}
