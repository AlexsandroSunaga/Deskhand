from __future__ import annotations

import re
from typing import Any

from src.models.schemas.agent import ToolStep

ORDERS: dict[str, dict[str, str]] = {
    "ORD-1001": {"status": "shipped", "eta": "2026-10-08", "customer": "Northwind Trading"},
    "ORD-1002": {"status": "processing", "eta": "2026-10-12", "customer": "Helio Labs"},
}

KB_ARTICLES = [
    {
        "id": "kb-1",
        "title": "Returns & refunds",
        "keywords": ["refund", "return"],
        "excerpt": "Refunds within 5–7 business days after warehouse receipt.",
    },
    {
        "id": "kb-2",
        "title": "Shipping & tracking",
        "keywords": ["shipping", "track"],
        "excerpt": "Tracking link in confirmation email; use get_order_status for live ETA.",
    },
    {
        "id": "kb-3",
        "title": "Password reset",
        "keywords": ["password", "reset"],
        "excerpt": "Settings → Security → Send reset link (MFA required).",
    },
]

TOOL_DEFINITIONS = [
    {
        "name": "search_knowledge",
        "description": "Search internal KB articles for policy and how-to answers.",
        "parameters": ["query: string"],
    },
    {
        "name": "get_order_status",
        "description": "Look up fulfillment status and ETA by order ID (ORD-####).",
        "parameters": ["orderId: string"],
    },
    {
        "name": "create_escalation",
        "description": "Open a human queue ticket when automation cannot resolve.",
        "parameters": ["summary: string", "priority: low | normal | high"],
    },
]


def search_knowledge(query: str) -> str:
    q = query.lower()
    for article in KB_ARTICLES:
        if any(k in q for k in article["keywords"]):
            return article["excerpt"]
    return "No KB article matched. Escalate to human support@acme-example.com."


def get_order_status(order_id: str) -> str:
    key = order_id.upper().strip()
    row = ORDERS.get(key)
    if not row:
        return f"Order {key} not found."
    return f"Order {key} ({row['customer']}): status={row['status']}, ETA={row['eta']}"


def create_escalation(summary: str) -> str:
    return f'Escalation #8843 created — priority=normal — "{summary[:80]}"'


def run_agent(message: str) -> dict[str, Any]:
    steps: list[ToolStep] = []
    lower = message.lower()

    order_match = re.search(r"ord-\d+", message, re.I)
    if order_match:
        order_id = order_match.group(0).upper()
        output = get_order_status(order_id)
        steps.append(ToolStep(tool="get_order_status", input={"orderId": order_id}, output=output))
        return {"reply": output, "steps": steps}

    if any(k in lower for k in ("escalat", "human", "speak to")):
        out = create_escalation(message)
        steps.append(
            ToolStep(
                tool="create_escalation",
                input={"summary": message, "priority": "normal"},
                output=out,
            )
        )
        return {"reply": out, "steps": steps}

    if any(k in lower for k in ("order", "ship", "track")):
        kb_out = search_knowledge(message)
        steps.append(ToolStep(tool="search_knowledge", input={"query": message}, output=kb_out))
        order_out = get_order_status("ORD-1001")
        steps.append(
            ToolStep(tool="get_order_status", input={"orderId": "ORD-1001"}, output=order_out)
        )
        return {"reply": f"{kb_out}\n\nExample: {order_out}", "steps": steps}

    kb = search_knowledge(message)
    steps.append(ToolStep(tool="search_knowledge", input={"query": message}, output=kb))
    if "Escalate" in kb:
        esc = create_escalation(message)
        steps.append(
            ToolStep(
                tool="create_escalation",
                input={"summary": message, "priority": "normal"},
                output=esc,
            )
        )
        return {"reply": f"{kb}\n\n{esc}", "steps": steps}
    return {"reply": kb, "steps": steps}


def list_orders() -> list[dict[str, str]]:
    return [{"id": oid, **row} for oid, row in ORDERS.items()]
