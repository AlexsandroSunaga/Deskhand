"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TopBar } from "@/components/layout/TopBar";
import { deflectionTrend } from "@/lib/demo-data";

export default function AnalyticsPage() {
  return (
    <>
      <TopBar title="Analytics" subtitle="Deflection vs escalation (illustrative)" />
      <div className="p-6 space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="card rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase">Automated resolves</p>
            <p className="text-2xl font-semibold mt-2">233</p>
          </div>
          <div className="card rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase">Escalations</p>
            <p className="text-2xl font-semibold mt-2">37</p>
          </div>
          <div className="card rounded-xl p-4">
            <p className="text-xs text-slate-500 uppercase">Avg tools / ticket</p>
            <p className="text-2xl font-semibold mt-2">1.8</p>
          </div>
        </div>
        <div className="card rounded-2xl p-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={deflectionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155" }} />
              <Area type="monotone" dataKey="automated" stroke="#34d399" fill="#10b981" fillOpacity={0.2} />
              <Area type="monotone" dataKey="escalated" stroke="#f87171" fill="#ef4444" fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
