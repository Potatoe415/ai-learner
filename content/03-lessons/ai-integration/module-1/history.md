---
kind: reading
based_on: content/01-extracted/02_Modules/Module_1_Complete.md, content/01-extracted/02_Modules/Module_1_Complements.md
based_on_hash: d519e1e257a1
kicker: History · From Turing to LangChain
title: From “Can machines think?” to agents that act
bubble: Before we build agents, a short trip back to 1950.
---
Agents did not appear out of nowhere. They sit on seventy years of ideas, each one solving a limit of the last: a question asked in 1950, a name given in 1956, a first chatbot in 1966, then machines that beat world champions, learned to see, learned to create, and finally learned to talk to anyone. Knowing that path helps you tell what is genuinely new about agents, and what is not.

## 1950: a question that started a field

The story usually starts with Alan Turing, the British mathematician often called the father of computer science. In 1950 he asked a simple question: can machines think?

To make it testable, he proposed what became the Turing test: if a person holding a conversation cannot tell the machine from a human, the machine shows human-like intelligence. Modern variations of the test are still used in AI research and development today.

Turing was also strikingly confident. In his view, early machines were only a foretaste of what was coming, and he saw no reason why machines should not, in time, enter every field of human intellect and compete on equal terms.

## The milestones, at a glance

From that question to today’s agents, a handful of dates mark the turns. Read the table as a relay: each step hands something to the next.

| Year | Milestone | Why it matters |
|---|---|---|
| 1950 | Alan Turing asks “Can machines think?” and proposes the Turing test | Gives the field its question and a first way to measure progress |
| 1956 | John McCarthy coins the term “artificial intelligence” for the Dartmouth Summer Research Project | AI becomes a named research field |
| 1966 | MIT professor Joseph Weizenbaum creates ELIZA, which simulates a psychotherapist | The first chatbot: keyword rules and scripted replies |
| 1997 | IBM’s Deep Blue beats world chess champion Garry Kasparov | A machine outplays the best human at a game of strategy |
| 2012 | AlexNet wins the ImageNet image-classification challenge (ILSVRC) | Proves that deep learning is the way forward |
| 2014 | Ian Goodfellow and colleagues at the University of Montreal develop the GAN | Machines start to generate realistic new content |
| 2016 | DeepMind’s AlphaGo defeats Go world champion Lee Sedol | Shows what reinforcement learning and deep neural networks can master |
| 2017 | Google researchers publish the transformer in “Attention Is All You Need” | Self-attention makes large-scale language modelling practical |
| 2018 to today | OpenAI’s GPT models open the era of large language models | Each version adds capability, up to multimodal and real-time interaction |
| 2022 | ChatGPT 3.5 launches | Millions of people use advanced AI in a browser, in plain language, with no specialist skills |
| 2023 | LangChain is released as an open-source framework for LLM applications | Building chatbots and AI agents becomes easier for enterprises and enthusiasts alike |

## Three threads that meet in today’s agents

Look at the table again and three threads appear. Together they explain why agents became possible only recently.

- Learning from data. AlexNet (2012) and AlphaGo (2016) showed what deep neural networks and reinforcement learning can master when they learn from data. That is what makes today’s models adaptable.
- Creating, not only recognising. Classic machine learning spots a cat in a picture. With GANs (2014) and then transformers (2017), machines started producing new text and images. The transformer is the engine you will open up in the Concept unit.
- Access. Before ChatGPT, using an AI model often required specialist knowledge. In 2022 a browser and plain words were enough, and in 2023 frameworks such as LangChain made agent building easier for ordinary teams.

:::callout Why it matters for your project
Turing himself said we need some experience with the machine before we really know its capabilities. That is the spirit of this trail: try agents on one real workflow, measure, then scale.
:::

## Chatbots: four generations in sixty years

The chatbot thread runs through the whole story. Each generation fixed the main limit of the one before, and the latest one sets the stage for agents.

| Generation | How it works | Examples | Main limit |
|---|---|---|---|
| Rule-based bots (from 1966) | Spot keywords, return scripted replies from a menu | ELIZA (Joseph Weizenbaum, MIT), FAQ bots | Lost as soon as the user leaves the script |
| Conversational agents (early 2010s) | Machine learning understands natural language better and learns from examples | IBM Watson, Siri, Alexa | Narrow skills, little reasoning |
| Generative chatbots (late 2010s on) | Transformer LLMs write free, personalised answers | ChatGPT, Claude, Gemini | They answer; they do not act |
| Reasoning models (latest) | Spend extra time breaking a problem into steps before replying | OpenAI o3 and o4 | Slower, costlier, and can still hallucinate |

## What comes next: from generating to acting

Generative AI’s journey, from rule-based experiments to transformer-powered models, taught machines to learn patterns, create content and hold a conversation almost as fluently as people.

Agentic AI builds on those foundations and adds autonomy: systems that do not just generate an output but set goals, make decisions and act on them with minimal guidance. That is the subject of the rest of this module, and of the whole trail.

:::takeaways
- 1950: Turing asks whether machines can think. 1956: McCarthy names the field “artificial intelligence”.
- ELIZA (1966) was the first chatbot. Chatbots then moved from rules to machine learning, to generative models, to reasoning models.
- Deep learning (AlexNet, 2012), generation (GAN, 2014) and the transformer (2017) are the technical roots of today’s LLMs.
- ChatGPT 3.5 (2022) made AI usable by anyone; LangChain (2023) made building agents easier.
- Agents add one thing to that history: the autonomy to set goals, decide and act.
:::

:::check
Which milestone introduced self-attention, the mechanism behind large-scale language models such as GPT?

- [ ] a. AlexNet winning the ImageNet challenge (2012)
- [x] b. The transformer, in “Attention Is All You Need” (2017)
- [ ] c. IBM’s Deep Blue beating Garry Kasparov (1997)
- [ ] d. ELIZA, Joseph Weizenbaum’s chatbot (1966)

### Hint a

AlexNet proved deep learning works, but for classifying images. Self-attention for language came five years later.

### Hint c

Deep Blue was a chess supercomputer. It had nothing to do with language models.

### Hint d

ELIZA matched keywords to scripted replies. It had no learning and no attention mechanism at all.

### Explanation

Right: Google researchers introduced the transformer in 2017. Its self-attention lets the model weigh every part of the input against every other part, which revolutionised large-scale language modelling and paved the way for the GPT models from 2018 on.
:::
