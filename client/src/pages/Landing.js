import React from 'react';

export default function Landing({ setPage }) {
  return (
    <div className="landing">

      {/* NAV */}
      <nav className="nav">
        <div className="logo">Volt<span>Flora</span></div>
        <div className="nav-badge">Energy Audit AI</div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <div className="eyebrow">Free AI-powered audit</div>
          <h1 className="hero-title">
            Your business is <em>leaking</em> energy.
          </h1>
          <p className="hero-sub">
            VoltFlora audits your small business's energy consumption, benchmarks
            it against EPA data, and delivers a prioritized action plan — with
            real CO₂ and cost savings estimates.
          </p>
          <div className="cta-row">
            <button className="btn-primary" onClick={() => setPage('form')}>
              Start free audit →
            </button>
            <span className="cta-note">Takes about 3 minutes</span>
          </div>
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-num">$2.8B</div>
              <div className="stat-lbl">wasted annually by SMBs</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">34%</div>
              <div className="stat-lbl">avg energy reducible</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">EPA</div>
              <div className="stat-lbl">benchmarked data</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="orb-wrap">
            <div className="orb-ring" />
            <div className="orb">
              <div className="orb-icon">🌿</div>
              <div className="orb-label">AI Energy Intelligence for Small Business</div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <div className="feat-card">
          <div className="feat-icon">⚡</div>
          <div>
            <div className="feat-title">Real EPA benchmarks</div>
            <div className="feat-desc">
              Your usage compared to 600k+ commercial buildings in EPA's ENERGY STAR dataset
            </div>
          </div>
        </div>
        <div className="feat-card">
          <div className="feat-icon">🌍</div>
          <div>
            <div className="feat-title">CO₂ impact quantified</div>
            <div className="feat-desc">
              Every recommendation comes with a concrete carbon reduction estimate in tons/year
            </div>
          </div>
        </div>
        <div className="feat-card">
          <div className="feat-icon">🎯</div>
          <div>
            <div className="feat-title">Prioritized action plan</div>
            <div className="feat-desc">
              Not a generic checklist — a ranked list tailored to your specific building and operations
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}