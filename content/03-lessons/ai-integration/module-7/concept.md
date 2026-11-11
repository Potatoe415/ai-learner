---
kind: reading
based_on: content/01-extracted/02_Modules/Module_7_Complete.md, content/01-extracted/02_Modules/Module_7_Complements.md
based_on_hash: c3fe233eedc0
kicker: Concept · Privacy law, guardrails, evals, audit
title: Compliance means you can prove it
bubble: I keep watch at the gate. Let's see which rules are walls and which are only signs.
---
An agent that reads personal data and acts on it falls under privacy law from its first request. Regulators do not grade your good intentions: they ask for evidence. This module turns three privacy laws into design rules, shows where to put checks that nobody can talk their way past, how to test and score a system that never answers twice the same way, and what to record so you can answer for any decision it made. It is a design guide, not legal advice: have your reading confirmed by legal or your data protection officer.

## Three privacy laws, one design brief

GDPR, CCPA and HIPAA differ in who they protect and how consent works. Read side by side, they ask an agent for the same things: take only the data you need, say what you do with it, let people see and remove it, and keep evidence.

| | GDPR (EU, 2018) | CCPA (California, 2018) | HIPAA (US federal, 1996) |
|---|---|---|---|
| Who it covers | Anyone processing personal data of people in the EU, wherever the business sits; also governs transfers outside the EU/EEA | For-profit businesses that collect data on California residents and pass revenue or data-volume thresholds | Covered entities (health plans, clearinghouses, providers transmitting data electronically) and their business associates (billing, IT, storage), bound by a Business Associate Agreement (BAA) |
| Consent | Explicit opt-in to process personal data; no reuse for a new purpose without new consent | Opt-out of the sale of personal data; no sale of data on minors under 16 without consent | Limits on using or disclosing health data (PHI) without the patient's authorisation |
| Key rights | Access, rectification, erasure, restriction, objection, portability, an explanation of solely automated decisions | Know, access, delete, opt out of sale | Five rules: privacy, security (ePHI safeguards), breach notification, enforcement, transactions and code sets |
| Enforcement | National data protection authorities, plus private claims; fines up to 4 % of global annual revenue or €20 million, whichever is higher | California Attorney General; private action after data breaches; up to $7,500 per violation | Civil fines from $137 to over $2 million a year; criminal cases (DOJ) up to $250,000 and 10 years in prison |
| What it asks of the agent | Explainable decisions, data minimisation, a human route for decisions with significant impact, anonymisation or pseudonymisation, audit logs and impact assessments | An opt-out the agent respects, visibility of what is stored, control over sharing and monetisation | Attribute-based access that meets the minimum necessary standard, encryption, role-based access, immutable audit trails, BAAs with AI vendors |

:::callout AI can also help comply
Mayo Clinic uses AI to watch access to electronic health records and flag oddities, such as lookups outside normal hours or by staff with no need for that file. Monitoring like this turns the agent from a compliance risk into a compliance tool.
:::

## Where privacy law hits your architecture

Erasure is the classic trap. Under GDPR Article 17 a person can ask you to remove their personal data. In a retrieval (RAG) agent that data has been chunked, embedded and stored in a vector index, and purging a single vector can mean rebuilding the index.

- Keep raw personal data out of vector metadata: each vector points to an anonymised document ID, and the text lives in a store you control.
- Cryptographic shredding: encrypt each customer's chunks with a key of their own. When they ask for erasure, delete the key. The embedding may stay in the index, but the text behind it can no longer be recovered.
- Name a lawful basis for every purpose (GDPR Article 6) and write it down before you build.
- Plan access requests (Article 15): you must be able to find what the agent saw about one person. Your logs, masked, are part of that answer.
- In the EU, place the use case in an EU AI Act risk tier (the course summary lists unacceptable, high, limited and minimal) and note its transparency duties. Its Article 12 (traceability) and Article 14 (human oversight) come back in the audit trail below.

:::callout You stay the controller
An enterprise contract with a model provider does not move your GDPR or HIPAA liability onto them. They process data for you; you remain the controller. Check that their terms include a signed Data Processing Agreement and zero data retention, and, for health data, a BAA.
:::

## Speed vs oversight: think like a finance department

If any employee can buy anything, purchasing is fast and abuse is easy. If the CFO signs off on every box of paper clips, nothing goes wrong and nothing moves. Most firms approve small purchases at once and send large ones to a manager. For an agent, its decisions and actions are the spending, guardrails are the approval rules, and oversight is how those rules are enforced.

Two risks pull on the dial. Compliance risk is breaking a law, a regulation or a company policy. Operational risk is hurting the business through errors, slowness or poor service. Tight guardrails cut both but cost speed. Oversight can be manual (a person approves first), automated (code enforces the rule in real time, which needs rigorous testing) or hybrid: automated checks on routine volume, a human for risky or unusual cases.

