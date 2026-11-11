import type { LessonContent } from "../lessons";

// Level 4 · The universal plug. Source: MIT module 3 (sections 1 to 5, assignment 3.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const LEVEL_4: LessonContent = {
  reading: {
    kicker: "Concept · Tools, MCP, legacy systems",
    title: "One plug, many sockets",
    intro:
      "A playlist plays what was planned. A live band reads the room and takes requests. Agents are the band: they act inside your software, not next to it. This level is about the wiring: how an agent calls tools, why old systems push back, and how one protocol replaces a drawer full of adapters.",
    sections: [
      {
        heading: "From clicking to asking",
        body: [
          "Most software is driven through screens: menus, filters, tabs, copy and paste. An agent lets people state an intent instead (“alphabetise the references and add a Notes column”) and does the clicking on their behalf.",
          "Under the hood this is function calling. The model never runs anything itself. It returns a structured request (a tool name plus JSON arguments); your code checks it, runs it and sends the result back. The answer is then grounded in what the tool returned, not in what the model remembers.",
          "Take “make me a playlist of the number-one hit from every year since 1985”. To do it inside a music app, the agent has to:",
        ],
        bullets: [
          "Turn the sentence into a sequence of operations.",
          "Fetch outside data (historical chart positions).",
          "Match each song to the app's own catalogue.",
          "Create a playlist in the user's account, with the user's permission.",
          "Add the tracks in the right order.",
          "Confirm, and keep the context for the follow-up (“now add a few recent tracks in the same mood”).",
        ],
        callout: {
          label: "Same pattern at work",
          text: "Swap songs for stock: “check open orders for SKU-409 against warehouse stock; if stock is under the reorder point, raise a purchase order and tell the account managers in Slack.” Three systems, no screen, one sentence. And three places where a wrong call costs real money.",
        },
      },
      {
        heading: "Wiring tools together: the automation spectrum",
        body: [
          "Agents usually live where people already work: Slack (messages grouped by topic), Notion (pages, wikis and light databases), Discord (real-time text and voice communities), email or a website. Between those apps sit meta-tools whose only job is to connect other tools: when a chatbot escalates, one of them can email a colleague, open a task and log the case in a sheet.",
          "Pick the lightest tier that handles your logic. Each step to the right buys flexibility and costs engineering time.",
        ],
        table: {
          head: ["Tier", "Skill needed", "Strength", "Limit", "Typical use"],
          rows: [
            ["Zapier (no-code)", "Point and click", "Minutes to set up, thousands of SaaS connectors", "Fixed trigger → action, little branching, no reasoning", "Form → CRM → Slack notification"],
            ["n8n or Make (low-code)", "Visual flows, small expressions", "Branches, loops, self-hosting for privacy", "Hard to debug and to version in Git", "Alerts and reconciliation across systems"],
            ["LangChain or LangGraph (pro-code)", "Python or TypeScript", "Stateful loops, memory, several agents, custom tools", "Needs a software team", "Compliance review agent, research assistant"],
            ["Custom code (full-code)", "Systems engineering", "Total control, no vendor lock-in, lowest latency", "Highest build and maintenance cost", "High-volume or proprietary pipelines"],
          ],
        },
        callout: {
          label: "Errors scale too",
          text: "Automation repeats mistakes as fast as it repeats good work. In November 2023 an automated network response took Optus offline across Australia for about 12 hours, hitting more than 10 million people. A 2024 University of Washington study found résumé-screening models preferred white-associated names 85% of the time. Reordering stock, sending alerts or rerouting trucks all deserve a person in the loop on the big calls.",
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
            ["Monolith", "Screens, business rules and data are welded together; no clean API; any change risks breaking something else", "Middleware or a thin API layer in front, new features as separate microservices"],
            ["Data drift", "Cust_ID in one system, CustomerNumber in another; truncated fields; undocumented codes. The model reasons over them and invents decisions", "Nightly clean-up jobs, scripts that flag missing fields and duplicates for review"],
            ["Human-speed sizing", "Built for one click every 30 seconds. An agent firing 500 calls a minute drains the connection pool, locks tables and takes the system down", "Rate limits, caching, read-only replicas, a queue in front of every write"],
            ["Latency and load", "Slow answers for customer-facing use; no headroom for spikes", "Dashboards on latency, errors and load; fallback model or standby capacity"],
          ],
        },
        bullets: [
          "Start with a system audit: list the applications, databases and data flows, then pick the functions worth automating.",
          "Pilot on routine, low-risk work (standard emails, meeting summaries) before touching core operations.",
          "Run urgent or sensitive inference close to the data (on-premises); push slow, non-urgent jobs such as reports to the cloud.",
          "Every service authenticates every call (mutual TLS between services, role-based access), and every agent action is logged: data read, decision taken, person notified.",
        ],
        callout: {
          label: "Integration is not access",
          text: "Being able to connect an agent to a database does not mean it should run any SQL it likes. Give it parameterised operations on a read-only copy. When a system has no API at all (green-screen terminal, old desktop ERP), a computer-use agent that reads the screen is the last resort: several seconds per screen, fragile to layout changes and costly in screenshots.",
        },
      },
      {
        heading: "Customer-facing agents: tune the tone",
        body: [
          "Customers expect more than a correct answer: they want to feel heard. General models handle everyday language well but miss industry terms, rules and the emotional temperature of a complaint. Fine-tuning, further training on your own examples, closes that gap. A common structure for the reply is Acknowledge → Apologise → Assure → Act.",
        ],
        table: {
          head: ["Technique", "How it works", "What it buys for tone"],
          rows: [
            ["Supervised fine-tuning (SFT)", "Train on labelled examples (tickets tagged by sentiment and urgency)", "Knows when to show sympathy and when to escalate"],
            ["Instruction tuning", "Train to follow explicit orders (“reply calmly to an upset customer”)", "Sticks to the brand voice and reply structure"],
            ["RLHF", "People rate generated replies; a reward model steers training", "Rewards helpful, policy-safe replies, punishes robotic ones"],
            ["DPO", "Train directly on pairs: preferred reply vs rejected reply", "Similar effect to RLHF with fewer moving parts and lower cost"],
            ["PEFT (adapters, LoRA)", "Update a small add-on instead of the whole model", "Ship new scripts (a new tariff, new slang) quickly and cheaply"],
          ],
        },
        bullets: [
          "Good training data covers four things: empathic phrases, when to move from reassurance to action, cultural and regional norms, and annotated escalation triggers.",
          "Watch for: formulaic replies (overfitting), tone-deaf ones (underfitting), lost product knowledge after tuning (catastrophic forgetting: mix in domain tasks), and different voices across chat, email and phone.",
          "On voice, speed is part of empathy: past about a second and a half of silence, callers start talking over the agent.",
        ],
        callout: {
          label: "Escalate, don't improvise",
          text: "Models still miss sarcasm and idioms and can sound sorry while stating a wrong fact. Ground answers in retrieved policy, and hand legally sensitive or heated conversations to a person at once.",
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
            ["Devices", "Sensors (temperature, vibration, motion), actuators (motors, valves, switches), edge gateways that pre-process data", "Certificate-based device identity, secure boot, signed over-the-air updates"],
            ["Communication", "Light protocols such as MQTT and CoAP, 5G or Wi-Fi 6, mesh networks", "Segment the device network away from business systems"],
            ["Intelligence", "Agents that spot anomalies, predict failures and coordinate responses", "Least-privilege roles, audit log of every command, alerts on unusual behaviour"],
          ],
        },
        bullets: [
          "Distributed orchestration: several specialised agents, each owning a cluster of devices. Resilient, but they must not contradict each other.",
          "Hierarchical orchestration: a lead agent directs sub-agents (energy, security, comfort). Simpler to manage and audit.",
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
          "Without a shared standard, every agent needs its own connector to every tool, each with its own schema and its own maintenance when the tool's API changes. The Model Context Protocol (MCP), an open standard introduced by Anthropic in late 2024, splits the job into three roles so a tool is wrapped once and any compliant agent can use it.",
        ],
        table: {
          head: ["Role", "What it is", "Example"],
          rows: [
            ["Host", "The application where the model runs", "A desktop assistant, an IDE, a company AI gateway"],
            ["Client", "The adapter inside the host; one connection per server", "Built into the host, you rarely write it"],
            ["Server", "A small program that exposes tools and data in the standard format", "A server for Slack, Jira, a Postgres database or your ERP"],
          ],
        },
        bullets: [
          "Messages use JSON-RPC, over standard input/output for a local server or HTTP for a remote one.",
          "Servers already exist for CRMs, office suites, design tools and website builders, so agents can work across them in one conversation.",
          "Schema bloat: each server advertises all its tools. Ten servers with a hundred tools can use 10,000 tokens or more before the user types a word.",
          "Identity: the agent should act with the user's own delegated rights, not a shared all-powerful service account, so per-user access rules still hold.",
          "Connections: long-lived links across firewalls drop. Plan heartbeats, reconnection, and what the agent does when a server is gone.",
        ],
        callout: {
          label: "Your turn",
          text: "Before you read the answer anywhere, count it. The question below gives you a small company with a handful of agents and tools. How many connectors would it need without a standard?",
        },
      },
    ],
    takeaways: [
      "The model proposes a tool call; your code validates and runs it. Grounding comes from the tool's answer.",
      "Legacy systems break at agent speed: put middleware, rate limits and read-only access between them.",
      "MCP wraps each tool once for every agent, but it does not decide what an agent is allowed to do.",
    ],
    bubble: "Grab a cable. Let's plug some agents in!",
    xp: 20,
  },

  concept: {
    kicker: "Interactive concept · How many cables?",
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
        text: "Each tool exposes an MCP server. Every agent speaks the same client–host–server language.",
      },
    },
    bubbles: { start: "Mission: plug 4 agents into 6 tools.", wrong: "Hmm, recount the links!", right: "Plugged in! Nicely done." },
    next: "Continue: Knight Capital post-mortem",
    xp: 20,
  },

  postMortem: {
    kicker: "Post-mortem · Knight Capital, 2012",
    title: "45 minutes without a stop button",
    context:
      "Knight Capital was one of the largest US equity traders. On 1 August 2012 it switched on new code for a New York Stock Exchange retail programme. One of its eight order-routing servers still ran old code, and a reused flag woke up a function that had been dead since 2003. Nothing in the system could stop it quickly.",
    numbers: [
      { value: "≈ $440M", label: "loss announced by the firm" },
      { value: "45 min", label: "from market open to the end of the incident" },
      { value: "1 of 8", label: "servers missed by a manual deployment" },
      { value: "4M+", label: "trades executed in error" },
    ],
    timeline: [
      { label: "Deploy", text: "Over several days a technician copies the new code by hand to the routing servers and misses one. Nobody checks. The new code reuses a flag that used to trigger “Power Peg”, an old test function left in the codebase." },
      { label: "Before the open", text: "Automated emails flag an error on that server. They are not built as alerts, so no one acts on them." },
      { label: "9:30 · Market opens", text: "On the stale server, the flag starts Power Peg. It keeps sending orders without noticing they are filled, buying and selling millions of shares. There is no kill-switch and no written procedure. Engineers roll back the new code on the healthy servers, which spreads the fault to all eight." },
      { label: "After", text: "Knight needs emergency outside funding within days and is acquired by rival Getco in 2013. In October 2013 the SEC fines it $12 million for missing risk controls." },
    ],
    lessons: [
      "Dead code and reused flags are live ammunition. Delete old tools, prompts and switches; never give an old name a new meaning.",
      "Deploy with discipline: automated, identical on every server, verified by a second person or a check, and rolled out to a small slice first.",
      "Put circuit breakers in the tools, not in the prompt: limits on speed, value and exposure that freeze write actions and call a person.",
      "Have a kill-switch that works from outside the agent, a named owner, and a written runbook. An alert nobody reads is not an alert.",
    ],
    question: {
      prompt:
        "Monday, 9:02. Your refund agent starts issuing refunds in a loop. Which safeguard limits the damage most?",
      options: [
        { id: "a", text: "A stronger system prompt telling the agent to be careful with refunds" },
        { id: "b", text: "A refund ceiling and hourly limit inside the tool that freeze writes, page the owner, and a kill-switch that revokes the agent's access" },
        { id: "c", text: "Detailed logs reviewed every Friday" },
        { id: "d", text: "Rolling back the latest deployment as the first move" },
      ],
      correct: "b",
      hints: {
        a: "A prompt is advice to the model, and a model in a bad loop is not listening. Limits must live in code the model cannot bypass.",
        c: "Logs explain the damage after the fact. By Friday the loop has run for four days.",
        d: "Knight rolled back under pressure and made it worse. Stop first, then diagnose, then fix.",
      },
      explanation:
        "Right. Ceilings and velocity limits in the tool contain the loop within minutes, and an outside kill-switch stops it even if the agent's own logic is broken. That is what Knight was missing.",
    },
    sources: [
      "U.S. Securities and Exchange Commission. (2013, October 16). In the Matter of Knight Capital Americas LLC. Administrative Proceeding File No. 3-15570, Release No. 34-70694.",
      "Ponomarev, A. (2023, October 26). Deploy gone wrong: The Knight Capital story. Medium.",
      "Wikipedia. (n.d.). 2023 Optus outage. Retrieved June 4, 2025.",
      "Milne, S. (2024, October 31). AI tools show biases in ranking job applicants' names according to perceived race and gender. UW News.",
    ],
    bubble: "Even the best plug needs a fuse. Here's why.",
    xp: 20,
  },

  lab: {
    kicker: "Lab 2 · Your own MCP server",
    title: "Build a plug with a fuse",
    goal: "Write a small MCP server in Python with one read tool and one write tool, guard the write tool with a ceiling, a velocity limit and a kill-switch, then drive it from the MCP Inspector.",
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
        body: ["Create a folder, a virtual environment, and install the official MCP Python SDK with its command-line tools."],
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
          "Save this as server.py. The type hints and docstrings become the tool schema that every client sees. Logs go to stderr because stdout carries the protocol.",
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

MAX_REFUND = 30.0      # value ceiling per refund; above it, a person decides
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
    """Refund part of an order. Write action, guarded by ceilings and a kill-switch."""
    if KILL_SWITCH.exists():
        return "BLOCKED: kill-switch is on. No write actions until a person removes it."
    order = ORDERS.get(order_id)
    if order is None:
        return f"REFUSED: order {order_id} not found."
    ceiling = min(MAX_REFUND, order["paid"])
    if not 0 < amount <= ceiling:
        return f"REFUSED: amount must be above 0 and at most {ceiling:.2f}. Ask a person."
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
          "This starts your server and opens the Inspector in the browser (the first run asks to install it through npx). Connect, then open the Tools tab and list the tools.",
          "Look at the JSON schema generated for each tool. That text is loaded into the model's context on every call: this is the tool tax from level 2.",
        ],
        code: { lang: "shell", text: "mcp dev server.py" },
      },
      {
        title: "Test, then trip the breaker",
        body: [
          "Call get_order with A123, then with Z999. Call issue_refund on A123 for 50: it is refused by the ceiling. Then refund 25 three times: the third call trips the breaker, a KILL_SWITCH file appears next to server.py and the alert shows in the server log.",
          "Try any refund now: it is blocked. Delete the KILL_SWITCH file by hand and refund 5: it goes through. A bigger refund trips the breaker again, because the hourly budget still counts the earlier 50. The switch works from outside the agent, which is the point.",
        ],
      },
      {
        title: "Plug it into a desktop assistant (optional)",
        body: [
          "In an MCP-capable desktop assistant, add the server to its MCP configuration file, using the full path to the Python inside your .venv and to server.py. Restart the assistant and ask it: “Is order A123 late? If so, refund 20.” Watch it pick get_order, then issue_refund.",
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
      "A refund above the ceiling is refused",
      "Repeated refunds trip the breaker, freeze writes and raise an alert",
      "Creating or deleting the KILL_SWITCH file stops or resumes writes without touching the agent",
    ],
    bubble: "Your own plug, with a fuse. Let's build it!",
    xp: 30,
  },

  deliverable: {
    kicker: "Deliverable · Integration map",
    title: "Map every cable of your candidate workflow",
    purpose:
      "Show how the agent from your candidate card connects to real systems: through which interface, with which rights, and what stops it when things go wrong. It reuses your loop map (level 1), cost estimate (level 2) and architecture choice (level 3), and becomes the integration and scaling sections of your capstone adoption plan.",
    fileName: "integration-map.md",
    template: `# Integration map

Workflow (from the candidate card):
Topology and build tier (from level 3):
Author:
Date:

## 1. Where the agent lives
- Platform (Slack, Teams, Notion, Discord, website, email, voice):
- Internal or customer-facing:

## 2. Systems it touches
| System | Owner | Interface today (API, database, file, screen only) | Read or write | Connect via (MCP server, direct API, middleware, computer-use) | Legacy constraints (rate limit, pool size, data format) |
|---|---|---|---|---|---|
| | | | | | |

## 3. Tools exposed to the agent
| Tool | System | Parameters | Read or write | Value ceiling | Velocity limit |
|---|---|---|---|---|---|
| | | | | | |
- Number of tool definitions loaded per call, and tokens (link to the cost estimate):

## 4. Identity and permissions
- Whose identity the agent acts under (the user's delegated rights, or a service account, and why):
- Minimum scopes per system:
- Read-only copies or parameterised operations used instead of raw access:

## 5. Failure paths
| Failure | What the agent does | Who is told |
|---|---|---|
| 429 Too Many Requests | | |
| 503 or timeout | | |
| Data does not match the expected format | | |
| MCP server unreachable | | |

## 6. Circuit breakers and kill-switch
- Breakers (what trips them, what they freeze):
- Kill-switch mechanism (works without the agent's cooperation):
- Kill-switch owner, and backup:
- Who may reset, after which checks:
- Runbook location:

## 7. Change and deployment
- How tool or prompt changes ship (automated, reviewed, small slice first):
- Rollback plan:
- Old tools and flags retired on:

## 8. Tone (customer-facing only)
- Tone guidelines, and how they are tuned (prompt, examples, fine-tuning):
- Escalation triggers to a person:

## 9. Summary for leadership (five sentences)
Agent and platform; workflow and benefit; integration approach and main legacy barrier; key risk and safeguards; success metric.
`,
    checklist: [
      "No arrow goes straight from the agent to a legacy system: middleware, a gateway or an MCP server sits between",
      "Every write tool has a value ceiling and a velocity limit",
      "The kill-switch works from outside the agent and has a named owner",
      "Every failure path ends in a retry, a queue or a person, never in silence",
      "The agent runs with minimum scopes, under the user's identity where access differs per user",
    ],
    bubble: "Every cable on one page. Your capstone will thank you!",
    xp: 30,
  },
};
