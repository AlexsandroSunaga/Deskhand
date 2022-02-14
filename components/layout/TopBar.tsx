"use client";

import { Search } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MobileNavTrigger } from "@/components/layout/MobileNav";
import { useShell } from "@/components/providers/ShellProvider";

export function TopBar({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}) {
  const { setCommandOpen } = useShell();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 backdrop-blur-md px-4 sm:px-6 py-3 flex justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <MobileNavTrigger />
        <div className="min-w-0">
          {breadcrumbs?.length ? <Breadcrumbs items={breadcrumbs} /> : null}
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 truncate">{title}</h1>
          {subtitle && <p className="text-xs sm:text-sm text-slate-500 truncate">{subtitle}</p>}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 hover:border-cyan-300"
      >
        <Search className="h-4 w-4" /> ⌘K
      </button>
    </header>
  );
}
