---
kind: lab
based_on: content/01-extracted/02_Modules/Module_1_Complete.md, content/01-extracted/02_Modules/Module_1_Complements.md
based_on_hash: d519e1e257a1
kicker: Lab · The cost router
title: Route prompts between a small and a frontier model, then price the workflow
duration: 40 minutes
bubble: Plug in your prompts. The router does the sorting, the meter does the maths.
---
Measure a real request, write a small router that sends each step of a workflow to a small or a frontier model, price the month both ways, then add a tiny loop that escalates when the small model is unsure.

## Prerequisites

- Python 3.10 or later
- Any chat assistant
- A tokenizer (for example OpenAI’s Tokenizer)
- No API key needed

## Steps

### Measure one real transaction

Ask a chat assistant a question a client of yours would typically ask, or use the course example below. Paste the question into a tokenizer and note the token count, then do the same with the answer.

For reference, the course measured about 25 input tokens and 379 output tokens for this question.

```prompt
What is the process I need to go through to rent a car: prerequisites? documents to present? information to have on hand?
```

### Write the router

Save this as cost_router.py. It runs offline: token counts are estimated from text length, and the prices are the course’s figures for GPT-4o mini and GPT-4.5 (dollars per million tokens, input then output). Replace them with today’s list prices and fill in the date.

The route function is the Reason step: short, routine prompts go to the small model, anything that asks to compare, explain or plan goes to the frontier.

```python
# cost_router.py: send each prompt to a small or a frontier model, then price the workflow.
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
        print(f"  {step:16} {tier:9} ${monthly:>12,.2f}")
    print(f"  {'TOTAL':26} ${total:>12,.2f}\n")
    return total

print(f"Prices read on {PRICES_READ_ON}\n\nFrontier for everything:")
everything = report(force="frontier")
print("Routed:")
routed = report()
print(f"Routing saves {1 - routed / everything:.0%} of the bill.")
```

### Run it and read the two totals

With the course prices, the frontier-only month comes to about $371 and the routed month to about $92: the one step that really needs the big model (the dispute) now makes up almost the whole bill.

```shell
python cost_router.py
```

### Put your own workflow in

Replace the four WORKFLOW rows with three to five steps of a workflow from your organisation: a realistic prompt, a monthly volume and an expected answer length (use your measurement from step 1 for one of them). Adjust the HARD keywords if your hard cases look different.

### Play the Assignment 1.1 scenarios

Change one parameter at a time, rerun, and note the totals:

1. VOLUME = 100, a hundred times the sample traffic (about two million calls a month). 2. TOOL_TAX = 2_000, as if the agent carried ten tool definitions on every call. 3. Double the output tokens of every step, for long answers. Which change moved the bill most: model choice, volume, tools or answer length?

### Add a tiny loop

Append this to the file. The fake call stands in for a real API: the small model replies UNSURE to anything about double charges. The loop routes (Perceive, Reason), calls (Act), checks the reply (Reflect), escalates once, and hands over to a person when it runs out of steps.

```python
# --- A tiny Perceive -> Reason -> Act -> Reflect loop ---------------------------
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

print("\nLoop trace:")
for step, prompt, _, _ in WORKFLOW:
    print(f"  {step:16} ->", *run(prompt))
```

### Read the trace

With the sample workflow, “classify ticket” was routed to the small model but ends on the frontier: the Reflect check caught a reply it could not trust. Your routed total from step 3 did not include that escalation. Estimate what share of that step escalates in real life and add it to your figure.

In a real agent, the Reflect check would be a deterministic validation (a schema, allowed values) rather than a magic word, exactly as the hallucination paradox section recommends.

### Go further (optional)

Replace fake_call with a real call to a small and a frontier model from your provider, read the token counts returned by the API instead of estimating them, and check the cost in the provider’s usage page, as Dr. Sanchez does in Video 1.3.

## Checklist

- I measured the input and output tokens of one real transaction separately
- My prices are current and carry the date I read them
- The router runs on a workflow of my own, and I compared frontier-only with routed totals
- I ran at least one scenario that changes volume, tool tax or answer length
- The loop trace shows at least one escalation, and I priced it
