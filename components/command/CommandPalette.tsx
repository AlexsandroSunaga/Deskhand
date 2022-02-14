"use client";

import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { dashboardNav } from "@/lib/nav";
import { cn } from "@/lib/cn";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();

  function go(href: string) {
    onOpenChange(false);
    router.push(href);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-[18%] z-50 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2",
            "rounded-2xl border border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden"
          )}
        >
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <Command className="flex flex-col" loop>
            <Command.Input
              placeholder="Search console…"
              className="flex-1 h-12 w-full bg-transparent px-4 text-sm outline-none border-b border-slate-800"
            />
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="py-8 text-center text-sm text-slate-500">No results.</Command.Empty>
              {dashboardNav.map((item) => (
                <Command.Item
                  key={item.href}
                  value={`${item.label} ${item.keywords ?? ""}`}
                  onSelect={() => go(item.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm aria-selected:bg-emerald-500/15"
                >
                  <item.icon className="h-4 w-4 text-slate-400" />
                  {item.label}
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
