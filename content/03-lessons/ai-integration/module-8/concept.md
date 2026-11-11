---
kind: reading
based_on: content/01-extracted/02_Modules/Module_8_Complete.md, content/01-extracted/02_Modules/Module_8_Complements.md
based_on_hash: 6fa4edd8c432
kicker: Concept · Ethics, workforce and the adoption plan
title: We can build it. Should we, and on what terms?
bubble: Last stretch. You know how to build it, now let's make sure it's fair.
---
Seven modules taught you to price, build, connect, secure, scope, roll out and govern an agent. This last one asks the questions that sit above all of them: who is affected, who answers when it goes wrong, and is the outcome fair? Then it folds everything you have produced into one adoption plan you can put in front of your leadership.

## Why ethics comes last

Ethics is placed at the end on purpose. It is not an afterthought but the lens you hold every earlier decision up to: the model you chose, the data you feed it, the actions you allow, the people whose work changes. “Can we?” is answered. Now: should we, and under which conditions?

AI raises sharper questions than ordinary software for three reasons. It is often opaque, so nobody can fully say why it decided something. It works on probabilities, not fixed rules. And it scales, so a single flaw is repeated across thousands or millions of decisions before anyone notices.

| | A broken spreadsheet formula | A flawed model in production |
|---|---|---|
| Reach | One team, one report | Every customer, applicant or supplier it touches |
| Speed of damage | As fast as people open the file | As fast as the agent runs |
| Who answers | The file owner | Unclear, unless someone was named in advance |

:::callout Field note
Ethical failures are business failures: lost trust, disengaged staff, customer backlash, regulators asking questions. Putting ethics into governance is risk management, not charity.
:::

## Four principles leaders keep meeting

Practice and research converge on four guideposts. Each one is easy to agree with and hard to run, which is why the next section turns them into procedures.

| Principle | What it asks of you |
|---|---|
| Fairness and non-discrimination | Skewed training data can copy or harden bias. Make sure nobody is disadvantaged because of a protected characteristic. Fair AI also tends to perform better for the business. |
| Transparency and explainability | Black boxes breed distrust. You must be able to explain a decision in plain words to staff, customers and regulators. |
| Accountability and responsibility | Autonomy does not remove responsibility. A person keeps oversight of, and answers for, what the agent does. |
| Privacy and data stewardship | Data rules keep tightening, so careless handling is a legal and a reputational risk. Use data with care and for a stated purpose. |

## Run your agent like a mailroom

Instructor Oscar Sanchez proposed a down-to-earth way to make those principles operational: treat an autonomous agent like the company mailroom. A good mailroom has five habits, and each one is a control you can build.

- Fairness in practice: run disparate impact tests continuously on synthetic demographic datasets, and feed the agent no input that can stand in for a demographic trait (a proxy).
- Transparency in practice: tell people when they are dealing with an AI, and emit a decision rationale they can be shown.
- Proportional intervention: low-confidence or high-financial-impact operations go to a human review queue automatically.

| The mailroom clerk… | Principle | What it becomes in your agent |
|---|---|---|
| never reads your letters | Privacy | Personal data masked before the model sees it; vendor terms with zero data retention |
| delivers only to verified recipients | Access control | Write access limited by IAM roles; the agent touches only what it is allowed to |
| logs every parcel in and out | Auditability | A structured rationale stored with each decision, in metadata you can query |
| refuses hazardous or illegal cargo | Guardrails | Blocked actions and inputs, enforced in code rather than in the prompt |
| works under a supervisor who answers for losses | Human responsibility | A designated role, for example the director of operations, accountable for every agent decision |

:::callout Keep in mind
An agent cannot be held legally or financially accountable. A person always is. If your plan does not name that person, the choice will be made for you after the incident.
:::

## The work changes before the jobs go

Job loss is the concern employees voice most, and it is about more than income: it touches identity, purpose and dignity. History offers a partial answer. ATMs took over some teller tasks and banks moved tellers towards customer service. Spreadsheets displaced manual bookkeepers and created demand for financial analysts. Automation tends to remove tasks first and reshape roles second.

Ignore that, and it bites. In August 2025 the Commonwealth Bank of Australia tried to replace 45 call-centre jobs with an AI voice bot. Call volumes rose, performance fell, and the bank reversed the cuts, rehired the staff and admitted it had misjudged the cost. Elsewhere, AI ordering at Hungry Jack's drive-throughs drew public concern about entry-level jobs for teenagers.

The mailroom image helps here too. Sorting and routing is mechanical, so the agent takes it. The odd parcel, the angry recipient, the exception to policy call for judgement: they stay with people and become a bigger share of the job. Most experts now expect AI to both reshape and replace jobs; the leader's task is to transform work wherever possible.

- Reskilling, with budget and time agreed before launch.
- Internal mobility: a route into the new tasks (review queue, quality audits, exceptions).
- Early, honest communication about what changes and what does not.
- Real transition support for the roles that do shrink.

## Other risks, and three quick tests

