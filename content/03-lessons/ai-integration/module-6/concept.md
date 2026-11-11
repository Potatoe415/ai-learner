---
kind: reading
based_on: content/01-extracted/02_Modules/Module_6_Complete.md, content/01-extracted/02_Modules/Module_6_Complements.md
based_on_hash: bbde058d2b67
kicker: Concept · The last mile
title: A pilot that works is not a deployment
bubble: Any pilot can fly in a sandbox. Let's get yours out of purgatory.
---
Most AI pilots look good. Far fewer reach daily use. The stretch between the two is the last mile: real callers, real data, real systems, and people who have to change how they work. This module shows why pilots stall, how to widen an agent's autonomy in stages, how to bring people along, and how to prove with numbers that it works.

## Voice agents: a pilot that passed, a launch that failed

A voice agent talks with people instead of offering keypad menus. It chains three parts you already know: speech-to-text to turn the call into words, a language model or decision engine to work out what the caller wants, and text-to-speech to answer in a natural voice. Live calls add their own traps: people interrupt, talk over the agent and pack several requests into one sentence, so turn-taking matters as much as accuracy.

Healthcare is a natural target: bookings, opening hours, refill requests, test-result calls. The course's teaching case is fictional but painfully familiar. Maple Heights Family Clinic sees about 150 patients a day and its phone lines are jammed every morning. It pilots a voice agent for three jobs: book appointments, give opening hours, pass calls to staff. Staff play patients and read clean scripts. The agent copes, leadership approves, and the first live week goes wrong in four places.

| What happened live | Root cause | What should have been there |
|---|---|---|
| Elderly callers, slang, a parent in a car with the GPS talking over her: the agent repeats its prompt, then hangs up | Tested on scripts, never on interruptions, broken speech or several requests in one sentence | Tests with messy real speech, accents, overlapping audio and barge-in |
| Slots offered that were already gone, double bookings, patients not in the system | The scheduling API served stale data at peak demand | Integration tested under load, with a freshness check before every booking |
| A caller who needs the nurse about her blood sugar is looped back to the main menu | Hand-off only fired on exact phrases like “talk to a human” | Escalation on intent and distress, not on keywords |
| Public complaints within a week, staff rebooking by hand, morale down | No dashboard, no tagging of failed calls, no way for staff to report issues | Escalation, booking accuracy and hang-up rates watched from day one |

:::callout Done right
At Cencora, a large US healthcare distributor and clinic operator, a voice agent called Eva, built by Infinitus, handles benefits verification and drug-service calls. It absorbs work once done by more than 100 full-time staff, runs about four times faster, sends uncertain cases to human review, and every call is recorded and spot-checked.
:::

## Pilot purgatory

The clinic is not an exception. Industry estimates put the share of AI initiatives stuck at the pilot stage at 70 to 90 %, with roughly four production systems for every 33 prototypes. Last-mile integration is the work of turning a local trial into routine operations at scale, and it is where the value is either realised or lost.

Pilots succeed for reasons that do not survive scale: one narrow problem, curated or static data, a sandbox cut off from live systems, clear targets, and a 6 to 12 week timeline that rewards speed over durability. A team can show 90 % success in that setting and still have proved very little about production.

- Start from one narrow use case with a business metric attached. Technical success with no visible business value leaves an ROI clarity gap nobody will fund.
- Onboard the agent like a new hire: simple tasks first, harder ones as trust grows, with guardrails tested along the way.
- Plan integration with the real back-end systems (APIs, middleware) and keep data flowing in real time. Without MLOps habits (automated deployment, version control, monitoring) a pilot cannot be reproduced at scale.
- Design conversations for varied phrasing, accents and misunderstandings, with easy recovery and a clear route to a person.
- Check data readiness (available, clean, diverse, secure) and give a governance group ownership. Amazon scrapped an internal hiring tool after it learned from past CVs to prefer men.
- Treat change management and training as part of the build. This is often a multi-year journey.

