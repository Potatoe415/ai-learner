---
kind: post-mortem
based_on: content/01-extracted/02_Modules/Module_2_Complete.md, content/01-extracted/02_Modules/Module_2_Complements.md
based_on_hash: 2a1176681b1b
kicker: Post-mortem · Ollama CVE-2024-37032, 2024
title: The private model server that could run an attacker's code
bubble: Local and private is a great start. Patched is the finish line.
---
Ollama's promise is simple: run the model on your own machine, so medical files, financial details and legal notes never leave the building, and answers come back without a round trip to the cloud. In 2024 a critical remote code execution flaw, CVE-2024-37032, showed the other side of that promise: whoever hosts the model also owns its security.

## Numbers

| Value | Label |
|---|---|
| CVE-2024-37032 | public identifier of the flaw |
| Critical | remote code execution: attackers could run arbitrary code on affected systems |
| June 26, 2024 | date of the GBHackers report on the flaw |
| 100 % | data confidentiality: the selling point of local inference |

## Timeline

### 2021

Michael Chiang and Jeffrey Morgan start Ollama in Y Combinator's winter 2021 cohort, to let developers and organisations run LLMs locally, privately and with low latency.

### Adoption

Developers and organisations adopt it to keep control of their data. It runs Llama 2, Mistral and Gemma from a command line on macOS, Linux and Windows, isolates each model's environment and plugs into LangChain.

### 2024

A critical remote code execution flaw, CVE-2024-37032, is discovered. On an affected system, an attacker could execute code of their choosing.

### Response

GBHackers reports the flaw on June 26, 2024, and patches are released. The course's verdict: open-source AI platforms need ongoing security assessments and timely updates.

## Lessons

- Local keeps data away from a vendor, not from an attacker. Once you host the model, its server is part of your attack surface.
- Open source lets anyone audit the code, but a fix only protects you once you install it. Self-hosting means owning the patch cycle.
- Add “who patches it, and how fast?” to the data sovereignty question for every platform you shortlist.
- Run the model server like any other risky service: in an isolated container, with no more access than it needs, and listed in central IT's inventory rather than installed quietly by one team.

:::check
Your team picks a self-hosted open model to process regulated customer data. Which plan matches the lesson of this case?

- [ ] a. Skip the security review: the data never leaves our machines, so no one outside can reach it
- [x] b. Track the project's security advisories, patch on a set schedule, run the server isolated with minimal access, and register it with central IT
- [ ] c. Drop open source and use a closed model, since open code exposes its flaws to attackers
- [ ] d. Rely on the community: so many people read open-source code that flaws are fixed for everyone

### Hint a

Local protects data from the vendor. A remote code execution flaw is exactly how an outsider reaches your machines.

### Hint c

Transparency is also what lets the community find and fix flaws, and closed services carry their own data risks. The issue was patching, not openness.

### Hint d

The community found and fixed the flaw. Your server stays vulnerable until you install the patch.

### Explanation

Yes. Self-hosting moves the security work to you: watch advisories, patch fast, contain the blast radius, and keep the server visible to the people responsible for security.
:::

## Sources

- GBHackers. (2024, June 26). Ollama AI platform flaw let attackers execute remote code.
- GeeksforGeeks. (2024, June 3). Ollama explained: Transforming AI accessibility and language processing.
- Hostinger. (2025, May 8). What is Ollama? Introduction to the AI model management tool.
- MIT Applied Agentic AI, Module 2: Emerging agentic platforms (Ollama).
