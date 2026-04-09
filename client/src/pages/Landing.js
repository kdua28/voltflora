import React from 'react';

const EPA_ROWS = [
  ['Restaurant',  100, '395'],
  ['Grocery',      59, '235'],
  ['Healthcare',   48, '188'],
  ['Hotel',        28, '112'],
  ['Office',       18,  '72'],
  ['Retail',       17,  '69'],
  ['Warehouse',    10,  '38'],
];

const TICKER_ITEMS = [
  'EPA ENERGY STAR benchmarked',
  'Groq AI analysis',
  '600k+ buildings in dataset',
  'Real CO₂ savings estimates',
  'Prioritized action plan',
  'Free · No signup required',
];

export default function Landing({ setPage }) {
  return (
    <div className="landing">

      {/* NAV */}
      <nav className="nav">
        <div className="logo">Volt<span className="logo-dot">.</span>Flora</div>
        <div className="nav-links">
          <span className="nav-link">How it works</span>
          <span className="nav-link">EPA data</span>
          <span className="nav-link">About</span>
          <button className="nav-cta" onClick={() => setPage('form')}>Start free audit</button>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <div className="hero-kicker">
            <div className="kicker-line" />
            AI-powered energy intelligence
          </div>
          <h1 className="hero-title">
            Your business<br />wastes energy.<br />
            <em>Find out</em>{' '}
            <span className="title-muted">how<br />much.</span>
          </h1>
          <p className="hero-body">
            VoltFlora benchmarks your small business against EPA ENERGY STAR data
            and delivers a personalized audit — with real CO₂ savings, dollar
            estimates, and a ranked action plan.
          </p>
          <div className="hero-actions">
            <button className="btn-hero" onClick={() => setPage('form')}>Start free audit →</button>
            <button className="btn-outline" onClick={() => setPage('form')}>See sample report</button>
          </div>
          <div className="hero-proof">
            {['Takes 3 minutes', 'No account needed', 'Groq AI powered'].map((t, i) => (
              <React.Fragment key={t}>
                {i > 0 && <div className="proof-sep" />}
                <div className="proof-item">
                  <div className="proof-check">✓</div>
                  {t}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="hero-right">
          <div className="audit-card">
            <div className="ac-label">Energy Audit Report — Live preview</div>
            <div className="ac-biz-row">
              <div className="ac-biz">Riverside Bakery</div>
              <div className="ac-score">
                <span className="ac-score-num">68</span>
                <div className="ac-score-lbl">Efficiency score</div>
              </div>
            </div>
            <div className="ac-divider" />
            <div className="ac-metrics">
              <div className="ac-metric"><span className="ac-metric-val">182</span><div className="ac-metric-lbl">EUI kBtu/sqft</div></div>
              <div className="ac-metric"><span className="ac-metric-val">$3,240</span><div className="ac-metric-lbl">Annual savings</div></div>
              <div className="ac-metric"><span className="ac-metric-val">4.2t</span><div className="ac-metric-lbl">CO₂ saved/yr</div></div>
            </div>
            <div className="ac-findings">
              <div className="ac-finding">
                <div className="sev-pip pip-high" />
                <div className="ac-finding-info"><div className="ac-finding-title">HVAC scheduling gap</div><div className="ac-finding-val">$1,458/yr potential</div></div>
                <div className="ac-finding-badge">High impact</div>
              </div>
              <div className="ac-finding">
                <div className="sev-pip pip-med" />
                <div className="ac-finding-info"><div className="ac-finding-title">Fluorescent lighting</div><div className="ac-finding-val">$810/yr potential</div></div>
                <div className="ac-finding-badge">Medium</div>
              </div>
              <div className="ac-finding">
                <div className="sev-pip pip-low" />
                <div className="ac-finding-info"><div className="ac-finding-title">Phantom loads overnight</div><div className="ac-finding-val">$486/yr potential</div></div>
                <div className="ac-finding-badge">Quick win</div>
              </div>
            </div>
          </div>
          <div className="mini-cards">
            <div className="mini-card"><span className="mini-num">189</span><div className="mini-lbl">trees equivalent per year</div></div>
            <div className="mini-card"><span className="mini-num">0.9</span><div className="mini-lbl">cars taken off the road</div></div>
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="ticker-item">
              {item}
              <div className="ticker-sep" />
            </span>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="how">
        <div className="section-kicker"><div className="section-kicker-line" />How it works</div>
        <div className="section-heading">
          From utility bill<br />to action plan.<br />
          <em>Three steps.</em>
        </div>
        <div className="how-steps">
          {[
            ['01', 'Tell us about your business',    'Business type, building size, monthly utility bill, and the equipment you run. Sliders and quick-select chips — no typing required.'],
            ['02', 'We benchmark against EPA data',  'VoltFlora calculates your Energy Use Intensity and compares it to EPA ENERGY STAR medians for your exact building type.'],
            ['03', 'Get your personalized report',   'Groq AI delivers a report with your top findings, ranked recommendations with ROI estimates, and CO₂ impact down to the tree.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="how-step">
              <div className="step-num">{num}</div>
              <div className="step-title">{title}</div>
              <div className="step-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DATA / EPA */}
      <div className="data-sec">
        <div className="data-inner">
          <div className="data-text">
            <div className="section-kicker"><div className="section-kicker-line" />Real data</div>
            <div className="section-heading" style={{fontSize:'2.4rem', marginBottom:'1rem'}}>
              Benchmarked against<br />EPA ENERGY STAR
            </div>
            <p className="data-body">
              VoltFlora uses the EPA's ENERGY STAR Portfolio Manager dataset — the same
              tool used by Fortune 500 companies — to compare your EUI against the median
              for your specific building type. Not estimates. Not averages. Your industry,
              your size, your benchmark.
            </p>
            <p className="data-body">
              EUI — Energy Use Intensity — is how much energy a building uses per square
              foot per year. Most small businesses have never heard of it. After VoltFlora,
              you'll know exactly where you stand.
            </p>
          </div>
          <div>
            <div className="epa-table-label">EPA median EUI · kBtu/sqft/yr</div>
            <div className="epa-table">
              {EPA_ROWS.map(([biz, pct, val]) => (
                <div key={biz} className="epa-row">
                  <div className="epa-biz">{biz}</div>
                  <div className="epa-track"><div className="epa-fill" style={{width:`${pct}%`}} /></div>
                  <div className="epa-val">{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WHY */}
      <div className="why">
        <div className="section-kicker"><div className="section-kicker-line" />The opportunity</div>
        <div className="section-heading">
          Small businesses<br />are the biggest<br />
          <em>untapped opportunity.</em>
        </div>
        <div className="why-grid">
          {[
            ['87%',   'of small businesses have never received an energy audit. Large corporations have sustainability teams. Small businesses have VoltFlora.'],
            ['$4,200','average annual savings for a business that implements even one energy recommendation. That money goes back into your business.'],
            ['200t',  'CO₂ eliminated per year if 100 businesses act on VoltFlora\'s top recommendation — equivalent to taking 43 cars off the road permanently.'],
          ].map(([stat, lbl]) => (
            <div key={stat} className="why-card">
              <div className="why-stat">{stat}</div>
              <div className="why-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-wrap">
        <div className="cta-inner">
          <div className="cta-h">Find out where your energy is going.</div>
          <p className="cta-sub">Free. No account. Personalized audit report in under 3 minutes.</p>
          <button className="btn-dark" onClick={() => setPage('form')}>Start your free audit →</button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="foot-logo">Volt.Flora</div>
        <div className="foot-note">Powered by Groq AI · EPA ENERGY STAR data · EcoHacks 2026</div>
      </footer>

    </div>
  );
}