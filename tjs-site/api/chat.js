const SYSTEM_PROMPT = `You are Forno, TJ's Pizza Products pizza expert. Keep answers under 100 words. Be warm and practical.
TJ's products: Frozen Dough Balls (150g-600g, vegan), Par-Baked Bases (6-9in), GF Range, Garlic Butter & Cheese, Square Base, DinoBite Kids. No preservatives, no soy, no milk. Contact Jeff: 0402 091 718.
Pizza knowledge: Neapolitan (450C+ wood fire, 60-90s), NY (280-300C, 12-15min), home oven (250-280C, 8-12min), wood fire (400C+, 60-90s). Never give from-scratch dough recipes.`;

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Accept only user/assistant text messages from the client — model,
  // system prompt and token cap are fixed server-side.
  const messages = Array.isArray(req.body?.messages) ? req.body.messages : null;
  if (
    !messages ||
    messages.length === 0 ||
    messages.length > 20 ||
    !messages.every(
      (m) =>
        m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.length <= 2000
    )
  ) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic error:', error);
      return res.status(502).json({ error: 'AI service unavailable' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Anthropic API error:', err);
    return res.status(500).json({ error: 'Failed to reach AI service' });
  }
}
