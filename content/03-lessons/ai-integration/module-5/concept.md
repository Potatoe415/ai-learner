---
kind: reading
based_on: content/01-extracted/02_Modules/Module_5_Complete.md, content/01-extracted/02_Modules/Module_5_Complements.md
based_on_hash: d88af238421e
kicker: Concept · Maturity, business functions, Minimum Viable Agent
title: Ship one small agent that works, not a big one that might
bubble: Cap on. Today we ship something small that works.
---
Most first agents stall for organisational reasons, not technical ones: the company was not ready, the scope was too wide, or nobody owned the result. This module gives you a map of where your organisation stands, a tour of where agents already earn their keep, a choice of architecture, and one discipline to start with: the Minimum Viable Agent.

## The maturity cycle: five moves, in order

Inspired by OpenAI's work on finding and scaling use cases, Dr. Sanchez frames adoption as a five-stage cycle. Each move prepares the next one. Skip one and it comes back later as resistance, risk or a pilot nobody uses.

| Move | What you do | What you get out of it |
|---|---|---|
| 1 · Identify opportunities | Find repetitive tasks and recurring bottlenecks, then split them into small steps (pick target accounts, enrich profiles, draft outreach). | A shortlist, and sponsors who have seen a concrete benefit |
| 2 · Teach the fundamentals | Train people to prompt, read outputs critically and expect the usual limits. Publish governance rules, an approved tool set and ethical guardrails. | Shared vocabulary, fewer unsanctioned tools |
| 3 · Map workflows | Draw the current process step by step (a LinkedIn recruiting flow, a podcast production line), mark where agents could help, prototype, then score each idea on effort, value and risk. | A ranked list of prototypes |
| 4 · Enable and resource | Give the winners a cross-functional team, secure platforms, data pipelines, standard APIs and a dashboard for time saved, error rates and throughput. | A pilot running on real systems, measured |
| 5 · Scale and share success | Fold what works into standard procedures. Publish the case study: architecture, method, governance, numbers. Grow AI champions and communities of practice. | Reuse across teams, and the next round of opportunities |

:::callout Watch out: shadow AI
When approved tools lag behind demand, people bring their own, without IT or security knowing. In a survey of 7,000 people across seven countries, 38 % admitted sharing sensitive work data with AI tools without permission (46 % among Gen Z), and 52 % had never been trained to use AI safely. The answer has three legs: policy (sanctioned tools, usage rules, audits, a Center of Excellence), technology (data loss prevention, traffic filtering, role-based access, log review, safe sandboxes) and culture (ongoing training, safe experimentation, leaders who set the example).
:::

## Where you really stand

The cycle says what to do next. A maturity ladder says how far you have got. In office hours, the faculty argued that most stalled AI programmes stall because leaders misread their own stage. Be honest here: the right first agent depends on the stage, not on ambition.

- Crawl: small pilots on routine work (data entry, invoices, reports), data clean-up, executive briefings, first governance drafts.
- Walk: supervised agents that recommend while a person decides (next best action, assisted customer chat), stronger pipelines, business and tech teams working together.
- Run: autonomous agents (anomaly detection with corrective action, personalisation at scale) overseen by a Center of Excellence that tracks ROI against KPIs. Module 6 turns this into a pilot-to-practice plan.

| Stage | What it looks like | Signal or risk |
|---|---|---|
| 1 · Ad-hoc experimentation | Individuals draft emails and code in consumer chatbots on their own | IP and customer data leaking into public models; nothing learned centrally |
| 2 · Tactical task automation | Departments buy isolated point solutions (a help desk bot, a summariser) | Local gains, but tool sprawl and data silos |
| 3 · Strategic function integration | Agents sit on the core systems (CRM, ERP, HRIS) with KPIs, deterministic guardrails and role-based permissions | Agents now touch systems of record, so guardrails and permissions must hold |
| 4 · Autonomous operations | Multi-agent workflows run across departments without manual hand-offs; people handle exceptions | Failures that cascade from one agent to the next |
| 5 · Adaptive reinvention | Business models, pricing and customer experience are built around agentic workflows | Company margins and operating leverage are reshaped |

## Agents in the product development lifecycle

Most products, from a VR headset to a toothbrush holder, go through the same phases: ideation and requirements, design, prototyping, development, testing and QA, launch, post-launch iteration. Each one is a place where AI can step in.

Generative AI proposes options under human direction: Nike's A.I.R. project iterates footwear concepts from athlete data, L'Oréal built a formulation model with IBM, Tesla explores thousands of component variants against aerodynamic and weight constraints, Crocs and ABLO let customers design their own Jibbitz charms. Agentic AI closes the loop: GM's generative design work with Autodesk generates, scores and re-iterates parts on its own; Hyperganic's system went from specification to a hot-fire-tested aerospike engine; IKEA's SPACE10 lab explored hundreds of concepts from decades of catalogues; Oracle's sales agents decide what to write, why and when. Information is a product too.

