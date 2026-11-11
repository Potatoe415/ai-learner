import type { LessonContent } from "../lessons";

// Module 10 · Capstone: ready. Source: MIT module 8 (chapter 1 Ethics in AI, chapter 2 The Capstone,
// required assignment 8.1) and its complements (capability gap, compute limits, orchestration patterns,
// Mailroom Metaphor, capstone sections and common failures, synthesis checklist).
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_10: LessonContent = {
  reading: {
    kicker: "Concept · Ethics and the adoption plan",
    title: "Can we? Done. Should we, and on what terms?",
    intro:
      "Ten modules taught you how to build, secure, test and scale an agent. This last one asks the questions that sit above all of them: who is affected, who is accountable, and is the outcome fair? Then it puts every piece you have made into one adoption plan you can defend in front of your leadership.",
    sections: [
      {
        heading: "Why ethics comes last",
        body: [
          "Ethics is not an extra chapter bolted on at the end. It is the lens you hold every earlier decision up to: the model you picked, the data you feed it, the actions you let it take, the people whose work it changes.",
          "AI raises sharper ethical questions than ordinary software for three reasons. It is often opaque, so nobody can fully say why it decided something. It is probabilistic, so the same input can give different outputs. And it scales, so one flaw is repeated thousands of times before anyone notices.",
        ],
        table: {
          head: ["", "A broken spreadsheet formula", "A biased model in production"],
          rows: [
            ["Who is affected", "One team, one report", "Every customer or applicant it touches"],
            ["How it is found", "Someone checks the totals", "Often only when outcomes are compared by group"],
            ["Speed of damage", "As fast as people open the file", "As fast as the agent runs"],
            ["Who answers for it", "The file owner", "Unclear, unless you named someone in advance"],
          ],
        },
        callout: {
          label: "Field note",
          text: "Ethical failures are business failures: lost trust, disengaged staff, customer backlash, regulators at the door. Building ethics into governance is risk management, not charity.",
        },
      },
      {
        heading: "Four principles, run like a mailroom",
        body: [
          "Four principles come up again and again: fairness (no one is disadvantaged because of a protected characteristic), transparency (decisions can be explained in plain words), accountability (autonomy never removes responsibility), and privacy (data is used with care and for a stated purpose).",
          "Principles only help if they turn into procedures. A handy model is the company mailroom. A good mailroom clerk never opens your letters, delivers only to verified recipients, logs every parcel in and out, refuses dangerous cargo, and works under a supervisor who answers for anything lost or damaged. Run your agent the same way.",
        ],
        table: {
          head: ["Mailroom rule", "Principle", "Concrete mechanism in your agent"],
          rows: [
            ["Never read the letters", "Privacy and purpose limitation", "Mask personal data before the model sees it, zero-retention terms with vendors, write access limited by IAM roles"],
            ["Deliver only to verified recipients", "Access control", "Each tool call checks who the agent acts for and what that user may touch"],
            ["Log every parcel", "Transparency", "A structured rationale stored with every decision; users told they are dealing with an AI"],
            ["Refuse hazardous cargo", "Fairness and guardrails", "Regular disparate impact tests; no inputs that act as stand-ins for protected traits"],
            ["The supervisor answers for losses", "Accountability", "A named role (for example the head of operations) owns every agent decision"],
            ["Unusual parcels go to the desk", "Proportional intervention", "Low-confidence or high-value cases go to a human review queue automatically"],
          ],
        },
        callout: {
          label: "Keep in mind",
          text: "An agent cannot be held legally or financially accountable. A person always is. If your plan does not say who, the answer will be chosen for you after the incident.",
        },
      },
      {
        heading: "Fairness: bias in, bias out",
        body: [
          "A model trained on past decisions learns the patterns in those decisions, including the unfair ones. Deleting the sensitive column does not fix this: other inputs (a postcode, a school, a word in a CV) can stand in for it. These are called proxies.",
          "The practical test is to compare outcomes between groups. Compute the rate of favourable decisions for each group, then divide each rate by the highest one. That is the disparate impact ratio. A long-standing rule of thumb from US employment practice, the four-fifths rule, treats a ratio below 0.8 as a warning sign worth investigating.",
        ],
        bullets: [
          "Test before launch on a realistic or synthetic dataset, then keep testing in production on a schedule.",
          "Check every input for proxies: does one value come mostly from one group?",
          "Keep the protected attribute out of the agent's inputs, but keep it (securely, lawfully) for the audit. You cannot measure what you deleted.",
          "Document it in a model card: purpose, data sources, performance by group, known limits and risks. Google researchers proposed the format in 2019.",
        ],
        callout: {
          label: "Watch out",
          text: "Passing the four-fifths rule is not a certificate of fairness, and failing it is not proof of discrimination. It tells you where to look. Small samples swing wildly, so report the counts next to the ratio.",
        },
      },
      {
        heading: "The work changes before the jobs go",
        body: [
          "Job loss is the concern employees raise most often, and it is about more than income: it touches identity, purpose and dignity. History gives a partial answer. ATMs took over some teller tasks, and banks moved tellers towards customer advice. Spreadsheets replaced manual bookkeeping and created demand for analysts. Automation tends to remove tasks first and reshape roles second.",
          "Recent cases show what happens when that is ignored. In August 2025 the Commonwealth Bank of Australia cut 45 call-centre roles after introducing an AI voice bot. Call volumes went up instead of down, the bank reversed the cuts and apologised. In Australia again, AI ordering at Hungry Jack's drive-throughs drew public criticism over entry-level jobs for teenagers.",
          "The mailroom helps here too. Sorting and routing the mail is mechanical: the agent takes it. Dealing with the strange parcel, the angry recipient, the policy exception is judgement: that stays with people, and becomes a larger part of the job. Plan that shift explicitly, task by task.",
        ],
        bullets: [
          "Reskilling budget and time, agreed before launch, not after.",
          "Internal mobility: a route into the new tasks (review queue, quality audits, exception handling).",
          "Early, honest communication about what changes and what does not.",
          "Real transition support for the roles that do shrink.",
        ],
      },
      {
        heading: "Other risks, and three quick tests",
        body: [
          "Bias is not the only ethical risk. Voice cloning already enables fraud: in 2019 criminals imitated a chief executive's voice and talked a UK energy company into wiring $243,000. In 2024 the US Federal Communications Commission banned AI-generated voices in robocalls after a fake President Biden message tried to discourage voters. In medicine, when an AI tool misses a diagnosis, liability between doctor, hospital and vendor is still unsettled.",
          "Before approving a use case, run three short tests:",
        ],
        bullets: [
          "Do no harm: borrowed from medicine. What is the worst realistic outcome for the person on the other end, and is it acceptable?",
          "Stakeholder impact: list employees, customers, investors and society, and write one line on how each is affected.",
          "Front-page test: would you be comfortable explaining this decision if it made tomorrow's headlines?",
        ],
        table: {
          head: ["Region", "Typical stance"],
          rows: [
            ["Europe", "Privacy first: GDPR and the AI Act set the bar"],
            ["United States", "Innovation first, with oversight growing sector by sector"],
            ["Asia", "Varies widely: some states run state-led experiments and regulate as they go"],
          ],
        },
        callout: {
          label: "Leadership",
          text: "Values in a mission statement change nothing. Values in operations, training and reporting lines do. Industry groups such as the Partnership on AI bring companies, researchers and civil society together to agree on norms you can borrow.",
        },
      },
      {
        heading: "Close the capability gap with one plan",
        body: [
          "The technology can now plan, call tools and act. Yet most enterprise use (around 85 % by one estimate) is still drafting, summarising and chatting. The gap is human and organisational, not technical. Boards have deep operating experience but no mental model for software that is not deterministic, so they default to caution.",
          "Your adoption plan bridges it by speaking their language: a risk register, operating cost, compliance commitments, measurable results. It has eight parts, and each has a classic trap.",
        ],
        table: {
          head: ["Section", "What it must show", "Common trap"],
          rows: [
            ["1 · Context", "Sector, organisation, one department, one bottleneck", "A use case as wide as “AI for healthcare”"],
            ["2 · Technology", "Models, hosting, platform, integrations, and why", "A list of tools with no trade-offs explained"],
            ["3 · Cost", "Capex, opex, staff and training, total cost", "Token costs only"],
            ["4 · Security", "NIST CSF 2.0 functions, prompt injection, tool privileges", "“We will encrypt the data”"],
            ["5 · Change and training", "Co-design workshops, incentives, psychological safety", "A user manual and an email"],
            ["6 · Scaling", "Crawl, Walk, Run with numeric gates", "Full autonomy on day one"],
            ["7 · Governance and ethics", "Named laws, guardrails, audits, fairness, an accountable person", "No specific regulation named"],
            ["8 · KPIs", "Effectiveness, efficiency, learning, human adoption", "Revenue ROI alone"],
          ],
        },
        callout: {
          label: "Big picture",
          text: "Together, the largest cloud providers spend hundreds of billions of dollars a year on data centres and chips, and power supply has become the main bottleneck (one retired Three Mile Island reactor is being brought back to feed data centres). Expect API prices to keep falling, and dedicated or sovereign hosting to stay scarce and expensive.",
        },
      },
    ],
    takeaways: [
      "Every ethical principle needs a mechanism and an owner. An agent is never the accountable party.",
      "Measure outcomes by group, hunt for proxies, and send doubtful or high-impact cases to people.",
      "Plan the work, not only the tool: which tasks move to the agent, and where the freed time goes.",
    ],
    check: {
      prompt:
        "Your CV-screening agent invites 30 % of applicants over 50 to interview and 48 % of applicants under 50. Overall accuracy against recruiter decisions is 91 %. What do you do first?",
      options: [
        { id: "a", text: "Nothing: 91 % accuracy shows the model works" },
        { id: "b", text: "Delete the date-of-birth field and redeploy" },
        { id: "c", text: "The ratio is 0.63, below 0.8: route rejections to human review, look for proxies, and record the issue with its named owner" },
        { id: "d", text: "Add a notice that AI decisions may contain bias" },
      ],
      correct: "c",
      hints: {
        a: "Accuracy against past recruiter decisions can simply mean the model copies past bias well. Compare outcomes by group.",
        b: "Graduation year, years of experience or old job titles can carry age just as well. Removing one field rarely removes the pattern.",
        d: "A notice is transparency, not a fix. Applicants are still being screened out unevenly.",
      },
      explanation:
        "Right. 30 / 48 = 0.63, well below the four-fifths line. Put people back on the affected decisions while you investigate, check the inputs for proxies, and make sure a named person owns the fix. That is the mailroom supervisor at work.",
    },
    bubble: "Last stretch. You know how to build it. Now let's make sure it's fair.",
  },

  postMortem: {
    kicker: "Post-mortem · Amazon, 2014–2018",
    title: "The recruiting model that learned to prefer men",
    context:
      "From 2014, a team at Amazon built a model to score job applicants from one to five stars, the way shoppers rate products. It learned from about ten years of CVs submitted to the company. Most of those came from men, reflecting the tech industry, so the model learned that pattern as if it were a sign of quality. Reuters revealed the project in October 2018.",
    numbers: [
      { value: "10 years", label: "of past CVs used as training data" },
      { value: "1 to 5 ★", label: "score given to each applicant" },
      { value: "≈ 500", label: "models built, by job function and location" },
      { value: "≈ 50,000", label: "terms from past CVs the models learned to weigh" },
    ],
    timeline: [
      { label: "2014 · Build", text: "The team trains models on a decade of applications and the hiring outcomes that followed. The goal: give the model 100 CVs and get the top five back." },
      { label: "2015 · The pattern", text: "The team notices that scores for software and technical roles are not gender-neutral. CVs containing the word “women's”, as in “women's chess club captain”, are marked down, and so are graduates of two women's colleges." },
      { label: "The patch", text: "Engineers make the models neutral to those specific terms. Nobody can guarantee the models will not find other ways to sort candidates unfairly, for example through verbs that appear more often on men's CVs." },
      { label: "2017–2018 · Shut down", text: "The team is disbanded by early 2017. Amazon says recruiters never used the tool to evaluate candidates; people close to the project say recruiters looked at its suggestions but did not rely on them alone. The story becomes a standard warning about biased training data." },
    ],
    lessons: [
      "Historical data records past decisions, including their bias. A model trained on it learns that bias and applies it at scale.",
      "Removing a word or a column is not a fix. Proxies carry the same signal by other routes.",
      "Test outcomes by group, not only overall accuracy, before launch and on a schedule after it.",
      "Stopping is a valid outcome. Keep a person accountable for the decision, and be ready to switch the system off.",
    ],
    question: {
      prompt: "Amazon's engineers neutralised the terms they had spotted. Why did that still not make the tool trustworthy?",
      options: [
        { id: "a", text: "The training data was too small" },
        { id: "b", text: "Other features could still act as proxies for gender, and nobody could prove they did not" },
        { id: "c", text: "The model was too slow for recruiters" },
        { id: "d", text: "Five stars is too coarse a scale" },
      ],
      correct: "b",
      hints: {
        a: "Ten years of applications is a lot of data. The problem was what the data contained, not how much there was.",
        c: "Speed was never the issue. The scores themselves were skewed.",
        d: "The scale is a presentation detail. A finer scale would carry the same bias.",
      },
      explanation:
        "Exactly. Fixing the proxies you can see leaves the ones you cannot. Without outcome testing by group, there was no way to show the tool was fair, so the responsible call was to stop.",
    },
    sources: [
      "Dastin, J. (2018, October 11). Amazon scraps secret AI recruiting tool that showed bias against women. Reuters.",
      "Satell, G., & Abdel-Magied, Y. (2020, October 20). AI fairness isn't just an ethical issue. Harvard Business Review.",
      "Cases cited in the concept step: Chalmers, S. (2025, August 21). Commonwealth Bank backtracks on AI job cuts, apologises for “error” as call volumes rise. ABC News (Australia).",
      "Parkes-Hupton, H. (2025, June 4). Ethical questions raised over Hungry Jack's AI drive-through. News.com.au.",
      "Damiani, J. (2019, September 3). A voice deepfake was used to scam a CEO out of $243,000. Forbes.",
      "Swenson, A. (2024, February 8). FCC bans AI-generated voices in robocalls that can deceive voters. PBS NewsHour.",
    ],
    bubble: "Good engineers, real data, unfair result. Let's see how it happened.",
  },

  lab: {
    kicker: "Lab · Ethics and fairness check",
    title: "Audit your agent's decisions, then map the work it changes",
    goal: "Run a small bias audit over a decision log (approval rate per group, disparate impact ratio, proxy check, human review queue), then map one role task by task to see what the agent takes, what stays human and what is new.",
    duration: "35 minutes",
    prerequisites: [
      "Python 3.10 or later (no extra packages, runs offline)",
      "Optional: a CSV export of real or test decisions from your agent",
      "Your MVA one-pager and 4D KPI scorecard from modules 8 and 9",
    ],
    steps: [
      {
        title: "Prepare a decision log",
        body: [
          "The script ships with a sample log of 24 credit-limit decisions. To use your own, export a CSV with the same columns: case_id, group, area, amount, decision (approve or decline), confidence.",
          "The group column holds the protected attribute you are testing (age band, gender, nationality). It must never be an input to the agent. Keep it in a separate, access-controlled audit table. In the EU, processing such data for bias testing is tightly restricted: check with your data protection officer first, or test on a synthetic dataset.",
        ],
      },
      {
        title: "Write the audit",
        body: ["Save this as bias_audit.py. The three constants at the top are your policy: change them to match your own rules."],
        code: {
          lang: "python",
          text: `# bias_audit.py: approval rate per group, disparate impact ratio, proxy check, review queue.
# Usage: python bias_audit.py            (built-in sample)
#        python bias_audit.py log.csv    (your own export)
import csv
import io
import sys
from collections import defaultdict

FOUR_FIFTHS = 0.80      # ratio below this is a warning sign
LOW_CONFIDENCE = 0.70   # declines below this go to a person
HIGH_AMOUNT = 5_000     # high-impact cases always go to a person
PROXY_COLUMNS = ["area"]

SAMPLE = """case_id,group,area,amount,decision,confidence
C01,A,Centre,1200,approve,0.94
C02,A,Centre,3000,approve,0.88
C03,A,North,800,approve,0.91
C04,A,Centre,6500,approve,0.83
C05,A,North,2200,decline,0.77
C06,A,Centre,1500,approve,0.90
C07,A,Harbour,900,approve,0.86
C08,A,North,4000,approve,0.81
C09,A,Centre,2500,decline,0.66
C10,A,North,1800,approve,0.92
C11,A,Centre,5200,decline,0.79
C12,A,North,700,approve,0.95
C13,B,Harbour,1100,decline,0.72
C14,B,North,2000,approve,0.87
C15,B,Harbour,600,decline,0.64
C16,B,Centre,3500,approve,0.84
C17,B,Harbour,1500,decline,0.69
C18,B,North,900,approve,0.89
C19,B,Harbour,7000,decline,0.81
C20,B,North,2600,decline,0.74
C21,B,Harbour,1300,approve,0.78
C22,B,Centre,1900,decline,0.71
C23,B,North,800,approve,0.90
C24,B,North,3000,decline,0.68
"""

def load(path: str | None) -> list[dict]:
    if path:
        with open(path, newline="", encoding="utf-8") as f:
            return list(csv.DictReader(f))
    return list(csv.DictReader(io.StringIO(SAMPLE)))

rows = load(sys.argv[1] if len(sys.argv) > 1 else None)

# 1. Approval rate per group and disparate impact ratio
totals, approved = defaultdict(int), defaultdict(int)
for r in rows:
    totals[r["group"]] += 1
    approved[r["group"]] += r["decision"] == "approve"
rates = {g: approved[g] / totals[g] for g in sorted(totals)}
best = max(rates.values())
if best == 0:
    sys.exit("No approvals at all: nothing to compare.")

print("Approval rate per group (ratio = rate / highest rate):")
below = set()
for g, rate in rates.items():
    ratio = rate / best
    flag = ""
    if ratio < FOUR_FIFTHS:
        below.add(g)
        flag = "  <-- below four-fifths"
    print(f"  group {g}: {approved[g]:>3}/{totals[g]:<3} = {rate:6.1%}   ratio {ratio:.2f}{flag}")

# 2. Proxy check: does one value of an input come mostly from one group?
print("\\nPossible proxies (80 % or more of a value from one group):")
found = False
for col in PROXY_COLUMNS:
    counts = defaultdict(lambda: defaultdict(int))
    for r in rows:
        counts[r[col]][r["group"]] += 1
    for value, groups in sorted(counts.items()):
        n = sum(groups.values())
        top_group, top_n = max(groups.items(), key=lambda kv: kv[1])
        if n >= 4 and top_n / n >= 0.8:
            found = True
            print(f"  {col} = {value}: {top_n}/{n} cases are group {top_group}")
if not found:
    print("  none found")

# 3. Human review queue (proportional intervention)
queue = []
for r in rows:
    declined = r["decision"] == "decline"
    reasons = []
    if declined and float(r["confidence"]) < LOW_CONFIDENCE:
        reasons.append("low-confidence decline")
    if float(r["amount"]) >= HIGH_AMOUNT:
        reasons.append("high amount")
    if declined and r["group"] in below:
        reasons.append("decline in a group below four-fifths")
    if reasons:
        queue.append((r["case_id"], r["group"], ", ".join(reasons)))

print(f"\\nHuman review queue: {len(queue)} of {len(rows)} cases")
for case_id, group, why in queue:
    print(f"  {case_id} (group {group}): {why}")`,
        },
      },
      {
        title: "Run it and read the results",
        body: [
          "On the sample, group A is approved 75.0 % of the time and group B 41.7 %, a ratio of 0.56. The area Harbour comes almost entirely from group B, so it may be acting as a proxy. Ten of 24 cases land in the review queue.",
          "Write down three things: is the gap real or a small-sample effect (look at the counts), which input could be carrying the protected trait, and who owns the follow-up. Then change one constant (for example LOW_CONFIDENCE = 0.80) and see how the queue size moves: that is the cost of more human review.",
        ],
        code: { lang: "shell", text: "python bias_audit.py\npython bias_audit.py my_decisions.csv" },
      },
      {
        title: "Map the work with the Mailroom Metaphor",
        body: [
          "Now look at the people side. Pick one role your agent affects and list its tasks with hours per week, today and after launch. Mechanical sorting moves to the agent; judgement stays human; some tasks are new (reviewing the agent's queue, auditing its decisions). Save this as workforce_map.py and replace the example with your role.",
        ],
        code: {
          lang: "python",
          text: `# workforce_map.py: which tasks the agent takes, which stay human, which are new.
ROLE = "Accounts payable clerk"
TASKS = [  # (task, hours/week today, hours/week after launch, done by)
    ("Match invoices to purchase orders", 12, 1, "agent, person spot-checks"),
    ("Chase missing documents by email", 6, 1, "agent"),
    ("Key invoice data into the ERP", 8, 0, "agent"),
    ("Resolve supplier disputes", 5, 6, "person"),
    ("Approve exceptions above policy", 3, 3, "person"),
    ("Review the agent's exception queue", 0, 5, "person (new task)"),
    ("Audit a weekly sample of agent decisions", 0, 2, "person (new task)"),
]
REDESIGN_SHARE = 0.40  # your own rule: above this share, treat it as a role redesign

today = sum(t[1] for t in TASKS)
after = sum(t[2] for t in TASKS)
new = sum(t[2] for t in TASKS if t[1] == 0)
freed = today - after

print(f"{ROLE}\\n")
print(f"{'Task':42} {'Today':>6} {'After':>6}  Done by")
for task, h_now, h_after, who in TASKS:
    print(f"{task:42} {h_now:>5}h {h_after:>5}h  {who}")
print(f"\\nHours today: {today} h/week, after launch: {after} h/week")
print(f"Hours in new tasks: {new} h/week")
print(f"Freed time to reassign: {freed} h/week ({freed / today:.0%} of the role)")
if freed / today > REDESIGN_SHARE:
    print("More than 40 % of this role changes: plan it as a role redesign,")
    print("with training, a named sponsor and an agreed use for the freed time.")`,
        },
      },
      {
        title: "Turn findings into commitments",
        body: [
          "For each issue (a ratio below 0.8, a likely proxy, a role that changes by more than 40 %), write one mitigation, one owner and one date. These lines go straight into section 7 (ethics and fairness) and section 5 (change management) of your adoption plan.",
        ],
      },
    ],
    checklist: [
      "I ran the bias audit on the sample or on my own decision log",
      "I wrote down the disparate impact ratio together with the counts behind it",
      "I checked at least one input for proxies and noted what I found",
      "I mapped one role task by task and know how many hours are freed",
      "Each issue found has a mitigation, an owner and a date",
    ],
    bubble: "Numbers first, opinions second. Let's audit your agent.",
  },

  deliverable: {
    kicker: "Deliverable · Capstone adoption plan",
    title: "Your complete adoption plan",
    purpose:
      "The final file: one coherent plan that brings together every piece you built, from the candidate card to the KPI scorecard, plus the ethics, fairness and workforce work from this module. Aim for 2 to 5 pages in the main body; move detail into appendices. Where you lack a number, say how you will get it.",
    fileName: "capstone-adoption-plan.md",
    template: `# Capstone adoption plan

Organisation (one sentence, used unchanged throughout the document):
Author:
Date and version:
Accountable executive (signs off on the agent's decisions):

## Summary for leadership
Five lines, no jargon: the problem, what the agent does, what it costs,
the main risk and how it is controlled, how success will be measured.
-

## 1. Context and use case
Reuses: agent candidate card (M0), MVA one-pager (M8).
- Sector and type of organisation:
- Department and process:
- The one bottleneck we are fixing:
- Volume and current cost (time, errors, delay):
- Why an agent and not a chatbot or search tool:
- What the minimum viable agent does, and does not do:

## 2. Technology choice and integration
Reuses: loop map (M1), architecture choices (M3), integration map (M4).
| Choice | Option picked | Alternatives considered | Why this one |
|---|---|---|---|
| Model tiers and routing | | | |
| Hosting (API, cloud, on premises) | | | |
| Platform or framework | | | |
| Orchestration: single agent, supervisor, or shared artifact | | | |
| Integrations (MCP servers, APIs) | | | |

- Systems the agent reads from:
- Systems the agent writes to, and with which permissions:
- Circuit breakers and kill switch (who can stop it, how fast):

## 3. Cost model
Reuses: cost estimate (M2). Prices read on (date):
| Line | One-off (capex) | Monthly (opex) | Notes |
|---|---|---|---|
| Model tokens (routed, with tool tax and history) | | | |
| Infrastructure (hosting, vector store, gateway, tracing) | | | |
| Data preparation and integration work | | | |
| Evaluation runs (golden dataset, red-teaming) | | | |
| Engineering and maintenance | | | |
| Human review in the loop | | | |
| Training and change management | | | |
| **Total, first 12 months** | | | |

- Savings or value expected, and how they are calculated:
- Break-even point:

## 4. Security plan (NIST CSF 2.0)
Reuses: security memo (M5).
| Function | Main risk for this agent | Control in place | Owner |
|---|---|---|---|
| Govern | | | |
| Identify | | | |
| Protect (incl. tool privilege limits) | | | |
| Detect (incl. prompt injection) | | | |
| Respond | | | |
| Recover | | | |

- Data privacy measures (masking, retention, vendor terms):

## 5. Change management, training and workforce
Reuses: Crawl-Walk-Run plan (M9), workforce map (this module).
| Role affected | Tasks moving to the agent | Tasks that stay | New tasks | Hours freed per week |
|---|---|---|---|---|
| | | | | |

- Co-design workshops (who, when):
- Training plan (hands-on, by role):
- Incentives and career path for reskilled staff:
- Psychological safety: how people report problems without blame:
- Communication plan (what is said, by whom, when):
- Support for roles that shrink:

## 6. Scaling strategy: Crawl, Walk, Run
Reuses: Crawl-Walk-Run plan (M9).
| Phase | Autonomy level | Scope | Exit gate (numeric) | Target date |
|---|---|---|---|---|
| Crawl | Suggests, a person approves every action | | | |
| Walk | Acts alone on low-risk cases, a person reviews exceptions | | | |
| Run | Acts alone within guardrails, people audit samples | | | |

- What sends us back a phase:

## 7. Governance, compliance and ethics
Reuses: guardrail register (M6), eval and audit plan (M7), bias audit (this module).

### 7.1 Compliance
| Regulation | Applies because | What we do |
|---|---|---|
| EU AI Act (risk class: ) | | |
| GDPR (incl. Art. 17 erasure, Art. 22 automated decisions) | | |
| Sector rules (e.g. HIPAA, CCPA, financial rules) | | |

### 7.2 Guardrails, evaluation and audit
- Hard guardrails (schemas, limits, blocked actions):
- Evaluation: golden dataset size, metrics, pass thresholds, frequency:
- Audit trail: what is logged for every decision, retention period:

### 7.3 Ethics and fairness
| Principle | Mechanism in this agent | Evidence | Owner |
|---|---|---|---|
| Fairness | | | |
| Transparency | | | |
| Privacy | | | |
| Accountability | | | |
| Proportional intervention | | | |

- Bias audit result (ratio per group, with counts):
- Inputs checked for proxies, and findings:
- Stakeholder impact (employees, customers, investors, society):
- Front-page test: one sentence we would be comfortable seeing in print:
- Model card: location and last update:

### 7.4 Accountability
- Person accountable for the agent's decisions:
- Person who can switch it off:
- Escalation path when something goes wrong:

## 8. KPIs
Reuses: 4D KPI scorecard (M9).
| Dimension | KPI | Baseline | Target | Source | Frequency |
|---|---|---|---|---|---|
| Effectiveness | | | | | |
| Efficiency | | | | | |
| Learning and adaptation | | | | | |
| Human adoption | | | | | |
| Fairness (from 7.3) | | | | | |

## 9. Open questions
| What we do not know yet | Why it matters | How we will find out | By when |
|---|---|---|---|
| | | | |

## Appendix: pieces reused
| Module | Piece | File | Last updated |
|---|---|---|---|
| 0 | Agent candidate card | agent-candidate-card.md | |
| 1 | Loop map | loop-map.md | |
| 2 | Cost estimate | cost-estimate.md | |
| 3 | Architecture choices | | |
| 4 | Integration map | | |
| 5 | Security memo (NIST CSF 2.0) | | |
| 6 | Guardrail register (AI Act, GDPR) | | |
| 7 | Eval and audit plan | | |
| 8 | MVA one-pager | | |
| 9 | 4D KPI scorecard, Crawl-Walk-Run plan | | |
`,
    checklist: [
      "One department and one bottleneck, with the same organisation framing everywhere",
      "Each technology choice is justified against an alternative, not just listed",
      "Costs cover infrastructure, evaluation, people and change management, not only tokens",
      "Security uses all six NIST CSF 2.0 functions and covers prompt injection and tool privileges",
      "Crawl, Walk and Run each have a numeric exit gate",
      "Ethics names the laws, the bias audit result, the workforce impact and one accountable person; KPIs cover all four dimensions",
    ],
    bubble: "Everything you built, in one file. This is the one you take to your leadership. Well done, architect.",
  },
};
