"use client";

import { CheckCircle2, Loader2, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export type TraceState = "pending" | "running" | "done";

export function ToolTraceCard({
  tool,
  input,
  output,
  state,
}: {
  tool: string;
  input: Record<string, unknown>;
  output?: string;
  state: TraceState;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3 text-xs",
        state === "running" && "border-emerald-500/40 bg-emerald-500/5",
        state === "done" && "border-slate-700 bg-slate-900/50",
        state === "pending" && "border-slate-800 opacity-60"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-200 font-medium">
          <Wrench className="h-3.5 w-3.5 text-emerald-400" />
          {tool}
        </div>
        {state === "running" && <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />}
        {state === "done" && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
        {state === "pending" && <Badge variant="outline">queued</Badge>}
      </div>
      <pre className="mt-2 text-[10px] text-slate-500 overflow-x-auto font-mono">
        {JSON.stringify(input, null, 2)}
      </pre>
      {output && (
        <p className="mt-2 text-slate-400 leading-relaxed border-t border-slate-800 pt-2">{output}</p>
      )}
    </div>
  );
}
