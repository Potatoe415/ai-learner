# Content coverage

Maps every chapter of the course source (`RAW_content/02_Modules/`) to the lesson step that covers it.
Steps: C = Concept, PM = Post-mortem, L = Lab, D = Deliverable. Example: `4.C` = level 4, Concept.
Built 2026-11-11 (task module-lessons, decision 0005). Update this file when a lesson changes its scope.

## Excluded everywhere

Course administration and navigation (welcome, learning outcomes, activities, support, navigation guide), videos as such (their ideas are used where relevant), optional forums, knowledge-check quizzes, feedback and final surveys, Captain's Log, Q&A boards, reference lists, glossaries (terms are used), wrap-ups with no new content, assignment submission and grading rules, examples tied to one specific learner's capstone. `02_Modules1-5.zip` is an older copy of modules 1 to 5.

## Level to module

| Levels | Module |
|---|---|
| 0, 1, 2 | 1 |
| 3 | 2 |
| 4 | 3 |
| 5 | 4 |
| 6, 7 | 7 |
| 8 | 5 |
| 9 | 6 |
| 10 | 8 |

## Module 1

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Module content overview | 0.C intro |
| Complete | 1. Uses of generative AI (text, audio, images, video, code, speech) | 0.C (where agents show up), 1.C (perception pipeline) |
| Complete | 1. Machine learning foundations, neural networks, deep learning, GANs | 0.C, 1.C (three engines) |
| Complete | 1. LLMs, transformers, training stages | 0.C (what a language model does) |
| Complete | 1. How an LLM works (vectors, intent) | 0.C |
| Complete | 1. Prompt engineering | 0.L (plan prompt), 1.L |
| Complete | 1. Brief history of AI (Turing to LangChain) | 0.C (four generations, ELIZA) |
| Complete | 2. Evolution of chatbots (rule-based, conversational, generative) | 0.C (four generations table) |
| Complete | 2. Reasoning models, chain-of-thought, hallucination | 1.C (Reason), 1.PM |
| Complete | 2. Chain-of-thought demo (planner, writer, critic) | 0.L |
| Complete | 2. Agentic AI definition and use cases | 0.C (what changes with an agent) |
| Complete | 2. Strategic applications: Klarna, Octopus Energy | 0.PM (Klarna), 2.PM (Octopus Energy) |
| Complete | 3. Cost-optimized models, minivan analogy | 2.C |
| Complete | 3. What creates cost (compute, tokens, energy) | 2.C |
| Complete | 3. Performance trade-offs (accuracy, speed, context) | 2.C (trade-off table) |
| Complete | 3. How to navigate the trade-offs (five questions) | 2.C, 2.D |
| Complete | 3. Cost-optimized demo (model price gap) | 2.C (factor of 250) |
| Complete | Assignment 1.1: evaluating the cost of AI systems | 2.L, 2.D |
| Complete | 4. Audio: ASR, TTS, NLU, voice biometrics | 1.C (Perceive) |
| Complete | 4. Combinations of technologies by sector | 1.C (sector table) |
| Complete | 4. Audio logistics: real time vs batch, languages, customization | 1.C (real time or batch) |
| Complete | 4. Data privacy and compliance (GDPR, CCPA, HIPAA, LGPD, risk table) | 1.C (compliance callout), 1.D (consent and retention) |
| Complete | 4. Recommended reading (Duolingo) | excluded: reading link; workforce change covered in 10.C |
| Complete | 4. Image generation by industry | 0.C (where agents show up) |
| Complete | 4. Underlying technologies: GANs, diffusion, transformers | 1.C (three engines) |
| Complete | 4. What this means for development (hybrids) | 1.C |
| Complete | 4. Workflows and bottom lines (API, open source, fine-tuned) | 2.C (buy, host or fine-tune) |
| Complete | 5. Tool landscape: image, audio, text, video products | 1.C, 2.C (tiers); product catalogue not reproduced |
| Complete | 5. Case study: Amarra | not covered: vendor-reported figures, Klarna and Octopus already cover the pattern |
| Complete | 5. The coming wave of agentic AI | 0.C |
| Complements | Executive summary and module delta | 0.C, 2.C |
| Complements | 1. Model sizing: the minivan problem, tiered routing | 2.C (route by difficulty), 2.L |
| Complements | 2. Reasoning models and the hallucination paradox | 1.C (Reason), 1.PM, 1.L (Reflect check) |
| Complements | 3. Reactive generation to agentic loops (state table) | 0.C (chatbot, RAG, agent table) |
| Complements | Multimodal 1. Pipelines by industry | 1.C (sector table) |
| Complements | Multimodal 2. Voice biometrics and recording consent | 1.C (compliance callout), 1.D |
| Complements | Case studies: Klarna, Octopus Energy | 0.PM, 2.PM |
| Complements | Cost engineering 1. Hidden OpEx drivers | 2.C (costs not on the calculator), 2.L |
| Complements | Cost engineering 2. TCO: API vs open source vs fine-tune | 2.C |
| Complements | Instructor perspectives | 2.C (input vs output rates, latency field note), 1.C |
| Complements | Assignment 1.1 and capstone guidance | 2.D (feeds the capstone cost section) |
| Complements | Key synthesis checklist | 2.D checklist |

