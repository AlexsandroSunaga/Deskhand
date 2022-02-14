"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";
import { auditEvents } from "@/lib/demo-data";

export default function ActivityPage() {
  return (
    <>
      <TopBar title="Audit log" subtitle="Tool invocations and playbook changes" />
      <div className="p-6 card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/90 text-xs uppercase text-slate-500 text-left">
            <tr>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Actor</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Target</th>
            </tr>
          </thead>
          <tbody>
            {auditEvents.map((e) => (
              <tr key={e.id} className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-xs text-slate-500">{new Date(e.at).toLocaleString()}</td>
                <td className="px-4 py-3">{e.actor}</td>
                <td className="px-4 py-3"><Badge variant="outline">{e.action}</Badge></td>
                <td className="px-4 py-3 text-slate-400">{e.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
