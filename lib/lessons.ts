// Lesson content model. The content itself is Markdown in content/03-lessons/, turned into
// lib/generated/content.ts by the content pipeline (decision 0008); this file holds the types and helpers.
// A module counts as complete (badge earned) when all its units are done (Concept, Case study, Lab, Deliverable;
// module 1 opens with a History unit, see `lib/curriculum.ts`).
// Points are not part of the content: they come from `lib/scoring.ts`.

import { unitsOf, type UnitKind } from "./curriculum";
import { LESSONS } from "./generated/content";

export { LESSONS };

/** Interactive "pick the right number" quiz (module 3 style). */
export interface ConceptQuiz {
  kicker: string;
  question: string;
  options: { id: string; value: string }[];
  correct: string;
  hints: Record<string, string>;
  solved: {
    without: { label: string; title: string; text: string };
    with: { label: string; title: string; text: string };
  };
  bubbles: { start: string; wrong: string; right: string };
  next: string;
}

/** A single multiple-choice question with feedback per wrong option. */
export interface Question {
  prompt: string;
  options: { id: string; text: string }[];
  correct: string;
  /** Feedback shown when a wrong option is picked, keyed by option id. */
  hints: Record<string, string>;
  /** Shown once the right option is picked. */
  explanation: string;
}

export interface Table {
  head: string[];
  rows: string[][];
}

export interface Section {
  heading: string;
  body: string[];
  bullets?: string[];
  table?: Table;
  /** Short highlighted remark ("Field note", "Watch out"). */
  callout?: { label: string; text: string };
}

/** Concept unit: a short reading closed by a check question. */
export interface Reading {
  kicker: string;
  title: string;
  intro: string;
  sections: Section[];
  takeaways: string[];
  /** Omitted when the module's interactive `concept` quiz already plays the check role (module 3). */
  check?: Question;
  bubble: string;
}

/** Case study unit: a real case, what happened, and what to learn from it. */
export interface CaseStudy {
  kicker: string;
  title: string;
  context: string;
  numbers: { value: string; label: string }[];
  timeline: { label: string; text: string }[];
  lessons: string[];
  question: Question;
  /** Plain-text citations. Every real case is sourced. */
  sources: string[];
  bubble: string;
}

export interface LabStep {
  title: string;
  body: string[];
  code?: { lang: string; text: string };
}

/** Lab unit: guided steps done outside the app, completed by self-declaration. */
export interface Lab {
  kicker: string;
  title: string;
  goal: string;
  duration: string;
  prerequisites: string[];
  steps: LabStep[];
  /** Every item must be ticked before the lab can be marked done. */
  checklist: string[];
  bubble: string;
}

/** Deliverable unit: a template to copy or download and fill in. */
export interface DeliverableStep {
  kicker: string;
  title: string;
  purpose: string;
  fileName: string;
  /** Markdown template. */
  template: string;
  checklist: string[];
  bubble: string;
}

export interface LessonContent {
  /** History unit (module 1 only): a reading closed by a check question. */
  history?: Reading;
  reading?: Reading;
  concept?: ConceptQuiz;
  caseStudy?: CaseStudy;
  lab?: Lab;
  deliverable?: DeliverableStep;
}

/** Content of a unit of a given kind. The interactive quiz completes the Concept unit when present. */
export function unitContent(c: LessonContent, kind: UnitKind) {
  switch (kind) {
    case "History": return c.history;
    case "Concept": return c.concept ?? c.reading;
    case "Case study": return c.caseStudy;
    case "Lab": return c.lab;
    case "Deliverable": return c.deliverable;
  }
}

/** Kind of unit `unit` (0-based) of module `m`. */
export const unitKind = (m: number, unit: number): UnitKind | undefined => unitsOf(m)[unit];

/** Title shown in the trail's unit list. */
export function unitTitle(m: number, unit: number): string {
  const c = LESSONS[m] ?? {};
  switch (unitKind(m, unit)) {
    case "History": return c.history?.title ?? "";
    case "Concept": return c.reading?.title ?? c.concept?.question ?? "";
    case "Case study": return c.caseStudy?.title ?? "";
    case "Lab": return c.lab?.title ?? "";
    case "Deliverable": return c.deliverable?.title ?? "";
    default: return "";
  }
}

// Time estimates: reading units at 200 words a minute, rounded up to 5 minutes; labs use their stated duration.
const WORDS_PER_MINUTE = 200;
const DELIVERABLE_MINUTES = 20;
const DEFAULT_LAB_MINUTES = 30;

const countWords = (texts: (string | undefined)[]) =>
  texts.reduce((n, t) => n + (t ? t.split(/\s+/).filter(Boolean).length : 0), 0);
const toMinutes = (words: number) => Math.max(5, Math.ceil(words / WORDS_PER_MINUTE / 5) * 5);
const questionText = (q?: Question) => (q ? [q.prompt, ...q.options.map((o) => o.text)] : []);
const readingText = (r?: Reading) => [
  r?.intro,
  ...(r?.sections.flatMap((s) => [...s.body, ...(s.bullets ?? []), s.callout?.text, ...(s.table?.rows.flat() ?? [])]) ?? []),
  ...(r?.takeaways ?? []),
  ...questionText(r?.check),
];

/** Estimated minutes for a unit, as shown on the trail ("~10 mins"). */
export function unitMinutes(m: number, unit: number): number {
  const c = LESSONS[m] ?? {};
  switch (unitKind(m, unit)) {
    case "History": return toMinutes(countWords(readingText(c.history)));
    case "Concept": return toMinutes(countWords([...readingText(c.reading), c.concept?.question]));
    case "Case study": {
      const cs = c.caseStudy;
      return toMinutes(countWords([cs?.context, ...(cs?.timeline.map((t) => t.text) ?? []), ...(cs?.lessons ?? []), ...questionText(cs?.question)]));
    }
    case "Lab": return Number.parseInt(c.lab?.duration ?? "", 10) || DEFAULT_LAB_MINUTES;
    default: return DELIVERABLE_MINUTES;
  }
}
