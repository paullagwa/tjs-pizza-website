import { EMAIL_RE, clientIp, escapeHtml, rateLimit } from "@/lib/api/helpers";

const TO_INBOX = "tjspizza@live.com.au";
const FROM = "TJs Website <enquiries@tjspizzaproducts.com.au>";

export async function POST(req: Request) {
  if (!rateLimit(`contact:${clientIp(req)}`, { limit: 5, windowMs: 60_000 })) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, business, phone, email, product, message, website } = body;

  // Honeypot — pretend success, send nothing
  if (website) {
    return Response.json({ success: true });
  }

  if (!name || !business || !phone) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(String(email))) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (
    [name, business, phone, email, product].some(
      (f) => String(f ?? "").length > 200,
    ) ||
    String(message ?? "").length > 3000
  ) {
    return Response.json({ error: "Field too long" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Email service not configured" },
      { status: 500 },
    );
  }

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold;vertical-align:top">${label}:</td><td style="padding:8px 0">${value || "—"}</td></tr>`;

  const payload: Record<string, unknown> = {
    from: FROM,
    to: [TO_INBOX],
    subject: `Wholesale enquiry — ${escapeHtml(name)} (${escapeHtml(business)})`,
    html: `
      <h2>New wholesale enquiry from the website</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
        ${row("Name", escapeHtml(name))}
        ${row("Business", escapeHtml(business))}
        ${row("Phone", `<a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>`)}
        ${row("Email", email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "")}
        ${row("Product interest", escapeHtml(product))}
        ${row("Message", escapeHtml(message))}
      </table>
    `,
  };
  if (email && EMAIL_RE.test(String(email))) {
    payload.reply_to = email;
  }

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
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
