import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BarChart3,
  Bot,
  Cable,
  LayoutDashboard,
  Package,
  Settings,
  Wrench,
  BookOpen,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  keywords?: string;
  group: "workspace" | "operations" | "admin";
};

export const dashboardNav: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, group: "workspace", keywords: "home" },
  { href: "/dashboard/agent", label: "Agent console", icon: Bot, group: "workspace", keywords: "chat tools" },
  { href: "/dashboard/tools", label: "Tool registry", icon: Wrench, group: "operations", keywords: "functions api" },
  { href: "/dashboard/knowledge", label: "Knowledge", icon: BookOpen, group: "operations", keywords: "kb articles" },
  { href: "/dashboard/orders", label: "Orders", icon: Package, group: "operations", keywords: "crm ord" },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3, group: "operations", keywords: "deflection" },
  { href: "/dashboard/activity", label: "Audit log", icon: Activity, group: "admin", keywords: "trace" },
  { href: "/dashboard/integrations", label: "Integrations", icon: Cable, group: "admin", keywords: "openai zendesk" },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, group: "admin", keywords: "model" },
];

export const navGroups: { id: NavItem["group"]; label: string }[] = [
  { id: "workspace", label: "Workspace" },
  { id: "operations", label: "Operations" },
  { id: "admin", label: "Administration" },
];
