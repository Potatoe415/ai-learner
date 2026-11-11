import type { LessonContent } from "../lessons";

// Module 1 · Foundations & the token meter. Opens with a History unit (brief history of AI, chatbot generations).
// Source: MIT module 1 (sections 1 to 5, Videos 1.2 and 1.3,
// Assignment 1.1) and its complements (minivan problem, hallucination paradox, agentic loops,
// multimodal pipelines, Klarna and Octopus Energy benchmarks, hidden OpEx, TCO).
// Content file: long by nature (prose, code and templates), no logic.

const history: LessonContent["history"] = {
  kicker: "History · From Turing to LangChain",
  title: "From “Can machines think?” to agents that act",
  intro:
    "Agents did not appear out of nowhere. They sit on seventy years of ideas, each one solving a limit of the last: a question asked in 1950, a name given in 1956, a first chatbot in 1966, then machines that beat world champions, learned to see, learned to create, and finally learned to talk to anyone. Knowing that path helps you tell what is genuinely new about agents, and what is not.",
  sections: [
    {
      heading: "1950: a question that started a field",
      body: [
        "The story usually starts with Alan Turing, the British mathematician often called the father of computer science. In 1950 he asked a simple question: can machines think?",
        "To make it testable, he proposed what became the Turing test: if a person holding a conversation cannot tell the machine from a human, the machine shows human-like intelligence. Modern variations of the test are still used in AI research and development today.",
        "Turing was also strikingly confident. In his view, early machines were only a foretaste of what was coming, and he saw no reason why machines should not, in time, enter every field of human intellect and compete on equal terms.",
      ],
    },
    {
      heading: "The milestones, at a glance",
      body: [
        "From that question to today’s agents, a handful of dates mark the turns. Read the table as a relay: each step hands something to the next.",
      ],
      table: {
        head: ["Year", "Milestone", "Why it matters"],
        rows: [
          ["1950", "Alan Turing asks “Can machines think?” and proposes the Turing test", "Gives the field its question and a first way to measure progress"],
          ["1956", "John McCarthy coins the term “artificial intelligence” for the Dartmouth Summer Research Project", "AI becomes a named research field"],
          ["1966", "MIT professor Joseph Weizenbaum creates ELIZA, which simulates a psychotherapist", "The first chatbot: keyword rules and scripted replies"],
          ["1997", "IBM’s Deep Blue beats world chess champion Garry Kasparov", "A machine outplays the best human at a game of strategy"],
          ["2012", "AlexNet wins the ImageNet image-classification challenge (ILSVRC)", "Proves that deep learning is the way forward"],
          ["2014", "Ian Goodfellow and colleagues at the University of Montreal develop the GAN", "Machines start to generate realistic new content"],
          ["2016", "DeepMind’s AlphaGo defeats Go world champion Lee Sedol", "Shows what reinforcement learning and deep neural networks can master"],
          ["2017", "Google researchers publish the transformer in “Attention Is All You Need”", "Self-attention makes large-scale language modelling practical"],
          ["2018 to today", "OpenAI’s GPT models open the era of large language models", "Each version adds capability, up to multimodal and real-time interaction"],
          ["2022", "ChatGPT 3.5 launches", "Millions of people use advanced AI in a browser, in plain language, with no specialist skills"],
          ["2023", "LangChain is released as an open-source framework for LLM applications", "Building chatbots and AI agents becomes easier for enterprises and enthusiasts alike"],
        ],
      },
    },
    {
      heading: "Three threads that meet in today’s agents",
      body: [
        "Look at the table again and three threads appear. Together they explain why agents became possible only recently.",
      ],
      bullets: [
        "Learning from data. AlexNet (2012) and AlphaGo (2016) showed what deep neural networks and reinforcement learning can master when they learn from data. That is what makes today’s models adaptable.",
        "Creating, not only recognising. Classic machine learning spots a cat in a picture. With GANs (2014) and then transformers (2017), machines started producing new text and images. The transformer is the engine you will open up in the Concept unit.",
        "Access. Before ChatGPT, using an AI model often required specialist knowledge. In 2022 a browser and plain words were enough, and in 2023 frameworks such as LangChain made agent building easier for ordinary teams.",
      ],
      callout: {
        label: "Why it matters for your project",
        text: "Turing himself said we need some experience with the machine before we really know its capabilities. That is the spirit of this trail: try agents on one real workflow, measure, then scale.",
      },
    },
    {
      heading: "Chatbots: four generations in sixty years",
      body: [
        "The chatbot thread runs through the whole story. Each generation fixed the main limit of the one before, and the latest one sets the stage for agents.",
      ],
      table: {
        head: ["Generation", "How it works", "Examples", "Main limit"],
        rows: [
          ["Rule-based bots (from 1966)", "Spot keywords, return scripted replies from a menu", "ELIZA (Joseph Weizenbaum, MIT), FAQ bots", "Lost as soon as the user leaves the script"],
          ["Conversational agents (early 2010s)", "Machine learning understands natural language better and learns from examples", "IBM Watson, Siri, Alexa", "Narrow skills, little reasoning"],
          ["Generative chatbots (late 2010s on)", "Transformer LLMs write free, personalised answers", "ChatGPT, Claude, Gemini", "They answer; they do not act"],
          ["Reasoning models (latest)", "Spend extra time breaking a problem into steps before replying", "OpenAI o3 and o4", "Slower, costlier, and can still hallucinate"],
        ],
      },
    },
    {
      heading: "What comes next: from generating to acting",
      body: [
        "Generative AI’s journey, from rule-based experiments to transformer-powered models, taught machines to learn patterns, create content and hold a conversation almost as fluently as people.",
        "Agentic AI builds on those foundations and adds autonomy: systems that do not just generate an output but set goals, make decisions and act on them with minimal guidance. That is the subject of the rest of this module, and of the whole trail.",
      ],
    },
  ],
  takeaways: [
    "1950: Turing asks whether machines can think. 1956: McCarthy names the field “artificial intelligence”.",
    "ELIZA (1966) was the first chatbot. Chatbots then moved from rules to machine learning, to generative models, to reasoning models.",
    "Deep learning (AlexNet, 2012), generation (GAN, 2014) and the transformer (2017) are the technical roots of today’s LLMs.",
    "ChatGPT 3.5 (2022) made AI usable by anyone; LangChain (2023) made building agents easier.",
    "Agents add one thing to that history: the autonomy to set goals, decide and act.",
  ],
  check: {
    prompt:
      "Which milestone introduced self-attention, the mechanism behind large-scale language models such as GPT?",
    options: [
      { id: "a", text: "AlexNet winning the ImageNet challenge (2012)" },
      { id: "b", text: "The transformer, in “Attention Is All You Need” (2017)" },
      { id: "c", text: "IBM’s Deep Blue beating Garry Kasparov (1997)" },
      { id: "d", text: "ELIZA, Joseph Weizenbaum’s chatbot (1966)" },
    ],
    correct: "b",
    hints: {
      a: "AlexNet proved deep learning works, but for classifying images. Self-attention for language came five years later.",
      c: "Deep Blue was a chess supercomputer. It had nothing to do with language models.",
      d: "ELIZA matched keywords to scripted replies. It had no learning and no attention mechanism at all.",
    },
    explanation:
      "Right: Google researchers introduced the transformer in 2017. Its self-attention lets the model weigh every part of the input against every other part, which revolutionised large-scale language modelling and paved the way for the GPT models from 2018 on.",
  },
  bubble: "Before we build agents, a short trip back to 1950.",
};

