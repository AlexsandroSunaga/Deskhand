"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";

const providers = [
  { name: "OpenAI", purpose: "LLM tool router (optional upgrade)", configured: false },
  { name: "Zendesk", purpose: "Ticket sync", configured: false },
  { name: "Shopify", purpose: "Order webhooks", configured: false },
];

export default function IntegrationsPage() {
  return (
    <>
      <TopBar title="Integrations" subtitle="Connect CRM, OMS, and model providers" />
      <div className="p-6 grid md:grid-cols-2 gap-4">
        {providers.map((p) => (
          <div key={p.name} className="card rounded-2xl p-5 flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{p.purpose}</p>
            </div>
            <Badge variant={p.configured ? "success" : "warning"}>
              {p.configured ? "connected" : "demo"}
            </Badge>
          </div>
        ))}
      </div>
    </>
  );
}
