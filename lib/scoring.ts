// Points and ranks, on the Trailhead model (decision 0006).
// Quiz units pay less after each wrong answer; hands-on units (Lab, Deliverable) pay a fixed amount.
// A rank needs BOTH its badge count and its point total.

import { MODULES, UNITS } from "./curriculum";

/** Units whose points depend on the number of wrong answers (Concept, Post-mortem). */
export const QUIZ_UNITS: readonly number[] = [0, 1];

const QUIZ_POINTS = [100, 50, 25] as const;
const HANDS_ON_POINTS = 200;

/** Points a unit pays if completed now, after `misses` wrong answers. */
export const unitPoints = (unit: number, misses = 0) =>
  QUIZ_UNITS.includes(unit) ? QUIZ_POINTS[Math.min(misses, QUIZ_POINTS.length - 1)] : HANDS_ON_POINTS;

/** Highest value a unit can pay. */
export const maxUnitPoints = (unit: number) => unitPoints(unit, 0);
export const MODULE_MAX_POINTS = UNITS.reduce((sum, _, u) => sum + maxUnitPoints(u), 0);
export const TRAIL_MAX_POINTS = MODULE_MAX_POINTS * MODULES.length;

export interface Rank {
  n: number;
  name: string;
  /** Minimum badges (completed modules). */
  badges: number;
  /** Minimum points. */
  points: number;
  color: string;
  blurb: string;
}

// Point thresholds stay below the worst case (every quiz at 25), so finishing always reaches the rank.
export const RANKS: Rank[] = [
  { n: 0, name: "Curious", badges: 0, points: 0, color: "#8A92A6", blurb: "Everyone starts here." },
  { n: 1, name: "Operator", badges: 1, points: 400, color: "#1A2233", blurb: "You know what an agent is." },
  { n: 2, name: "Builder", badges: 3, points: 1300, color: "#0E7C7B", blurb: "You can reason about the loop and its costs." },
  { n: 3, name: "Integrator", badges: 5, points: 2200, color: "#0A5E5D", blurb: "You can wire an agent into real systems." },
  { n: 4, name: "Guardian", badges: 8, points: 3500, color: "#3B3FA8", blurb: "You can secure, govern and test an agent." },
  { n: 5, name: "Agentic Architect", badges: 11, points: 4900, color: "#B84E00", blurb: "You can take an agent from idea to adoption." },
];

export const rankOf = (badges: number, points: number) =>
  [...RANKS].reverse().find((r) => badges >= r.badges && points >= r.points) ?? RANKS[0];

export const nextRankOf = (rank: Rank) => RANKS.find((r) => r.n === rank.n + 1) ?? null;
