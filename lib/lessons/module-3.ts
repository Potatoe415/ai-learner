import type { LessonContent } from "../lessons";

// Module 3 · The universal plug. Source: MIT module 3 (sections 1 to 5, assignment 3.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_3: LessonContent = {
  reading: {
    kicker: "Concept · Tools, MCP, legacy systems",
    title: "One plug, many sockets",
    intro:
      "A playlist plays what was planned. A live band reads the room and takes requests. Agents are the band: they act inside your software, not next to it. This module is about the wiring: how an agent reaches tools, why old systems push back, and how one protocol replaces a drawer full of adapters.",
    sections: [
      {
        heading: "From clicking to asking",
        body: [
          "Most software is driven through screens: menus, filters, tabs, copy and paste. An agent lets people state an intent instead (“paginate the document, sort the references, add a Notes column to the table”) and does the clicking on their behalf.",
          "The plumbing underneath is old and simple. Since the web, software works as client and server: one side sends a request, the other processes it and answers. APIs turned that into reusable building blocks, which is why a young ride-hailing app could rent its maps from Google instead of drawing its own. An agent follows the same pattern: it calls a service, gets a response, and acts on it.",
          "Take “make me a playlist of the number-one hit from every year since 1985”. To do it inside a music app, the agent has to:",
        ],
        bullets: [
          "Turn the sentence into a sequence of operations.",
          "Fetch outside data (historical chart positions).",
          "Match each song to the app's own catalogue.",
          "Create a playlist in the user's account, with the user's permission.",
          "Add the tracks in the right order.",
          "Confirm, and keep the context for the follow-up (“now add a few tracks from 2023 in the same mood”).",
        ],
        callout: {
          label: "Same pattern at work",
          text: "Swap songs for stock: “check open orders for SKU-409 against warehouse stock; if stock is under the reorder threshold, raise an expedited purchase order and tell the account managers in Slack.” SAP, Salesforce and Slack, no screen, one sentence. And three places where a wrong call costs real money.",
        },
      },
      {
        heading: "Why bother: what agents bring to a workflow",
        body: [
          "Three gains come up again and again. Efficiency: routine steps such as reading CVs, checking public profiles and drafting candidate updates run on their own. Accuracy: rules are applied the same way every time, so a finance or compliance agent catches the missing document a tired person would skip. Responsiveness: an IT or operations agent keeps watching, answering and escalating after the team has gone home.",
        ],
      },
      {
        heading: "Wiring tools together: the automation spectrum",
        body: [
          "Agents usually live where people already work: Slack (conversations grouped by topic), Notion (pages, wikis and light databases), Discord (real-time text and voice rooms), email or a website. Between those apps sit meta-tools whose only job is to connect other tools. When a support bot escalates, one of them can email a colleague, open a task in Notion and log the case in a spreadsheet.",
          "Pick the lightest tier that can carry your logic. Each step to the right buys flexibility and costs engineering time.",
        ],
        table: {
          head: ["Tier", "Skill needed", "Strength", "Limit", "Typical use"],
          rows: [
            ["Zapier (no-code)", "Point and click", "About five minutes to set up, 6,000+ SaaS connectors", "Fixed trigger → action, no real branching, no reasoning", "Form → CRM → Slack notification"],
            ["n8n or Make (low-code)", "Visual flows, small expressions", "Branches, loops, self-hosting for privacy", "Hard to debug and to version in Git", "Event alerts, reconciliation across systems"],
            ["LangChain or LangGraph (pro-code)", "Python or TypeScript", "Stateful loops, memory, several agents, custom tools", "Needs a dedicated software team", "Compliance review agent, research assistant"],
            ["Custom Python (full-code)", "Systems engineering", "Total control, no vendor lock-in, lowest latency", "Highest build and maintenance cost", "High-volume or proprietary pipelines"],
          ],
        },
        callout: {
          label: "Errors scale too",
          text: "Automation repeats mistakes as fast as it repeats good work. In November 2023 an automated shutdown after a routing event took Optus offline across Australia for about 12 hours, hitting more than 10 million customers and 400,000 businesses. A 2024 University of Washington study found résumé-screening models favoured white-associated names 85% of the time. Reordering 1,000 blouses, sending evacuation alerts or rerouting trucks all deserve a person in the loop.",
        },
      },
      {
        heading: "Legacy systems were built for human speed",
        body: [
          "Most companies cannot throw away the system that runs payroll or the bank's core ledger. Agents have to plug into it, and that is where projects stall.",
        ],
        table: {
          head: ["Barrier", "What you see", "What helps"],
          rows: [
            ["Monolith", "Screens, business rules and data welded together; no clean API, or one that chokes on a whole document; any change risks breaking something else", "Middleware in front, new AI features as separate microservices"],
            ["Data drift", "Cust_ID in one system, CustomerNumber in another; truncated fields; undocumented codes. The model reasons over them and invents decisions", "Nightly conversion jobs (AWS Glue, Azure Data Factory), scripts that flag missing fields and duplicates for human review"],
            ["Human-speed sizing", "Built for one click every 30 seconds. An agent firing 500 calls a minute drains the connection pool, locks tables and takes the system down", "Connection pooling, caching, rate limits, read-only replicas"],
            ["Latency and load", "Slow answers in customer-facing use; no memory or CPU headroom for spikes", "Dashboards on latency, errors and load; reroute to a standby GPU or a fallback model"],
          ],
        },
        bullets: [
          "Start with a system audit: list the applications, databases and data flows, then pick the functions worth improving (customer lookup, order management, reporting).",
          "Middleware is the translator and traffic manager: it converts formats, enforces security rules and routes requests so old and new can talk without a rewrite.",
          "Pilot on routine, low-risk work (standard emails, meeting summaries) before touching core operations.",
          "Run urgent or sensitive inference on premises; push slow jobs such as detailed reports to the cloud. Keep components modular so each can scale alone.",
          "Every service authenticates every call (mutual TLS between services, role-based access), data is encrypted in transit, and every agent action is logged: data read, decision taken, person notified. Train people on data handling too.",
        ],
        callout: {
          label: "Integration is not access",
          text: "Being able to connect an agent to a database does not mean it should run any SQL it likes. Give it parameterised stored procedures on a read-only replica. When a system has no API at all (green-screen terminal, desktop ERP with no SDK), a computer-use agent that reads the screen is the last resort: 5 to 10 seconds per screen, fragile to layout changes and costly in screenshots.",
        },
      },
      {
        heading: "Customer-facing agents: tune the tone",
        body: [
          "Customers expect more than a correct answer: they want to feel heard. General models handle everyday language well but stumble on industry terms, regulation and the emotional temperature of a complaint. Fine-tuning, further training a model on your own examples, works like training one muscle group instead of the whole body. A common reply structure is Acknowledge → Apologise → Assure → Act.",
        ],
        table: {
          head: ["Technique", "How it works", "What it buys for tone"],
          rows: [
            ["Supervised fine-tuning (SFT)", "Train on labelled examples (tickets tagged by sentiment and urgency)", "Knows when to show sympathy and when to escalate"],
            ["Instruction tuning", "Train to follow explicit orders (“reply calmly to an upset customer”)", "Sticks to the brand voice and reply structure"],
            ["RLHF", "People upvote or downvote generated replies; a scoring system steers training", "Rewards helpful, policy-safe replies, discourages robotic ones"],
            ["DPO", "Train directly on pairs: preferred reply vs rejected reply", "Similar quality with no reward model, fewer moving parts, lower cost"],
            ["PEFT (adapters, low-rank updates)", "Change a small slice of the parameters instead of the whole model", "Ship new scripts (a new tariff, new slang) quickly and cheaply"],
          ],
        },
        bullets: [
          "Good training data covers four things: empathic phrases, when to move from reassurance to action, cultural and regional norms, and annotated escalation triggers.",
          "Example: an angry customer with surprise data charges. The agent tags the ticket angry and high priority, replies in three sentences (sorry, I understand, here is what I will check), and next quarter learns the new plans through a small adapter instead of a full retrain.",
          "Done well, routine questions get resolved by the agent (often 60 to 80%, depending on maturity) and the emotional, high-stakes calls reach a person faster.",
          "Watch for: formulaic replies (overfitting), tone-deaf ones (underfitting), lost product knowledge after tuning (catastrophic forgetting: mix in domain tasks), different voices across chat, email and phone, and privacy of the transcripts you train on (GDPR, HIPAA).",
          "On voice, speed is part of empathy: if the agent takes 1.5 seconds to acknowledge a sentence, callers talk over it.",
        ],
        callout: {
          label: "Escalate, don't improvise",
          text: "Models still miss sarcasm and idioms and can sound sorry while stating a wrong fact. Ground answers with retrieval, and hand legally sensitive or heated conversations to a person at once. Empathy that is only a script is “empathy theatre”.",
        },
      },
      {
        heading: "Beyond screens: agents and IoT",
        body: [
          "In factories, stores and hospitals, agents also read sensors and drive machines. The architecture has three layers.",
        ],
        table: {
          head: ["Layer", "What is in it", "What to watch"],
          rows: [
            ["Devices", "Sensors (temperature, humidity, motion, sound), actuators (motors, valves, switches), edge gateways that pre-process data", "Certificate-based device identity, secure boot, regular over-the-air security updates"],
            ["Communication", "Light protocols such as MQTT and CoAP, 5G or Wi-Fi 6, mesh networks", "Segment the device network away from business systems"],
            ["Intelligence", "Agents that spot anomalies, predict failures and coordinate responses", "Role-based limits on agent actions, audit log of every command, alerts on unusual behaviour"],
          ],
        },
        bullets: [
          "Distributed orchestration: several specialised agents, each owning a cluster of devices. Resilient, but they must not contradict each other.",
          "Hierarchical orchestration: a lead agent directs sub-agents (energy, security, comfort) and they report back. Simpler to manage and audit.",
          "Reported results are large: one carmaker with 10,000+ sensors on 50 lines cites 30% less unplanned downtime and about $2.3 million saved a year. Treat such reported figures as claims until you have your own baseline.",
          "Collect only the data you need, process it on the device where possible, and pseudonymise what leaves it.",
        ],
        callout: {
          label: "Watch out",
          text: "An actuator is a write tool. A valve that opens by mistake is a refund you cannot take back. The same ceilings and stop buttons apply.",
        },
      },
      {
        heading: "One plug for every socket: MCP",
        body: [
          "Without a shared standard, every agent needs its own connector to every tool, each with its own schema and its own maintenance whenever the tool's API changes. The Model Context Protocol (MCP), created by Anthropic and adopted as an open standard, splits the job into three roles so a tool is wrapped once and any compliant agent can use it.",
        ],
        table: {
          head: ["Role", "What it is", "Example"],
          rows: [
            ["Host", "The runtime where the model works", "Claude Desktop, an IDE, a company AI gateway"],
            ["Client", "The adapter inside the host; one connection per server", "Built into the host, you rarely write it"],
            ["Server", "A small program that exposes tools and data in the standard format", "A server for Slack, Jira, a Postgres database, a GitHub repository"],
          ],
        },
        bullets: [
          "Messages use JSON-RPC 2.0, over standard input/output for a local server or Server-Sent Events for a remote one.",
          "Servers already exist for Salesforce, Google Workspace, Figma and WordPress, so one conversation can reach the CRM, the calendar, the design file and the website.",
          "Schema bloat: each server advertises all its tools. Ten servers with a hundred tools can burn 10,000+ tokens before the user types a word.",
          "Identity: the agent should act with the user's delegated OAuth token, not a shared all-powerful service account, so row-level access rules still hold.",
          "Connections: long-lived links across firewalls time out. Plan heartbeats, reconnection, and what the agent does when a server is gone.",
          "Edge cases (patchy connectivity, unsupported devices, odd requests) and ambiguous intent are where reliability is won or lost. Security, governance and vendor support for MCP belong in the plan from day one.",
        ],
        callout: {
          label: "Your turn",
          text: "Before reading the answer anywhere, count it. The question below gives you a small company with a handful of agents and tools. How many connectors would it need without a standard?",
        },
      },
    ],
    takeaways: [
      "An agent turns intent into calls to real systems. Every call is a request your code can check, limit and log.",
      "Legacy systems break at agent speed: put middleware, rate limits and read-only access between the agent and the core.",
      "MCP wraps each tool once for every agent, but it does not decide what an agent is allowed to do. That is your job.",
    ],
    bubble: "Grab a cable. Let's plug some agents in!",
  },

  concept: {
    kicker: "Concept · How many cables?",
    question:
      "Your company deploys 4 agents and relies on 6 tools. Without a shared standard, how many custom integrations do you need to build?",
    options: [
      { id: "a", value: "10" },
      { id: "b", value: "24" },
      { id: "c", value: "6" },
      { id: "d", value: "4" },
    ],
    correct: "b",
    hints: {
      a: "You added. Without a standard, every agent has to connect to every tool: that's a multiplication, not an addition.",
      c: "You counted one side only. Every agent must talk to every tool, not just the 6 tools.",
      d: "You counted one side only. Every tool must be wired to each agent, not just the 4 agents.",
    },
    solved: {
      without: {
        label: "Without MCP",
        title: "4 × 6 = 24 connectors",
        text: "Every agent wires every tool by hand. It explodes as soon as you add an agent or a tool.",
      },
      with: {
        label: "With MCP",
        title: "6 servers, 1 protocol",
        text: "Each tool exposes one MCP server. Every agent speaks the same host–client–server language.",
      },
    },
    bubbles: { start: "Mission: plug 4 agents into 6 tools.", wrong: "Hmm, recount the links!", right: "Plugged in! Nicely done." },
    next: "Continue: Knight Capital post-mortem",
  },

  postMortem: {
    kicker: "Post-mortem · Knight Capital, 2012",
    title: "45 minutes without a stop button",
    context:
      "Knight Capital Group was a major U.S. trading firm. In August 2012 it deployed new software for a trading programme. A deployment error, tied to an undocumented legacy configuration flag, sent the system into a high-speed loop of erroneous orders as soon as the market opened. No person was in the loop, and nothing outside the system could stop it fast.",
    numbers: [
      { value: "≈ $440M", label: "lost" },
      { value: "45 min", label: "from market open to shutdown" },
      { value: "4M", label: "trades executed" },
      { value: "$10M", label: "lost per minute, on average" },
    ],
    timeline: [
      { label: "Deploy · August 2012", text: "Knight ships new software for a trading programme. The rollout goes wrong, and an old configuration flag that nobody had documented is still live." },
      { label: "Market open", text: "The automated system starts firing orders in a loop, buying high and selling low across millions of shares. No human approves or checks any of it." },
      { label: "The next 45 minutes", text: "About 4 million trades go out. Engineers have to find the faulty process before they can kill it, and the loss runs at roughly $10 million a minute until they do." },
      { label: "After", text: "The loss of about $440 million nearly bankrupts the firm, which is later acquired by another company." },
    ],
    lessons: [
      "Automated systems scale errors with the same efficiency they scale productivity. An agent with write access (prices, refunds, inventory, mass emails) is the same kind of machine.",
      "Legacy flags and undocumented settings are live risk. Know every switch your agent's tools can flip, and retire the ones nobody owns.",
      "Throttle velocity in code: a cap on state-changing calls per hour (for example, refunds up to $1,000 an hour) that freezes the tool and alerts a person when it is hit.",
      "Set impact ceilings on write tools: above a set value, the action waits for a signed human approval.",
      "Keep an out-of-band kill switch that revokes the agent's tokens and isolates its sandbox without needing the agent's own control loop. Monitor continuously so someone knows when to pull it.",
    ],
    question: {
      prompt:
        "Monday, 9:02. Your refund agent starts issuing refunds in a loop. Which safeguard limits the damage most?",
      options: [
        { id: "a", text: "A stronger system prompt telling the agent to be careful with refunds" },
        { id: "b", text: "A refund ceiling and hourly limit inside the tool that freeze writes and page the owner, plus a kill switch that revokes the agent's access from outside" },
        { id: "c", text: "Detailed logs of every refund, reviewed every Friday" },
        { id: "d", text: "A stop instruction the operator can send to the agent in the chat" },
      ],
      correct: "b",
      hints: {
        a: "A prompt is advice to the model, and a model stuck in a loop is not listening. Limits must live in code the model cannot bypass.",
        c: "Logs explain the damage after the fact. By Friday the loop has run for four days.",
        d: "That still relies on the agent's own loop behaving. If that loop is what is broken, the message may never be acted on. The switch must work without the agent's cooperation.",
      },
      explanation:
        "Right. Ceilings and velocity limits in the tool contain the loop within minutes, and an out-of-band kill switch stops it even when the agent's own logic is broken. That is what Knight was missing.",
    },
    sources: [
      "Ponomarev, A. (2023, October 26). Deploy gone wrong: The Knight Capital story. Medium.",
      "MIT Applied Agentic AI, Module 3, section 1 (Accidents caused by automation) and office-hour complements (Algorithmic catastrophes: the Knight Capital case study).",
    ],
    bubble: "Even the best plug needs a fuse. Here's why.",
  },

  lab: {
    kicker: "Lab · Your own MCP server (Lab 2)",
    title: "Build a plug with a fuse",
    goal: "Write a small MCP server in Python with one read tool and one write tool, guard the write tool with a value ceiling, a velocity breaker and a kill switch, then drive it from the MCP Inspector.",
    duration: "40 minutes",
    prerequisites: [
      "Python 3.10 or later",
      "Node.js 18 or later (the MCP Inspector runs through npx)",
      "A terminal and a text editor",
      "Optional: a desktop assistant that supports MCP servers",
    ],
    steps: [
      {
        title: "Set up the project",
        body: ["Create a folder and a virtual environment, then install the official MCP Python SDK with its command-line tools."],
        code: {
          lang: "shell",
          text: `mkdir refund-desk && cd refund-desk
python -m venv .venv
# Windows: .venv\\Scripts\\activate    macOS/Linux: source .venv/bin/activate
pip install "mcp[cli]"`,
        },
      },
      {
        title: "Write the server",
        body: [
          "Save this as server.py. The type hints and docstrings become the tool schema every client sees. Logs go to stderr because stdout carries the protocol.",
        ],
        code: {
          lang: "python",
          text: `# server.py: a minimal MCP server with one read tool and one guarded write tool.
import sys
import time
from pathlib import Path

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("refund-desk")

ORDERS = {
    "A123": {"status": "shipped", "days_late": 5, "paid": 80.0},
    "B456": {"status": "delivered", "days_late": 0, "paid": 25.0},
}

MAX_REFUND = 30.0      # impact ceiling per refund; above it, a person decides
MAX_PER_HOUR = 60.0    # velocity limit: total refunded in a rolling hour
KILL_SWITCH = Path(__file__).with_name("KILL_SWITCH")  # file present = all writes stopped
refunds: list[tuple[float, float]] = []                # (timestamp, amount)


def alert(message: str) -> None:
    """Stand-in for paging the owner. Never print to stdout in a stdio server."""
    print(f"ALERT: {message}", file=sys.stderr)


@mcp.tool()
def get_order(order_id: str) -> dict:
    """Look up an order by id. Read-only."""
    return ORDERS.get(order_id, {"error": f"order {order_id} not found"})


@mcp.tool()
def issue_refund(order_id: str, amount: float) -> str:
    """Refund part of an order. Write action, guarded by a ceiling, a breaker and a kill switch."""
    if KILL_SWITCH.exists():
        return "BLOCKED: kill switch is on. No write actions until a person removes it."
    order = ORDERS.get(order_id)
    if order is None:
        return f"REFUSED: order {order_id} not found."
    ceiling = min(MAX_REFUND, order["paid"])
    if not 0 < amount <= ceiling:
        return f"REFUSED: amount must be above 0 and at most {ceiling:.2f}. Ask a person to approve."
    now = time.time()
    last_hour = sum(a for t, a in refunds if now - t < 3600)
    if last_hour + amount > MAX_PER_HOUR:
        KILL_SWITCH.touch()  # trip the breaker: freeze every write
        alert(f"refund velocity limit hit ({last_hour:.2f} this hour). Writes frozen.")
        return "TRIPPED: hourly limit reached. Writes are frozen and the owner is alerted."
    refunds.append((now, amount))
    return f"OK: refunded {amount:.2f} on order {order_id}."


if __name__ == "__main__":
    mcp.run()  # stdio transport by default`,
        },
      },
      {
        title: "Open it in the MCP Inspector",
        body: [
          "This starts your server and opens the Inspector in the browser (the first run asks to install it through npx). Connect, open the Tools tab and list the tools.",
          "Read the JSON schema generated for each tool. That text is loaded into the model's context before it does anything: multiply it by every tool on every server and you see where schema bloat comes from.",
        ],
        code: { lang: "shell", text: "mcp dev server.py" },
      },
      {
        title: "Test, then trip the breaker",
        body: [
          "Call get_order with A123, then with Z999. Call issue_refund on A123 for 50: the ceiling refuses it. Then refund 25 three times: the third call trips the breaker, a KILL_SWITCH file appears next to server.py and the alert shows in the server log.",
          "Try any refund now: it is blocked. Delete the KILL_SWITCH file by hand and refund 5: it goes through. A refund of 10 trips the breaker again, because the hourly budget still counts the earlier 50.",
          "The file is a stand-in for the real thing. In production the kill switch revokes the agent's OAuth tokens and isolates its sandbox. What matters is the same: it works from outside the agent, which never gets a vote.",
        ],
      },
      {
        title: "Plug it into a desktop assistant (optional)",
        body: [
          "In an MCP-capable desktop assistant, add the server to its MCP configuration file with the full path to the Python inside your .venv and to server.py. Restart the assistant and ask: “Is order A123 late? If so, refund 20.” Watch it pick get_order, then issue_refund. Then ask for a refund of 40 and watch the ceiling hand the decision back to you.",
        ],
        code: {
          lang: "json",
          text: `{
  "mcpServers": {
    "refund-desk": {
      "command": "C:/path/to/refund-desk/.venv/Scripts/python.exe",
      "args": ["C:/path/to/refund-desk/server.py"]
    }
  }
}`,
        },
      },
    ],
    checklist: [
      "My server runs and the Inspector lists both tools with their schemas",
      "get_order answers for a known id and returns an error for an unknown one",
      "A refund above the ceiling is refused and points to a person",
      "Repeated refunds trip the breaker, freeze writes and raise an alert",
      "Creating or deleting the KILL_SWITCH file stops or resumes writes without touching the agent",
    ],
    bubble: "Your own plug, with a fuse. Let's build it!",
  },

  deliverable: {
    kicker: "Deliverable · Integration plan",
    title: "The integration plan for your candidate workflow",
    purpose:
      "Show how an agent for the candidate workflow you picked in module 1 would plug into your real systems: where it lives, what it touches, with which rights, and what stops it when things go wrong. It follows the six questions of the MIT conceiving-agents assignment and ends with a short email to leadership. It builds on your platform choice from module 2 and becomes the technology, integration and scaling sections of your capstone adoption plan in module 8.",
    fileName: "integration-plan.md",
    template: `# Integration plan

Candidate workflow (from module 1):
Platform and harness choice (from module 2):
Author:
Date:

## 1. What kind of agent
- Internal (operations, scheduling, data wrangling) or external (customer service, onboarding, sales):
- Where it lives (Slack, Notion, Discord, website, email, voice):
- Build tier (no-code, low-code, pro-code, full-code) and why it is the lightest that works:

## 2. The workflow it supports
- Today's process, step by step, and who does each step:
- What the agent enhances, automates or replaces:
- Expected gain (time, cost, customer experience, engagement), in two or three sentences:

## 3. How it integrates
| System | Owner | Interface today (API, database, file, screen only) | Read or write | Connect via (MCP server, custom API, middleware, computer-use) | Legacy constraints (rate limit, pool size, data format, silo) |
|---|---|---|---|---|---|
| | | | | | |

Draw the path, not a straight arrow: agent → gateway / middleware / MCP server → system.

Tools exposed to the agent:
| Tool | System | Parameters | Read or write | Impact ceiling | Velocity limit |
|---|---|---|---|---|---|
| | | | | | |
- Number of tool schemas loaded per call, and rough token cost:

Identity and permissions:
- Whose identity the agent acts under (user-delegated token or service account, and why):
- Minimum scopes per system:
- Read-only replicas or parameterised procedures used instead of raw access:

## 4. Safety and ethics
- Main risks (technical, reputational, legal):
- Decisions that need a human in the loop:

Failure paths:
| Failure | What the agent does (retry with backoff, queue, fallback, escalate) | Who is told |
|---|---|---|
| 429 Too Many Requests | | |
| 503 or timeout | | |
| Data does not match the expected format | | |
| MCP server unreachable | | |
- Writes that are retried: how a retry is prevented from acting twice:

Circuit breakers and kill switch:
- Breakers (what trips them, what they freeze):
- Kill switch (how it works without the agent's cooperation):
- Kill switch owner, and backup:
- Who may reset, after which checks:
- Monitoring and logging (what is logged for every action, who watches):

## 5. How it communicates
- Neutral or empathetic, and does the tone adapt to context:
- How tone is shaped (prompt, examples, fine-tuning) and checked for bias:
- Escalation triggers to a person:

## 6. What success looks like
| KPI | Baseline today | Target | How it is measured |
|---|---|---|---|
| | | | |
- Signal that the agent is hurting rather than helping:
- How you will iterate after launch (pilot scope, review rhythm):

## 7. Email to leadership (100 to 300 words)
Subject:

Agent and platform; workflow and benefit; integration approach and main legacy barrier; key risk and its safeguards; success metric and next step.
`,
    checklist: [
      "The agent type, platform and function are stated in one sentence each",
      "No arrow goes straight from the agent to a legacy system: middleware, a gateway or an MCP server sits between",
      "Every write tool has an impact ceiling and a velocity limit, and the kill switch works from outside the agent with a named owner",
      "Every failure path ends in a retry, a queue or a person, never in silence",
      "At least one measurable KPI has a baseline, and the email to leadership fits in 300 words",
    ],
    bubble: "Every cable on one page. Your capstone will thank you!",
  },
};