## Module 2

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Module content overview | 3.C intro |
| Complete | 1. Emerging agentic platforms, open vs closed definition | 3.C |
| Complete | 1. Matching the agent to the problem | 3.C (platform table), 3.D §3–4 |
| Complete | 1. LangChain, CrewAI, Ollama (incl. CVE-2024-37032), Codex, n8n, comparison | 3.C (platform table, local-is-not-safe callout), 3.L optional step |
| Complete | 2. Vibe coding, vibe living, promise, benefits | 3.C |
| Complete | 2. Enterprise adoption guidelines | 3.C |
| Complete | 2. Getting started tools | 3.C, 3.L step 1 |
| Complete | 2. Future of AI-assisted coding | 3.C, 3.PM |
| Complete | Assignment 2.1: vibe coding | 3.L step 1 |
| Complete | 3. Agent types, multi-agent systems | 3.C (one agent or a team) |
| Complete | 3. Protocols, coordination, centralised vs decentralised | 3.C, 3.D §2 |
| Complete | 3. Homogeneous vs heterogeneous, conflict resolution | 3.C (table), 3.D §2 |
| Complete | 4. Growth of open-source AI (DeepSeek-R1) | 3.C |
| Complete | 4. Choosing the right AI system (six factors, pricing) | 3.C, 3.D §4 |
| Complete | 5. Cloud infrastructure: serverless vs containers, hybrid cloud-edge | 3.C, 3.D §5 |
| Complete | 5. NTT DATA example, cost optimization | 3.C |
| Complete | 5. Self-managing infrastructure note | not covered: minor aside |
| Complements | Executive summary | 3.C |
| Complements | 1. Agent-and-wizard architecture | 3.C (the wizard and the robot) |
| Complements | 2. Reasoning is not a workflow | 3.C, 3.D §1 |
| Complements | 3. Commodity intelligence economics | 3.C |
| Complements | Devibing | 3.C, 3.L step 1, 3.C check |
| Complements | Harness engineering | 3.C, 3.L, 3.D §6 |
| Complements | Platform selection: three governing questions, comparative matrix | 3.C, 3.D §3 |
| Complements | Instructor perspectives | 3.C |
| Complements | Assignment 2.1 and capstone playbook | 3.D |
| Complements | Key synthesis checklist | 3.D checklist |

## Module 3

| Source | Chapter | Covered by |
|---|---|---|
| Complete | 1. Playlist vs live band; what agents do for business | 4.C intro, 4.C §1 |
| Complete | 1. Tools and meta-tools; Slack, Notion, Discord | 4.C (automation spectrum), 4.D |
| Complete | 1. Automation tools (Zapier, n8n, LangChain, Python) | 4.C (spectrum table) |
| Complete | 1. Human in the loop; accidents (Knight Capital, hiring bias, Optus) | 4.PM (Knight Capital), 4.C (Optus, résumé bias) |
| Complete | 1. Strategies for safe deployment | 4.PM lessons, 4.D |
| Complete | 2. Legacy constraints, data compatibility, performance | 4.C (legacy table) |
| Complete | 2. Organizational considerations, best practices (pilots, mTLS, RBAC, logging) | 4.C, 4.D |
| Complete | 3. MCP, intent-based interaction, Spotify example | 4.C §1 and MCP section, concept quiz, 4.L |
| Complete | 3. Expanding MCP (Salesforce, WordPress, Google Workspace, Figma), strategic implications | 4.C, 4.D |
| Complete | 4. Empathy, fine-tuning techniques (SFT, instruction tuning, RLHF, DPO, PEFT) | 4.C (tone table) |
| Complete | 4. Building empathy into agents, business impact, challenges | 4.C, 4.D §8 |
| Complete | 5. IoT architecture, coordination models, security and scalability | 4.C (IoT section) |
| Complete | 5. Walmart and industrial IoT examples, Nest aside | not covered: vendor-reported figures; architecture kept |
| Complete | Assignment 3.1: conceiving and programming agents | 4.D |
| Complete | Optional Discord bot assignment | replaced by 4.L (MCP server) |
| Complements | Executive summary | 4.C |
| Complements | MCP: N × M problem, host/client/server, intent, edge cases | 4.C, concept quiz, 4.L, 4.D |
| Complements | Legacy: monolith barriers, computer-use as last resort | 4.C, 4.D |
| Complements | Automation tool spectrum | 4.C |
| Complements | Knight Capital and mandatory safeguards | 4.PM, 4.L (ceiling, breaker, kill-switch), 4.D |
| Complements | Instructor perspectives | 4.C, 4.D checklist |
| Complements | Assignment 3.1 guidance, capstone integration | 4.D |
| Complements | Key synthesis checklist | 4.D checklist, 4.L |

