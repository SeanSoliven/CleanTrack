import React from 'react';
import SubHeader from '../components/shared/SubHeader';

function MyReportsPage({ onNavigate }) {
  const myReports = [
    { id: 1, type: 'Illegal Dumping', icon: '🚯', loc: '14 Rizal Ave', status: 'resolved', time: '2h ago' },
    { id: 2, type: 'Bin Damage', icon: '🗑️', loc: 'Brgy Hall', status: 'in-progress', time: '3 days ago' },
    { id: 3, type: 'Missed Collection', icon: '📭', loc: 'My Address', status: 'pending', time: '1 week ago' },
    { id: 4, type: 'Illegal Dumping', icon: '🚯', loc: 'Corner Luna', status: 'resolved', time: '2 weeks ago' },
  ];

  const statusClass = { resolved: 's-done', 'in-progress': 's-prog', pending: 's-pend' };
  const statusLabel = { resolved: 'Resolved', 'in-progress': 'In Progress', pending: 'Pending' };

  return (
    <div className="sub-page page-full">
      <SubHeader title="My Reports" onBack={() => onNavigate('profile')} />
      <div className="sub-body">
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="stat-pill" style={{ background: 'var(--g100)', border: '1px solid var(--g300)' }}>
            <span className="stat-num" style={{ color: 'var(--g700)' }}>
              {myReports.length}
            </span>
            <span className="stat-lbl" style={{ color: 'var(--g600)' }}>
              Total
            </span>
          </div>
          <div className="stat-pill" style={{ background: '#edfaf3', border: '1px solid var(--g300)' }}>
            <span className="stat-num" style={{ color: 'var(--g700)' }}>
              2
            </span>
            <span className="stat-lbl" style={{ color: 'var(--g600)' }}>
              Resolved
            </span>
          </div>
          <div className="stat-pill" style={{ background: '#fff8e1', border: '1px solid #ffc107' }}>
            <span className="stat-num" style={{ color: '#e65100' }}>
              1
            </span>
            <span className="stat-lbl" style={{ color: '#e65100' }}>
              Pending
            </span>
          </div>
        </div>
        {myReports.map((r) => (
          <div key={r.id} className="act-card">
            <div className="act-ico-wrap">{r.icon}</div>
            <div className="act-info">
              <div className="act-top">
                <strong>{r.type}</strong>
                <span className={`sbadge ${statusClass[r.status]}`}>
                  {statusLabel[r.status]}
                </span>
              </div>
              <p className="act-loc">📍 {r.loc}</p>
              <div className="act-meta">
                <span>🕐 {r.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReportsPage;
