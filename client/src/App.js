import React, { useState } from 'react';
import Landing from './pages/Landing';
import AuditForm from './pages/AuditForm';
import Loading from './pages/Loading';
import Report from './pages/Report';
import './styles/global.css';
import './styles/components.css';

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