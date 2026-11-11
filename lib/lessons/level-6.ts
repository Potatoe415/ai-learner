import type { LessonContent } from "../lessons";

// Level 6 · Hard guardrails. Source: MIT module 7 (sections 1 and 3, assignment 7.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const LEVEL_6: LessonContent = {
  reading: {
    kicker: "Concept · AI Act, GDPR, guardrails",
    title: "A sign on the wall is not a wall",
    intro:
      "An agent that reads personal data and acts on it is subject to privacy law from its first request. Some rules can live in the prompt. The ones that carry legal weight cannot. This level maps the main laws onto agent design, then shows where to put the checks that a clever user cannot talk their way past. It is a design guide, not legal advice: confirm your reading with your legal team or data protection officer.",
    sections: [
      {
        heading: "Three privacy laws, one design brief",
        body: [
          "Most agents in Europe and the US meet at least one of three laws. They differ in who they cover and how consent works, but they ask the system for the same things: collect little, explain what you do, let people see and remove their data, and keep evidence.",
        ],
        table: {
          head: ["", "GDPR (EU, 2018)", "CCPA (California, 2018)", "HIPAA (US federal, 1996)"],
          rows: [
            ["Who it covers", "Anyone processing personal data of people in the EU, wherever the company sits", "For-profit businesses above revenue or data-volume thresholds that collect data on California residents", "Covered entities (health plans, clearinghouses, providers) and their business associates"],
            ["Consent model", "A lawful basis for every purpose (Article 6); consent must be explicit opt-in when it is the basis", "Opt-out of the sale of personal data; opt-in needed to sell data of minors under 16", "Patient authorisation for most uses beyond treatment, payment and health care operations"],
            ["Key rights", "Access, correction, erasure, restriction, objection, portability, safeguards on automated decisions", "Know, access, delete, opt out of sale", "Access to one's records; strict limits on disclosure"],
            ["Enforcement", "National data protection authorities; up to €20 million or 4 % of global annual turnover", "California Attorney General and the California Privacy Protection Agency; up to $7,500 per intentional violation (now indexed to inflation)", "HHS civil penalties from about $140 to over $2 million a year; criminal cases (DOJ) up to $250,000 and 10 years in prison"],
            ["What it means for the agent", "Data minimisation, purpose limits, pseudonymisation, a human route for big decisions", "An opt-out switch the agent respects, visibility of what is stored and shared", "PHI only on a need-to-know basis, encryption, audit trails, a signed BAA with every AI vendor"],
          ],
        },
        bullets: [
          "Data minimisation: the agent receives only the fields the task needs. A delivery bot does not need the date of birth.",
          "Purpose limitation: data collected to process an order is not reused to train a model or profile customers without a new basis.",
          "HIPAA's minimum necessary rule pushes towards attribute-based access: who sees which field depends on role, sensitivity and context, checked on every call.",
          "AI can also help comply. Mayo Clinic, for instance, uses AI to flag unusual access to electronic health records, such as lookups at odd hours or by staff with no need for that file.",
        ],
        callout: {
          label: "Fines are real",
          text: "In December 2024 Italy's data protection authority fined OpenAI €15 million over ChatGPT, citing among other things the lack of an adequate legal basis for training on personal data and weak transparency towards users. The model provider is not the only one exposed: you are.",
        },
      },
      {
        heading: "Two GDPR articles that collide with agents",
        body: [
          "Article 17, the right to erasure. A person can ask you to delete their personal data, and you must do it without undue delay unless an exception applies. In a retrieval (RAG) agent, their data no longer sits in one table. It has been chunked, embedded, indexed and copied.",
          "An embedding is a list of numbers, but it is derived from personal text and can sometimes be partly reversed. Treat it as personal data. Deleting one vector is possible in most vector databases, yet the delete may stay soft until the index is compacted, and copies hide in backups, caches, logs, evaluation sets and any model fine-tuned on the data.",
        ],
        bullets: [
          "Keep raw personal data out of vector metadata. Each vector points to a pseudonymous document ID; the text lives in a separate store you control.",
          "Index by data subject, so “everything about customer 4812” can be found and removed in one query.",
          "Crypto-shredding: encrypt each customer's chunks with a key of their own. On an erasure request, destroy the key. The text becomes unreadable everywhere, including in backups.",
          "Never fine-tune on personal data you may have to erase. Removing it from model weights means retraining.",
        ],
        table: {
          head: ["Article 22 asks", "What it means for an agent"],
          rows: [
            ["Is a decision based solely on automated processing?", "The agent decides and nobody with authority reviews the outcome before it applies"],
            ["Does it have legal or similarly significant effects?", "Credit, hiring, insurance, benefits, account closure. A product recommendation does not qualify"],
            ["Is there an exception?", "Necessary for a contract, authorised by law, or explicit consent"],
            ["Even then, which safeguards?", "The person can obtain human intervention, give their point of view and contest the decision, and must get meaningful information about the logic involved (Articles 13 to 15)"],
          ],
        },
        callout: {
          label: "Controller, not bystander",
          text: "Signing an enterprise contract with a model provider does not move your GDPR duties onto them. They act as your processor (Article 28: you need a data processing agreement, and you should check their retention terms). You remain the controller, and the regulator will ask you.",
        },
      },
      {
        heading: "The EU AI Act: obligations follow risk",
        body: [
          "The AI Act (Regulation (EU) 2024/1689) entered into force on 1 August 2024. It does not regulate “AI” as a whole. It sorts uses into risk tiers and adds a separate layer for general-purpose AI (GPAI) models, the large models most agents are built on.",
        ],
        table: {
          head: ["Tier", "Examples", "What applies"],
          rows: [
            ["Unacceptable (banned)", "Social scoring, manipulation exploiting vulnerabilities, emotion recognition at work or school, untargeted scraping of faces", "Prohibited since 2 February 2025"],
            ["High risk", "CV screening and promotion decisions, credit scoring, access to essential services, education grading, safety parts of regulated products", "Risk management, data governance, technical documentation, automatic logs (Article 12), human oversight (Article 14), accuracy and robustness, registration"],
            ["Limited risk", "Chatbots, AI-generated or manipulated images, audio and video", "Transparency: people must know they are talking to an AI, and synthetic content must be marked"],
            ["Minimal risk", "Spam filters, internal search, drafting assistants", "No new obligations; voluntary codes"],
            ["GPAI models (separate layer)", "The foundation models behind most agents", "Providers publish technical documentation, a copyright policy and a training-data summary (since 2 August 2025); models with systemic risk add evaluations, adversarial testing and incident reporting"],
          ],
        },
        bullets: [
          "Your agent's tier comes from its use, not its model. The same LLM is minimal risk drafting emails and high risk ranking job applicants.",
          "If you build on a provider's model and run it in your company, you are usually a deployer. For a high-risk use that means: use it as instructed, assign trained people to oversight, keep the logs, and inform affected workers.",
          "Fines go up to €35 million or 7 % of global turnover for banned practices, and up to €15 million or 3 % for most other breaches.",
        ],
        callout: {
          label: "Check the calendar",
          text: "The original schedule applied most high-risk rules from 2 August 2026 and rules for AI inside regulated products from August 2027. In late 2025 the Commission proposed postponing parts of the high-risk timetable. Read the dates in force on the day you write your plan.",
        },
      },
      {
        heading: "Speed vs oversight: think like a finance department",
        body: [
          "If anyone in a company can spend any amount, purchases are fast and fraud is easy. If the CFO signs off on every box of paper clips, nothing is lost and nothing moves. Most firms approve small purchases instantly and route large ones to a manager. Agent actions work the same way: guardrails are the approval rules, oversight is how they are enforced.",
          "Two kinds of risk pull on the dial. Compliance risk is breaking a law or policy. Operational risk is hurting the business through errors, delays or poor service. Tight guardrails lower both but cost speed. Place them by plotting each action on two axes.",
        ],
        table: {
          head: ["", "Low speed needed", "High speed needed"],
          rows: [
            ["High risk", "Loan approvals, hiring decisions, regulatory filings. Manual oversight: a person approves before the action", "Real-time fraud blocking, medical emergency triage. Automated hard checks in the path, human review after the fact through logs"],
            ["Low risk", "Scheduling suggestions, a draft quarterly report. Minimal oversight", "Autocomplete, product recommendations. Light oversight, periodic review"],
          ],
        },
        bullets: [
          "A support bot answers product questions instantly, but pauses on “send me all the data you hold on me”: it verifies identity and logs the request.",
          "A medical intake agent collects general symptoms quickly, and switches to secure handling plus a human reviewer when a diagnosis or medication comes up.",
          "A recommender suggests products at once, and processes a deletion request immediately, then verifies it.",
          "An internal assistant shares the Q4 forecast without delay, and refuses “show me the CEO's emails”.",
        ],
      },
      {
        heading: "Soft vs hard guardrails",
        body: [
          "A soft guardrail asks the model to behave: a system prompt (“never reveal customer data”), few-shot examples, a constitution. It shapes tone and handles routine cases well. It is also probabilistic, so a long conversation, a role-play or a hidden instruction can talk it out of the rule.",
          "A hard guardrail is code that runs outside the model and gives the same answer every time. It does not read the conversation, so it cannot be persuaded. Anything with legal or financial weight needs one.",
        ],
        table: {
          head: ["Position in the loop", "Hard guardrail", "What it stops"],
          rows: [
            ["Ingress (before the model)", "Input filters, allowed character sets, rate and velocity limits, injection signatures", "Abuse and floods before you pay for a token"],
            ["Soft layer", "System prompt, persona, examples", "Off-tone or off-topic replies, most of the time"],
            ["Egress (after the model)", "Strict output schema (Pydantic, JSON Schema), allowed values and ceilings, PII masking (regex, Presidio, cloud PII services)", "Malformed output, invented categories, amounts over the limit, personal data leaving the system"],
            ["Tool call", "A policy enforcement point: middleware that checks the agent's scope before every write", "An agent writing where its credentials should not reach"],
            ["Human", "Approval queue for actions above a threshold", "High-risk, irreversible or unusual decisions"],
          ],
        },
        callout: {
          label: "Test the guard, not just the agent",
          text: "Functional tests check normal requests. Compliance tests check every legal scenario. Adversarial tests try to break the rules on purpose. Scenario tests replay real flows: does the bot escalate when someone asks for their personal data? Then keep logging every decision, data access and escalation in production, because real users find paths no test did.",
        },
      },
    ],
    takeaways: [
      "Your agent's legal duties come from its use and its data: classify it under the AI Act and map its GDPR basis before you build.",
      "Plan erasure and human review into the architecture: pseudonymous vector IDs, per-customer keys, a route to a person for significant decisions.",
      "Prompts are soft guardrails. Anything that must never happen gets a deterministic check outside the model.",
    ],
    check: {
      prompt:
        "Your support agent's system prompt says “Never include a customer's IBAN in a reply.” A red-team tester gets it to print one in three turns. What do you ship?",
      options: [
        { id: "a", text: "Rewrite the rule in capitals and repeat it at the end of the prompt" },
        { id: "b", text: "Add examples of refusals to the prompt" },
        { id: "c", text: "A masking step in code on every reply before it is sent, with a logged flag when it fires" },
        { id: "d", text: "Ask the model to re-read its answer and remove any IBAN" },
      ],
      correct: "c",
      hints: {
        a: "Louder words are still words. The tester found a path through the prompt once; they will find it again.",
        b: "Examples improve the odds. They do not turn a probability into a guarantee.",
        d: "The checker is the same kind of model that leaked the data. It can be steered the same way.",
      },
      explanation:
        "Right. A deterministic egress filter does not read the conversation, so it cannot be talked round. Keep the prompt rule for tone, and log every time the filter fires: that log is your evidence.",
    },
    bubble: "I keep watch at the gate. Let's see which rules are walls and which are only signs.",
    xp: 20,
  },

  postMortem: {
    kicker: "Post-mortem · Air Canada, 2024",
    title: "The chatbot made up a policy. The airline paid for it.",
    context:
      "In November 2022 Jake Moffatt's grandmother died. He asked the chatbot on Air Canada's website about bereavement fares. It told him he could book at the normal price and claim the reduced rate afterwards, within 90 days. The airline's own policy page, linked in the same answer, said the opposite: no retroactive claims. Air Canada refused the refund and the case went to British Columbia's Civil Resolution Tribunal.",
    numbers: [
      { value: "90 days", label: "the refund window the chatbot invented" },
      { value: "C$650.88", label: "damages: the difference between the fare paid and the bereavement fare" },
      { value: "C$812.02", label: "total award, with interest and tribunal fees" },
      { value: "1", label: "policy page that contradicted the bot, in the same answer" },
    ],
    timeline: [
      { label: "Nov 2022", text: "The chatbot tells the customer he can apply for the bereavement rate after travelling. He books and flies at full fare." },
      { label: "Claim", text: "He then asks for the reduced rate. Air Canada points to its policy page: bereavement fares cannot be claimed after travel." },
      { label: "Defence", text: "Before the tribunal, the airline argues it cannot be held liable for what its chatbot said (the tribunal sums this up as treating the bot as a separate legal entity) and that the customer should have checked the policy page." },
      { label: "Feb 2024", text: "The tribunal rules negligent misrepresentation. The chatbot is part of the airline's website; the airline is responsible for all of it and had no reason to expect customers to double-check one page against another." },
    ],
    lessons: [
      "You cannot disclaim your own agent. What it says on your channel is your company speaking.",
      "A policy that exists only in the model's head is a soft guardrail. Answers about prices, refunds and eligibility should come from the retrieved policy text, in a fixed structure, or not at all.",
      "Commitments (refunds, fares, exceptions) are actions with financial weight: route them through a hard check against the rules, and to a person above a threshold.",
      "Log what the agent told each customer. When a dispute arrives, the transcript is the evidence for both sides.",
    ],
    question: {
      prompt: "You run a similar assistant. Which control would most directly have prevented this case?",
      options: [
        { id: "a", text: "A disclaimer under the chat window: “Answers may be inaccurate”" },
        { id: "b", text: "Policy answers built only from retrieved policy text, validated against a schema of allowed claims, with refund promises handed to an agent" },
        { id: "c", text: "A stronger system prompt asking the model to be accurate about policies" },
        { id: "d", text: "A larger model with more general knowledge" },
      ],
      correct: "b",
      hints: {
        a: "The tribunal did not accept that customers must second-guess the airline's own website. A disclaimer does not make a wrong promise right.",
        c: "That is still a soft guardrail. It improves the odds, it does not stop an invented 90-day rule.",
        d: "General knowledge does not know your airline's policy. Grounding and checks do.",
      },
      explanation:
        "Yes. Grounding the answer in the real policy, constraining what the bot may claim, and keeping a person on promises of money closes the gap that produced this ruling.",
    },
    sources: [
      "Moffatt v. Air Canada, 2024 BCCRT 149. Civil Resolution Tribunal of British Columbia, decision of February 14, 2024.",
      "Proctor, J. (2024, February 15). Air Canada found liable for chatbot's bad advice on plane tickets. CBC News.",
    ],
    bubble: "A friendly answer, a costly promise. Let's look closely.",
    xp: 20,
  },

  lab: {
    kicker: "Lab · Your first hard guardrail",
    title: "Lock the output: strict schema and PII masking",
    goal: "Put a deterministic gate between a model and the outside world: reject any output that breaks the contract, mask emails, phone numbers and IBANs in what passes, then find the gap your own filter leaves.",
    duration: "30 minutes",
    prerequisites: [
      "Python 3.10 or later",
      "A terminal and a text editor",
      "No API key needed: the model outputs are stubs",
    ],
    steps: [
      {
        title: "Install Pydantic",
        body: ["Pydantic validates data against a typed model and refuses anything that does not fit. Version 2 is required."],
        code: { lang: "shell", text: "pip install \"pydantic>=2\"" },
      },
      {
        title: "Write the gate",
        body: [
          "Save this as guardrail.py. The model is replaced by five stored outputs, the kind an LLM sends back on a bad day. The gate validates first, then masks. Every failure turns into a hand-over, never a guess.",
        ],
        code: {
          lang: "python",
          text: `# guardrail.py: hard guardrails around a model's output (schema + PII masking).
import json
import re
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, ValidationError

# 1. The contract. Anything outside it is rejected by code, not by the prompt.
class TicketDecision(BaseModel):
    model_config = ConfigDict(extra="forbid")      # unknown fields = rejection
    category: Literal["refund", "delivery", "account", "other"]
    priority: Literal["low", "normal", "high"]
    refund_eur: float = Field(ge=0, le=500)        # above 500: a person decides
    reply: str = Field(min_length=1, max_length=1200)

# 2. Personal data patterns. IBAN first, so its digits are not read as a phone.
PII_PATTERNS = [
    ("IBAN", re.compile(r"\\b[A-Z]{2}\\d{2}(?: ?[A-Z0-9]{4}){2,7}(?: ?[A-Z0-9]{1,3})?\\b")),
    ("EMAIL", re.compile(r"\\b[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+\\b")),
    ("PHONE", re.compile(r"\\+?\\d(?:[ .-]?\\d){8,13}\\b")),
]

def mask(text: str) -> tuple[str, list[str]]:
    found = []
    for label, pattern in PII_PATTERNS:
        text, n = pattern.subn(f"[{label}]", text)
        found += [label] * n
    return text, found

def guard(raw: str) -> dict:
    """Validate, then mask. Any failure becomes a hand-over, never a guess."""
    try:
        decision = TicketDecision.model_validate_json(raw)
    except ValidationError as err:
        first = err.errors()[0]
        where = ".".join(str(p) for p in first["loc"]) or "(whole output)"
        return {"status": "escalate", "reason": f"{where}: {first['msg']}"}
    reply, found = mask(decision.reply)
    return {"status": "ok", "masked": found, "data": decision.model_copy(update={"reply": reply}).model_dump()}

# 3. Stub model outputs: what an LLM might send back on a bad day.
CASES = {
    "clean, with PII": json.dumps({
        "category": "refund", "priority": "high", "refund_eur": 120,
        "reply": "Refund of 120 EUR approved. We will write to jane.doe@example.com, "
                 "call +33 6 12 34 56 78 and pay FR76 3000 6000 0112 3456 7890 189.",
    }),
    "extra field": json.dumps({
        "category": "account", "priority": "normal", "refund_eur": 0,
        "reply": "Done.", "action": "delete_account",
    }),
    "over the ceiling": json.dumps({
        "category": "refund", "priority": "high", "refund_eur": 4800, "reply": "Approved!",
    }),
    "invented category": json.dumps({
        "category": "legal_advice", "priority": "low", "refund_eur": 0, "reply": "You should sue.",
    }),
    "not JSON at all": "Sure! Here is the JSON you asked for: {category: refund}",
}

if __name__ == "__main__":
    for name, raw in CASES.items():
        print(f"--- {name}")
        print(json.dumps(guard(raw), indent=2, ensure_ascii=False))`,
        },
      },
      {
        title: "Run it and read the verdicts",
        body: [
          "The first case passes with [EMAIL], [PHONE] and [IBAN] in place of the data. The other four are escalated with a precise reason: an unknown action field, a refund of 4,800 over the 500 ceiling, a category outside the list, and text that is not JSON.",
          "Notice what the gate did not need: it never read the conversation, so no argument from the user could change its answer.",
        ],
        code: { lang: "shell", text: "python guardrail.py" },
      },
      {
        title: "Find the gap",
        body: [
          "Add this case to CASES and run again. The reply passes untouched: the email is spelt out and the phone number has too few digits for the pattern. Regex masking is a floor, not a ceiling.",
          "Write down two fixes you would add: for instance an entity recogniser such as Microsoft Presidio for names and spelt-out contacts, and a rule that any reply mentioning “(at)” or “dot com” is escalated instead of sent.",
        ],
        code: {
          lang: "python",
          text: `    "obfuscated": json.dumps({
        "category": "account", "priority": "low", "refund_eur": 0,
        "reply": "Write to jane(at)example(dot)com or call 12 34 56 78.",
    }),`,
        },
      },
      {
        title: "Place it in your loop",
        body: [
          "Open your loop map from level 1. Mark where this gate sits: after Reason, before any reply leaves your system and before any tool call writes data. Note which fields your own workflow would need in its schema, and which ceilings hand over to a person.",
          "Optional: replace one stub with a real model asked to answer in the same JSON shape. Count how often its output fails the gate over 20 tries.",
        ],
      },
    ],
    checklist: [
      "guardrail.py runs and prints one pass and four escalations",
      "Each escalation names the exact field and rule that failed",
      "I reproduced the obfuscated case that slips past the regex",
      "I listed at least two fixes for that gap",
      "I marked where the gate sits in my own loop map",
    ],
    bubble: "Code at the gate. It does not argue, and it does not forget.",
    xp: 30,
  },

  deliverable: {
    kicker: "Deliverable · Guardrail register",
    title: "A compliance sheet for your candidate workflow",
    purpose:
      "One to two pages that say which laws apply to your workflow, how you will honour erasure and human review, and which guardrails sit where in the loop. It builds on your candidate card (level 0), loop map (level 1), architecture (level 3), integration map (level 4) and security memo (level 5), and becomes the governance section of your capstone adoption plan. It is a working document, not legal advice: have it reviewed by legal or your DPO.",
    fileName: "guardrail-register.md",
    template: `# Guardrail register

Workflow (from the candidate card):
Author:
Date:
Reviewed by (legal / DPO):

## 1. Data in the loop
| Data item | Personal? Special category (GDPR Art. 9) or PHI? | Where it comes from | Where it is stored (DB, vector index, logs, backups) |
|---|---|---|---|
| | | | |

## 2. EU AI Act
- Use case in one sentence:
- Risk tier (unacceptable / high / limited / minimal) and why:
- Our role (provider or deployer):
- Transparency duty (do users know they talk to an AI?):
- GPAI model used, and where its provider documentation lives:
- Dates checked on:

## 3. GDPR and other laws
| Purpose | Lawful basis (Art. 6) | Data needed (minimum) | Retention |
|---|---|---|---|
| | | | |

- Controller / processors, and data processing agreements signed (Art. 28):
- Provider retention terms (zero retention?):
- DPIA needed (Art. 35)? Why:
- CCPA, HIPAA or sector rules that also apply:

## 4. Rights by design
- Access request (Art. 15): how we find everything about one person:
- Erasure (Art. 17), per store:

| Store | How we delete | Time to complete | How we verify |
|---|---|---|---|
| Source documents | | | |
| Vector index (pseudonymous IDs? per-customer keys?) | | | |
| Logs and traces | | | |
| Backups | | | |
| Evaluation sets and fine-tuning data | | | |

- Automated decisions with significant effect (Art. 22): which ones, who reviews, how a person contests:

## 5. Risk and speed per action
| Action (from the loop map) | Risk | Speed needed | Quadrant | Oversight (manual / automated / hybrid) |
|---|---|---|---|---|
| | | | | |

## 6. Guardrails
| Guardrail | Hard or soft | Position (ingress / prompt / egress / tool / human) | What it blocks | On failure | Tested by | Owner |
|---|---|---|---|---|---|---|
| | | | | | | |

## 7. Risks and mitigations
| Risk | Compliance or operational | Mitigation | Residual risk |
|---|---|---|---|
| | | | |

## 8. Open questions for legal
-
`,
    checklist: [
      "The AI Act tier and our role are stated with a reason",
      "Every purpose has a lawful basis and a retention period",
      "Erasure is planned for every store, including the vector index and logs",
      "Every rule with legal or financial weight has a hard guardrail, not only a prompt line",
      "Each guardrail has a position in the loop, a failure behaviour and an owner",
    ],
    bubble: "Write down every wall and where it stands. I'll check the gates.",
    xp: 30,
  },
};
