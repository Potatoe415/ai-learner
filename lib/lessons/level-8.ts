import type { LessonContent } from "../lessons";

// Level 8 · Your first useful agent. Source: MIT module 5 (sections 1 to 7, assignment 5.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const LEVEL_8: LessonContent = {
  reading: {
    kicker: "Concept · Maturity, Minimum Viable Agent",
    title: "Ship one small agent that works, not a big one that might",
    intro:
      "Most first agents fail for organisational reasons, not technical ones. The company was not ready, the scope was too wide, or nobody owned the result. This level gives you three tools to avoid that: a maturity map to know where you stand, a Minimum Viable Agent to start small, and a team model to decide who builds and runs it.",
    sections: [
      {
        heading: "The maturity cycle: five moves, in order",
        body: [
          "Adoption is a cycle, not a launch. Each move prepares the next one, and skipping one shows up later as resistance, risk or a pilot nobody uses.",
        ],
        table: {
          head: ["Move", "What you do", "What you get out of it"],
          rows: [
            ["1 · Spot opportunities", "Find repetitive tasks and recurring bottlenecks. Split them into small steps (pick targets, enrich data, draft a message).", "A shortlist, and sponsors who have seen a quick, concrete demo"],
            ["2 · Teach the basics", "Train people to prompt, read outputs critically and know the limits. Publish an approved tool list, a usage policy and ethical rules.", "Shared vocabulary, fewer unsanctioned tools"],
            ["3 · Map workflows", "Draw today's process step by step, mark where an agent could help, prototype, then score each idea on value, effort and risk.", "A ranked backlog of prototypes"],
            ["4 · Enable", "Give the winners a team, secure platforms, data pipelines, standard APIs and a dashboard (time saved, error rate, throughput).", "A pilot that runs on real systems and is measured"],
            ["5 · Scale and share", "Turn what works into standard procedure. Write the case study: architecture, method, governance, numbers. Grow champions and a community of practice.", "Reuse across teams, and the next round of opportunities"],
          ],
        },
        callout: {
          label: "Watch out: shadow AI",
          text: "When approved tools lag behind, people use their own. In a 2024 survey of 7,000 workers in seven countries, 38 % admitted sharing sensitive work data with AI tools without permission, and 52 % had never been trained to use AI safely. The fix has three parts: policy (approved tools, audits, a governance group), technology (data loss prevention, access control, log review) and culture (training, safe sandboxes, leaders who set the example).",
        },
      },
      {
        heading: "Where you really stand",
        body: [
          "The cycle says what to do. A maturity ladder says how far you have got. Be honest here: the right first agent depends on the stage, not on ambition.",
        ],
        table: {
          head: ["Stage", "What it looks like", "Main risk", "Agent you can ship"],
          rows: [
            ["1 · Ad-hoc", "Individuals use consumer chatbots on their own", "Data and IP leaking into public tools, nothing learned centrally", "None yet: approve a tool and a policy first"],
            ["2 · Tactical", "Departments buy isolated point solutions (help desk bot, summariser)", "Tool sprawl and data silos", "One narrow agent with a clear metric"],
            ["3 · Integrated", "Agents sit on the core systems (CRM, ERP, HRIS) with KPIs, guardrails and role-based access", "Integration debt", "Agents that read and write in one function"],
            ["4 · Orchestrated", "Multi-agent workflows run across departments; people handle exceptions", "Cascading failures between agents", "Cross-functional, closed-loop workflows"],
            ["5 · Reinvented", "Products, pricing and service are designed around agents", "Strategic lock-in", "New business models"],
          ],
        },
        bullets: [
          "Crawl: small pilots on routine work (data entry, invoices, reports), data clean-up, briefings, draft governance.",
          "Walk: supervised agents that recommend while a person decides (next best action, assisted chat), better pipelines, business and tech teams working together.",
          "Run: autonomous agents (anomaly detection with automatic fixes, personalisation at scale), a Center of Excellence watching models and ROI against KPIs.",
        ],
      },
      {
        heading: "The Minimum Viable Agent",
        body: [
          "A Minimum Viable Agent (MVA) is the smallest agent that removes one real bottleneck and proves it with a number. Think lean manufacturing, not moonshot: lower the cost of learning, then improve in small steps.",
        ],
        bullets: [
          "One task, short and repetitive: a few minutes, many times a week. Not a whole process.",
          "A person validates every output at first. Autonomy is earned, step by step.",
          "One business number it moves: more revenue or less cost. If you cannot say which, stop.",
          "Override rate as the health signal: if the reviewer corrects more than about one output in five, the input data is dirty or the task is too vague for the model.",
          "Governance is part of ROI. Ten hours saved a week do not offset a data breach nobody checked for.",
          "Start with volunteers. A team that fears for its jobs can feed the agent bad data to prove it fails.",
        ],
        callout: {
          label: "Why outsourced work moves first",
          text: "Customer support, invoice processing and back-office data entry were outsourced because classic software could not read messy documents or use judgement. Agents can. These tasks also have clear KPIs (tickets, handling time, satisfaction), so ROI is easy to show, and their cost grows with volume, which agents can flatten. HR experience gains are real but harder to put in numbers. Consultants and outsourcing firms are rebuilding their offers around this shift, which makes them useful partners and also vendors with an interest.",
        },
      },
      {
        heading: "Functional deployment matrix",
        body: [
          "A functional agent is built for one domain: its data, its tools, its rules. That is what separates it from a general assistant. Each function has a safe entry point and a trap.",
          "Reported results give an order of magnitude, not a promise: vendors cite up to 70 % fewer manual HR tasks, 12 % faster financial processing with 22 % happier staff, and up to 80 % of routine IT issues handled automatically.",
        ],
        table: {
          head: ["Function", "Start here (MVA)", "Mature pattern", "Trap"],
          rows: [
            ["HR", "Leave and benefits answers from the HRIS, onboarding scheduling", "End-to-end onboarding: documents, access, training", "Automated CV screening or performance scoring: high-risk under the EU AI Act"],
            ["Finance", "Know-your-customer document collection and checks", "Research retrieval and portfolio insight for advisers", "Advice without audit trail in a regulated setting"],
            ["IT", "Password resets, access requests, ticket summaries", "Open, route and close tickets, raise purchase orders with approval", "Write access to systems without a gate"],
            ["Marketing", "Detect ad performance decay and propose variants", "Closed-loop campaigns that shift budget to what converts", "Mass-produced bland copy that damages the brand"],
            ["Sales", "Fill CRM fields from call transcripts", "Draft technical follow-ups for the rep to approve", "Sending to clients without review"],
            ["Supply chain", "Flag a delay and list alternative suppliers", "Price the options and prepare a purchase order for sign-off", "Ordering autonomously on noisy signals"],
            ["Health care", "Bed assignment, scheduling, supply reorders", "Imaging triage, early-warning monitoring, care coordination", "Clinical decisions without a clinician"],
          ],
        },
        callout: {
          label: "Regulation",
          text: "The EU AI Act lists AI used for recruitment, selection and promotion as high-risk (Annex III). That means risk management, logging, human oversight, technical documentation and bias checks before use. Breaching these duties can cost up to €15 million or 3 % of worldwide turnover. Internal HR FAQs and scheduling stay low-risk: that is where an HR MVA belongs.",
        },
      },
      {
        heading: "Two surfaces every function shares",
        body: [
          "Product work: generative tools propose options (Nike's athlete-led shoe concepts, Tesla's component variants, L'Oréal's formulations, Crocs' customer-designed charms). Agentic systems close the loop: GM's generative design generates, scores and re-iterates parts against strength and weight goals; Hyperganic's system took a rocket engine from specification to a hot-fire test; IKEA's lab explored hundreds of concepts from its archive; Oracle's sales agents decide what to write, to whom and when.",
          "The browser: it is where most knowledge work happens. AI built into Edge, Brave, Arc or Chrome's developer tools summarises, compares and explains in place. It is also an exit door for data, a source of confident errors, and a reason to stop checking.",
        ],
        table: {
          head: ["Lifecycle stage", "What an agent can take on"],
          rows: [
            ["Ideation", "Scan trends, reviews and feedback to spot gaps"],
            ["Prototyping", "Generate, test and revise digital prototypes in loops"],
            ["Development and QA", "Write and review code, keep test suites up to date"],
            ["Launch and after", "Coordinate docs, deployment and compliance checks; watch usage and propose changes"],
          ],
        },
        callout: {
          label: "Getting ready",
          text: "Four shifts, none of them a rebuild: people trained to supervise agents, tools that connect models to your systems, processes where agent output has a slot (stand-ups, release planning), and managers who supervise collaboration instead of commanding every step.",
        },
      },
      {
        heading: "Who builds it: centralized, embedded or hybrid",
        body: [
          "A centralized model is one general assistant in Slack or Teams, owned by IT, routing questions to HR, legal or finance systems. An embedded model puts specialised agents inside each team's own tools (a finance agent in the spreadsheet, a design agent in Figma), owned by the function.",
          "On the team side, the same choice appears as a Center of Excellence (one central group builds and governs) versus a federated set-up (functions build, a central team sets the standards).",
        ],
        table: {
          head: ["", "Centralized / CoE", "Embedded / federated"],
          rows: [
            ["Scope", "Broad, general", "Narrow, domain-specific"],
            ["Owner", "IT or automation team", "The function"],
            ["Governance", "One place to control and audit", "Harder to keep consistent"],
            ["Fit to the work", "Generic, can miss brand or domain nuance", "Tuned to local data and tools"],
            ["Launch", "Fast, company-wide", "Set-up per department"],
            ["Cost", "Lower to start", "Higher to maintain"],
            ["Maturity", "Crawl: one assistant only", "Walk: first embedded pilots. Run: federated agents on shared infrastructure"],
          ],
        },
        callout: {
          label: "Field note",
          text: "Most companies end up hybrid: a central gateway for common requests, embedded specialists for deep work, and one shared rulebook. Sensitive data (patient records under HIPAA, for example) is safer behind the governed central layer. And when agents pass work to each other, use strict JSON schemas, versioned prompts and a log per step: a free-text hand-off breaks as soon as someone makes one prompt “more concise”.",
        },
      },
    ],
    takeaways: [
      "Know your maturity stage first: the right first agent depends on it.",
      "An MVA removes one bottleneck, keeps a person in the loop and moves one business number.",
      "Pick the team model on purpose: centralized to start and govern, embedded for depth, hybrid as you grow.",
    ],
    check: {
      prompt:
        "Your company is at stage 2: a few departmental bots, no shared governance. HR asks for a first agent and wants results within a quarter. Which one do you scope?",
      options: [
        { id: "a", text: "An agent that screens every CV and sends a ranked shortlist to managers" },
        { id: "b", text: "A leave and benefits agent grounded in the HRIS, with HR reviewing answers at first and tracking the override rate" },
        { id: "c", text: "A multi-agent onboarding system across HR, IT and finance, running without human review" },
        { id: "d", text: "Letting each recruiter choose a chat tool and see what sticks" },
      ],
      correct: "b",
      hints: {
        a: "Hiring is a high-risk use under the EU AI Act. It needs audits, documentation and oversight a stage 2 company does not have yet.",
        c: "Cross-functional orchestration is stage 4. Skipping two stages is how pilots stall.",
        d: "That is stage 1, shadow AI. It leaks data and teaches the company nothing.",
      },
      explanation:
        "Right. Frequent, low-risk questions, a real data source, a person in the loop and a health metric. It fits stage 2 and builds the governance habits that stage 3 will need.",
    },
    bubble: "Cap here. Today we ship something small that works.",
    xp: 20,
  },

  postMortem: {
    kicker: "Post-mortem · Samsung, 2023",
    title: "Stage 1 in the headlines: code pasted into a public chatbot",
    context:
      "In spring 2023 Samsung's semiconductor division let engineers use ChatGPT. Within weeks, staff had pasted confidential material into it: source code to fix a bug, code to optimise, and a meeting recording turned into minutes. In May, Samsung banned generative AI tools on company devices and networks while it built its own.",
    numbers: [
      { value: "3", label: "reported leaks in about three weeks" },
      { value: "1,024 bytes", label: "emergency cap on what staff could paste per prompt" },
      { value: "38 %", label: "of workers in a 2024 survey admit sharing sensitive data with AI tools" },
      { value: "52 %", label: "of workers never trained to use AI safely (same survey)" },
    ],
    timeline: [
      { label: "March 2023", text: "The chip division opens ChatGPT to staff, without an approved enterprise tool or clear rules on what may be shared." },
      { label: "Weeks later", text: "Three incidents surface. Data sent to a consumer chatbot sits on the provider's servers and may be kept or reused." },
      { label: "May 2023", text: "A memo bans generative AI on company devices and internal networks. Apple and JPMorgan restrict staff use for similar reasons." },
      { label: "After", text: "Samsung develops in-house AI tools. The ban buys time; it does not give engineers what they wanted the chatbot for." },
    ],
    lessons: [
      "Demand comes before the policy. If no approved tool exists, people find one: that is stage 1, whether you planned it or not.",
      "Treat any consumer AI tool in the browser as an outbound data channel until contracts and controls say otherwise.",
      "A ban is an emergency brake, not a strategy. The way out is a sanctioned tool, a clear policy, data loss prevention and training.",
      "The engineers had found real bottlenecks (debugging, code review, minutes). That list is the start of move 1 of the maturity cycle.",
    ],
    question: {
      prompt: "You are the CIO. You discover developers pasting internal code into a consumer chatbot. What do you do first?",
      options: [
        { id: "a", text: "Ban all generative AI for good" },
        { id: "b", text: "Provide an approved enterprise tool with no-training terms, publish a short policy, add data loss prevention and train the teams" },
        { id: "c", text: "Do nothing: productivity matters more" },
        { id: "d", text: "Freeze everything until a full autonomous agent platform is built" },
      ],
      correct: "b",
      hints: {
        a: "A permanent ban pushes use onto personal devices, where you see nothing. Useful as a brake, not as a plan.",
        c: "Leaked code and customer data are a legal and competitive risk. Governance is part of the ROI.",
        d: "That jumps from stage 1 to stage 4. Meanwhile the shadow use continues.",
      },
      explanation:
        "Yes. Give people a safe way to do what they were already doing, then watch what they use it for. Those uses are your first MVA candidates.",
    },
    sources: [
      "Park, K. (2023, May 2). Samsung bans use of generative AI tools like ChatGPT after April internal data leak. TechCrunch.",
      "Gurman, M. (2023, May 2). Samsung bans staff's AI use after spotting ChatGPT data leak. Bloomberg.",
      "National Cybersecurity Alliance & CybSafe. (2024). Oh, Behave! The annual cybersecurity attitudes and behaviors report 2024-2025.",
      "Vincent, J. (2023, May 19). Apple restricts employees from using ChatGPT over fear of data leaks. The Verge.",
      "Cerullo, M. (2023, February). JPMorgan Chase restricts staffers' use of ChatGPT. CBS News.",
    ],
    bubble: "A big name, a stage 1 mistake. Let's learn from it.",
    xp: 20,
  },

  lab: {
    kicker: "Lab · Scope your MVA",
    title: "Find the one bottleneck worth automating first",
    goal: "Break your candidate workflow into tasks, score them on value, effort, risk and readiness, pick one MVA, cut its scope, then get a design critique from a chat assistant.",
    duration: "40 minutes",
    prerequisites: [
      "Python 3.10 or later",
      "Your loop map (level 1) and cost estimate (level 2)",
      "Any chat assistant",
    ],
    steps: [
      {
        title: "List the tasks",
        body: [
          "From your loop map, write down four to eight tasks that make up the workflow. For each: minutes per occurrence, occurrences per week, build effort (1 to 5), harm if wrong (1 to 5), whether you already track a number for it, and whether its input data is clean and reachable.",
          "Flag any task that decides on hiring, promotion or credit: those are high-risk uses and never an MVA.",
        ],
      },
      {
        title: "Score them",
        body: [
          "Save this as mva_scorer.py and replace the example tasks and hourly cost with yours. The score is monthly value, halved for each missing piece of readiness, divided by effort times risk.",
        ],
        code: {
          lang: "python",
          text: `# mva_scorer.py: rank the tasks of one workflow and pick a Minimum Viable Agent.
from dataclasses import dataclass

@dataclass
class Task:
    name: str
    minutes: float      # human time per occurrence today
    per_week: int       # occurrences per week
    effort: int         # 1 (a few days) to 5 (several months) to build
    risk: int           # 1 (harmless) to 5 (legal, money or safety harm)
    kpi_clear: bool     # do you already track a number for it?
    data_ready: bool    # inputs are clean and reachable (API, export)
    high_risk_use: bool = False  # e.g. hiring, promotion, credit decisions

# Replace with the tasks of your own workflow (from your loop map).
TASKS = [
    Task("Answer leave and benefits questions", 6, 150, 2, 2, True, True),
    Task("Screen CVs into a shortlist", 10, 200, 3, 5, True, True, high_risk_use=True),
    Task("Schedule onboarding sessions", 15, 20, 2, 1, True, True),
    Task("Collect and check new-hire documents", 8, 20, 3, 3, True, False),
]
HOURLY_COST = 40  # loaded cost per hour of the person doing the task today

def hours_per_month(t: Task) -> float:
    return t.minutes * t.per_week * 52 / 12 / 60

def score(t: Task) -> float:
    value = hours_per_month(t) * HOURLY_COST
    readiness = (1.0 if t.kpi_clear else 0.5) * (1.0 if t.data_ready else 0.5)
    return value * readiness / (t.effort * t.risk)

print(f"{'Task':40} {'h/month':>8} {'score':>7}")
for t in sorted(TASKS, key=score, reverse=True):
    flag = "  <- high-risk use, not an MVA" if t.high_risk_use else ""
    print(f"{t.name:40} {hours_per_month(t):8.1f} {score(t):7.0f}{flag}")

eligible = [t for t in TASKS if not t.high_risk_use and t.risk <= 3]
best = max(eligible, key=score)
saved = hours_per_month(best)
print(f"\\nMVA candidate: {best.name}")
print(f"Ceiling: about {saved:.0f} hours (\${saved * HOURLY_COST:,.0f}) a month if fully automated.")
print("Start with a person approving every output, and track the override rate.")`,
        },
      },
      {
        title: "Run it and challenge the result",
        body: [
          "With the example data, leave and benefits questions win. CV screening saves the most hours but is flagged and excluded.",
          "Now argue with your own ranking. Is the winner a single task of a few minutes, or a whole process in disguise? Compare the monthly ceiling with your level 2 cost estimate: if running the agent costs more than the hours it saves, the winner is not the winner.",
        ],
        code: { lang: "shell", text: "python mva_scorer.py" },
      },
      {
        title: "Cut the scope",
        body: [
          "Write three short lists for the winning task. In scope: the exact inputs, the one action, the systems it reads and writes. Out of scope: everything else, named explicitly. Human gate: who approves what, and the override rate (say 20 %) above which you stop and fix the data or the task.",
          "Then pick the team model: centralized assistant, embedded in the team's tool, or hybrid. Write one reason and one risk.",
        ],
      },
      {
        title: "Get a design critique",
        body: [
          "Paste your scope into a chat assistant with this prompt. Fix what holds up; write down what you reject and why.",
        ],
        code: {
          lang: "prompt",
          text: `You are a sceptical AI programme lead reviewing a Minimum Viable Agent.
Here is my scope:
[paste: task, inputs, action, systems, out of scope, human gate,
team model, success metric, maturity stage of my company]

Critique it on six points, two sentences each, and end with the
single change you would make first:
1. Is it one bottleneck, or a whole process in disguise?
2. Does it fit the maturity stage I stated, or skip stages?
3. Is the success metric tied to revenue or cost, with a baseline?
4. Is any part a high-risk use (hiring, credit, health, profiling)?
5. Are hand-offs to people or other agents structured, not free text?
6. Is the team model (centralized, embedded, hybrid) justified?`,
        },
      },
    ],
    checklist: [
      "I scored at least four real tasks from my workflow",
      "High-risk uses are flagged and kept out of the MVA",
      "My MVA's monthly ceiling is compared with my level 2 cost estimate",
      "Scope in, scope out and the human gate are written down",
      "I applied or explicitly rejected each point of the critique",
    ],
    bubble: "Small scope, sharp metric. Let's find your bottleneck.",
    xp: 30,
  },

  deliverable: {
    kicker: "Deliverable · MVA one-pager",
    title: "One page to get your first agent approved",
    purpose:
      "A one-page brief for the Minimum Viable Agent you scoped in the lab. It pulls together your earlier work (candidate card, loop map, cost estimate, architecture, integration map, security memo, guardrails, eval plan) and becomes the scope and scaling section of your capstone adoption plan.",
    fileName: "mva-one-pager.md",
    template: `# Minimum Viable Agent: one-pager

Workflow (from the candidate card):
Author:
Date:

## 1. Context
- Industry, organisation type, department:
- Current workflow, in three to five steps (from the loop map):
- Baseline today (time per task, volume per week, error rate):

## 2. The bottleneck
- The one task the MVA takes on:
- Why this one (score from the lab, and the runner-up):

## 3. Maturity stage
- Our stage (1 ad-hoc to 5 reinvented) and the evidence:
- Shadow AI in this team today, and how we bring it into the open:
- Crawl, walk or run for this MVA:

## 4. Function and risk class
- Function:
- High-risk use (hiring, credit, health, profiling)? If yes, why this is still out of scope:

## 5. Scope
| In scope | Out of scope |
|---|---|
| | |

- Inputs and data sources:
- Systems read / written (from the integration map):
- Model tier and platform (low-code or custom code, from the architecture):
- Human gate: who approves what:
- Hand-offs to other agents or people use this format:

## 6. Team model
- Centralized / CoE, embedded / federated, or hybrid:
- Business owner:            Technical owner:
- Early advocates in the team:
- External partner (consultant, vendor), if any, and their role:

## 7. Success metric
- Business number it moves (revenue up or cost down), with baseline and target:
- Override rate threshold that triggers a fix:
- Quality check (from the eval plan):
- Security and guardrail controls in place (from the memo and guardrails):

## 8. 30 / 60 / 90 days
| By day | Milestone | Decision point |
|---|---|---|
| 30 | Running on real data, every output reviewed | Override rate under threshold? |
| 60 | | |
| 90 | | Scale, adjust or stop |
`,
    checklist: [
      "The MVA covers one task, not a whole process",
      "The maturity stage is backed by evidence, and the MVA does not skip stages",
      "Scope out and the human gate are as explicit as scope in",
      "The success metric has a baseline, a target and an override threshold",
      "The team model and both owners are named",
    ],
    bubble: "One page, one bottleneck, one number. Ship it.",
    xp: 30,
  },
};