| Lifecycle stage | What an agent can take on |
|---|---|
| Ideation | Scan trends, behaviour and feedback to find gaps in the market |
| Prototyping | Generate, test and revise digital prototypes in loops, often on simulated users |
| Development | Several agents write code, review each other and manage versions |
| QA | Build and run test suites, adapt them as the product changes |
| Launch | Coordinate documentation, deployment pipelines and compliance checks |
| Post-launch | Watch usage, propose iterations, trigger a redesign |

:::callout Getting ready
Four shifts, none of them a rebuild. People: train designers, developers and managers to prompt, supervise and calibrate trust. Tools: platforms that connect models to APIs, data and task systems. Processes: give agent output a slot in stand-ups and release planning. Mindset: from command-and-control to collaborative supervision. The payoff is speed, cost, parallel experiments and consistent quality, with people moving towards judgement and strategy.
:::

## Agents by business function

A functional agent is built for one domain: its workflows, its systems, its rules. That is what separates it from a general assistant. Vendors and analysts report big numbers (up to 70 % fewer manual HR tasks, a 12 % cut in financial processing time with 22 % more satisfied staff, Gartner's up to 80 % of routine IT issues automated). Read them as orders of magnitude, not promises.

| Function | Where it already works | Higher-value pattern | Trap |
|---|---|---|---|
| HR | Leave and benefits answers pulled live from Workday or SAP SuccessFactors; onboarding (Palo Alto Networks' FLEXWORK) | End-to-end onboarding: documents, access, training | Autonomous CV filtering, interview scoring or performance scoring: high-risk under the EU AI Act |
| Finance | KYC document collection and checks; research retrieval for advisers (Morgan Stanley) | RAG on transaction history for real-time advice | Advice without an audit trail in a regulated setting |
| IT | Password resets, access requests, ticket summaries in Teams | Open, route and close tickets, raise purchase orders with manager approval (Copilot Studio) | Write access to systems without a gate |
| Marketing | Drafting and translation inside existing tools | Detect ad decay, generate variants, shift budget to what converts | Floods of bland copy that erode the brand |
| Sales | Pull objections and competitor mentions from call transcripts into the CRM | Draft technical follow-ups for the rep to approve | Sending to clients without review |
| Supply chain | Spot a weather-induced delay | Query back-up suppliers, compare freight cost with downtime, prepare a PO for sign-off | Ordering on noisy signals with no human gate |

:::callout Regulation
Under the EU AI Act (Annex III), AI used for recruitment, hiring and promotion is high-risk: bias audits, logged human oversight, technical documentation and explainability come first, and the Act's fines reach up to €35 million or 7 % of global turnover. Internal HR FAQs, policy navigation and onboarding scheduling stay low-risk. That is where an HR first agent belongs. Module 7 goes deeper.
:::

## Health care: the hard case

Dr. Sanchez picks medicine on purpose: if expertise can be democratised there, it can be anywhere. In a controlled benchmark, Microsoft's diagnostic orchestrator (MAI-DxO), which emulates a panel of physicians, solved 85.5 % of hard cases against about 20 % for doctors, at lower cost. In another study, doctors using ChatGPT did only slightly better than doctors without it, while the chatbot alone beat them all. The bottleneck was how people used the tool, not the tool.

- Clinical decision support: agents reason step by step, ask for more data, and flag problems early (Duke's Sepsis Watch tracks hundreds of vital-sign variables).
- Imaging: Aidoc screens every emergency CT for bleeds and clots; RadNet pre-screens mammograms so radiologists see the suspicious ones.
- Personalised care: oncology agents and virtual tumour boards gather imaging, pathology and trials. In one pilot an agent booked an urgent MRI while another checked the patient's pacemaker model for safety.
- Operations: Epic's bed management agent assigns beds from admissions, discharges, team location and infection control; others forecast surges and reorder supplies.

## The browser: every function's workplace, and exit door

Most knowledge work happens in a browser, often with six to ten tabs open. AI is moving into it: Edge's Copilot summarises and compares tabs and can help book things, Arc summarises with a pinch, Brave's Leo works privacy-first, Chrome DevTools explains a console error in one click. HR compares profiles, finance digests filings, marketing drafts in place.

The same convenience carries three risks. Data leakage: anything pasted into a consumer tool may leave the company. Misinformation: early in 2024 the EU threatened Microsoft with fines over 2 billion USD over content generated by its search engine. Overreliance: a lawyer filed a brief against Avianca built on bogus cases ChatGPT had invented, and Google's AI Overviews has given the wrong year. The way in mirrors earlier digital shifts: policy first, pilots with chosen teams, IT-approved extensions and assistants, then training and scale.

## Centralized, embedded or hybrid

Picture a clothing brand. Version one: every store sells from one central catalogue, consistent and easy to run. Version two: each store buys locally and fits regional tastes. Agents work the same way. A centralized assistant (think AskNova, answering PTO questions and summarising a 27-page contract inside Slack) gives one interface and simple governance. Embedded agents live inside each team's tools (Excel, Figma, the project tracker) and know their domain: a consumer goods marketing team replaced a bland general assistant with one trained on past campaigns and brand rules.

| | Centralized | Embedded |
|---|---|---|
| Lives in | Slack, Teams | Departmental tools |
| Scope | Broad, general | Narrow, domain-specific |
| Owner | IT or automation team | The function |
| Governance | Easy to control and audit | Harder to standardise |
| Fit to the work | Slow to adapt to specialist tasks | Tuned to local data and tools |
| Launch and cost | Fast, cheaper to start | Set-up per department, higher upkeep |
| Maturity | Crawl: one assistant for all | Walk: first embedded pilots. Run: federated agents on shared orchestration, central standards |

:::callout Field note
Most organisations end up hybrid: a central generalist that routes deep work to embedded specialists, under one shared rulebook. Sensitive data is the tie-breaker. An agent embedded in a US patient intake or billing system that touches protected health information without encryption, access logs and business associate agreements is a HIPAA liability; routing that data through a governed central layer lowers the risk. On the team side, the same choice is a Center of Excellence for infrastructure and guardrails versus functional teams owning their prompts and workflows.
:::

## Consultants and outsourcing: the canary

Business process outsourcing (BPO) hands non-core work (support, HR, finance, research) to providers such as Accenture, TCS, Cognizant, Infosys or Wipro. It is a market of over 300 billion USD, projected to pass 500 billion by 2030. It existed because classic software could not read messy documents or use judgement. Agents can: they process unstructured data, connect to several systems and act. Voice agents and browser-use (operator) agents are the spearheads.

Two consequences for you. First, start where KPIs are already clear (ticket volume, satisfaction): ROI is easy to show there and much harder in fuzzy areas like employee experience. Work whose cost grows with volume, like invoices with sales, is where agents flatten the curve. Second, building got cheap: researchers trained reasoning models for about 450 USD, or under 50 USD of cloud credits, and Hugging Face rebuilt a deep research agent within 24 hours. Meanwhile KPMG, PwC, Deloitte and EY each announced a billion dollars or more for AI, cloud, audit technology or training. Consultants are useful partners, and vendors with an interest.

## The Minimum Viable Agent

A Minimum Viable Agent (MVA) is the smallest agent that removes one real bottleneck and proves it with a number. The idea comes from the Toyota Production System, Kaizen and Lean Startup: cut the cost of learning, then improve in small steps. Do not spend six months on an all-in-one multi-agent system.

- One task, short and repetitive (think five minutes, many times a week), not a whole process.
- A person validates every output at first. Autonomy is earned.
- Value = more revenue + less cost. If you cannot say which one the agent moves, stop.
- Track the override rate. Above about one output in five, the input data is dirty or the task is too ambiguous for the model tier.
- Governance is part of ROI: ten hours saved a week do not offset an unchecked data breach.
- Start with early advocates. A team that fears for its jobs may feed the agent bad data to prove it fails.
- Be operational: exact inputs, states, tool calls and oversight gates, not “AI will help marketing”.

## When agents talk to agents

Once an MVA works, the temptation is to chain it: research, then analysis, then drafting, then compliance. Faculty call the failure mode prompt coupling fragility. In one six-agent research pipeline, asking the first agent for “more concise” summaries broke the third one, which relied on phrases that had disappeared.

- Hand-offs between agents use strict schemas (JSON, Pydantic models), never free prose.
- Right-size the model per step: small models for parsing and formatting, mid-tier for synthesis, frontier models only for the few steps that resolve ambiguity.
- Every step writes an immutable state record (evidence, token use) so a failure can be replayed exactly.
- Prompts, schemas and routing live in versioned config files with regression tests, not hard-coded in the app.

:::takeaways
- Know your maturity stage first: the right first agent depends on it, and shadow AI tells you demand already exists.
- Functional agents beat general ones in depth; regulated uses like hiring are not a place to start.
- Pick the architecture on purpose: centralized to start and govern, embedded for depth, hybrid as you grow.
- An MVA takes one task, keeps a person in the loop, moves one business number and watches its override rate.
:::

:::check
Your company is at stage 2: a few departmental bots, no shared governance. HR wants a first agent with results within a quarter. Which one do you scope?

- [ ] a. An agent that screens every CV and sends a ranked shortlist to hiring managers
- [x] b. A leave and benefits agent grounded in the HRIS, with HR reviewing answers at first and tracking the override rate
- [ ] c. A multi-agent onboarding system across HR, IT and finance, running without human review
- [ ] d. Let each recruiter pick their own chat tool and see what sticks

### Hint a

Recruitment is a high-risk use under Annex III of the EU AI Act. It needs bias audits, documentation and logged oversight that a stage 2 company does not have yet.

### Hint c

Cross-functional orchestration with no manual hand-offs is stage 4. Skipping two stages is how pilots stall.

### Hint d

That is stage 1, shadow AI: data leaks out and the company learns nothing.

### Explanation

Right. Frequent, low-risk questions, a real data source, a person in the loop and a health metric. It fits stage 2 and builds the governance habits stage 3 will need.
:::