const reading: LessonContent["reading"] = {
  kicker: "Concept · From chatbot to agent, and what it costs",
  title: "A chatbot answers. An agent gets things done, and sends a bill.",
  intro:
    "You have seen how we got here. Since ChatGPT 3.5 arrived in 2022, anyone can talk to a language model in plain words. The agentic wave goes further: a goal, a plan, tools, and a habit of checking its own work. This reading walks you from the model under the hood to the loop that turns it into an agent, then to the meter that runs every time it thinks. It is a long one, so take it section by section.",
  sections: [
    {
      heading: "What changes with an agent",
      body: [
        "A chatbot waits for your prompt and replies. Agentic AI pursues a goal: it acts on its own initiative, adapts to the context and carries out multistep work with little human intervention.",
        "MIT’s Dr. Abel Sanchez offers a down-to-earth definition: an AI agent is a workflow made of tasks, some of which may involve people. Keep that one in mind, because every deliverable in this trail treats your agent as a workflow first and a model second.",
      ],
      table: {
        head: ["", "Generative chatbot", "Retrieval-augmented (RAG)", "Agentic system"],
        rows: [
          ["Control", "One prompt, one reply", "Query → search a vector index → inject context → reply", "Goal → plan → act → observe → iterate"],
          ["Memory", "None beyond the current exchange", "Session history", "Short-term scratchpad plus long-term store"],
          ["Tools", "None, text only", "Read-only search", "Reads and writes external APIs and databases"],
          ["When it fails", "The user retries", "Makes things up or returns nothing", "Retries or corrects itself"],
        ],
      },
      bullets: [
        "Typical use cases: automating customer experiences, creating and posting campaign content, proactive sales intelligence (next step, upsell), security systems that monitor and act, supply-chain planning.",
        "Customer service already shows the payoff: companies there report average productivity gains of 15% to 30% from generative AI.",
        "Octopus Energy (UK) put a ChatGPT-based assistant on its customer channel: it handles 44% of inquiries, the work of about 250 people, with 80% satisfaction against 77% for human agents. Klarna, the post-mortem of this module, shows the same pattern at a larger scale.",
        "Amarra, a New Jersey gown distributor, used generative AI from 2020 for product descriptions (60% less writing time), inventory (40% less overstock) and a chatbot taking 70% of inquiries. Its lesson: the first bot sounded robotic, and tone had to be adapted country by country.",
      ],
    },
    {
      heading: "Under the hood: what a language model does",
      body: [
        "Classic machine learning was predictive: train on thousands of cat pictures and the model learns to spot cats. Generative AI goes further and produces a new cat picture, or a description of one, on request.",
        "The engine is a neural network, layers of connected nodes loosely inspired by the brain. Stack many layers and you get deep learning, which handles unstructured data such as text and images. ChatGPT runs on a network with hundreds of billions of parameters.",
        "A large language model (LLM) is a deep network trained to predict the next piece of text. Words become vectors (lists of numbers that capture meaning). The transformer architecture, introduced by Google researchers in 2017 in “Attention Is All You Need”, uses self-attention: every token is weighed against every other token at once, which keeps context over long passages and lets training run in parallel. The output is probabilistic, so the same question can get different answers.",
        "A model is built in three stages:",
      ],
      bullets: [
        "Pre-training: it reads books, articles and code and adjusts its weights (the strengths of connections between neurons) until it predicts language well.",
        "Fine-tuning: further training on a specialised set, such as support transcripts, to adopt a domain’s vocabulary and tone.",
        "Reinforcement learning from human ratings: reviewers score answers for relevance, accuracy and style, and the scores steer the model.",
      ],
      callout: {
        label: "Prompting is a lever",
        text: "“Write about why sustainability matters to us” gets you a generic essay. “Draft a one-paragraph executive summary of how our new solar-powered warehouse cuts energy use” gets you something usable. A prompt is a brief: be specific about content, tone and format.",
      },
    },
    {
      heading: "The loop: Perceive, Reason, Act, Reflect, and the reasoning trap",
      body: [
        "What turns a stateless text generator into an agent is a goal-directed loop. Perceive: take in the goal and whatever comes back from the world (a message, a document, a tool result). Reason: decide the next step. Act: call a tool or reply. Reflect: compare the result with the goal and decide whether to go round again. This cycle is often implemented with the ReAct pattern (reason, then act, then observe).",
        "In Video 1.2, Dr. John Williams shows the idea with nothing but a chat window. He asks GPT to plan a short story about Tim the flying dog as a JSON list of tool calls (planner, writer, critic, then writer again), each step passing its output to the next. Then he tells it to play every role. The critic finds the introduction too long, and the final draft fixes it. Swap each role for a real tool or a separate model call and you have an agent.",
        "Every loop also needs a way out: a step limit and a hand-off to a person. An agent that cannot finish should stop and escalate, not spin. You will build a tiny one in the lab.",
        "The Reason stage is where reasoning models shine. They use chain-of-thought: they write intermediate steps before concluding, a bit like a chef following a recipe. Asked to choose between market A and market B, such a model looks at size, competition and regulation one by one before answering. They do clearly better on science, code and maths.",
        "They also cost more and take longer, and they still hallucinate, that is, produce claims with no basis in their training. OpenAI’s own system card for o3 and o4-mini found o4-mini more likely to hallucinate than earlier models on two separate measures.",
        "MIT instructors call this the hallucination paradox: a tidy, well-argued chain of reasoning is more persuasive, so people and downstream code are more likely to accept a step that was quietly invented.",
      ],
      callout: {
        label: "Reflect in code, not in prose",
        text: "Never let a model’s reasoning trigger an action that changes something without a deterministic check first (schema validation, allowed values, amounts). Route actions whose financial, legal or physical consequences exceed your risk tolerance to a human.",
      },
    },
    {
      heading: "Model types: three engines behind generative media",
      body: [
        "Three families power most generative media, and real products often combine them. Image tools such as DALL·E 3 or Midjourney, for example, use a transformer to understand the prompt and a diffusion model to paint the picture.",
      ],
      table: {
        head: ["Family", "Idea", "Good at", "Limit or note"],
        rows: [
          ["GAN (2014)", "A generator fakes data, a discriminator tries to catch it; both improve", "Speed, realism (editing, upscaling, deepfakes)", "Mode collapse: output variety narrows to a few safe results"],
          ["Diffusion", "Start from pure noise and refine it step by step towards the prompt", "Diversity, stable training", "Odd details, like a hand with seven fingers, when global coherence slips"],
          ["Transformer", "Self-attention relates every part of the input to every other part", "Coherence, control, scales in parallel", "Replaced recurrent networks (RNN, LSTM), which lost the thread on long inputs"],
        ],
      },
    },
    {
      heading: "Perceive in production: a pipeline, not one big model",
      body: [
        "Marketing often shows multimodal AI as one network that swallows every format. In production it is usually a chain of specialised parts: automatic speech recognition (ASR) turns speech into text, natural language understanding (NLU) works out intent, text-to-speech (TTS) speaks the answer, and voice biometrics, an emerging capability, recognises the speaker. Treat each boundary as a microservice where failures can be isolated.",
        "Audio costs depend on real-time versus batch (a car’s lane guidance needs under a second, a meeting summary can wait hours, and real time costs more), language coverage (major languages are well served, rarer ones need extra training) and customisation (a fully on-brand voice can take thousands of hours of training).",
      ],
      table: {
        head: ["Sector", "Typical chain"],
        rows: [
          ["Health care", "Audio → Whisper ASR → remove personal identifiers (HIPAA) → clinical LLM → structured record"],
          ["Retail, contact centre", "Customer voice → low-latency streaming ASR → intent and sentiment → CRM tool call → neural TTS"],
          ["Automotive", "On-device ASR (no cloud delay) → vehicle controller → cloud LLM only when needed"],
          ["Education", "Student speech → phoneme analysis → multilingual TTS → rubric-based feedback"],
        ],
      },
      callout: {
        label: "Compliance trap",
        text: "Voice is not just text with sound. Under GDPR Article 9, Illinois’ BIPA and California’s CCPA/CPRA, a voiceprint used to identify or profile someone is biometric data and needs explicit consent. Two-party-consent jurisdictions (California, Massachusetts, Germany) require a clear audio disclosure before recording or streaming to a third-party API. Add HIPAA in US health care and Brazil’s Lei Geral de Proteção de Dados, and plan consent prompts, retention limits, opt-in biometrics and data-processing contracts from day one.",
      },
    },
    {
      heading: "The token meter",
      body: [
        "Three things make up the bill: the equipment (GPU servers, rented or owned, and built into every hosted model’s price), the model and its tokens, and energy (big AI companies are even looking at nuclear power to keep it affordable).",
        "Tokens are the unit of account: chunks of three to four characters, about 0.75 of a word. You pay for input (what you send) and output (what comes back), at different rates. Output is typically three to four times dearer, so never price everything at one rate.",
        "Worked example: a 500-token prompt and a 1,000-token reply, at $0.03 per 1,000 input tokens and $0.06 per 1,000 output tokens, cost about $0.075. Run it 10,000 times a day and you are at $750 a day, $22,500 a month, possibly for a task a far cheaper model could do.",
        "The spread between models is huge. The course quotes GPT-4.5 at $150 per million output tokens against $0.60 for GPT-4o mini, a factor of 250, and some pairs differ by 500 times. In Assignment 1.1, the same 25-token question with a 379-token answer, run 10,000 times, cost anywhere from $1.15 to $229.65 depending on the model.",
      ],
      callout: {
        label: "Prices move",
        text: "The figures above are the course’s snapshot. List prices change often: always read today’s prices on the provider’s page and write the date next to them.",
      },
    },
    {
      heading: "The minivan problem and model tiering",
      body: [
        "A premium minivan is perfect for taking your own kids to school. To take every child in town, buying hundreds of them would be absurd: you would use buses, bike convoys, walking groups. At scale the best answer is rarely the most advanced machine. Running a frontier model for basic extraction or routing is buying a 15-passenger minivan to fetch a carton of milk.",
        "There is no best model, only trade-offs: accuracy against cost (a diagnosis assistant may need the top tier, a support bot rarely does), speed against power (bigger models answer slower; a customer-facing agent that takes 15 seconds fails however accurate it is) and context length against efficiency (long context is not always more expensive).",
        "The practical answer is a router. For every step, set the minimum accuracy and context it needs, then send it to the cheapest tier that clears the bar.",
      ],
      table: {
        head: ["Tier", "Models (course examples)", "Job", "Typical share"],
        rows: [
          ["1 · Router", "Small models: GPT-4o mini, Claude 3.5 Haiku, Gemini 1.5 Flash", "Intent recognition, format checks, simple requests, under 200 ms", "≈ 80%"],
          ["2 · Specialist", "Fine-tuned model or retrieval pipeline", "Domain work: SQL, policy lookup", "≈ 15%"],
          ["3 · Escalation", "Frontier reasoning: OpenAI o1/o3, Claude Opus", "Ambiguous, multi-variable or conflicting cases flagged below", "≈ 5%"],
        ],
      },
      bullets: [
        "Five questions before you pick: What minimum accuracy do we need? How often will it run? Can caching or a cheaper model handle part of it? Does it need to be real time? Does it need long context?",
      ],
    },
    {
      heading: "The costs that are not on the calculator",
      body: [
        "Instructors warn that agent budgets often overrun by 200% to 500% because the token calculator only shows the visible part.",
      ],
      bullets: [
        "Context bloat: each turn re-sends the history, so a long conversation’s token count grows roughly with the square of its length. Prune, summarise or use a sliding window.",
        "Tool definition tax: every tool’s schema sits in the prompt. Ten tools can add 1,500 to 3,500 input tokens to every step, used or not.",
        "Prompt caching: put the fixed parts (system prompt, tool schemas, examples) first and unchanged, and provider caching can cut input cost by 50% to 80%.",
        "Evaluations: a nightly suite of 500 cases × 5 agent steps can burn more tokens than early production traffic.",
        "Infrastructure: vector databases, API gateways, tracing and monitoring platforms.",
        "People: engineering hours, prompt maintenance, red-teaming, human reviewers, retraining staff. Technology is only about 20% of adoption; change management and approvals are the other 80%.",
      ],
      table: {
        head: ["", "Commercial API", "Open source, self-hosted", "Custom fine-tuned"],
        rows: [
          ["Upfront", "Minimal ($0 to $5K)", "$20K to $50K for MLOps set-up", "$50K to $250K for data and training"],
          ["Running", "Fully variable, pay per token", "High fixed cost: reserved GPUs", "Dedicated hosting and endpoints"],
          ["Data privacy", "Depends on the contract", "Stays in your network", "Depends on where it runs"],
          ["Maintenance", "None", "High: clusters, drivers, autoscaling", "Very high: retraining, drift monitoring"],
          ["Best for", "Prototypes, low to medium traffic", "High volume, strict compliance", "Proprietary domain logic or signature style"],
        ],
      },
    },
  ],
  takeaways: [
    "An LLM predicts the next token. An agent wraps it in a Perceive → Reason → Act → Reflect loop with tools, memory, a step limit and a human exit.",
    "Persuasive reasoning is not proof: validate actions in code and send high-stakes ones to people.",
    "Multimodal systems are pipelines of specialised models, and voice carries legal duties text does not.",
    "Cost = input tokens × input rate + output tokens × output rate, times volume. Keep the two rates apart.",
    "Route each step to the cheapest model that clears its bar, and budget for history, tools, evals, infrastructure and people.",
  ],
  check: {
    prompt:
      "Each call sends 500 input tokens and gets 1,000 output tokens back. Prices: $0.03 per 1,000 input tokens, $0.06 per 1,000 output tokens. Volume: 10,000 calls a day. What is the bill for a 30-day month?",
    options: [
      { id: "a", text: "$13,500" },
      { id: "b", text: "$22,500" },
      { id: "c", text: "$27,000" },
      { id: "d", text: "$750" },
    ],
    correct: "b",
    hints: {
      a: "You priced all 1,500 tokens at the input rate. Output tokens cost twice as much here.",
      c: "You priced all 1,500 tokens at the output rate. The 500 input tokens are cheaper.",
      d: "That is one day. Multiply by 30.",
    },
    explanation:
      "Right: 0.5 × $0.03 + 1 × $0.06 = $0.075 per call, × 10,000 = $750 a day, × 30 = $22,500 a month. Using a single rate for everything is the first mistake instructors see in Assignment 1.1.",
  },
  bubble: "Hi, I'm Loop. Let's open the hood, then read the meter.",
};

