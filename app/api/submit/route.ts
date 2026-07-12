import { EMAIL_RE, clientIp, escapeHtml, rateLimit } from "@/lib/api/helpers";

const TO_INBOX = "tjspizza@live.com.au";
const FROM = "TJs Website <competitions@tjspizzaproducts.com.au>";
/** 5MB decoded — generous for a phone photo, small enough to bound abuse */
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

const MAGIC: Array<{ mime: string; bytes: number[] }> = [
  { mime: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
  { mime: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  // WebP: RIFF....WEBP — check RIFF prefix
  { mime: "image/webp", bytes: [0x52, 0x49, 0x46, 0x46] },
];

export async function POST(req: Request) {
  if (!rateLimit(`submit:${clientIp(req)}`, { limit: 3, windowMs: 60_000 })) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, kid, email, note, photo, filename, website } = body;

  // Honeypot
  if (website) {
    return Response.json({ success: true });
  }

  if (!name || !email || !photo) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(String(email))) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (
    [name, kid, filename].some((f) => String(f ?? "").length > 200) ||
    String(note ?? "").length > 2000
  ) {
    return Response.json({ error: "Field too long" }, { status: 400 });
  }

  const photoStr = String(photo);
  const match = photoStr.match(/^data:(image\/\w+);base64,([\s\S]+)$/);
  if (!match) {
    return Response.json({ error: "Invalid photo" }, { status: 400 });
  }
  const base64Data = match[2];
  // Base64 inflates by 4/3 — reject before decoding
  if (base64Data.length > (MAX_PHOTO_BYTES * 4) / 3 + 4) {
    return Response.json(
      { error: "Photo too large (5MB max)" },
      { status: 400 },
    );
  }
  let head: Uint8Array;
  try {
    head = Uint8Array.from(atob(base64Data.slice(0, 16)), (c) =>
      c.charCodeAt(0),
    );
  } catch {
    return Response.json({ error: "Invalid photo" }, { status: 400 });
  }
  const magic = MAGIC.find((m) =>
    m.bytes.every((b, i) => head[i] === b),
  );
  if (!magic) {
    return Response.json(
      { error: "Photo must be a JPEG, PNG or WebP image" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  const payload = {
    from: FROM,
    to: [TO_INBOX],
    reply_to: email,
    subject: `DinoBite Competition Entry — ${escapeHtml(name)}`,
    html: `
      <h2>New DinoBite Competition Entry!</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
        <tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold">Parent name:</td><td style="padding:8px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold">Child / Age:</td><td style="padding:8px 0">${escapeHtml(kid)}</td></tr>
        <tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold">Email:</td><td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold">About their pizza:</td><td style="padding:8px 0">${escapeHtml(note) || "—"}</td></tr>
      </table>
      <p style="margin-top:16px;font-family:sans-serif;font-size:14px;color:#666">Their pizza photo is attached below.</p>
    `,
    attachments: [
      {
        filename: String(filename || "pizza-entry.jpg").replace(/[^\w.-]/g, "_"),
        content: base64Data,
        type: magic.mime,
      },
    ],
  };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error("Resend error:", await res.text());
      return Response.json({ error: "Failed to send entry" }, { status: 500 });
    }
    return Response.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
