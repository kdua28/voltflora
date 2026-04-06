// server/index.js
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
  try {
    const formData   = req.body;
    const computed   = computeAudit(formData);


    // Build prompt for Groq
    const prompt = buildPrompt(formData, computed);


    // Call Groq API
    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: prompt }
        ],
        temperature: 0.4,
        max_tokens: 800,
      },
      { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` } }
    );


    const aiText = groqRes.data.choices[0].message.content;
    let aiJson = {};
    try {
      const clean = aiText.replace(/```json|```/g, '').trim();
      aiJson = JSON.parse(clean);
    } catch(e) { aiJson = {}; }


    res.json({ ...computed, ...aiJson, success: true });


  } catch(err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


const SYSTEM_PROMPT = `You are VoltFlora, an energy auditor AI.
Respond with ONLY a JSON object — no backticks, no preamble.
Return exactly: {
  findings: [{title, desc, severity (high|med|low), savingsUSD}] (3 items),
  recommendations: [{action, roi}] (4 items),
  impactStatement: string,
  fullAnalysis: string (3-4 sentences)
}`


function buildPrompt(d, c) {
  return `Audit this business:
Name: ${d.bizName}, Type: ${d.bizType}, City: ${d.bizCity}
Size: ${d.sqft} sqft | Monthly bill: $${d.monthlyBill}
Hours/week: ${d.hoursPerWeek} | Gas: ${d.hasGas}
Lighting: ${(d.lighting||[]).join(', ')} | HVAC: ${d.hvac}
Equipment: ${(d.equipment||[]).join(', ')}
Existing measures: ${(d.existing||[]).join(', ')}
Computed EUI: ${c.euiActual} vs EPA median ${c.euiBenchmark} kBtu/sqft/yr
Estimated annual savings potential: $${c.annualSavingsLow}-$${c.annualSavingsHigh}`
}


app.listen(process.env.PORT || 5000, () =>
  console.log('VoltFlora server running on port 5000'));
