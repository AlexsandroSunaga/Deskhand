"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, Headphones, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { dashboardNav, navGroups } from "@/lib/nav";
import { useShell } from "@/components/providers/ShellProvider";

export function AppSidebar({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname();
  const { sidebarCollapsed, setSidebarCollapsed, setCommandOpen, setMobileNavOpen } = useShell();
  const collapsed = mobile ? false : sidebarCollapsed;

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-cyan-900/40 bg-[#0c1222] text-slate-200 h-full shadow-xl",
        mobile ? "w-full" : "hidden lg:flex",
        !mobile && (collapsed ? "w-[72px]" : "w-64")
      )}
    >
      <div className={cn("p-4 border-b border-cyan-900/30", collapsed && "px-2")}>
        {!collapsed && (
          <>
            <div className="flex items-center gap-2 text-cyan-400">
              <Headphones className="h-4 w-4" />
              <p className="text-[10px] font-bold tracking-widest uppercase">Support Ops</p>
            </div>
            <h2 className="text-base font-bold text-white mt-1">ACME Desk</h2>
          </>
        )}
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className={cn(
            "mt-3 w-full flex items-center gap-2 rounded-md border border-cyan-800/50 bg-cyan-950/30 px-3 py-2 text-xs text-cyan-200/70 hover:text-cyan-100",
            collapsed && "justify-center px-2"
          )}
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          {!collapsed && <span className="flex-1 text-left">Quick search</span>}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.id}>
            {!collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {group.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {dashboardNav
                .filter((n) => n.group === group.id)
                .map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => mobile && setMobileNavOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
                          collapsed && "justify-center",
                          active
                            ? "bg-cyan-500/20 text-cyan-100 border-l-2 border-cyan-400"
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        {!collapsed && item.label}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>
      {!mobile && (
        <div className="p-3 border-t border-cyan-900/30 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="rounded-md p-2 text-slate-500 hover:bg-white/5"
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
          {!collapsed && <p className="text-[10px] text-slate-600">Portfolio · Alexsandro</p>}
        </div>
      )}
    </aside>
  );
}
