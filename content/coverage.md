# Content coverage

Maps every chapter of the course source (`RAW_content/02_Modules/`) to the unit that covers it.
Units: H = History (module 1 only), C = Concept, CS = Case study, L = Lab, D = Deliverable. Example: `3.L` = module 3, Lab. App module N covers MIT module N (decision 0007).
Rebuilt 2026-11-11: every lesson rewritten from the source, module by module; facts, cases and figures not found in the module's source files were removed. Update this file when a lesson changes its scope.

## Excluded everywhere

Course administration and navigation (welcome, learning outcomes, activities, support, navigation guide), videos as such (their ideas are used where relevant), optional forums, knowledge-check quizzes, feedback and final surveys, Captain's Log, Q&A boards, reference lists (used only to cite post-mortem sources), glossaries (terms are used), wrap-ups with no new content, assignment submission and grading rules, examples tied to one specific learner's capstone. `02_Modules1-5.zip` is an older copy of modules 1 to 5.

## Thread across modules

One candidate workflow, chosen in 1.D, is carried through every deliverable; 8.D (personal project: adoption plan) assembles them: 1 candidate workflow and cost estimate, 2 platform and architecture, 3 integration plan, 4 security memo (NIST CSF 2.0), 5 Minimum Viable Agent design plan, 6 4D KPI scorecard and Crawl-Walk-Run rollout, 7 governance plan, 8 mailroom map and adoption plan.

## Module 1 · Foundations & the token meter

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Module content overview | 1.C intro |
| Complete | 1. Uses of generative AI (text, audio, image, video, code, speech) | 1.C (use cases, pipelines) |
| Complete | 1. Machine learning, neural networks, deep learning, GANs | 1.C (under the hood, three engines) |
| Complete | 1. LLMs, transformers, training stages | 1.C (under the hood) |
| Complete | 1. How an LLM works (vectors, intent) | 1.C |
| Complete | 1. Prompt engineering | 1.C (callout) |
| Complete | 1. Brief history of AI (Turing to LangChain) | 1.H (Turing quote and test, full timeline 1956 to 2023) |
| Complete | 2. Evolution of chatbots | 1.H (generations table) |
| Complete | 2. Reasoning models, chain-of-thought, hallucination | 1.C (loop section) |
| Complete | 2. Video 1.2 chain-of-thought demo (planner, writer, critic) | 1.C (loop section) |
| Complete | 2. Agentic AI definition and use cases | 1.C |
| Complete | 2. Strategic applications: Klarna, Octopus Energy | 1.CS (Klarna), 1.C (Octopus Energy) |
| Complete | 3. Cost-optimized models, minivan analogy | 1.C (minivan section) |
| Complete | 3. What creates cost (compute, tokens, energy), worked example | 1.C (token meter), 1.C check |
| Complete | 3. Performance trade-offs (accuracy, speed, context) | 1.C (minivan section) |
| Complete | 3. How to navigate the trade-offs (five questions) | 1.C |
| Complete | 3. Video 1.3 cost demo (model price gap, usage page) | 1.C, 1.L |
| Complete | Assignment 1.1: evaluating the cost of AI systems | 1.L, 1.D §4–6 |
| Complete | 4. Audio: ASR, TTS, NLU, voice biometrics | 1.C (Perceive in production) |
| Complete | 4. Combinations of technologies by sector | 1.C (sector table) |
| Complete | 4. Audio logistics (real time vs batch, languages, customization) | 1.C |
| Complete | 4. Data privacy and compliance (GDPR, CCPA, HIPAA, LGPD, risk table) | 1.C (compliance callout), 1.D (consent note) |
| Complete | 4. Recommended reading (Duolingo) | excluded: reading link |
| Complete | 4. Image generation by industry | not covered: overlaps the use cases already given |
| Complete | 4. Underlying technologies: GANs, diffusion, transformers | 1.C (three engines) |
| Complete | 4. What this means for development (hybrids) | 1.C |
| Complete | 4. Workflows and bottom lines (API, open source, fine-tuned) | 1.C (TCO table) |
| Complete | 5. Tool landscape | not covered: product catalogue; examples used in 1.C |
| Complete | 5. Case study: Amarra | 1.C (bullet) |
| Complete | 5. The coming wave of agentic AI | 1.C intro |
| Complete | 1. Conclusion (from generative to agentic) | 1.H (closing section) |
| Complements | Executive summary and module delta | 1.C |
| Complements | Arch 1. Minivan problem, tiered routing | 1.C (tier table), 1.L |
| Complements | Arch 2. Hallucination paradox, validation gates, selective HITL | 1.C (callout), 1.L (Reflect check) |
| Complements | Arch 3. Reactive generation to agentic loops (state table) | 1.C (chatbot / RAG / agent table) |
| Complements | Multimodal 1. Pipelines by industry | 1.C (sector table) |
| Complements | Multimodal 2. Voice biometrics and recording consent | 1.C (compliance callout), 1.D |
| Complements | Case studies: Klarna, Octopus Energy | 1.CS, 1.C |
| Complements | Cost engineering 1. Hidden OpEx drivers | 1.C (hidden costs), 1.L (tool tax), 1.D |
| Complements | Cost engineering 2. TCO: API vs open source vs fine-tune | 1.C (TCO table) |
| Complements | Instructor perspectives | 1.C |
| Complements | Assignment 1.1 and capstone guidance | 1.C check, 1.D |
| Complements | Key synthesis checklist | 1.D checklist, 1.C |

