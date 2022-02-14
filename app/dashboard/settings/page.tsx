"use client";

import { TopBar } from "@/components/layout/TopBar";

export default function SettingsPage() {
  return (
    <>
      <TopBar title="Settings" subtitle="Agent policy and model routing" />
      <div className="p-6 max-w-xl space-y-6">
        <div className="card rounded-2xl p-5">
          <label className="text-sm text-slate-400">Default model (when LLM enabled)</label>
          <select className="mt-2 w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm">
            <option>gpt-4o-mini</option>
            <option>gpt-4o</option>
          </select>
        </div>
        <div className="card rounded-2xl p-5 text-sm text-slate-400">
          Public repo uses a <strong className="text-slate-200">deterministic router</strong> in{" "}
          <code className="text-emerald-300">lib/tools.ts</code> so demos work without API keys. On client projects,
          replace with OpenAI / Anthropic tool-calling and persist traces in your datastore.
        </div>
      </div>
    </>
  );
}
