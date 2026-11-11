---
kind: lab
based_on: content/01-extracted/02_Modules/Module_6_Complete.md, content/01-extracted/02_Modules/Module_6_Complements.md
based_on_hash: bbde058d2b67
kicker: Lab · Telemetry and stage gates
title: Compute your KPIs and decide: Walk or hold?
duration: 35 minutes
bubble: Numbers decide the next stage, not enthusiasm. Run the gate.
---
Generate step-level JSON telemetry for a small booking agent, turn it into technical, operational, financial and adoption KPIs, check the Crawl to Walk and Walk to Run gates, then break the booking API and watch the circuit breaker and drift alerts fire.

## Prerequisites

- Python 3.10 or later, no extra package, no API key
- Your candidate workflow from module 1
- Your cost work from module 1 (model prices, cost of a human-handled case)

## Steps

### Generate the telemetry

Create a new folder and save this as make_log.py. It simulates 60 sessions a week of a booking agent with three steps (look up the customer, check slots, draft the reply) during a Crawl phase: a person reviews every draft. Each line of telemetry.jsonl is one structured record, with the fields from the faculty's telemetry example (session, step, agent, model, tokens, latency, tool and status, validation error, human override) plus a confidence score for the Walk floor. A session_end record carries the outcome, the satisfaction score and the review time.

```python
# make_log.py: write a synthetic step-level telemetry log, one JSON object per line.
# Usage: python make_log.py 1 2      (weeks 1 and 2)   python make_log.py 1 2 3   (adds a bad week)
import json, random, sys

random.seed(6)
SESSIONS_PER_WEEK = 60
# Per week: chance a tool call fails, chance the reviewer edits the draft, extra latency on check_slots.
PROFILE = {
    1: {"tool_fail": 0.06, "override": 0.25, "slow_ms": 0},
    2: {"tool_fail": 0.02, "override": 0.10, "slow_ms": 0},
    3: {"tool_fail": 0.15, "override": 0.12, "slow_ms": 2500},  # the booking API degrades under load
}
STEPS = [("lookup_customer", "small-model"), ("check_slots", "small-model"), ("draft_reply", "frontier-model")]

def session(week: int, n: int, p: dict):
    sid, failed = f"w{week}-s{n:03d}", False
    for i, (tool, model) in enumerate(STEPS, start=1):
        ok = random.random() > p["tool_fail"]
        failed = failed or not ok
        yield {
            "event": "step", "week": week, "session_id": sid, "step_index": i,
            "agent_id": "booking-agent", "model_used": model,
            "tokens": {"input": random.randint(300, 700), "output": random.randint(40, 180), "cached": random.randint(0, 300)},
            "latency_ms": random.randint(300, 900) + (p["slow_ms"] if tool == "check_slots" else 0),
            "tool_called": tool, "tool_status": "success" if ok else "error",
            "confidence": round(0.97 - abs(random.gauss(0, 0.08)) - (0.2 if failed else 0), 2),
            "validation_error": "schema: missing slot_id" if random.random() < 0.02 else None,
            "human_override": tool == "draft_reply" and random.random() < p["override"],
        }
    if failed:
        outcome = random.choice(["escalated", "abandoned"])
    else:
        outcome = "resolved" if random.random() > 0.05 else "escalated"
    csat = None if outcome == "abandoned" or random.random() < 0.4 else (random.choice([2, 3]) if failed else random.choice([4, 4, 5, 5, 5]))
    yield {"event": "session_end", "week": week, "session_id": sid, "outcome": outcome,
           "csat": csat, "review_s": random.randint(20, 90)}

weeks = [int(w) for w in sys.argv[1:]] or [1, 2]
with open("telemetry.jsonl", "w", encoding="utf-8") as f:
    for week in weeks:
        for n in range(1, SESSIONS_PER_WEEK + 1):
            for record in session(week, n, PROFILE[week]):
                print(json.dumps(record), file=f)
print(f"wrote telemetry.jsonl for weeks {weeks}")
```

