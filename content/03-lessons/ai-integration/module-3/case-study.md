---
kind: case-study
based_on: content/01-extracted/02_Modules/Module_3_Complete.md, content/01-extracted/02_Modules/Module_3_Complements.md
based_on_hash: 81331eb54889
kicker: Case study · Knight Capital, 2012
title: 45 minutes without a stop button
bubble: Even the best plug needs a fuse. Here's why.
---
Knight Capital Group was a major U.S. trading firm. In August 2012 it deployed new software for a trading programme. A deployment error, tied to an undocumented legacy configuration flag, sent the system into a high-speed loop of erroneous orders as soon as the market opened. No person was in the loop, and nothing outside the system could stop it fast.

## Numbers

| Value | Label |
|---|---|
| ≈ $440M | lost |
| 45 min | from market open to shutdown |
| 4M | trades executed |
| $10M | lost per minute, on average |

## Timeline

### Deploy · August 2012

Knight ships new software for a trading programme. The rollout goes wrong, and an old configuration flag that nobody had documented is still live.

### Market open

The automated system starts firing orders in a loop, buying high and selling low across millions of shares. No human approves or checks any of it.

### The next 45 minutes

About 4 million trades go out. Engineers have to find the faulty process before they can kill it, and the loss runs at roughly $10 million a minute until they do.

### After

The loss of about $440 million nearly bankrupts the firm, which is later acquired by another company.

## Lessons

- Automated systems scale errors with the same efficiency they scale productivity. An agent with write access (prices, refunds, inventory, mass emails) is the same kind of machine.
- Legacy flags and undocumented settings are live risk. Know every switch your agent's tools can flip, and retire the ones nobody owns.
- Throttle velocity in code: a cap on state-changing calls per hour (for example, refunds up to $1,000 an hour) that freezes the tool and alerts a person when it is hit.
- Set impact ceilings on write tools: above a set value, the action waits for a signed human approval.
- Keep an out-of-band kill switch that revokes the agent's tokens and isolates its sandbox without needing the agent's own control loop. Monitor continuously so someone knows when to pull it.

:::check
Monday, 9:02. Your refund agent starts issuing refunds in a loop. Which safeguard limits the damage most?

- [ ] a. A stronger system prompt telling the agent to be careful with refunds
- [x] b. A refund ceiling and hourly limit inside the tool that freeze writes and page the owner, plus a kill switch that revokes the agent's access from outside
- [ ] c. Detailed logs of every refund, reviewed every Friday
- [ ] d. A stop instruction the operator can send to the agent in the chat

### Hint a

A prompt is advice to the model, and a model stuck in a loop is not listening. Limits must live in code the model cannot bypass.

### Hint c

Logs explain the damage after the fact. By Friday the loop has run for four days.

### Hint d

That still relies on the agent's own loop behaving. If that loop is what is broken, the message may never be acted on. The switch must work without the agent's cooperation.

### Explanation

Right. Ceilings and velocity limits in the tool contain the loop within minutes, and an out-of-band kill switch stops it even when the agent's own logic is broken. That is what Knight was missing.
:::

## Sources

- Ponomarev, A. (2023, October 26). Deploy gone wrong: The Knight Capital story. Medium.
- MIT Applied Agentic AI, Module 3, section 1 (Accidents caused by automation) and office-hour complements (Algorithmic catastrophes: the Knight Capital case study).