const postMortem: LessonContent["postMortem"] = {
  kicker: "Post-mortem · Klarna, 2024",
  title: "700 agents’ worth of work in a month, and the humans who stayed",
  context:
    "In 2024 the Swedish fintech Klarna put an AI customer service assistant, powered by OpenAI, in front of its customers. MIT facilitators use it as a reference benchmark for AI in customer service: big numbers on volume and speed, and a clear split between what the machine handles and what people keep.",
  numbers: [
    { value: "≈ 700", label: "full-time agents’ worth of work in the first 30 days" },
    { value: "11 → 2 min", label: "average time to resolve an inquiry (about 82% faster)" },
    { value: "−25%", label: "repeat inquiries, thanks to more accurate resolution" },
    { value: "$40M", label: "projected yearly improvement in operating profit" },
  ],
  timeline: [
    { label: "2024 · Launch", text: "Klarna deploys an OpenAI-powered assistant on its customer service channel." },
    { label: "First 30 days", text: "The assistant absorbs a workload equal to about 700 full-time agents." },
    { label: "Measured results", text: "Average resolution drops from 11 minutes with human agents to about 2. Repeat inquiries fall by a quarter, a sign that more problems are solved on first contact." },
    { label: "The split", text: "Support divides in two: the assistant takes high-frequency transactional questions; humans keep complex disputes and fraud escalations." },
    { label: "The projection", text: "The deployment is expected to add about $40 million a year to operating profit. That is a forecast, not a measured saving." },
  ],
  lessons: [
    "The gains came from frequent, well-defined transactions. That is where to look first in your own workflow.",
    "Speed is not quality. Falling repeat inquiries is the signal that requests are really resolved.",
    "The workforce was not removed: the design kept humans on disputes and fraud. Plan the hand-off on day one.",
    "Read headline money carefully. A projected profit figure is a hypothesis to test, the same way your own first cost estimate is.",
    "Compare like with like: the 11-minute human baseline is what makes the 2-minute figure meaningful. Your estimate needs a baseline too.",
  ],
  question: {
    prompt:
      "Which Klarna figure best shows that the assistant actually solved customers’ problems, rather than just closing chats quickly?",
    options: [
      { id: "a", text: "The workload of about 700 full-time agents" },
      { id: "b", text: "Average resolution time down from 11 to 2 minutes" },
      { id: "c", text: "Repeat inquiries down by 25%" },
      { id: "d", text: "The projected $40 million profit improvement" },
    ],
    correct: "c",
    hints: {
      a: "Volume shows capacity. A bot can close many chats without solving them.",
      b: "Speed matters, but a fast wrong answer brings the customer straight back.",
      d: "That is a financial projection, and it says nothing direct about whether each request was resolved.",
    },
    explanation:
      "Yes. If customers stop coming back with the same issue, the first answer worked. Repeat inquiries are the quality signal behind the speed and volume headlines.",
  },
  sources: [
    "Marr, B. (2024, January 26). How generative AI is revolutionizing customer service. Forbes.",
    "Tordjman, K. L., MacDonald, D., Gerrard, P., et al. (2025, January 13). How AI agents are opening the golden era of customer experience. BCG.",
    "MIT Applied Agentic AI, Module 1: live sessions and office hours (Klarna 2024 production benchmarks).",
  ],
  bubble: "A real rollout, real numbers. Let's read them closely.",
};