## Module 4

| Source | Chapter | Covered by |
|---|---|---|
| Complete | 1. Classic and current cybersecurity risks, Lisa Mendez case | 5.C |
| Complete | 1. Deepfakes, impersonation (2019 voice clone, Hong Kong video call) | 5.C, 5.PM |
| Complete | 1. Prompt injection (Bing chat, Imprompter) | 5.C, 5.L |
| Complete | 2. Cyber Kill Chain, defences per phase | 5.C (kill chain table) |
| Complete | 2. NIST CSF functions and sub-categories | 5.C, 5.D |
| Complete | Assignment 4.1: AI risks and security plan | 5.D |
| Complete | 3. Perception limits (empathy, context, bias, hallucination, memory, reasoning) | 5.C |
| Complete | 3. Hallucination cases (Air Canada, NYC MyCity, Whisper) | 5.C |
| Complete | 3. Bias cases (iTutorGroup, SafeRent) | 5.C |
| Complete | 3. UnitedHealth case | not covered: litigation still open |
| Complete | 3. Safeguards, agentic errors, mitigation | 5.C |
| Complete | 4. Blockchain: provenance, decentralised identity, smart contracts, performance | 5.C, 5.L (hash-chained log), 5.D (audit trail) |
| Complete | 4. JPMorgan blockchain example | not covered: figures could not be verified; mechanisms kept |
| Complements | Executive summary, defender's dilemma | 5.C |
| Complements | Prompt injection taxonomy and vectors | 5.C, 5.L |
| Complements | Breach anatomy: Lisa Mendez, Hong Kong deepfake, UK voice clone | 5.C, 5.PM |
| Complements | NIST CSF 2.0 mapping (Govern to Recover) | 5.C, 5.L, 5.D |
| Complements | Instructor perspectives | 5.C, 5.L |
| Complements | Assignment 4.1 guidance, capstone integration | 5.D |
| Complements | Key synthesis checklist | 5.D checklist, 5.L |

## Module 5

| Source | Chapter | Covered by |
|---|---|---|
| Complete | 1. AI maturity cycle, stages 1 to 5 | 8.C, 8.D §3 |
| Complete | 1. Shadow AI and mitigation | 8.C callout, 8.PM |
| Complete | 1. Crawl, Walk, Run | 8.C, 8.D §3 (developed in 9.C) |
| Complete | 2. Product development lifecycle, generative and agentic examples | 8.C (two shared surfaces) |
| Complete | 2. Getting ready (people, tools, processes, mindset) | 8.C callout |
| Complete | Assignment 5.1: AI and the design process | 8.L, 8.D |
| Complete | 3. Agents by business function, success stories, ROI | 8.C (deployment matrix) |
| Complete | 4. Health care applications | 8.C (matrix) |
| Complete | 5. AI browsers and their risks (Samsung, Apple, JPMorgan) | 8.C, 8.PM |
| Complete | 6. Centralized vs embedded, hybrid, HIPAA example | 8.C, 8.D §6 |
| Complete | 7. Consultants and outsourcing (BPO) | 8.C callout, 8.D §6 |
| Complements | 5-stage maturity cycle | 8.C, 8.D §3 |
| Complements | Function-by-function deployment, EU AI Act for HR | 8.C, 8.L |
| Complements | Prompt-chain fragility | 8.C, 8.L, 8.D §5 |
| Complements | Minimum Viable Agent (value equation, 20 % override rule) | 8.C, 8.L, 8.D §7 |
| Complements | Instructor perspectives | 8.C, 8.D §6 |
| Complements | Assignment 5.1 and capstone guidance | 8.D |
| Complements | Key synthesis checklist | 8.L, 8.D checklist |

