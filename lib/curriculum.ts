// Course structure for Agent Path, on the Trailhead model (decision 0006):
// one trail (PAF) -> modules -> units. Each module earns one badge; points and badges give the learner's rank.
// Derived from the MIT Applied Agentic AI curriculum. UI strings are English first (decision 0004).

export type ZoneKey = "workshop" | "fortress" | "field";

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
  mascot: "Plug" | "Ward" | "Cap";
}

export interface CourseModule {
  n: number;
  zone: ZoneKey | "base";
  title: string;
  sub: string;
  /** MIT module(s) this module covers. */
  mitModules: number[];
  /** Key topics from the MIT curriculum (used until full lessons are written). */
  topics: string[];
  badge: { name: string; how: string };
}

export const TRAIL = {
  name: "PAF",
  desc: "Learn applied agentic AI step by step, from the agent loop to your own adoption plan.",
};

/** The 4 units of every module. */
export const UNITS = ["Concept", "Post-mortem", "Lab", "Deliverable"] as const;

export const ZONES: Zone[] = [
  {
    key: "workshop",
    name: "The Workshop",
    range: "Zone 1 · modules 1 to 4",
    sub: "Systems & tools",
    desc: "Understand the agent loop, master costs, build a solid harness and plug in your tools.",
    boss: "Zone boss · Knight Capital post-mortem",
    color: "#0E7C7B",
    tint: "#DCEFEE",
    line: "rgba(14,124,123,0.5)",
    mascot: "Plug",
  },
  {
    key: "fortress",
    name: "The Fortress",
    range: "Zone 2 · modules 5 to 7",
    sub: "Security & governance",
    desc: "Spot attacks, set guardrails nobody can bypass, and prove it all works with evals.",
    boss: "Zone boss · Red team: defend your agent",
    color: "#3B3FA8",
    tint: "#E4E5F8",
    line: "rgba(59,63,168,0.45)",
    mascot: "Ward",
  },
  {
    key: "field",
    name: "The Field",
    range: "Zone 3 · modules 8 to 10",
    sub: "Production & transformation",
    desc: "Ship a first useful agent, escape pilot purgatory and defend your adoption plan.",
    boss: "Final boss · Capstone: your adoption plan",
    color: "#B84E00",
    tint: "#FAE6D2",
    line: "rgba(184,78,0,0.45)",
    mascot: "Cap",
  },
];

export const MODULES: CourseModule[] = [
  {
    n: 0, zone: "base", title: "Awakening: what is an agent?", sub: "Meet Loop, see what changes with agents",
    mitModules: [1],
    topics: ["From stateless text generation to stateful, goal-directed agents", "Perceive → Reason → Act → Reflect"],
    badge: { name: "First step", how: "Finish the Awakening and meet Loop." },
  },
  {
    n: 1, zone: "workshop", title: "The agent loop", sub: "Perceive, reason, act, reflect", mitModules: [1],
    topics: ["ReAct loop mechanics", "Transformers, diffusion, multimodal ingest, SLMs vs frontier LLMs"],
    badge: { name: "First loop", how: "Run your first perceive, reason, act, reflect loop." },
  },
  {
    n: 2, zone: "workshop", title: "The token meter", sub: "Costs, SLM vs LLM routing", mitModules: [1],
    topics: ["Token economics: context overhead, input vs output cost, KV caching", "Model tiering and routing", "Latency vs precision vs unit economics"],
    badge: { name: "Token accountant", how: "Route your prompts between a small model and a frontier model (Lab 1)." },
  },
  {
    n: 3, zone: "workshop", title: "The harness", sub: "From vibe coding to engineering", mitModules: [2],
    topics: ["Vibe coding vs harness engineering", "Single-agent vs multi-agent topologies", "Visual automation vs programmatic SDKs"],
    badge: { name: "Harness on", how: "Wrap an LLM in deterministic checks." },
  },
  {
    n: 4, zone: "workshop", title: "The universal plug", sub: "Tools, MCP, circuit breakers", mitModules: [3],
    topics: ["Function calling and tool grounding", "Model Context Protocol: M × N → 1 × N", "Legacy integration realities", "Knight Capital: circuit breakers and kill-switches"],
    badge: { name: "Plugged in", how: "Build your own MCP server (Lab 2)." },
  },
  {
    n: 5, zone: "fortress", title: "Threats & NIST", sub: "Prompt injection, CSF 2.0", mitModules: [4],
    topics: ["Direct and indirect prompt injection", "Hallucinations and perception limits", "NIST CSF 2.0: Identify, Protect, Detect, Respond, Recover", "Immutable audit trails"],
    badge: { name: "Injection hunter", how: "Spot the prompt injections hidden in a booby-trapped document." },
  },
  {
    n: 6, zone: "fortress", title: "Hard guardrails", sub: "AI Act, GDPR, guardrails", mitModules: [7],
    topics: ["EU AI Act risk classes", "GDPR Article 17 vs vector embeddings; Article 22", "Soft vs hard guardrails"],
    badge: { name: "Hard guardrail", how: "Enforce a strict schema and mask personal data (Lab 3)." },
  },
  {
    n: 7, zone: "fortress", title: "Evals & audit", sub: "RAGAS, golden datasets, logs", mitModules: [7],
    topics: ["Unit tests vs trajectory evals", "RAGAS: faithfulness, answer relevancy, context recall and precision", "Golden datasets, red-teaming, LLM-as-a-judge", "Auditability and observability"],
    badge: { name: "Golden dataset", how: "Run an automated evaluation with RAGAS (Lab 4)." },
  },
  {
    n: 8, zone: "field", title: "Your first useful agent", sub: "Maturity, Minimum Viable Agent", mitModules: [5],
    topics: ["5-stage AI maturity cycle", "Minimum Viable Agent", "Functional deployment matrix", "CoE vs federated teams"],
    badge: { name: "MVA shipped", how: "Scope a minimum viable agent around one precise bottleneck." },
  },
  {
    n: 9, zone: "field", title: "From pilot to practice", sub: "Crawl-Walk-Run, 4D KPIs", mitModules: [6],
    topics: ["Pilot purgatory", "Voice and multimodal agents", "ADKAR change management", "Crawl-Walk-Run", "4-dimensional KPI framework"],
    badge: { name: "Out of purgatory", how: "Plan a pilot's move through Crawl, Walk, Run." },
  },
  {
    n: 10, zone: "field", title: "Capstone: ready", sub: "Ethics and adoption plan", mitModules: [8],
    topics: ["Workforce transformation and the Mailroom Metaphor", "Fairness, bias and accountability", "Capstone adoption blueprint"],
    badge: { name: "Agentic architect", how: "Complete your adoption plan (Capstone)." },
  },
];

export const MAX_MODULE = 10;

export const getModule = (n: number) => MODULES.find((m) => m.n === n);
export const getZone = (key: ZoneKey) => ZONES.find((z) => z.key === key)!;
export const modulesOfZone = (key: ZoneKey) => MODULES.filter((m) => m.zone === key);

export interface Deliverable { title: string; desc: string; module: number; tint: string }
export const DELIVERABLES: Deliverable[] = [
  { title: "Security memo", desc: "A memo template that maps your agentic risks onto the NIST CSF 2.0 framework.", module: 5, tint: "#E4E5F8" },
  { title: "4D KPI scorecard", desc: "Technical, operational, financial, adoption: the scorecard to present to your leadership.", module: 9, tint: "#FAE6D2" },
  { title: "Capstone adoption plan", desc: "Stack, costs, security, phased rollout, guardrails and KPIs: your complete file.", module: 10, tint: "#F9E3AE" },
];
