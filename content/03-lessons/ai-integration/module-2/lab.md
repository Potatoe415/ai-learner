---
kind: lab
based_on: content/01-extracted/02_Modules/Module_2_Complete.md, content/01-extracted/02_Modules/Module_2_Complements.md
based_on_hash: 2a1176681b1b
kicker: Lab · Vibe it, then harness it
title: Vibe-code a landing page, then put it through a gate
duration: 45 minutes
bubble: Vibe the page, then let the gate decide.
---
Follow the vibe-coding pattern from idea to mockup to working HTML, then wrap the result in deterministic checks and regression tests, so a new generation ships only if it passes.

## Prerequisites

- A chat assistant that can generate images and code (the course demo uses ChatGPT; Claude or a code editor such as Cursor work too)
- A plain text editor (Notepad, TextEdit): not Word or Google Docs, which add hidden formatting
- A web browser, and Python 3.10 or later (standard library only)

## Steps

### Vibe a mockup

Ask for an image of a homepage. Adapt the subject to your work: an accounting firm, a consultancy, an internal team portal. Image generation can take a few minutes. Try two or three versions and keep the one you like; iterating costs almost nothing.

```prompt
Create an image of a mock web user interface for a Global Gen-AI Community. Make the user interface clean, elegant, and modern.
```

### Turn it into code and open it

In the same conversation, ask for the HTML. Copy only the code into your text editor (assistants often add a sentence before or after it) and save it as index.html in a new folder called site. Drag the file into your browser.

If you see raw code instead of a page, Windows probably saved index.html.txt. In File Explorer choose View, then show file name extensions, rename the file to index.html and accept the warning. Expect the page to look plainer than the mockup: the mockup's images are not on your machine.

```prompt
I now want to create an implementation of the user interface. Please create the HTML code.
```

### List what the vibe left out

Before reading the code, write the rules this page must always meet, whatever the model produces. These are your invariants. The script below starts with a few: a real .html file, no chat text above the code, a language and a title, exactly one main heading, alt text on every image, a call to action, no external scripts, no plain-http links and nothing that looks like a hard-coded secret. Add one rule of your own (a required section, a brand word).

### Write the checker

Save this as check_page.py next to the site folder. Every verdict is decided by code: no model reviews the page.

```python
# check_page.py: deterministic checks for a vibe-coded page.
# Usage: python check_page.py site/index.html [more files...]
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

MAX_BYTES = 200_000
SECRET = re.compile(r"(api[_-]?key|secret|password|token)\s*[:=]\s*[\x22']", re.I)

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
    sys.exit(1 if failed else 0)
```

### Run a small bench, and feed the failures back

Ask the assistant for two more versions of the page and save them as site/v2.html and site/v3.html. Run the checker on all three. It is a tiny bench: same request, several generations, one verdict each.

For any page that fails, paste the error lines back to the assistant (“Your page was rejected: …”), save the new version and check again. Note how many rounds each page needs. That retry-with-feedback loop is the harness at work: the model proposes, the code decides.

```shell
python check_page.py site/index.html site/v2.html site/v3.html
```

### Add regression gates

Save this as test_check_page.py next to check_page.py. These tests protect the rules themselves: any change to the checker, or any new page, must keep them green before it ships.

```python
# test_check_page.py: regression gates for the page harness.
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
        self.assertTrue(check(self.page("Sure! Here is your page:\n" + GOOD)))

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
    unittest.main()
```

### Run the gates, then loosen a rule

Run the tests from the folder that contains site. All of them should pass once your index.html is fixed. Now comment out the alt-text check in check_page.py, as a hurried change might, and run them again: the alt-text test fails. The gate caught a weakened rule before it shipped. Put the check back.

```shell
python -m unittest test_check_page -v
```

### Write it up

As in the course assignment, write 250 to 500 words on the process and on how your organisation could use vibe coding, with two screenshots: the mockup and the page in your browser. Add one paragraph on what the harness caught, and which rule you would need before letting anyone vibe-code something that touches real data.

## Checklist

- I generated a mockup and turned it into an index.html that opens in my browser
- I listed the page's invariants, including one rule of my own, before reading the code
- check_page.py prints PASS or FAIL with reasons for each generated page
- I fed at least one failure back to the assistant and got a page that passes
- The tests pass, and one fails when I remove a check
- My write-up has both screenshots and says what the harness caught
