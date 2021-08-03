export type ToolStep = {
  tool: string;
  input: Record<string, unknown>;
  output: string;
};

export type ToolDefinition = {
  name: string;
  description: string;
  parameters: string[];
};

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: "search_knowledge",
    description: "Search internal KB articles for policy and how-to answers.",
    parameters: ["query: string"],
  },
  {
    name: "get_order_status",
    description: "Look up fulfillment status and ETA by order ID (ORD-####).",
    parameters: ["orderId: string"],
  },
  {
    name: "create_escalation",
    description: "Open a human queue ticket when automation cannot resolve.",
    parameters: ["summary: string", "priority: low | normal | high"],
  },
];

const ORDERS: Record<string, { status: string; eta: string; customer: string }> = {
  "ORD-1001": { status: "shipped", eta: "2026-10-08", customer: "Northwind Trading" },
  "ORD-1002": { status: "processing", eta: "2026-10-12", customer: "Helio Labs" },
};

export const KB_ARTICLES = [
  {
    id: "kb-1",
    title: "Returns & refunds",
    keywords: ["refund", "return"],
    excerpt: "Refunds within 5–7 business days after warehouse receipt.",
  },
  {
    id: "kb-2",
    title: "Shipping & tracking",
    keywords: ["shipping", "track"],
    excerpt: "Tracking link in confirmation email; use get_order_status for live ETA.",
  },
  {
    id: "kb-3",
    title: "Password reset",
    keywords: ["password", "reset"],
    excerpt: "Settings → Security → Send reset link (MFA required).",
  },
];

const KB: { keywords: string[]; answer: string }[] = KB_ARTICLES.map((a) => ({
  keywords: a.keywords,
  answer: a.excerpt,
}));

export function searchKnowledge(query: string): string {
  const q = query.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((k) => q.includes(k))) return entry.answer;
  }
  return "No KB article matched. Escalate to human support@acme-example.com.";
}

export function getOrderStatus(orderId: string): string {
  const key = orderId.toUpperCase().trim();
  const row = ORDERS[key];
  if (!row) return `Order ${key} not found.`;
  return `Order ${key} (${row.customer}): status=${row.status}, ETA=${row.eta}`;
}

export function createEscalation(summary: string): string {
  return `Escalation #8843 created — priority=normal — "${summary.slice(0, 80)}"`;
}

export function runAgent(message: string): { reply: string; steps: ToolStep[] } {
  const steps: ToolStep[] = [];
  const lower = message.toLowerCase();

  if (/ord-\d+/i.test(message)) {
    const id = message.match(/ord-\d+/i)![0].toUpperCase();
    const output = getOrderStatus(id);
    steps.push({ tool: "get_order_status", input: { orderId: id }, output });
    return { reply: output, steps };
  }

  if (lower.includes("escalat") || lower.includes("human") || lower.includes("speak to")) {
    const out = createEscalation(message);
    steps.push({ tool: "create_escalation", input: { summary: message, priority: "normal" }, output: out });
    return { reply: out, steps };
  }

  if (lower.includes("order") || lower.includes("ship") || lower.includes("track")) {
    steps.push({
      tool: "search_knowledge",
      input: { query: message },
      output: searchKnowledge(message),
    });
    steps.push({
      tool: "get_order_status",
      input: { orderId: "ORD-1001" },
      output: getOrderStatus("ORD-1001"),
    });
    return {
      reply: `${steps[0].output}\n\nExample: ${steps[1].output}`,
      steps,
    };
  }

  const kb = searchKnowledge(message);
  steps.push({ tool: "search_knowledge", input: { query: message }, output: kb });
  if (kb.includes("Escalate")) {
    const esc = createEscalation(message);
    steps.push({ tool: "create_escalation", input: { summary: message, priority: "normal" }, output: esc });
    return { reply: `${kb}\n\n${esc}`, steps };
  }
  return { reply: kb, steps };
}

export function listOrders() {
  return Object.entries(ORDERS).map(([id, row]) => ({ id, ...row }));
}
