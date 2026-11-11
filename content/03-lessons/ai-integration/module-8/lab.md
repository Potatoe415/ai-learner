---
kind: lab
based_on: content/01-extracted/02_Modules/Module_8_Complete.md, content/01-extracted/02_Modules/Module_8_Complements.md
based_on_hash: 6fa4edd8c432
kicker: Lab · Mailroom map
title: Map what your agent changes in the mailroom
duration: 40 minutes
bubble: Mechanical to the agent, judgement to people. Let's sort your mailroom.
---
Break your candidate workflow into tasks, decide which move to the agent, which stay human and which are new, measure the hours that shift, then check that each mailroom control has a mechanism and a named owner.

## Prerequisites

- Python 3.10 or later (standard library only, runs offline)
- Your candidate workflow and cost estimate (module 1) and your Minimum Viable Agent scope (module 5)
- Your Crawl-Walk-Run rollout (module 6) and governance plan (module 7), if you have them

## Steps

### List the tasks, with real hours

Take the people who do your candidate workflow today. Write down every task they perform and the human hours per week it takes. Ask them rather than guess: this list is also your first co-design conversation.

Then label each task. Routing is mechanical sorting and moving: it goes to the agent. Judgement covers exceptions, disputes and relationships: it stays with people. New is the work the agent creates for people, such as working its review queue or auditing a sample of its decisions.

### Write the map

Save this as mailroom_map.py and replace the example (supplier invoice handling) with your own workflow. The CONTROLS block holds the five mailroom habits plus fairness, transparency and proportional intervention. Leave a field empty when it is not decided yet: the script will flag it.

```python
# mailroom_map.py: map your candidate workflow task by task, then check the mailroom controls.
# Usage: python mailroom_map.py   (replace the example below with your own workflow first)

WORKFLOW = "Supplier invoice handling, finance operations"  # your candidate workflow
ACCOUNTABLE = "Director of Finance Operations"  # one named human role, never "the agent"

# (task, human hours per week today, human hours per week after launch, done by after launch, kind)
#   routing   = mechanical sorting and routing: moves to the agent
#   judgement = exceptions, disputes, relationships: stays with people
#   new       = work the agent creates for people (review queue, audits)
TASKS = [
    ("Read incoming invoices, extract the fields", 8, 0, "agent", "routing"),
    ("Match invoices to purchase orders", 10, 1, "agent, person spot-checks", "routing"),
    ("Chase missing documents", 5, 1, "agent", "routing"),
    ("Resolve supplier disputes", 4, 5, "person", "judgement"),
    ("Approve payments above policy limits", 3, 3, "person", "judgement"),
    ("Work the agent's review queue", 0, 4, "person", "new"),
    ("Audit a weekly sample of agent decisions", 0, 2, "person", "new"),
]

# Every control needs a concrete mechanism and a named owner. Empty string = not decided yet.
CONTROLS = {
    "Privacy (never read the letters)": (
        "Mask bank details and personal data before the model sees them", "Data protection lead"),
    "Access control (verified recipients only)": (
        "Agent writes only to the payment-proposal table, through its own IAM role", "IT security"),
    "Auditability (log every parcel)": (
        "Each decision stored with inputs, tools called and a short rationale", ""),
    "Guardrails (refuse hazardous cargo)": ("", ""),
    "Accountability (the supervisor answers)": ("Named in the governance plan", ACCOUNTABLE),
    "Fairness (no group disadvantaged)": (
        "Disparate impact test on a synthetic supplier set before each release", "Procurement analyst"),
    "Transparency (people know it is an AI)": (
        "Supplier emails say they come from an automated assistant", "Finance operations lead"),
    "Proportional intervention (odd parcels to a person)": (
        "Low-confidence or high-amount cases go to the review queue", "Finance operations lead"),
}

print(f"Mailroom map: {WORKFLOW}")
print(f"Accountable for every agent decision: {ACCOUNTABLE}")
print()
print(f"{'Task':44} {'Today':>6} {'After':>6}  Kind       Done by")
for task, now, after, who, kind in TASKS:
    print(f"{task:44} {now:>5}h {after:>5}h  {kind:10} {who}")

today = sum(t[1] for t in TASKS)
after = sum(t[2] for t in TASKS)
moved = sum(t[1] - t[2] for t in TASKS if t[4] != "new")
new = sum(t[2] for t in TASKS if t[4] == "new")
net = today - after
print()
print(f"Human hours per week today: {today}, after launch: {after}")
print(f"Taken off existing tasks: {moved} h, new human tasks: {new} h, net freed: {net} h ({net / today:.0%})")

warnings = []
for task, now, after, who, kind in TASKS:
    if kind == "judgement" and "agent" in who:
        warnings.append(f"Judgement task handed to the agent: {task}")
    if kind == "routing" and "person" not in who and after > 0:
        warnings.append(f"Agent task with hours left but no person named: {task}")
for name, (mechanism, owner) in CONTROLS.items():
    if not mechanism:
        warnings.append(f"No mechanism yet: {name}")
    if not owner:
        warnings.append(f"No owner yet: {name}")

print()
print(f"Open points: {len(warnings)}")
for w in warnings:
    print(f"  - {w}")
```

### Run it and read the result

On the example, human hours drop from 30 to 16 a week: 20 hours leave existing tasks, 6 come back as new ones (review queue and audits), so 14 are freed, about 47% of the work. Disputes grow from 4 to 5 hours: judgement becomes a larger share of the job.

The script lists four open points. “Chase missing documents” still costs a human hour but nobody is named for it. Auditability has no owner. Guardrails have neither a mechanism nor an owner. Fix your own open points until the list is empty, or carry each one into the open questions of your plan.

```shell
python mailroom_map.py
```

### Decide where the freed time goes

Freed hours that nobody plans for read as job cuts, whatever you intended. For each role, write what the freed time becomes (more judgement work, the new tasks, another team's backlog) and what reskilling it needs. If a role really shrinks, write the transition support you will offer and when you will say so. The Commonwealth Bank cut jobs first, then watched call volumes rise and had to reverse the cuts: test your numbers in the Crawl phase before anyone's job changes.

### Run the three tests

Under the map, write three lines. Do no harm: the worst realistic outcome for the person on the other end. Stakeholder impact: one line each for employees, customers, investors and society. Front-page test: the sentence you would be comfortable reading in a headline. These lines, the task map and the controls go straight into sections 5 and 7 of your adoption plan.

## Checklist

- I listed the real tasks of my candidate workflow with hours, ideally checked with the people who do them
- Each task is labelled routing, judgement or new, and no judgement task is handed to the agent alone
- I know how many hours move, how many come back as new tasks, and where the freed time goes
- Every mailroom control has a mechanism and a named owner, or is carried as an open question
- I wrote the do-no-harm, stakeholder impact and front-page lines
