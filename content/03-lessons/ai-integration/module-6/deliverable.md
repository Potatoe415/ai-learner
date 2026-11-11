---
kind: deliverable
based_on: content/01-extracted/02_Modules/Module_6_Complete.md, content/01-extracted/02_Modules/Module_6_Complements.md
based_on_hash: bbde058d2b67
kicker: Deliverable · 4D KPI scorecard
title: The KPI scorecard you put in front of leadership
fileName: kpi-scorecard.md
bubble: This is the page leadership will read. Make every number earn its place.
---
One to two pages for your candidate workflow, following the KPIs for AI assignment: the context, what the agent does, three to five headline KPIs covering the technical, operational, financial and adoption dimensions, and how they show whether the business goal is being met. Add the Crawl, Walk, Run milestones with dated, numeric exit criteria and a short change plan. This scorecard becomes the rollout and KPI sections of the adoption plan of your personal project in module 8.

## Template

```markdown
# 4D KPI scorecard

Workflow (from your candidate card, module 1):
Author:
Date:

## 1. Context
- Sector:
- Type of organisation:
- Department or team:
- Current maturity stage of this workflow (module 5):

## 2. What the agent does
In one or two sentences: the step(s) it handles in the workflow, the systems it touches (module 3), and what a person still decides.

>

- Business goal it serves (a number leadership already tracks):

## 3. Headline KPIs (3 to 5, at least one per dimension)
Definition = a formula over logged fields. Baseline = today, without the agent.

| Dimension | KPI | Definition | Baseline | Target | Data source | Owner | Action threshold |
|---|---|---|---|---|---|---|---|
| Technical | | | | | | | |
| Operational | | | | | | | |
| Financial | | | | | | | |
| Adoption and trust | | | | | | | |
| (optional fifth) | | | | | | | |

Checks: every speed KPI is paired with a quality KPI; no raw internal metric (such as tokens) unless it maps to an outcome; financial KPIs include the cost of human review.

## 4. How the KPIs answer the business question
- If every KPI hits target, what changes for the business goal, and by how much:
- Which KPI would tell you first that the agent is not achieving its purpose:
- Possible distortion (what could improve on paper while the outcome gets worse):

## 5. Telemetry and feedback loops
- Fields logged at every step:
- Where logs live, retention, who can read them:
- User loop (how users flag problems):
- System loop (which automated alerts, which triggers):
- Operational loop (who reviews the dashboard, how often, what they can change):

## 6. Crawl, Walk, Run
| Stage | Dates | What the agent may do | Human role | Exit criteria (numbers) | Fall-back trigger |
|---|---|---|---|---|---|
| Crawl | | Draft and recommend only | Review and submit 100 % | | |
| Walk | | Low-risk, reversible actions | Monitor, sample, take escalations | | |
| Run | | | Spot-audits, monthly drift review | | |

- Steps that could become plain code once stable:
- Circuit breaker: which KPI, which corridor, who is paged:

## 7. People
| Group | Main concern | Response (ADKAR block it serves) | Adoption metric |
|---|---|---|---|
| Frontline users | | | |
| Their managers | | | |
| IT and data owners | | | |
| Legal, risk, compliance | | | |

## 8. Decision asked of leadership
- Decision now:
- Next review date:
```

## Checklist

- Context names the sector, organisation type and department
- The agent's purpose fits in one or two sentences
- Three to five headline KPIs cover all four dimensions, not only financial ones
- Every KPI has a baseline, a target, a data source, an owner and an action threshold
- Crawl to Walk and Walk to Run criteria are numbers with dates
- The scorecard explains how the KPIs show whether the business goal is met
