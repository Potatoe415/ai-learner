// Course structure for Agent Path, on the Trailhead model (decision 0006):
// one trail (AI integration in organisations) -> modules -> units. Each module earns one badge; points and badges give the learner's rank.
// Eight modules, one per MIT Applied Agentic AI module (decision 0007). UI strings are English first (decision 0004).

export type ZoneKey = "workshop" | "fortress" | "field" | "summit";

export interface Zone {
  key: ZoneKey;
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
  /** Module number, 1 to 8: app module N covers MIT module N. */
  n: number;
  zone: ZoneKey;
  title: string;
  sub: string;
  /** Key topics from the MIT curriculum. */
  topics: string[];
  /** The module's units, in order. */
  units: readonly UnitKind[];
  badge: { name: string; how: string };
}

export const TRAIL = {
  name: "AI integration in organisations",
  desc: "Learn applied agentic AI step by step, from the agent loop to your own adoption plan.",
};

/** Unit kinds, in the order they appear in a module. */
export type UnitKind = "History" | "Concept" | "Post-mortem" | "Lab" | "Deliverable";

/** The 4 units most modules have. Module 1 opens with a History unit (decision 0007). */
export const CORE_UNITS: readonly UnitKind[] = ["Concept", "Post-mortem", "Lab", "Deliverable"];

export const ZONES: Zone[] = [
  {
    key: "workshop",
    name: "The Workshop",
    range: "Zone 1 · modules 1 to 3",
    sub: "Systems & tools",
    desc: "Understand the agent loop and its costs, build a solid harness and plug in your tools.",
    boss: "Zone boss · Knight Capital post-mortem",
    color: "#0E7C7B",
    tint: "#DCEFEE",
    line: "rgba(14,124,123,0.5)",
    mascot: "Plug",
  },
  {
    key: "fortress",
    name: "The Fortress",
    range: "Zone 2 · module 4",
    sub: "Cybersecurity",
    desc: "Spot attacks on agents, know their perception limits and map your defences onto NIST CSF 2.0.",
    boss: "Zone boss · Your security memo",
    color: "#3B3FA8",
    tint: "#E4E5F8",
    line: "rgba(59,63,168,0.45)",
    mascot: "Ward",
  },
  {
    key: "field",
    name: "The Field",
    range: "Zone 3 · modules 5 and 6",
    sub: "Scaling & the last mile",
    desc: "Put agents to work across business functions, then take a pilot all the way to practice.",
    boss: "Zone boss · Your 4D KPI scorecard",
    color: "#B84E00",
    tint: "#FAE6D2",
    line: "rgba(184,78,0,0.45)",
    mascot: "Cap",
  },
  {
    key: "summit",
    name: "The Summit",
    range: "Zone 4 · modules 7 and 8",
    sub: "Governance & ethics",
    desc: "Set guardrails nobody can bypass, prove it all works with evals, and defend your adoption plan.",
    boss: "Final boss · Capstone: your adoption plan",
    color: "#7A2E6E",
    tint: "#F1E1EE",
    line: "rgba(122,46,110,0.45)",
    mascot: "Loop",
  },
];

