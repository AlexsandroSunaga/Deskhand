"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";
import { TOOL_DEFINITIONS } from "@/lib/tools";

export default function ToolsPage() {
  return (
    <>
      <TopBar title="Tool registry" subtitle="Function definitions exposed to the agent runtime" />
      <div className="p-6 grid md:grid-cols-2 gap-4">
        {TOOL_DEFINITIONS.map((t) => (
          <div key={t.name} className="card rounded-2xl p-5">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-mono text-emerald-300">{t.name}</h3>
              <Badge variant="success">active</Badge>
            </div>
            <p className="text-sm text-slate-400 mt-2">{t.description}</p>
            <ul className="mt-4 text-xs font-mono text-slate-500 space-y-1">
              {t.parameters.map((p) => (
                <li key={p}>• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
