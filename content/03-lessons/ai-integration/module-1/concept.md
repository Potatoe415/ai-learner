---
kind: reading
based_on: content/01-extracted/02_Modules/Module_1_Complete.md, content/01-extracted/02_Modules/Module_1_Complements.md
based_on_hash: d519e1e257a1
kicker: Concept · From chatbot to agent, and what it costs
title: A chatbot answers. An agent gets things done, and sends a bill.
bubble: Hi, I'm Loop. Let's open the hood, then read the meter.
---
You have seen how we got here. Since ChatGPT 3.5 arrived in 2022, anyone can talk to a language model in plain words. The agentic wave goes further: a goal, a plan, tools, and a habit of checking its own work. This reading walks you from the model under the hood to the loop that turns it into an agent, then to the meter that runs every time it thinks. It is a long one, so take it section by section.

## What changes with an agent

A chatbot waits for your prompt and replies. Agentic AI pursues a goal: it acts on its own initiative, adapts to the context and carries out multistep work with little human intervention.

MIT’s Dr. Abel Sanchez offers a down-to-earth definition: an AI agent is a workflow made of tasks, some of which may involve people. Keep that one in mind, because every deliverable in this trail treats your agent as a workflow first and a model second.

- Typical use cases: automating customer experiences, creating and posting campaign content, proactive sales intelligence (next step, upsell), security systems that monitor and act, supply-chain planning.
- Customer service already shows the payoff: companies there report average productivity gains of 15% to 30% from generative AI.
- Octopus Energy (UK) put a ChatGPT-based assistant on its customer channel: it handles 44% of inquiries, the work of about 250 people, with 80% satisfaction against 77% for human agents. Klarna, the case study of this module, shows the same pattern at a larger scale.
- Amarra, a New Jersey gown distributor, used generative AI from 2020 for product descriptions (60% less writing time), inventory (40% less overstock) and a chatbot taking 70% of inquiries. Its lesson: the first bot sounded robotic, and tone had to be adapted country by country.

| | Generative chatbot | Retrieval-augmented (RAG) | Agentic system |
|---|---|---|---|
| Control | One prompt, one reply | Query → search a vector index → inject context → reply | Goal → plan → act → observe → iterate |
| Memory | None beyond the current exchange | Session history | Short-term scratchpad plus long-term store |
| Tools | None, text only | Read-only search | Reads and writes external APIs and databases |
| When it fails | The user retries | Makes things up or returns nothing | Retries or corrects itself |

## Under the hood: what a language model does

Classic machine learning was predictive: train on thousands of cat pictures and the model learns to spot cats. Generative AI goes further and produces a new cat picture, or a description of one, on request.

The engine is a neural network, layers of connected nodes loosely inspired by the brain. Stack many layers and you get deep learning, which handles unstructured data such as text and images. ChatGPT runs on a network with hundreds of billions of parameters.

A large language model (LLM) is a deep network trained to predict the next piece of text. Words become vectors (lists of numbers that capture meaning). The transformer architecture, introduced by Google researchers in 2017 in “Attention Is All You Need”, uses self-attention: every token is weighed against every other token at once, which keeps context over long passages and lets training run in parallel. The output is probabilistic, so the same question can get different answers.

A model is built in three stages:

- Pre-training: it reads books, articles and code and adjusts its weights (the strengths of connections between neurons) until it predicts language well.
- Fine-tuning: further training on a specialised set, such as support transcripts, to adopt a domain’s vocabulary and tone.
- Reinforcement learning from human ratings: reviewers score answers for relevance, accuracy and style, and the scores steer the model.

:::callout Prompting is a lever
“Write about why sustainability matters to us” gets you a generic essay. “Draft a one-paragraph executive summary of how our new solar-powered warehouse cuts energy use” gets you something usable. A prompt is a brief: be specific about content, tone and format.
:::

## The loop: Perceive, Reason, Act, Reflect, and the reasoning trap

What turns a stateless text generator into an agent is a goal-directed loop. Perceive: take in the goal and whatever comes back from the world (a message, a document, a tool result). Reason: decide the next step. Act: call a tool or reply. Reflect: compare the result with the goal and decide whether to go round again. This cycle is often implemented with the ReAct pattern (reason, then act, then observe).

In Video 1.2, Dr. John Williams shows the idea with nothing but a chat window. He asks GPT to plan a short story about Tim the flying dog as a JSON list of tool calls (planner, writer, critic, then writer again), each step passing its output to the next. Then he tells it to play every role. The critic finds the introduction too long, and the final draft fixes it. Swap each role for a real tool or a separate model call and you have an agent.

