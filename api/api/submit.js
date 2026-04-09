export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  const { name, kid, email, note, photo, filename } = req.body;

  if (!name || !email || !photo) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  // Extract base64 data from data URI
  const base64Data = photo.replace(/^data:image\/\w+;base64,/, '');
  const mimeType = photo.match(/^data:(image\/\w+);base64,/)?.[1] || 'image/jpeg';

  const emailBody = {
    from: 'TJs Website <competitions@tjspizzaproducts.com.au>',
    to: ['tjspizza@live.com.au'],
    reply_to: email,
    subject: `🦕 DinoBite Competition Entry — ${name}`,
    html: `
      <h2>New DinoBite Competition Entry!</h2>
      <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">
        <tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold">Parent name:</td><td style="padding:8px 0">${name}</td></tr>
        <tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold">Child / Age:</td><td style="padding:8px 0">${kid}</td></tr>
        <tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold">Email:</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px 16px 8px 0;color:#666;font-weight:bold">About their pizza:</td><td style="padding:8px 0">${note || '—'}</td></tr>
      </table>
      <p style="margin-top:16px;font-family:sans-serif;font-size:14px;color:#666">Their pizza photo is attached below.</p>
    `,
    attachments: [
      {
        filename: filename || 'pizza-entry.jpg',
        content: base64Data,
        type: mimeType,
      }
    ]
  };

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
    console.error('Submit error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
