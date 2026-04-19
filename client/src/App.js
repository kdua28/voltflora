import React, { useState } from 'react';
import Landing from './pages/Landing';
import AuditForm from './pages/AuditForm';
import Loading from './pages/Loading';
import Report from './pages/Report';
import './styles/global.css';
import './styles/components.css';

const SAMPLE_AUDIT = {
  bizName: 'Riverside Bakery',
  bizType: 'Restaurant / Food service',
  bizCity: 'Austin, TX',
  sqft: 2400,
  monthlyBill: 820,
  hoursPerWeek: 70,
  hasGas: 'Yes',
  lighting: ['Fluorescent tubes'],
  hvac: 'Central AC + heat',
  equipment: ['Commercial refrigeration', 'Industrial kitchen equipment'],
  existing: ['None of these'],
};

export default function App() {
  const [page, setPage] = useState('landing');
  const [auditData, setAuditData] = useState(null);

  return (
    <div className="app">
      {page === 'landing' && <Landing setPage={setPage} setAuditData={setAuditData} />}
      {page === 'form'    && <AuditForm setPage={setPage} setAuditData={setAuditData} />}
      {page === 'loading' && <Loading setPage={setPage} setAuditData={setAuditData} auditData={auditData} />}
      {page === 'report'  && <Report setPage={setPage} auditData={auditData} />}
    </div>
  );
}