### Save the gate checker

Save this as stage_gate.py in the same folder. It groups the records by week, computes the KPIs in four dimensions, and checks the latest week against two gates. It also has a circuit breaker (any KPI out of its corridor drops the agent back one stage) and the 15 % week-on-week action threshold from the reading.

```python
# stage_gate.py: turn step-level telemetry into 4D KPIs, then check the Crawl -> Walk -> Run gates.
import json, math, sys
from collections import defaultdict

# Your numbers go here. These are placeholders, not real prices: use your module 1 cost work.
PRICE_PER_1K = {"small-model": (0.0005, 0.002), "frontier-model": (0.005, 0.02)}  # (input, output) per 1,000 tokens
REVIEW_COST_PER_HOUR = 30.0   # loaded cost of one hour of human review
HUMAN_BASELINE = 2.50         # what one case costs today, done fully by a person
CONFIDENCE_FLOOR = 0.85       # in Walk, anything below this goes to a person

def load(path):
    steps, ends = defaultdict(list), {}
    with open(path, encoding="utf-8") as f:
        for line in f:
            r = json.loads(line)
            if r["event"] == "step":
                steps[r["session_id"]].append(r)
            else:
                ends[r["session_id"]] = r
    return steps, ends

def step_cost(s):
    p_in, p_out = PRICE_PER_1K[s["model_used"]]
    return s["tokens"]["input"] / 1000 * p_in + s["tokens"]["output"] / 1000 * p_out

def kpis(steps, ends, week):
    ids = [sid for sid, e in ends.items() if e["week"] == week]
    all_steps = [s for sid in ids for s in steps[sid]]
    outcomes = [ends[sid]["outcome"] for sid in ids]
    csat = [ends[sid]["csat"] for sid in ids if ends[sid]["csat"] is not None]
    lat = sorted(s["latency_ms"] for s in all_steps)
    drafts = [s for s in all_steps if s["tool_called"] == "draft_reply"]
    resolved = outcomes.count("resolved")
    spend = sum(step_cost(s) for s in all_steps) + sum(ends[sid]["review_s"] for sid in ids) / 3600 * REVIEW_COST_PER_HOUR
    n = len(ids)
    return {
        # Technical: is the machinery sound?
        "p90_step_latency_ms": lat[math.ceil(0.9 * len(lat)) - 1],
        "tool_error_rate": sum(s["tool_status"] == "error" for s in all_steps) / len(all_steps),
        "schema_error_rate": sum(s["validation_error"] is not None for s in all_steps) / len(all_steps),
        # Operational: does the work get done?
        "task_completion": resolved / n,
        "escalation_rate": outcomes.count("escalated") / n,
        "abandonment_rate": outcomes.count("abandoned") / n,
        # Financial: is it worth it?
        "cost_per_resolved": spend / max(resolved, 1),
        # Adoption and trust: do people accept the output?
        "override_rate": sum(s["human_override"] for s in drafts) / len(drafts),
        "low_confidence_share": sum(s["confidence"] < CONFIDENCE_FLOOR for s in drafts) / len(drafts),
        "csat": sum(csat) / len(csat),
        "sessions": n,
    }

# Every rule must hold on the latest week to move up a stage. Agree them before the stage starts.
GATES = {
    "Crawl -> Walk": {"tool_error_rate": ("<=", 0.05), "schema_error_rate": ("<=", 0.02),
                      "task_completion": (">=", 0.80), "p90_step_latency_ms": ("<=", 1500),
                      "cost_per_resolved": ("<=", HUMAN_BASELINE), "override_rate": ("<=", 0.15),
                      "csat": (">=", 4.0), "sessions": (">=", 50)},
    "Walk -> Run": {"tool_error_rate": ("<=", 0.01), "schema_error_rate": ("<=", 0.005),
                    "task_completion": (">=", 0.92), "abandonment_rate": ("<=", 0.03),
                    "escalation_rate": ("<=", 0.08), "override_rate": ("<=", 0.05),
                    "low_confidence_share": ("<=", 0.05), "csat": (">=", 4.3), "sessions": (">=", 500)},
}
# Circuit breaker: if any of these leaves its corridor, the agent drops back one stage automatically.
BREAKER = {"tool_error_rate": 0.10, "abandonment_rate": 0.10, "schema_error_rate": 0.05}
LOWER_IS_BETTER = ["p90_step_latency_ms", "tool_error_rate", "escalation_rate", "abandonment_rate", "override_rate"]

def failing(values, gate):
    return [f"{k} = {values[k]:.3f}, needs {op} {lim}" for k, (op, lim) in gate.items()
            if not (values[k] >= lim if op == ">=" else values[k] <= lim)]

steps, ends = load(sys.argv[1] if len(sys.argv) > 1 else "telemetry.jsonl")
weeks = sorted({e["week"] for e in ends.values()})
by_week = {w: kpis(steps, ends, w) for w in weeks}

print(f"{'KPI':22}" + "".join(f"{'week ' + str(w):>10}" for w in weeks))
for k in by_week[weeks[0]]:
    print(f"{k:22}" + "".join(f"{by_week[w][k]:>10.3f}" for w in weeks))

latest = by_week[weeks[-1]]
for name, gate in GATES.items():
    blockers = failing(latest, gate)
    print()
    print(f"{name}: {'GO' if not blockers else 'HOLD'}")
    for b in blockers:
        print(f"  blocked by {b}")

tripped = [k for k, limit in BREAKER.items() if latest[k] > limit]
if tripped:
    print()
    print(f"CIRCUIT BREAKER: {', '.join(tripped)} out of corridor. Drop back one stage and page the owner.")

# Action threshold: a KPI that worsens by more than 15 % in one week needs a person, not a meeting next month.
if len(weeks) > 1:
    prev = by_week[weeks[-2]]
    for k in LOWER_IS_BETTER:
        if prev[k] > 0 and latest[k] > prev[k] * 1.15:
            print(f"ALERT: {k} rose from {prev[k]:.3f} to {latest[k]:.3f} in one week")
```

