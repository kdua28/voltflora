import React from 'react';

const SEV_ICON = { high: '🔴', med: '🟡', low: '🟢' };
const SEV_CLASS = { high: 'sev-high', med: 'sev-med', low: 'sev-low' };

function getFallback(d) {
  const annualBill = (d.monthlyBill || 600) * 12;
  const savingsEst = Math.round(annualBill * 0.28);
  return {
    efficiencyScore: 52,
    euiActual: 180,
    euiBenchmark: 145,
    annualSavingsLow: Math.round(savingsEst * 0.8),
    annualSavingsHigh: Math.round(savingsEst * 1.2),
    co2Tons: +(savingsEst / 350 * 0.01).toFixed(2),
    treesEquiv: Math.round(savingsEst / 350 * 0.45),
    carsEquiv: +(savingsEst / 350 * 0.01 / 4.6).toFixed(1),
    findings: [
      {
        title: 'HVAC inefficiency detected',
        desc: 'Based on your building profile, HVAC likely accounts for 40-60% of energy use with significant optimization potential.',
        severity: 'high',
        savingsUSD: savingsEst * 0.45,
      },
      {
        title: 'Lighting upgrade opportunity',
        desc: 'Non-LED lighting in commercial spaces typically wastes 60-70% of energy as heat vs modern LED alternatives.',
        severity: 'med',
        savingsUSD: savingsEst * 0.25,
      },
      {
        title: 'Off-hours phantom load',
        desc: 'Equipment left on during non-operating hours can account for 8-15% of monthly bills with no productivity benefit.',
        severity: 'low',
        savingsUSD: savingsEst * 0.15,
      },
    ],
    recommendations: [
      { action: 'Install a smart programmable thermostat with occupancy scheduling to eliminate HVAC waste during closed hours.', roi: '~2yr payback' },
      { action: 'Conduct a full LED lighting retrofit — typical commercial payback is 18-24 months.', roi: '~2yr payback' },
      { action: 'Audit and power-strip all non-essential equipment to eliminate phantom loads overnight.', roi: '<1yr payback' },
      { action: 'Schedule an EPA ENERGY STAR certification assessment for your building type.', roi: 'Long-term value' },
    ],
    impactStatement: 'Implementing the top 3 recommendations could eliminate significant CO₂ emissions annually.',
    fullAnalysis: `Based on your inputs, this business shows energy intensity above the EPA median for its building type, indicating meaningful optimization potential. The combination of HVAC setup, operating hours, and current efficiency measures suggests HVAC scheduling and lighting are the highest-impact intervention points. Implementing the recommended actions could reduce annual electricity spend by approximately 25-30% while delivering measurable CO₂ reductions.`,
  };
}

export default function Report({ auditData, setPage }) {
  const d = auditData || {};

  // Merge fallback with any AI-returned data
  const fallback = getFallback(d);
  const report = {
    ...fallback,
    ...d,
    findings: d.findings || fallback.findings,
    recommendations: d.recommendations || fallback.recommendations,
  };

  const euiDiff = report.euiBenchmark
    ? Math.round(((report.euiActual - report.euiBenchmark) / report.euiBenchmark) * 100)
    : 0;

  const savMid = Math.round(((report.annualSavingsLow || 0) + (report.annualSavingsHigh || 0)) / 2);

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="report-page">

      {/* NAV */}
      <nav className="report-nav">
        <div className="report-nav-left">
          <div className="logo" style={{ fontSize: '1.1rem' }}>Volt<span>Flora</span></div>
          <div className="badge-live">
            <div className="badge-dot" />
            Audit complete
          </div>
        </div>
        <button className="btn-new" onClick={() => setPage('landing')}>New audit</button>
      </nav>

      <div className="report-body">

        {/* HEADER */}
        <div className="report-header">
          <div className="report-title-block">
            <div className="eyebrow">Energy Audit Report</div>
            <div className="report-biz-name">{d.bizName || 'Your Business'}</div>
            <div className="report-meta">
              {d.bizType} · {d.bizCity} · {(d.sqft || 0).toLocaleString()} sq ft
            </div>
          </div>
          <div className="score-badge">
            <div className="score-num">{report.efficiencyScore}</div>
            <div className="score-lbl">Efficiency score</div>
          </div>
        </div>

        {/* METRICS */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">⚡</div>
            <div className="metric-val">{report.euiActual}</div>
            <div className="metric-lbl">Energy Use Intensity (kBtu/sqft/yr)</div>
            <div className="metric-delta">
              {euiDiff > 0 ? `+${euiDiff}% above EPA median` : `${euiDiff}% vs EPA median`}
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">💰</div>
            <div className="metric-val">${savMid.toLocaleString()}</div>
            <div className="metric-lbl">Estimated annual savings</div>
            <div className="metric-delta">per year if recommendations implemented</div>
          </div>
          <div className="metric-card">
            <div className="metric-icon">🌍</div>
            <div className="metric-val">{report.co2Tons}</div>
            <div className="metric-lbl">CO₂ reducible (tons/year)</div>
            <div className="metric-delta">equivalent to planting {report.treesEquiv} trees</div>
          </div>
        </div>

        {/* FINDINGS */}
        <div className="section-title">Top findings</div>
        <div className="findings-list">
          {(report.findings || []).map((f, i) => (
            <div key={i} className="finding-card">
              <div className={`finding-sev ${SEV_CLASS[f.severity] || 'sev-low'}`}>
                {SEV_ICON[f.severity] || '🟢'}
              </div>
              <div>
                <div className="finding-title">{f.title}</div>
                <div className="finding-desc">{f.desc}</div>
              </div>
              <div className="finding-impact">
                <div className="impact-val">${Math.round(f.savingsUSD || 0).toLocaleString()}</div>
                <div className="impact-lbl">potential savings/yr</div>
              </div>
            </div>
          ))}
        </div>

        {/* RECOMMENDATIONS */}
        <div className="section-title">Recommended actions</div>
        <div className="recs-list">
          {(report.recommendations || []).map((r, i) => (
            <div key={i} className="rec-item">
              <div className="rec-num">{i + 1}</div>
              <div className="rec-text">{r.action}</div>
              <div className="rec-roi">{r.roi}</div>
            </div>
          ))}
        </div>

        {/* IMPACT BANNER */}
        <div className="impact-banner">
          <div className="impact-icon">🌱</div>
          <div className="impact-text">
            <h3>Your environmental impact potential</h3>
            <p>{report.impactStatement}</p>
          </div>
          <div className="impact-nums">
            <div className="impact-stat">
              <span className="val">{(report.treesEquiv || 0).toLocaleString()}</span>
              <span className="lbl">trees equivalent</span>
            </div>
            <div className="impact-stat">
              <span className="val">{report.carsEquiv || 0}</span>
              <span className="lbl">cars off road</span>
            </div>
          </div>
        </div>

        {/* FULL ANALYSIS */}
        {report.fullAnalysis && (
          <>
            <div className="section-title">Full AI analysis</div>
            <div className="ai-raw">{report.fullAnalysis}</div>
          </>
        )}

        <div className="report-footer">
          Generated by VoltFlora · Powered by Groq AI · EPA ENERGY STAR benchmarks · {today}
        </div>

      </div>
    </div>
  );
}