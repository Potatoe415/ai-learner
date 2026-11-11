---
kind: post-mortem
based_on: content/01-extracted/02_Modules/Module_5_Complete.md, content/01-extracted/02_Modules/Module_5_Complements.md
based_on_hash: d88af238421e
kicker: Post-mortem · Samsung, 2023
title: Stage 1 in the headlines: confidential code in a public chatbot
bubble: A big name, a stage 1 mistake. Let's learn from it.
---
In 2023, Samsung staff uploaded confidential source code to a consumer generative AI tool. The company responded with a temporary ban on such tools, citing the risk that the data could be retained and reused outside the company. It was not alone: Apple reportedly restricted staff use of external AI tools over confidentiality, and JPMorgan barred employee access to ChatGPT pending policy and privacy reviews. None of this needed a sophisticated attack. It was ordinary people using a convenient tool, in a browser, with nothing better on offer.

## Numbers

| Value | Label |
|---|---|
| 3 | major firms that restricted staff use of public AI tools in 2023 (Samsung, Apple, JPMorgan) |
| 38 % | of employees surveyed admitted sharing sensitive work data with AI tools without permission |
| 46 % | the same figure among Gen Z (43 % among Millennials) |
| 52 % | of employees had received no training on using AI safely |

## Timeline

### Before

Easy, powerful AI tools reach every employee, often without IT or security knowing. Demand runs ahead of any approved option.

### 2023 · Samsung

Staff paste confidential code into a public chatbot. Samsung temporarily bans generative AI tools, pointing to external retention and reuse of the data.

### 2023 · Others follow

Apple restricts external AI tools for staff; JPMorgan blocks ChatGPT until its policy and privacy reviews are done.

### 2024 · The pattern

A survey of 7,000 people in the US, UK, Canada, Germany, Australia, India and New Zealand shows the behaviour is widespread, and mostly untrained.

## Lessons

- Demand comes before policy. If no approved tool exists, people find one: that is stage 1, planned or not.
- Treat any consumer AI tool in the browser as an outbound data channel until guardrails say otherwise.
- A ban is an emergency brake, not a strategy. The way out is policy, technology and culture together: sanctioned enterprise tools, data loss prevention and log review, training and safe sandboxes.
- What staff were pasting in shows real bottlenecks (debugging, reviewing code). That list is move 1 of the maturity cycle, handed to you for free.

:::check
You are the CIO. You discover developers pasting internal code into a consumer chatbot. What do you do first?

- [ ] a. Ban all generative AI tools permanently
- [x] b. Offer an approved enterprise-grade tool, publish a short usage policy, add data loss prevention and train the teams
- [ ] c. Leave it alone: the productivity gain is worth the risk
- [ ] d. Freeze all AI use until a fully autonomous agent platform is built

### Hint a

Samsung's ban was temporary for a reason: a permanent one pushes use onto personal devices where you see nothing. Use it as a brake, not a plan.

### Hint c

Leaked code and customer data are a legal, security and reputational risk. An agent that saves time but leaks data has negative value.

### Hint d

That jumps from stage 1 to stage 4, and the shadow use carries on in the meantime.

### Explanation

Yes. Easy access to a sanctioned tool removes the reason to go around IT, and the policy, controls and training make it safe. Then watch what people use it for: those are your first MVA candidates.
:::

## Sources

- MIT Applied Agentic AI, Module 5, section 5 (Agentic AI in browsers: risks and limitations), citing Park (2023) on Samsung, Vincent (2023) on Apple and Cerullo (2023) on JPMorgan.
- National Cybersecurity Alliance & CybSafe (2024), as cited in MIT Applied Agentic AI, Module 5, section 1 (Shadow AI).
- Dobrontei, S., Nurse, J., Plaggemier, L., & Alashe, O. (2025, September 30). Oh, behave! The annual cybersecurity attitudes and behaviors report 2025-2026. CybSafe.
- Krantz, T., Jonker, A., & McGrath, A. (2024, October 25). Shadow AI. IBM.
