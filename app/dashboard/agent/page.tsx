"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { ToolTraceCard, type TraceState } from "@/components/agent/ToolTraceCard";
import { suggestedTickets } from "@/lib/demo-data";
import { cn } from "@/lib/cn";

type ToolStep = { tool: string; input: Record<string, unknown>; output: string };

type RunMessage = { id: number; role: "user" | "assistant"; content: string };

export default function AgentConsolePage() {
  const [input, setInput] = useState("Where is order ORD-1001?");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<RunMessage[]>([]);
  const [steps, setSteps] = useState<ToolStep[]>([]);
  const [traceStates, setTraceStates] = useState<TraceState[]>([]);
  const [error, setError] = useState("");

  async function animateSteps(dataSteps: ToolStep[]) {
    setSteps(dataSteps);
    const states: TraceState[] = dataSteps.map(() => "pending");
    setTraceStates(states);
    for (let i = 0; i < dataSteps.length; i++) {
      setTraceStates((prev) => prev.map((s, j) => (j === i ? "running" : j < i ? "done" : s)));
      await new Promise((r) => setTimeout(r, 450));
      setTraceStates((prev) => prev.map((s, j) => (j === i ? "done" : s)));
    }
  }

  async function run(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setLoading(true);
    setError("");
    setSteps([]);
    setTraceStates([]);
    setMessages((m) => [...m, { id: Date.now(), role: "user", content: msg }]);
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Agent failed");
      await animateSteps(data.steps ?? []);
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <TopBar
        title="Agent console"
        subtitle="Conversation center · tool trace inspector (Automatos-style)"
        breadcrumbs={[{ label: "Workspace", href: "/dashboard" }, { label: "Agent" }]}
      />
      <div className="flex flex-1 min-h-0 h-[calc(100vh-4.5rem)]">
        <section className="flex-1 flex flex-col min-w-0 border-r border-slate-200 bg-white">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <div className="text-center mt-16 text-slate-500">
                <p className="text-lg text-slate-300">Run a support ticket through the tool router</p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {suggestedTickets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => run(p)}
                      className="text-xs rounded-full border border-slate-700 px-3 py-2 hover:border-emerald-500/40"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("max-w-xl text-sm", m.role === "user" ? "ml-auto" : "")}
              >
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3",
                    m.role === "user"
                      ? "bg-cyan-50 border border-cyan-200 text-slate-800"
                      : "bg-slate-50 border border-slate-200 text-slate-800"
                  )}
                >
                  <p className="text-[10px] uppercase text-slate-500 mb-1">{m.role}</p>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </motion.div>
            ))}
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
          <div className="p-4 border-t border-slate-800 flex gap-2">
            <textarea
              className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm min-h-[44px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), run())}
            />
            <Button onClick={() => run()} disabled={loading}>{loading ? "Running…" : "Run"}</Button>
          </div>
        </section>
        <aside className="hidden md:flex w-[min(400px,40vw)] flex-col bg-[#0c1222] text-slate-200 border-l border-cyan-900/40">
          <div className="p-4 border-b border-slate-800">
            <h3 className="font-semibold text-sm">Tool trace</h3>
            <p className="text-xs text-slate-500 mt-1">Pending → running → completed</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {steps.length === 0 && <p className="text-sm text-slate-600">Traces appear after each run.</p>}
            {steps.map((s, i) => (
              <ToolTraceCard
                key={`${s.tool}-${i}`}
                tool={s.tool}
                input={s.input}
                output={s.output}
                state={traceStates[i] ?? "done"}
              />
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
