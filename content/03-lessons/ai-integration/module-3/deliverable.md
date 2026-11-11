---
kind: deliverable
based_on: content/01-extracted/02_Modules/Module_3_Complete.md, content/01-extracted/02_Modules/Module_3_Complements.md
based_on_hash: 81331eb54889
kicker: Deliverable · Integration plan
title: The integration plan for your candidate workflow
fileName: integration-plan.md
bubble: Every cable on one page. Your personal project will thank you!
---
Show how an agent for the candidate workflow you picked in module 1 would plug into your real systems: where it lives, what it touches, with which rights, and what stops it when things go wrong. It follows the six questions of the MIT conceiving-agents assignment and ends with a short email to leadership. It builds on your platform choice from module 2 and becomes the technology, integration and scaling sections of the adoption plan of your personal project in module 8.

## Template

```markdown
# Integration plan

Candidate workflow (from module 1):
Platform and harness choice (from module 2):
Author:
Date:

## 1. What kind of agent
- Internal (operations, scheduling, data wrangling) or external (customer service, onboarding, sales):
- Where it lives (Slack, Notion, Discord, website, email, voice):
- Build tier (no-code, low-code, pro-code, full-code) and why it is the lightest that works:

## 2. The workflow it supports
- Today's process, step by step, and who does each step:
- What the agent enhances, automates or replaces:
- Expected gain (time, cost, customer experience, engagement), in two or three sentences:

## 3. How it integrates
| System | Owner | Interface today (API, database, file, screen only) | Read or write | Connect via (MCP server, custom API, middleware, computer-use) | Legacy constraints (rate limit, pool size, data format, silo) |
|---|---|---|---|---|---|
| | | | | | |

Draw the path, not a straight arrow: agent → gateway / middleware / MCP server → system.

Tools exposed to the agent:
| Tool | System | Parameters | Read or write | Impact ceiling | Velocity limit |
|---|---|---|---|---|---|
| | | | | | |
- Number of tool schemas loaded per call, and rough token cost:

Identity and permissions:
- Whose identity the agent acts under (user-delegated token or service account, and why):
- Minimum scopes per system:
- Read-only replicas or parameterised procedures used instead of raw access:

## 4. Safety and ethics
- Main risks (technical, reputational, legal):
- Decisions that need a human in the loop:

Failure paths:
| Failure | What the agent does (retry with backoff, queue, fallback, escalate) | Who is told |
|---|---|---|
| 429 Too Many Requests | | |
| 503 or timeout | | |
| Data does not match the expected format | | |
| MCP server unreachable | | |
- Writes that are retried: how a retry is prevented from acting twice:

Circuit breakers and kill switch:
- Breakers (what trips them, what they freeze):
- Kill switch (how it works without the agent's cooperation):
- Kill switch owner, and backup:
- Who may reset, after which checks:
- Monitoring and logging (what is logged for every action, who watches):

## 5. How it communicates
- Neutral or empathetic, and does the tone adapt to context:
- How tone is shaped (prompt, examples, fine-tuning) and checked for bias:
- Escalation triggers to a person:

## 6. What success looks like
| KPI | Baseline today | Target | How it is measured |
|---|---|---|---|
| | | | |
- Signal that the agent is hurting rather than helping:
- How you will iterate after launch (pilot scope, review rhythm):

## 7. Email to leadership (100 to 300 words)
Subject:

Agent and platform; workflow and benefit; integration approach and main legacy barrier; key risk and its safeguards; success metric and next step.
```

## Checklist

- The agent type, platform and function are stated in one sentence each
- No arrow goes straight from the agent to a legacy system: middleware, a gateway or an MCP server sits between
- Every write tool has an impact ceiling and a velocity limit, and the kill switch works from outside the agent with a named owner
- Every failure path ends in a retry, a queue or a person, never in silence
- At least one measurable KPI has a baseline, and the email to leadership fits in 300 words
