---
kind: post-mortem
based_on: content/01-extracted/02_Modules/Module_4_Complete.md, content/01-extracted/02_Modules/Module_4_Complements.md
based_on_hash: 7faacb162889
kicker: Post-mortem · Hong Kong deepfake video call, 2024
title: Everyone on the call was fake
bubble: Every face on that call was fake. Let's see how it worked.
---
In early 2024 a finance employee in the Hong Kong office of a multinational firm received a message that seemed to come from the UK-based chief financial officer, asking for a confidential transaction. The employee was suspicious and asked for a video call to check. On the call were the CFO and several known colleagues, who looked and sounded right. Every one of them was a real-time deepfake built from public video clips and audio recordings.

## Numbers

| Value | Label |
|---|---|
| 15 | transfers authorised after the call |
| HK$200 M | about US$25.6 million sent |
| 0 | real colleagues on the video call, apart from the victim |
| $243,000 | lost in 2019 to an earlier, voice-only clone of a CEO |

## Timeline

### Reconnaissance

The attackers collect public footage and recordings of the firm's executives: the raw material for the clones.

### The message

A request “from the CFO” asks for a secret transaction. The employee suspects phishing: the first instinct is right.

### The check

To verify, the employee joins a video conference. Several familiar faces and voices confirm the request. Seeing them feels like proof.

### The transfers

Convinced, the employee makes 15 transfers totalling about HK$200 million (around US$25.6 million) before the fraud is uncovered.

### The pattern

Five years earlier, in 2019, a voice clone of a German CEO, down to his accent and pauses, had talked a British managing director into an urgent €220,000 (about $243,000) transfer. Same playbook, one more sense fooled.

## Lessons

- Seeing and hearing someone is no longer verification. The video call was not the safeguard, it was the attack.
- Put the control in the process, not in one person's judgement: high-value transfers need out-of-band authorisation (a hardware security key or a digital signature) and two approvers above a set amount.
- No system was hacked. In kill chain terms the attackers went from weaponisation (the clones) to actions on objectives through a trusted person. An agent with payment rights faces the same pressure, at machine speed, so it must never act on instructions found in the content it reads.
- Detect matters too: transaction alerts on several large transfers to new accounts give a second chance to stop the loss.

:::check
You are designing an agent that prepares supplier payments. Which control would have stopped this fraud even if the person, or the agent, fully believed the request?

- [ ] a. Deepfake detection software on every video call
- [ ] b. Mandatory video verification for large transfers
- [x] c. Out-of-band cryptographic sign-off plus two approvers above a set amount
- [ ] d. An annual awareness training on deepfakes

### Hint a

Detection helps, but it is a race: a better fake beats it. You want a control that does not depend on spotting the fake.

### Hint b

That is exactly what the attackers exploited. The video call was the attack.

### Hint d

Training raises suspicion, and this employee was already suspicious. Belief was not the weak point; the process was.

### Explanation

Yes. A signature from a hardware key and a second approver do not care how convincing the fake is. Hard process limits are the control that survives perfect deception, for people and for agents.
:::

## Sources

- Milmo, D. (2024, February 5). Company worker in Hong Kong pays out £20m in deepfake video call scam. The Guardian.
- Damiani, J. (2019, September 3). A voice deepfake was used to scam a CEO out of $243,000. Forbes.
- MIT Applied Agentic AI, Module 4: faculty session notes on the Hong Kong deepfake video conference and the 2019 UK energy CEO voice clone.