## Module 2 · Platforms & the harness

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Intro and Video 2.1 (platforms, vibe living, single vs multi, open source, cloud) | 2.C |
| Complete | 1. Emerging agentic platforms (open vs closed; LangChain, CrewAI, Ollama, Codex, n8n; comparison) | 2.C, 2.CS (Ollama) |
| Complete | Video 2.2 Match the right agent to the problem | 2.C, 2.D §1 |
| Complete | Optional Forum 2.1 AI Platforms | excluded: forum (its question is reused in 2.D) |
| Complete | 2. Vibe coding and vibe living (Karpathy, YC 95 %, benefits, enterprise considerations, tools, future) | 2.C, 2.D §8 |
| Complete | Required Assignment 2.1 Vibe Coding and Video 2.4 | 2.L |
| Complete | 3. Single vs multi-agent (agent types, MAS traits, coordination, centralised vs decentralised, homogeneous vs heterogeneous, conflict resolution) | 2.C, 2.D §3 |
| Complete | 4. Open vs closed (Llama, DeepSeek-R1, six factors, pricing, mixed approach) | 2.C, 2.D §5 |
| Complete | Optional Forum 2.2 Open-source vs proprietary | excluded: forum |
| Complete | 5. Cloud infrastructure (compute, serverless vs containers, cloud-edge, NTT DATA, cost optimisation) | 2.C, 2.D §6 |
| Complete | 5. "Did you know": self-managing infrastructure | not covered: side note |
| Complements | Agent-and-Wizard architecture | 2.C |
| Complements | "Reasoning is not a workflow" | 2.C, 2.D §2 |
| Complements | Commodity intelligence economics | 2.C |
| Complements | Devibing imperative | 2.C, 2.L, 2.D §8 |
| Complements | Harness engineering | 2.C, 2.L, 2.D §7 |
| Complements | Three governing questions and platform matrix | 2.C, 2.CS lessons, 2.D §4 |
| Complements | Instructor perspectives | 2.C |
| Complements | Assignment 2.1 guidance (no feature lists, data sovereignty, failure modes) | 2.D |
| Complements | Capstone connection | 2.D (generalised, points to module 8) |
| Complements | Synthesis checklist | 2.D checklist |

## Module 3 · The universal plug