### Run it and read the verdict

Week 2 is far better than week 1: reviewers edit about 8 % of drafts instead of 30 %, and abandonment falls from 13 % to 3 %. Crawl to Walk says GO. Walk to Run says HOLD with seven blockers, including only 60 sessions against 500 required. That is how it should look: a gate you can pass now, and a clear list of work before the next one.

```shell
python make_log.py 1 2
python stage_gate.py
```

### Break the booking API

Now add a third week in which check_slots slows down and fails more often under load, the same fault that gave Maple Heights its double bookings.

Read the output. Task completion drops to about 57 %, p90 latency jumps past 3 seconds, the circuit breaker trips on tool errors and abandonment, and the drift check raises alerts. Crawl to Walk is now HOLD: had you promoted the agent after week 2, the breaker would send it straight back. Note which owner each alert should page.

```shell
python make_log.py 1 2 3
python stage_gate.py
```

### Make the gates yours

Replace PRICE_PER_1K and HUMAN_BASELINE with figures from your module 1 cost work, and REVIEW_COST_PER_HOUR with your own loaded rate. Rename the three steps after your candidate workflow, and set the session minimums to the volume it sees in two weeks.

For each threshold, write down who agreed it and why. For each KPI that blocks a gate, write one line: likely cause, fix, owner. Module 7 adds what this log cannot give you yet: accuracy against a gold-standard set.

### Decompose (optional)

Two of the three steps only call a tool through a small model. Score each step of your own workflow on predictability and risk, and mark the ones that could become a plain script once about 95 % of cases follow the same logic. Remove one model call from make_log.py and see what happens to cost per resolved case.

## Checklist

- Both scripts run and print KPIs per week
- I can explain why Crawl to Walk says GO and Walk to Run says HOLD after week 2
- I triggered the circuit breaker and the drift alerts with week 3
- My gates use my own prices, baseline cost and volumes
- Each blocking KPI has a cause, a fix and an owner
