---
kind: lab
based_on: content/01-extracted/02_Modules/Module_5_Complete.md, content/01-extracted/02_Modules/Module_5_Complements.md
based_on_hash: d88af238421e
kicker: Lab · Scope your Minimum Viable Agent
title: Find the one bottleneck worth automating first
duration: 45 minutes
bubble: Small scope, sharp metric. Let's find your bottleneck.
---
Map your candidate workflow into tasks, score them on value, effort and risk, pick one Minimum Viable Agent, write its design plan in the shape of MIT assignment 5.1, and prepare the override log you will use during the pilot.

## Prerequisites

- Python 3.10 or later
- Your candidate workflow and its cost figures (module 1)
- The systems you mapped in module 3 and your security memo (module 4)
- Any chat assistant

## Steps

### Map the workflow into tasks

This is move 3 of the maturity cycle. Write down four to eight tasks that make up your candidate workflow. For each: minutes per occurrence, occurrences per week, build effort (1 to 5), harm if it goes wrong (1 to 5), whether you already track a number for it, and whether its input data is clean and reachable.

Flag any task that decides on hiring, promotion, credit or customer profiling. Those are high-risk uses and never an MVA.

### Score them

Save this as mva_scorer.py and replace the example tasks and hourly cost with yours. The score is monthly value, halved for each missing piece of readiness, divided by effort times risk.

```python
# mva_scorer.py: rank the tasks of one workflow and pick a Minimum Viable Agent.
from dataclasses import dataclass

@dataclass
class Task:
    name: str
    minutes: float      # human time per occurrence today
    per_week: int       # occurrences per week
    effort: int         # 1 (a few days) to 5 (several months) to build
    risk: int           # 1 (harmless) to 5 (legal, money or safety harm)
    kpi_clear: bool     # do you already track a number for it?
    data_clean: bool    # inputs are clean and reachable (API, export)
    high_risk_use: bool = False  # hiring, promotion, credit, profiling

# Replace with the tasks of your own candidate workflow.
TASKS = [
    Task("Answer leave and benefits questions", 5, 150, 2, 2, True, True),
    Task("Screen CVs into a shortlist", 10, 200, 3, 5, True, True, high_risk_use=True),
    Task("Schedule onboarding sessions", 15, 20, 2, 1, True, True),
    Task("Collect and check new-hire documents", 8, 20, 3, 3, True, False),
    Task("Prepare the full onboarding plan per hire", 90, 5, 4, 2, False, False),
]
HOURLY_COST = 40  # loaded cost per hour of the person doing the task today

def hours_per_month(t: Task) -> float:
    return t.minutes * t.per_week * 52 / 12 / 60

def score(t: Task) -> float:
    value = hours_per_month(t) * HOURLY_COST
    readiness = (1.0 if t.kpi_clear else 0.5) * (1.0 if t.data_clean else 0.5)
    return value * readiness / (t.effort * t.risk)

print(f"{'Task':44} {'h/month':>8} {'score':>7}")
for t in sorted(TASKS, key=score, reverse=True):
    flags = []
    if t.high_risk_use:
        flags.append("high-risk use, not an MVA")
    if t.minutes > 30:
        flags.append("long: one task or a whole process?")
    note = f"  <- {'; '.join(flags)}" if flags else ""
    print(f"{t.name:44} {hours_per_month(t):8.1f} {score(t):7.0f}{note}")

eligible = [t for t in TASKS if not t.high_risk_use and t.risk <= 3]
best = max(eligible, key=score)
saved = hours_per_month(best)
print(f"\nMVA candidate: {best.name}")
print(f"Ceiling: about {saved:.0f} hours, or {saved * HOURLY_COST:,.0f} in labour, a month if fully automated.")
print("Start with a person approving every output, and track the override rate.")
```

### Run it and argue with the result

With the example data, leave and benefits questions win. CV screening saves many hours but is flagged and excluded, and the 90-minute onboarding plan is flagged as a process in disguise.

Now challenge your own ranking. Is the winner one short task, or a process? Compare its monthly ceiling with the cost figures from module 1: if running the agent costs more than the hours it saves, it is not the winner. Is the value revenue or cost? If neither, drop it.

```shell
python mva_scorer.py
```

### Write the design plan

MIT assignment 5.1 asks for a 200 to 300 word plan in three parts. Context: industry, organisation type, department. Current workflow: the process today, in concrete steps, as a baseline. AI integration: one specific technology and how it improves efficiency, effectiveness or quality.

The faculty's warning: “an agent will help HR answer questions” scores zero. Name the data sources (the policy wiki, the HRIS leave rules), the platform (low-code or custom code, from module 2), a measurable KPI with a deadline, and what the agent may not do alone (it drafts, a named person signs off).

### Pick the architecture

Centralized assistant, agent embedded in the team's own tool, or hybrid? Write one reason (governance, speed, specialisation) and one risk to manage. If the task touches personal or regulated data, say how it stays behind a governed layer, using your module 4 security memo.

### Prepare the override log

During the pilot, every reviewed output gets one line in reviews.csv with the columns date, item, verdict (approved, edited or rejected) and reason. This script gives you the weekly health check. Try it with a few made-up lines first.

```python
# override_rate.py: weekly health check for a Minimum Viable Agent in pilot.
# Usage: python override_rate.py reviews.csv
import csv
import sys
from collections import Counter

THRESHOLD = 0.20  # above this, fix the input data or narrow the task
VERDICTS = {"approved", "edited", "rejected"}

def main(path: str) -> None:
    with open(path, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))
    verdicts = Counter()
    reasons = Counter()
    for i, row in enumerate(rows, start=2):
        verdict = (row.get("verdict") or "").strip().lower()
        if verdict not in VERDICTS:
            print(f"line {i}: unknown verdict {verdict!r}, skipped")
            continue
        verdicts[verdict] += 1
        if verdict != "approved":
            reasons[(row.get("reason") or "no reason given").strip()] += 1
    total = sum(verdicts.values())
    if total == 0:
        print("No valid reviews yet.")
        return
    rate = (verdicts["edited"] + verdicts["rejected"]) / total
    print(f"{total} reviews, override rate {rate:.0%} (threshold {THRESHOLD:.0%})")
    for reason, n in reasons.most_common(3):
        print(f"  {n} x {reason}")
    if rate > THRESHOLD:
        print("Above threshold: clean the inputs or narrow the task before adding autonomy.")
    else:
        print("Within threshold: keep reviewing, and plan the next step of autonomy.")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "reviews.csv")
```

### Get a design critique

Paste your plan and scope into a chat assistant with this prompt. Apply what holds up; write down what you reject and why.

```prompt
You are a sceptical AI programme lead reviewing a Minimum Viable Agent.
Here is my plan:
[paste: context, current workflow, AI technology, task, inputs, systems,
out of scope, human gate, architecture, KPI, maturity stage]

Critique it on six points, two sentences each, then name the single
change you would make first:
1. Is it one bottleneck, or a whole process in disguise?
2. Does it fit the maturity stage I stated, or skip stages?
3. Is the KPI tied to revenue or cost, with a baseline and a deadline?
4. Is any part a high-risk use (hiring, credit, health, profiling)?
5. Are hand-offs to people or other agents structured, not free text?
6. Is the architecture (centralized, embedded, hybrid) justified?
```

## Checklist

- I scored at least four real tasks from my candidate workflow
- High-risk uses and processes in disguise are flagged and kept out of the MVA
- The MVA's monthly ceiling is compared with my module 1 cost figures
- My design plan names data sources, platform, KPI and the human gate
- I chose an architecture with one reason and one risk
- The override log runs and I applied or rejected each point of the critique
