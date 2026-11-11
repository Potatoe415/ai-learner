---
kind: deliverable
based_on: content/01-extracted/02_Modules/Module_2_Complete.md, content/01-extracted/02_Modules/Module_2_Complements.md
based_on_hash: 2a1176681b1b
kicker: Deliverable · Platform and architecture choice
title: Choose the platform and architecture for your candidate workflow
fileName: platform-architecture-choice.md
bubble: Your architecture, one decision per line. Module 8 will thank you.
---
Take the candidate workflow you picked in module 1 and turn it into explicit choices: what problem the agent solves, which steps code owns, how many agents, which platform, which model, where it runs and what the harness checks. Analyse trade-offs, not feature lists. This sheet becomes the technology section of the adoption plan of your personal project in module 8.

## Template

```markdown
# Platform and architecture choice

Candidate workflow (from module 1):
Author:
Date:

## 1. The problem to match
- What matters most here: reasoning depth, budget, near real-time response, a specialised domain (code, images, documents)?
- Which of these can we trade away, and which not:

## 2. The workflow as a state machine
The order of steps lives in code. The model only works inside a step.
| Step | Run by code or by the model | Check before moving on | On failure |
|---|---|---|---|
| | | | |

## 3. Topology
- One agent or several? Why:
- For each agent: its one job, its type (reflex, model-based, goal-based, utility-based, learning), its tools:
- Control: centralised or decentralised; agents identical or specialised:
- How agents exchange messages (deterministic event bus, queue, shared store):
- Conflict rule (negotiation, predefined protocol, auction):
- Success metric that ends each loop:

## 4. Platform
- Coordination (sequence, hierarchy, loops):
- Data sovereignty (public API, private cloud, our own machines), and who patches it:
- Control (who owns the weights, the runtime, the release cycle):

| Candidate | Pattern | Strength for us | Limit for us |
|---|---|---|---|
| | | | |

- Choice (visual tool, SDK, or an agent built into a platform we already run, such as a CRM-native agent) and why:
- Alternative considered, and why not:
- Exit plan if the platform stalls or changes direction:

## 5. Model: open or closed
| Factor | Open candidate: | Closed candidate: |
|---|---|---|
| Quality on our own test cases | | |
| Total cost (set-up, hosting, staff, tokens) | | |
| Where data goes, retention | | |
| Skills we have to run it | | |
| Strategic fit | | |

- Choice (or mix) and reason:

## 6. Where it runs
- Public cloud, private cloud, on-premise or edge:
- Serverless, containers, or both (which part where):
- What runs in the cloud, what runs at the edge:
- Where customer data travels; encryption, retention, service levels in the contract:
- Main cost levers (storage tiers, log archiving, cross-region traffic):

## 7. Harness
- Invariants (rules that must never break):
- Schema for every model output:
- Sandbox, bench (number and kind of edge cases) and the regression gate that blocks a release:
- When a tool fails or an API times out (retry, checkpoint, recovery, hand-over to a person):
- Credentials: what the agent can reach, and what it cannot:

## 8. Vibe coding on this workflow
- Who may prototype with AI assistants, and on what data:
- The devibing pass before production (types, schemas, secrets, migrations, tests) and who owns it:

## 9. Before deciding, we still need
-
```

## Checklist

- The problem is stated in terms of reasoning, budget, latency and domain
- Every step of the workflow says whether code or the model runs it
- The one-agent or multi-agent choice is justified and each loop has a success metric
- The platform choice answers coordination, data sovereignty and control, with an exit plan
- Data location, retention and patching responsibility are stated for the chosen model and hosting
- At least three invariants and one failure mode are written down
