import React, { useEffect, useState } from 'react';

const LOAD_STEPS = [
  'Loading EPA benchmark data',
  'Calculating energy intensity',
  'Identifying waste sources',
  'Generating AI recommendations',
  'Building your report',
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default function Loading({ auditData, setAuditData, setPage }) {
  const [progress, setProgress] = useState(0);
  const [doneSteps, setDoneSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    async function runAudit() {
      // Animate through first 4 steps while API call runs
      for (let i = 0; i < 4; i++) {
        await sleep(700);
        setCurrentStep(i + 1);
        setDoneSteps(prev => [...prev, i]);
        setProgress(Math.round(((i + 1) / LOAD_STEPS.length) * 80));
      }

      // Call the Express backend
      try {
        const res = await fetch('http://localhost:5000/api/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(auditData),
        });
        const data = await res.json();

        // Finish animation
        setDoneSteps([0, 1, 2, 3, 4]);
        setCurrentStep(5);
        setProgress(100);
        await sleep(500);

        setAuditData(data);
        setPage('report');

      } catch (err) {
        console.error('Audit API error:', err);
        // Even if API fails, generate fallback and go to report
        setDoneSteps([0, 1, 2, 3, 4]);
        setProgress(100);
        await sleep(500);
        setAuditData({ ...auditData, error: true });
        setPage('report');
      }
    }

    runAudit();
  }, []); // eslint-disable-line

  return (
    <div className="loading-page">
      <div className="load-orb">🌿</div>
      <div className="load-title">Analyzing your business...</div>
      <div className="load-sub">
        Benchmarking against EPA ENERGY STAR data and generating your custom audit report
      </div>
      <div className="load-bar-wrap">
        <div className="load-bar" style={{ width: `${progress}%` }} />
      </div>
      <div className="load-steps">
        {LOAD_STEPS.map((label, i) => (
          <div
            key={i}
            className={`load-step ${doneSteps.includes(i) ? 'done' : ''} ${currentStep === i ? 'active' : ''}`}
          >
            <div className="load-step-dot" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}