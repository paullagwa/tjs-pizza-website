const esc = (s) =>
  String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, business, phone, email, product, message, website } = req.body || {};

  // Honeypot — bots fill the hidden field; pretend success, send nothing
  if (website) {
    return res.status(200).json({ success: true });
  }

  if (!name || !business || !phone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if ([name, business, phone, email, product].some((f) => String(f || '').length > 200) || String(message || '').length > 3000) {
    return res.status(400).json({ error: 'Field too long' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const row = (label, value) =>
    `<tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold;vertical-align:top">${label}:</td><td style="padding:8px 0">${value || '—'}</td></tr>`;

  const emailBody = {
    from: "TJs Website <enquiries@tjspizzaproducts.com.au>",
    to: ['tjspizza@live.com.au'],
    subject: `Wholesale enquiry — ${esc(name)} (${esc(business)})`,
    html: `
      <h2>New wholesale enquiry from the website</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
        ${row('Name', esc(name))}
        ${row('Business', esc(business))}
        ${row('Phone', `<a href="tel:${esc(phone)}">${esc(phone)}</a>`)}
        ${row('Email', email ? `<a href="mailto:${esc(email)}">${esc(email)}</a>` : '')}
        ${row('Product interest', esc(product))}
        ${row('Message', esc(message))}
      </table>
    `,
  };
  if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailBody.reply_to = email;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
