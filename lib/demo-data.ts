export const suggestedTickets = [
  "Where is order ORD-1001?",
  "What is your refund policy?",
  "How do I reset my password?",
  "Track shipping for ORD-1002",
];

export const auditEvents = [
  { id: 1, actor: "Agent runtime", action: "tool.invoke", target: "get_order_status(ORD-1001)", at: "2026-03-05T10:00:00Z" },
  { id: 2, actor: "Alexsandro Sunaga", action: "playbook.updated", target: "refund-policy-v3", at: "2026-03-04T15:30:00Z" },
  { id: 3, actor: "System", action: "escalation.created", target: "ticket #8842 → human queue", at: "2026-03-04T09:12:00Z" },
];

export const deflectionTrend = [
  { day: "Mon", automated: 42, escalated: 8 },
  { day: "Tue", automated: 51, escalated: 6 },
  { day: "Wed", automated: 38, escalated: 11 },
  { day: "Thu", automated: 55, escalated: 5 },
  { day: "Fri", automated: 47, escalated: 7 },
];
