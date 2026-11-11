---
kind: concept-quiz
based_on: content/01-extracted/02_Modules/Module_3_Complete.md, content/01-extracted/02_Modules/Module_3_Complements.md
based_on_hash: 81331eb54889
kicker: Concept · How many cables?
next: Continue: Knight Capital post-mortem
bubble.start: Mission: plug 4 agents into 6 tools.
bubble.wrong: Hmm, recount the links!
bubble.right: Plugged in! Nicely done.
solved.without.label: Without MCP
solved.without.title: 4 × 6 = 24 connectors
solved.without.text: Every agent wires every tool by hand. It explodes as soon as you add an agent or a tool.
solved.with.label: With MCP
solved.with.title: 6 servers, 1 protocol
solved.with.text: Each tool exposes one MCP server. Every agent speaks the same host–client–server language.
---
Your company deploys 4 agents and relies on 6 tools. Without a shared standard, how many custom integrations do you need to build?

## Options

- [ ] a. 10
- [x] b. 24
- [ ] c. 6
- [ ] d. 4

## Hints

### a

You added. Without a standard, every agent has to connect to every tool: that's a multiplication, not an addition.

### c

You counted one side only. Every agent must talk to every tool, not just the 6 tools.

### d

You counted one side only. Every tool must be wired to each agent, not just the 4 agents.
