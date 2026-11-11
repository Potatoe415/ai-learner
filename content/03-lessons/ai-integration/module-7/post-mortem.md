---
kind: post-mortem
based_on: content/01-extracted/02_Modules/Module_7_Complete.md, content/01-extracted/02_Modules/Module_7_Complements.md
based_on_hash: c3fe233eedc0
kicker: Post-mortem · DoNotPay, 2024
title: An “AI Lawyer” with no file behind the claim
bubble: A bold claim and an empty file. Let's read the record.
---
DoNotPay promoted its tool as an “AI Lawyer”. Consumers were led to believe it could fully replace a human attorney. In 2024 the US Federal Trade Commission took enforcement action against the company, announced on 25 September 2024 in its crackdown on deceptive AI claims and schemes. The weak point the MIT course highlights is documentation: the company could not show records proving that its capabilities met legal standards. The course sets it against a success case, FAIRLY AI, whose documentation made audits easier and became a selling point.

## Numbers

| Value | Label |
|---|---|
| 2024 | the year the FTC acted against DoNotPay |
| 1 | headline claim, “AI Lawyer”, with no evidence on file to back it |
| 4 | documentation families that would have backed or corrected the claim |
| ISO 42001 | the certification FAIRLY AI reached by documenting from the start |

## Timeline

### Marketing

The product is sold as an “AI Lawyer”. The message suggests it can stand in for a human attorney.

### Evidence

The company lacks sufficient documentation to prove that the tool complies with legal standards: nothing on file backs the capability it advertises.

### 25 Sept 2024

The FTC announces its crackdown on deceptive AI claims, DoNotPay among the cases. The result is a regulatory penalty and reputational damage.

### Contrast, 2025

FAIRLY AI works with Prescient Security toward ISO 42001: auditor-friendly records built into daily operations, smoother audits, more business credibility.

## Lessons

- Every capability you claim needs test evidence behind it: a golden set, scores, known failure cases. A claim without an eval is a liability.
- Document limits as carefully as capabilities, and show them where users make decisions.
- In regulated domains such as law, health or finance, experts must review the reference answers and the results.
- Regulators look at evidence after the fact. Keep testing records per release, versioned and retrievable by 2 pm the next day.

:::check
Your sales team wants to advertise that your contract agent “reviews contracts as well as a lawyer”. What do you need on file first?

- [ ] a. Customer testimonials saying the agent is very good
- [ ] b. A disclaimer in small print at the bottom of the page
- [x] c. A documented evaluation: a golden set reviewed by lawyers, the agent's scores against it, and its known failure cases
- [ ] d. The model provider's published benchmark results

### Hint a

Satisfied users are not a measure of legal quality, and they are not testing evidence a regulator can audit.

### Hint b

Small print does not turn an unsupported headline claim into a supported one.

### Hint d

A generic benchmark measures the base model on someone else's tasks, not your agent on your contracts.

### Explanation

Yes. The claim is only as strong as the testing and validation evidence behind it: expert-reviewed cases, measured scores, documented limits, all versioned. If the scores do not support the sentence, change the sentence.
:::

## Sources

- Federal Trade Commission. (2024, September 25). FTC announces crackdown on deceptive AI claims and schemes.
- Prescient Security. (2025, March 31). How FAIRLY AI strengthened their AI governance by achieving ISO 42001 compliance.
- MIT Applied Agentic AI, Module 7: Documentation and compliance readiness (real-world failures and successes).
