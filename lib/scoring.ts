// Points and ranks, on the Trailhead model (decisions 0006, 0007 and 0009).
// Quiz units pay less after each wrong answer; hands-on units (Lab, Deliverable) pay a fixed amount.
// Optional units (every Lab today) are not needed for the badge: their points are a bonus on top of the totals.
// A rank needs BOTH its badge count and its point total.

import { MODULES, isOptionalUnit, unitsOf, type UnitKind } from "./curriculum";

/** Units whose points depend on the number of wrong answers (reading and case units, closed by a question). */
export const QUIZ_KINDS: readonly UnitKind[] = ["History", "Concept", "Case study"];

const QUIZ_POINTS = [100, 50, 25] as const;
const HANDS_ON_POINTS = 200;

const kindOf = (m: number, u: number) => unitsOf(m)[u];

/** Points unit `u` of module `m` pays if completed now, after `misses` wrong answers. */
export const unitPoints = (m: number, u: number, misses = 0) => {
  const kind = kindOf(m, u);
  if (!kind) return 0;
  return QUIZ_KINDS.includes(kind) ? QUIZ_POINTS[Math.min(misses, QUIZ_POINTS.length - 1)] : HANDS_ON_POINTS;
};

/** Highest value a unit can pay. */
export const maxUnitPoints = (m: number, u: number) => unitPoints(m, u, 0);
const sumUnits = (m: number, optional: boolean) =>
  unitsOf(m).reduce((sum, _, u) => sum + (isOptionalUnit(m, u) === optional ? maxUnitPoints(m, u) : 0), 0);
/** Module total: its required units only. */
export const moduleMaxPoints = (m: number) => sumUnits(m, false);
/** Bonus points of the module's optional units. */
export const moduleBonusPoints = (m: number) => sumUnits(m, true);
export const TRAIL_MAX_POINTS = MODULES.reduce((sum, m) => sum + moduleMaxPoints(m.n), 0);
export const TRAIL_BONUS_POINTS = MODULES.reduce((sum, m) => sum + moduleBonusPoints(m.n), 0);

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

// Point thresholds stay below the worst case of the required units alone (every quiz at 25, no optional
// unit: 250 per module, 275 for module 1), so finishing the required units always reaches the rank.
export const RANKS: Rank[] = [
  { n: 0, name: "Curious", badges: 0, points: 0, color: "#8A92A6", blurb: "Everyone starts here." },
  { n: 1, name: "Operator", badges: 1, points: 200, color: "#1A2233", blurb: "You know what an agent is and what it costs." },
  { n: 2, name: "Builder", badges: 3, points: 700, color: "#0E7C7B", blurb: "You can build an agent and plug it into your tools." },
  { n: 3, name: "Integrator", badges: 5, points: 1200, color: "#0A5E5D", blurb: "You can defend an agent and put it to work in the business." },
  { n: 4, name: "Guardian", badges: 7, points: 1700, color: "#3B3FA8", blurb: "You can take a pilot to practice, and govern and test it." },
  { n: 5, name: "Agentic Architect", badges: 8, points: 2000, color: "#B84E00", blurb: "You can take an agent from idea to adoption." },
];

export const rankOf = (badges: number, points: number) =>
  [...RANKS].reverse().find((r) => badges >= r.badges && points >= r.points) ?? RANKS[0];

export const nextRankOf = (rank: Rank) => RANKS.find((r) => r.n === rank.n + 1) ?? null;
