import { runAgent } from "@/lib/tools";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = (await req.json()) as { message?: string };
  if (!message?.trim()) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }
  const result = runAgent(message.trim());
  return NextResponse.json(result);
}
