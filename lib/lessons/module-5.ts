import type { LessonContent } from "../lessons";

// Module 5 · Agents at work. Source: MIT module 5 (sections 1 to 7, assignment 5.1, forums 5.1 and 5.2) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_5: LessonContent = {
  reading: {
    kicker: "Concept · Maturity, business functions, Minimum Viable Agent",
    title: "Ship one small agent that works, not a big one that might",
    intro:
      "Most first agents stall for organisational reasons, not technical ones: the company was not ready, the scope was too wide, or nobody owned the result. This module gives you a map of where your organisation stands, a tour of where agents already earn their keep, a choice of architecture, and one discipline to start with: the Minimum Viable Agent.",
    sections: [
      {
        heading: "The maturity cycle: five moves, in order",
        body: [
          "Inspired by OpenAI's work on finding and scaling use cases, Dr. Sanchez frames adoption as a five-stage cycle. Each move prepares the next one. Skip one and it comes back later as resistance, risk or a pilot nobody uses.",
        ],
        table: {
          head: ["Move", "What you do", "What you get out of it"],
          rows: [
            ["1 · Identify opportunities", "Find repetitive tasks and recurring bottlenecks, then split them into small steps (pick target accounts, enrich profiles, draft outreach).", "A shortlist, and sponsors who have seen a concrete benefit"],
            ["2 · Teach the fundamentals", "Train people to prompt, read outputs critically and expect the usual limits. Publish governance rules, an approved tool set and ethical guardrails.", "Shared vocabulary, fewer unsanctioned tools"],
            ["3 · Map workflows", "Draw the current process step by step (a LinkedIn recruiting flow, a podcast production line), mark where agents could help, prototype, then score each idea on effort, value and risk.", "A ranked list of prototypes"],
            ["4 · Enable and resource", "Give the winners a cross-functional team, secure platforms, data pipelines, standard APIs and a dashboard for time saved, error rates and throughput.", "A pilot running on real systems, measured"],
            ["5 · Scale and share success", "Fold what works into standard procedures. Publish the case study: architecture, method, governance, numbers. Grow AI champions and communities of practice.", "Reuse across teams, and the next round of opportunities"],
          ],
        },
        callout: {
          label: "Watch out: shadow AI",
          text: "When approved tools lag behind demand, people bring their own, without IT or security knowing. In a survey of 7,000 people across seven countries, 38 % admitted sharing sensitive work data with AI tools without permission (46 % among Gen Z), and 52 % had never been trained to use AI safely. The answer has three legs: policy (sanctioned tools, usage rules, audits, a Center of Excellence), technology (data loss prevention, traffic filtering, role-based access, log review, safe sandboxes) and culture (ongoing training, safe experimentation, leaders who set the example).",
        },
      },
      {
        heading: "Where you really stand",
        body: [
          "The cycle says what to do next. A maturity ladder says how far you have got. In office hours, the faculty argued that most stalled AI programmes stall because leaders misread their own stage. Be honest here: the right first agent depends on the stage, not on ambition.",
        ],
        table: {
          head: ["Stage", "What it looks like", "Signal or risk"],
          rows: [
            ["1 · Ad-hoc experimentation", "Individuals draft emails and code in consumer chatbots on their own", "IP and customer data leaking into public models; nothing learned centrally"],
            ["2 · Tactical task automation", "Departments buy isolated point solutions (a help desk bot, a summariser)", "Local gains, but tool sprawl and data silos"],
            ["3 · Strategic function integration", "Agents sit on the core systems (CRM, ERP, HRIS) with KPIs, deterministic guardrails and role-based permissions", "Agents now touch systems of record, so guardrails and permissions must hold"],
            ["4 · Autonomous operations", "Multi-agent workflows run across departments without manual hand-offs; people handle exceptions", "Failures that cascade from one agent to the next"],
            ["5 · Adaptive reinvention", "Business models, pricing and customer experience are built around agentic workflows", "Company margins and operating leverage are reshaped"],
          ],
        },
        bullets: [
          "Crawl: small pilots on routine work (data entry, invoices, reports), data clean-up, executive briefings, first governance drafts.",
          "Walk: supervised agents that recommend while a person decides (next best action, assisted customer chat), stronger pipelines, business and tech teams working together.",
          "Run: autonomous agents (anomaly detection with corrective action, personalisation at scale) overseen by a Center of Excellence that tracks ROI against KPIs. Module 6 turns this into a pilot-to-practice plan.",
        ],
      },
      {
        heading: "Agents in the product development lifecycle",
        body: [
          "Most products, from a VR headset to a toothbrush holder, go through the same phases: ideation and requirements, design, prototyping, development, testing and QA, launch, post-launch iteration. Each one is a place where AI can step in.",
          "Generative AI proposes options under human direction: Nike's A.I.R. project iterates footwear concepts from athlete data, L'Oréal built a formulation model with IBM, Tesla explores thousands of component variants against aerodynamic and weight constraints, Crocs and ABLO let customers design their own Jibbitz charms. Agentic AI closes the loop: GM's generative design work with Autodesk generates, scores and re-iterates parts on its own; Hyperganic's system went from specification to a hot-fire-tested aerospike engine; IKEA's SPACE10 lab explored hundreds of concepts from decades of catalogues; Oracle's sales agents decide what to write, why and when. Information is a product too.",
        ],
        table: {
          head: ["Lifecycle stage", "What an agent can take on"],
          rows: [
            ["Ideation", "Scan trends, behaviour and feedback to find gaps in the market"],
            ["Prototyping", "Generate, test and revise digital prototypes in loops, often on simulated users"],
            ["Development", "Several agents write code, review each other and manage versions"],
            ["QA", "Build and run test suites, adapt them as the product changes"],
            ["Launch", "Coordinate documentation, deployment pipelines and compliance checks"],
            ["Post-launch", "Watch usage, propose iterations, trigger a redesign"],
          ],
        },
        callout: {
          label: "Getting ready",
          text: "Four shifts, none of them a rebuild. People: train designers, developers and managers to prompt, supervise and calibrate trust. Tools: platforms that connect models to APIs, data and task systems. Processes: give agent output a slot in stand-ups and release planning. Mindset: from command-and-control to collaborative supervision. The payoff is speed, cost, parallel experiments and consistent quality, with people moving towards judgement and strategy.",
        },
      },
      {
        heading: "Agents by business function",
        body: [
          "A functional agent is built for one domain: its workflows, its systems, its rules. That is what separates it from a general assistant. Vendors and analysts report big numbers (up to 70 % fewer manual HR tasks, a 12 % cut in financial processing time with 22 % more satisfied staff, Gartner's up to 80 % of routine IT issues automated). Read them as orders of magnitude, not promises.",
        ],
        table: {
          head: ["Function", "Where it already works", "Higher-value pattern", "Trap"],
          rows: [
            ["HR", "Leave and benefits answers pulled live from Workday or SAP SuccessFactors; onboarding (Palo Alto Networks' FLEXWORK)", "End-to-end onboarding: documents, access, training", "Autonomous CV filtering, interview scoring or performance scoring: high-risk under the EU AI Act"],
            ["Finance", "KYC document collection and checks; research retrieval for advisers (Morgan Stanley)", "RAG on transaction history for real-time advice", "Advice without an audit trail in a regulated setting"],
            ["IT", "Password resets, access requests, ticket summaries in Teams", "Open, route and close tickets, raise purchase orders with manager approval (Copilot Studio)", "Write access to systems without a gate"],
            ["Marketing", "Drafting and translation inside existing tools", "Detect ad decay, generate variants, shift budget to what converts", "Floods of bland copy that erode the brand"],
            ["Sales", "Pull objections and competitor mentions from call transcripts into the CRM", "Draft technical follow-ups for the rep to approve", "Sending to clients without review"],
            ["Supply chain", "Spot a weather-induced delay", "Query back-up suppliers, compare freight cost with downtime, prepare a PO for sign-off", "Ordering on noisy signals with no human gate"],
          ],
        },
        callout: {
          label: "Regulation",
          text: "Under the EU AI Act (Annex III), AI used for recruitment, hiring and promotion is high-risk: bias audits, logged human oversight, technical documentation and explainability come first, and the Act's fines reach up to €35 million or 7 % of global turnover. Internal HR FAQs, policy navigation and onboarding scheduling stay low-risk. That is where an HR first agent belongs. Module 7 goes deeper.",
        },
      },
      {
        heading: "Health care: the hard case",
        body: [
          "Dr. Sanchez picks medicine on purpose: if expertise can be democratised there, it can be anywhere. In a controlled benchmark, Microsoft's diagnostic orchestrator (MAI-DxO), which emulates a panel of physicians, solved 85.5 % of hard cases against about 20 % for doctors, at lower cost. In another study, doctors using ChatGPT did only slightly better than doctors without it, while the chatbot alone beat them all. The bottleneck was how people used the tool, not the tool.",
        ],
        bullets: [
          "Clinical decision support: agents reason step by step, ask for more data, and flag problems early (Duke's Sepsis Watch tracks hundreds of vital-sign variables).",
          "Imaging: Aidoc screens every emergency CT for bleeds and clots; RadNet pre-screens mammograms so radiologists see the suspicious ones.",
          "Personalised care: oncology agents and virtual tumour boards gather imaging, pathology and trials. In one pilot an agent booked an urgent MRI while another checked the patient's pacemaker model for safety.",
          "Operations: Epic's bed management agent assigns beds from admissions, discharges, team location and infection control; others forecast surges and reorder supplies.",
        ],
      },
      {
        heading: "The browser: every function's workplace, and exit door",
        body: [
          "Most knowledge work happens in a browser, often with six to ten tabs open. AI is moving into it: Edge's Copilot summarises and compares tabs and can help book things, Arc summarises with a pinch, Brave's Leo works privacy-first, Chrome DevTools explains a console error in one click. HR compares profiles, finance digests filings, marketing drafts in place.",
          "The same convenience carries three risks. Data leakage: anything pasted into a consumer tool may leave the company. Misinformation: early in 2024 the EU threatened Microsoft with fines over 2 billion USD over content generated by its search engine. Overreliance: a lawyer filed a brief against Avianca built on bogus cases ChatGPT had invented, and Google's AI Overviews has given the wrong year. The way in mirrors earlier digital shifts: policy first, pilots with chosen teams, IT-approved extensions and assistants, then training and scale.",
        ],
      },
      {
        heading: "Centralized, embedded or hybrid",
        body: [
          "Picture a clothing brand. Version one: every store sells from one central catalogue, consistent and easy to run. Version two: each store buys locally and fits regional tastes. Agents work the same way. A centralized assistant (think AskNova, answering PTO questions and summarising a 27-page contract inside Slack) gives one interface and simple governance. Embedded agents live inside each team's tools (Excel, Figma, the project tracker) and know their domain: a consumer goods marketing team replaced a bland general assistant with one trained on past campaigns and brand rules.",
        ],
        table: {
          head: ["", "Centralized", "Embedded"],
          rows: [
            ["Lives in", "Slack, Teams", "Departmental tools"],
            ["Scope", "Broad, general", "Narrow, domain-specific"],
            ["Owner", "IT or automation team", "The function"],
            ["Governance", "Easy to control and audit", "Harder to standardise"],
            ["Fit to the work", "Slow to adapt to specialist tasks", "Tuned to local data and tools"],
            ["Launch and cost", "Fast, cheaper to start", "Set-up per department, higher upkeep"],
            ["Maturity", "Crawl: one assistant for all", "Walk: first embedded pilots. Run: federated agents on shared orchestration, central standards"],
          ],
        },
        callout: {
          label: "Field note",
          text: "Most organisations end up hybrid: a central generalist that routes deep work to embedded specialists, under one shared rulebook. Sensitive data is the tie-breaker. An agent embedded in a US patient intake or billing system that touches protected health information without encryption, access logs and business associate agreements is a HIPAA liability; routing that data through a governed central layer lowers the risk. On the team side, the same choice is a Center of Excellence for infrastructure and guardrails versus functional teams owning their prompts and workflows.",
        },
      },
      {
        heading: "Consultants and outsourcing: the canary",
        body: [
          "Business process outsourcing (BPO) hands non-core work (support, HR, finance, research) to providers such as Accenture, TCS, Cognizant, Infosys or Wipro. It is a market of over 300 billion USD, projected to pass 500 billion by 2030. It existed because classic software could not read messy documents or use judgement. Agents can: they process unstructured data, connect to several systems and act. Voice agents and browser-use (operator) agents are the spearheads.",
          "Two consequences for you. First, start where KPIs are already clear (ticket volume, satisfaction): ROI is easy to show there and much harder in fuzzy areas like employee experience. Work whose cost grows with volume, like invoices with sales, is where agents flatten the curve. Second, building got cheap: researchers trained reasoning models for about 450 USD, or under 50 USD of cloud credits, and Hugging Face rebuilt a deep research agent within 24 hours. Meanwhile KPMG, PwC, Deloitte and EY each announced a billion dollars or more for AI, cloud, audit technology or training. Consultants are useful partners, and vendors with an interest.",
        ],
      },
      {
        heading: "The Minimum Viable Agent",
        body: [
          "A Minimum Viable Agent (MVA) is the smallest agent that removes one real bottleneck and proves it with a number. The idea comes from the Toyota Production System, Kaizen and Lean Startup: cut the cost of learning, then improve in small steps. Do not spend six months on an all-in-one multi-agent system.",
        ],
        bullets: [
          "One task, short and repetitive (think five minutes, many times a week), not a whole process.",
          "A person validates every output at first. Autonomy is earned.",
          "Value = more revenue + less cost. If you cannot say which one the agent moves, stop.",
          "Track the override rate. Above about one output in five, the input data is dirty or the task is too ambiguous for the model tier.",
          "Governance is part of ROI: ten hours saved a week do not offset an unchecked data breach.",
          "Start with early advocates. A team that fears for its jobs may feed the agent bad data to prove it fails.",
          "Be operational: exact inputs, states, tool calls and oversight gates, not “AI will help marketing”.",
        ],
      },
      {
        heading: "When agents talk to agents",
        body: [
          "Once an MVA works, the temptation is to chain it: research, then analysis, then drafting, then compliance. Faculty call the failure mode prompt coupling fragility. In one six-agent research pipeline, asking the first agent for “more concise” summaries broke the third one, which relied on phrases that had disappeared.",
        ],
        bullets: [
          "Hand-offs between agents use strict schemas (JSON, Pydantic models), never free prose.",
          "Right-size the model per step: small models for parsing and formatting, mid-tier for synthesis, frontier models only for the few steps that resolve ambiguity.",
          "Every step writes an immutable state record (evidence, token use) so a failure can be replayed exactly.",
          "Prompts, schemas and routing live in versioned config files with regression tests, not hard-coded in the app.",
        ],
      },
    ],
    takeaways: [
      "Know your maturity stage first: the right first agent depends on it, and shadow AI tells you demand already exists.",
      "Functional agents beat general ones in depth; regulated uses like hiring are not a place to start.",
      "Pick the architecture on purpose: centralized to start and govern, embedded for depth, hybrid as you grow.",
      "An MVA takes one task, keeps a person in the loop, moves one business number and watches its override rate.",
    ],
    check: {
      prompt:
        "Your company is at stage 2: a few departmental bots, no shared governance. HR wants a first agent with results within a quarter. Which one do you scope?",
      options: [
        { id: "a", text: "An agent that screens every CV and sends a ranked shortlist to hiring managers" },
        { id: "b", text: "A leave and benefits agent grounded in the HRIS, with HR reviewing answers at first and tracking the override rate" },
        { id: "c", text: "A multi-agent onboarding system across HR, IT and finance, running without human review" },
        { id: "d", text: "Let each recruiter pick their own chat tool and see what sticks" },
      ],
      correct: "b",
      hints: {
        a: "Recruitment is a high-risk use under Annex III of the EU AI Act. It needs bias audits, documentation and logged oversight that a stage 2 company does not have yet.",
        c: "Cross-functional orchestration with no manual hand-offs is stage 4. Skipping two stages is how pilots stall.",
        d: "That is stage 1, shadow AI: data leaks out and the company learns nothing.",
      },
      explanation:
        "Right. Frequent, low-risk questions, a real data source, a person in the loop and a health metric. It fits stage 2 and builds the governance habits stage 3 will need.",
    },
    bubble: "Cap on. Today we ship something small that works.",
  },

  postMortem: {
    kicker: "Post-mortem · Samsung, 2023",
    title: "Stage 1 in the headlines: confidential code in a public chatbot",
    context:
      "In 2023, Samsung staff uploaded confidential source code to a consumer generative AI tool. The company responded with a temporary ban on such tools, citing the risk that the data could be retained and reused outside the company. It was not alone: Apple reportedly restricted staff use of external AI tools over confidentiality, and JPMorgan barred employee access to ChatGPT pending policy and privacy reviews. None of this needed a sophisticated attack. It was ordinary people using a convenient tool, in a browser, with nothing better on offer.",
    numbers: [
      { value: "3", label: "major firms that restricted staff use of public AI tools in 2023 (Samsung, Apple, JPMorgan)" },
      { value: "38 %", label: "of employees surveyed admitted sharing sensitive work data with AI tools without permission" },
      { value: "46 %", label: "the same figure among Gen Z (43 % among Millennials)" },
      { value: "52 %", label: "of employees had received no training on using AI safely" },
    ],
    timeline: [
      { label: "Before", text: "Easy, powerful AI tools reach every employee, often without IT or security knowing. Demand runs ahead of any approved option." },
      { label: "2023 · Samsung", text: "Staff paste confidential code into a public chatbot. Samsung temporarily bans generative AI tools, pointing to external retention and reuse of the data." },
      { label: "2023 · Others follow", text: "Apple restricts external AI tools for staff; JPMorgan blocks ChatGPT until its policy and privacy reviews are done." },
      { label: "2024 · The pattern", text: "A survey of 7,000 people in the US, UK, Canada, Germany, Australia, India and New Zealand shows the behaviour is widespread, and mostly untrained." },
    ],
    lessons: [
      "Demand comes before policy. If no approved tool exists, people find one: that is stage 1, planned or not.",
      "Treat any consumer AI tool in the browser as an outbound data channel until guardrails say otherwise.",
      "A ban is an emergency brake, not a strategy. The way out is policy, technology and culture together: sanctioned enterprise tools, data loss prevention and log review, training and safe sandboxes.",
      "What staff were pasting in shows real bottlenecks (debugging, reviewing code). That list is move 1 of the maturity cycle, handed to you for free.",
    ],
    question: {
      prompt: "You are the CIO. You discover developers pasting internal code into a consumer chatbot. What do you do first?",
      options: [
        { id: "a", text: "Ban all generative AI tools permanently" },
        { id: "b", text: "Offer an approved enterprise-grade tool, publish a short usage policy, add data loss prevention and train the teams" },
        { id: "c", text: "Leave it alone: the productivity gain is worth the risk" },
        { id: "d", text: "Freeze all AI use until a fully autonomous agent platform is built" },
      ],
      correct: "b",
      hints: {
        a: "Samsung's ban was temporary for a reason: a permanent one pushes use onto personal devices where you see nothing. Use it as a brake, not a plan.",
        c: "Leaked code and customer data are a legal, security and reputational risk. An agent that saves time but leaks data has negative value.",
        d: "That jumps from stage 1 to stage 4, and the shadow use carries on in the meantime.",
      },
      explanation:
        "Yes. Easy access to a sanctioned tool removes the reason to go around IT, and the policy, controls and training make it safe. Then watch what people use it for: those are your first MVA candidates.",
    },
    sources: [
      "MIT Applied Agentic AI, Module 5, section 5 (Agentic AI in browsers: risks and limitations), citing Park (2023) on Samsung, Vincent (2023) on Apple and Cerullo (2023) on JPMorgan.",
      "National Cybersecurity Alliance & CybSafe (2024), as cited in MIT Applied Agentic AI, Module 5, section 1 (Shadow AI).",
      "Dobrontei, S., Nurse, J., Plaggemier, L., & Alashe, O. (2025, September 30). Oh, behave! The annual cybersecurity attitudes and behaviors report 2025-2026. CybSafe.",
      "Krantz, T., Jonker, A., & McGrath, A. (2024, October 25). Shadow AI. IBM.",
    ],
    bubble: "A big name, a stage 1 mistake. Let's learn from it.",
  },

  lab: {
    kicker: "Lab · Scope your Minimum Viable Agent",
    title: "Find the one bottleneck worth automating first",
    goal: "Map your candidate workflow into tasks, score them on value, effort and risk, pick one Minimum Viable Agent, write its design plan in the shape of MIT assignment 5.1, and prepare the override log you will use during the pilot.",
    duration: "45 minutes",
    prerequisites: [
      "Python 3.10 or later",
      "Your candidate workflow and its cost figures (module 1)",
      "The systems you mapped in module 3 and your security memo (module 4)",
      "Any chat assistant",
    ],
    steps: [
      {
        title: "Map the workflow into tasks",
        body: [
          "This is move 3 of the maturity cycle. Write down four to eight tasks that make up your candidate workflow. For each: minutes per occurrence, occurrences per week, build effort (1 to 5), harm if it goes wrong (1 to 5), whether you already track a number for it, and whether its input data is clean and reachable.",
          "Flag any task that decides on hiring, promotion, credit or customer profiling. Those are high-risk uses and never an MVA.",
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
    data_clean: bool    # inputs are clean and reachable (API, export)
    high_risk_use: bool = False  # hiring, promotion, credit, profiling

# Replace with the tasks of your own candidate workflow.
TASKS = [
    Task("Answer leave and benefits questions", 5, 150, 2, 2, True, True),
    Task("Screen CVs into a shortlist", 10, 200, 3, 5, True, True, high_risk_use=True),
    Task("Schedule onboarding sessions", 15, 20, 2, 1, True, True),
    Task("Collect and check new-hire documents", 8, 20, 3, 3, True, False),
    Task("Prepare the full onboarding plan per hire", 90, 5, 4, 2, False, False),
]
HOURLY_COST = 40  # loaded cost per hour of the person doing the task today

def hours_per_month(t: Task) -> float:
    return t.minutes * t.per_week * 52 / 12 / 60

def score(t: Task) -> float:
    value = hours_per_month(t) * HOURLY_COST
    readiness = (1.0 if t.kpi_clear else 0.5) * (1.0 if t.data_clean else 0.5)
    return value * readiness / (t.effort * t.risk)

print(f"{'Task':44} {'h/month':>8} {'score':>7}")
for t in sorted(TASKS, key=score, reverse=True):
    flags = []
    if t.high_risk_use:
        flags.append("high-risk use, not an MVA")
    if t.minutes > 30:
        flags.append("long: one task or a whole process?")
    note = f"  <- {'; '.join(flags)}" if flags else ""
    print(f"{t.name:44} {hours_per_month(t):8.1f} {score(t):7.0f}{note}")

eligible = [t for t in TASKS if not t.high_risk_use and t.risk <= 3]
best = max(eligible, key=score)
saved = hours_per_month(best)
print(f"\\nMVA candidate: {best.name}")
print(f"Ceiling: about {saved:.0f} hours, or {saved * HOURLY_COST:,.0f} in labour, a month if fully automated.")
print("Start with a person approving every output, and track the override rate.")`,
        },
      },
      {
        title: "Run it and argue with the result",
        body: [
          "With the example data, leave and benefits questions win. CV screening saves many hours but is flagged and excluded, and the 90-minute onboarding plan is flagged as a process in disguise.",
          "Now challenge your own ranking. Is the winner one short task, or a process? Compare its monthly ceiling with the cost figures from module 1: if running the agent costs more than the hours it saves, it is not the winner. Is the value revenue or cost? If neither, drop it.",
        ],
        code: { lang: "shell", text: "python mva_scorer.py" },
      },
      {
        title: "Write the design plan",
        body: [
          "MIT assignment 5.1 asks for a 200 to 300 word plan in three parts. Context: industry, organisation type, department. Current workflow: the process today, in concrete steps, as a baseline. AI integration: one specific technology and how it improves efficiency, effectiveness or quality.",
          "The faculty's warning: “an agent will help HR answer questions” scores zero. Name the data sources (the policy wiki, the HRIS leave rules), the platform (low-code or custom code, from module 2), a measurable KPI with a deadline, and what the agent may not do alone (it drafts, a named person signs off).",
        ],
      },
      {
        title: "Pick the architecture",
        body: [
          "Centralized assistant, agent embedded in the team's own tool, or hybrid? Write one reason (governance, speed, specialisation) and one risk to manage. If the task touches personal or regulated data, say how it stays behind a governed layer, using your module 4 security memo.",
        ],
      },
      {
        title: "Prepare the override log",
        body: [
          "During the pilot, every reviewed output gets one line in reviews.csv with the columns date, item, verdict (approved, edited or rejected) and reason. This script gives you the weekly health check. Try it with a few made-up lines first.",
        ],
        code: {
          lang: "python",
          text: `# override_rate.py: weekly health check for a Minimum Viable Agent in pilot.
# Usage: python override_rate.py reviews.csv
import csv
import sys
from collections import Counter

THRESHOLD = 0.20  # above this, fix the input data or narrow the task
VERDICTS = {"approved", "edited", "rejected"}

def main(path: str) -> None:
    with open(path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    verdicts = Counter()
    reasons = Counter()
    for i, row in enumerate(rows, start=2):
        verdict = (row.get("verdict") or "").strip().lower()
        if verdict not in VERDICTS:
            print(f"line {i}: unknown verdict {verdict!r}, skipped")
            continue
        verdicts[verdict] += 1
        if verdict != "approved":
            reasons[(row.get("reason") or "no reason given").strip()] += 1
    total = sum(verdicts.values())
    if total == 0:
        print("No valid reviews yet.")
        return
    rate = (verdicts["edited"] + verdicts["rejected"]) / total
    print(f"{total} reviews, override rate {rate:.0%} (threshold {THRESHOLD:.0%})")
    for reason, n in reasons.most_common(3):
        print(f"  {n} x {reason}")
    if rate > THRESHOLD:
        print("Above threshold: clean the inputs or narrow the task before adding autonomy.")
    else:
        print("Within threshold: keep reviewing, and plan the next step of autonomy.")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "reviews.csv")`,
        },
      },
      {
        title: "Get a design critique",
        body: [
          "Paste your plan and scope into a chat assistant with this prompt. Apply what holds up; write down what you reject and why.",
        ],
        code: {
          lang: "prompt",
          text: `You are a sceptical AI programme lead reviewing a Minimum Viable Agent.
Here is my plan:
[paste: context, current workflow, AI technology, task, inputs, systems,
out of scope, human gate, architecture, KPI, maturity stage]

Critique it on six points, two sentences each, then name the single
change you would make first:
1. Is it one bottleneck, or a whole process in disguise?
2. Does it fit the maturity stage I stated, or skip stages?
3. Is the KPI tied to revenue or cost, with a baseline and a deadline?
4. Is any part a high-risk use (hiring, credit, health, profiling)?
5. Are hand-offs to people or other agents structured, not free text?
6. Is the architecture (centralized, embedded, hybrid) justified?`,
        },
      },
    ],
    checklist: [
      "I scored at least four real tasks from my candidate workflow",
      "High-risk uses and processes in disguise are flagged and kept out of the MVA",
      "The MVA's monthly ceiling is compared with my module 1 cost figures",
      "My design plan names data sources, platform, KPI and the human gate",
      "I chose an architecture with one reason and one risk",
      "The override log runs and I applied or rejected each point of the critique",
    ],
    bubble: "Small scope, sharp metric. Let's find your bottleneck.",
  },

  deliverable: {
    kicker: "Deliverable · Design plan and MVA scope",
    title: "One page to get your first agent approved",
    purpose:
      "A one-page plan for the Minimum Viable Agent you scoped in the lab, built on the structure of MIT assignment 5.1 (context, current workflow, AI integration). It reuses your candidate workflow and costs (module 1), platform choice (module 2), integrations (module 3) and security memo (module 4). In the module 8 capstone it feeds the context and functional domain, change management and scaling architecture sections.",
    fileName: "mva-design-plan.md",
    template: `# AI and the design process: Minimum Viable Agent plan

Candidate workflow (module 1):
Author:
Date:

## 1. Context
- Industry:
- Organisation type (size, public or private, regulated or not):
- Department:

## 2. Current workflow (baseline)
- Steps today, in three to seven lines (who does what, in which tool):
- Time per occurrence, volume per week, error or rework rate:
- Where it hurts (the bottleneck):

## 3. Maturity
- Our stage (1 ad-hoc to 5 adaptive reinvention), with the evidence:
- Shadow AI in this team today, and how we bring it into the open:
- Crawl, walk or run for this MVA:

## 4. AI integration
- The specific AI technology (generative or agentic, model tier, platform: low-code or custom code):
- Why it fits this task:
- What improves, before and after:
  - Efficiency:
  - Effectiveness:
  - Quality:

## 5. The Minimum Viable Agent
- The one task it takes on (score from the lab, and the runner-up):

| In scope | Out of scope |
|---|---|
| | |

- Data sources it reads:
- Systems it reads or writes (from module 3):
- What it may never do alone, and who signs off:
- Hand-off format to people or other agents (schema, not free text):

## 6. Risk class
- Function:
- High-risk use (hiring, promotion, credit, profiling)? If yes, why it stays out of scope:
- Data exposure and controls (from the module 4 security memo):

## 7. Architecture and people
- Centralized, embedded or hybrid, with one reason and one risk:
- Business owner:            Technical owner:
- Early advocates in the team:
- External partner (consultant, vendor), if any, and their role:

## 8. Value and measures
- Value equation: revenue expansion or cost reduction, and how much:
- KPI, baseline, target and deadline (for example, Tier-1 tickets down X % within 90 days):
- Override rate threshold that stops the rollout:
- Governance cost counted in the ROI:

## 9. 30 / 60 / 90 days
| By day | Milestone | Decision point |
|---|---|---|
| 30 | Running on real data, every output reviewed | Override rate under threshold? |
| 60 | | |
| 90 | | Scale, adjust or stop |

## 10. The plan in 200 to 300 words
Write it as one paragraph a sponsor can read in a minute: context, current workflow, the AI technology and what it improves.
`,
    checklist: [
      "Context names the industry, organisation type and department",
      "The current workflow is concrete enough to serve as a baseline",
      "One specific AI technology is named, with why it fits and what it improves",
      "The MVA covers one task, with scope out and the human gate as explicit as scope in",
      "The KPI has a baseline, a target, a deadline and an override threshold",
      "The 200 to 300 word summary reads on its own",
    ],
    bubble: "One page, one bottleneck, one number. Ship it.",
  },
};
