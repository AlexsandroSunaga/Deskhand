import Link from "next/link";
import { ArrowRight, Bot, Cable, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  { icon: Bot, title: "Agent console", desc: "Light workspace with dark tool-trace inspector." },
  { icon: Wrench, title: "Tool registry", desc: "KB, orders, escalation — wired for real APIs." },
  { icon: Cable, title: "Integrations", desc: "Zendesk / Shopify / OpenAI surfaces." },
  { icon: Shield, title: "Audit log", desc: "Ops visibility for automation rollouts." },
];

export default function MarketingPage() {
  return (
    <div className="theme-support-marketing stripe-bg min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-slate-900 pointer-events-none" />
      <header className="relative max-w-6xl mx-auto px-6 py-6 flex justify-between items-center border-b border-white/5">
        <div>
          <p className="text-xs uppercase tracking-widest text-cyan-400 font-bold">ACME Desk</p>
          <p className="font-bold text-lg text-white">Support Ops</p>
        </div>
        <Link href="/dashboard">
          <Button variant="secondary" size="sm" className="!bg-cyan-600 !text-white !border-0 hover:!bg-cyan-500">
            Open console
          </Button>
        </Link>
      </header>
      <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-20">
        <p className="text-sm text-cyan-200/60">Agents & tools · Alexsandro Sunaga</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-4 max-w-3xl leading-tight text-white">
          Customer support that shows{" "}
          <span className="text-cyan-400">every tool call</span>
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl">
          Cyan-on-navy marketing · light ops dashboard · Zendesk-style contrast — visually distinct from the RAG product.
        </p>
        <Link href="/dashboard/agent" className="inline-block mt-8">
          <Button size="lg" className="gap-2">
            Try agent console <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
      <section className="relative max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-5">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="rounded-xl border border-cyan-900/50 bg-slate-900/60 p-6">
              <Icon className="h-8 w-8 text-cyan-400 mb-4" />
              <h3 className="font-bold text-lg text-white">{f.title}</h3>
              <p className="text-sm text-slate-400 mt-2">{f.desc}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
