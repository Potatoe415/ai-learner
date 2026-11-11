import type { LessonContent } from "../lessons";

// Module 9 · From pilot to practice. Source: MIT module 6 (sections 1 to 4, assignment 6.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_9: LessonContent = {
  reading: {
    kicker: "Concept · The last mile",
    title: "A pilot that works is not a deployment",
    intro:
      "Most AI pilots look good. Most never reach daily use. The gap between the two is called the last mile: real users, real data, real systems, and people who have to change how they work. This module shows why pilots stall, how to widen autonomy in stages, and how to prove it works with numbers.",
    sections: [
      {
        heading: "Pilot purgatory",
        body: [
          "Industry estimates put the share of AI initiatives that never leave the pilot stage at 70 to 90 %. One study counts about four production systems for every 33 prototypes.",
          "Pilots succeed for good reasons that do not survive scale: a narrow problem, clean or static test data, a sandbox cut off from live systems, volunteers who want it to work, and a 6 to 12 week timeline that rewards speed over durability.",
        ],
        table: {
          head: ["", "In the pilot", "In production"],
          rows: [
            ["Inputs", "Curated, well-formed test cases", "Messy, ambiguous, sometimes hostile real traffic"],
            ["Systems", "Sandbox or a mock API", "Legacy CRM, records system, telephony, under load"],
            ["Users", "Enthusiastic volunteers", "Busy staff who may fear for their jobs"],
            ["Governance", "None needed", "Audit logs, access control, liability: legal can halt it"],
            ["Cost", "A small test budget", "Compute that grows with volume (IBM expected AI compute cost to rise 89 % from 2023 to 2025)"],
            ["Success", "“It works in the demo”", "A business number moves, and keeps moving"],
          ],
        },
        bullets: [
          "Pick one narrow use case with a business metric attached, and onboard the agent like a new hire: simple tasks first.",
          "Plan the integration with the real back-end systems (middleware or APIs) and test it with live data flows.",
          "Design conversations for variation and errors, with an easy way to reach a person.",
          "Check data readiness (available, clean, diverse, secure) and give one group ownership of AI governance. Amazon dropped an internal hiring tool in 2018 after it learned to favour men from past CVs.",
          "Expect a multi-year effort: change management and training count as much as the technology.",
        ],
        callout: {
          label: "ROI clarity gap",
          text: "A pilot that shows the technology works, but not which business number it moves, gives nobody a reason to fund the roll-out. Write the business metric down before the pilot starts.",
        },
      },
      {
        heading: "Voice agents: where the last mile hurts most",
        body: [
          "A voice agent chains speech-to-text, a language model that works out intent and acts, and text-to-speech. Callers expect a reply within about a second and they interrupt, so latency and turn-taking matter as much as accuracy.",
          "A teaching case: a city clinic seeing about 150 patients a day pilots a voice agent for bookings, opening hours and routing to staff. Staff make scripted test calls; it works; leadership approves. In the first week live, it breaks in four places.",
        ],
        table: {
          head: ["What happened live", "Root cause", "What should have been there"],
          rows: [
            ["Elderly callers, slang, a GPS talking over a parent: the agent repeats itself, then hangs up", "Tested on scripts, not on real speech with interruptions and several requests in one sentence", "Tests with recorded real calls, accents, noise and barge-in"],
            ["Slots offered that were already taken, double bookings", "The scheduling API returned stale data under load", "Integration tested at peak load, with a fresh-data check before booking"],
            ["A caller asking for a nurse about high glucose readings is sent back to the main menu", "Escalation only fired on exact phrases", "Escalation on intent, distress and repeated failure"],
            ["Public complaints, staff rebooking by hand", "No dashboard, no tagging of failed calls, no staff feedback channel", "Escalation, booking-accuracy and hang-up rates watched from day one"],
          ],
        },
        callout: {
          label: "Field note",
          text: "Done right, it works. At the US healthcare distributor Cencora, a voice agent built by Infinitus handles benefit-verification calls: the workload of more than 100 full-time staff, about four times faster, with unclear cases sent to people and every call recorded and spot-checked.",
        },
      },
      {
        heading: "Automate steps, then widen autonomy",
        body: [
          "You cannot automate a process in one go, only its steps. Break the workflow into small steps, score each on predictability (rule-like or judgement) and on risk (reversible or not), and automate the predictable, reversible ones first, with code checks between steps.",
          "Then widen autonomy in three stages. Each stage has an exit gate written as numbers, agreed before it starts.",
        ],
        table: {
          head: ["Stage", "The agent…", "People…", "Typical exit gate"],
          rows: [
            ["Crawl · human in the loop", "Drafts and recommends, never sends", "Review, edit and click submit on 100 % of cases", "Accuracy on the golden set, low edit rate, no policy violation, cost below the human baseline"],
            ["Walk · human on the loop", "Executes low-risk, reversible actions; flags low-confidence cases (e.g. below 85 %)", "Watch dashboards, sample batches, handle escalations", "High task success, low hand-off and override rates, satisfaction at or above baseline, enough volume"],
            ["Run · supervised autonomy", "Runs whole multi-step workflows", "Spot-audit, review monthly drift, answer anomaly alerts", "Stays in bounds; a circuit breaker drops it back to Walk when a KPI leaves its range"],
          ],
        },
        bullets: [
          "Once a step is stable and almost every case follows the same logic, replace the model call with plain code. It becomes cheaper, faster and fully reproducible.",
          "Keep a person in the decision seat for consequential choices. One team's agile-team assistant reads blockers from chat on its own, but never reassigns work without the Scrum Master's click.",
          "Re-test every model upgrade before promoting it. The same team saw an unannounced change truncate outputs and silently break story generation.",
        ],
      },
      {
        heading: "People: resistance is the usual blocker",
        body: [
          "Up to 70 % of change programmes are reported to fail on employee pushback or weak management support. With AI the fear is concrete: surveys report that 74 % of Indian workers fear for their jobs, and experts estimate up to 40 % of roles worldwide could be affected. Unease about how the system decides and doubts about one's own skills add to it.",
          "Resistance also comes from above and around: leaders attached to old practice, risk-averse and siloed cultures, thin training budgets, unclear AI policies. If frontline staff see the agent as a step towards layoffs, they route around it or collect its errors to prove it cannot be trusted.",
          "ADKAR treats change as five building blocks, in order, for each group of people:",
        ],
        table: {
          head: ["Block", "Question to answer", "What it looks like for an agent"],
          rows: [
            ["Awareness", "Why change?", "Share the pain in numbers: backlog, wait times, overtime"],
            ["Desire", "What is in it for me?", "Name the work that disappears and the work that grows; say clearly what happens to roles"],
            ["Knowledge", "How do I work with it?", "Hands-on workshops on the real tool, not a PDF and a webinar"],
            ["Ability", "Can I do it under pressure?", "Coaching during Crawl, a help channel, staff co-designing the guardrails"],
            ["Reinforcement", "Will it stick?", "Share wins, fix reported issues quickly, track adoption by team"],
          ],
        },
        bullets: [
          "Kotter's eight steps give the organisation-level sequence: urgency, a coalition of champions, a vision of human-AI work, communication, removing barriers, short-term wins, consolidating gains, anchoring in culture.",
          "Roll out in rings: internal tests, then a small beta group, then everyone. Keep a help desk and a feedback channel throughout.",
        ],
        callout: {
          label: "Healthy doubt",
          text: "The goal is not zero resistance. Sceptics often spot real failure modes. Give them a structured way to report them, and being open about how the agent decides lowers resistance.",
        },
      },
      {
        heading: "Four dimensions of a scorecard",
        body: [
          "No single number captures how an agent performs. Track four dimensions, weighted for the use case (a legal summariser puts accuracy and compliance first, a retail chatbot puts experience first). Avoid internal metrics such as raw token counts unless they map to an outcome leaders care about.",
        ],
        table: {
          head: ["Dimension", "Question", "Example KPIs"],
          rows: [
            ["Technical (quality, safety)", "Is it right and within bounds?", "Accuracy against a golden set, hallucination or schema-error rate, guardrail violations"],
            ["Operational (speed, flow)", "Does the work get done?", "Task completion, first-contact resolution, latency per step, abandonment rate"],
            ["Financial", "Is it worth it?", "Cost per resolved case (model plus human review), staff hours freed, cost trend per task"],
            ["Adoption (people, learning)", "Do people trust it, and is it improving?", "Hand-off and override rates, prompt rework rate, CSAT or employee satisfaction, usage by team"],
          ],
        },
        callout: {
          label: "Logs first",
          text: "KPIs are computed from logs, not estimated afterwards. Every step should emit one structured record: session, step, model, tokens, latency, tool called and status, whether a human overrode it, any validation error.",
        },
      },
      {
        heading: "Close the loop",
        body: [
          "A number nobody acts on is decoration. Three feedback loops turn metrics into changes: users flag bad answers (essential early on); automated monitors spot patterns such as a spike in “I don't understand” and trigger a fix; supervisors review dashboards and adjust thresholds, criteria or integrations. Early on the loops rely on people; later, on rules.",
        ],
        bullets: [
          "No ground truth for tone or helpfulness: define a rubric and sample cases for human grading.",
          "Metric distortion: pushing speed alone hurts accuracy. Pair every speed KPI with a quality KPI.",
          "Drift: performance decays as inputs and systems change. Compare each week with the last.",
          "Resistance to evaluation: frame monitoring as managing a new colleague, not doubting the project.",
          "Start lean (one or two KPIs per agent), mix back-end logs with user feedback, keep human review for high-stakes outputs, dashboard from day one.",
        ],
        callout: {
          label: "Action threshold",
          text: "Write the trigger next to each KPI. Example: if abandonment rises 15 % in a week, someone investigates before the next release. Never scale an agent you have not measured: you would only scale its errors.",
        },
      },
    ],
    takeaways: [
      "Pilots stall on messy data, legacy integration, missing governance and people, rarely on the model.",
      "Widen autonomy step by step, Crawl, Walk, Run, with numeric gates agreed in advance and a way back.",
      "Score four dimensions from structured logs, and attach an owner and an action threshold to every KPI.",
    ],
    check: {
      prompt:
        "Your 8-week pilot scored 94 % task success with volunteer staff on curated cases. Leadership wants the agent live for all customers next month. What do you propose?",
      options: [
        { id: "a", text: "Go live for everyone: 94 % is above target" },
        { id: "b", text: "A Crawl phase on real traffic: the agent drafts, staff send, every step logged, with numeric gates to reach Walk" },
        { id: "c", text: "Extend the sandbox pilot by six months to collect more evidence" },
        { id: "d", text: "Switch to a larger model first, to push the score towards 99 %" },
      ],
      correct: "b",
      hints: {
        a: "94 % on curated cases from volunteers says little about messy traffic, live integrations or reluctant users. That is how the clinic's voice agent failed.",
        c: "More sandbox time measures the same easy conditions. The unknowns are in production, and long pilots are what purgatory looks like.",
        d: "The score was measured on the wrong data. A bigger model does not fix stale APIs, missing escalation or staff who route around the tool.",
      },
      explanation:
        "Right. Crawl puts the agent in front of real data and real users at low risk, builds the baseline telemetry and the golden set, and earns staff trust. Leadership gets a dated path to Walk with numbers, not a vague “later”.",
    },
    bubble: "Cap here. Any pilot can fly in a sandbox. Let's get yours out of purgatory.",
  },

  postMortem: {
    kicker: "Post-mortem · IBM Watson for Oncology, 2012–2022",
    title: "The pilot that impressed, and the deployment that never came",
    context:
      "After Watson won the quiz show Jeopardy! in 2011, IBM pitched it as a revolution in cancer care: read the literature and the patient file, then recommend treatments. Leading cancer centres signed on, and hospitals in several countries bought the oncology product. Years later, few clinicians relied on it and IBM sold the health unit.",
    numbers: [
      { value: "$62 M", label: "spent by MD Anderson on its Watson-based adviser, per a 2017 university audit; the project was on hold" },
      { value: "Synthetic", label: "training cases: the oncology product learned from hypothetical patients written by one hospital's experts" },
      { value: "2022", label: "IBM sells its Watson Health data and analytics assets to Francisco Partners" },
    ],
    timeline: [
      { label: "2011–2013", text: "Jeopardy! win, then high-profile partnerships with cancer centres. Demos on prepared cases look impressive." },
      { label: "2017", text: "A University of Texas audit finds MD Anderson's project over budget, behind schedule and not in clinical use; it is already on hold. STAT reports that Watson for Oncology is far from the promised revolution and that its advice reflects one institution's practice." },
      { label: "2018", text: "STAT publishes internal IBM documents citing unsafe and incorrect treatment recommendations, linked to training on synthetic rather than real patient cases." },
      { label: "2022", text: "IBM sells the Watson Health assets. The oncology product fades out." },
    ],
    lessons: [
      "Curated, synthetic cases make a sandbox, not proof. Test on real, unfiltered cases from the sites that will use it.",
      "Integration with clinical records and daily workflow was the hard part. A tool that needs extra steps from busy staff goes unused.",
      "Doctors at other hospitals did not trust advice tuned to one centre's habits. Adoption is a KPI, not an afterthought.",
      "Without stage gates and early quality metrics, problems surfaced in the press and audits, years and millions later.",
    ],
    question: {
      prompt:
        "You are piloting a clinical-documentation agent. Results are excellent on 200 test cases written by your best physicians. What should happen before any wider roll-out?",
      options: [
        { id: "a", text: "Publish the results to build momentum with other hospitals" },
        { id: "b", text: "Add 500 more cases written by the same physicians" },
        { id: "c", text: "A Crawl phase on real, unfiltered cases at several sites, inside the live records system, graded by local clinicians" },
        { id: "d", text: "Ask the vendor for a guarantee of accuracy" },
      ],
      correct: "c",
      hints: {
        a: "Announcing success before real-world evidence is how the Watson story became a public setback.",
        b: "More cases from the same authors repeat the same bias. Your users' real cases are what matter.",
        d: "A contract clause does not measure anything. You need your own numbers on your own data.",
      },
      explanation:
        "Yes. Real cases, real systems and the people who will use it are the three things a sandbox hides. Measure them in Crawl, with humans signing every output, before you widen anything.",
    },
    sources: [
      "Ross, C., & Swetlitz, I. (2017, September 5). IBM pitched its Watson supercomputer as a revolution in cancer care. It's nowhere close. STAT.",
      "Ross, C., & Swetlitz, I. (2018, July 25). IBM's Watson supercomputer recommended “unsafe and incorrect” cancer treatments, internal documents show. STAT.",
      "University of Texas System Audit Office. (2017, February). Special review of procurement procedures related to the M.D. Anderson Cancer Center Oncology Expert Advisor project.",
      "IBM press release, “Francisco Partners to acquire IBM's healthcare data and analytics assets”, 21 January 2022.",
    ],
    bubble: "A giant name, a great demo, no deployment. Let's see what went missing.",
  },

  lab: {
    kicker: "Lab · Stage gates in code",
    title: "Compute your KPIs and decide: Walk or hold?",
    goal: "Compute four-dimensional KPIs from a sample log of agent sessions, check them against Crawl → Walk and Walk → Run gates, catch a drift alert, then replace the thresholds with your own.",
    duration: "30 minutes",
    prerequisites: [
      "Python 3.10 or later, no extra package, no API key",
      "Your cost estimate (module 2) for the human baseline",
      "Your eval plan (module 7) for the accuracy target",
    ],
    steps: [
      {
        title: "Save the gate checker",
        body: [
          "Save this as stage_gate.py. The log has one row per session from a Crawl phase: the agent drafted, a person reviewed. override means the reviewer changed the draft; golden_ok is the reviewer's verdict against the expected answer.",
        ],
        code: {
          lang: "python",
          text: `# stage_gate.py: compute 4D KPIs from a session log and check the stage gates.
import csv, io, math

# One row per session. In real life, export it from your step-level JSON logs.
# golden_ok: the reviewer's verdict against the expected answer (blank = not reviewed).
LOG = """session,week,resolved,golden_ok,latency_ms,model_cost,review_s,handoff,override,abandoned,csat,violation
s01,1,1,1,1800,0.04,40,0,0,0,5,0
s02,1,1,1,2100,0.05,35,0,0,0,4,0
s03,1,0,0,3900,0.07,90,1,1,0,2,0
s04,1,1,1,1600,0.03,30,0,0,0,5,0
s05,1,1,0,2400,0.05,75,0,1,0,3,0
s06,1,1,1,1700,0.04,25,0,0,0,,0
s07,1,0,,5200,0.09,0,0,0,1,,0
s08,1,1,1,1900,0.04,30,0,0,0,4,0
s09,1,1,1,2000,0.05,40,0,0,0,5,0
s10,1,1,1,1500,0.03,20,0,0,0,4,0
s11,2,1,1,1700,0.04,25,0,0,0,5,0
s12,2,1,1,1800,0.04,20,0,0,0,4,0
s13,2,1,1,1600,0.03,20,0,0,0,5,0
s14,2,0,0,4100,0.08,80,1,1,0,2,0
s15,2,1,1,1900,0.05,25,0,0,0,4,0
s16,2,1,1,1500,0.03,15,0,0,0,,0
s17,2,1,1,2200,0.05,30,0,0,0,5,0
s18,2,1,1,1700,0.04,20,0,1,0,4,0
s19,2,1,1,1600,0.04,15,0,0,0,5,0
s20,2,1,1,1800,0.04,20,0,0,0,4,0
"""
REVIEW_RATE = 30.0     # cost of one hour of human review
HUMAN_COST = 2.50      # baseline: cost of one case handled fully by a person today

def kpis(rows: list[dict]) -> dict:
    col = lambda name: [float(r[name]) for r in rows if r[name] != ""]
    n, resolved = len(rows), sum(col("resolved"))
    golden, csat, lat = col("golden_ok"), col("csat"), sorted(col("latency_ms"))
    spend = sum(col("model_cost")) + sum(col("review_s")) / 3600 * REVIEW_RATE
    return {
        "accuracy_golden": sum(golden) / len(golden),             # technical
        "violations": sum(col("violation")),                      # technical
        "task_success": resolved / n,                             # operational
        "p90_latency_ms": lat[math.ceil(0.9 * len(lat)) - 1],     # operational
        "abandonment": sum(col("abandoned")) / n,                 # operational
        "cost_per_resolved": spend / max(resolved, 1),            # financial
        "handoff_rate": sum(col("handoff")) / n,                  # adoption
        "override_rate": sum(col("override")) / n,                # adoption
        "csat": sum(csat) / len(csat),                            # adoption
        "sessions": n,
    }

GATES = {  # every rule must hold on the latest week to move on
    "Crawl -> Walk": {"accuracy_golden": (">=", 0.85), "violations": ("<=", 0),
                      "task_success": (">=", 0.85), "p90_latency_ms": ("<=", 3000),
                      "cost_per_resolved": ("<=", HUMAN_COST), "override_rate": ("<=", 0.15),
                      "sessions": (">=", 10)},
    "Walk -> Run": {"accuracy_golden": (">=", 0.95), "violations": ("<=", 0),
                    "task_success": (">=", 0.92), "abandonment": ("<=", 0.03),
                    "handoff_rate": ("<=", 0.08), "override_rate": ("<=", 0.05),
                    "csat": (">=", 4.3), "sessions": (">=", 500)},
}
LOWER_IS_BETTER = ["abandonment", "handoff_rate", "override_rate", "p90_latency_ms"]
HIGHER_IS_BETTER = ["accuracy_golden", "task_success", "csat"]

def blockers(values: dict, gate: dict) -> list[str]:
    out = []
    for name, (rule, limit) in gate.items():
        v = values[name]
        if not (v >= limit if rule == ">=" else v <= limit):
            out.append(f"{name} = {v:.2f}, needs {rule} {limit}")
    return out

rows = list(csv.DictReader(io.StringIO(LOG)))
weeks = sorted({int(r["week"]) for r in rows})
by_week = {w: kpis([r for r in rows if int(r["week"]) == w]) for w in weeks}

print(f"{'KPI':18}" + "".join(f"{'week ' + str(w):>10}" for w in weeks))
for name in by_week[weeks[0]]:
    print(f"{name:18}" + "".join(f"{by_week[w][name]:>10.2f}" for w in weeks))

latest = by_week[weeks[-1]]
for gate_name, gate in GATES.items():
    found = blockers(latest, gate)
    print()
    print(f"{gate_name}: {'GO' if not found else 'HOLD'}")
    for b in found:
        print(f"  blocked: {b}")

# Action threshold: a KPI that worsens by more than 15% in one week needs a person.
if len(weeks) > 1:
    prev = by_week[weeks[-2]]
    print()
    for name in LOWER_IS_BETTER:
        if latest[name] > prev[name] * 1.15:
            print(f"ALERT: {name} rose from {prev[name]:.2f} to {latest[name]:.2f} in one week")
    for name in HIGHER_IS_BETTER:
        if latest[name] < prev[name] * 0.85:
            print(f"ALERT: {name} fell from {prev[name]:.2f} to {latest[name]:.2f} in one week")`,
        },
      },
      {
        title: "Run it and read the verdict",
        body: [
          "Week 2 improves on week 1, but Crawl → Walk says HOLD: reviewers still edit 20 % of drafts. That one blocker is your next piece of work (look at what reviewers change), not a reason to give up. Walk → Run is far away, as it should be.",
        ],
        code: { lang: "shell", text: "python stage_gate.py" },
      },
      {
        title: "Simulate a bad week",
        body: [
          "Paste these rows just before the closing triple quotes of LOG, then run again. The scheduling system slows down: two callers hang up and latency triples. The trend check raises two alerts and Crawl → Walk now has new blockers.",
        ],
        code: {
          lang: "csv",
          text: `s21,3,1,1,2600,0.05,20,0,0,0,4,0
s22,3,0,,6100,0.08,0,0,0,1,,0
s23,3,1,1,2900,0.04,20,0,0,0,4,0
s24,3,1,0,3400,0.06,60,1,1,0,2,0
s25,3,0,,5800,0.07,0,0,0,1,,0
s26,3,1,1,2500,0.04,15,0,0,0,4,0
s27,3,1,1,2700,0.05,20,0,0,0,3,0
s28,3,1,1,2400,0.04,20,0,0,0,4,0
s29,3,1,1,2800,0.05,25,0,0,0,4,0
s30,3,1,1,2600,0.04,20,0,0,0,5,0`,
        },
      },
      {
        title: "Make the gates yours",
        body: [
          "Replace HUMAN_COST with the per-case cost from your module 2 estimate, and the accuracy thresholds with the targets from your module 7 eval plan. Set the session minimums to the volume your workflow sees in two weeks.",
          "For every KPI that blocks a gate, write one line: the likely cause, the fix, the owner. For each step of your workflow, note whether it is stable enough to become plain code instead of a model call.",
        ],
      },
      {
        title: "Go further (optional)",
        body: [
          "Instead of the CSV, read one JSON record per step (session, step, model, tokens, latency_ms, tool_status, human_override, validation_error) with json.loads, group by session, and compute the same KPIs. That is how a real dashboard is fed.",
        ],
      },
    ],
    checklist: [
      "The script runs and prints KPIs for each week",
      "I can explain why Crawl → Walk says HOLD and what to fix first",
      "I triggered the drift alert with the bad week",
      "My gates use my own baseline cost and accuracy targets",
      "Each blocker has a cause, a fix and an owner",
    ],
    bubble: "Numbers decide the next stage, not enthusiasm. Run the gate.",
  },

  deliverable: {
    kicker: "Deliverable · 4D KPI scorecard",
    title: "The scorecard you present to leadership",
    purpose:
      "One to two pages for your candidate workflow: KPIs in four dimensions with baselines and owners, the Crawl, Walk, Run plan with exit criteria, and an ADKAR line per stakeholder group. It becomes the rollout and KPI sections of your capstone adoption plan.",
    fileName: "kpi-scorecard.md",
    template: `# 4D KPI scorecard

Workflow (from the candidate card):
Author:
Date:

## 1. Context
- Sector, type of organisation, department:
- What the agent does, in one or two sentences (from the MVA one-pager):
- Business goal it serves (one number leadership already tracks):
- Inputs reused: cost estimate (M2), guardrails (M6), eval plan (M7), integration map (M4)

## 2. Scorecard
Each KPI: definition = formula from log fields. Baseline = today, without the agent.

### Technical (quality and safety)
| KPI | Definition | Baseline | Target | Data source | Owner | Review cadence | Action threshold |
|---|---|---|---|---|---|---|---|
| Accuracy vs golden set | | | | | | | |
| Guardrail violations | | | | | | | |

### Operational (speed and flow)
| KPI | Definition | Baseline | Target | Data source | Owner | Review cadence | Action threshold |
|---|---|---|---|---|---|---|---|
| Task completion rate | | | | | | | |
| p90 latency | | | | | | | |
| Abandonment rate | | | | | | | |

### Financial
| KPI | Definition | Baseline | Target | Data source | Owner | Review cadence | Action threshold |
|---|---|---|---|---|---|---|---|
| Cost per resolved case (model + review) | | | | | | | |
| Staff hours freed per month | | | | | | | |

### Adoption (people and learning)
| KPI | Definition | Baseline | Target | Data source | Owner | Review cadence | Action threshold |
|---|---|---|---|---|---|---|---|
| Hand-off / override rate | | | | | | | |
| User or employee satisfaction | | | | | | | |
| Active users by team | | | | | | | |

## 3. Telemetry
- Fields logged at every step:
- Where the logs live, retention:
- Dashboard, and who looks at it when:

## 4. Crawl, Walk, Run
| Stage | Dates | What the agent may do | Human role | Exit criteria (numbers) | Fall-back trigger |
|---|---|---|---|---|---|
| Crawl | | Draft only | Review and send 100 % | | |
| Walk | | | | | |
| Run | | | | | |

- Steps that could become plain code once stable:

## 5. Change plan (ADKAR)
| Stakeholder group | Awareness | Desire | Knowledge | Ability | Reinforcement | Main resistance and response |
|---|---|---|---|---|---|---|
| Frontline users | | | | | | |
| Their managers | | | | | | |
| IT / data owners | | | | | | |
| Legal, risk, compliance | | | | | | |

## 6. Reading the scorecard
- How these KPIs show the business goal is (or is not) being met:
- Decision asked of leadership now:
`,
    checklist: [
      "All four dimensions have at least one KPI, not only financial ones",
      "Every KPI has a baseline, a target, a data source, an owner and an action threshold",
      "Crawl → Walk and Walk → Run exit criteria are numbers with dates",
      "Each stakeholder group has an ADKAR line and a named resistance",
      "The scorecard links to the business goal leadership already tracks",
    ],
    bubble: "This is the page you put in front of leadership. Make every number earn its place.",
  },
};
