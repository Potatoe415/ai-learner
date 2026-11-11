---
kind: deliverable
based_on: content/01-extracted/02_Modules/Module_1_Complete.md, content/01-extracted/02_Modules/Module_1_Complements.md
based_on_hash: d519e1e257a1
kicker: Deliverable · Candidate workflow card
title: Pick your candidate workflow and give it a first price
fileName: candidate-workflow-card.md
bubble: Keep this card close. It travels with you all the way to the capstone.
---
Choose one real workflow from your own organisation that you will carry through all eight modules, and give it a first, honest cost estimate. Section 6 doubles as your Assignment 1.1 write-up; the whole card later feeds the cost analysis (CapEx, OpEx, staffing) of the capstone adoption plan in module 8.

## Template

```markdown
# Candidate workflow card

Author:
Date:
Prices read on (date):

## 1. The workflow
- Name of the workflow (specific, e.g. "answering delivery-delay emails", not "customer service"):
- Team and role who do it today:
- How often (per day, week or month):
- Average time per occurrence:
- Main pain (delay, errors, cost, repetitive work):
- A good outcome, in one sentence:
- Today's human baseline (time, cost or quality you will compare against):

## 2. Chatbot, RAG or agent?
| Need | Yes / No | Notes |
|---|---|---|
| Only answers questions | | |
| Searches our documents | | |
| Acts in another system (writes, sends, books, updates) | | |
| Needs several steps with checks in between | | |

Verdict (chatbot / RAG / agent) and why:

## 3. The loop at a glance
- Perceive (inputs: text, voice, documents, images; real time or batch):
- Reason (decisions it makes):
- Act (tools or systems it reads or writes):
- Reflect (what is checked before an action, ideally in code):
- Cases that always go to a person, and who takes over:
- Voice or personal data involved? Consent and retention note:

## 4. One measured transaction
- Sample question (typical of the workflow):
- Input tokens:
- Output tokens:
- Tokenizer used:

## 5. Cost at scale
| Model / platform | $ per 1M input | $ per 1M output | Calls per month | Monthly cost |
|---|---|---|---|---|
| Small model | | | | |
| Frontier model | | | | |
| Routed mix (from the lab) | | | | |

Scenarios tried (change one thing at a time):
| Scenario | What changed | Monthly cost |
|---|---|---|
| Today's volume | | |
| 1,000,000 calls a month, or peak load | | |
| Short questions / long answers | | |
| With tool tax or conversation history | | |

Costs not on the calculator (rough guess is fine for now):
- Infrastructure (vector store, gateway, monitoring):
- Evaluation runs:
- People (engineering, prompt upkeep, reviewers, training):

## 6. Cost evaluation write-up (150 to 300 words)
- The use case and why you chose it:
- The parameters you varied (input length, output length, model, platform, volume):
- What happened to the cost across scenarios:
- What you still need to know before deciding:
```

## Checklist

- The workflow is real, specific and owned by a named team
- Input and output tokens are measured and priced at separate rates
- At least one scenario changes volume, length or model, and the totals are compared
- Prices carry the date they were read
- At least one case is reserved for people and a human baseline is noted
- The write-up names what I still need to know before deciding