- A GDPR-aware support bot answers product questions instantly, but pauses when someone asks for a copy of their data: it verifies identity and logs the request.
- A HIPAA-aware intake agent gathers general symptoms quickly, then switches to secure handling and alerts a human when medications or diagnoses come up.
- A CCPA-aware recommender suggests products at once, stores no more than it needs, and processes and verifies a deletion request immediately.
- An internal assistant gives the Q4 sales forecast without delay, and refuses or escalates “show me the CEO's personal emails”.

| | Low speed needed | High speed needed |
|---|---|---|
| High risk | Loan approvals, hiring decisions, regulatory filings. Manual oversight: errors cost more than delay | Real-time fraud detection, escalation in a medical emergency. Automated oversight in the path, human review afterwards through audits and logs |
| Low risk | Scheduling suggestions, drafting a quarterly report. Minimal oversight | Search autocomplete, product recommendations. Light oversight, periodic reviews |

## Soft vs hard guardrails

The first rule the MIT instructors insist on: a system prompt is a soft guardrail. Instructions, few-shot examples and constitutional guidelines shape tone and persona well, but they are probabilistic. A long conversation, a role-play or a jailbreak can bend them.

A hard guardrail is deterministic code that runs outside the model. It does not read the conversation, so it cannot be persuaded. Every rule with legal or financial weight needs one.

| Position in the loop | Guardrail | What it stops |
|---|---|---|
| Ingress (before the model) | Hard: input firewall with regex, schema and rate limits; injection signatures, unapproved character sets, velocity violations | Abuse and floods, before a single token is paid for |
| Prompt | Soft: system prompt, constitutional guidelines, examples | Off-tone or off-topic replies, most of the time |
| Egress (after the model) | Hard: strict schema on outputs and tool arguments (e.g. Pydantic); PII masking (e.g. Microsoft Presidio, AWS Comprehend) before data leaves your network | Wrong types, out-of-range values, invented categories, emails, phone numbers or Social Security numbers leaking |
| Tool call | Hard: a policy enforcement point, a proxy that checks the agent's OAuth scope before each write | An agent writing where its credentials should not reach |
| Human | Approval queue above a threshold | High-risk, irreversible or unusual actions |

:::callout Toolkits help, the principle stays
Frameworks such as NeMo Guardrails package these interceptors. Whatever you use, the test is the same: could a clever user talk the check out of firing? If yes, it is soft.
:::

## Test before you trust: sandbox, A/B, safety checks

No single method is enough. A release passes through stages, and each one catches a different kind of failure.

