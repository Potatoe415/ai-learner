---
kind: reading
based_on: content/01-extracted/02_Modules/Module_2_Complete.md, content/01-extracted/02_Modules/Module_2_Complements.md
based_on_hash: 2a1176681b1b
kicker: Concept · From vibe coding to engineering
title: The model is the wizard. Your code is the harness.
bubble: Vibes are fun. Let's plug in a harness.
---
Anyone can now get working code, or a working agent, by asking for it in plain words. Getting it to behave the same way on the ten-thousandth request is another job. This module tours the platforms, separates what the model does from what your code must guarantee, then walks through the big choices: one agent or several, open or closed model, and where it all runs.

## A young, crowded market

Agentic platforms are a “Wild West”: dozens of players, no settled standards, and today's leaders may not last. You do not need to bet on a winner. You need to know what each family is good at, so you can match the right tool to the problem: deep reasoning, a tight budget, near real-time answers, or a specialised domain such as code or images.

Most of the names below are open source: the code is public, so you can read it, change it and share it under a licence. Think of getting the recipe, not just the dish. Closed-source products keep code and training data with the vendor, which is why they are often called black boxes.

| Platform | Origin | What it does | Watch out |
|---|---|---|---|
| LangChain | Harrison Chase, late 2022 | Open-source framework for LLM apps: prompt templates, chains, agents, memory, retrieval | Steep learning curve, frequent changes, uneven docs |
| CrewAI | João Moura (ex-Clearbit), 2023 | Python framework for teams of agents, each with a role, tools and a goal, that delegate to each other | No visual builder; needs Python skills |
| Ollama | Michael Chiang and Jeffrey Morgan, Y Combinator winter 2021 | Runs open models (Llama 2, Mistral, Gemma) on your own machine from the command line, on macOS, Linux and Windows | Self-hosting means self-patching (see the case study) |
| Codex | OpenAI, 2021; agentic preview in ChatGPT in May 2025 | Reads a codebase, fixes bugs, runs tests and proposes changes in a sandbox, without step-by-step prompts | Generated code can carry vulnerabilities and breed false confidence |
| n8n | Jan Oberhauser, 2019 | Self-hostable, open-source alternative to Zapier that snaps apps together as nodes | Logic-heavy set-up; big flows get hard to maintain visually |

:::callout Field note
Plain automation passes messages between apps. An n8n flow becomes agentic when it decides: a chat message arrives in Intercom, the flow checks in HubSpot whether this is a top-tier customer, pulls the matching help article from Notion, and alerts a manager in Slack.
:::

## Three questions that sort the platforms

Feature lists overlap, so compare architecture instead. MIT instructors reduce the choice to three questions:

- Coordination: how does it chain agents (in sequence, in a hierarchy, in loops)?
- Data sovereignty: where do execution and inference happen (public API, private cloud, your own machines)?
- Control: who owns the weights, the runtime and the release cycle (open source or a closed ecosystem)?

| Family | Pattern | Strength | Limit | Best fit |
|---|---|---|---|---|
| LangChain / LangGraph | Graph of states with loops | Checkpoints, human pause and resume, fine control | Breaking changes across versions | Complex stateful enterprise apps |
| CrewAI | Roles in a hierarchy (role, goal, backstory) | Natural model for delegation | Code only, opaque to business experts | Team simulations: research, multi-stage drafting |
| Microsoft AutoGen | Agents in conversation, event-driven | Built-in sandboxed code execution | Free-form chat is hard to constrain and debug | Code generation, data exploration |
| Ollama / vLLM | Local or self-hosted inference | Data stays in, no per-token bill, steady latency | Needs GPUs; models trail the frontier | Regulated data: health, banking, defence |
| n8n / Flowise / Make | Visual nodes, low code | Huge connector library, fast for business teams | Brittle for agent loops, awkward in Git | Internal tools, deterministic webhooks, MVPs |

:::callout Governance
Low-code tools such as Zapier Central or n8n let business units move fast. Without central IT oversight they also open security holes and duplicate software spend. And since today's favourite framework may be obsolete in 18 months, build the skill to evaluate and migrate rather than marrying one.
:::

## Vibe coding: fast, and fragile

In early 2025 Andrej Karpathy, an OpenAI co-founder, named a new habit “vibe coding”: you say what you want in plain language, accept what the AI writes and stop caring about the code. The assistants that make it possible include GitHub Copilot, Gemini Code Assist, Amazon Q Developer, Claude Code Pro, OpenAI Codex, Replit AI, Tabnine and code editors such as Cursor.