const lab: LessonContent["lab"] = {
  kicker: "Lab · The cost router",
  title: "Route prompts between a small and a frontier model, then price the workflow",
  goal:
    "Measure a real request, write a small router that sends each step of a workflow to a small or a frontier model, price the month both ways, then add a tiny loop that escalates when the small model is unsure.",
  duration: "40 minutes",
  prerequisites: [
    "Python 3.10 or later",
    "Any chat assistant",
    "A tokenizer (for example OpenAI’s Tokenizer)",
    "No API key needed",
  ],
  steps: [
    {
      title: "Measure one real transaction",
      body: [
        "Ask a chat assistant a question a client of yours would typically ask, or use the course example below. Paste the question into a tokenizer and note the token count, then do the same with the answer.",
        "For reference, the course measured about 25 input tokens and 379 output tokens for this question.",
      ],
      code: {
        lang: "prompt",
        text: "What is the process I need to go through to rent a car: prerequisites? documents to present? information to have on hand?",
      },
    },
    {
      title: "Write the router",
      body: [
        "Save this as cost_router.py. It runs offline: token counts are estimated from text length, and the prices are the course’s figures for GPT-4o mini and GPT-4.5 (dollars per million tokens, input then output). Replace them with today’s list prices and fill in the date.",
        "The route function is the Reason step: short, routine prompts go to the small model, anything that asks to compare, explain or plan goes to the frontier.",
      ],
      code: {
        lang: "python",
        text: `# cost_router.py: send each prompt to a small or a frontier model, then price the workflow.
# Runs offline: no API key needed, tokens are estimated from text length.

# $ per 1M tokens (input, output). Course figures for GPT-4o mini and GPT-4.5.
# Replace them with today's list prices and write down the date you read them.
PRICES = {"small": (0.15, 0.60), "frontier": (75.00, 150.00)}
PRICES_READ_ON = "YYYY-MM-DD"
TOOL_TAX = 0      # extra input tokens per call for tool definitions (try 2_000)
VOLUME = 1        # multiplier on monthly calls (try 100)

def tokens(text: str) -> int:
    """Rough estimate: about 4 characters per token. Use a real tokenizer for the deliverable."""
    return max(1, len(text) // 4)

def cost(tier: str, t_in: int, t_out: int) -> float:
    p_in, p_out = PRICES[tier]
    return ((t_in + TOOL_TAX) * p_in + t_out * p_out) / 1_000_000

HARD = ("why", "compare", "plan", "should we", "explain")

def route(prompt: str) -> str:
    """Reason: short, routine requests go to the small model; the rest to the frontier."""
    p = prompt.lower()
    return "frontier" if len(p) > 400 or any(w in p for w in HARD) else "small"

# Your workflow: (step, typical prompt, calls per month, expected output tokens)
WORKFLOW = [
    ("classify ticket", "Classify this ticket: billing, delivery or returns? 'I was charged twice.'", 10_000, 10),
    ("order status", "Where is my order 4417? It was due on Monday.", 6_000, 80),
    ("return policy", "What do I need to return a pair of shoes bought 20 days ago?", 3_000, 380),
    ("dispute", "Compare these two invoices and explain why the customer was billed twice: ...", 1_000, 600),
]

def report(force: str | None = None) -> float:
    total = 0.0
    for step, prompt, calls, out in WORKFLOW:
        tier = force or route(prompt)
        monthly = calls * VOLUME * cost(tier, tokens(prompt), out)
        total += monthly
        print(f"  {step:16} {tier:9} \${monthly:>12,.2f}")
    print(f"  {'TOTAL':26} \${total:>12,.2f}\\n")
    return total

print(f"Prices read on {PRICES_READ_ON}\\n\\nFrontier for everything:")
everything = report(force="frontier")
print("Routed:")
routed = report()
print(f"Routing saves {1 - routed / everything:.0%} of the bill.")`,
      },
    },
    {
      title: "Run it and read the two totals",
      body: [
        "With the course prices, the frontier-only month comes to about $371 and the routed month to about $92: the one step that really needs the big model (the dispute) now makes up almost the whole bill.",
      ],
      code: { lang: "shell", text: "python cost_router.py" },
    },
    {
      title: "Put your own workflow in",
      body: [
        "Replace the four WORKFLOW rows with three to five steps of a workflow from your organisation: a realistic prompt, a monthly volume and an expected answer length (use your measurement from step 1 for one of them). Adjust the HARD keywords if your hard cases look different.",
      ],
    },
    {
      title: "Play the Assignment 1.1 scenarios",
      body: [
        "Change one parameter at a time, rerun, and note the totals:",
        "1. VOLUME = 100, a hundred times the sample traffic (about two million calls a month). 2. TOOL_TAX = 2_000, as if the agent carried ten tool definitions on every call. 3. Double the output tokens of every step, for long answers. Which change moved the bill most: model choice, volume, tools or answer length?",
      ],
    },
    {
      title: "Add a tiny loop",
      body: [
        "Append this to the file. The fake call stands in for a real API: the small model replies UNSURE to anything about double charges. The loop routes (Perceive, Reason), calls (Act), checks the reply (Reflect), escalates once, and hands over to a person when it runs out of steps.",
      ],
      code: {
        lang: "python",
        text: `# --- A tiny Perceive -> Reason -> Act -> Reflect loop ---------------------------
def fake_call(tier: str, prompt: str) -> str:
    """Act: stand-in for a model API call. The small model gives up on double charges."""
    if tier == "small" and "charged twice" in prompt.lower():
        return "UNSURE"
    return f"<{tier} answer>"

def run(prompt: str, max_steps: int = 2) -> tuple[str, str]:
    tier = route(prompt)                       # Perceive the request, Reason about the tier
    for _ in range(max_steps):
        reply = fake_call(tier, prompt)        # Act
        if reply != "UNSURE":                  # Reflect: accept only a checked reply
            return tier, reply
        tier = "frontier"                      # escalate and go round again
    return "human", "Step limit reached: hand over to a person."

print("\\nLoop trace:")
for step, prompt, _, _ in WORKFLOW:
    print(f"  {step:16} ->", *run(prompt))`,
      },
    },
    {
      title: "Read the trace",
      body: [
        "With the sample workflow, “classify ticket” was routed to the small model but ends on the frontier: the Reflect check caught a reply it could not trust. Your routed total from step 3 did not include that escalation. Estimate what share of that step escalates in real life and add it to your figure.",
        "In a real agent, the Reflect check would be a deterministic validation (a schema, allowed values) rather than a magic word, exactly as the hallucination paradox section recommends.",
      ],
    },
    {
      title: "Go further (optional)",
      body: [
        "Replace fake_call with a real call to a small and a frontier model from your provider, read the token counts returned by the API instead of estimating them, and check the cost in the provider’s usage page, as Dr. Sanchez does in Video 1.3.",
      ],
    },
  ],
  checklist: [
    "I measured the input and output tokens of one real transaction separately",
    "My prices are current and carry the date I read them",
    "The router runs on a workflow of my own, and I compared frontier-only with routed totals",
    "I ran at least one scenario that changes volume, tool tax or answer length",
    "The loop trace shows at least one escalation, and I priced it",
  ],
  bubble: "Plug in your prompts. The router does the sorting, the meter does the maths.",
};

