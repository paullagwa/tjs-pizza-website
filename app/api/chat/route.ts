import { clientIp, rateLimit } from "@/lib/api/helpers";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_TOKENS = 300;

const SYSTEM_PROMPT = `You are Forno, TJ's Pizza Products pizza expert. Keep answers under 100 words. Be warm and practical.
TJ's products: Frozen Dough Balls (150g-600g, vegan), Par-Baked Bases (6-9in), GF Range, Garlic Butter & Cheese, Square Base, DinoBite Kids. No preservatives, no soy, no milk. Contact Jeff: 0402 091 718.
Pizza knowledge: Neapolitan (450C+ wood fire, 60-90s), NY (280-300C, 12-15min), home oven (250-280C, 8-12min), wood fire (400C+, 60-90s). Never give from-scratch dough recipes.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isValidMessage(m: unknown): m is ChatMessage {
  if (typeof m !== "object" || m === null) return false;
  const msg = m as Record<string, unknown>;
  return (
    (msg.role === "user" || msg.role === "assistant") &&
    typeof msg.content === "string" &&
    msg.content.length > 0 &&
    msg.content.length <= 2000
  );
}

export async function POST(req: Request) {
  if (!rateLimit(`chat:${clientIp(req)}`, { limit: 10, windowMs: 60_000 })) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : null;
  if (
    !messages ||
    messages.length === 0 ||
    messages.length > 20 ||
    !messages.every(isValidMessage)
  ) {
    return Response.json({ error: "Invalid messages" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!res.ok) {
      console.error("Anthropic error:", await res.text());
      return Response.json({ error: "AI service unavailable" }, { status: 502 });
    }

    const data = (await res.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const reply =
      data.content?.find((b) => b.type === "text")?.text ??
      "Call Jeff on 0402 091 718 — he will sort you out!";
    // Return only what the widget needs — no upstream metadata
    return Response.json({ reply });
  } catch (err) {
    console.error("Anthropic API error:", err);
    return Response.json({ error: "Failed to reach AI service" }, { status: 500 });
  }
}
