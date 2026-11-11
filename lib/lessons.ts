// Lesson content model. One file per level in `lib/lessons/level-N.ts`, aggregated here.
// A level counts as complete when all 4 steps (Concept, Post-mortem, Lab, Deliverable) are done.
// Source material: `RAW_content/02_Modules/` (rewritten in our own words, see decision 0005).

import { LEVEL_0 } from "./lessons/level-0";
import { LEVEL_1 } from "./lessons/level-1";
import { LEVEL_2 } from "./lessons/level-2";
import { LEVEL_3 } from "./lessons/level-3";
import { LEVEL_4 } from "./lessons/level-4";
import { LEVEL_5 } from "./lessons/level-5";
import { LEVEL_6 } from "./lessons/level-6";
import { LEVEL_7 } from "./lessons/level-7";
import { LEVEL_8 } from "./lessons/level-8";
import { LEVEL_9 } from "./lessons/level-9";
import { LEVEL_10 } from "./lessons/level-10";

/** Interactive "pick the right number" quiz (level 4 style). */
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
  xp: number;
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

/** Concept step: a short reading closed by a check question. */
export interface Reading {
  kicker: string;
  title: string;
  intro: string;
  sections: Section[];
  takeaways: string[];
  /** Omitted when the level's interactive `concept` quiz already plays the check role (level 4). */
  check?: Question;
  bubble: string;
  /** Awarded by the check question. Unused when `check` is omitted (the quiz awards its own XP). */
  xp: number;
}

/** Post-mortem step: a real case, what happened, and what to learn from it. */
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
  xp: number;
}

export interface LabStep {
  title: string;
  body: string[];
  code?: { lang: string; text: string };
}

/** Lab step: guided steps done outside the app, completed by self-declaration. */
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
  xp: number;
}

/** Deliverable step: a template to copy or download and fill in. */
export interface DeliverableStep {
  kicker: string;
  title: string;
  purpose: string;
  fileName: string;
  /** Markdown template. */
  template: string;
  checklist: string[];
  bubble: string;
  xp: number;
}

export interface LessonContent {
  reading?: Reading;
  concept?: ConceptQuiz;
  postMortem?: PostMortem;
  lab?: Lab;
  deliverable?: DeliverableStep;
}

export const LESSONS: Record<number, LessonContent> = {
  0: LEVEL_0,
  1: LEVEL_1,
  2: LEVEL_2,
  3: LEVEL_3,
  4: LEVEL_4,
  5: LEVEL_5,
  6: LEVEL_6,
  7: LEVEL_7,
  8: LEVEL_8,
  9: LEVEL_9,
  10: LEVEL_10,
};