const deliverable: LessonContent["deliverable"] = {
  kicker: "Deliverable · Candidate workflow card",
  title: "Pick your candidate workflow and give it a first price",
  purpose:
    "Choose one real workflow from your own organisation that you will carry through all eight modules, and give it a first, honest cost estimate. Section 6 doubles as your Assignment 1.1 write-up; the whole card later feeds the cost analysis (CapEx, OpEx, staffing) of the capstone adoption plan in module 8.",
  fileName: "candidate-workflow-card.md",
  template: `# Candidate workflow card

Author:
Date:
Prices read on (date):

## 1. The workflow
- Name of the workflow (specific, e.g. "answering delivery-delay emails", not "customer service"):
- Team and role who do it today:
- How often (per day, week or month):
- Average time per occurrence:
- Main pain (delay, errors, cost, repetitive work):
- A good outcome, in one sentence:
- Today's human baseline (time, cost or quality you will compare against):

## 2. Chatbot, RAG or agent?
| Need | Yes / No | Notes |
|---|---|---|
| Only answers questions | | |
| Searches our documents | | |
| Acts in another system (writes, sends, books, updates) | | |
| Needs several steps with checks in between | | |

Verdict (chatbot / RAG / agent) and why:

## 3. The loop at a glance
- Perceive (inputs: text, voice, documents, images; real time or batch):
- Reason (decisions it makes):
- Act (tools or systems it reads or writes):
- Reflect (what is checked before an action, ideally in code):
- Cases that always go to a person, and who takes over:
- Voice or personal data involved? Consent and retention note:

## 4. One measured transaction
- Sample question (typical of the workflow):
- Input tokens:
- Output tokens:
- Tokenizer used:

## 5. Cost at scale
| Model / platform | $ per 1M input | $ per 1M output | Calls per month | Monthly cost |
|---|---|---|---|---|
| Small model | | | | |
| Frontier model | | | | |
| Routed mix (from the lab) | | | | |

Scenarios tried (change one thing at a time):
| Scenario | What changed | Monthly cost |
|---|---|---|
| Today's volume | | |
| 1,000,000 calls a month, or peak load | | |
| Short questions / long answers | | |
| With tool tax or conversation history | | |

Costs not on the calculator (rough guess is fine for now):
- Infrastructure (vector store, gateway, monitoring):
- Evaluation runs:
- People (engineering, prompt upkeep, reviewers, training):

## 6. Cost evaluation write-up (150 to 300 words)
- The use case and why you chose it:
- The parameters you varied (input length, output length, model, platform, volume):
- What happened to the cost across scenarios:
- What you still need to know before deciding:
`,
  checklist: [
    "The workflow is real, specific and owned by a named team",
    "Input and output tokens are measured and priced at separate rates",
    "At least one scenario changes volume, length or model, and the totals are compared",
    "Prices carry the date they were read",
    "At least one case is reserved for people and a human baseline is noted",
    "The write-up names what I still need to know before deciding",
  ],
  bubble: "Keep this card close. It travels with you all the way to the capstone.",
};

export const MODULE_1: LessonContent = { history, reading, postMortem, lab, deliverable };