Bias is one risk among several. Voice cloning already powers fraud: in 2019 criminals imitated a director's voice and talked a UK energy company into wiring $243,000 to a fraudulent account. In 2024 the US Federal Communications Commission banned AI-generated voices in robocalls after a fake President Biden message tried to mislead voters. In medicine, when a diagnostic tool misses something and a patient is harmed, it is still unclear whether the doctor, the developer or the hospital is liable.

Leaders need tools, not abstraction. Before you approve a use case, run three short tests, then back them with structured artefacts: model cards, bias audits and ethics checklists.

- Do no harm: borrowed from medicine. What is the worst realistic outcome for the person on the other end, and is it acceptable?
- Stakeholder impact: write one line each on how employees, customers, investors and society are affected.
- Front-page test: would you be comfortable explaining this decision if it made tomorrow's headlines?
- Model card: a standard document giving a model's purpose, data sources, performance, limits and risks. Google researchers introduced the idea in 2019 to help judge whether a model is fit, fair and safe for a given use.

| Region | Typical stance |
|---|---|
| Europe | Often leads with privacy-first norms |
| United States | Innovation first, with oversight emerging |
| Asia | Varies: some countries run state-led experimentation and regulation |

:::callout Leadership
Values in a mission statement change nothing; values built into operations, training and reporting lines do. Groups such as the Partnership on AI bring stakeholders together to set norms you can borrow. The question moves from “how far can we push efficiency?” to “how do we advance responsibly?”
:::

## When one agent becomes several

Your capstone may need more than one agent. In the closing webinar, Dr. John Williams described two ways to organise them once a single script is no longer enough. Both avoid long conversational chains between agents, which break as soon as one prompt changes (the “chain jam” from module 5).

| Pattern | How it works | Why it helps |
|---|---|---|
| Supervisor (hierarchical) | A central model splits the goal into sub-tasks, hands each to a specialised worker, checks what comes back and assembles the result | Workers keep small, focused context windows; the supervisor keeps only a summary, so prompts do not bloat |
| Shared artifact (blackboard) | Agents never message each other; they read and write a shared state (a database, a JSON workspace, a draft document) | Agents are fully decoupled: one writes a change, another inspects it, no handoff needed |

## Close the capability gap with one plan

The technology can now plan, call tools and act. Yet Dr. Abel Sanchez estimates that 85% of enterprise use is still basic editing, summarising and chat. The gap is human, behavioural and organisational, not technical. Boards bring decades of operating experience but no mental model for software that is not deterministic, so they default to caution.

Your adoption plan bridges that gap by speaking their language: a risk register, lower operating costs, compliance commitments, measurable results. It has eight sections, and instructors flagged a classic trap for each.

| Section | What it must show | Classic trap |
|---|---|---|
| 1 · Context | Sector, organisation, one department, one concrete bottleneck | A use case as wide as “transforming healthcare with AI” |
| 2 · Technology | Model tiers, hosting (cloud or local), integration (MCP, APIs), and why | A list of tools with no trade-offs explained |
| 3 · Cost | Capex, opex, staffing and training, total cost of ownership | Raw token costs only |
| 4 · Security | The six NIST CSF 2.0 functions, prompt injection, tool privilege limits | “We will encrypt the data” |
| 5 · Change and training | Co-design workshops, retraining incentives, psychological safety | A user manual nobody reads |
| 6 · Scaling | Crawl, Walk, Run with numeric milestones, autonomy levels and gates | Full autonomy on day one |
| 7 · Governance and ethics | Named laws (GDPR, EU AI Act, HIPAA, CCPA) and the person accountable for failures | No specific regulation named |
| 8 · KPIs | Effectiveness, efficiency, learning and adaptation, human adoption | Revenue ROI alone |

:::callout Big picture
The hyperscalers (Microsoft, Alphabet, Amazon, Meta) are investing upwards of $100 to $150 billion a year in GPU clusters and custom chips, and electricity has become the main constraint: multi-gigawatt power deals, even decommissioned nuclear reactors such as Three Mile Island being brought back. Expect cloud token prices to keep falling, and local or sovereign hosting to stay hard to get.
:::

:::takeaways
- Every principle needs a mechanism and an owner. The agent is never the accountable party.
- Plan the work, not only the tool: which tasks move to the agent, which stay human, which are new.
- One plan, eight sections, built from what you already made. Where a number is missing, say how you will get it.
:::

:::check
Your agent approves supplier refunds. The board asks who is responsible if it pays the wrong supplier. Which answer fits this module?

- [ ] a. The model vendor, since its terms of service cover errors made by the model
- [x] b. A named role, such as the director of operations, owns every decision; high-amount or low-confidence refunds go to a review queue and each decision is logged with its rationale
- [ ] c. Nobody needs to be named once the agent's measured accuracy is above 95%
- [ ] d. Responsibility is shared with users, because the model card lists the agent's limits

### Hint a

Your organisation runs the agent and pays the supplier. A vendor contract does not move accountability for your decisions out of the building.

### Hint c

Accuracy says how often it is right, not who answers when it is wrong. At scale, 5% is a lot of wrong refunds.

### Hint d

A model card is transparency: it helps you judge fitness for use. It does not transfer responsibility to anyone.

### Explanation

Right. That is the mailroom supervisor: a named human answers, unusual or costly parcels go to a person, and every parcel is in the ledger.
:::
