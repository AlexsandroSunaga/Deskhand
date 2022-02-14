"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";
import { KB_ARTICLES } from "@/lib/tools";

export default function KnowledgePage() {
  return (
    <>
      <TopBar title="Knowledge" subtitle="Articles wired to search_knowledge tool" />
      <div className="p-6 card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/90 text-slate-500 text-xs uppercase text-left">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Keywords</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {KB_ARTICLES.map((a) => (
              <tr key={a.id} className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-xs">{a.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{a.excerpt}</p>
                </td>
                <td className="px-4 py-3 text-slate-400">{a.keywords.join(", ")}</td>
                <td className="px-4 py-3"><Badge variant="success">published</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