## Module 6

| Source | Chapter | Covered by |
|---|---|---|
| Complete | 1. Voice agents, clinic case, Cencora example | 9.C, 9.C check |
| Complete | 2. Pilot purgatory: why pilots succeed and deployments stall | 9.C |
| Complete | 2. Amazon hiring tool example | 9.C (developed in 10.PM) |
| Complete | 2. IBM Watson Health example | 9.PM |
| Complete | 2. Strategies for last-mile integration | 9.C |
| Complete | 3. Sources of resistance, ADKAR, Kotter, change strategies | 9.C, 9.D §5 |
| Complete | 4. Monitoring: performance dimensions, KPI categories, feedback loops, thresholds | 9.C, 9.L, 9.D |
| Complete | Assignment 6.1: KPIs for AI | 9.D |
| Complements | Why pilots stall at scale | 9.C |
| Complements | Process decomposition, proven loops to scripts | 9.C, 9.L, 9.D |
| Complements | 4-dimensional KPI framework, structured telemetry | 9.C, 9.L, 9.D |
| Complements | Crawl-Walk-Run model | 9.C, 9.L (stage gates), 9.D §4 |
| Complements | Agile-team assistant case | 9.C (anonymised) |
| Complements | Instructor perspectives | 9.C |
| Complements | Assignment 6.1 and capstone guidance | 9.D |
| Complements | Key synthesis checklist | 9.L, 9.D checklists |

## Module 7

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Intro: testing, guardrails, documentation | 6.C, 7.C |
| Complete | 1. GDPR, CCPA, HIPAA, Mayo Clinic example | 6.C, 6.D §3 |
| Complete | 2. Sandboxing, A/B testing, safety checks, integrated pipeline | 7.C, 7.D §5 |
| Complete | 3. Speed vs oversight, manual / automated / hybrid oversight, quadrants | 6.C, 6.D §5 and §7 |
| Complete | 3. Testing guardrails | 6.C callout, 6.L |
| Complete | 4. Documentation types, readiness practices, balance with speed | 7.C, 7.D §7 |
| Complete | 4. DoNotPay failure case | 7.PM |
| Complete | 4. FAIRLY AI and ISO 42001 success case | 7.C |
| Complete | Assignment 7.1: governance plan | 6.D, 7.D |
| Complements | Hard vs soft guardrails, PII masking, enforcement points | 6.C, 6.L, 6.D §6 |
| Complements | Audit trail, audit record fields, overrides | 7.C, 7.L, 7.D §6–7 |
| Complements | GDPR Article 17 vs embeddings, crypto-shredding | 6.C, 6.D §4 |
| Complements | Unit tests to RAGAS, golden dataset, CI gating | 7.C, 7.L, 7.D §1–2 |
| Complements | Instructor perspectives | 6.C, 7.C |
| Complements | Assignment 7.1 guidance | 6.D, 7.D |
| Complements | Synthesis checklist | 6.D, 7.D checklists |

## Module 8

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Intro: ethics and the capstone elements | 10.C, 10.D |
| Complete | 1. Why ethics comes last, why AI ethics differs | 10.C |
| Complete | 1. Core principles (fairness, transparency, accountability, privacy) | 10.C, 10.D |
| Complete | 1. Workforce disruption (ATMs, spreadsheets, CBA, Hungry Jack's) | 10.C, 10.L (workforce map), 10.D §5 |
| Complete | 1. Biased hiring (Amazon) | 10.PM |
| Complete | 1. Deepfakes, healthcare liability | 10.C |
| Complete | 1. Decision frameworks, model cards | 10.C, 10.D |
| Complete | 1. Leadership, global and cultural perspectives | 10.C |
| Complete | 2. The capstone, module summaries and connections | 10.D |
| Complete | Assignment 8.1: the capstone | 10.D |
| Complements | Enterprise capability gap, hyperscaler capex | 10.C |
| Complements | Multi-agent orchestration | 10.D §2 |
| Complements | Mailroom Metaphor and operational ethics | 10.C, 10.L, 10.D |
| Complements | Eight capstone sections and failure points | 10.C, 10.D |
| Complements | Key synthesis checklist | 10.D |
