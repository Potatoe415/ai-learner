---
kind: deliverable
based_on: content/01-extracted/02_Modules/Module_5_Complete.md, content/01-extracted/02_Modules/Module_5_Complements.md
based_on_hash: d88af238421e
kicker: Deliverable · Design plan and MVA scope
title: One page to get your first agent approved
fileName: mva-design-plan.md
bubble: One page, one bottleneck, one number. Ship it.
---
A one-page plan for the Minimum Viable Agent you scoped in the lab, built on the structure of MIT assignment 5.1 (context, current workflow, AI integration). It reuses your candidate workflow and costs (module 1), platform choice (module 2), integrations (module 3) and security memo (module 4). In the module 8 personal project it feeds the context and functional domain, change management and scaling architecture sections.

## Template

```markdown
# AI and the design process: Minimum Viable Agent plan

Candidate workflow (module 1):
Author:
Date:

## 1. Context
- Industry:
- Organisation type (size, public or private, regulated or not):
- Department:

## 2. Current workflow (baseline)
- Steps today, in three to seven lines (who does what, in which tool):
- Time per occurrence, volume per week, error or rework rate:
- Where it hurts (the bottleneck):

## 3. Maturity
- Our stage (1 ad-hoc to 5 adaptive reinvention), with the evidence:
- Shadow AI in this team today, and how we bring it into the open:
- Crawl, walk or run for this MVA:

## 4. AI integration
- The specific AI technology (generative or agentic, model tier, platform: low-code or custom code):
- Why it fits this task:
- What improves, before and after:
  - Efficiency:
  - Effectiveness:
  - Quality:

## 5. The Minimum Viable Agent
- The one task it takes on (score from the lab, and the runner-up):

| In scope | Out of scope |
|---|---|
| | |

- Data sources it reads:
- Systems it reads or writes (from module 3):
- What it may never do alone, and who signs off:
- Hand-off format to people or other agents (schema, not free text):

## 6. Risk class
- Function:
- High-risk use (hiring, promotion, credit, profiling)? If yes, why it stays out of scope:
- Data exposure and controls (from the module 4 security memo):

## 7. Architecture and people
- Centralized, embedded or hybrid, with one reason and one risk:
- Business owner:            Technical owner:
- Early advocates in the team:
- External partner (consultant, vendor), if any, and their role:

## 8. Value and measures
- Value equation: revenue expansion or cost reduction, and how much:
- KPI, baseline, target and deadline (for example, Tier-1 tickets down X % within 90 days):
- Override rate threshold that stops the rollout:
- Governance cost counted in the ROI:

## 9. 30 / 60 / 90 days
| By day | Milestone | Decision point |
|---|---|---|
| 30 | Running on real data, every output reviewed | Override rate under threshold? |
| 60 | | |
| 90 | | Scale, adjust or stop |

## 10. The plan in 200 to 300 words
Write it as one paragraph a sponsor can read in a minute: context, current workflow, the AI technology and what it improves.
```

## Checklist

- Context names the industry, organisation type and department
- The current workflow is concrete enough to serve as a baseline
- One specific AI technology is named, with why it fits and what it improves
- The MVA covers one task, with scope out and the human gate as explicit as scope in
- The KPI has a baseline, a target, a deadline and an override threshold
- The 200 to 300 word summary reads on its own
