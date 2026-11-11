---
kind: reading
based_on: content/01-extracted/02_Modules/Module_3_Complete.md, content/01-extracted/02_Modules/Module_3_Complements.md
based_on_hash: 81331eb54889
kicker: Concept · Tools, MCP, legacy systems
title: One plug, many sockets
bubble: Grab a cable. Let's plug some agents in!
---
A playlist plays what was planned. A live band reads the room and takes requests. Agents are the band: they act inside your software, not next to it. This module is about the wiring: how an agent reaches tools, why old systems push back, and how one protocol replaces a drawer full of adapters.

## From clicking to asking

Most software is driven through screens: menus, filters, tabs, copy and paste. An agent lets people state an intent instead (“paginate the document, sort the references, add a Notes column to the table”) and does the clicking on their behalf.

The plumbing underneath is old and simple. Since the web, software works as client and server: one side sends a request, the other processes it and answers. APIs turned that into reusable building blocks, which is why a young ride-hailing app could rent its maps from Google instead of drawing its own. An agent follows the same pattern: it calls a service, gets a response, and acts on it.

Take “make me a playlist of the number-one hit from every year since 1985”. To do it inside a music app, the agent has to:

- Turn the sentence into a sequence of operations.
- Fetch outside data (historical chart positions).
- Match each song to the app's own catalogue.
- Create a playlist in the user's account, with the user's permission.
- Add the tracks in the right order.
- Confirm, and keep the context for the follow-up (“now add a few tracks from 2023 in the same mood”).

:::callout Same pattern at work
Swap songs for stock: “check open orders for SKU-409 against warehouse stock; if stock is under the reorder threshold, raise an expedited purchase order and tell the account managers in Slack.” SAP, Salesforce and Slack, no screen, one sentence. And three places where a wrong call costs real money.
:::

## Why bother: what agents bring to a workflow

Three gains come up again and again. Efficiency: routine steps such as reading CVs, checking public profiles and drafting candidate updates run on their own. Accuracy: rules are applied the same way every time, so a finance or compliance agent catches the missing document a tired person would skip. Responsiveness: an IT or operations agent keeps watching, answering and escalating after the team has gone home.

## Wiring tools together: the automation spectrum

Agents usually live where people already work: Slack (conversations grouped by topic), Notion (pages, wikis and light databases), Discord (real-time text and voice rooms), email or a website. Between those apps sit meta-tools whose only job is to connect other tools. When a support bot escalates, one of them can email a colleague, open a task in Notion and log the case in a spreadsheet.

Pick the lightest tier that can carry your logic. Each step to the right buys flexibility and costs engineering time.

| Tier | Skill needed | Strength | Limit | Typical use |
|---|---|---|---|---|
| Zapier (no-code) | Point and click | About five minutes to set up, 6,000+ SaaS connectors | Fixed trigger → action, no real branching, no reasoning | Form → CRM → Slack notification |
| n8n or Make (low-code) | Visual flows, small expressions | Branches, loops, self-hosting for privacy | Hard to debug and to version in Git | Event alerts, reconciliation across systems |
| LangChain or LangGraph (pro-code) | Python or TypeScript | Stateful loops, memory, several agents, custom tools | Needs a dedicated software team | Compliance review agent, research assistant |
| Custom Python (full-code) | Systems engineering | Total control, no vendor lock-in, lowest latency | Highest build and maintenance cost | High-volume or proprietary pipelines |

:::callout Errors scale too
Automation repeats mistakes as fast as it repeats good work. In November 2023 an automated shutdown after a routing event took Optus offline across Australia for about 12 hours, hitting more than 10 million customers and 400,000 businesses. A 2024 University of Washington study found résumé-screening models favoured white-associated names 85% of the time. Reordering 1,000 blouses, sending evacuation alerts or rerouting trucks all deserve a person in the loop.
:::

## Legacy systems were built for human speed

Most companies cannot throw away the system that runs payroll or the bank's core ledger. Agents have to plug into it, and that is where projects stall.

- Start with a system audit: list the applications, databases and data flows, then pick the functions worth improving (customer lookup, order management, reporting).
- Middleware is the translator and traffic manager: it converts formats, enforces security rules and routes requests so old and new can talk without a rewrite.
- Pilot on routine, low-risk work (standard emails, meeting summaries) before touching core operations.
- Run urgent or sensitive inference on premises; push slow jobs such as detailed reports to the cloud. Keep components modular so each can scale alone.
- Every service authenticates every call (mutual TLS between services, role-based access), data is encrypted in transit, and every agent action is logged: data read, decision taken, person notified. Train people on data handling too.

| Barrier | What you see | What helps |
|---|---|---|
| Monolith | Screens, business rules and data welded together; no clean API, or one that chokes on a whole document; any change risks breaking something else | Middleware in front, new AI features as separate microservices |
| Data drift | Cust_ID in one system, CustomerNumber in another; truncated fields; undocumented codes. The model reasons over them and invents decisions | Nightly conversion jobs (AWS Glue, Azure Data Factory), scripts that flag missing fields and duplicates for human review |
| Human-speed sizing | Built for one click every 30 seconds. An agent firing 500 calls a minute drains the connection pool, locks tables and takes the system down | Connection pooling, caching, rate limits, read-only replicas |
| Latency and load | Slow answers in customer-facing use; no memory or CPU headroom for spikes | Dashboards on latency, errors and load; reroute to a standby GPU or a fallback model |

