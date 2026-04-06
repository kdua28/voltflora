require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const axios   = require('axios');
const { computeAudit } = require('./auditEngine');

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.post('/api/audit', async (req, res) => {
  console.log('Audit request received:', req.body);
  try {
    const formData   = req.body;
    const computed   = computeAudit(formData);

    const prompt = buildPrompt(formData, computed);

    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 800,
      },
      { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } }
    );

    console.log('Groq response received');
    const aiText = groqRes.data.choices[0].message.content;
    console.log('AI text:', aiText);

    let aiJson = {};
    try {
      const clean = aiText.replace(/```json|```/g, '').trim();
      aiJson = JSON.parse(clean);
    } catch(e) {
      console.log('JSON parse failed:', e.message);
      aiJson = {};
    }

    res.json({ ...computed, ...aiJson, success: true });

  } catch(err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

const SYSTEM_PROMPT = `You are VoltFlora, an energy auditor AI.
Respond with ONLY a JSON object — no backticks, no preamble.
Return exactly: {
  "findings": [{"title":"...","desc":"...","severity":"high|med|low","savingsUSD":number}],
  "recommendations": [{"action":"...","roi":"..."}],
  "impactStatement": "...",
  "fullAnalysis": "..."
}
findings must have exactly 3 items. recommendations must have exactly 4 items.`;

function buildPrompt(d, c) {
  return `Audit this business:
Name: ${d.bizName}, Type: ${d.bizType}, City: ${d.bizCity}
Size: ${d.sqft} sqft | Monthly bill: $${d.monthlyBill}
Hours/week: ${d.hoursPerWeek} | Gas: ${d.hasGas}
Lighting: ${(d.lighting||[]).join(', ')} | HVAC: ${d.hvac}
Equipment: ${(d.equipment||[]).join(', ')}
Existing measures: ${(d.existing||[]).join(', ')}
Computed EUI: ${c.euiActual} vs EPA median ${c.euiBenchmark} kBtu/sqft/yr
Estimated annual savings potential: $${c.annualSavingsLow}-$${c.annualSavingsHigh}`;
}

app.listen(process.env.PORT || 5000, () =>
  console.log('VoltFlora server running on port 5000'));