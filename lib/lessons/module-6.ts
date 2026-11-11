import type { LessonContent } from "../lessons";

// Module 6 · From pilot to practice. Source: MIT module 6 (sections 1 to 4, assignment 6.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_6: LessonContent = {
  reading: {
    kicker: "Concept · The last mile",
    title: "A pilot that works is not a deployment",
    intro:
      "Most AI pilots look good. Far fewer reach daily use. The stretch between the two is the last mile: real callers, real data, real systems, and people who have to change how they work. This module shows why pilots stall, how to widen an agent's autonomy in stages, how to bring people along, and how to prove with numbers that it works.",
    sections: [
      {
        heading: "Voice agents: a pilot that passed, a launch that failed",
        body: [
          "A voice agent talks with people instead of offering keypad menus. It chains three parts you already know: speech-to-text to turn the call into words, a language model or decision engine to work out what the caller wants, and text-to-speech to answer in a natural voice. Live calls add their own traps: people interrupt, talk over the agent and pack several requests into one sentence, so turn-taking matters as much as accuracy.",
          "Healthcare is a natural target: bookings, opening hours, refill requests, test-result calls. The course's teaching case is fictional but painfully familiar. Maple Heights Family Clinic sees about 150 patients a day and its phone lines are jammed every morning. It pilots a voice agent for three jobs: book appointments, give opening hours, pass calls to staff. Staff play patients and read clean scripts. The agent copes, leadership approves, and the first live week goes wrong in four places.",
        ],
        table: {
          head: ["What happened live", "Root cause", "What should have been there"],
          rows: [
            ["Elderly callers, slang, a parent in a car with the GPS talking over her: the agent repeats its prompt, then hangs up", "Tested on scripts, never on interruptions, broken speech or several requests in one sentence", "Tests with messy real speech, accents, overlapping audio and barge-in"],
            ["Slots offered that were already gone, double bookings, patients not in the system", "The scheduling API served stale data at peak demand", "Integration tested under load, with a freshness check before every booking"],
            ["A caller who needs the nurse about her blood sugar is looped back to the main menu", "Hand-off only fired on exact phrases like “talk to a human”", "Escalation on intent and distress, not on keywords"],
            ["Public complaints within a week, staff rebooking by hand, morale down", "No dashboard, no tagging of failed calls, no way for staff to report issues", "Escalation, booking accuracy and hang-up rates watched from day one"],
          ],
        },
        callout: {
          label: "Done right",
          text: "At Cencora, a large US healthcare distributor and clinic operator, a voice agent called Eva, built by Infinitus, handles benefits verification and drug-service calls. It absorbs work once done by more than 100 full-time staff, runs about four times faster, sends uncertain cases to human review, and every call is recorded and spot-checked.",
        },
      },
      {
        heading: "Pilot purgatory",
        body: [
          "The clinic is not an exception. Industry estimates put the share of AI initiatives stuck at the pilot stage at 70 to 90 %, with roughly four production systems for every 33 prototypes. Last-mile integration is the work of turning a local trial into routine operations at scale, and it is where the value is either realised or lost.",
          "Pilots succeed for reasons that do not survive scale: one narrow problem, curated or static data, a sandbox cut off from live systems, clear targets, and a 6 to 12 week timeline that rewards speed over durability. A team can show 90 % success in that setting and still have proved very little about production.",
        ],
        table: {
          head: ["", "In the pilot", "In production"],
          rows: [
            ["Inputs", "Clean, structured test cases", "Messy, ambiguous, sometimes hostile real traffic"],
            ["Systems", "Sandbox, no integration burden", "Legacy telephony, CRM or medical records, streaming data, real load"],
            ["People", "Enthusiastic volunteers", "Busy staff who may see the agent as a step towards layoffs"],
            ["Governance", "Rarely any audit log, access control or liability rules", "Legal and compliance can halt it the day they look"],
            ["Cost", "A small test budget", "Compute that grows with volume (IBM expected AI compute cost to rise 89 % between 2023 and 2025)"],
            ["Proof", "“It works in the demo”", "A business number moves, and keeps moving"],
          ],
        },
        bullets: [
          "Start from one narrow use case with a business metric attached. Technical success with no visible business value leaves an ROI clarity gap nobody will fund.",
          "Onboard the agent like a new hire: simple tasks first, harder ones as trust grows, with guardrails tested along the way.",
          "Plan integration with the real back-end systems (APIs, middleware) and keep data flowing in real time. Without MLOps habits (automated deployment, version control, monitoring) a pilot cannot be reproduced at scale.",
          "Design conversations for varied phrasing, accents and misunderstandings, with easy recovery and a clear route to a person.",
          "Check data readiness (available, clean, diverse, secure) and give a governance group ownership. Amazon scrapped an internal hiring tool after it learned from past CVs to prefer men.",
          "Treat change management and training as part of the build. This is often a multi-year journey.",
        ],
      },
      {
        heading: "Automate steps, then widen autonomy",
        body: [
          "Saskia Listle's law of decomposition: you cannot automate a process, only a step. Asking one agent to “automate client onboarding” gives you a huge context, dozens of failure modes and no way to debug. Break the workflow into small steps, score each on predictability (rule-like or judgement) and on risk (reversible or not), and automate the predictable, low-risk steps first, with plain code checks between them.",
          "Then widen autonomy in three stages. Each stage ends with an exit gate written as numbers and agreed before the stage starts.",
        ],
        table: {
          head: ["Stage", "The agent…", "People…", "Example (Olivia, a partner-hours agent)"],
          rows: [
            ["Crawl · human in the loop", "Extracts, drafts and recommends, never acts", "Review, edit and submit 100 % of cases; build baseline telemetry and a gold-standard set", "Suggests opening-hour extensions; account managers check and send"],
            ["Walk · human on the loop", "Executes low-risk, deterministic actions; flags anything below a confidence floor (say 85 %)", "Watch dashboards, inspect samples, take the escalations", "Messages partners; a clear “YES” updates Salesforce and the POS, anything ambiguous goes to a person"],
            ["Run · autonomy with circuit breakers", "Runs whole multi-step workflows", "Spot-audit, review monthly KPI drift, answer automated anomaly alerts", "Runs across Benelux and Germany; managers review weekly conversion dashboards and anomaly logs"],
          ],
        },
        bullets: [
          "Know when to stop using the model. Once about 95 % of cases in a step follow the same logic, rewrite that step as a script or microservice: the faculty cite token costs down 90 %, latency from seconds to milliseconds, and fully reproducible audits.",
          "Keep a person in the decision seat for consequential moves. Frankee.ai's agile assistant pulls blockers from chat on its own, but never reschedules a sprint or assigns tickets without the Scrum Master's click.",
          "Re-test every model upgrade before promoting it. At Frankee.ai, an unannounced API change truncated outputs and silently broke user-story generation.",
        ],
      },
      {
        heading: "People: resistance is the usual blocker",
        body: [
          "Ali Tobah's view: the technology is ready; the last mile is organisational, about incentives, psychological safety and clear liability. Up to 70 % of change programmes are reported to fail on employee pushback or weak management support. With AI the fear is concrete: one survey found 74 % of Indian workers fear AI could take their jobs, and experts warn up to 40 % of roles worldwide could be affected. Not knowing how the system decides, or doubting one's own skills, adds to it.",
          "Resistance also comes from above and around: leaders attached to familiar practice, cultures that prefer established processes, avoid risk and think in silos, thin budgets, legacy systems that make the agent look unreliable, and unclear AI policies. Frontline staff who feel threatened may quietly route around the agent, or collect its edge-case errors to prove it cannot be trusted.",
          "ADKAR treats change as five building blocks, in order, for each group of people:",
        ],
        table: {
          head: ["Block", "Question to answer", "What it looks like for an agent"],
          rows: [
            ["Awareness", "Why change?", "Explain the problem the agent solves and why now"],
            ["Desire", "What is in it for me?", "Say plainly how the agent augments the role and what happens to the work it takes"],
            ["Knowledge", "How do I work with it?", "Hands-on workshops on the real tool; per Listle, a PDF and a 30-minute webinar will not do"],
            ["Ability", "Can I do it on a busy day?", "Coaching, mentoring, a help desk, staff co-designing the guardrails"],
            ["Reinforcement", "Will it stick?", "Share wins, act on feedback, track adoption by team"],
          ],
        },
        bullets: [
          "Kotter's eight steps give the organisation-level sequence: create urgency, build a coalition of AI champions, set a vision of human-AI work, communicate it, remove barriers, win early with pilots, consolidate gains, anchor the change in culture.",
          "Talk openly: town halls, direct answers to fears, honesty about how decisions are made. Transparency is linked to less resistance and higher adoption.",
          "Involve people: cross-functional committees, users choosing use cases, peer change champions.",
          "Roll out in rings: internal testing with selected staff, a beta with a small group, then everyone. Launching 100 % on day one is usually too risky.",
          "Measure it: adoption by department, satisfaction with the tool, productivity, resistance incidents and how fast they are resolved, plus periodic readiness checks.",
        ],
        callout: {
          label: "Healthy doubt",
          text: "The aim is not zero resistance. Some scepticism is right and points at real failure modes. Give it a channel and turn it into problem-solving.",
        },
      },
      {
        heading: "A scorecard in four dimensions",
        body: [
          "No single number describes an agent. Measure it on four dimensions, weighted for the use case: a legal summariser puts accuracy and compliance first, a retail chatbot puts experience first. Pick KPIs for what the agent does and what its business unit needs, not for what the vendor dashboard happens to show. Raw internals such as token counts only belong if they map to an outcome someone cares about.",
        ],
        table: {
          head: ["Dimension", "Question", "Example KPIs"],
          rows: [
            ["Technical", "Is the machinery sound and within bounds?", "Latency per step, tool error rate, uptime, schema errors, hallucinations or guardrail violations"],
            ["Operational", "Does the work get done?", "Task completion, first-contact resolution, deflection, escalation and abandonment rates"],
            ["Financial", "Is it worth it?", "Cost per resolution, labour hours saved, infrastructure run-rate"],
            ["Adoption and trust", "Do people accept it, and is it learning?", "CSAT or NPS, staff override rate, sustained usage, prompt rework rate"],
          ],
        },
        bullets: [
          "Other cuts of the same idea appear in the course: effectiveness, efficiency, user experience, learning and governance; or effectiveness, efficiency, learning and adaptation, human factors. Whatever the labels, never report money or time saved alone.",
          "Maple Heights could have tracked three numbers from day one: escalation rate, appointment accuracy (valid bookings versus failed or duplicated) and abandonment (callers who hung up unresolved).",
        ],
        callout: {
          label: "Logs first",
          text: "KPIs are computed from structured records, not estimated afterwards. Every step should emit one JSON object: session, step, agent, model, tokens, latency, tool called and its status, whether a human overrode it, any validation error. As Amado Lopez puts it, you cannot govern what you cannot trace.",
        },
      },
      {
        heading: "Close the loop",
        body: [
          "A number nobody acts on is decoration. Three loops turn metrics into change. Users flag bad answers through ratings and complaints, reviewed by hand (vital early on). Automated monitors spot patterns, such as a spike in “I do not understand”, and trigger a fix or an escalation. Supervisors read the dashboards and adjust thresholds, success criteria or integrations. Early deployments lean on human oversight, mid-stage ones on rules, and advanced ones may have agents adjusting each other.",
        ],
        bullets: [
          "No ground truth for tone or helpfulness: define a rubric and keep human grading for samples.",
          "Metric distortion: pushing speed alone hurts accuracy. Pair every speed KPI with a quality KPI.",
          "Drift: performance decays as inputs and systems change. Compare each week with the last.",
          "Resistance to evaluation: frame monitoring as managing a new colleague, not doubting the project.",
          "Start lean with one or two KPIs per agent, mix back-end logs with user feedback, keep a human on high-stakes outputs, and have a dashboard from day one.",
        ],
        callout: {
          label: "Action threshold",
          text: "Write the trigger next to every KPI. If abandonment rises 15 % in a week, the system needs intervention, not a slide next quarter. And, in Simon Barna's words, never scale an agent you have not measured: you would only industrialise its errors.",
        },
      },
    ],
    takeaways: [
      "Pilots stall on messy inputs, legacy integration, missing governance and people, rarely on the model itself.",
      "Automate steps, not processes, and widen autonomy through Crawl, Walk and Run with numeric gates agreed in advance.",
      "Score technical, operational, financial and adoption KPIs from structured logs, each with an owner and an action threshold.",
    ],
    check: {
      prompt:
        "Your 8-week pilot scored 94 % task success with volunteer staff on curated cases. Leadership wants the agent live for every customer next month. What do you propose?",
      options: [
        { id: "a", text: "Go live for everyone: 94 % is above target" },
        { id: "b", text: "A Crawl phase on real traffic: the agent drafts, staff send, every step logged, with numeric gates agreed for moving to Walk" },
        { id: "c", text: "Extend the sandbox pilot by six months to gather more evidence" },
        { id: "d", text: "Switch to a larger model first to push the score towards 99 %" },
      ],
      correct: "b",
      hints: {
        a: "94 % on curated cases from volunteers says little about messy traffic, live integrations or reluctant users. That is exactly how the Maple Heights launch went wrong.",
        c: "More sandbox time measures the same easy conditions. The unknowns are in production, and endless pilots are what purgatory looks like.",
        d: "The score was measured on the wrong data. A bigger model does not fix stale APIs, keyword-only escalation or staff who route around the tool.",
      },
      explanation:
        "Right. Crawl meets real data and real users at low risk, produces the baseline telemetry and the gold-standard set, and earns staff trust. Leadership gets a dated path to Walk backed by numbers, not a vague “later”.",
    },
    bubble: "Any pilot can fly in a sandbox. Let's get yours out of purgatory.",
  },

  postMortem: {
    kicker: "Post-mortem · IBM Watson Health, 2021",
    title: "A revolution in cancer care that never got past the pilot",
    context:
      "IBM teamed up with hospitals to have Watson recommend cancer treatments: the most sensitive decision a clinic makes, handed to a system pitched as revolutionary. In many cases the recommendations were unsafe or incorrect. The project lost its credibility and was shut down in 2021. Set beside a healthcare agent from the same module that did reach production, the contrast is instructive.",
    numbers: [
      { value: "2017", label: "STAT reports that Watson, pitched as a revolution in cancer care, is nowhere close" },
      { value: "Many cases", label: "of unsafe or incorrect treatment recommendations" },
      { value: "2021", label: "the project, its credibility gone, is shut down" },
      { value: "100+ FTE", label: "the counter-example: workload absorbed by Cencora's voice agent Eva, four times faster, with human review" },
    ],
    timeline: [
      { label: "The pitch", text: "IBM partners with hospitals so Watson can recommend cancer treatments. The promise is a revolution, aimed straight at clinical decisions." },
      { label: "In use", text: "In many cases Watson's recommendations are unsafe or incorrect. Advice that is sometimes unsafe cannot be relied on at the bedside." },
      { label: "September 2017", text: "STAT (Ross and Swetlitz) publishes its investigation: the revolution in cancer care is nowhere close." },
      { label: "2021", text: "Having lost credibility, the project is shut down." },
      { label: "The contrast", text: "Cencora's Eva, built by Infinitus, takes on administrative calls (benefits verification, drug-service management), sends uncertain cases to people, and has every call recorded and spot-checked." },
    ],
    lessons: [
      "Scope decides survival. Watson aimed at the highest-stakes judgement first; Eva started with narrow, repetitive admin work. Decompose, and automate the predictable, reversible steps before the risky ones.",
      "Onboard gradually. Nobody expects a new hire to master everything on day one. A clinical adviser belongs in Crawl, recommending to clinicians who decide, with telemetry proving its quality before it gains any autonomy.",
      "Governance is a KPI dimension, not a footnote. Unsafe output in healthcare is a guardrail violation, and it has to be counted, with an action threshold, from the first case.",
      "Trust is the hardest metric to win back. Unsafe advice in a few cases was enough to sink credibility for the whole project, and without credibility there is no adoption.",
      "A pitch is not a business case. Success has to be defined as a measurable outcome before launch, or the gap between the promise and the numbers shows up in the press instead of on your dashboard.",
    ],
    question: {
      prompt:
        "Your health system wants an agent that recommends treatment plans to doctors, rolled out across all sites at once. The demo on hand-picked cases was impressive. What do you recommend?",
      options: [
        { id: "a", text: "Start with lower-risk steps around the workflow and keep any recommendation in Crawl, with clinicians deciding every case and quality and safety logged against agreed gates" },
        { id: "b", text: "Roll out everywhere but add a disclaimer that doctors remain responsible" },
        { id: "c", text: "Run the demo cases again with a larger model to confirm the score" },
        { id: "d", text: "Announce the project widely to build momentum and secure budget" },
      ],
      correct: "a",
      hints: {
        b: "A disclaimer moves liability on paper but measures nothing. Unsafe recommendations would still reach every site before anyone sees the pattern.",
        c: "Hand-picked cases are the sandbox. A bigger model scores them again; it tells you nothing about real patients, real records systems or real clinicians.",
        d: "Announcing a revolution before the numbers exist is the Watson pattern. When results disappoint, credibility goes with them.",
      },
      explanation:
        "Yes. Decompose, start where errors are cheap and reversible, and keep the high-stakes step under full human control until telemetry shows it is safe. That is how the Cencora agent reached production and the Watson project did not.",
    },
    sources: [
      "Ross, C., & Swetlitz, I. (2017, September 5). IBM pitched its Watson supercomputer as a revolution in cancer care. It's nowhere close. STAT.",
      "MIT Applied Agentic AI, Module 6, section 2: Last-mile integration, why pilots succeed but deployments stall (IBM Watson Health example).",
      "MIT Applied Agentic AI, Module 6, section 1: Voice agents (Cencora and Infinitus example).",
    ],
    bubble: "A famous name, a bold promise, no deployment. Let's see what was missing.",
  },

  lab: {
    kicker: "Lab · Telemetry and stage gates",
    title: "Compute your KPIs and decide: Walk or hold?",
    goal: "Generate step-level JSON telemetry for a small booking agent, turn it into technical, operational, financial and adoption KPIs, check the Crawl to Walk and Walk to Run gates, then break the booking API and watch the circuit breaker and drift alerts fire.",
    duration: "35 minutes",
    prerequisites: [
      "Python 3.10 or later, no extra package, no API key",
      "Your candidate workflow from module 1",
      "Your cost work from module 1 (model prices, cost of a human-handled case)",
    ],
    steps: [
      {
        title: "Generate the telemetry",
        body: [
          "Create a new folder and save this as make_log.py. It simulates 60 sessions a week of a booking agent with three steps (look up the customer, check slots, draft the reply) during a Crawl phase: a person reviews every draft. Each line of telemetry.jsonl is one structured record, with the fields from the faculty's telemetry example (session, step, agent, model, tokens, latency, tool and status, validation error, human override) plus a confidence score for the Walk floor. A session_end record carries the outcome, the satisfaction score and the review time.",
        ],
        code: {
          lang: "python",
          text: `# make_log.py: write a synthetic step-level telemetry log, one JSON object per line.
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
print(f"wrote telemetry.jsonl for weeks {weeks}")`,
        },
      },
      {
        title: "Save the gate checker",
        body: [
          "Save this as stage_gate.py in the same folder. It groups the records by week, computes the KPIs in four dimensions, and checks the latest week against two gates. It also has a circuit breaker (any KPI out of its corridor drops the agent back one stage) and the 15 % week-on-week action threshold from the reading.",
        ],
        code: {
          lang: "python",
          text: `# stage_gate.py: turn step-level telemetry into 4D KPIs, then check the Crawl -> Walk -> Run gates.
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
            print(f"ALERT: {k} rose from {prev[k]:.3f} to {latest[k]:.3f} in one week")`,
        },
      },
      {
        title: "Run it and read the verdict",
        body: [
          "Week 2 is far better than week 1: reviewers edit about 8 % of drafts instead of 30 %, and abandonment falls from 13 % to 3 %. Crawl to Walk says GO. Walk to Run says HOLD with seven blockers, including only 60 sessions against 500 required. That is how it should look: a gate you can pass now, and a clear list of work before the next one.",
        ],
        code: { lang: "shell", text: "python make_log.py 1 2\npython stage_gate.py" },
      },
      {
        title: "Break the booking API",
        body: [
          "Now add a third week in which check_slots slows down and fails more often under load, the same fault that gave Maple Heights its double bookings.",
          "Read the output. Task completion drops to about 57 %, p90 latency jumps past 3 seconds, the circuit breaker trips on tool errors and abandonment, and the drift check raises alerts. Crawl to Walk is now HOLD: had you promoted the agent after week 2, the breaker would send it straight back. Note which owner each alert should page.",
        ],
        code: { lang: "shell", text: "python make_log.py 1 2 3\npython stage_gate.py" },
      },
      {
        title: "Make the gates yours",
        body: [
          "Replace PRICE_PER_1K and HUMAN_BASELINE with figures from your module 1 cost work, and REVIEW_COST_PER_HOUR with your own loaded rate. Rename the three steps after your candidate workflow, and set the session minimums to the volume it sees in two weeks.",
          "For each threshold, write down who agreed it and why. For each KPI that blocks a gate, write one line: likely cause, fix, owner. Module 7 adds what this log cannot give you yet: accuracy against a gold-standard set.",
        ],
      },
      {
        title: "Decompose (optional)",
        body: [
          "Two of the three steps only call a tool through a small model. Score each step of your own workflow on predictability and risk, and mark the ones that could become a plain script once about 95 % of cases follow the same logic. Remove one model call from make_log.py and see what happens to cost per resolved case.",
        ],
      },
    ],
    checklist: [
      "Both scripts run and print KPIs per week",
      "I can explain why Crawl to Walk says GO and Walk to Run says HOLD after week 2",
      "I triggered the circuit breaker and the drift alerts with week 3",
      "My gates use my own prices, baseline cost and volumes",
      "Each blocking KPI has a cause, a fix and an owner",
    ],
    bubble: "Numbers decide the next stage, not enthusiasm. Run the gate.",
  },

  deliverable: {
    kicker: "Deliverable · 4D KPI scorecard",
    title: "The KPI scorecard you put in front of leadership",
    purpose:
      "One to two pages for your candidate workflow, following the KPIs for AI assignment: the context, what the agent does, three to five headline KPIs covering the technical, operational, financial and adoption dimensions, and how they show whether the business goal is being met. Add the Crawl, Walk, Run milestones with dated, numeric exit criteria and a short change plan. This scorecard becomes the rollout and KPI sections of your capstone adoption plan in module 8.",
    fileName: "kpi-scorecard.md",
    template: `# 4D KPI scorecard

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
`,
    checklist: [
      "Context names the sector, organisation type and department",
      "The agent's purpose fits in one or two sentences",
      "Three to five headline KPIs cover all four dimensions, not only financial ones",
      "Every KPI has a baseline, a target, a data source, an owner and an action threshold",
      "Crawl to Walk and Walk to Run criteria are numbers with dates",
      "The scorecard explains how the KPIs show whether the business goal is met",
    ],
    bubble: "This is the page leadership will read. Make every number earn its place.",
  },
};
