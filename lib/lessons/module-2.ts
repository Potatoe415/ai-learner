import type { LessonContent } from "../lessons";

// Module 2 · Platforms & the harness. Source: MIT module 2 (sections 1 to 5, videos 2.1 to 2.4, assignment 2.1) and its complements.
// Content file: long by nature (prose, code and templates), no logic.
export const MODULE_2: LessonContent = {
  reading: {
    kicker: "Concept · From vibe coding to engineering",
    title: "The model is the wizard. Your code is the harness.",
    intro:
      "Anyone can now get working code, or a working agent, by asking for it in plain words. Getting it to behave the same way on the ten-thousandth request is another job. This module tours the platforms, separates what the model does from what your code must guarantee, then walks through the big choices: one agent or several, open or closed model, and where it all runs.",
    sections: [
      {
        heading: "A young, crowded market",
        body: [
          "Agentic platforms are a “Wild West”: dozens of players, no settled standards, and today's leaders may not last. You do not need to bet on a winner. You need to know what each family is good at, so you can match the right tool to the problem: deep reasoning, a tight budget, near real-time answers, or a specialised domain such as code or images.",
          "Most of the names below are open source: the code is public, so you can read it, change it and share it under a licence. Think of getting the recipe, not just the dish. Closed-source products keep code and training data with the vendor, which is why they are often called black boxes.",
        ],
        table: {
          head: ["Platform", "Origin", "What it does", "Watch out"],
          rows: [
            ["LangChain", "Harrison Chase, late 2022", "Open-source framework for LLM apps: prompt templates, chains, agents, memory, retrieval", "Steep learning curve, frequent changes, uneven docs"],
            ["CrewAI", "João Moura (ex-Clearbit), 2023", "Python framework for teams of agents, each with a role, tools and a goal, that delegate to each other", "No visual builder; needs Python skills"],
            ["Ollama", "Michael Chiang and Jeffrey Morgan, Y Combinator winter 2021", "Runs open models (Llama 2, Mistral, Gemma) on your own machine from the command line, on macOS, Linux and Windows", "Self-hosting means self-patching (see the post-mortem)"],
            ["Codex", "OpenAI, 2021; agentic preview in ChatGPT in May 2025", "Reads a codebase, fixes bugs, runs tests and proposes changes in a sandbox, without step-by-step prompts", "Generated code can carry vulnerabilities and breed false confidence"],
            ["n8n", "Jan Oberhauser, 2019", "Self-hostable, open-source alternative to Zapier that snaps apps together as nodes", "Logic-heavy set-up; big flows get hard to maintain visually"],
          ],
        },
        callout: {
          label: "Field note",
          text: "Plain automation passes messages between apps. An n8n flow becomes agentic when it decides: a chat message arrives in Intercom, the flow checks in HubSpot whether this is a top-tier customer, pulls the matching help article from Notion, and alerts a manager in Slack.",
        },
      },
      {
        heading: "Three questions that sort the platforms",
        body: [
          "Feature lists overlap, so compare architecture instead. MIT instructors reduce the choice to three questions:",
        ],
        bullets: [
          "Coordination: how does it chain agents (in sequence, in a hierarchy, in loops)?",
          "Data sovereignty: where do execution and inference happen (public API, private cloud, your own machines)?",
          "Control: who owns the weights, the runtime and the release cycle (open source or a closed ecosystem)?",
        ],
        table: {
          head: ["Family", "Pattern", "Strength", "Limit", "Best fit"],
          rows: [
            ["LangChain / LangGraph", "Graph of states with loops", "Checkpoints, human pause and resume, fine control", "Breaking changes across versions", "Complex stateful enterprise apps"],
            ["CrewAI", "Roles in a hierarchy (role, goal, backstory)", "Natural model for delegation", "Code only, opaque to business experts", "Team simulations: research, multi-stage drafting"],
            ["Microsoft AutoGen", "Agents in conversation, event-driven", "Built-in sandboxed code execution", "Free-form chat is hard to constrain and debug", "Code generation, data exploration"],
            ["Ollama / vLLM", "Local or self-hosted inference", "Data stays in, no per-token bill, steady latency", "Needs GPUs; models trail the frontier", "Regulated data: health, banking, defence"],
            ["n8n / Flowise / Make", "Visual nodes, low code", "Huge connector library, fast for business teams", "Brittle for agent loops, awkward in Git", "Internal tools, deterministic webhooks, MVPs"],
          ],
        },
        callout: {
          label: "Governance",
          text: "Low-code tools such as Zapier Central or n8n let business units move fast. Without central IT oversight they also open security holes and duplicate software spend. And since today's favourite framework may be obsolete in 18 months, build the skill to evaluate and migrate rather than marrying one.",
        },
      },
      {
        heading: "Vibe coding: fast, and fragile",
        body: [
          "In early 2025 Andrej Karpathy, an OpenAI co-founder, named a new habit “vibe coding”: you say what you want in plain language, accept what the AI writes and stop caring about the code. The assistants that make it possible include GitHub Copilot, Gemini Code Assist, Amazon Q Developer, Claude Code Pro, OpenAI Codex, Replit AI, Tabnine and code editors such as Cursor.",
          "The gains are real. In March 2025 Y Combinator's Jared Friedman said a quarter of the winter 2025 start-ups had codebases about 95 % generated by AI. Prototypes appear in minutes rather than weeks, a few product engineers ship what large teams used to, and niche markets become worth serving. Finance teams report cleaning and charting spreadsheets of millions of rows with ten-line prompts.",
          "Abel Sanchez calls the wider shift “vibe living”: we now vibe an image, a video, and increasingly expertise in medicine, law and finance. Like steam and electricity did for muscle, agents turn cognitive work into a cheap utility. The faculty's reading of the data: technology automates tasks, not whole jobs, and pushes people towards judgement and orchestration.",
          "Before rolling these tools out across an organisation, check five things:",
        ],
        bullets: [
          "The full life cycle: a tool that drafts code but cannot hand it cleanly to your pipelines creates slow, error-prone hand-offs.",
          "Enterprise rules up front: privacy and IP governance. Assistants trained on open-source code can surface licensed snippets.",
          "Democratisation with governance: AI-written code goes through the same quality and compliance checks as human code.",
          "Skills, not replacement: teach people to prompt and to review output, so institutional knowledge stays.",
          "Context management: prompt history, links to the code each prompt produced, and rollback. Without them, teams drift into incompatible styles.",
        ],
        callout: {
          label: "The production hangover",
          text: "A prototype vibe-coded in 30 minutes usually has no input checks, no error handling, no indexes, no tests and no coherent structure. “Devibing” is the engineering pass that follows: remove redundant model calls and circular dependencies, add strict types and schema checks, move secrets out of the code into environment variables, and put database changes into migration scripts.",
        },
      },
      {
        heading: "The wizard and the robot",
        body: [
          "A common mistake is to think the model is the agent. It is only one part. The model (the wizard) runs on GPUs, reads the context it is handed, proposes an answer or a tool call, and forgets everything. It cannot run code, open a database or remember yesterday on its own.",
          "Everything else is ordinary software (the agent, or robot). It keeps state and memory, holds the business rules, runs the tools and decides what to show the model next. It runs on normal CPUs, in Python, Node.js or microservices, and does the same thing every time.",
        ],
        table: {
          head: ["", "Wizard (the LLM)", "Robot (the orchestrator)"],
          rows: [
            ["Runs on", "GPUs", "CPUs: Python, Node.js, microservices"],
            ["Memory", "None between calls", "Session state, database, logs"],
            ["Behaviour", "Probabilistic", "Deterministic"],
            ["Job", "Read the context, propose “run tool X with Y”", "Build the context, run the tool, store the result, ask again"],
          ],
        },
        callout: {
          label: "Design law",
          text: "Reasoning is not a workflow. A business process must give the same result every time, so its sequence (say lead intake → KYC check → credit risk score → account creation) lives in code: a state machine or a workflow engine such as LangGraph, Temporal or AWS Step Functions. The model is called inside a step, to read messy input or judge an edge case. It does not choose the next step on its own.",
        },
      },
      {
        heading: "Harness engineering",
        body: [
          "When models write the code or drive the actions, the engineer's main job shifts from writing every line to building the harness around them: automated checks that accept good output and reject the rest, whatever the model meant. Teams that succeed do not read every generated line. They make it impossible for a bad one to get through.",
        ],
        table: {
          head: ["Harness part", "What it does", "Example"],
          rows: [
            ["Invariant checks", "Assert business rules that must never break", "A refund is never above €100; a category is always one of four"],
            ["Sandboxed runtime", "Run model-written code in isolation", "A container with no production credentials"],
            ["Synthetic bench", "Replay many edge cases on every generation", "1,000 generated cases, including empty, hostile and foreign-language ones"],
            ["Regression gates", "Reject output whose schema drifts", "The format or pass rate changes → the build fails"],
          ],
        },
        callout: {
          label: "Watch out",
          text: "A rule written in the prompt is a wish, not a control. If a limit matters, enforce it in code and in permissions, where the model cannot talk its way past it. Module 7 turns this into hard guardrails and evals.",
        },
      },
      {
        heading: "One agent or a team?",
        body: [
          "Agents differ in how much they remember and plan. A classic model has five types; know what one can do alone before you combine several.",
          "A multi-agent system is several autonomous agents sharing an environment. Each controls its own actions, sees only part of the picture, and control is spread out, so there is no single point of failure. That buys adaptability and parallel work, and costs coordination: who does what (task allocation), what messages look like (communication protocol), and who wins when goals or resources clash (conflict resolution). Warehouse robots that share position, load and route to avoid collisions need all three.",
          "A single agent is simpler and faster, but one context window doing everything bloats and accumulates errors. The instructors' advice: give each agent one narrow job and a small context, and connect them through deterministic event buses rather than open-ended chat between models.",
        ],
        bullets: [
          "Reflex: fixed condition-action rules on what it sees now. A thermostat. No memory.",
          "Model-based: rules plus an internal map of its world. A robot vacuum that remembers what it has cleaned.",
          "Goal-based: picks actions that bring it closer to a target. A self-driving car rerouting around roadworks.",
          "Utility-based: scores outcomes to balance trade-offs. A trading system weighing return against risk.",
          "Learning: improves from experience. AlphaGo getting stronger through self-play.",
        ],
        table: {
          head: ["Design choice", "Option A", "Option B"],
          rows: [
            ["Control", "Centralised: one controller, like a ground station steering a drone fleet. Easy to monitor; a single point of failure and a bottleneck", "Decentralised: drones share data and adjust locally. Scales and survives failures, harder to debug"],
            ["Team make-up", "Homogeneous: identical crop-scanning drones. Easy to deploy, less flexible", "Heterogeneous: aerial drones, soil robots and weather sensors. Richer results, harder to integrate"],
            ["Conflict rule", "Negotiation, or a predefined protocol", "Auction: cars bid for right of way at a junction"],
          ],
        },
        callout: {
          label: "Field note",
          text: "Traditional software follows instructions; generative AI produces text; agentic AI pursues an objective. An agent without an explicit success metric cannot tell when it is done, so write down the measure that ends its loop.",
        },
      },
      {
        heading: "Open or closed model",
        body: [
          "Open models such as Meta's Llama family and DeepSeek-R1 (early 2025, some of its benchmark claims later disputed) have narrowed the gap with closed ones such as OpenAI's GPT models, Google's Gemini and Anthropic's Claude. The best closed models still tend to lead on complex reasoning; a fine-tuned open model can win on a narrow domain, and open models can match them on everyday writing.",
          "Free to download is not free to run. Some hosted Llama deployments cost about $0.60 per million input tokens and $0.70 per million output, but set-up, tuning, hosting and upkeep are yours. There is no universally better side, only the better fit, and many organisations will mix both across their stack.",
        ],
        table: {
          head: ["Factor", "Open source", "Closed source"],
          rows: [
            ["Customisation", "Full: inspect, fine-tune, modify; community fixes", "What the vendor exposes; you wait for its updates"],
            ["Cost", "No licence, but set-up, training, hosting and staff", "Licence or usage fees; more predictable, support included"],
            ["Security and data", "Auditable; can run in your private cloud under your rules", "Code and data stay with the vendor; manage what you send"],
            ["Skills needed", "Strong in-house team, forums for support", "Usable off the shelf"],
            ["Strategic edge", "Models tailored to your domain", "Access to proprietary advances"],
          ],
        },
      },
      {
        heading: "Where it runs",
        body: [
          "Cloud infrastructure is the backbone of enterprise agents, and forecasts put agentic AI in about a third of enterprise software by 2028. AWS, Azure and Google Cloud offer the three capabilities agents need: auto-scaling compute for variable load, GPU clusters for heavy reasoning, and memory-optimised machines for long contexts.",
        ],
        bullets: [
          "Serverless (the provider runs the servers, you pay per execution) suits event triggers and occasional jobs. Containers (your code and its dependencies, isolated) suit agents that run all the time and add isolation. Most teams combine both.",
          "Cloud plus edge: train, analyse and orchestrate in the cloud; decide locally where latency, privacy or offline work matter. A shop agent adjusts prices on the spot while the cloud watches the wider market.",
          "Cost: hyperscalers spend hundreds of billions a year on capacity, so watch yours. Tier storage, archive old agent logs automatically, and cut traffic between regions.",
          "Example: NTT DATA describes agent services spread over AWS, Azure and Google Cloud, with Kubernetes containers, serverless triggers, edge nodes and central monitoring. It reports 40 % lower operating costs, 60 % faster customer-service responses, 99.9 % uptime and room for ten times the load at peaks.",
        ],
      },
    ],
    takeaways: [
      "Compare platforms on coordination, data sovereignty and control, not on feature lists.",
      "The model is a stateless wizard. Deterministic code holds the state, the order of steps and the rules.",
      "Vibe coding gets you a prototype. Devibing and a harness of invariants, sandboxes, benches and gates get you to production.",
      "Choose topology, model and hosting per workflow: narrow agents, open or closed by data rules and skills, serverless and containers where each fits.",
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
    kicker: "Post-mortem · Ollama CVE-2024-37032, 2024",
    title: "The private model server that could run an attacker's code",
    context:
      "Ollama's promise is simple: run the model on your own machine, so medical files, financial details and legal notes never leave the building, and answers come back without a round trip to the cloud. In 2024 a critical remote code execution flaw, CVE-2024-37032, showed the other side of that promise: whoever hosts the model also owns its security.",
    numbers: [
      { value: "CVE-2024-37032", label: "public identifier of the flaw" },
      { value: "Critical", label: "remote code execution: attackers could run arbitrary code on affected systems" },
      { value: "June 26, 2024", label: "date of the GBHackers report on the flaw" },
      { value: "100 %", label: "data confidentiality: the selling point of local inference" },
    ],
    timeline: [
      { label: "2021", text: "Michael Chiang and Jeffrey Morgan start Ollama in Y Combinator's winter 2021 cohort, to let developers and organisations run LLMs locally, privately and with low latency." },
      { label: "Adoption", text: "Developers and organisations adopt it to keep control of their data. It runs Llama 2, Mistral and Gemma from a command line on macOS, Linux and Windows, isolates each model's environment and plugs into LangChain." },
      { label: "2024", text: "A critical remote code execution flaw, CVE-2024-37032, is discovered. On an affected system, an attacker could execute code of their choosing." },
      { label: "Response", text: "GBHackers reports the flaw on June 26, 2024, and patches are released. The course's verdict: open-source AI platforms need ongoing security assessments and timely updates." },
    ],
    lessons: [
      "Local keeps data away from a vendor, not from an attacker. Once you host the model, its server is part of your attack surface.",
      "Open source lets anyone audit the code, but a fix only protects you once you install it. Self-hosting means owning the patch cycle.",
      "Add “who patches it, and how fast?” to the data sovereignty question for every platform you shortlist.",
      "Run the model server like any other risky service: in an isolated container, with no more access than it needs, and listed in central IT's inventory rather than installed quietly by one team.",
    ],
    question: {
      prompt: "Your team picks a self-hosted open model to process regulated customer data. Which plan matches the lesson of this case?",
      options: [
        { id: "a", text: "Skip the security review: the data never leaves our machines, so no one outside can reach it" },
        { id: "b", text: "Track the project's security advisories, patch on a set schedule, run the server isolated with minimal access, and register it with central IT" },
        { id: "c", text: "Drop open source and use a closed model, since open code exposes its flaws to attackers" },
        { id: "d", text: "Rely on the community: so many people read open-source code that flaws are fixed for everyone" },
      ],
      correct: "b",
      hints: {
        a: "Local protects data from the vendor. A remote code execution flaw is exactly how an outsider reaches your machines.",
        c: "Transparency is also what lets the community find and fix flaws, and closed services carry their own data risks. The issue was patching, not openness.",
        d: "The community found and fixed the flaw. Your server stays vulnerable until you install the patch.",
      },
      explanation:
        "Yes. Self-hosting moves the security work to you: watch advisories, patch fast, contain the blast radius, and keep the server visible to the people responsible for security.",
    },
    sources: [
      "GBHackers. (2024, June 26). Ollama AI platform flaw let attackers execute remote code.",
      "GeeksforGeeks. (2024, June 3). Ollama explained: Transforming AI accessibility and language processing.",
      "Hostinger. (2025, May 8). What is Ollama? Introduction to the AI model management tool.",
      "MIT Applied Agentic AI, Module 2: Emerging agentic platforms (Ollama).",
    ],
    bubble: "Local and private is a great start. Patched is the finish line.",
  },

  lab: {
    kicker: "Lab · Vibe it, then harness it",
    title: "Vibe-code a landing page, then put it through a gate",
    goal: "Follow the vibe-coding pattern from idea to mockup to working HTML, then wrap the result in deterministic checks and regression tests, so a new generation ships only if it passes.",
    duration: "45 minutes",
    prerequisites: [
      "A chat assistant that can generate images and code (the course demo uses ChatGPT; Claude or a code editor such as Cursor work too)",
      "A plain text editor (Notepad, TextEdit): not Word or Google Docs, which add hidden formatting",
      "A web browser, and Python 3.10 or later (standard library only)",
    ],
    steps: [
      {
        title: "Vibe a mockup",
        body: [
          "Ask for an image of a homepage. Adapt the subject to your work: an accounting firm, a consultancy, an internal team portal. Image generation can take a few minutes. Try two or three versions and keep the one you like; iterating costs almost nothing.",
        ],
        code: {
          lang: "prompt",
          text: "Create an image of a mock web user interface for a Global Gen-AI Community. Make the user interface clean, elegant, and modern.",
        },
      },
      {
        title: "Turn it into code and open it",
        body: [
          "In the same conversation, ask for the HTML. Copy only the code into your text editor (assistants often add a sentence before or after it) and save it as index.html in a new folder called site. Drag the file into your browser.",
          "If you see raw code instead of a page, Windows probably saved index.html.txt. In File Explorer choose View, then show file name extensions, rename the file to index.html and accept the warning. Expect the page to look plainer than the mockup: the mockup's images are not on your machine.",
        ],
        code: {
          lang: "prompt",
          text: "I now want to create an implementation of the user interface. Please create the HTML code.",
        },
      },
      {
        title: "List what the vibe left out",
        body: [
          "Before reading the code, write the rules this page must always meet, whatever the model produces. These are your invariants. The script below starts with a few: a real .html file, no chat text above the code, a language and a title, exactly one main heading, alt text on every image, a call to action, no external scripts, no plain-http links and nothing that looks like a hard-coded secret. Add one rule of your own (a required section, a brand word).",
        ],
      },
      {
        title: "Write the checker",
        body: [
          "Save this as check_page.py next to the site folder. Every verdict is decided by code: no model reviews the page.",
        ],
        code: {
          lang: "python",
          text: `# check_page.py: deterministic checks for a vibe-coded page.
# Usage: python check_page.py site/index.html [more files...]
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

MAX_BYTES = 200_000
SECRET = re.compile(r"(api[_-]?key|secret|password|token)\\s*[:=]\\s*[\\x22']", re.I)

class PageScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.count, self.lang, self.title, self.in_title = {}, None, "", False
        self.missing_alt, self.external_scripts, self.plain_http = 0, [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.count[tag] = self.count.get(tag, 0) + 1
        if tag == "html":
            self.lang = a.get("lang")
        if tag == "title":
            self.in_title = True
        if tag == "img" and not (a.get("alt") or "").strip():
            self.missing_alt += 1
        if tag == "script" and a.get("src"):
            self.external_scripts.append(a["src"])
        for key in ("href", "src"):
            if (a.get(key) or "").startswith("http://"):
                self.plain_http.append(a[key])

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data.strip()

def check(path: Path) -> list[str]:
    """Return the list of broken rules. Empty list = the page passes."""
    if path.suffix != ".html":
        return [f"file must end in .html, got {path.name}"]
    raw = path.read_bytes()
    text = raw.decode("utf-8", errors="replace")
    errors = []
    if len(raw) > MAX_BYTES:
        errors.append(f"page is {len(raw)} bytes, limit {MAX_BYTES}")
    if not text.lstrip().lower().startswith("<!doctype html"):
        errors.append("first line is not <!DOCTYPE html> (chat text pasted with the code?)")
    scan = PageScan()
    scan.feed(text)
    if not scan.lang:
        errors.append("<html> has no lang attribute")
    if not scan.title:
        errors.append("missing or empty <title>")
    if scan.count.get("h1", 0) != 1:
        errors.append(f"expected exactly one <h1>, found {scan.count.get('h1', 0)}")
    if scan.missing_alt:
        errors.append(f"{scan.missing_alt} image(s) without alt text")
    if scan.count.get("a", 0) + scan.count.get("form", 0) == 0:
        errors.append("no link or form: the page has no call to action")
    if scan.external_scripts:
        errors.append(f"external scripts not allowed: {scan.external_scripts}")
    if scan.plain_http:
        errors.append(f"plain-http links: {scan.plain_http}")
    if SECRET.search(text):
        errors.append("something that looks like a hard-coded secret")
    return errors

if __name__ == "__main__":
    failed = 0
    for name in sys.argv[1:]:
        errors = check(Path(name))
        print(("PASS " if not errors else "FAIL ") + name)
        for e in errors:
            print("   - " + e)
        failed += bool(errors)
    sys.exit(1 if failed else 0)`,
        },
      },
      {
        title: "Run a small bench, and feed the failures back",
        body: [
          "Ask the assistant for two more versions of the page and save them as site/v2.html and site/v3.html. Run the checker on all three. It is a tiny bench: same request, several generations, one verdict each.",
          "For any page that fails, paste the error lines back to the assistant (“Your page was rejected: …”), save the new version and check again. Note how many rounds each page needs. That retry-with-feedback loop is the harness at work: the model proposes, the code decides.",
        ],
        code: { lang: "shell", text: "python check_page.py site/index.html site/v2.html site/v3.html" },
      },
      {
        title: "Add regression gates",
        body: [
          "Save this as test_check_page.py next to check_page.py. These tests protect the rules themselves: any change to the checker, or any new page, must keep them green before it ships.",
        ],
        code: {
          lang: "python",
          text: `# test_check_page.py: regression gates for the page harness.
import tempfile
import unittest
from pathlib import Path

from check_page import check

GOOD = """<!DOCTYPE html>
<html lang="en">
<head><title>Global Gen-AI Community</title></head>
<body>
  <h1>Welcome</h1>
  <img src="logo.png" alt="Community logo">
  <a href="#join">Join the community</a>
</body>
</html>"""

class Gate(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)

    def page(self, text, name="index.html"):
        path = Path(self.tmp.name) / name
        path.write_text(text, encoding="utf-8")
        return path

    def test_good_page_passes(self):
        self.assertEqual(check(self.page(GOOD)), [])

    def test_txt_extension_rejected(self):
        self.assertTrue(check(self.page(GOOD, "index.html.txt")))

    def test_chat_text_above_code_rejected(self):
        self.assertTrue(check(self.page("Sure! Here is your page:\\n" + GOOD)))

    def test_image_without_alt_rejected(self):
        self.assertTrue(check(self.page(GOOD.replace(' alt="Community logo"', ""))))

    def test_second_h1_rejected(self):
        self.assertTrue(check(self.page(GOOD.replace("</body>", "<h1>Again</h1></body>"))))

    def test_external_script_rejected(self):
        tag = '<script src="https://cdn.example.com/x.js"></script>'
        self.assertTrue(check(self.page(GOOD.replace("</body>", tag + "</body>"))))

    def test_hardcoded_secret_rejected(self):
        tag = "<script>const api_key = 'abc123';</script>"
        self.assertTrue(check(self.page(GOOD.replace("</body>", tag + "</body>"))))

    def test_real_page_passes(self):
        real = Path("site/index.html")
        if not real.exists():
            self.skipTest("no site/index.html yet")
        self.assertEqual(check(real), [])

if __name__ == "__main__":
    unittest.main()`,
        },
      },
      {
        title: "Run the gates, then loosen a rule",
        body: [
          "Run the tests from the folder that contains site. All of them should pass once your index.html is fixed. Now comment out the alt-text check in check_page.py, as a hurried change might, and run them again: the alt-text test fails. The gate caught a weakened rule before it shipped. Put the check back.",
        ],
        code: { lang: "shell", text: "python -m unittest test_check_page -v" },
      },
      {
        title: "Write it up",
        body: [
          "As in the course assignment, write 250 to 500 words on the process and on how your organisation could use vibe coding, with two screenshots: the mockup and the page in your browser. Add one paragraph on what the harness caught, and which rule you would need before letting anyone vibe-code something that touches real data.",
        ],
      },
    ],
    checklist: [
      "I generated a mockup and turned it into an index.html that opens in my browser",
      "I listed the page's invariants, including one rule of my own, before reading the code",
      "check_page.py prints PASS or FAIL with reasons for each generated page",
      "I fed at least one failure back to the assistant and got a page that passes",
      "The tests pass, and one fails when I remove a check",
      "My write-up has both screenshots and says what the harness caught",
    ],
    bubble: "Vibe the page, then let the gate decide.",
  },

  deliverable: {
    kicker: "Deliverable · Platform and architecture choice",
    title: "Choose the platform and architecture for your candidate workflow",
    purpose:
      "Take the candidate workflow you picked in module 1 and turn it into explicit choices: what problem the agent solves, which steps code owns, how many agents, which platform, which model, where it runs and what the harness checks. Analyse trade-offs, not feature lists. This sheet becomes the technology section of your capstone adoption plan in module 8.",
    fileName: "platform-architecture-choice.md",
    template: `# Platform and architecture choice

Candidate workflow (from module 1):
Author:
Date:

## 1. The problem to match
- What matters most here: reasoning depth, budget, near real-time response, a specialised domain (code, images, documents)?
- Which of these can we trade away, and which not:

## 2. The workflow as a state machine
The order of steps lives in code. The model only works inside a step.
| Step | Run by code or by the model | Check before moving on | On failure |
|---|---|---|---|
| | | | |

## 3. Topology
- One agent or several? Why:
- For each agent: its one job, its type (reflex, model-based, goal-based, utility-based, learning), its tools:
- Control: centralised or decentralised; agents identical or specialised:
- How agents exchange messages (deterministic event bus, queue, shared store):
- Conflict rule (negotiation, predefined protocol, auction):
- Success metric that ends each loop:

## 4. Platform
- Coordination (sequence, hierarchy, loops):
- Data sovereignty (public API, private cloud, our own machines), and who patches it:
- Control (who owns the weights, the runtime, the release cycle):

| Candidate | Pattern | Strength for us | Limit for us |
|---|---|---|---|
| | | | |

- Choice (visual tool, SDK, or an agent built into a platform we already run, such as a CRM-native agent) and why:
- Alternative considered, and why not:
- Exit plan if the platform stalls or changes direction:

## 5. Model: open or closed
| Factor | Open candidate: | Closed candidate: |
|---|---|---|
| Quality on our own test cases | | |
| Total cost (set-up, hosting, staff, tokens) | | |
| Where data goes, retention | | |
| Skills we have to run it | | |
| Strategic fit | | |

- Choice (or mix) and reason:

## 6. Where it runs
- Public cloud, private cloud, on-premise or edge:
- Serverless, containers, or both (which part where):
- What runs in the cloud, what runs at the edge:
- Where customer data travels; encryption, retention, service levels in the contract:
- Main cost levers (storage tiers, log archiving, cross-region traffic):

## 7. Harness
- Invariants (rules that must never break):
- Schema for every model output:
- Sandbox, bench (number and kind of edge cases) and the regression gate that blocks a release:
- When a tool fails or an API times out (retry, checkpoint, recovery, hand-over to a person):
- Credentials: what the agent can reach, and what it cannot:

## 8. Vibe coding on this workflow
- Who may prototype with AI assistants, and on what data:
- The devibing pass before production (types, schemas, secrets, migrations, tests) and who owns it:

## 9. Before deciding, we still need
-
`,
    checklist: [
      "The problem is stated in terms of reasoning, budget, latency and domain",
      "Every step of the workflow says whether code or the model runs it",
      "The one-agent or multi-agent choice is justified and each loop has a success metric",
      "The platform choice answers coordination, data sovereignty and control, with an exit plan",
      "Data location, retention and patching responsibility are stated for the chosen model and hosting",
      "At least three invariants and one failure mode are written down",
    ],
    bubble: "Your architecture, one decision per line. Module 8 will thank you.",
  },
};