export const MODULES: CourseModule[] = [
  {
    n: 1, zone: "workshop", title: "Foundations & the token meter", sub: "The history of AI, the agent loop, models and what they cost",
    units: ["History", ...CORE_UNITS],
    topics: ["A brief history of AI, from Turing to LangChain", "From stateless text generation to goal-directed agents", "Perceive → Reason → Act → Reflect", "Model families and multimodal pipelines", "Token economics, model tiering and routing"],
    badge: { name: "Token accountant", how: "Route prompts between a small model and a frontier model (Lab 1)." },
  },
  {
    n: 2, zone: "workshop", title: "Platforms & the harness", sub: "From vibe coding to engineering",
    units: CORE_UNITS,
    topics: ["Emerging agentic platforms, open vs closed", "Vibe coding vs harness engineering", "Single-agent vs multi-agent systems", "Choosing a system and its infrastructure"],
    badge: { name: "Harness on", how: "Wrap a vibe-coded prototype in deterministic checks." },
  },
  {
    n: 3, zone: "workshop", title: "The universal plug", sub: "Tools, MCP, legacy systems, circuit breakers",
    units: CORE_UNITS,
    topics: ["Function calling and tool grounding", "Model Context Protocol: M × N → 1 × N", "Legacy integration realities", "Knight Capital: circuit breakers and kill-switches"],
    badge: { name: "Plugged in", how: "Build your own MCP server (Lab 2)." },
  },
  {
    n: 4, zone: "fortress", title: "Threats & NIST", sub: "Prompt injection, deepfakes, NIST CSF 2.0",
    units: CORE_UNITS,
    topics: ["Prompt injection, deepfakes and impersonation", "Perception limits and hallucinations", "NIST CSF 2.0", "Tamper-evident audit trails"],
    badge: { name: "Injection hunter", how: "Find the attacks hidden in a booby-trapped input." },
  },
  {
    n: 5, zone: "field", title: "Agents at work", sub: "Maturity cycle, business functions, Minimum Viable Agent",
    units: CORE_UNITS,
    topics: ["5-stage AI maturity cycle", "Agents by business function", "Minimum Viable Agent", "Centralized vs embedded teams"],
    badge: { name: "MVA scoped", how: "Scope a minimum viable agent around one precise bottleneck." },
  },
  {
    n: 6, zone: "field", title: "From pilot to practice", sub: "Pilot purgatory, Crawl-Walk-Run, 4D KPIs",
    units: CORE_UNITS,
    topics: ["Voice agents", "Pilot purgatory", "Change management (ADKAR)", "Crawl-Walk-Run", "4-dimensional KPI framework"],
    badge: { name: "Out of purgatory", how: "Plan a pilot's move through Crawl, Walk, Run." },
  },
  {
    n: 7, zone: "summit", title: "Guardrails, governance & evals", sub: "Privacy law, hard guardrails, RAGAS, audit",
    units: CORE_UNITS,
    topics: ["GDPR, CCPA, HIPAA", "Soft vs hard guardrails", "Testing, RAGAS and golden datasets", "Documentation and audit trails"],
    badge: { name: "Hard guardrail", how: "Lock an agent's output and score it on a golden dataset (Labs 3 and 4)." },
  },
  {
    n: 8, zone: "summit", title: "Ethics & capstone", sub: "Workforce, fairness, accountability, adoption plan",
    units: CORE_UNITS,
    topics: ["Workforce transformation and the Mailroom Metaphor", "Fairness, bias and accountability", "Capstone adoption blueprint"],
    badge: { name: "Agentic architect", how: "Complete your adoption plan (Capstone)." },
  },
];

export const MAX_MODULE = 8;

export const getModule = (n: number) => MODULES.find((m) => m.n === n);
/** Units of module `n` (the 4 core units for an unknown module). */
export const unitsOf = (n: number): readonly UnitKind[] => getModule(n)?.units ?? CORE_UNITS;
export const getZone = (key: ZoneKey) => ZONES.find((z) => z.key === key)!;
export const modulesOfZone = (key: ZoneKey) => MODULES.filter((m) => m.zone === key);

export interface Deliverable { title: string; desc: string; module: number; tint: string }
export const DELIVERABLES: Deliverable[] = [
  { title: "Security memo", desc: "A memo template that maps your agentic risks onto the NIST CSF 2.0 framework.", module: 4, tint: "#E4E5F8" },
  { title: "4D KPI scorecard", desc: "Technical, operational, financial, adoption: the scorecard to present to your leadership.", module: 6, tint: "#FAE6D2" },
  { title: "Capstone adoption plan", desc: "Stack, costs, security, phased rollout, guardrails and KPIs: your complete file.", module: 8, tint: "#F9E3AE" },
];
