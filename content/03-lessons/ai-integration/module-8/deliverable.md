---
kind: deliverable
based_on: content/01-extracted/02_Modules/Module_8_Complete.md, content/01-extracted/02_Modules/Module_8_Complements.md
based_on_hash: 6fa4edd8c432
kicker: Deliverable · Capstone adoption plan
title: Your capstone adoption plan
fileName: capstone-adoption-plan.md
bubble: Everything you built, in one file. This is the one you take to your leadership.
---
The final file: a two-to-five page executive plan for bringing an agent into one function of your organisation. It follows the eight sections of the capstone and assembles the deliverables of modules 1 to 7, plus this module's mailroom map. You are not writing from scratch: you are joining your pieces into one coherent story. Where you lack a figure, say how you will get it (internal data, an expert, more measurement).

## Template

```markdown
# Capstone adoption plan

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
```

## Checklist

- Two to five pages, all eight sections, one department and one bottleneck, the same organisation sentence throughout
- The plan goes beyond chat: the agent does measurable work in a real workflow
- Each technology choice is justified against an alternative, including orchestration if there are several agents
- Costs cover infrastructure, data preparation, evaluation runs, staffing and change management, not only tokens
- Security uses all six NIST CSF 2.0 functions and covers prompt injection and tool privileges
- Crawl, Walk and Run each have a numeric gate; KPIs cover all four dimensions
- Governance names the laws, the mailroom controls with owners, the workforce impact and one accountable person
