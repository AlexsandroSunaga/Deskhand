import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-semibold transition-colors disabled:opacity-50",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        variant === "primary" && "bg-cyan-600 text-white hover:bg-cyan-500 shadow-sm shadow-cyan-900/20",
        variant === "secondary" && "bg-white text-slate-800 hover:bg-slate-50 border border-slate-300",
        variant === "ghost" && "text-slate-600 hover:bg-slate-200/60",
        variant === "danger" && "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200",
        className
      )}
      {...props}
    />
  );
}