The gains are real. In March 2025 Y Combinator's Jared Friedman said a quarter of the winter 2025 start-ups had codebases about 95 % generated by AI. Prototypes appear in minutes rather than weeks, a few product engineers ship what large teams used to, and niche markets become worth serving. Finance teams report cleaning and charting spreadsheets of millions of rows with ten-line prompts.

Abel Sanchez calls the wider shift “vibe living”: we now vibe an image, a video, and increasingly expertise in medicine, law and finance. Like steam and electricity did for muscle, agents turn cognitive work into a cheap utility. The faculty's reading of the data: technology automates tasks, not whole jobs, and pushes people towards judgement and orchestration.

Before rolling these tools out across an organisation, check five things:

- The full life cycle: a tool that drafts code but cannot hand it cleanly to your pipelines creates slow, error-prone hand-offs.
- Enterprise rules up front: privacy and IP governance. Assistants trained on open-source code can surface licensed snippets.
- Democratisation with governance: AI-written code goes through the same quality and compliance checks as human code.
- Skills, not replacement: teach people to prompt and to review output, so institutional knowledge stays.
- Context management: prompt history, links to the code each prompt produced, and rollback. Without them, teams drift into incompatible styles.

:::callout The production hangover
A prototype vibe-coded in 30 minutes usually has no input checks, no error handling, no indexes, no tests and no coherent structure. “Devibing” is the engineering pass that follows: remove redundant model calls and circular dependencies, add strict types and schema checks, move secrets out of the code into environment variables, and put database changes into migration scripts.
:::

## The wizard and the robot

A common mistake is to think the model is the agent. It is only one part. The model (the wizard) runs on GPUs, reads the context it is handed, proposes an answer or a tool call, and forgets everything. It cannot run code, open a database or remember yesterday on its own.

Everything else is ordinary software (the agent, or robot). It keeps state and memory, holds the business rules, runs the tools and decides what to show the model next. It runs on normal CPUs, in Python, Node.js or microservices, and does the same thing every time.

| | Wizard (the LLM) | Robot (the orchestrator) |
|---|---|---|
| Runs on | GPUs | CPUs: Python, Node.js, microservices |
| Memory | None between calls | Session state, database, logs |
| Behaviour | Probabilistic | Deterministic |
| Job | Read the context, propose “run tool X with Y” | Build the context, run the tool, store the result, ask again |

:::callout Design law
Reasoning is not a workflow. A business process must give the same result every time, so its sequence (say lead intake → KYC check → credit risk score → account creation) lives in code: a state machine or a workflow engine such as LangGraph, Temporal or AWS Step Functions. The model is called inside a step, to read messy input or judge an edge case. It does not choose the next step on its own.
:::

## Harness engineering

When models write the code or drive the actions, the engineer's main job shifts from writing every line to building the harness around them: automated checks that accept good output and reject the rest, whatever the model meant. Teams that succeed do not read every generated line. They make it impossible for a bad one to get through.

| Harness part | What it does | Example |
|---|---|---|
| Invariant checks | Assert business rules that must never break | A refund is never above €100; a category is always one of four |
| Sandboxed runtime | Run model-written code in isolation | A container with no production credentials |
| Synthetic bench | Replay many edge cases on every generation | 1,000 generated cases, including empty, hostile and foreign-language ones |
| Regression gates | Reject output whose schema drifts | The format or pass rate changes → the build fails |

:::callout Watch out
A rule written in the prompt is a wish, not a control. If a limit matters, enforce it in code and in permissions, where the model cannot talk its way past it. Module 7 turns this into hard guardrails and evals.
:::

## One agent or a team?

Agents differ in how much they remember and plan. A classic model has five types; know what one can do alone before you combine several.

A multi-agent system is several autonomous agents sharing an environment. Each controls its own actions, sees only part of the picture, and control is spread out, so there is no single point of failure. That buys adaptability and parallel work, and costs coordination: who does what (task allocation), what messages look like (communication protocol), and who wins when goals or resources clash (conflict resolution). Warehouse robots that share position, load and route to avoid collisions need all three.

A single agent is simpler and faster, but one context window doing everything bloats and accumulates errors. The instructors' advice: give each agent one narrow job and a small context, and connect them through deterministic event buses rather than open-ended chat between models.

- Reflex: fixed condition-action rules on what it sees now. A thermostat. No memory.
- Model-based: rules plus an internal map of its world. A robot vacuum that remembers what it has cleaned.
- Goal-based: picks actions that bring it closer to a target. A self-driving car rerouting around roadworks.
- Utility-based: scores outcomes to balance trade-offs. A trading system weighing return against risk.
- Learning: improves from experience. AlphaGo getting stronger through self-play.

