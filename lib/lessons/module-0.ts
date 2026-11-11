import type { LessonContent } from "../lessons";

// Module 0 · Awakening: what is an agent? Source: MIT module 1 (sections 1 and 2) and its complements.
// Content file: long by nature (prose and templates), no logic.
export const MODULE_0: LessonContent = {
  reading: {
    kicker: "Concept · From chatbot to agent",
    title: "A chatbot answers. An agent gets things done.",
    intro:
      "Since 2022, anyone can talk to a language model in plain words. That was the generative wave. The agentic wave adds something else: a goal, a plan, tools, and the habit of checking its own work. This module shows where agents come from and what really changes.",
    sections: [
      {
        heading: "What a language model actually does",
        body: [
          "Under the hood, a large language model (LLM) does one thing: given some text, it predicts what comes next, one token at a time. A token is a small chunk of text, roughly three quarters of a word.",
          "Words are first turned into vectors, lists of numbers that capture meaning. A transformer network then lets every token look at every other token in the input (self-attention). That is how the model keeps track of context across a long passage.",
          "A model is built in three passes:",
        ],
        bullets: [
          "Pre-training: it reads a huge corpus (books, articles, code) and adjusts billions of internal weights until it predicts text well.",
          "Fine-tuning: further training on a narrower dataset, such as support transcripts, so it adopts a domain's vocabulary and tone.",
          "Human feedback: reviewers rate answers, and those ratings steer the model towards responses people find useful.",
        ],
        callout: {
          label: "Keep in mind",
          text: "The output is probabilistic. The same question can get different answers, and a fluent answer is not proof of a correct one.",
        },
      },
      {
        heading: "Four generations of conversational AI",
        body: [
          "ELIZA, written at MIT in 1966, imitated a therapist with a handful of keyword rules. Sixty years later the leap is not only fluency: models can now break a problem into steps by themselves.",
        ],
        table: {
          head: ["Generation", "How it works", "Example", "Limit"],
          rows: [
            ["Rule-based bots (from 1966)", "Keyword matching and scripted menus", "“Type 1 for order status”", "Breaks as soon as the user leaves the script"],
            ["Conversational assistants (2010s)", "Machine learning recognises intents", "Voice assistants on phones and speakers", "Narrow set of skills, little reasoning"],
            ["Generative chatbots (late 2010s)", "Transformer LLMs write free-form answers", "ChatGPT, Claude, Gemini", "Answers, but does not act"],
            ["Reasoning models (2024 on)", "Think step by step before answering", "OpenAI o-series, extended-thinking models", "Slower, costlier, can be wrong with conviction"],
          ],
        },
      },
      {
        heading: "What changes with an agent",
        body: [
          "An agent is a model placed inside a workflow that it partly drives. You give it a goal instead of a question. It decides on steps, calls tools (search, a database, an API), reads the results and tries again if needed.",
          "A useful working definition: an agent is a workflow of tasks, some done by software and some by people.",
        ],
        table: {
          head: ["", "Chatbot", "Retrieval-augmented (RAG)", "Agent"],
          rows: [
            ["Control", "One prompt, one answer", "Question → search documents → answer", "Goal → plan → act → observe → repeat"],
            ["Memory", "The current chat only", "Chat history plus a document index", "Short-term scratchpad plus a long-term store"],
            ["Tools", "None", "Read-only search", "Read and write: APIs, databases, other systems"],
            ["When it fails", "The user rephrases", "Makes things up or finds nothing", "Notices, retries or escalates"],
          ],
        },
        callout: {
          label: "Meet Loop",
          text: "Perceive → Reason → Act → Reflect is the heartbeat of every agent. Loop, your guide, is named after it. Module 1 takes the cycle apart piece by piece.",
        },
      },
      {
        heading: "Where agents already show up",
        body: [
          "Most of these are still early. The pattern that works today: the agent takes the frequent, well-defined cases and hands the rest to people.",
        ],
        bullets: [
          "Customer service that solves a request end to end instead of just answering it.",
          "Marketing that drafts a campaign, publishes it, watches the numbers and adjusts.",
          "Sales support that spots an upsell opportunity and suggests the next step.",
          "Security monitoring that detects, reports and contains an incident.",
          "Supply-chain planning that forecasts demand and reorders stock.",
        ],
      },
    ],
    takeaways: [
      "An LLM predicts the next token. Everything else is built around that.",
      "Generative AI produces content. Agentic AI pursues a goal with tools, memory and self-correction.",
      "Agents fail differently: a chatbot gives a bad answer, an agent can take a bad action.",
    ],
    check: {
      prompt:
        "Your support bot answers “Where is my order?” with a polite generic message. You want it to look up the order, spot a delay and offer a voucher by itself. What are you adding?",
      options: [
        { id: "a", text: "A bigger language model" },
        { id: "b", text: "Tools, a goal and a loop that checks the result" },
        { id: "c", text: "More training data about shipping" },
        { id: "d", text: "A longer system prompt" },
      ],
      correct: "b",
      hints: {
        a: "A bigger model writes better answers, but it still cannot look anything up or act. What is missing is tools and a loop.",
        c: "Training data shapes how it talks, not what it can do. Looking up an order needs a tool call.",
        d: "Prompts guide behaviour, but without tools the bot can only describe what it would do.",
      },
      explanation:
        "Exactly. Looking up the order is a tool call, spotting the delay is reasoning over the result, the voucher is an action, and checking it worked is reflection. That is the move from chatbot to agent.",
    },
    bubble: "Hi, I'm Loop. Let's see what an agent really is.",
  },

  postMortem: {
    kicker: "Post-mortem · Klarna, 2024",
    title: "700 agents' worth of work in a month, and what came after",
    context:
      "In early 2024 the Swedish payments company Klarna put an AI assistant, built on OpenAI models, in front of its customer service chat. Within a month it was handling about two thirds of all chats, in more than 35 languages.",
    numbers: [
      { value: "≈ 700", label: "full-time agents' worth of work in month one" },
      { value: "11 → 2 min", label: "average time to resolve a request" },
      { value: "−25 %", label: "repeat inquiries" },
      { value: "$40 M", label: "estimated profit improvement for 2024" },
    ],
    timeline: [
      { label: "Launch", text: "The assistant takes refunds, returns, payment questions and disputes in chat, with a hand-off to people available." },
      { label: "First month", text: "Volume and speed beat expectations. Repeat contacts fall because more requests are solved the first time." },
      { label: "The split", text: "Work divides in two: the assistant takes high-volume, well-defined requests; human teams keep complex cases such as fraud and disputes." },
      { label: "2025", text: "Leadership says publicly that the push for savings had cost some quality, and starts recruiting human agents again so customers can always reach a person." },
    ],
    lessons: [
      "Agents shine on frequent, well-scoped transactions. That is where “11 minutes to 2” came from.",
      "Measure quality, not only volume: repeat contacts and satisfaction tell you whether requests are really solved.",
      "Design the hand-off to people from day one. “Can I talk to a person?” is a feature, not a failure.",
      "Headline savings are a starting point. The real system is the agent plus the people around it.",
    ],
    question: {
      prompt: "Which metric best tells Klarna that the assistant actually solves problems, rather than just closing chats quickly?",
      options: [
        { id: "a", text: "Number of conversations handled" },
        { id: "b", text: "Average handling time" },
        { id: "c", text: "Fall in repeat inquiries" },
        { id: "d", text: "Number of languages supported" },
      ],
      correct: "c",
      hints: {
        a: "Volume shows capacity, not quality. A bot can close many chats without solving them.",
        b: "Speed matters, but a fast wrong answer brings the customer straight back.",
        d: "Coverage is useful, but says nothing about whether requests are resolved.",
      },
      explanation:
        "Right. If customers stop coming back with the same issue, the first answer worked. The 25% fall in repeat inquiries is the quality signal behind the speed.",
    },
    sources: [
      "Klarna press release, “Klarna AI assistant handles two-thirds of customer service chats in its first month”, 27 February 2024.",
      "Tordjman, K. L., et al. (2025, January 13). How AI agents are opening the golden era of customer experience. BCG.",
      "Press coverage of Klarna's decision to recruit human agents again, e.g. Bloomberg, May 2025.",
    ],
    bubble: "A real case. Let's open the file.",
  },

  lab: {
    kicker: "Lab · Play the loop by hand",
    title: "Turn a chat assistant into a small agent",
    goal: "Make an ordinary chat assistant plan, split the work into roles, execute, criticise and revise. You will feel the loop before you build it.",
    duration: "20 minutes",
    prerequisites: ["Any chat assistant (ChatGPT, Claude, Gemini, Copilot…)", "A text editor for notes"],
    steps: [
      {
        title: "Get a baseline",
        body: ["Ask for a one-shot answer to a realistic task. Keep it as your reference."],
        code: { lang: "prompt", text: "Write a 120-word email to a customer whose order is 5 days late. Offer a 10% voucher." },
      },
      {
        title: "Ask for a plan, not an answer",
        body: [
          "In a new chat, ask the assistant to plan the work as a sequence of tool calls, without doing it yet. Each step names a role, its instructions, and what it receives from the step before.",
        ],
        code: {
          lang: "prompt",
          text: `Goal: write the best possible 120-word apology email to a customer
whose order is 5 days late, offering a 10% voucher.

Do not write the email yet. Produce a JSON document called "plan":
a list of steps, each with "step", "role" (planner, writer, critic,
editor), "instructions" and "input" (what it receives from the
previous step). The critic must check tone, facts and length.`,
        },
      },
      {
        title: "Run the plan",
        body: ["Ask the assistant to play every role in order and to show each intermediate output."],
        code: { lang: "prompt", text: "Now execute the plan. Play each role in turn and print the output of every step before moving to the next one." },
      },
      {
        title: "Compare",
        body: ["Put the baseline and the final email side by side. Note what the critic caught, and whether the result is better or just different."],
      },
      {
        title: "Name the loop",
        body: [
          "Label each step of the run: Perceive (reading the goal), Reason (planning), Act (writing), Reflect (critique and revision).",
          "In a real agent each role would be a separate tool or model call, and the loop would stop on a rule rather than on your say-so.",
        ],
      },
    ],
    checklist: [
      "I have a baseline answer and a final answer",
      "The plan came out as JSON before any writing",
      "I noted at least one issue the critic caught",
      "I mapped each step to Perceive, Reason, Act or Reflect",
    ],
    bubble: "Your turn. No code needed yet.",
  },

  deliverable: {
    kicker: "Deliverable · Agent candidate card",
    title: "Pick the workflow you will work on",
    purpose:
      "One page that names one workflow from your own work where an agent could help, and why. You will reuse it at every module, up to the capstone.",
    fileName: "agent-candidate-card.md",
    template: `# Agent candidate card

Author:
Date:

## 1. The workflow
- Name of the workflow:
- Who does it today (team, role):
- How often (per day or week):
- Average time per occurrence:

## 2. Why it hurts
- Main pain (delay, errors, cost, repetitive work):
- A good outcome, in one sentence:

## 3. Chatbot, RAG or agent?
| Need | Yes / No | Notes |
|---|---|---|
| Only answers questions | | |
| Searches our documents | | |
| Acts in another system (write, send, book, update) | | |
| Needs several steps with checks in between | | |

Verdict (chatbot / RAG / agent):

## 4. Hand-off to people
- Cases the agent must never handle alone:
- Who takes over, and how:

## 5. How we would know it works
- Quality signal (e.g. repeat contacts, error rate):
- Speed signal:
- Cost signal:
`,
    checklist: [
      "The workflow is real and specific (not “customer service” in general)",
      "The chatbot / RAG / agent verdict is justified",
      "At least one case is reserved for people",
      "A quality signal is named, not only speed or volume",
    ],
    bubble: "Keep this card. It grows with you up to the capstone.",
  },
};