| Source | Chapter | Covered by |
|---|---|---|
| Complete | 1. Playlist vs live band; what agents do for business | 3.C intro, 3.C §2 |
| Complete | 1. Tools and meta-tools; Slack, Notion, Discord | 3.C §3, 3.D §1 |
| Complete | 1. Automation tools (Zapier, n8n, LangChain, Python) | 3.C §3 (spectrum table) |
| Complete | 1. Human in the loop; accidents (Knight Capital, hiring bias, Optus) | 3.CS (Knight Capital), 3.C §3 callout (Optus, résumé bias) |
| Complete | 1. Strategies for safe deployment | 3.CS lessons, 3.D §4 |
| Complete | 2. Video 3.2 (Discord integration) | 3.C §3, 3.D §1 |
| Complete | 2. Legacy constraints, API evolution, data compatibility, performance | 3.C §1, 3.C §4 (legacy table) |
| Complete | 2. Organizational considerations, middleware, best practices (pilots, data prep, local vs cloud, mTLS, RBAC, logging) | 3.C §4, 3.D §3–4 |
| Complete | 3. MCP, edge cases, intent-based interaction, Spotify example | 3.C §1, 3.C §7, concept quiz, 3.L |
| Complete | 3. Expanding MCP (Salesforce, WordPress, Google Workspace, Figma), strategic implications | 3.C §7 |
| Complete | Optional Forum 3.1 | excluded: forum (its use-case questions feed 3.D §2–3) |
| Complete | 4. Empathy, fine-tuning techniques (SFT, instruction tuning, RLHF, DPO, PEFT) | 3.C §5 (tone table) |
| Complete | 4. Building empathy, telecom example, business impact, challenges | 3.C §5, 3.D §5 |
| Complete | 4. Future outlook (multimodal, proactive, adaptive) | not covered: speculative |
| Complete | 5. IoT architecture, coordination models, security and scalability | 3.C §6 |
| Complete | 5. Industrial IoT example | 3.C §6 (flagged as reported figures) |
| Complete | 5. Walmart smart store, Nest aside | not covered: vendor-reported figures; architecture kept |
| Complete | Assignment 3.1 (email proposal, six questions) | 3.D |
| Complete | Optional Discord bot assignment | replaced by 3.L (MCP server, Lab 2) |
| Complements | Executive summary and module delta | 3.C |
| Complements | MCP: N × M problem, host/client/server, intent (SKU-409), edge cases | 3.C §1, 3.C §7, concept quiz, 3.L, 3.D §3 |
| Complements | Legacy: three monolith barriers, computer-use as last resort | 3.C §4, 3.D §3 |
| Complements | Automation tool spectrum | 3.C §3 |
| Complements | Knight Capital and mandatory safeguards | 3.CS, 3.L (ceiling, breaker, kill switch), 3.D §4 |
| Complements | Instructor perspectives | 3.C intro, 3.C §4–5, 3.D §3 and checklist |
| Complements | Assignment 3.1 guidance (middleware, failure paths, least privilege) | 3.D §3–4, 3.D checklist |
| Complements | Capstone integration | 3.D purpose (feeds module 8) |
| Complements | Key synthesis checklist | 3.D checklist, 3.L |

