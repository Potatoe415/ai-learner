---
kind: deliverable
based_on: content/01-extracted/02_Modules/Module_4_Complete.md, content/01-extracted/02_Modules/Module_4_Complements.md
based_on_hash: 7faacb162889
kicker: Deliverable · Security memo
title: Map your agent's risks onto NIST CSF 2.0
fileName: security-memo.md
bubble: Write it down calmly now, so nobody has to improvise later.
---
A short memo to leadership (250 to 500 words, plus the tables) on the security of your candidate workflow, the one you picked in module 1, using the tools and systems you mapped in module 3. Start with the NIST survey as a working sheet, then write the memo. It becomes the security section of your capstone adoption plan in module 8.

## Template

```markdown
# Security memo

To (leadership):
From:
Date:
Candidate workflow (module 1):
Tools and systems it touches (module 3):

## 0. Working sheet: NIST survey for this agent
Answer Yes / No / Not sure. Every "No" or "Not sure" feeds sections 3 and 4.

| Function | Question | Yes / No / Not sure | Notes |
|---|---|---|---|
| Govern | Is there a named owner, and written thresholds for what the agent may do alone? | | |
| Identify | Do we know what systems, data and tools the agent can access? | | |
| Identify | Have we thought about how this agent fits into our company environment? | | |
| Identify | Have we considered the risks of giving it access to sensitive tasks? | | |
| Protect | Can we control who the agent talks to and what it can see or do? | | |
| Protect | Have employees been trained on what the agent can and cannot do? | | |
| Protect | Is sensitive data protected from being leaked by the agent? | | |
| Detect | Can we spot when the agent does something unusual or wrong? | | |
| Detect | Is anyone monitoring its behaviour regularly? | | |
| Respond | If something goes wrong, do we have a plan to fix it quickly? | | |
| Respond | Do we know who to notify and how to communicate? | | |
| Recover | Could we recover data or fix services if the agent caused a problem? | | |
| Recover | Do we have a plan for improving the agent after an incident? | | |

## 1. Summary (3 lines)
- Biggest risk:
- Most important action:
- Decision we need from you:

## 2. What the agent can touch
| Tool / data source | Read or write | Data class (Public / Internal / Confidential / Restricted) | System owner |
|---|---|---|---|
| | | | |

## 3. Risks (at least two, named precisely, not "AI can be hacked")
| Risk | How it would reach us | Worst realistic impact | Likelihood (L / M / H) | CSF function(s) |
|---|---|---|---|---|
| Indirect prompt injection (emails, files, pages it reads) | | | | |
| Direct prompt injection (a user tries to override rules) | | | | |
| Deepfake or voice impersonation of an approver | | | | |
| Tool parameter tampering (wrong, repeated or oversized writes) | | | | |
| Training or memory data poisoning | | | | |
| Hallucination or biased output acted on | | | | |
| Sensitive data leaking (outputs, links, logs, vendors) | | | | |

## 4. Gaps in current practice (at least one)
| Area (access control / monitoring / response / recovery) | Gap today | Impact if it is exploited (1 to 2 sentences) |
|---|---|---|
| | | |

## 5. Plan by NIST CSF 2.0 function
| Function | Action | Owner | Date |
|---|---|---|---|
| Govern | e.g. any transaction over $____ needs two approvers | | |
| Identify | e.g. tool and data inventory, AI risks in the risk register | | |
| Protect | e.g. system prompt isolated, narrow typed tools, least privilege | | |
| Detect | e.g. alerts on new files or domains, canary records, write-rate monitor | | |
| Respond | e.g. stop switch and its holder, revoke tokens, rate freeze | | |
| Recover | e.g. backups, manual fallback, vector store rollback, post-mortem rule | | |

## 6. Stakeholders and training
| Stakeholder (IT, Legal, HR, Compliance, business owner...) | Role in this plan | Training needed (deepfakes, injection, what the agent can and cannot do) |
|---|---|---|
| | | |

## 7. Incident response procedure
- Trigger (what counts as an incident):
- First three steps, in order:
  1.
  2.
  3.
- Stop switch holder and deputy:
- Who is notified, how fast:
- Pre-approved first statement:

## 8. Audit trail
- Logged per step (time, agent identity, input sources, model and prompt version, tool, arguments, decision, approver):
- How tampering is made visible (hash chain, write-once storage, ledger):
- Who can read it, retention period:

## 9. Recommended actions (at least two, in priority order)
1.
2.

## 10. Open questions
-
```

## Checklist

- The NIST survey is filled in, and every No or Not sure leads to an action or an open question
- At least two risks are specific to this workflow and mapped to a CSF function
- At least one gap in access control, monitoring, response or recovery is named with its impact
- Stakeholders, training and one incident response procedure are written down
- At least two recommended actions, with an owner and a date, and at least one write action gated by a money or volume threshold
