---
kind: case-study
based_on: content/01-extracted/02_Modules/Module_8_Complete.md, content/01-extracted/02_Modules/Module_8_Complements.md
based_on_hash: 6fa4edd8c432
kicker: Case study · Amazon's hiring tool, 2018
title: The recruiting model that learned to prefer men
bubble: Good engineers, real data, unfair result. Let's see how it happened.
---
Amazon built an AI tool to rank job applicants' résumés. It learned from the company's historical hiring data, and that history reflected a tech industry dominated by men. The model took the pattern for a sign of quality and began recommending men over women. In 2018 Amazon scrapped it, and Reuters reported the story that October.

## Numbers

| Value | Label |
|---|---|
| 2018 | Year Amazon scrapped the tool |
| “women's” | One word enough to push a résumé down the ranking |
| Past hires | The training data: years of decisions in a male-dominated field |
| 2 fronts | Damage: reputation in the media, legal exposure under equal employment laws |

## Timeline

### Build

The tool is trained on the company's historical hiring data. Nobody examines what those past decisions encode before using them as the definition of a good candidate.

### The pattern

The model systematically downgrades résumés containing the word “women's”, as in “women's chess club captain”. It has learned the skew in past hiring and applies it to every new applicant.

### 2018 · Scrapped

Amazon abandons the tool once the bias is discovered.

### Oct 2018 · Public

Reuters reports the case. Media coverage presents it as proof that bias can be “baked into” AI.

### Afterwards

The case becomes a standard warning: unexamined training data can encode and amplify discrimination, with reputational and legal consequences for the employer.

## Lessons

- Historical data records past decisions, including their bias. A model trained on it learns that bias and repeats it at scale.
- Test outcomes by group before launch and keep testing after: continuous disparate impact tests on synthetic demographic datasets are built to catch exactly this kind of skew.
- Hunt for proxies. The model never needed a gender field: a single word carried the signal.
- Document the model in a model card (purpose, data sources, performance, limits, risks) so its fitness for hiring is judged before use, not after.
- Stopping is a valid outcome. Someone must own the decision and be able to switch the system off.

:::check
What was the root cause of the bias in Amazon's recruiting tool?

- [ ] a. A programming bug in the ranking code
- [x] b. Training on historical hiring data that reflected a male-dominated industry, which the model learned as a signal of quality
- [ ] c. Gender was entered as an explicit input field
- [ ] d. The hiring team instructed the model to favour men

### Hint a

The code did what it was built to do: learn from the data. The problem was what the data contained.

### Hint c

No gender field was needed. The bias came through words such as “women's”, which acted as a proxy.

### Hint d

Nothing in the record points to intent. Unexamined data was enough to produce a discriminatory result.

### Explanation

Exactly. Bias in, bias out. The model learned the past and projected it onto every new applicant, which is why fairness has to be tested on outcomes, not assumed from good intentions.
:::

## Sources

- Dastin, J. (2018, October 11). Insight - Amazon scraps secret AI recruiting tool that showed bias against women. Reuters.
- MIT Applied Agentic AI, Module 8: Business risks of ethical failures (biased hiring algorithms).
