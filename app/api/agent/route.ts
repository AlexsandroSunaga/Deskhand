import { runAgent } from "@/lib/tools";
import { NextResponse } from "next/server";

const AGENT_API =
  process.env.AGENT_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8001";

export async function POST(req: Request) {
  const { message } = (await req.json()) as { message?: string };
  if (!message?.trim()) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${AGENT_API}/api/v1/agent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.trim() }),
    });
    const data = await res.json();
    if (res.ok) {
      return NextResponse.json({
        reply: data.reply,
        steps: data.steps,
      });
    }
  } catch {
    // fall through to in-process router when API is offline
  }

  const result = runAgent(message.trim());
  return NextResponse.json(result);
}
