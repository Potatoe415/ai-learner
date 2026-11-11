// Course structure for Agent Path, on the Trailhead model (decision 0006):
// one trail -> zones -> modules -> units. Each module earns one badge; points and badges give the learner's rank.
// Types and helpers only. The data comes from content/03-lessons/ through the content pipeline (decision 0008):
// edit the Markdown, never lib/generated/.

import { DELIVERABLES, MODULES, TRAIL, ZONES } from "./generated/content";

export { DELIVERABLES, MODULES, TRAIL, ZONES };

export interface Zone {
  key: string;
  name: string;
  range: string;
  sub: string;
  desc: string;
  boss: string;
  color: string;
  tint: string;
  line: string;
  mascot: "Plug" | "Ward" | "Cap" | "Loop";
}

export interface CourseModule {
  /** Module number, 1 to N without gaps (checked by the content build). */
  n: number;
  /** Key of the module's zone. */
  zone: string;
  title: string;
  sub: string;
  /** Key topics of the module. */
  topics: string[];
  /** The module's units, in order. */
  units: readonly UnitKind[];
  /** Units not needed for the badge (they need code); their points are a bonus (decision 0009). */
  optional: readonly UnitKind[];
  badge: { name: string; how: string };
}

/** Unit kinds, in the order they appear in a module. */
export type UnitKind = "History" | "Concept" | "Case study" | "Lab" | "Deliverable";

export const MAX_MODULE = MODULES.length;

export const getModule = (n: number) => MODULES.find((m) => m.n === n);
/** Units of module `n` (none for an unknown module). */
export const unitsOf = (n: number): readonly UnitKind[] => getModule(n)?.units ?? [];
/** True when unit `u` (0-based) of module `n` is optional. */
export const isOptionalUnit = (n: number, u: number) => {
  const kind = unitsOf(n)[u];
  return !!kind && (getModule(n)?.optional.includes(kind) ?? false);
};
/** Indexes of the units module `n` needs for its badge. */
export const requiredUnitsOf = (n: number) => unitsOf(n).map((_, u) => u).filter((u) => !isOptionalUnit(n, u));
export const getZone = (key: string) => ZONES.find((z) => z.key === key)!;
export const modulesOfZone = (key: string) => MODULES.filter((m) => m.zone === key);

export interface Deliverable { title: string; desc: string; module: number; tint: string }