| Design choice | Option A | Option B |
|---|---|---|
| Control | Centralised: one controller, like a ground station steering a drone fleet. Easy to monitor; a single point of failure and a bottleneck | Decentralised: drones share data and adjust locally. Scales and survives failures, harder to debug |
| Team make-up | Homogeneous: identical crop-scanning drones. Easy to deploy, less flexible | Heterogeneous: aerial drones, soil robots and weather sensors. Richer results, harder to integrate |
| Conflict rule | Negotiation, or a predefined protocol | Auction: cars bid for right of way at a junction |

:::callout Field note
Traditional software follows instructions; generative AI produces text; agentic AI pursues an objective. An agent without an explicit success metric cannot tell when it is done, so write down the measure that ends its loop.
:::

## Open or closed model

Open models such as Meta's Llama family and DeepSeek-R1 (early 2025, some of its benchmark claims later disputed) have narrowed the gap with closed ones such as OpenAI's GPT models, Google's Gemini and Anthropic's Claude. The best closed models still tend to lead on complex reasoning; a fine-tuned open model can win on a narrow domain, and open models can match them on everyday writing.

Free to download is not free to run. Some hosted Llama deployments cost about $0.60 per million input tokens and $0.70 per million output, but set-up, tuning, hosting and upkeep are yours. There is no universally better side, only the better fit, and many organisations will mix both across their stack.

| Factor | Open source | Closed source |
|---|---|---|
| Customisation | Full: inspect, fine-tune, modify; community fixes | What the vendor exposes; you wait for its updates |
| Cost | No licence, but set-up, training, hosting and staff | Licence or usage fees; more predictable, support included |
| Security and data | Auditable; can run in your private cloud under your rules | Code and data stay with the vendor; manage what you send |
| Skills needed | Strong in-house team, forums for support | Usable off the shelf |
| Strategic edge | Models tailored to your domain | Access to proprietary advances |

## Where it runs

Cloud infrastructure is the backbone of enterprise agents, and forecasts put agentic AI in about a third of enterprise software by 2028. AWS, Azure and Google Cloud offer the three capabilities agents need: auto-scaling compute for variable load, GPU clusters for heavy reasoning, and memory-optimised machines for long contexts.

- Serverless (the provider runs the servers, you pay per execution) suits event triggers and occasional jobs. Containers (your code and its dependencies, isolated) suit agents that run all the time and add isolation. Most teams combine both.
- Cloud plus edge: train, analyse and orchestrate in the cloud; decide locally where latency, privacy or offline work matter. A shop agent adjusts prices on the spot while the cloud watches the wider market.
- Cost: hyperscalers spend hundreds of billions a year on capacity, so watch yours. Tier storage, archive old agent logs automatically, and cut traffic between regions.
- Example: NTT DATA describes agent services spread over AWS, Azure and Google Cloud, with Kubernetes containers, serverless triggers, edge nodes and central monitoring. It reports 40 % lower operating costs, 60 % faster customer-service responses, 99.9 % uptime and room for ten times the load at peaks.

:::takeaways
- Compare platforms on coordination, data sovereignty and control, not on feature lists.
- The model is a stateless wizard. Deterministic code holds the state, the order of steps and the rules.
- Vibe coding gets you a prototype. Devibing and a harness of invariants, sandboxes, benches and gates get you to production.
- Choose topology, model and hosting per workflow: narrow agents, open or closed by data rules and skills, serverless and containers where each fits.
:::

:::check
A team vibe-coded an invoice-reading agent in an afternoon. It works on the demo files. Next month it will post invoices straight into the accounting system. What should be added first?

- [ ] a. A firmer prompt: “always return valid JSON and never post an amount above €10,000”
- [ ] b. A second agent that reviews the first agent's output before posting
- [x] c. Schema and rule checks in code, a bench of tricky invoices, and a hand-over to a person when a check fails
- [ ] d. A move to an open-source model hosted in-house

### Hint a

A rule in the prompt is a wish. The model will follow it most of the time, and nothing stops the rest.

### Hint b

A reviewer model is still probabilistic. It can help, but it adds cost and latency and guarantees nothing.

### Hint d

Hosting changes where data goes and what you pay. It does not make the output any more reliable.

### Explanation

Right. Deterministic checks reject what breaks the rules, the bench proves it on cases you chose, and the hand-over keeps a person on what the harness cannot settle. That is devibing in practice.
:::