Every loop also needs a way out: a step limit and a hand-off to a person. An agent that cannot finish should stop and escalate, not spin. You will build a tiny one in the lab.

The Reason stage is where reasoning models shine. They use chain-of-thought: they write intermediate steps before concluding, a bit like a chef following a recipe. Asked to choose between market A and market B, such a model looks at size, competition and regulation one by one before answering. They do clearly better on science, code and maths.

They also cost more and take longer, and they still hallucinate, that is, produce claims with no basis in their training. OpenAI’s own system card for o3 and o4-mini found o4-mini more likely to hallucinate than earlier models on two separate measures.

MIT instructors call this the hallucination paradox: a tidy, well-argued chain of reasoning is more persuasive, so people and downstream code are more likely to accept a step that was quietly invented.

:::callout Reflect in code, not in prose
Never let a model’s reasoning trigger an action that changes something without a deterministic check first (schema validation, allowed values, amounts). Route actions whose financial, legal or physical consequences exceed your risk tolerance to a human.
:::

## Model types: three engines behind generative media

Three families power most generative media, and real products often combine them. Image tools such as DALL·E 3 or Midjourney, for example, use a transformer to understand the prompt and a diffusion model to paint the picture.

| Family | Idea | Good at | Limit or note |
|---|---|---|---|
| GAN (2014) | A generator fakes data, a discriminator tries to catch it; both improve | Speed, realism (editing, upscaling, deepfakes) | Mode collapse: output variety narrows to a few safe results |
| Diffusion | Start from pure noise and refine it step by step towards the prompt | Diversity, stable training | Odd details, like a hand with seven fingers, when global coherence slips |
| Transformer | Self-attention relates every part of the input to every other part | Coherence, control, scales in parallel | Replaced recurrent networks (RNN, LSTM), which lost the thread on long inputs |

## Perceive in production: a pipeline, not one big model

Marketing often shows multimodal AI as one network that swallows every format. In production it is usually a chain of specialised parts: automatic speech recognition (ASR) turns speech into text, natural language understanding (NLU) works out intent, text-to-speech (TTS) speaks the answer, and voice biometrics, an emerging capability, recognises the speaker. Treat each boundary as a microservice where failures can be isolated.

Audio costs depend on real-time versus batch (a car’s lane guidance needs under a second, a meeting summary can wait hours, and real time costs more), language coverage (major languages are well served, rarer ones need extra training) and customisation (a fully on-brand voice can take thousands of hours of training).

| Sector | Typical chain |
|---|---|
| Health care | Audio → Whisper ASR → remove personal identifiers (HIPAA) → clinical LLM → structured record |
| Retail, contact centre | Customer voice → low-latency streaming ASR → intent and sentiment → CRM tool call → neural TTS |
| Automotive | On-device ASR (no cloud delay) → vehicle controller → cloud LLM only when needed |
| Education | Student speech → phoneme analysis → multilingual TTS → rubric-based feedback |

:::callout Compliance trap
Voice is not just text with sound. Under GDPR Article 9, Illinois’ BIPA and California’s CCPA/CPRA, a voiceprint used to identify or profile someone is biometric data and needs explicit consent. Two-party-consent jurisdictions (California, Massachusetts, Germany) require a clear audio disclosure before recording or streaming to a third-party API. Add HIPAA in US health care and Brazil’s Lei Geral de Proteção de Dados, and plan consent prompts, retention limits, opt-in biometrics and data-processing contracts from day one.
:::

## The token meter

Three things make up the bill: the equipment (GPU servers, rented or owned, and built into every hosted model’s price), the model and its tokens, and energy (big AI companies are even looking at nuclear power to keep it affordable).

Tokens are the unit of account: chunks of three to four characters, about 0.75 of a word. You pay for input (what you send) and output (what comes back), at different rates. Output is typically three to four times dearer, so never price everything at one rate.

Worked example: a 500-token prompt and a 1,000-token reply, at $0.03 per 1,000 input tokens and $0.06 per 1,000 output tokens, cost about $0.075. Run it 10,000 times a day and you are at $750 a day, $22,500 a month, possibly for a task a far cheaper model could do.

The spread between models is huge. The course quotes GPT-4.5 at $150 per million output tokens against $0.60 for GPT-4o mini, a factor of 250, and some pairs differ by 500 times. In Assignment 1.1, the same 25-token question with a 379-token answer, run 10,000 times, cost anywhere from $1.15 to $229.65 depending on the model.

