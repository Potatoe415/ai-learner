import type { LessonContent } from "../lessons";

// Module 8 · Ethics & capstone. Source: MIT module 8 (chapter 1 Ethics in AI, chapter 2 The Capstone,
// video 8.1, required assignment 8.1) and its complements (capability gap, compute limits, orchestration
// patterns, Mailroom Metaphor and operational ethics, the eight capstone sections, synthesis checklist).
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_8: LessonContent = {
  reading: {
    kicker: "Concept · Ethics, workforce and the adoption plan",
    title: "We can build it. Should we, and on what terms?",
    intro:
      "Seven modules taught you to price, build, connect, secure, scope, roll out and govern an agent. This last one asks the questions that sit above all of them: who is affected, who answers when it goes wrong, and is the outcome fair? Then it folds everything you have produced into one adoption plan you can put in front of your leadership.",
    sections: [
      {
        heading: "Why ethics comes last",
        body: [
          "Ethics is placed at the end on purpose. It is not an afterthought but the lens you hold every earlier decision up to: the model you chose, the data you feed it, the actions you allow, the people whose work changes. “Can we?” is answered. Now: should we, and under which conditions?",
          "AI raises sharper questions than ordinary software for three reasons. It is often opaque, so nobody can fully say why it decided something. It works on probabilities, not fixed rules. And it scales, so a single flaw is repeated across thousands or millions of decisions before anyone notices.",
        ],
        table: {
          head: ["", "A broken spreadsheet formula", "A flawed model in production"],
          rows: [
            ["Reach", "One team, one report", "Every customer, applicant or supplier it touches"],
            ["Speed of damage", "As fast as people open the file", "As fast as the agent runs"],
            ["Who answers", "The file owner", "Unclear, unless someone was named in advance"],
          ],
        },
        callout: {
          label: "Field note",
          text: "Ethical failures are business failures: lost trust, disengaged staff, customer backlash, regulators asking questions. Putting ethics into governance is risk management, not charity.",
        },
      },
      {
        heading: "Four principles leaders keep meeting",
        body: [
          "Practice and research converge on four guideposts. Each one is easy to agree with and hard to run, which is why the next section turns them into procedures.",
        ],
        table: {
          head: ["Principle", "What it asks of you"],
          rows: [
            ["Fairness and non-discrimination", "Skewed training data can copy or harden bias. Make sure nobody is disadvantaged because of a protected characteristic. Fair AI also tends to perform better for the business."],
            ["Transparency and explainability", "Black boxes breed distrust. You must be able to explain a decision in plain words to staff, customers and regulators."],
            ["Accountability and responsibility", "Autonomy does not remove responsibility. A person keeps oversight of, and answers for, what the agent does."],
            ["Privacy and data stewardship", "Data rules keep tightening, so careless handling is a legal and a reputational risk. Use data with care and for a stated purpose."],
          ],
        },
      },
      {
        heading: "Run your agent like a mailroom",
        body: [
          "Instructor Oscar Sanchez proposed a down-to-earth way to make those principles operational: treat an autonomous agent like the company mailroom. A good mailroom has five habits, and each one is a control you can build.",
        ],
        table: {
          head: ["The mailroom clerk…", "Principle", "What it becomes in your agent"],
          rows: [
            ["never reads your letters", "Privacy", "Personal data masked before the model sees it; vendor terms with zero data retention"],
            ["delivers only to verified recipients", "Access control", "Write access limited by IAM roles; the agent touches only what it is allowed to"],
            ["logs every parcel in and out", "Auditability", "A structured rationale stored with each decision, in metadata you can query"],
            ["refuses hazardous or illegal cargo", "Guardrails", "Blocked actions and inputs, enforced in code rather than in the prompt"],
            ["works under a supervisor who answers for losses", "Human responsibility", "A designated role, for example the director of operations, accountable for every agent decision"],
          ],
        },
        bullets: [
          "Fairness in practice: run disparate impact tests continuously on synthetic demographic datasets, and feed the agent no input that can stand in for a demographic trait (a proxy).",
          "Transparency in practice: tell people when they are dealing with an AI, and emit a decision rationale they can be shown.",
          "Proportional intervention: low-confidence or high-financial-impact operations go to a human review queue automatically.",
        ],
        callout: {
          label: "Keep in mind",
          text: "An agent cannot be held legally or financially accountable. A person always is. If your plan does not name that person, the choice will be made for you after the incident.",
        },
      },
      {
        heading: "The work changes before the jobs go",
        body: [
          "Job loss is the concern employees voice most, and it is about more than income: it touches identity, purpose and dignity. History offers a partial answer. ATMs took over some teller tasks and banks moved tellers towards customer service. Spreadsheets displaced manual bookkeepers and created demand for financial analysts. Automation tends to remove tasks first and reshape roles second.",
          "Ignore that, and it bites. In August 2025 the Commonwealth Bank of Australia tried to replace 45 call-centre jobs with an AI voice bot. Call volumes rose, performance fell, and the bank reversed the cuts, rehired the staff and admitted it had misjudged the cost. Elsewhere, AI ordering at Hungry Jack's drive-throughs drew public concern about entry-level jobs for teenagers.",
          "The mailroom image helps here too. Sorting and routing is mechanical, so the agent takes it. The odd parcel, the angry recipient, the exception to policy call for judgement: they stay with people and become a bigger share of the job. Most experts now expect AI to both reshape and replace jobs; the leader's task is to transform work wherever possible.",
        ],
        bullets: [
          "Reskilling, with budget and time agreed before launch.",
          "Internal mobility: a route into the new tasks (review queue, quality audits, exceptions).",
          "Early, honest communication about what changes and what does not.",
          "Real transition support for the roles that do shrink.",
        ],
      },
      {
        heading: "Other risks, and three quick tests",
        body: [
          "Bias is one risk among several. Voice cloning already powers fraud: in 2019 criminals imitated a director's voice and talked a UK energy company into wiring $243,000 to a fraudulent account. In 2024 the US Federal Communications Commission banned AI-generated voices in robocalls after a fake President Biden message tried to mislead voters. In medicine, when a diagnostic tool misses something and a patient is harmed, it is still unclear whether the doctor, the developer or the hospital is liable.",
          "Leaders need tools, not abstraction. Before you approve a use case, run three short tests, then back them with structured artefacts: model cards, bias audits and ethics checklists.",
        ],
        bullets: [
          "Do no harm: borrowed from medicine. What is the worst realistic outcome for the person on the other end, and is it acceptable?",
          "Stakeholder impact: write one line each on how employees, customers, investors and society are affected.",
          "Front-page test: would you be comfortable explaining this decision if it made tomorrow's headlines?",
          "Model card: a standard document giving a model's purpose, data sources, performance, limits and risks. Google researchers introduced the idea in 2019 to help judge whether a model is fit, fair and safe for a given use.",
        ],
        table: {
          head: ["Region", "Typical stance"],
          rows: [
            ["Europe", "Often leads with privacy-first norms"],
            ["United States", "Innovation first, with oversight emerging"],
            ["Asia", "Varies: some countries run state-led experimentation and regulation"],
          ],
        },
        callout: {
          label: "Leadership",
          text: "Values in a mission statement change nothing; values built into operations, training and reporting lines do. Groups such as the Partnership on AI bring stakeholders together to set norms you can borrow. The question moves from “how far can we push efficiency?” to “how do we advance responsibly?”",
        },
      },
      {
        heading: "When one agent becomes several",
        body: [
          "Your capstone may need more than one agent. In the closing webinar, Dr. John Williams described two ways to organise them once a single script is no longer enough. Both avoid long conversational chains between agents, which break as soon as one prompt changes (the “chain jam” from module 5).",
        ],
        table: {
          head: ["Pattern", "How it works", "Why it helps"],
          rows: [
            ["Supervisor (hierarchical)", "A central model splits the goal into sub-tasks, hands each to a specialised worker, checks what comes back and assembles the result", "Workers keep small, focused context windows; the supervisor keeps only a summary, so prompts do not bloat"],
            ["Shared artifact (blackboard)", "Agents never message each other; they read and write a shared state (a database, a JSON workspace, a draft document)", "Agents are fully decoupled: one writes a change, another inspects it, no handoff needed"],
          ],
        },
      },
      {
        heading: "Close the capability gap with one plan",
        body: [
          "The technology can now plan, call tools and act. Yet Dr. Abel Sanchez estimates that 85% of enterprise use is still basic editing, summarising and chat. The gap is human, behavioural and organisational, not technical. Boards bring decades of operating experience but no mental model for software that is not deterministic, so they default to caution.",
          "Your adoption plan bridges that gap by speaking their language: a risk register, lower operating costs, compliance commitments, measurable results. It has eight sections, and instructors flagged a classic trap for each.",
        ],
        table: {
          head: ["Section", "What it must show", "Classic trap"],
          rows: [
            ["1 · Context", "Sector, organisation, one department, one concrete bottleneck", "A use case as wide as “transforming healthcare with AI”"],
            ["2 · Technology", "Model tiers, hosting (cloud or local), integration (MCP, APIs), and why", "A list of tools with no trade-offs explained"],
            ["3 · Cost", "Capex, opex, staffing and training, total cost of ownership", "Raw token costs only"],
            ["4 · Security", "The six NIST CSF 2.0 functions, prompt injection, tool privilege limits", "“We will encrypt the data”"],
            ["5 · Change and training", "Co-design workshops, retraining incentives, psychological safety", "A user manual nobody reads"],
            ["6 · Scaling", "Crawl, Walk, Run with numeric milestones, autonomy levels and gates", "Full autonomy on day one"],
            ["7 · Governance and ethics", "Named laws (GDPR, EU AI Act, HIPAA, CCPA) and the person accountable for failures", "No specific regulation named"],
            ["8 · KPIs", "Effectiveness, efficiency, learning and adaptation, human adoption", "Revenue ROI alone"],
          ],
        },
        callout: {
          label: "Big picture",
          text: "The hyperscalers (Microsoft, Alphabet, Amazon, Meta) are investing upwards of $100 to $150 billion a year in GPU clusters and custom chips, and electricity has become the main constraint: multi-gigawatt power deals, even decommissioned nuclear reactors such as Three Mile Island being brought back. Expect cloud token prices to keep falling, and local or sovereign hosting to stay hard to get.",
        },
      },
    ],
    takeaways: [
      "Every principle needs a mechanism and an owner. The agent is never the accountable party.",
      "Plan the work, not only the tool: which tasks move to the agent, which stay human, which are new.",
      "One plan, eight sections, built from what you already made. Where a number is missing, say how you will get it.",
    ],
    check: {
      prompt:
        "Your agent approves supplier refunds. The board asks who is responsible if it pays the wrong supplier. Which answer fits this module?",
      options: [
        { id: "a", text: "The model vendor, since its terms of service cover errors made by the model" },
        { id: "b", text: "A named role, such as the director of operations, owns every decision; high-amount or low-confidence refunds go to a review queue and each decision is logged with its rationale" },
        { id: "c", text: "Nobody needs to be named once the agent's measured accuracy is above 95%" },
        { id: "d", text: "Responsibility is shared with users, because the model card lists the agent's limits" },
      ],
      correct: "b",
      hints: {
        a: "Your organisation runs the agent and pays the supplier. A vendor contract does not move accountability for your decisions out of the building.",
        c: "Accuracy says how often it is right, not who answers when it is wrong. At scale, 5% is a lot of wrong refunds.",
        d: "A model card is transparency: it helps you judge fitness for use. It does not transfer responsibility to anyone.",
      },
      explanation:
        "Right. That is the mailroom supervisor: a named human answers, unusual or costly parcels go to a person, and every parcel is in the ledger.",
    },
    bubble: "Last stretch. You know how to build it, now let's make sure it's fair.",
  },

  postMortem: {
    kicker: "Post-mortem · Amazon's hiring tool, 2018",
    title: "The recruiting model that learned to prefer men",
    context:
      "Amazon built an AI tool to rank job applicants' résumés. It learned from the company's historical hiring data, and that history reflected a tech industry dominated by men. The model took the pattern for a sign of quality and began recommending men over women. In 2018 Amazon scrapped it, and Reuters reported the story that October.",
    numbers: [
      { value: "2018", label: "Year Amazon scrapped the tool" },
      { value: "“women's”", label: "One word enough to push a résumé down the ranking" },
      { value: "Past hires", label: "The training data: years of decisions in a male-dominated field" },
      { value: "2 fronts", label: "Damage: reputation in the media, legal exposure under equal employment laws" },
    ],
    timeline: [
      { label: "Build", text: "The tool is trained on the company's historical hiring data. Nobody examines what those past decisions encode before using them as the definition of a good candidate." },
      { label: "The pattern", text: "The model systematically downgrades résumés containing the word “women's”, as in “women's chess club captain”. It has learned the skew in past hiring and applies it to every new applicant." },
      { label: "2018 · Scrapped", text: "Amazon abandons the tool once the bias is discovered." },
      { label: "Oct 2018 · Public", text: "Reuters reports the case. Media coverage presents it as proof that bias can be “baked into” AI." },
      { label: "Afterwards", text: "The case becomes a standard warning: unexamined training data can encode and amplify discrimination, with reputational and legal consequences for the employer." },
    ],
    lessons: [
      "Historical data records past decisions, including their bias. A model trained on it learns that bias and repeats it at scale.",
      "Test outcomes by group before launch and keep testing after: continuous disparate impact tests on synthetic demographic datasets are built to catch exactly this kind of skew.",
      "Hunt for proxies. The model never needed a gender field: a single word carried the signal.",
      "Document the model in a model card (purpose, data sources, performance, limits, risks) so its fitness for hiring is judged before use, not after.",
      "Stopping is a valid outcome. Someone must own the decision and be able to switch the system off.",
    ],
    question: {
      prompt: "What was the root cause of the bias in Amazon's recruiting tool?",
      options: [
        { id: "a", text: "A programming bug in the ranking code" },
        { id: "b", text: "Training on historical hiring data that reflected a male-dominated industry, which the model learned as a signal of quality" },
        { id: "c", text: "Gender was entered as an explicit input field" },
        { id: "d", text: "The hiring team instructed the model to favour men" },
      ],
      correct: "b",
      hints: {
        a: "The code did what it was built to do: learn from the data. The problem was what the data contained.",
        c: "No gender field was needed. The bias came through words such as “women's”, which acted as a proxy.",
        d: "Nothing in the record points to intent. Unexamined data was enough to produce a discriminatory result.",
      },
      explanation:
        "Exactly. Bias in, bias out. The model learned the past and projected it onto every new applicant, which is why fairness has to be tested on outcomes, not assumed from good intentions.",
    },
    sources: [
      "Dastin, J. (2018, October 11). Insight - Amazon scraps secret AI recruiting tool that showed bias against women. Reuters.",
      "MIT Applied Agentic AI, Module 8: Business risks of ethical failures (biased hiring algorithms).",
    ],
    bubble: "Good engineers, real data, unfair result. Let's see how it happened.",
  },

  lab: {
    kicker: "Lab · Mailroom map",
    title: "Map what your agent changes in the mailroom",
    goal: "Break your candidate workflow into tasks, decide which move to the agent, which stay human and which are new, measure the hours that shift, then check that each mailroom control has a mechanism and a named owner.",
    duration: "40 minutes",
    prerequisites: [
      "Python 3.10 or later (standard library only, runs offline)",
      "Your candidate workflow and cost estimate (module 1) and your Minimum Viable Agent scope (module 5)",
      "Your Crawl-Walk-Run rollout (module 6) and governance plan (module 7), if you have them",
    ],
    steps: [
      {
        title: "List the tasks, with real hours",
        body: [
          "Take the people who do your candidate workflow today. Write down every task they perform and the human hours per week it takes. Ask them rather than guess: this list is also your first co-design conversation.",
          "Then label each task. Routing is mechanical sorting and moving: it goes to the agent. Judgement covers exceptions, disputes and relationships: it stays with people. New is the work the agent creates for people, such as working its review queue or auditing a sample of its decisions.",
        ],
      },
      {
        title: "Write the map",
        body: [
          "Save this as mailroom_map.py and replace the example (supplier invoice handling) with your own workflow. The CONTROLS block holds the five mailroom habits plus fairness, transparency and proportional intervention. Leave a field empty when it is not decided yet: the script will flag it.",
        ],
        code: {
          lang: "python",
          text: `# mailroom_map.py: map your candidate workflow task by task, then check the mailroom controls.
# Usage: python mailroom_map.py   (replace the example below with your own workflow first)

WORKFLOW = "Supplier invoice handling, finance operations"  # your candidate workflow
ACCOUNTABLE = "Director of Finance Operations"  # one named human role, never "the agent"

# (task, human hours per week today, human hours per week after launch, done by after launch, kind)
#   routing   = mechanical sorting and routing: moves to the agent
#   judgement = exceptions, disputes, relationships: stays with people
#   new       = work the agent creates for people (review queue, audits)
TASKS = [
    ("Read incoming invoices, extract the fields", 8, 0, "agent", "routing"),
    ("Match invoices to purchase orders", 10, 1, "agent, person spot-checks", "routing"),
    ("Chase missing documents", 5, 1, "agent", "routing"),
    ("Resolve supplier disputes", 4, 5, "person", "judgement"),
    ("Approve payments above policy limits", 3, 3, "person", "judgement"),
    ("Work the agent's review queue", 0, 4, "person", "new"),
    ("Audit a weekly sample of agent decisions", 0, 2, "person", "new"),
]

# Every control needs a concrete mechanism and a named owner. Empty string = not decided yet.
CONTROLS = {
    "Privacy (never read the letters)": (
        "Mask bank details and personal data before the model sees them", "Data protection lead"),
    "Access control (verified recipients only)": (
        "Agent writes only to the payment-proposal table, through its own IAM role", "IT security"),
    "Auditability (log every parcel)": (
        "Each decision stored with inputs, tools called and a short rationale", ""),
    "Guardrails (refuse hazardous cargo)": ("", ""),
    "Accountability (the supervisor answers)": ("Named in the governance plan", ACCOUNTABLE),
    "Fairness (no group disadvantaged)": (
        "Disparate impact test on a synthetic supplier set before each release", "Procurement analyst"),
    "Transparency (people know it is an AI)": (
        "Supplier emails say they come from an automated assistant", "Finance operations lead"),
    "Proportional intervention (odd parcels to a person)": (
        "Low-confidence or high-amount cases go to the review queue", "Finance operations lead"),
}

print(f"Mailroom map: {WORKFLOW}")
print(f"Accountable for every agent decision: {ACCOUNTABLE}")
print()
print(f"{'Task':44} {'Today':>6} {'After':>6}  Kind       Done by")
for task, now, after, who, kind in TASKS:
    print(f"{task:44} {now:>5}h {after:>5}h  {kind:10} {who}")

today = sum(t[1] for t in TASKS)
after = sum(t[2] for t in TASKS)
moved = sum(t[1] - t[2] for t in TASKS if t[4] != "new")
new = sum(t[2] for t in TASKS if t[4] == "new")
net = today - after
print()
print(f"Human hours per week today: {today}, after launch: {after}")
print(f"Taken off existing tasks: {moved} h, new human tasks: {new} h, net freed: {net} h ({net / today:.0%})")

warnings = []
for task, now, after, who, kind in TASKS:
    if kind == "judgement" and "agent" in who:
        warnings.append(f"Judgement task handed to the agent: {task}")
    if kind == "routing" and "person" not in who and after > 0:
        warnings.append(f"Agent task with hours left but no person named: {task}")
for name, (mechanism, owner) in CONTROLS.items():
    if not mechanism:
        warnings.append(f"No mechanism yet: {name}")
    if not owner:
        warnings.append(f"No owner yet: {name}")

print()
print(f"Open points: {len(warnings)}")
for w in warnings:
    print(f"  - {w}")`,
        },
      },
      {
        title: "Run it and read the result",
        body: [
          "On the example, human hours drop from 30 to 16 a week: 20 hours leave existing tasks, 6 come back as new ones (review queue and audits), so 14 are freed, about 47% of the work. Disputes grow from 4 to 5 hours: judgement becomes a larger share of the job.",
          "The script lists four open points. “Chase missing documents” still costs a human hour but nobody is named for it. Auditability has no owner. Guardrails have neither a mechanism nor an owner. Fix your own open points until the list is empty, or carry each one into the open questions of your plan.",
        ],
        code: { lang: "shell", text: "python mailroom_map.py" },
      },
      {
        title: "Decide where the freed time goes",
        body: [
          "Freed hours that nobody plans for read as job cuts, whatever you intended. For each role, write what the freed time becomes (more judgement work, the new tasks, another team's backlog) and what reskilling it needs. If a role really shrinks, write the transition support you will offer and when you will say so. The Commonwealth Bank cut jobs first, then watched call volumes rise and had to reverse the cuts: test your numbers in the Crawl phase before anyone's job changes.",
        ],
      },
      {
        title: "Run the three tests",
        body: [
          "Under the map, write three lines. Do no harm: the worst realistic outcome for the person on the other end. Stakeholder impact: one line each for employees, customers, investors and society. Front-page test: the sentence you would be comfortable reading in a headline. These lines, the task map and the controls go straight into sections 5 and 7 of your adoption plan.",
        ],
      },
    ],
    checklist: [
      "I listed the real tasks of my candidate workflow with hours, ideally checked with the people who do them",
      "Each task is labelled routing, judgement or new, and no judgement task is handed to the agent alone",
      "I know how many hours move, how many come back as new tasks, and where the freed time goes",
      "Every mailroom control has a mechanism and a named owner, or is carried as an open question",
      "I wrote the do-no-harm, stakeholder impact and front-page lines",
    ],
    bubble: "Mechanical to the agent, judgement to people. Let's sort your mailroom.",
  },

  deliverable: {
    kicker: "Deliverable · Capstone adoption plan",
    title: "Your capstone adoption plan",
    purpose:
      "The final file: a two-to-five page executive plan for bringing an agent into one function of your organisation. It follows the eight sections of the capstone and assembles the deliverables of modules 1 to 7, plus this module's mailroom map. You are not writing from scratch: you are joining your pieces into one coherent story. Where you lack a figure, say how you will get it (internal data, an expert, more measurement).",
    fileName: "capstone-adoption-plan.md",
    template: `# Capstone adoption plan

Organisation (one sentence, reused word for word everywhere in this document):
Author:
Date and version:
Accountable executive (answers for the agent's decisions):

## Summary for leadership
Five lines in board language (risk, operating cost, compliance, results), no jargon:
- The bottleneck:
- What the agent does, and what it does not do:
- What it costs and what it saves:
- The main risk and how it is controlled:
- How success is measured:

## 1. Context and use case
Reuses: candidate workflow (module 1), Minimum Viable Agent scope (module 5).
- Sector and type of organisation:
- Department, process or function:
- The one concrete bottleneck we are fixing:
- Volume and current cost (time, errors, delays):
- Why an agent rather than a chat tool (what it will actually do, not just draft):
- In scope for the first agent / explicitly out of scope:

## 2. Technology choice and integration
Reuses: platform and architecture (module 2), integration plan (module 3).
| Choice | Option picked | Alternative considered | Why this one |
|---|---|---|---|
| Platform or framework | | | |
| Model tiers | | | |
| Hosting (cloud or local) | | | |
| Orchestration (single agent, supervisor, shared artifact) | | | |
| Integration (MCP servers, APIs) | | | |

- Systems the agent reads from:
- Systems the agent writes to, and with which permissions:

## 3. Cost considerations
Reuses: cost estimate (module 1). Prices checked on (date):
| Line | One-off (capex) | Monthly (opex) | Notes |
|---|---|---|---|
| Model tokens | | | |
| Infrastructure and hosting | | | |
| Data preparation and integration | | | |
| Evaluation runs (golden set, red-teaming, CI/CD evals) | | | |
| Staffing: build and maintenance | | | |
| Human review in the loop | | | |
| Training and change management | | | |
| **Total cost, first 12 months** | | | |

- Expected savings or value, and how they are calculated:
- Break-even point:

## 4. Security plan (NIST CSF 2.0)
Reuses: security memo (module 4).
| Function | Main risk for this agent | Control | Owner |
|---|---|---|---|
| Govern | | | |
| Identify | | | |
| Protect (incl. tool privilege limits) | | | |
| Detect (incl. prompt injection) | | | |
| Respond | | | |
| Recover | | | |

- Data privacy (masking, retention, vendor terms):

## 5. Change management and training
Reuses: Crawl-Walk-Run rollout (module 6), mailroom map (this module).
| Role | Tasks moving to the agent | Tasks that stay | New tasks | Hours freed per week | Where the time goes |
|---|---|---|---|---|---|
| | | | | | |

- Co-design workshops (who, when):
- Hands-on training, by role:
- Retraining incentives and internal mobility:
- Psychological safety (how people raise problems without blame):
- Communication plan (what is said, by whom, when):
- Transition support for roles that shrink:

## 6. Scaling strategy: Crawl, Walk, Run
Reuses: Crawl-Walk-Run rollout (module 6).
| Phase | Autonomy level | Scope | Exit gate (number) | Target date |
|---|---|---|---|---|
| Crawl | | | | |
| Walk | | | | |
| Run | | | | |

- What sends us back a phase:

## 7. Governance, compliance and ethics
Reuses: governance plan with guardrails, evals and audit (module 7), mailroom map (this module).

### 7.1 Compliance
| Regulation (GDPR, EU AI Act, HIPAA, CCPA, sector rules) | Why it applies | What we do |
|---|---|---|
| | | |

### 7.2 Guardrails, evaluation and audit
- Hard guardrails (blocked actions, limits, schemas):
- Evaluation (dataset, metrics, pass thresholds, frequency):
- Audit trail (what is logged for each decision, how long it is kept):

### 7.3 Ethics: the mailroom controls
| Control | Mechanism in this agent | Evidence | Owner |
|---|---|---|---|
| Privacy | | | |
| Access control | | | |
| Auditability | | | |
| Guardrails | | | |
| Fairness (disparate impact tests, no proxy inputs) | | | |
| Transparency (people know it is an AI) | | | |
| Proportional intervention (review queue) | | | |

- Main ethical risk, especially for the workforce, and its business impact:
- Mitigation, and how it keeps trust:
- Do no harm (worst realistic outcome):
- Stakeholder impact (employees, customers, investors, society):
- Front-page test (one sentence we would accept in a headline):
- Model card (location, last update):

### 7.4 Accountability
- Person accountable for every agent decision:
- Person who can switch it off:
- Escalation path when something goes wrong:

## 8. KPIs
Reuses: 4D KPI scorecard (module 6).
| Dimension | KPI | Baseline | Target | Source | Frequency |
|---|---|---|---|---|---|
| Effectiveness | | | | | |
| Efficiency | | | | | |
| Learning and adaptation | | | | | |
| Human adoption | | | | | |

## 9. Missing information
| What we do not know yet | Why it matters | How we will get it (internal, expert, measurement) | By when |
|---|---|---|---|
| | | | |

## Appendix: pieces reused
| Module | Piece | File | Last updated |
|---|---|---|---|
| 1 | Candidate workflow and cost estimate | | |
| 2 | Platform and architecture | | |
| 3 | Integration plan | | |
| 4 | Security memo (NIST CSF 2.0) | | |
| 5 | Minimum Viable Agent scope | | |
| 6 | 4D KPI scorecard, Crawl-Walk-Run rollout | | |
| 7 | Governance plan (guardrails, evals, audit) | | |
| 8 | Mailroom map | | |
`,
    checklist: [
      "Two to five pages, all eight sections, one department and one bottleneck, the same organisation sentence throughout",
      "The plan goes beyond chat: the agent does measurable work in a real workflow",
      "Each technology choice is justified against an alternative, including orchestration if there are several agents",
      "Costs cover infrastructure, data preparation, evaluation runs, staffing and change management, not only tokens",
      "Security uses all six NIST CSF 2.0 functions and covers prompt injection and tool privileges",
      "Crawl, Walk and Run each have a numeric gate; KPIs cover all four dimensions",
      "Governance names the laws, the mailroom controls with owners, the workforce impact and one accountable person",
    ],
    bubble: "Everything you built, in one file. This is the one you take to your leadership.",
  },
};
