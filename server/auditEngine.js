// server/auditEngine.js
const { EPA_BENCHMARKS } = require('./epaData');


const KWH_RATE = 0.128;          // avg US commercial rate (EIA 2023)
const BTU_PER_KWH = 3412;        // thermodynamic conversion constant
const LBS_CO2_PER_KWH = 0.386;   // EPA eGRID 2023 national avg
const TONS_PER_LB = 0.0005;


function computeAudit(formData) {
  const { bizType, sqft, monthlyBill, hoursPerWeek } = formData;


  // Step 1: Estimate annual energy use
  const annualBill   = monthlyBill * 12;
  const annualKwh    = annualBill / KWH_RATE;
  const annualKbtu   = (annualKwh * BTU_PER_KWH) / 1000;
  const euiActual    = annualKbtu / sqft;


  // Step 2: Get EPA benchmark for this building type
  const benchmark    = EPA_BENCHMARKS[bizType] || EPA_BENCHMARKS['Other'];
  const euiBenchmark = benchmark.medianEUI;


  // Step 3: Calculate efficiency score (100 = at benchmark, lower = worse)
  const ratio        = euiBenchmark / euiActual;
  const score        = Math.min(100, Math.round(ratio * 65));


  // Step 4: Estimate savings potential (industry avg = 20-30% reducible)
  const wasteFraction    = Math.max(0, (euiActual - euiBenchmark) / euiActual);
  const savingsFraction  = Math.min(0.35, wasteFraction * 0.6 + 0.10);
  const annualSavings    = Math.round(annualBill * savingsFraction);


  // Step 5: CO2 impact
  const savingsKwh   = annualSavings / KWH_RATE;
  const co2Tons      = +(savingsKwh * LBS_CO2_PER_KWH * TONS_PER_LB).toFixed(2);
  const treesEquiv   = Math.round(co2Tons * 45);
  const carsEquiv    = +(co2Tons / 4.6).toFixed(1);


  return {
    euiActual: +euiActual.toFixed(1),
    euiBenchmark,
    efficiencyScore: score,
    annualBill,
    annualSavingsLow:  Math.round(annualSavings * 0.8),
    annualSavingsHigh: Math.round(annualSavings * 1.2),
    co2Tons,
    treesEquiv,
    carsEquiv,
  };
}


module.exports = { computeAudit };