:::callout Prices move
The figures above are the course’s snapshot. List prices change often: always read today’s prices on the provider’s page and write the date next to them.
:::

## The minivan problem and model tiering

A premium minivan is perfect for taking your own kids to school. To take every child in town, buying hundreds of them would be absurd: you would use buses, bike convoys, walking groups. At scale the best answer is rarely the most advanced machine. Running a frontier model for basic extraction or routing is buying a 15-passenger minivan to fetch a carton of milk.

There is no best model, only trade-offs: accuracy against cost (a diagnosis assistant may need the top tier, a support bot rarely does), speed against power (bigger models answer slower; a customer-facing agent that takes 15 seconds fails however accurate it is) and context length against efficiency (long context is not always more expensive).

The practical answer is a router. For every step, set the minimum accuracy and context it needs, then send it to the cheapest tier that clears the bar.

- Five questions before you pick: What minimum accuracy do we need? How often will it run? Can caching or a cheaper model handle part of it? Does it need to be real time? Does it need long context?

| Tier | Models (course examples) | Job | Typical share |
|---|---|---|---|
| 1 · Router | Small models: GPT-4o mini, Claude 3.5 Haiku, Gemini 1.5 Flash | Intent recognition, format checks, simple requests, under 200 ms | ≈ 80% |
| 2 · Specialist | Fine-tuned model or retrieval pipeline | Domain work: SQL, policy lookup | ≈ 15% |
| 3 · Escalation | Frontier reasoning: OpenAI o1/o3, Claude Opus | Ambiguous, multi-variable or conflicting cases flagged below | ≈ 5% |

## The costs that are not on the calculator

Instructors warn that agent budgets often overrun by 200% to 500% because the token calculator only shows the visible part.

- Context bloat: each turn re-sends the history, so a long conversation’s token count grows roughly with the square of its length. Prune, summarise or use a sliding window.
- Tool definition tax: every tool’s schema sits in the prompt. Ten tools can add 1,500 to 3,500 input tokens to every step, used or not.
- Prompt caching: put the fixed parts (system prompt, tool schemas, examples) first and unchanged, and provider caching can cut input cost by 50% to 80%.
- Evaluations: a nightly suite of 500 cases × 5 agent steps can burn more tokens than early production traffic.
- Infrastructure: vector databases, API gateways, tracing and monitoring platforms.
- People: engineering hours, prompt maintenance, red-teaming, human reviewers, retraining staff. Technology is only about 20% of adoption; change management and approvals are the other 80%.

| | Commercial API | Open source, self-hosted | Custom fine-tuned |
|---|---|---|---|
| Upfront | Minimal ($0 to $5K) | $20K to $50K for MLOps set-up | $50K to $250K for data and training |
| Running | Fully variable, pay per token | High fixed cost: reserved GPUs | Dedicated hosting and endpoints |
| Data privacy | Depends on the contract | Stays in your network | Depends on where it runs |
| Maintenance | None | High: clusters, drivers, autoscaling | Very high: retraining, drift monitoring |
| Best for | Prototypes, low to medium traffic | High volume, strict compliance | Proprietary domain logic or signature style |

:::takeaways
- An LLM predicts the next token. An agent wraps it in a Perceive → Reason → Act → Reflect loop with tools, memory, a step limit and a human exit.
- Persuasive reasoning is not proof: validate actions in code and send high-stakes ones to people.
- Multimodal systems are pipelines of specialised models, and voice carries legal duties text does not.
- Cost = input tokens × input rate + output tokens × output rate, times volume. Keep the two rates apart.
- Route each step to the cheapest model that clears its bar, and budget for history, tools, evals, infrastructure and people.
:::

:::check
Each call sends 500 input tokens and gets 1,000 output tokens back. Prices: $0.03 per 1,000 input tokens, $0.06 per 1,000 output tokens. Volume: 10,000 calls a day. What is the bill for a 30-day month?

- [ ] a. $13,500
- [x] b. $22,500
- [ ] c. $27,000
- [ ] d. $750

### Hint a

You priced all 1,500 tokens at the input rate. Output tokens cost twice as much here.

### Hint c

You priced all 1,500 tokens at the output rate. The 500 input tokens are cheaper.

### Hint d

That is one day. Multiply by 30.

### Explanation

Right: 0.5 × $0.03 + 1 × $0.06 = $0.075 per call, × 10,000 = $750 a day, × 30 = $22,500 a month. Using a single rate for everything is the first mistake instructors see in Assignment 1.1.
:::
