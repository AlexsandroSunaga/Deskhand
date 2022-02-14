"use client";

import { TopBar } from "@/components/layout/TopBar";
import { Badge } from "@/components/ui/Badge";
import { listOrders } from "@/lib/tools";

export default function OrdersPage() {
  const orders = listOrders();

  return (
    <>
      <TopBar title="Orders" subtitle="Mock OMS data for get_order_status tool" />
      <div className="p-6 card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-900/90 text-slate-500 text-xs uppercase text-left">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">ETA</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-emerald-300">{o.id}</td>
                <td className="px-4 py-3">{o.customer}</td>
                <td className="px-4 py-3">
                  <Badge variant={o.status === "shipped" ? "success" : "warning"}>{o.status}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-400">{o.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