| | In the pilot | In production |
|---|---|---|
| Inputs | Clean, structured test cases | Messy, ambiguous, sometimes hostile real traffic |
| Systems | Sandbox, no integration burden | Legacy telephony, CRM or medical records, streaming data, real load |
| People | Enthusiastic volunteers | Busy staff who may see the agent as a step towards layoffs |
| Governance | Rarely any audit log, access control or liability rules | Legal and compliance can halt it the day they look |
| Cost | A small test budget | Compute that grows with volume (IBM expected AI compute cost to rise 89 % between 2023 and 2025) |
| Proof | “It works in the demo” | A business number moves, and keeps moving |

## Automate steps, then widen autonomy

Saskia Listle's law of decomposition: you cannot automate a process, only a step. Asking one agent to “automate client onboarding” gives you a huge context, dozens of failure modes and no way to debug. Break the workflow into small steps, score each on predictability (rule-like or judgement) and on risk (reversible or not), and automate the predictable, low-risk steps first, with plain code checks between them.

Then widen autonomy in three stages. Each stage ends with an exit gate written as numbers and agreed before the stage starts.

- Know when to stop using the model. Once about 95 % of cases in a step follow the same logic, rewrite that step as a script or microservice: the faculty cite token costs down 90 %, latency from seconds to milliseconds, and fully reproducible audits.
- Keep a person in the decision seat for consequential moves. Frankee.ai's agile assistant pulls blockers from chat on its own, but never reschedules a sprint or assigns tickets without the Scrum Master's click.
- Re-test every model upgrade before promoting it. At Frankee.ai, an unannounced API change truncated outputs and silently broke user-story generation.

| Stage | The agent… | People… | Example (Olivia, a partner-hours agent) |
|---|---|---|---|
| Crawl · human in the loop | Extracts, drafts and recommends, never acts | Review, edit and submit 100 % of cases; build baseline telemetry and a gold-standard set | Suggests opening-hour extensions; account managers check and send |
| Walk · human on the loop | Executes low-risk, deterministic actions; flags anything below a confidence floor (say 85 %) | Watch dashboards, inspect samples, take the escalations | Messages partners; a clear “YES” updates Salesforce and the POS, anything ambiguous goes to a person |
| Run · autonomy with circuit breakers | Runs whole multi-step workflows | Spot-audit, review monthly KPI drift, answer automated anomaly alerts | Runs across Benelux and Germany; managers review weekly conversion dashboards and anomaly logs |

## People: resistance is the usual blocker

Ali Tobah's view: the technology is ready; the last mile is organisational, about incentives, psychological safety and clear liability. Up to 70 % of change programmes are reported to fail on employee pushback or weak management support. With AI the fear is concrete: one survey found 74 % of Indian workers fear AI could take their jobs, and experts warn up to 40 % of roles worldwide could be affected. Not knowing how the system decides, or doubting one's own skills, adds to it.

Resistance also comes from above and around: leaders attached to familiar practice, cultures that prefer established processes, avoid risk and think in silos, thin budgets, legacy systems that make the agent look unreliable, and unclear AI policies. Frontline staff who feel threatened may quietly route around the agent, or collect its edge-case errors to prove it cannot be trusted.

ADKAR treats change as five building blocks, in order, for each group of people:

- Kotter's eight steps give the organisation-level sequence: create urgency, build a coalition of AI champions, set a vision of human-AI work, communicate it, remove barriers, win early with pilots, consolidate gains, anchor the change in culture.
- Talk openly: town halls, direct answers to fears, honesty about how decisions are made. Transparency is linked to less resistance and higher adoption.
- Involve people: cross-functional committees, users choosing use cases, peer change champions.
- Roll out in rings: internal testing with selected staff, a beta with a small group, then everyone. Launching 100 % on day one is usually too risky.
- Measure it: adoption by department, satisfaction with the tool, productivity, resistance incidents and how fast they are resolved, plus periodic readiness checks.

| Block | Question to answer | What it looks like for an agent |
|---|---|---|
| Awareness | Why change? | Explain the problem the agent solves and why now |
| Desire | What is in it for me? | Say plainly how the agent augments the role and what happens to the work it takes |
| Knowledge | How do I work with it? | Hands-on workshops on the real tool; per Listle, a PDF and a 30-minute webinar will not do |
| Ability | Can I do it on a busy day? | Coaching, mentoring, a help desk, staff co-designing the guardrails |
| Reinforcement | Will it stick? | Share wins, act on feedback, track adoption by team |