:::callout Integration is not access
Being able to connect an agent to a database does not mean it should run any SQL it likes. Give it parameterised stored procedures on a read-only replica. When a system has no API at all (green-screen terminal, desktop ERP with no SDK), a computer-use agent that reads the screen is the last resort: 5 to 10 seconds per screen, fragile to layout changes and costly in screenshots.
:::

## Customer-facing agents: tune the tone

Customers expect more than a correct answer: they want to feel heard. General models handle everyday language well but stumble on industry terms, regulation and the emotional temperature of a complaint. Fine-tuning, further training a model on your own examples, works like training one muscle group instead of the whole body. A common reply structure is Acknowledge → Apologise → Assure → Act.

- Good training data covers four things: empathic phrases, when to move from reassurance to action, cultural and regional norms, and annotated escalation triggers.
- Example: an angry customer with surprise data charges. The agent tags the ticket angry and high priority, replies in three sentences (sorry, I understand, here is what I will check), and next quarter learns the new plans through a small adapter instead of a full retrain.
- Done well, routine questions get resolved by the agent (often 60 to 80%, depending on maturity) and the emotional, high-stakes calls reach a person faster.
- Watch for: formulaic replies (overfitting), tone-deaf ones (underfitting), lost product knowledge after tuning (catastrophic forgetting: mix in domain tasks), different voices across chat, email and phone, and privacy of the transcripts you train on (GDPR, HIPAA).
- On voice, speed is part of empathy: if the agent takes 1.5 seconds to acknowledge a sentence, callers talk over it.

| Technique | How it works | What it buys for tone |
|---|---|---|
| Supervised fine-tuning (SFT) | Train on labelled examples (tickets tagged by sentiment and urgency) | Knows when to show sympathy and when to escalate |
| Instruction tuning | Train to follow explicit orders (“reply calmly to an upset customer”) | Sticks to the brand voice and reply structure |
| RLHF | People upvote or downvote generated replies; a scoring system steers training | Rewards helpful, policy-safe replies, discourages robotic ones |
| DPO | Train directly on pairs: preferred reply vs rejected reply | Similar quality with no reward model, fewer moving parts, lower cost |
| PEFT (adapters, low-rank updates) | Change a small slice of the parameters instead of the whole model | Ship new scripts (a new tariff, new slang) quickly and cheaply |

:::callout Escalate, don't improvise
Models still miss sarcasm and idioms and can sound sorry while stating a wrong fact. Ground answers with retrieval, and hand legally sensitive or heated conversations to a person at once. Empathy that is only a script is “empathy theatre”.
:::

## Beyond screens: agents and IoT

In factories, stores and hospitals, agents also read sensors and drive machines. The architecture has three layers.

- Distributed orchestration: several specialised agents, each owning a cluster of devices. Resilient, but they must not contradict each other.
- Hierarchical orchestration: a lead agent directs sub-agents (energy, security, comfort) and they report back. Simpler to manage and audit.
- Reported results are large: one carmaker with 10,000+ sensors on 50 lines cites 30% less unplanned downtime and about $2.3 million saved a year. Treat such reported figures as claims until you have your own baseline.
- Collect only the data you need, process it on the device where possible, and pseudonymise what leaves it.

| Layer | What is in it | What to watch |
|---|---|---|
| Devices | Sensors (temperature, humidity, motion, sound), actuators (motors, valves, switches), edge gateways that pre-process data | Certificate-based device identity, secure boot, regular over-the-air security updates |
| Communication | Light protocols such as MQTT and CoAP, 5G or Wi-Fi 6, mesh networks | Segment the device network away from business systems |
| Intelligence | Agents that spot anomalies, predict failures and coordinate responses | Role-based limits on agent actions, audit log of every command, alerts on unusual behaviour |

:::callout Watch out
An actuator is a write tool. A valve that opens by mistake is a refund you cannot take back. The same ceilings and stop buttons apply.
:::

## One plug for every socket: MCP

Without a shared standard, every agent needs its own connector to every tool, each with its own schema and its own maintenance whenever the tool's API changes. The Model Context Protocol (MCP), created by Anthropic and adopted as an open standard, splits the job into three roles so a tool is wrapped once and any compliant agent can use it.

- Messages use JSON-RPC 2.0, over standard input/output for a local server or Server-Sent Events for a remote one.
- Servers already exist for Salesforce, Google Workspace, Figma and WordPress, so one conversation can reach the CRM, the calendar, the design file and the website.
- Schema bloat: each server advertises all its tools. Ten servers with a hundred tools can burn 10,000+ tokens before the user types a word.
- Identity: the agent should act with the user's delegated OAuth token, not a shared all-powerful service account, so row-level access rules still hold.
- Connections: long-lived links across firewalls time out. Plan heartbeats, reconnection, and what the agent does when a server is gone.
- Edge cases (patchy connectivity, unsupported devices, odd requests) and ambiguous intent are where reliability is won or lost. Security, governance and vendor support for MCP belong in the plan from day one.

| Role | What it is | Example |
|---|---|---|
| Host | The runtime where the model works | Claude Desktop, an IDE, a company AI gateway |
| Client | The adapter inside the host; one connection per server | Built into the host, you rarely write it |
| Server | A small program that exposes tools and data in the standard format | A server for Slack, Jira, a Postgres database, a GitHub repository |

:::callout Your turn
Before reading the answer anywhere, count it. The question below gives you a small company with a handful of agents and tools. How many connectors would it need without a standard?
:::

:::takeaways
- An agent turns intent into calls to real systems. Every call is a request your code can check, limit and log.
- Legacy systems break at agent speed: put middleware, rate limits and read-only access between the agent and the core.
- MCP wraps each tool once for every agent, but it does not decide what an agent is allowed to do. That is your job.
:::
