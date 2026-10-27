"use client";

import Link from "next/link";
import { BookOpen, Bot, Package, Wrench } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { auditEvents } from "@/lib/demo-data";
import { KB_ARTICLES, listOrders, TOOL_DEFINITIONS } from "@/lib/tools";

export default function OverviewPage() {
  const cards = [
    { label: "Registered tools", value: TOOL_DEFINITIONS.length, icon: Wrench, href: "/dashboard/tools" },
    { label: "Sample orders", value: listOrders().length, icon: Package, href: "/dashboard/orders" },
    { label: "Knowledge articles", value: KB_ARTICLES.length, icon: BookOpen, href: "/dashboard/knowledge" },
    { label: "Router", value: "Rule-based", icon: Bot, href: "/dashboard/agent" },
  ];

  return (
    <>
      <TopBar title="Overview" subtitle="Sample orders and knowledge articles" />
      <div className="p-6 space-y-8">
        <div className="card rounded-xl px-4 py-3 flex flex-wrap items-center gap-3 text-sm">
          <Badge variant="success">Rule-based router</Badge>
          <span className="text-slate-400">Replies come from keyword and order-number matching. There is no language model in this app.</span>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.label} href={c.href} className="card rounded-2xl p-5 hover:border-emerald-500/30 block">
                <div className="flex justify-between">
                  <p className="text-sm text-slate-500">{c.label}</p>
                  <Icon className="h-4 w-4 text-emerald-400" />
                </div>
                <p className="text-3xl font-semibold mt-3">{c.value}</p>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/agent"><Button>Open agent console</Button></Link>
          <Link href="/dashboard/tools"><Button variant="secondary">Tool registry</Button></Link>
        </div>
        <div className="card rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Recent audit</h2>
          <ul className="divide-y divide-slate-800 text-sm">
            {auditEvents.map((e) => (
              <li key={e.id} className="py-3 flex flex-wrap justify-between gap-2">
                <span className="text-slate-300">{e.action}</span>
                <span className="text-slate-500">{e.target}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
