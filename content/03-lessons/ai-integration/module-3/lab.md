---
kind: lab
based_on: content/01-extracted/02_Modules/Module_3_Complete.md, content/01-extracted/02_Modules/Module_3_Complements.md
based_on_hash: 81331eb54889
kicker: Lab · Your own MCP server (Lab 2)
title: Build a plug with a fuse
duration: 40 minutes
bubble: Your own plug, with a fuse. Let's build it!
---
Write a small MCP server in Python with one read tool and one write tool, guard the write tool with a value ceiling, a velocity breaker and a kill switch, then drive it from the MCP Inspector.

## Prerequisites

- Python 3.10 or later
- Node.js 18 or later (the MCP Inspector runs through npx)
- A terminal and a text editor
- Optional: a desktop assistant that supports MCP servers

## Steps

### Set up the project

Create a folder and a virtual environment, then install the official MCP Python SDK with its command-line tools.

```shell
mkdir refund-desk && cd refund-desk
python -m venv .venv
# Windows: .venv\Scripts\activate    macOS/Linux: source .venv/bin/activate
pip install "mcp[cli]"
```

### Write the server

Save this as server.py. The type hints and docstrings become the tool schema every client sees. Logs go to stderr because stdout carries the protocol.

```python
# server.py: a minimal MCP server with one read tool and one guarded write tool.
import sys
import time
from pathlib import Path

from mcp.server.fastmcp import FastMCP

mcp = FastMCP("refund-desk")

ORDERS = {
    "A123": {"status": "shipped", "days_late": 5, "paid": 80.0},
    "B456": {"status": "delivered", "days_late": 0, "paid": 25.0},
}

MAX_REFUND = 30.0      # impact ceiling per refund; above it, a person decides
MAX_PER_HOUR = 60.0    # velocity limit: total refunded in a rolling hour
KILL_SWITCH = Path(__file__).with_name("KILL_SWITCH")  # file present = all writes stopped
refunds: list[tuple[float, float]] = []                # (timestamp, amount)


def alert(message: str) -> None:
    """Stand-in for paging the owner. Never print to stdout in a stdio server."""
    print(f"ALERT: {message}", file=sys.stderr)


@mcp.tool()
def get_order(order_id: str) -> dict:
    """Look up an order by id. Read-only."""
    return ORDERS.get(order_id, {"error": f"order {order_id} not found"})


@mcp.tool()
def issue_refund(order_id: str, amount: float) -> str:
    """Refund part of an order. Write action, guarded by a ceiling, a breaker and a kill switch."""
    if KILL_SWITCH.exists():
        return "BLOCKED: kill switch is on. No write actions until a person removes it."
    order = ORDERS.get(order_id)
    if order is None:
        return f"REFUSED: order {order_id} not found."
    ceiling = min(MAX_REFUND, order["paid"])
    if not 0 < amount <= ceiling:
        return f"REFUSED: amount must be above 0 and at most {ceiling:.2f}. Ask a person to approve."
    now = time.time()
    last_hour = sum(a for t, a in refunds if now - t < 3600)
    if last_hour + amount > MAX_PER_HOUR:
        KILL_SWITCH.touch()  # trip the breaker: freeze every write
        alert(f"refund velocity limit hit ({last_hour:.2f} this hour). Writes frozen.")
        return "TRIPPED: hourly limit reached. Writes are frozen and the owner is alerted."
    refunds.append((now, amount))
    return f"OK: refunded {amount:.2f} on order {order_id}."


if __name__ == "__main__":
    mcp.run()  # stdio transport by default
```

### Open it in the MCP Inspector

This starts your server and opens the Inspector in the browser (the first run asks to install it through npx). Connect, open the Tools tab and list the tools.

Read the JSON schema generated for each tool. That text is loaded into the model's context before it does anything: multiply it by every tool on every server and you see where schema bloat comes from.

```shell
mcp dev server.py
```

### Test, then trip the breaker

Call get_order with A123, then with Z999. Call issue_refund on A123 for 50: the ceiling refuses it. Then refund 25 three times: the third call trips the breaker, a KILL_SWITCH file appears next to server.py and the alert shows in the server log.

Try any refund now: it is blocked. Delete the KILL_SWITCH file by hand and refund 5: it goes through. A refund of 10 trips the breaker again, because the hourly budget still counts the earlier 50.

The file is a stand-in for the real thing. In production the kill switch revokes the agent's OAuth tokens and isolates its sandbox. What matters is the same: it works from outside the agent, which never gets a vote.

### Plug it into a desktop assistant (optional)

In an MCP-capable desktop assistant, add the server to its MCP configuration file with the full path to the Python inside your .venv and to server.py. Restart the assistant and ask: “Is order A123 late? If so, refund 20.” Watch it pick get_order, then issue_refund. Then ask for a refund of 40 and watch the ceiling hand the decision back to you.

```json
{
  "mcpServers": {
    "refund-desk": {
      "command": "C:/path/to/refund-desk/.venv/Scripts/python.exe",
      "args": ["C:/path/to/refund-desk/server.py"]
    }
  }
}
```

## Checklist

- My server runs and the Inspector lists both tools with their schemas
- get_order answers for a known id and returns an error for an unknown one
- A refund above the ceiling is refused and points to a person
- Repeated refunds trip the breaker, freeze writes and raise an alert
- Creating or deleting the KILL_SWITCH file stops or resumes writes without touching the agent
