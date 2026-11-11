---
kind: deliverable
based_on: content/01-extracted/02_Modules/Module_7_Complete.md, content/01-extracted/02_Modules/Module_7_Complements.md
based_on_hash: c3fe233eedc0
kicker: Deliverable · Governance plan
title: The governance plan for your candidate workflow
fileName: governance-plan.md
bubble: Write down every wall and every logbook. I'll check the gates.
---
One to three pages, in the shape of MIT Assignment 7.1, for the candidate workflow you picked in module 1: applicable regulations, key risks, a guardrail register, a testing and evaluation plan, the audit trail and your documentation practices. Reuse your deliverables from modules 1 to 6, in particular the security memo from module 4 (its threats feed the red-team cases) and the KPI scorecard from module 6 (its override and escalation rates show whether oversight works). This plan becomes the security, testing and governance sections of your capstone adoption plan in module 8. It is a working document, not legal advice: have it reviewed by legal or your DPO.

## Template

```markdown
# Governance plan

Workflow (from module 1):
Owner:
Date:
Reviewed by (legal / DPO / compliance):

## 1. Use case and data in the loop
- The use case in two sentences:

| Data item | Personal? PHI? | Source | Where it is stored (DB, vector index, logs, backups) |
|---|---|---|---|
| | | | |

## 2. Applicable regulations
- GDPR: applies? Lawful basis per purpose (Art. 6):
- CCPA: applies? How opt-out of sale and deletion are honoured:
- HIPAA: covered entity or business associate? BAAs signed with:
- EU AI Act risk tier (if in the EU) and transparency duties:
- Sector rules or internal policies:
- Controller and processors; DPA and zero-data-retention terms checked with the model provider:

## 3. Rights by design
- Access request: how we find everything the agent saw about one person:
- Erasure, per store:

| Store | How we delete | How we verify |
|---|---|---|
| Source documents | | |
| Vector index (anonymised IDs? per-customer keys for shredding?) | | |
| Logs and traces | | |
| Golden dataset and test data | | |

- Decisions with significant impact: who reviews, how a person gets an explanation or opts out:

## 4. Risk and speed per action
| Action the agent takes | Risk | Speed needed | Quadrant | Oversight (manual / automated / hybrid) |
|---|---|---|---|---|
| | | | | |

## 5. Guardrail register
| Guardrail | Hard or soft | Position (ingress / prompt / egress / tool / human) | What it blocks | On failure | Tested by | Owner |
|---|---|---|---|---|---|---|
| | | | | | | |

## 6. Testing strategy
| Stage | Environment and data | Pass criteria | Owner |
|---|---|---|---|
| Sandbox (isolation, masked or synthetic data) | | | |
| Pilot A/B (split, success metric, duration) | | | |
| Safety checks (filters, adversarial tests, judge, alerts) | | | |
| Human review of flagged cases | | | |
| Release sign-off (risk and compliance) | | | |

## 7. Evaluation plan
- Golden dataset: size today / target, mix (nominal __ % · edge __ % · red-team __ %), who validates reference answers, where it is versioned:
- Framework (RAGAS, DeepEval, Arize Phoenix, other):

| Metric | Threshold | Blocks release? |
|---|---|---|
| Faithfulness | | |
| Answer relevance | | |
| Context precision / recall | | |
| Tool-call schema errors | 0 % | Yes |
| Trajectory (required steps, max steps) | | |

| Red-team case (from the security memo) | Example input | Expected behaviour |
|---|---|---|
| | | |

- LLM-as-a-judge: model, rubric, calibration against human grades:
- Suite runs on (prompt change, model patch, endpoint update, schedule):

## 8. Audit trail
| Field | Masked? | Store | Retention | Who can read |
|---|---|---|---|---|
| Timestamp, session ID, user and permission scope | | | | |
| Input and retrieved context | | | | |
| Model version, temperature, prompt hash | | | | |
| Tool calls and responses | | | | |
| Guardrail decision flags | | | | |
| Human overrides | | | | |

- Tamper evidence (append-only, chained records):
- The 2 pm test: what we could hand over tomorrow, and what is missing:

## 9. Documentation and readiness
- Where policy, design, test evidence and incident records live (versioned, searchable):
- Gap analysis (laws checked, frequency):
- Mock audit date and owner:
- Cross-functional review members (legal, compliance, operations, engineering):

## 10. Key risks and mitigations
| Risk | Compliance or operational | Mitigation | Residual risk | Owner |
|---|---|---|---|---|
| | Compliance | | | |
| | Operational | | | |

## 11. Open questions for legal
-
```

## Checklist

- Each applicable law is named with what it requires of this workflow, including the lawful basis
- Erasure is planned for every store, including the vector index, logs and test data
- Every action sits in a risk and speed quadrant with an oversight type
- Every rule with legal or financial weight has a hard guardrail with a position, a failure behaviour and an owner
- The golden set has a size and mix, and every release metric has a threshold set before testing
- The audit trail lists its fields, masking, retention and readers, and records human overrides
- At least one compliance risk and one operational risk have a mitigation