## Module 4 · Threats & NIST

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Videos 4.1, 4.2 (overview, disinformation) | 4.C (attack cost falls while defence cost rises; social engineering) |
| Complete | 1. Classic era, Lisa Mendez case | 4.C |
| Complete | 1. Deepfakes (Musk ads, Biden robocall), CEO deepfake scenario | 4.C |
| Complete | 1. Impersonation (2019 voice clone, Hong Kong video call) | 4.C, 4.CS |
| Complete | 1. Prompt injection (Bing/Sydney, Imprompter) | 4.C, 4.L |
| Complete | 2. Cyber Kill Chain, AI examples, Lisa mapping, defences per phase | 4.C, 4.CS |
| Complete | 2. NIST CSF functions and sub-categories (ID, PR, DE, RS, RC) | 4.C, 4.D |
| Complete | Required Assignment 4.1 and NIST survey | 4.D |
| Complete | 3. Power of perception, six perception limits | 4.C |
| Complete | Video 4.3 in-context learning / RAG | 4.C (one sentence) |
| Complete | 3. Deloitte 2024 barriers | 4.C |
| Complete | 3. Hallucinations: CareBot scenario | not covered: fictional scenario, a real figure used instead |
| Complete | 3. Hallucination cases (BHM, Air Canada, NYC MyCity, Whisper, Heat Index) | 4.C |
| Complete | 3. Bias cases (iTutorGroup, SafeRent) | 4.C |
| Complete | 3. UnitedHealth nH Predict | not covered: allegation only, no figures |
| Complete | 3. Safeguards, agentic errors, mitigation strategies | 4.C |
| Complete | 4. Blockchain: provenance, decentralised identity | 4.C, 4.L (hash chain), 4.D §8 |
| Complete | 4. JPMorgan Chase blockchain-AI example | 4.C (callout) |
| Complete | 4. Smart contract governance, security and performance | 4.C |
| Complements | Executive summary, defender's dilemma, SOC latency | 4.C |
| Complements | Prompt injection taxonomy, linguistic boundary dilemma | 4.C, 4.L |
| Complements | Breach anatomy: Lisa Mendez | 4.C |
| Complements | Breach anatomy: Hong Kong deepfake, UK voice clone | 4.CS |
| Complements | NIST CSF 2.0 mapping (Govern to Recover, dual prompt, least privilege, deterministic assertions, canary, circuit breaker, rollback) | 4.C, 4.L, 4.D |
| Complements | Instructor perspectives | 4.C (one quote); other opinion quotes not covered |
| Complements | Assignment 4.1 guidance (specific threats, CSF mapping, spending ceiling) | 4.D |
| Complements | Capstone integration (one learner's example) | excluded: tied to one learner's capstone |
| Complements | Key synthesis checklist | 4.L, 4.D |

## Module 5 · Agents at work

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Intro and Video 5.1 (agents by function, architecture, browsers, consultants) | 5.C |
| Complete | 1. AI maturity cycle (Video 5.2, stages 1 to 5) | 5.C, 5.L |
| Complete | 1. Shadow AI (CybSafe/NCA survey, mitigation by policy, technology, culture) | 5.C, 5.CS |
| Complete | 1. Crawl, walk, run | 5.C (introduced; developed in 6.C) |
| Complete | 2. Product development lifecycle (phases; generative and agentic cases; advantages, impact, getting ready) | 5.C |
| Complete | Required Assignment 5.1: AI and the design process | 5.L, 5.D |
| Complete | 3. Agents by business function (HR, finance, IT, ROI figures) | 5.C |
| Complete | 4. Health care (Video 5.3, decision support, imaging, personalised care, operations) | 5.C |
| Complete | 5. Browsers (Edge, Arc, Brave, Chrome DevTools; leakage, misinformation, overreliance) | 5.C, 5.CS |
| Complete | 6. Centralized vs embedded (AskNova, marketing team, comparison table, HIPAA, hybrid, maturity mapping) | 5.C, 5.L |
| Complete | Optional Forum 5.1: centralized vs embedded | 5.L (architecture step) |
| Complete | 7. Consultants and BPO (Video 5.4, market, legacy limits, cost drop, re-engineering) | 5.C |
| Complete | Optional Forum 5.2: AI-enabled BPO | 5.C (BPO section) |
| Complements | 5-stage maturity cycle | 5.C, 5.D |
| Complements | Function-by-function deployment (marketing, sales, supply chain, HR and EU AI Act Annex III) | 5.C |
| Complements | Prompt coupling fragility (schemas, model tiering, immutable step logs) | 5.C |
| Complements | Minimum Viable Agent (TPS/Kaizen, value equation, 20 % override threshold) | 5.C, 5.L, 5.D |
| Complements | Instructor perspectives | 5.C, 5.L |
| Complements | Assignment 5.1 guidance (data sources, platform, KPI, human-in-the-loop limits) | 5.L, 5.D |
| Complements | Capstone integration | 5.D |
| Complements | Learner's own capstone example (Agentforce) | not covered: specific to one learner |
| Complements | Synthesis checklist | 5.L (critique prompt), 5.D |

## Module 6 · From pilot to practice

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Introduction, Video 6.1 (last mile, voice agents, module outline) | 6.C |
| Complete | 1. Voice agents: Video 6.2, definition, healthcare uses, clinic case, lessons learned | 6.C, 6.L |
| Complete | 1. Beyond fiction: Cencora / Infinitus Eva | 6.C, 6.CS (counter-example) |
| Complete | 2. Last-mile integration: pilot purgatory, MLOps, data issues | 6.C |
| Complete | 2. Why pilots succeed (narrow scope, sandbox, metrics, 6–12 weeks) | 6.C |
| Complete | 2. Why deployments stall (integration, ROI clarity gap, gradual onboarding, compute cost) | 6.C, 6.CS |
| Complete | 2. Examples: Amazon hiring tool | 6.C (developed in 8.CS) |
| Complete | 2. Examples: IBM Watson Health | 6.CS |
| Complete | 2. Key strategies for last-mile integration, conclusion | 6.C |
| Complete | 2. Quote, recommended videos | not covered: decorative / external media |
| Complete | 3. Internal resistance (psychological, organisational, technical and governance barriers) | 6.C |
| Complete | 3. ADKAR, Kotter 8 steps, transparency | 6.C, 6.D |
| Complete | 3. Change strategies and sustainable change, measuring | 6.C, 6.D |
| Complete | 4. Monitoring: performance dimensions, KPI categories, clinic KPIs | 6.C, 6.L, 6.D |
| Complete | 4. Feedback loops (user, system, operational) and maturity | 6.C, 6.D |
| Complete | 4. Challenges and strategies, 15 % action threshold | 6.C, 6.L |
| Complete | Required Assignment 6.1: KPIs for AI | 6.D |
| Complete | Optional Forum 6.1: KPI Brainstorm | excluded: forum (its idea is folded into 6.D) |
| Complements | Executive summary and delta table | 6.C |
| Complements | 1. Why AI pilots stall (input entropy, silent sabotage, governance vacuum) | 6.C |
| Complements | 2. Law of process decomposition | 6.C, 6.L |
| Complements | 3. Proven loops into deterministic scripts | 6.C, 6.L |
| Complements | 4D agent KPI framework | 6.C, 6.L, 6.D |
| Complements | Structured JSON telemetry | 6.C, 6.L, 6.D |
| Complements | Crawl-Walk-Run (85 % confidence floor, circuit breakers) | 6.C, 6.L, 6.D |
| Complements | Agile-team assistant case | 6.C |
| Complements | Instructor perspectives | 6.C |
| Complements | Assignment 6.1 and capstone guidance | 6.C, 6.D |
| Complements | Key synthesis checklist | 6.L, 6.D |

## Module 7 · Guardrails, governance & evals

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Intro, Video 7.1 (regulation, testing, speed vs oversight, documentation) | 7.C intro |
| Complete | 1. GDPR (principles, data subject rights, relevance to agents, fines) | 7.C (three laws table, architecture section), 7.D §2–3 |
| Complete | 1. CCPA (opt-out, minors, rights, fines), GDPR vs CCPA consent | 7.C (three laws table), 7.D §2 |
| Complete | 1. HIPAA (five rules, objectives, covered entities and BAAs, penalties, relevance to agents) | 7.C (three laws table), 7.D §2 |
| Complete | 1. Mayo Clinic example | 7.C (callout) |
| Complete | 2. Sandboxing (NVIDIA/Pyodide, Salesforce anonymised CRM data, fraud example) | 7.C (testing section), 7.D §6 |
| Complete | 2. A/B testing (50/50 split, one variable at a time, prompt versioning, e-commerce example) | 7.C (testing section), 7.D §6 |
| Complete | 2. Safety checks (Gemini filters, Einstein Trust Layer, human-in-the-loop, adversarial, LLM-as-a-judge) | 7.C (testing and evals sections) |
| Complete | 2. Integrated testing pipeline (5 gates) | 7.C (gate table), 7.D §6 |
| Complete | 3. Speed vs oversight, finance analogy, compliance vs operational risk | 7.C, 7.D §10 |
| Complete | 3. Manual, automated and hybrid oversight; GDPR/HIPAA/CCPA/internal assistant examples | 7.C |
| Complete | 3. Risk and speed quadrants | 7.C (quadrant table), 7.D §4 |
| Complete | 3. Testing guardrails (functional, compliance, adversarial, scenario), ongoing monitoring | 7.C (testing section), 7.L Part A |
| Complete | 4. Purpose of documentation, four core documentation types | 7.C (documentation section), 7.D §9 |
| Complete | 4. Compliance readiness (gap analysis, mock audits, cross-functional reviews, version control) | 7.C, 7.D §9 |
| Complete | 4. Balancing documentation with speed | 7.C (documentation section) |
| Complete | 4. DoNotPay failure, FAIRLY AI success | 7.CS |
| Complete | Assignment 7.1: Governance Plan | 7.D |
| Complete | Optional Forums 7.1, 7.2 | excluded: forums (quadrant classification reused in 7.D §4) |
| Complements | Executive summary and module delta | 7.C intro |
| Complements | Hard vs soft guardrails (ingress, schema, PII masking, PEPs) | 7.C (guardrails section, check question), 7.L Part A, 7.D §5 |
| Complements | Audit trail, the 2 pm readiness test, telemetry taxonomy, human overrides | 7.C (audit trail section), 7.L (decision log), 7.D §8 |
| Complements | GDPR Art. 17 in vector stores, cryptographic shredding | 7.C (architecture section), 7.D §3 |
| Complements | Golden datasets (200–500 cases, 60/25/15 mix), RAGAS metrics | 7.C (evals section), 7.L Part B, 7.D §7 |
| Complements | Instructor perspectives | 7.C (callouts, evals and documentation sections) |
| Complements | Assignment 7.1 guidance | 7.D §2, §7 |
| Complements | Capstone integration | 7.D purpose (feeds module 8); learner-specific example excluded |
| Complements | Key synthesis checklist (incl. DPA and zero-retention vendor terms) | 7.D checklist, 7.C callout |
| Master curriculum | EU AI Act risk tiers, NeMo Guardrails | 7.C (kept short) |

## Module 8 · Ethics & personal project

| Source | Chapter | Covered by |
|---|---|---|
| Complete | Introduction and Video 8.1 (the capstone's eight elements) | 8.C, 8.D |
| Complete | 1. Why ethics comes last, why AI ethics differs | 8.C |
| Complete | 1. Core ethical principles (fairness, transparency, accountability, privacy) | 8.C |
| Complete | 1. Workforce disruption (ATMs, spreadsheets, Commonwealth Bank, Hungry Jack's, hybrid reality, reskilling) | 8.C, 8.L |
| Complete | 1. Business risks: biased hiring (Amazon) | 8.CS |
| Complete | 1. Business risks: deepfakes, healthcare liability | 8.C |
| Complete | 1. Decision frameworks (do no harm, stakeholder impact, front-page test) | 8.C, 8.L, 8.D |
| Complete | 1. Model card | 8.C, 8.CS, 8.D |
| Complete | 1. Ethics and corporate leadership (Partnership on AI) | 8.C |
| Complete | 1. Global and cultural perspectives | 8.C |
| Complete | 1. Recommended video | not covered: title only, no content |
| Complete | Optional Forum 8.1 | 8.D §7.3 prompts; forum logistics excluded |
| Complete | 1. Conclusion: ethics as the bridge to the capstone | 8.D |
| Complete | 2. The Capstone: introduction, keep in mind, module summaries | 8.C, 8.D |
| Complete | Required Assignment 8.1 (instructions) | 8.D |
| Complete | Wrap-up | 8.C takeaways |
| Complements | Module 8 delta table | 8.C |
| Complements | Enterprise capability gap | 8.C, 8.D (summary, checklist) |
| Complements | Hyperscaler capex and power limits | 8.C callout |
| Complements | Multi-agent orchestration: supervisor and shared artifact | 8.C, 8.D §2 |
| Complements | Mailroom Metaphor and the operational ethics framework | 8.C, 8.L, 8.D §7.3 |
| Complements | Capstone masterclass: grading, resubmission | excluded: grading rules |
| Complements | The 8 mandatory capstone sections and their fatal errors | 8.C (table), 8.D |
| Complements | One learner's capstone example | not covered: specific to one learner; its consistency rule kept in 8.D |
| Complements | Key synthesis checklist | 8.D checklist |

