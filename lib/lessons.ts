// Lesson content model. One file per module in `lib/lessons/module-N.ts`, aggregated here.
// A module counts as complete (badge earned) when all 4 units (Concept, Post-mortem, Lab, Deliverable) are done.
// Points are not part of the content: they come from `lib/scoring.ts`.
// Source material: `RAW_content/02_Modules/` (rewritten in our own words, see decision 0005).

import { MODULE_1 } from "./lessons/module-1";
import { MODULE_2 } from "./lessons/module-2";
import { MODULE_3 } from "./lessons/module-3";
import { MODULE_4 } from "./lessons/module-4";
import { MODULE_5 } from "./lessons/module-5";
import { MODULE_6 } from "./lessons/module-6";
import { MODULE_7 } from "./lessons/module-7";
import { MODULE_8 } from "./lessons/module-8";

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

/** Post-mortem unit: a real case, what happened, and what to learn from it. */
export interface PostMortem {
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
  reading?: Reading;
  concept?: ConceptQuiz;
  postMortem?: PostMortem;
  lab?: Lab;
  deliverable?: DeliverableStep;
}

export const LESSONS: Record<number, LessonContent> = {
  1: MODULE_1,
  2: MODULE_2,
  3: MODULE_3,
  4: MODULE_4,
  5: MODULE_5,
  6: MODULE_6,
  7: MODULE_7,
  8: MODULE_8,
};

/** Content of a unit (0 Concept, 1 Post-mortem, 2 Lab, 3 Deliverable). The interactive quiz completes unit 0 when present. */
export const unitData = (c: LessonContent, unit: number) => [c.concept ?? c.reading, c.postMortem, c.lab, c.deliverable][unit];

/** Title shown in the trail's unit list. */
export function unitTitle(m: number, unit: number): string {
  const c = LESSONS[m] ?? {};
  return [c.reading?.title ?? c.concept?.question, c.postMortem?.title, c.lab?.title, c.deliverable?.title][unit] ?? "";
}

// Time estimates: reading units at 200 words a minute, rounded up to 5 minutes; labs use their stated duration.
const WORDS_PER_MINUTE = 200;
const DELIVERABLE_MINUTES = 20;
const DEFAULT_LAB_MINUTES = 30;

const countWords = (texts: (string | undefined)[]) =>
  texts.reduce((n, t) => n + (t ? t.split(/\s+/).filter(Boolean).length : 0), 0);
const toMinutes = (words: number) => Math.max(5, Math.ceil(words / WORDS_PER_MINUTE / 5) * 5);
const questionText = (q?: Question) => (q ? [q.prompt, ...q.options.map((o) => o.text)] : []);

/** Estimated minutes for a unit, as shown on the trail ("~10 mins"). */
export function unitMinutes(m: number, unit: number): number {
  const c = LESSONS[m] ?? {};
  if (unit === 0) {
    const r = c.reading;
    const sections = r?.sections.flatMap((s) => [...s.body, ...(s.bullets ?? []), s.callout?.text, ...(s.table?.rows.flat() ?? [])]) ?? [];
    return toMinutes(countWords([r?.intro, ...sections, ...(r?.takeaways ?? []), ...questionText(r?.check), c.concept?.question]));
  }
  if (unit === 1) {
    const pm = c.postMortem;
    return toMinutes(countWords([pm?.context, ...(pm?.timeline.map((t) => t.text) ?? []), ...(pm?.lessons ?? []), ...questionText(pm?.question)]));
  }
  if (unit === 2) return Number.parseInt(c.lab?.duration ?? "", 10) || DEFAULT_LAB_MINUTES;
  return DELIVERABLE_MINUTES;
}
