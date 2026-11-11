---
kind: case-study
based_on: content/01-extracted/02_Modules/Module_6_Complete.md, content/01-extracted/02_Modules/Module_6_Complements.md
based_on_hash: bbde058d2b67
kicker: Case study · IBM Watson Health, 2021
title: A revolution in cancer care that never got past the pilot
bubble: A famous name, a bold promise, no deployment. Let's see what was missing.
---
IBM teamed up with hospitals to have Watson recommend cancer treatments: the most sensitive decision a clinic makes, handed to a system pitched as revolutionary. In many cases the recommendations were unsafe or incorrect. The project lost its credibility and was shut down in 2021. Set beside a healthcare agent from the same module that did reach production, the contrast is instructive.

## Numbers

| Value | Label |
|---|---|
| 2017 | STAT reports that Watson, pitched as a revolution in cancer care, is nowhere close |
| Many cases | of unsafe or incorrect treatment recommendations |
| 2021 | the project, its credibility gone, is shut down |
| 100+ FTE | the counter-example: workload absorbed by Cencora's voice agent Eva, four times faster, with human review |

## Timeline

### The pitch

IBM partners with hospitals so Watson can recommend cancer treatments. The promise is a revolution, aimed straight at clinical decisions.

### In use

In many cases Watson's recommendations are unsafe or incorrect. Advice that is sometimes unsafe cannot be relied on at the bedside.

### September 2017

STAT (Ross and Swetlitz) publishes its investigation: the revolution in cancer care is nowhere close.

### 2021

Having lost credibility, the project is shut down.

### The contrast

Cencora's Eva, built by Infinitus, takes on administrative calls (benefits verification, drug-service management), sends uncertain cases to people, and has every call recorded and spot-checked.

## Lessons

- Scope decides survival. Watson aimed at the highest-stakes judgement first; Eva started with narrow, repetitive admin work. Decompose, and automate the predictable, reversible steps before the risky ones.
- Onboard gradually. Nobody expects a new hire to master everything on day one. A clinical adviser belongs in Crawl, recommending to clinicians who decide, with telemetry proving its quality before it gains any autonomy.
- Governance is a KPI dimension, not a footnote. Unsafe output in healthcare is a guardrail violation, and it has to be counted, with an action threshold, from the first case.
- Trust is the hardest metric to win back. Unsafe advice in a few cases was enough to sink credibility for the whole project, and without credibility there is no adoption.
- A pitch is not a business case. Success has to be defined as a measurable outcome before launch, or the gap between the promise and the numbers shows up in the press instead of on your dashboard.

:::check
Your health system wants an agent that recommends treatment plans to doctors, rolled out across all sites at once. The demo on hand-picked cases was impressive. What do you recommend?

- [x] a. Start with lower-risk steps around the workflow and keep any recommendation in Crawl, with clinicians deciding every case and quality and safety logged against agreed gates
- [ ] b. Roll out everywhere but add a disclaimer that doctors remain responsible
- [ ] c. Run the demo cases again with a larger model to confirm the score
- [ ] d. Announce the project widely to build momentum and secure budget

### Hint b

A disclaimer moves liability on paper but measures nothing. Unsafe recommendations would still reach every site before anyone sees the pattern.

### Hint c

Hand-picked cases are the sandbox. A bigger model scores them again; it tells you nothing about real patients, real records systems or real clinicians.

### Hint d

Announcing a revolution before the numbers exist is the Watson pattern. When results disappoint, credibility goes with them.

### Explanation

Yes. Decompose, start where errors are cheap and reversible, and keep the high-stakes step under full human control until telemetry shows it is safe. That is how the Cencora agent reached production and the Watson project did not.
:::

## Sources

- Ross, C., & Swetlitz, I. (2017, September 5). IBM pitched its Watson supercomputer as a revolution in cancer care. It's nowhere close. STAT.
- MIT Applied Agentic AI, Module 6, section 2: Last-mile integration, why pilots succeed but deployments stall (IBM Watson Health example).
- MIT Applied Agentic AI, Module 6, section 1: Voice agents (Cencora and Infinitus example).