:::callout Healthy doubt
The aim is not zero resistance. Some scepticism is right and points at real failure modes. Give it a channel and turn it into problem-solving.
:::

## A scorecard in four dimensions

No single number describes an agent. Measure it on four dimensions, weighted for the use case: a legal summariser puts accuracy and compliance first, a retail chatbot puts experience first. Pick KPIs for what the agent does and what its business unit needs, not for what the vendor dashboard happens to show. Raw internals such as token counts only belong if they map to an outcome someone cares about.

- Other cuts of the same idea appear in the course: effectiveness, efficiency, user experience, learning and governance; or effectiveness, efficiency, learning and adaptation, human factors. Whatever the labels, never report money or time saved alone.
- Maple Heights could have tracked three numbers from day one: escalation rate, appointment accuracy (valid bookings versus failed or duplicated) and abandonment (callers who hung up unresolved).

| Dimension | Question | Example KPIs |
|---|---|---|
| Technical | Is the machinery sound and within bounds? | Latency per step, tool error rate, uptime, schema errors, hallucinations or guardrail violations |
| Operational | Does the work get done? | Task completion, first-contact resolution, deflection, escalation and abandonment rates |
| Financial | Is it worth it? | Cost per resolution, labour hours saved, infrastructure run-rate |
| Adoption and trust | Do people accept it, and is it learning? | CSAT or NPS, staff override rate, sustained usage, prompt rework rate |

:::callout Logs first
KPIs are computed from structured records, not estimated afterwards. Every step should emit one JSON object: session, step, agent, model, tokens, latency, tool called and its status, whether a human overrode it, any validation error. As Amado Lopez puts it, you cannot govern what you cannot trace.
:::

## Close the loop

A number nobody acts on is decoration. Three loops turn metrics into change. Users flag bad answers through ratings and complaints, reviewed by hand (vital early on). Automated monitors spot patterns, such as a spike in “I do not understand”, and trigger a fix or an escalation. Supervisors read the dashboards and adjust thresholds, success criteria or integrations. Early deployments lean on human oversight, mid-stage ones on rules, and advanced ones may have agents adjusting each other.

- No ground truth for tone or helpfulness: define a rubric and keep human grading for samples.
- Metric distortion: pushing speed alone hurts accuracy. Pair every speed KPI with a quality KPI.
- Drift: performance decays as inputs and systems change. Compare each week with the last.
- Resistance to evaluation: frame monitoring as managing a new colleague, not doubting the project.
- Start lean with one or two KPIs per agent, mix back-end logs with user feedback, keep a human on high-stakes outputs, and have a dashboard from day one.

:::callout Action threshold
Write the trigger next to every KPI. If abandonment rises 15 % in a week, the system needs intervention, not a slide next quarter. And, in Simon Barna's words, never scale an agent you have not measured: you would only industrialise its errors.
:::

:::takeaways
- Pilots stall on messy inputs, legacy integration, missing governance and people, rarely on the model itself.
- Automate steps, not processes, and widen autonomy through Crawl, Walk and Run with numeric gates agreed in advance.
- Score technical, operational, financial and adoption KPIs from structured logs, each with an owner and an action threshold.
:::

:::check
Your 8-week pilot scored 94 % task success with volunteer staff on curated cases. Leadership wants the agent live for every customer next month. What do you propose?

- [ ] a. Go live for everyone: 94 % is above target
- [x] b. A Crawl phase on real traffic: the agent drafts, staff send, every step logged, with numeric gates agreed for moving to Walk
- [ ] c. Extend the sandbox pilot by six months to gather more evidence
- [ ] d. Switch to a larger model first to push the score towards 99 %

### Hint a

94 % on curated cases from volunteers says little about messy traffic, live integrations or reluctant users. That is exactly how the Maple Heights launch went wrong.

### Hint c

More sandbox time measures the same easy conditions. The unknowns are in production, and endless pilots are what purgatory looks like.

### Hint d

The score was measured on the wrong data. A bigger model does not fix stale APIs, keyword-only escalation or staff who route around the tool.

### Explanation

Right. Crawl meets real data and real users at low risk, produces the baseline telemetry and the gold-standard set, and earns staff trust. Leadership gets a dated path to Walk backed by numbers, not a vague “later”.
:::
