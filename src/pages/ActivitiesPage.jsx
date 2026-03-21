import React, { useState } from 'react';
import { ACTIVITIES } from '../constants';

function ActivitiesPage() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Pending', 'In Progress', 'Resolved'];

  const filtered = ACTIVITIES.filter((a) => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return a.status === 'pending';
    if (filter === 'In Progress') return a.status === 'in-progress';
    if (filter === 'Resolved') return a.status === 'resolved';
    return true;
  });

  const counts = {
    res: ACTIVITIES.filter((a) => a.status === 'resolved').length,
    prog: ACTIVITIES.filter((a) => a.status === 'in-progress').length,
    pend: ACTIVITIES.filter((a) => a.status === 'pending').length,
  };

  const statusClass = { resolved: 's-done', 'in-progress': 's-prog', pending: 's-pend' };
  const statusLabel = { resolved: 'Resolved', 'in-progress': 'In Progress', pending: 'Pending' };

  return (
    <div style={{ background: 'var(--gray100)', minHeight: '100dvh' }}>
      <div className="act-hdr">
        <h1>Recent Activities</h1>
        <p>Community reports & updates</p>
        <div className="stats-row">
          <div className="stat-pill">
            <span className="stat-num">{counts.res}</span>
            <span className="stat-lbl">Resolved</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">{counts.prog}</span>
            <span className="stat-lbl">In Progress</span>
          </div>
          <div className="stat-pill">
            <span className="stat-num">{counts.pend}</span>
            <span className="stat-lbl">Pending</span>
          </div>
        </div>
      </div>
      <div className="filter-tabs">
        {filters.map((f) => (
          <button key={f} className={`ftab ${filter === f ? 'on' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>
      <div className="act-list">
        {filtered.map((item, i) => (
          <div key={item.id} className="act-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="act-ico-wrap">{item.icon}</div>
            <div className="act-info">
              <div className="act-top">
                <strong>{item.type}</strong>
                <span className={`sbadge ${statusClass[item.status]}`}>{statusLabel[item.status]}</span>
              </div>
              <p className="act-loc">📍 {item.loc}</p>
              <div className="act-meta">
                <span>👤 {item.reporter}</span>
                <span>🕐 {item.time}</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="empty">No {filter.toLowerCase()} reports found.</div>}
      </div>
    </div>
  );
}

export default ActivitiesPage;
