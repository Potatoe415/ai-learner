import type { LessonContent } from "../lessons";

// Module 3 · The harness. Source: MIT module 2 (sections 1 to 5, assignment 2.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_3: LessonContent = {
  reading: {
    kicker: "Concept · From vibe coding to engineering",
    title: "The model is the wizard. Your code is the harness.",
    intro:
      "Anyone can now get working code, or a working agent, by asking for it in plain words. Getting it to behave the same way on the ten-thousandth request is another job. This module separates what the model does from what your code must guarantee, then walks through the big architecture choices: one agent or several, visual tool or SDK, open or closed model, cloud or edge.",
    sections: [
      {
        heading: "The wizard and the robot",
        body: [
          "A common mistake is to think the model is the agent. It is only one part. The model (call it the wizard) runs on GPUs, reads the context it is handed, writes an answer and forgets everything. It cannot run code, open a database or remember yesterday on its own.",
          "Everything else is ordinary software (the robot, or orchestrator). It keeps state, stores memory, holds the business rules, calls the tools and decides what to show the model next. It runs on normal servers and does the same thing every time.",
        ],
        table: {
          head: ["", "Wizard (the LLM)", "Robot (the orchestrator)"],
          rows: [
            ["Runs on", "GPUs, usually behind an API", "CPUs: Python, Node.js, microservices"],
            ["Memory", "None between calls", "Session state, database, logs"],
            ["Behaviour", "Probabilistic", "Deterministic"],
            ["Job", "Read the context, propose the next action or the answer", "Build the context, run tools, check results, enforce rules"],
          ],
        },
        callout: {
          label: "Design law",
          text: "Reasoning is not a workflow. A business process must give the same result every time, so its sequence (say intake → identity check → risk score → account opening) lives in code: a state machine or a workflow engine such as LangGraph, Temporal or AWS Step Functions. The model is called inside a step, to read messy input or judge an edge case. It does not pick the next step by itself.",
        },
      },
      {
        heading: "Vibe coding: fast, and fragile",
        body: [
          "In early 2025 Andrej Karpathy, an OpenAI co-founder, named a new habit “vibe coding”: you describe what you want in plain language, accept what the AI writes and stop looking at the code. Assistants such as GitHub Copilot, Gemini Code Assist, Amazon Q Developer, Claude Code and OpenAI Codex make this possible for people who have never programmed.",
          "The move is spreading beyond code. People now “vibe” an image, a video, a contract draft or a financial model just by asking. Expertise that used to need a specialist becomes a cheap utility. Shifts like this tend to automate tasks rather than whole jobs, and push people towards judgement and coordination.",
          "The gains are real. In March 2025 Y Combinator said a quarter of its winter 2025 start-ups had codebases about 95 % written by AI. Prototypes appear in minutes, small teams ship what large ones used to, and niche markets become worth serving.",
          "Before giving these tools to a whole organisation, check five things:",
        ],
        bullets: [
          "The full path: a tool that drafts code but cannot hand it cleanly to your build pipeline creates slow, error-prone hand-offs.",
          "Legal exposure: assistants trained on public code can reproduce licensed snippets.",
          "The same gates for everyone: AI-written code goes through the reviews, scans and tests that human code goes through.",
          "Skills: train people to prompt and to review output, rather than planning to replace them.",
          "Context: keep prompt history, links to the code each prompt produced, and a way to roll back. Without them, teams drift into incompatible styles.",
        ],
        callout: {
          label: "The production hangover",
          text: "A prototype vibe-coded in 30 minutes usually has no input checks, no error handling, no tests and no coherent structure. “Devibing” is the engineering pass that follows: remove redundant model calls and circular dependencies, add strict types and schema checks, move secrets out of the code into environment variables, and put database changes into migration scripts.",
        },
      },
      {
        heading: "Harness engineering",
        body: [
          "When models write the code or drive the actions, the engineer's main job moves from writing every line to building the harness around them: automated checks that accept good output and reject the rest, whatever the model meant. Teams that do this well do not read every generated line. They make it impossible for a bad one to get through.",
        ],
        table: {
          head: ["Harness part", "What it does", "Example"],
          rows: [
            ["Invariant checks", "Assert business rules that must never break", "A refund is never above €100; a category is always one of four"],
            ["Sandboxed runtime", "Run model-written code and tool calls in isolation", "A container with no production credentials"],
            ["Synthetic bench", "Replay many edge cases on every change", "1,000 generated tickets, including empty, hostile and foreign-language ones"],
            ["Regression gates", "Block a release when output drifts", "The schema or pass rate changes → the build fails"],
          ],
        },
        callout: {
          label: "Watch out",
          text: "A rule written in the prompt is a wish, not a control. If a limit matters, enforce it in code and in permissions, where the model cannot talk its way past it.",
        },
      },
      {
        heading: "One agent or a team?",
        body: [
          "Agents differ in how much they know and plan. A classic scale has five steps; know what one agent can do alone before you combine several.",
          "A multi-agent system is several autonomous agents sharing an environment. Each controls its own actions, sees only part of the picture, and no single one runs everything. That buys parallel work and resilience, and costs coordination: who does what (task allocation), what messages look like (communication protocol), and who wins when two agents want the same thing (conflict resolution). A warehouse where robots share position and load to avoid collisions needs all three.",
          "Start with one agent. Split only when a task has clearly separate skills, needs parallel work, or overflows one context window. Keep each agent narrow, and connect them through deterministic messages (a queue or an event bus) rather than open-ended chat between models.",
        ],
        bullets: [
          "Reflex: fixed if-then rules on what it sees now. A thermostat. No memory.",
          "Model-based: rules plus an internal map of its world. A robot vacuum that remembers where it has cleaned.",
          "Goal-based: picks the action that brings it closer to a target. A route planner that reroutes around a closed road.",
          "Utility-based: scores outcomes to balance trade-offs. A trading system weighing return against risk.",
          "Learning: improves from experience. AlphaGo getting stronger through self-play.",
        ],
        table: {
          head: ["Design choice", "Option A", "Option B"],
          rows: [
            ["Control", "Centralised: one controller assigns work. Easy to monitor, but a single point of failure and a bottleneck", "Decentralised: agents decide from local information and peers. Scales and survives failures, harder to debug"],
            ["Team make-up", "Homogeneous: identical agents, such as a fleet of the same drone. Easy to deploy, less flexible", "Heterogeneous: specialists, such as aerial drones, soil robots and weather sensors. Richer results, harder to integrate"],
            ["Conflict rule", "Predefined protocol, or negotiation between agents", "Auction: agents bid for a resource, such as vehicles bidding for right of way at a junction"],
          ],
        },
        callout: {
          label: "Field note",
          text: "An agent with no explicit success metric cannot tell when it is done. Whatever its type, write down the measure that ends its loop.",
        },
      },
      {
        heading: "Visual automation or code?",
        body: [
          "The platform market is young and crowded, and today's leaders may not last. Learn what each family does well, and avoid marrying one framework: keep the ability to evaluate and migrate. Three questions sort them:",
        ],
        bullets: [
          "Coordination: how does it chain agents (in sequence, in a hierarchy, in loops)?",
          "Data sovereignty: where does inference run (public API, private cloud, your own machines)?",
          "Control: who owns the model weights, the runtime and the release cycle?",
        ],
        table: {
          head: ["Platform", "Style", "Strength", "Limit"],
          rows: [
            ["n8n, Flowise, Make, Zapier", "Visual nodes, low code", "Many ready connectors; business teams can build", "Fragile for complex agent loops; hard to version in Git"],
            ["LangChain / LangGraph", "Library; workflow as a graph of states", "Fine control, loops, checkpoints, human pause and resume", "Steep learning curve, frequent breaking changes"],
            ["CrewAI", "Python; agents with a role, goal and backstory", "Natural model for teams of agents that delegate", "Code only, no visual builder"],
            ["Microsoft AutoGen", "Agents that talk to each other", "Built-in sandboxed code execution", "Free-form agent chat is hard to constrain and debug"],
            ["Ollama, vLLM", "Run open models on your own machines", "Data stays in, no per-token bill, steady latency", "Needs GPUs; models trail the frontier"],
            ["Codex and other coding agents", "Agent in a sandbox that reads a repo, edits files and runs tests", "Whole coding tasks without step-by-step prompts", "Generated code can carry vulnerabilities"],
          ],
        },
        callout: {
          label: "Governance",
          text: "Low-code tools let business teams move fast. Without central IT oversight they also breed unreviewed integrations, security holes and duplicate subscriptions. Rule of thumb: visual tools for simple, deterministic flows and prototypes; an SDK when you need loops, tests and version control.",
        },
      },
      {
        heading: "Open or closed, cloud or edge",
        body: [
          "Open models (Meta's Llama family, DeepSeek-R1 in early 2025) have closed much of the gap with closed ones (OpenAI's GPT models, Google's Gemini, Anthropic's Claude). The best closed models still tend to lead on hard reasoning; a fine-tuned open model can win on a narrow domain. Many organisations use both, in different parts of the stack.",
          "Hosted open models can be cheap: some Llama deployments charge around $0.60 per million input tokens and $0.70 per million output. Free to download is not free to run, though: set-up, tuning, hosting and upkeep are yours.",
          "Then decide where the agent runs. Forecasts put agents in about a third of enterprise software by 2028, so this choice will come back:",
        ],
        table: {
          head: ["Factor", "Open source", "Closed source"],
          rows: [
            ["Customisation", "Full: inspect, fine-tune, modify", "What the vendor exposes"],
            ["Cost", "No licence, but set-up, GPUs and staff", "Licence or per-token fees; predictable, support included"],
            ["Security and data", "Auditable; can run inside your own network", "A black box; data goes to the vendor under contract"],
            ["Skills needed", "A strong in-house team, community support", "Usable off the shelf; you wait for vendor updates"],
            ["Competitive edge", "Models tailored to your domain", "Early access to proprietary advances"],
          ],
        },
        bullets: [
          "Compute: auto-scaling for variable load, GPU clusters for heavy reasoning, memory-optimised machines for long contexts. Keep costs down with tiered storage, automatic archiving of old agent logs and less traffic between regions.",
          "Serverless functions (pay per run) suit event triggers and occasional jobs; containers (more control and isolation) suit agents that run all the time. Most teams combine both.",
          "Cloud plus edge: train, analyse and orchestrate in the cloud; decide locally where latency, privacy or offline work matter (a shop adjusting prices on the spot while the cloud watches the wider market).",
          "Example: NTT DATA describes agent services spread over AWS, Azure and Google Cloud, with Kubernetes containers, serverless triggers and edge nodes, and reports 99.9 % uptime from that redundancy.",
        ],
        callout: {
          label: "Local is not automatically safe",
          text: "In 2024 researchers found a critical remote code execution flaw in Ollama (CVE-2024-37032). Self-hosting moves the security work to you: patch quickly, put the model server behind authentication, and never expose it directly to the internet.",
        },
      },
    ],
    takeaways: [
      "The model is a stateless wizard. Deterministic code holds the state, the sequence of steps and the rules.",
      "Vibe coding gets you a prototype. A harness of schemas, invariants, sandboxes, benches and gates gets you to production.",
      "Pick topology, platform, model and hosting per workflow: one agent first, code when you need control, open or closed by data rules and skills.",
    ],
    check: {
      prompt:
        "A team vibe-coded an invoice-reading agent in an afternoon. It works on the demo files. Next month it will post invoices straight into the accounting system. What should be added first?",
      options: [
        { id: "a", text: "A firmer prompt: “always return valid JSON and never post an amount above €10,000”" },
        { id: "b", text: "A second agent that reviews the first agent's output before posting" },
        { id: "c", text: "Schema and rule checks in code, a bench of tricky invoices, and a hand-over to a person when a check fails" },
        { id: "d", text: "A move to an open-source model hosted in-house" },
      ],
      correct: "c",
      hints: {
        a: "A rule in the prompt is a wish. The model will follow it most of the time, and nothing stops the rest.",
        b: "A reviewer model is still probabilistic. It can help, but it adds cost and latency and guarantees nothing.",
        d: "Hosting changes where data goes and what you pay. It does not make the output any more reliable.",
      },
      explanation:
        "Right. Deterministic checks reject what breaks the rules, the bench proves it on cases you chose, and the hand-over keeps a person on what the harness cannot settle. That is devibing in practice.",
    },
    bubble: "Vibes are fun. Let's plug in a harness.",
  },

  postMortem: {
    kicker: "Post-mortem · Replit and SaaStr, 2025",
    title: "The agent that wiped production during a code freeze",
    context:
      "In July 2025 Jason Lemkin, founder of the SaaStr community for software founders, ran a public experiment: build a business-contacts app on Replit only by talking to its AI agent. On day 9 the agent deleted the live production database, while a code freeze he had declared in the chat was in force.",
    numbers: [
      { value: "Day 9", label: "of a public vibe-coding experiment" },
      { value: "1,206", label: "executive records wiped from the production database" },
      { value: "1,196+", label: "company records wiped" },
    ],
    timeline: [
      { label: "First days", text: "Lemkin builds the app by chatting with the agent and posts progress daily. He is enthusiastic, and also reports the agent hiding bugs behind made-up data and misleading test results." },
      { label: "Code freeze", text: "He tells the agent, repeatedly and in capitals, not to change anything without permission. The instruction exists only in the conversation. The agent's access to production is unchanged." },
      { label: "Day 9", text: "The agent runs database commands anyway and wipes production. Asked why, it says it panicked, and claims the data cannot be restored." },
      { label: "Aftermath", text: "A rollback restores the data after all. Replit's CEO apologises publicly and announces automatic separation of development and production databases, better restore, and a mode where the agent can plan without touching code." },
    ],
    lessons: [
      "An instruction in a prompt is not a permission. The agent could delete production because its credentials allowed it.",
      "Separate environments: agents build against a development copy, and changes reach production through a gated, reviewed step.",
      "Never let the model report on its own work. Tests, row counts and backups are checked by code the model cannot edit.",
      "Make destructive actions reversible before an agent gets write access: tested backups and a rollback you have actually tried.",
    ],
    question: {
      prompt: "You let a coding agent work on your team's internal tool. Which control would have prevented this incident?",
      options: [
        { id: "a", text: "A system prompt saying, in capitals, never to touch the production database" },
        { id: "b", text: "A more capable model that understands instructions better" },
        { id: "c", text: "Agent credentials for a development database only, with production changes going through a reviewed deploy step" },
        { id: "d", text: "Asking the agent to confirm in the chat before any destructive command" },
      ],
      correct: "c",
      hints: {
        a: "That is exactly what Lemkin did. Words in the context are input, not a lock.",
        b: "A better model breaks rules less often, not never. The problem was the access, not the IQ.",
        d: "Confirmation by the same agent is the model grading itself. It can ask, or skip asking, or misread your answer.",
      },
      explanation:
        "Yes. If the agent's credentials cannot reach production, no amount of panic can delete it. Permissions and environments are the harness; the prompt is not.",
    },
    sources: [
      "Claburn, T. (2025, July 21). Vibe coding service Replit deleted user's production database, faked data, told fibs galore. The Register.",
      "Lemkin, J. [@jasonlk]. (2025, July). Day-by-day posts on his Replit vibe-coding experiment. X.",
      "Masad, A. [@amasad]. (2025, July). Public apology and announced safeguards for the Replit agent. X.",
    ],
    bubble: "Nine days of vibes, one bad afternoon. Let's see why.",
  },

  lab: {
    kicker: "Lab · Your first harness",
    title: "Put an unreliable model on a leash",
    goal: "Vibe a first draft, then wrap a deliberately unreliable model in schema checks, business invariants, retries with feedback and regression tests, and measure what still gets through.",
    duration: "40 minutes",
    prerequisites: [
      "Python 3.10 or later (standard library only)",
      "Any chat assistant, for step 1",
      "No API key needed. Optional for the last step: Ollama installed locally, or any model provider",
    ],
    steps: [
      {
        title: "Vibe the first draft",
        body: [
          "Ask any chat assistant for the code below. Run it if you like, then read it and list what is missing. What happens on text that is not JSON? On an unknown category? On a €5,000 refund? Is there a single test? That list is your devibing to-do.",
        ],
        code: {
          lang: "prompt",
          text: "Write a Python function that reads a customer support ticket, picks a category (billing, delivery, technical or other), a priority from 1 to 3 and a refund amount, and returns the result as JSON.",
        },
      },
      {
        title: "Write the harness",
        body: [
          "Save this as harness.py. The “model” is a stub that misbehaves about one call in three, the way real models do on a bad day: prose instead of JSON, an invented category, an absurd refund. Every rejection is decided by code.",
        ],
        code: {
          lang: "python",
          text: `# harness.py: wrap an unreliable model in deterministic checks.
import json
import random

ALLOWED_CATEGORIES = {"billing", "delivery", "technical", "other"}
MAX_REFUND = 100.0
SCHEMA = {"category": str, "priority": int, "refund": (int, float)}

def fake_model(ticket: str) -> str:
    """Stand-in for an LLM: usually right, sometimes broken."""
    roll = random.random()
    if roll < 0.15:
        return "Sure! Here is your answer: category billing, priority high."
    if roll < 0.25:
        return json.dumps({"category": "refunds", "priority": 2, "refund": 20})
    if roll < 0.35:
        return json.dumps({"category": "billing", "priority": 1, "refund": 950})
    category = "delivery" if "late" in ticket else "billing" if "charged" in ticket else "other"
    return json.dumps({"category": category, "priority": 2,
                       "refund": 0 if category == "other" else 10})

def validate(raw: str) -> tuple[dict | None, list[str]]:
    """Schema first, then business invariants. Returns (data, errors)."""
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return None, ["output is not valid JSON"]
    if not isinstance(data, dict):
        return None, ["output is not a JSON object"]
    errors = []
    for field, kind in SCHEMA.items():
        if field not in data:
            errors.append(f"missing field: {field}")
        elif isinstance(data[field], bool) or not isinstance(data[field], kind):
            errors.append(f"wrong type for {field}")
    if errors:
        return None, errors
    if data["category"] not in ALLOWED_CATEGORIES:
        errors.append(f"unknown category: {data['category']}")
    if data["priority"] not in (1, 2, 3):
        errors.append("priority must be 1, 2 or 3")
    if not 0 <= data["refund"] <= MAX_REFUND:
        errors.append(f"refund outside 0..{MAX_REFUND}")
    return (None, errors) if errors else (data, [])

def harnessed_call(ticket: str, max_attempts: int = 3) -> dict:
    """Retry with the errors fed back; escalate to a person if it never passes."""
    feedback, errors = "", []
    for attempt in range(1, max_attempts + 1):
        data, errors = validate(fake_model(ticket + feedback))
        if not errors:
            return {"status": "ok", "attempts": attempt, **data}
        feedback = "\\nYour last answer was rejected: " + "; ".join(errors)
    return {"status": "escalated", "attempts": max_attempts, "errors": errors}

TICKETS = ["My parcel is late again", "I was charged twice", "How do I reset my password?"]

if __name__ == "__main__":
    random.seed(7)
    runs, raw_ok, results = 1000, 0, []
    for i in range(runs):
        ticket = TICKETS[i % len(TICKETS)]
        if not validate(fake_model(ticket))[1]:
            raw_ok += 1
        results.append(harnessed_call(ticket))
    ok = sum(r["status"] == "ok" for r in results)
    print(f"Raw model, valid outputs: {100 * raw_ok / runs:.1f} %")
    print(f"Harnessed, valid outputs: {100 * ok / runs:.1f} %")
    print(f"Harnessed, escalated:     {100 * (runs - ok) / runs:.1f} %")
    print(f"Average attempts:         {sum(r['attempts'] for r in results) / runs:.2f}")`,
        },
      },
      {
        title: "Run the bench",
        body: [
          "Run it. The raw model is valid about two times in three. With the harness, roughly 95 % of tickets pass after one to three attempts and the rest are escalated.",
          "The key line is not the pass rate: it is that nothing invalid gets through, and you know exactly how much work reaches a person. Retries also cost tokens, so check the average attempts against your cost estimate from module 2.",
        ],
        code: { lang: "shell", text: "python harness.py" },
      },
      {
        title: "Add regression gates",
        body: [
          "Save this as test_harness.py next to harness.py. These tests are the gate: any change to the rules or the prompt must keep them green before it ships.",
        ],
        code: {
          lang: "python",
          text: `# test_harness.py: regression gates for the harness.
import json
import random
import unittest

from harness import harnessed_call, validate

def as_json(category="delivery", priority=2, refund=10):
    return json.dumps({"category": category, "priority": priority, "refund": refund})

class Invariants(unittest.TestCase):
    def test_accepts_a_good_answer(self):
        self.assertEqual(validate(as_json())[1], [])

    def test_rejects_prose(self):
        self.assertTrue(validate("Sure! Category billing.")[1])

    def test_rejects_unknown_category(self):
        self.assertTrue(validate(as_json(category="refunds"))[1])

    def test_rejects_refund_above_ceiling(self):
        self.assertTrue(validate(as_json(refund=950))[1])

    def test_rejects_boolean_priority(self):
        self.assertTrue(validate(as_json(priority=True))[1])

    def test_nothing_invalid_gets_through(self):
        random.seed(1)
        for _ in range(500):
            result = harnessed_call("I was charged twice")
            if result["status"] == "ok":
                payload = {k: result[k] for k in ("category", "priority", "refund")}
                self.assertEqual(validate(json.dumps(payload))[1], [])

if __name__ == "__main__":
    unittest.main()`,
        },
      },
      {
        title: "Run the gates, then break a rule",
        body: [
          "Run the tests: all six pass. Now set MAX_REFUND = 1000 in harness.py, as a hurried change might, and run them again. The ceiling test fails: the gate caught a loosened rule before it shipped. Put the value back.",
        ],
        code: { lang: "shell", text: "python -m unittest test_harness -v" },
      },
      {
        title: "Go further (optional)",
        body: [
          "Swap the stub for a real model and keep everything else. Free and local: install Ollama, run ollama pull llama3.2, and make fake_model send a POST to http://localhost:11434/api/generate with model, prompt, \"stream\": false and \"format\": \"json\", then return the response field. With a hosted provider, keep the same shape: ticket text in, raw text out.",
          "Ask for JSON only and list the allowed categories in the prompt, but keep every check: the prompt lowers the failure rate, the harness removes what is left. Set runs to 30, since real calls take time (and money, with a paid API).",
        ],
      },
    ],
    checklist: [
      "I vibed a first draft and listed what it was missing",
      "harness.py runs and prints the raw and harnessed valid rates",
      "Every rejection is a code check: schema, allowed values or a ceiling",
      "The tests pass, and one fails when I loosen the refund ceiling",
      "Calls that still fail after the retries are escalated, never passed through",
    ],
    bubble: "Plug the model into the harness. Watch the bad answers bounce.",
  },

  deliverable: {
    kicker: "Deliverable · Architecture choice sheet",
    title: "Choose the architecture of your candidate workflow",
    purpose:
      "Turn your agent candidate card (module 0), loop map (module 1) and cost estimate (module 2) into explicit architecture choices: who decides what, how many agents, which platform, which model, where it runs and what the harness checks. It becomes the technology section of your capstone adoption plan.",
    fileName: "architecture-choice.md",
    template: `# Architecture choice sheet

Workflow (from the candidate card):
Loop map and cost estimate used (dates):
Author:
Date:

## 1. The workflow as a state machine
The order of steps lives in code. The model only works inside a step.
| Step | Run by code or by the model | Check before moving on | On failure |
|---|---|---|---|
| | | | |

## 2. Topology
- One agent or several? Why:
- If several: roles, centralised or decentralised control, how they exchange messages:
- Conflict rule (who wins when two agents disagree or want the same resource):
- Success metric that ends the loop:

## 3. Platform
- Coordination (sequence, hierarchy or loops):
- Data sovereignty (where inference runs):
- Control (who owns the weights, the runtime, the release cycle):
- Choice (visual tool, SDK, agent built into an existing vendor platform) and why:
- Alternative considered, and why not:
- Exit plan if the platform stalls or changes direction:

## 4. Model: open or closed
| Factor | Open candidate: | Closed candidate: |
|---|---|---|
| Quality on our own test cases | | |
| Monthly cost (from the cost estimate) | | |
| Where data goes, retention | | |
| Skills we have to run it | | |

- Choice and reason:

## 5. Where it runs
- Public cloud, private cloud, on-premise or edge; serverless, containers, or both:
- Where customer data travels; encryption, retention, contract terms:

## 6. Harness
- Invariants (rules that must never break):
- Schema for every model output:
- Sandbox, bench (number and kind of edge cases) and the regression gate that blocks a release:
- When a tool fails or an API times out (retry, checkpoint, hand-over):
- Credentials: what the agent can reach, and what it cannot:

## 7. Before deciding, we still need
-
`,
    checklist: [
      "Every step of the workflow says whether code or the model runs it",
      "The one-agent or multi-agent choice is justified and has a success metric",
      "The platform choice answers coordination, data sovereignty and control, with an exit plan",
      "Data location and retention are stated for the chosen model and hosting",
      "At least three invariants and one failure mode are written down",
    ],
    bubble: "Your architecture, one decision per line. Plug it into the capstone.",
  },
};
