import React, { useState } from 'react';

const BIZ_TYPES = [
  'Restaurant / Food service',
  'Retail store',
  'Office / Professional services',
  'Grocery / Convenience store',
  'Hotel / Lodging',
  'Healthcare / Clinic',
  'Warehouse / Storage',
  'Salon / Spa',
  'Gym / Fitness',
  'Other',
];

const LIGHTING_OPTIONS = ['LED (most lights)', 'Fluorescent tubes', 'Incandescent / halogen', 'Mix of types', 'Not sure'];
const HVAC_OPTIONS = ['Central AC + heat', 'Window units', 'Mini-split system', 'No climate control'];
const EQUIPMENT_OPTIONS = ['Commercial refrigeration', 'Industrial kitchen equipment', 'Many computers / servers', 'POS / payment systems', 'Signage / displays', 'Water heating'];
const EXISTING_OPTIONS = ['Programmable thermostat', 'Motion sensor lights', 'Solar panels', 'ENERGY STAR appliances', 'None of these'];
const GAS_OPTIONS = ['Yes', 'No', 'Not sure'];

export default function AuditForm({ setPage, setAuditData }) {
  const [step, setStep] = useState(1);

  // Step 1
  const [bizName, setBizName] = useState('');
  const [bizType, setBizType] = useState('');
  const [bizCity, setBizCity] = useState('');
  const [sqft, setSqft] = useState(1500);

  // Step 2
  const [monthlyBill, setMonthlyBill] = useState(600);
  const [hoursPerWeek, setHoursPerWeek] = useState(60);
  const [hasGas, setHasGas] = useState('');

  // Step 3
  const [lighting, setLighting] = useState([]);
  const [hvac, setHvac] = useState('');
  const [equipment, setEquipment] = useState([]);
  const [existing, setExisting] = useState([]);

  function toggleMulti(value, current, setter) {
    if (current.includes(value)) {
      setter(current.filter(v => v !== value));
    } else {
      setter([...current, value]);
    }
  }

  function handleSubmit() {
    const formData = {
      bizName: bizName || 'Your Business',
      bizType: bizType || 'Office / Professional services',
      bizCity: bizCity || 'Austin, TX',
      sqft,
      monthlyBill,
      hoursPerWeek,
      hasGas,
      lighting,
      hvac,
      equipment,
      existing,
    };
    setAuditData(formData);
    setPage('loading');
  }

  return (
    <div className="form-page">

      {/* NAV */}
      <nav className="form-nav">
        <button className="back-btn" onClick={() => step === 1 ? setPage('landing') : setStep(step - 1)}>
          ← Back
        </button>
        <div className="logo" style={{ fontSize: '1.1rem' }}>Volt<span>Flora</span></div>
        <div className="step-indicator">
          <div className={`step-dot ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`} />
          <div className={`step-dot ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`} />
          <div className={`step-dot ${step === 3 ? 'active' : ''}`} />
        </div>
      </nav>

      <div className="form-body">

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <div className="step-header">
              <div className="step-eyebrow">Step 1 of 3 — Business info</div>
              <h2 className="step-title">Tell us about your business</h2>
              <p className="step-sub">
                We'll use this to match your consumption to EPA benchmarks for your industry and building size.
              </p>
            </div>

            <div className="field-group">
              <label className="field-label">Business name</label>
              <input
                className="field-input"
                type="text"
                placeholder="e.g. Riverside Bakery"
                value={bizName}
                onChange={e => setBizName(e.target.value)}
              />
            </div>

            <div className="grid-2">
              <div className="field-group">
                <label className="field-label">Business type</label>
                <select className="field-select" value={bizType} onChange={e => setBizType(e.target.value)}>
                  <option value="">Select type...</option>
                  {BIZ_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">Location (city, state)</label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="e.g. Austin, TX"
                  value={bizCity}
                  onChange={e => setBizCity(e.target.value)}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Building size (approx. sq ft)</label>
              <div className="range-wrap">
                <input
                  className="range-input"
                  type="range"
                  min="200"
                  max="10000"
                  step="100"
                  value={sqft}
                  onChange={e => setSqft(parseInt(e.target.value))}
                />
                <div className="range-row">
                  <span className="range-side">200</span>
                  <span className="range-val">{sqft.toLocaleString()} sq ft</span>
                  <span className="range-side">10,000+</span>
                </div>
              </div>
            </div>

            <div className="btn-row">
              <span />
              <button className="btn-primary" onClick={() => setStep(2)}>Next →</button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <div className="step-header">
              <div className="step-eyebrow">Step 2 of 3 — Energy usage</div>
              <h2 className="step-title">Your monthly energy bill</h2>
              <p className="step-sub">
                This is the core data we benchmark. Estimates are fine — check your last utility bill for the most accurate number.
              </p>
            </div>

            <div className="field-group">
              <label className="field-label">Average monthly electricity bill (USD)</label>
              <div className="range-wrap">
                <input
                  className="range-input"
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={monthlyBill}
                  onChange={e => setMonthlyBill(parseInt(e.target.value))}
                />
                <div className="range-row">
                  <span className="range-side">$50</span>
                  <span className="range-val">${monthlyBill.toLocaleString()}</span>
                  <span className="range-side">$5,000</span>
                </div>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Operating hours per week</label>
              <div className="range-wrap">
                <input
                  className="range-input"
                  type="range"
                  min="20"
                  max="168"
                  step="5"
                  value={hoursPerWeek}
                  onChange={e => setHoursPerWeek(parseInt(e.target.value))}
                />
                <div className="range-row">
                  <span className="range-side">20h</span>
                  <span className="range-val">{hoursPerWeek} hrs/wk</span>
                  <span className="range-side">168h</span>
                </div>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Do you have natural gas heating or cooking?</label>
              <div className="chip-row">
                {GAS_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    className={`chip ${hasGas === opt ? 'selected' : ''}`}
                    onClick={() => setHasGas(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-sec" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" onClick={() => setStep(3)}>Next →</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <div className="step-header">
              <div className="step-eyebrow">Step 3 of 3 — Systems & habits</div>
              <h2 className="step-title">What's running in your building?</h2>
              <p className="step-sub">
                Select everything that applies. The more you tell us, the more targeted your audit will be.
              </p>
            </div>

            <div className="field-group">
              <label className="field-label">Lighting type (select all that apply)</label>
              <div className="chip-row">
                {LIGHTING_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    className={`chip ${lighting.includes(opt) ? 'selected' : ''}`}
                    onClick={() => toggleMulti(opt, lighting, setLighting)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">HVAC / temperature control</label>
              <div className="chip-row">
                {HVAC_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    className={`chip ${hvac === opt ? 'selected' : ''}`}
                    onClick={() => setHvac(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Equipment / appliances (select all that apply)</label>
              <div className="chip-row">
                {EQUIPMENT_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    className={`chip ${equipment.includes(opt) ? 'selected' : ''}`}
                    onClick={() => toggleMulti(opt, equipment, setEquipment)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Any existing energy-saving measures?</label>
              <div className="chip-row">
                {EXISTING_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    className={`chip ${existing.includes(opt) ? 'selected' : ''}`}
                    onClick={() => toggleMulti(opt, existing, setExisting)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="btn-row">
              <button className="btn-sec" onClick={() => setStep(2)}>← Back</button>
              <button className="btn-primary" onClick={handleSubmit}>Run audit 🌿</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}