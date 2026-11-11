import type { LessonContent } from "../lessons";

// Module 2 · The token meter. Source: MIT module 1 (sections 3 and 5, assignment 1.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_2: LessonContent = {
  reading: {
    kicker: "Concept · What an agent really costs",
    title: "You don't need a minivan to buy milk",
    intro:
      "A premium minivan is a great way to take your own kids to school. To take every child in town, you would buy buses. AI works the same way: the best model for one demo is rarely the right one at ten thousand requests a day.",
    sections: [
      {
        heading: "Three things you pay for",
        body: ["Whether you rent a model through an API or run it yourself, the bill comes from the same places."],
        bullets: [
          "Equipment: GPU servers. If you use a hosted model, their cost is built into the price per token.",
          "The model and its tokens: you pay for what you send (input) and what you get back (output), usually at different rates. Model choice is the biggest lever on usage cost.",
          "Energy: every request draws power. At scale it becomes a budget line and an environmental one.",
        ],
      },
      {
        heading: "Do the maths, input and output separately",
        body: [
          "A token is about four characters, or three quarters of a word. Output tokens typically cost three to five times more than input tokens, so never price everything at one rate.",
          "Example: a 500-token prompt, a 1,000-token answer, $0.03 per 1,000 input tokens and $0.06 per 1,000 output tokens. One call costs 0.5 × 0.03 + 1 × 0.06 = $0.075. Harmless. At 10,000 calls a day, that is $750 a day, about $22,500 a month.",
          "List prices vary enormously. In early 2025 one frontier model charged around $150 per million output tokens while a small model from the same provider charged $0.60: a factor of 250 for tasks where both may be good enough.",
        ],
        callout: {
          label: "Prices move",
          text: "Model prices change every few months. Always take current numbers from the provider's price page and write the date next to them.",
        },
      },
      {
        heading: "Trade-offs, not a ranking",
        body: ["There is no best model, only the cheapest one that meets your bar on the dimensions that matter for this task."],
        table: {
          head: ["Trade-off", "Lean to the bigger model when…", "Lean to the smaller model when…"],
          rows: [
            ["Accuracy vs cost", "An error is expensive (medical, legal, money)", "An error is cheap and easy to catch"],
            ["Speed vs power", "The user can wait (overnight report)", "The user is waiting (chat, voice, in-car)"],
            ["Context vs efficiency", "The task needs a long document in one go", "Short prompts do the job"],
          ],
        },
        callout: {
          label: "Field note",
          text: "Latency adds up across hand-offs. A customer-facing agent that takes 15 seconds to answer will fail, however accurate it is.",
        },
      },
      {
        heading: "Route by difficulty",
        body: [
          "The answer to the minivan problem is a router. For each step of a workflow, set the minimum accuracy and context it needs, then send it to the cheapest tier that clears the bar.",
        ],
        table: {
          head: ["Tier", "Model", "Job", "Share of traffic (typical)"],
          rows: [
            ["1 · Router", "Small, fast model", "Classify intent, validate format, handle simple requests", "≈ 80 %"],
            ["2 · Specialist", "Fine-tuned model or retrieval pipeline", "Domain tasks: policy lookup, SQL, extraction", "≈ 15 %"],
            ["3 · Escalation", "Frontier reasoning model", "Ambiguous, multi-step or conflicting cases flagged by tiers 1 and 2", "≈ 5 %"],
          ],
        },
      },
      {
        heading: "The costs that are not on the calculator",
        body: [
          "Token calculators show a fraction of the real bill. Budgets for agents commonly overrun by several times because of these lines:",
        ],
        bullets: [
          "Growing history: each turn re-sends the whole conversation, so total tokens grow roughly with the square of the number of turns. Trim, summarise or use a sliding window.",
          "Tool tax: every tool definition sits in the prompt on every call. Ten tools can add a few thousand input tokens per step, used or not.",
          "Caching: putting the fixed parts (system prompt, tool schemas, examples) first and unchanged lets providers cache them, often cutting input cost by half or more.",
          "Evaluations: nightly test runs on hundreds of cases can burn more tokens than early production traffic.",
          "Infrastructure: vector database, gateway, tracing and monitoring tools.",
          "People: engineering time, prompt maintenance, red-teaming, reviewers in the loop, training staff.",
        ],
      },
      {
        heading: "Buy, host or fine-tune?",
        body: ["The same choice applies to text, image and audio models. Start with the left column and move right only for a reason."],
        table: {
          head: ["", "Commercial API", "Open-source, self-hosted", "Custom fine-tuned"],
          rows: [
            ["Upfront cost", "Near zero", "Medium: platform and ops set-up", "High: data curation and training"],
            ["Running cost", "Pay per token", "Mostly fixed: reserved GPUs", "Hosting plus regular retraining"],
            ["Data control", "Depends on the contract", "Full: stays in your network", "Depends on where it runs"],
            ["Maintenance", "None", "High: clusters, drivers, scaling", "Very high: drift, retraining"],
            ["Best for", "Prototypes, low to medium volume", "High volume, strict data rules", "A proprietary domain or signature style"],
          ],
        },
      },
    ],
    takeaways: [
      "Cost = input tokens × input rate + output tokens × output rate, times volume. Keep the two rates apart.",
      "Pick the cheapest model that clears the bar, step by step, and route the rest upwards.",
      "History, tool definitions, evaluations, infrastructure and people are part of the price.",
    ],
    check: {
      prompt:
        "500 input tokens and 1,000 output tokens per call, $0.03 per 1,000 input and $0.06 per 1,000 output, 10,000 calls a day. What is the monthly bill (30 days)?",
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
        d: "That is the daily bill. Multiply by 30.",
      },
      explanation:
        "Right: (0.5 × $0.03 + 1 × $0.06) = $0.075 per call, × 10,000 = $750 a day, × 30 = $22,500 a month. Keeping input and output apart is the first rule of AI budgeting.",
    },
    bubble: "Every token has a price tag. Let's read it.",
  },

  postMortem: {
    kicker: "Post-mortem · Octopus Energy, 2023",
    title: "Cheaper and better liked, on the right requests",
    context:
      "The UK energy supplier Octopus Energy built generative AI into its customer email channel in 2023. AI-drafted replies took on a large share of routine requests such as meter readings, bills and payment questions.",
    numbers: [
      { value: "44 %", label: "of customer emails handled with AI" },
      { value: "≈ 250", label: "people's worth of work" },
      { value: "80 %", label: "customer satisfaction on AI-drafted replies, above the human benchmark" },
    ],
    timeline: [
      { label: "Pick the traffic", text: "The company starts with high-volume, low-risk requests where the answer depends on account data, not judgement." },
      { label: "Ship it", text: "AI drafts replies grounded in the customer's account. Staff stay in the loop on the process." },
      { label: "Measure", text: "The CEO reports that AI-drafted emails score higher satisfaction than those written by trained staff." },
      { label: "Read it right", text: "Customers with a routine problem value a fast, accurate answer more than a warm but slow one. That is a statement about this traffic, not about every request." },
    ],
    lessons: [
      "Unit economics come from choosing the right traffic first, not from the most powerful model.",
      "A cheaper channel can also be a better one, if quality is measured and compared with the human baseline.",
      "Keep people on the cases where judgement, empathy or exceptions matter.",
      "Report the comparison with the same metric for both channels, or it proves nothing.",
    ],
    question: {
      prompt: "You run a similar service. Which requests should go to the AI channel first?",
      options: [
        { id: "a", text: "Complaints from vulnerable customers" },
        { id: "b", text: "Billing disputes that need an exception" },
        { id: "c", text: "Frequent requests answered from account data, such as meter readings" },
        { id: "d", text: "All requests at once, to maximise savings" },
      ],
      correct: "c",
      hints: {
        a: "These need judgement and care, and a mistake costs a lot. Keep people in front.",
        b: "Exceptions are judgement calls. Start where the answer follows from the data.",
        d: "Big bang roll-outs hide which traffic works. Start narrow, measure, widen.",
      },
      explanation:
        "Yes. Frequent, data-driven requests give the most volume for the least risk, and their quality is easy to measure. That is where the cost curve bends first.",
    },
    sources: [
      "Marr, B. (2024, January 26). How generative AI is revolutionizing customer service. Forbes.",
      "Tordjman, K. L., et al. (2025, January 13). How AI agents are opening the golden era of customer experience. BCG.",
    ],
    bubble: "Savings that customers liked. Let's see why.",
  },

  lab: {
    kicker: "Lab · Your token meter",
    title: "Price a workflow, then route it",
    goal: "Measure the tokens of a real request, price it at scale on three model tiers, then compare with a routed mix and with the hidden costs switched on.",
    duration: "30 minutes",
    prerequisites: [
      "Python 3.10 or later",
      "Any chat assistant",
      "A tokenizer page from a model provider (search “tokenizer” on your provider's site)",
      "Current prices for one small, one mid and one frontier model, with the date you read them",
    ],
    steps: [
      {
        title: "Measure a real request",
        body: [
          "Ask a chat assistant a question a customer of yours would ask. Paste the question, then the answer, into a tokenizer and write down both counts.",
        ],
        code: { lang: "prompt", text: "What do I need to rent a car: prerequisites, documents to bring, information to have ready?" },
      },
      {
        title: "Write the meter",
        body: [
          "Save this as token_meter.py. Replace the prices with the ones you found (dollars per million tokens) and the token counts with yours.",
        ],
        code: {
          lang: "python",
          text: `# token_meter.py: monthly cost per model tier, routed mix and hidden costs.
PRICES = {  # $ per 1M tokens: (input, output). Replace with today's list prices.
    "small":    (0.15, 0.60),
    "mid":      (2.50, 10.00),
    "frontier": (15.00, 60.00),
}
TOKENS_IN, TOKENS_OUT = 25, 380   # your measured counts
CALLS_PER_MONTH = 10_000

def cost(tier: str, t_in: int, t_out: int, calls: int) -> float:
    p_in, p_out = PRICES[tier]
    return calls * (t_in * p_in + t_out * p_out) / 1_000_000

print("Single tier:")
for tier in PRICES:
    print(f"  {tier:9} \${cost(tier, TOKENS_IN, TOKENS_OUT, CALLS_PER_MONTH):>10,.2f}")

MIX = {"small": 0.80, "mid": 0.15, "frontier": 0.05}
routed = sum(cost(t, TOKENS_IN, TOKENS_OUT, int(CALLS_PER_MONTH * s)) for t, s in MIX.items())
print(f"Routed 80/15/5: \${routed:,.2f}")

# Hidden costs: 10 tool definitions (~2,000 tokens) and a 6-turn conversation.
TOOL_TAX, TURNS = 2_000, 6
history_in = sum(TOOL_TAX + k * (TOKENS_IN + TOKENS_OUT) for k in range(TURNS))
real = sum(cost(t, history_in, TOKENS_OUT * TURNS, int(CALLS_PER_MONTH * s)) for t, s in MIX.items())
print(f"Routed, with tools and history: \${real:,.2f}")`,
        },
      },
      {
        title: "Run three scenarios",
        body: [
          "Run the script, then change one parameter at a time and note the totals: 1,000,000 calls a month; a long answer (2,000 output tokens); TURNS = 20.",
        ],
        code: { lang: "shell", text: "python token_meter.py" },
      },
      {
        title: "Read the results",
        body: [
          "Compare the frontier-only line with the routed line, then the routed line with the hidden-cost line. Which change moved the bill most: model choice, volume, or conversation length?",
          "Write down what you would still need to know before deciding: real traffic mix, accuracy needed per step, latency target, data rules, infrastructure and staff costs.",
        ],
      },
    ],
    checklist: [
      "I measured input and output tokens of a real request separately",
      "My prices are current and dated",
      "I compared single-tier, routed and hidden-cost totals",
      "I ran at least one scenario that changes volume, length or turns",
      "I listed what I still need to know before deciding",
    ],
    bubble: "Plug in your numbers. The meter does the rest.",
  },

  deliverable: {
    kicker: "Deliverable · Cost estimate",
    title: "A cost estimate you can defend",
    purpose:
      "A one-to-two page cost estimate for your candidate workflow. It becomes the cost section of your capstone adoption plan, so make it honest now.",
    fileName: "cost-estimate.md",
    template: `# Cost estimate

Workflow (from the candidate card):
Author:
Prices read on (date):

## 1. Use case
- What the agent does, in two sentences:
- Volume today (requests per month):
- Volume in 12 months, and peak multiplier:

## 2. Token profile
| Step | Model tier | Input tokens | Output tokens | Share of traffic |
|---|---|---|---|---|
| | | | | |

## 3. Monthly model cost
| Scenario | Calls / month | Cost |
|---|---|---|
| Frontier only | | |
| Routed | | |
| Routed, with tool tax and history | | |
| Routed, at peak | | |

## 4. Costs beyond tokens
| Line | Monthly | One-off |
|---|---|---|
| Vector database and storage | | |
| Gateway, tracing, monitoring | | |
| Evaluation runs | | |
| Engineering and maintenance (hours × rate) | | |
| Human review in the loop | | |
| Training and change management | | |

## 5. Build, host or fine-tune
- Choice and reason:

## 6. Before deciding, we still need
-
`,
    checklist: [
      "Input and output tokens are priced separately",
      "Growth and peak volume are modelled, not only today's traffic",
      "Infrastructure and people appear in the budget",
      "Prices carry the date they were read",
      "At least one open question is listed",
    ],
    bubble: "This sheet goes straight into your capstone.",
  },
};