- Sandbox: run the agent isolated from production in virtual machines, containers or the browser. NVIDIA researchers ran model-written Python in a browser sandbox through Pyodide, relying on WebAssembly's security layers. Feed it masked or synthetic data that looks real (Salesforce recommends anonymised CRM data) and stack isolation layers. Example: a financial services firm plants known fraud patterns in synthetic transactions and checks the agent flags them without false positives.
- A/B test: randomly split users, often 50/50, between the current agent (control) and the new one (variant). Fix the success metric in advance, change one thing at a time (the prompt or the model), use proper statistics, and look at segments: a version can win on average and fail on edge cases. Rerun it at every prompt or model version. One e-commerce test of two recommenders ran two weeks on 10,000 users; the hybrid model won with a 15 % higher click-through rate.
- Safety checks: content filters (Google's Gemini blocks some content with non-configurable filters, and offers configurable ones for hate or harassment), trust layers such as Salesforce's Einstein Trust Layer that check privacy and accuracy, adversarial tests that play angry, confused or malicious users, LLM-as-a-judge audits, a human for critical or uncertain decisions, and real-time alerts on abnormal metrics or unauthorised data access.
- Test the guardrails too: functional tests (normal requests), compliance tests (every legal scenario), adversarial tests (try to break the rules), scenario tests (does the bot escalate when someone asks for their personal data?).

| Gate | To pass |
|---|---|
| 1 · Sandbox | Core tasks work on large synthetic data sets |
| 2 · Pilot A/B | A small cohort uses the variant; live metrics and human feedback hold up |
| 3 · Safety checks | Run continuously in both stages and block any rule violation |
| 4 · Human review | High-risk flagged cases are reviewed; the agent and the rules are both fixed |
| 5 · Full release | All criteria met, zero critical safety violations over a sustained window, sign-off from risk and compliance |

## Evals: golden datasets and RAGAS

A classic test asserts one exact result. An agent's output is probabilistic, and failures hide in the path: wrong tool, wrong argument, a skipped step. So you test tool calls one by one, then whole multi-turn trajectories, and you score answers against a fixed ruler: the golden dataset, a version-controlled set of 200 to 500 validated cases.

- RAGAS scores retrieval-augmented answers on four metrics. Faithfulness: are the answer's claims supported by the retrieved context (supported claims divided by all claims)? Answer relevance: does it answer the question without padding? Context precision: is the right chunk at the top? Context recall: did retrieval bring everything needed?
- Low faithfulness points at the model inventing; low recall or precision points at the retriever. The split tells you what to fix.
- Set thresholds before you look, and gate releases on them, for example faithfulness ≥ 0.95 and tool-call schema errors = 0 %. Other frameworks (DeepEval, Arize Phoenix) do the same job.
- LLM-as-a-judge: a second, trusted model grades outputs against a written, calibrated rubric. It scales review; calibrate it on human-graded samples.
- Run the suite in CI/CD on every change: a new prompt, an updated endpoint, a provider's model patch. One test before launch proves little.

| Share | Case type | Examples |
|---|---|---|
| 60 % | Nominal | Standard, well-formed business requests |
| 25 % | Edge and boundary | Missing parameters, ambiguous inputs, business rules in conflict |
| 15 % | Adversarial red-team | Prompt injections, role-play attacks, attempts to extract the system prompt |

## The audit trail

The readiness test: if a regulator asked tomorrow morning about one decision your agent made, what evidence could you hand over by 2 pm? The answer is your logs. Every transaction should leave one immutable, cryptographically chained record, written as structured JSON.

| Field | Why it is there | Ties to |
|---|---|---|
| Timestamp and session ID | Rebuild the exact sequence of one case | All frameworks |
| User identity and permission scope | Who asked, and what the agent was allowed to do | ISO/IEC 42001, SOC 2 |
| Input and retrieved context, sanitised | What the model actually saw | GDPR Art. 15 (access) |
| Model version, temperature, system prompt hash | Traceability when anything changes | EU AI Act Art. 12 |
| Tool calls: API, parameters, raw response | What the agent did in other systems | NIST CSF (Detect, Protect) |
| Guardrail decision flag | Whether a filter fired or changed the output | AI safety compliance |
| Human override event | Who intervened, rejected or edited, and when | EU AI Act Art. 14 |

:::callout An override is evidence too
When a person overrides the agent, log it like any other event. If staff routinely click past safety warnings to go faster, the organisation carries the liability, and only the logs will show the pattern.
:::

## Documentation and compliance readiness

Documentation records not only what the system does but why and how. It keeps knowledge when people leave, captures lessons from near misses, and is the first thing an auditor asks for. In health or finance, proof of testing, data handling and oversight is required, not optional.

- Readiness practices: regular gap analysis against GDPR, HIPAA or the EU AI Act; mock audits; cross-functional reviews with legal, compliance, operations and engineering; version control with secure access and search, so you can produce the exact record in force on a given date.
- Keep it proportionate: detailed records for high-risk processes, lighter ones elsewhere; logs, version control and dashboards generated by the pipeline; periodic reviews instead of sign-offs at every step, with instant alerts on high-risk changes.
- Decentralise routine decisions to agents, centralise risk policy: an ethical trade-off escalates to a human committee.
- Done well, governance is an accelerator: it gives leadership the confidence to fund and scale. FAIRLY AI, working with Prescient Security, built auditor-friendly documentation into daily operations, earned ISO 42001 certification and turned it into business credibility.

| Family | Contents |
|---|---|
| Policy and governance | AI ethics policy, acceptable use, escalation paths to human oversight |
| Technical design and development | Data sources, training method, version history, guardrail specifications, reasons behind design choices |
| Testing and validation | Test cases, expected and actual results, fixes made |
| Operations and incidents | Access records, anomaly reports, post-incident reviews |

:::takeaways
- Map the laws onto the design early: lawful basis, minimisation, erasure that reaches the vector index, a human route for significant decisions.
- Place each action in a risk and speed quadrant, then choose manual, automated or hybrid oversight.
- Prompts are soft guardrails. Anything that must never happen gets a deterministic check outside the model.
- A versioned golden set, thresholds set in advance and evals run on every change are your release gate.
- Log every transaction, guardrail hit and human override, and keep four families of documentation: that is how you prove it.
:::

:::check
Your support agent's system prompt says “Never include a customer's Social Security number in a reply.” A red-team tester gets it to print one in three turns. What do you ship?

- [ ] a. Rewrite the rule in capitals and repeat it at the end of the prompt
- [ ] b. Add a few examples of polite refusals to the prompt
- [x] c. A masking step in code on every reply before it leaves, with a logged guardrail flag when it fires
- [ ] d. Ask the same model to re-read its answer and remove any number

### Hint a

Louder words are still words. The tester found a path through the prompt once; they will find it again.

### Hint b

Examples improve the odds. They do not turn a probability into a guarantee.

### Hint d

The checker is the same kind of model that leaked the data, and it can be steered the same way.

### Explanation

Right. A deterministic egress filter does not read the conversation, so nobody can argue with it. Keep the prompt line for tone, and log each time the filter fires: that flag is part of your audit trail.
:::
