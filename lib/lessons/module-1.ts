import type { LessonContent } from "../lessons";

// Module 1 · The agent loop. Source: MIT module 1 (sections 2 and 4) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_1: LessonContent = {
  reading: {
    kicker: "Concept · Perceive, Reason, Act, Reflect",
    title: "Inside the loop that drives every agent",
    intro:
      "An agent repeats one cycle until its goal is met or a rule stops it. Each of the four stages relies on different technology and fails in its own way. Knowing which is which tells you where to put your checks.",
    sections: [
      {
        heading: "The cycle, and its best-known pattern",
        body: [
          "Perceive: take in the goal and whatever the world sends back (text, a voice call, a screenshot, a tool result). Reason: decide what to do next. Act: call a tool or answer. Reflect: compare the result with the goal and decide whether to go round again.",
          "The most common way to implement it is called ReAct (reason + act). The model writes a short thought, picks an action, receives an observation, and repeats. The surrounding code, not the model, runs the tools and enforces limits.",
        ],
        table: {
          head: ["Turn", "Thought", "Action", "Observation"],
          rows: [
            ["1", "I need the order status.", "get_order(\"A123\")", "{ status: shipped, days_late: 5 }"],
            ["2", "It is late, policy allows a voucher.", "issue_voucher(\"A123\", 10%)", "{ voucher: V-889 }"],
            ["3", "Goal met.", "answer the customer", "(loop ends)"],
          ],
        },
        callout: {
          label: "Always add",
          text: "A step limit and a way out. An agent that cannot finish should stop and hand over to a person, not loop forever.",
        },
      },
      {
        heading: "Perceive: one pipeline, several models",
        body: [
          "Multimodal agents are rarely one giant model that understands everything. In production they are usually a chain of specialised components, each one replaceable and each one a place where things can break.",
        ],
        bullets: [
          "Speech recognition (ASR) turns audio into text.",
          "Language understanding (NLU) works out intent and context from that text.",
          "Text-to-speech (TTS) turns the answer back into a natural voice.",
          "Voice biometrics recognises who is speaking. It is powerful, and heavily regulated.",
        ],
        table: {
          head: ["Sector", "Typical chain"],
          rows: [
            ["Health care", "Dictation → transcript → remove patient identifiers → clinical model → structured record"],
            ["Retail contact centre", "Streaming ASR → intent and sentiment → CRM tool call → TTS answer"],
            ["Automotive", "On-device ASR (no network delay) → vehicle controls → cloud model only when needed"],
            ["Education", "Student speech → pronunciation analysis → multilingual TTS → feedback against a rubric"],
          ],
        },
      },
      {
        heading: "Perceive: real time or batch?",
        body: [
          "A navigation assistant must answer in under a second; a meeting summary can arrive an hour later. Real-time processing costs more because it needs capacity standing by. Language coverage and a custom brand voice also drive cost: major languages are well served, rare ones and bespoke voices need extra training.",
        ],
        callout: {
          label: "Compliance trap",
          text: "A voice recording can be biometric data. Under GDPR (Article 9), Illinois' BIPA and California's privacy law, identifying speakers or profiling them needs explicit consent. Some places also require every party to agree before a call is recorded. Announce the recording, minimise retention, keep biometrics opt-in, and check where the audio is sent.",
        },
      },
      {
        heading: "Generating media: three engines",
        body: ["When an agent produces images or audio, one of three families is usually at work, often combined."],
        table: {
          head: ["Engine", "Idea", "Strength", "Typical flaw"],
          rows: [
            ["GAN", "A generator tries to fool a discriminator; both improve", "Fast, realistic", "Mode collapse: variety narrows to a few safe outputs"],
            ["Diffusion", "Start from noise and remove it step by step towards the prompt", "Diverse, stable training", "Odd details (extra fingers) when global coherence slips"],
            ["Transformer", "Self-attention relates every part of the input to every other part", "Coherence, scales in parallel", "Cost grows with input length"],
          ],
        },
        bullets: [
          "Image tools typically pair a transformer that reads the prompt with a diffusion model that paints the picture.",
          "Before transformers (2017), recurrent networks read text word by word and lost the thread on long inputs.",
        ],
      },
      {
        heading: "Reason: thinking out loud is not proof",
        body: [
          "Chain-of-thought means the model writes intermediate steps before concluding. Reasoning models are trained to do this by default and do much better on maths, code and planning. They are also slower and more expensive.",
          "The catch: a well-structured chain of reasoning is more convincing, including when one step is invented. People and downstream code tend to trust it more.",
        ],
        callout: {
          label: "Reflect, in code",
          text: "Never let the model's reasoning trigger an action that changes something on its own. Validate the proposed action with code (schema, allowed values, amounts) and route actions above your risk threshold to a person.",
        },
      },
    ],
    takeaways: [
      "The loop is Perceive → Reason → Act → Reflect, run by your code with a step limit and an exit.",
      "Perception is a pipeline of specialised models: each boundary is a place to test and to fail safely.",
      "Voice brings legal duties that text does not.",
      "Reasoning improves answers but not their verifiability: check actions deterministically.",
    ],
    check: {
      prompt:
        "A refund agent's reasoning ends with “the customer is eligible, refund €480”. One step of that reasoning quoted a policy that does not exist. Which control stops the refund?",
      options: [
        { id: "a", text: "Asking the model to think step by step more carefully" },
        { id: "b", text: "Switching to a larger reasoning model" },
        { id: "c", text: "A code check against the real policy and a refund ceiling before the API call" },
        { id: "d", text: "Logging the reasoning for a monthly review" },
      ],
      correct: "c",
      hints: {
        a: "More reasoning produces a longer, more convincing chain. It does not verify the invented step.",
        b: "Larger reasoning models can be just as confident when wrong. The fix is outside the model.",
        d: "Logs help you learn after the fact. The money has already left.",
      },
      explanation:
        "Yes. A deterministic gate, here policy lookup plus a ceiling, sits between Reason and Act. It does not care how persuasive the reasoning sounds.",
    },
    bubble: "Four stages, one loop. Let's take it apart.",
  },

  postMortem: {
    kicker: "Post-mortem · Reasoning models, 2025",
    title: "Smarter models, more hallucinations",
    context:
      "In April 2025 OpenAI published the system card for two reasoning models, o3 and o4-mini. On PersonQA, an internal test of factual questions about people, both models invented facts more often than the earlier o1, even though they scored higher on many reasoning benchmarks.",
    numbers: [
      { value: "16 %", label: "o1 hallucination rate on PersonQA" },
      { value: "33 %", label: "o3 hallucination rate" },
      { value: "48 %", label: "o4-mini hallucination rate" },
      { value: "+ claims", label: "o3 makes more claims overall: more right ones, and more wrong ones" },
    ],
    timeline: [
      { label: "Sept 2024", text: "Reasoning models arrive. They think before answering and jump ahead on maths, science and code." },
      { label: "Apr 2025", text: "The o3 and o4-mini system card reports higher hallucination rates on factual questions than o1. The smaller o4-mini, with less world knowledge, fares worst." },
      { label: "Reaction", text: "OpenAI says more research is needed to understand why. The industry takeaway: better reasoning does not mean more reliable facts." },
      { label: "For builders", text: "Teams that let model output drive actions add validation gates, retrieval of trusted sources and human review for high-stakes steps." },
    ],
    lessons: [
      "Benchmarks measure what they measure. Check the failure mode that matters for your workflow, here factual accuracy.",
      "A smaller model knows less of the world: ground it with retrieval or tools instead of trusting its memory.",
      "Persuasive reasoning raises the risk that a wrong conclusion gets through. The Reflect stage must be code, not vibes.",
      "Test every model upgrade on your own cases before switching. Newer is not always better for your task.",
    ],
    question: {
      prompt: "Your team wants to swap o1 for o4-mini in a contract-review agent because it is cheaper and newer. What should happen first?",
      options: [
        { id: "a", text: "Ship it: newer models are better" },
        { id: "b", text: "Run your own factual test set on both models and compare error rates" },
        { id: "c", text: "Ask o4-mini to confirm it does not hallucinate" },
        { id: "d", text: "Increase the temperature to get more diverse answers" },
      ],
      correct: "b",
      hints: {
        a: "The system card shows the opposite on factual questions. Newer is not a guarantee.",
        c: "A model cannot reliably grade its own hallucinations. You need an external reference.",
        d: "Temperature changes variety, not accuracy. It usually makes factual errors more likely.",
      },
      explanation:
        "Right. A small golden set from your own contracts, run on both models, tells you whether the savings are worth the error rate. Module 7 turns this into a routine.",
    },
    sources: [
      "OpenAI. (2025, April 16). OpenAI o3 and o4-mini system card.",
      "Paul, K., & Tong, A. (2024, September 13). OpenAI launches new series of AI models with “reasoning” abilities. Reuters.",
    ],
    bubble: "Even the best models slip. Let's see how.",
  },

  lab: {
    kicker: "Lab · Your first loop in code",
    title: "Build a ReAct loop that knows when to stop",
    goal: "Write a 40-line agent loop in Python with a fake model and a real tool, make it fail, then add the Reflect check that catches the failure.",
    duration: "30 minutes",
    prerequisites: ["Python 3.10 or later", "A terminal and a text editor", "No API key needed"],
    steps: [
      {
        title: "Create the loop",
        body: [
          "Save this as react_loop.py. The “model” is a stub so the loop runs offline: it decides the next action from what it has seen, exactly like an LLM would in a ReAct loop.",
        ],
        code: {
          lang: "python",
          text: `# react_loop.py: a minimal Perceive -> Reason -> Act -> Reflect loop.
import json

ORDERS = {"A123": {"status": "shipped", "days_late": 5}}

def get_order(order_id: str) -> dict:
    """Tool: look up an order."""
    return ORDERS.get(order_id, {"error": "not found"})

TOOLS = {"get_order": get_order}

def fake_model(goal: str, observations: list[dict]) -> dict:
    """Stand-in for an LLM: picks the next action from what it has seen."""
    if not observations:
        order_id = goal.split()[-1].strip("?")
        return {"thought": "I need the order status first.",
                "action": "get_order", "args": {"order_id": order_id}}
    if observations[-1].get("days_late", 0) > 3:
        return {"thought": "The order is late. Offer a voucher.",
                "final": "Sorry, your order is late. Here is a 10% voucher."}
    return {"thought": "Looks fine.", "final": "Your order is on its way."}

def run(goal: str, max_steps: int = 5) -> str:
    observations: list[dict] = []                         # Perceive
    for step in range(max_steps):
        decision = fake_model(goal, observations)         # Reason
        print(f"[{step}] thought: {decision['thought']}")
        if "final" in decision:
            return decision["final"]
        tool = TOOLS.get(decision["action"])
        if tool is None:
            return "Unknown tool requested: handing over to a person."
        result = tool(**decision["args"])                 # Act
        print(f"[{step}] {decision['action']} -> {json.dumps(result)}")
        observations.append(result)                       # Reflect (for now: just remember)
    return "Step limit reached: handing over to a person."

if __name__ == "__main__":
    print(run("Customer asks: where is my order A123?"))`,
        },
      },
      {
        title: "Run it",
        body: ["Run python react_loop.py. You should see two thoughts, one tool call, and the voucher answer."],
        code: { lang: "shell", text: "python react_loop.py" },
      },
      {
        title: "Make it fail",
        body: [
          "Change the goal to ask about order B999, which does not exist. Run again.",
          "The tool returns an error, the model sees no delay, and the agent cheerfully says the order is on its way. That is a confident wrong answer built from a failed observation.",
        ],
      },
      {
        title: "Add the Reflect check",
        body: [
          "Insert this right after the tool call, before the result is appended. The check is code, so it does not depend on how the model interprets the error.",
        ],
        code: {
          lang: "python",
          text: `        if "error" in result:                             # Reflect: validate before going on
            return "I could not find that order. A colleague will follow up."`,
        },
      },
      {
        title: "Go further (optional)",
        body: [
          "Replace fake_model with a call to a real model. Ask it to reply only with JSON in the same shape (thought, action, args or final), parse it with json.loads, and reject anything whose action is not in TOOLS. Keep max_steps.",
        ],
      },
    ],
    checklist: [
      "The loop runs and prints thoughts and tool calls",
      "I reproduced the confident wrong answer with order B999",
      "My Reflect check turns the failure into a hand-over",
      "I can point to Perceive, Reason, Act and Reflect in the code",
    ],
    bubble: "Code time. Forty lines, no API key.",
  },

  deliverable: {
    kicker: "Deliverable · Loop map",
    title: "Map the loop of your candidate workflow",
    purpose:
      "Take the workflow from your agent candidate card (module 0) and describe each stage of its loop: what comes in, what is decided, what is done, and what is checked.",
    fileName: "loop-map.md",
    template: `# Loop map

Workflow (from the candidate card):
Author:
Date:

## Perceive
- Inputs (text, voice, images, documents, tool results):
- Real time or batch:
- Languages:
- Personal or biometric data involved? Consent and retention plan:

## Reason
- Decisions the agent makes:
- Plain model enough, or reasoning model needed? Why:
- Facts it must not invent (prices, policies, dates):

## Act
| Tool or system | Read or write | Worst thing a wrong call could do |
|---|---|---|
| | | |

## Reflect
- Checks done in code before each write action:
- Risk threshold above which a person approves:
- Step limit:
- Who takes over when the agent stops:
`,
    checklist: [
      "Every write action has a code check before it",
      "A step limit and a hand-over owner are named",
      "Voice or personal data, if any, has a consent and retention line",
      "Facts the agent must not invent are listed",
    ],
    bubble: "Your loop, on one page.",
  },
};
