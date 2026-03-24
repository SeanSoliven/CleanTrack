import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

function ActivitiesPage() {
  const [filter, setFilter] = useState('All');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = ['All', 'Pending', 'In Progress', 'Resolved'];

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setActivities(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
      setLoading(false);
    };
    fetchReports();
  }, []);

  const filtered = activities.filter((a) => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return a.status === 'Pending';
    if (filter === 'In Progress') return a.status === 'In Progress';
    if (filter === 'Resolved') return a.status === 'Resolved';
    return true;
  });

  const counts = {
    res: activities.filter((a) => a.status === 'Resolved').length,
    prog: activities.filter((a) => a.status === 'In Progress').length,
    pend: activities.filter((a) => a.status === 'Pending').length,
  };

  const statusClass = { Resolved: 's-done', 'In Progress': 's-prog', Pending: 's-pend' };

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
        {loading && <div className="empty">Loading reports...</div>}
        {!loading && filtered.map((item, i) => (
          <div key={item.id} className="act-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="act-ico-wrap">{item.icon}</div>
            <div className="act-info">
              <div className="act-top">
                <strong>{item.type}</strong>
                <span className={`sbadge ${statusClass[item.status] || 's-pend'}`}>{item.status}</span>
              </div>
              <p className="act-loc">📍 {item.address}</p>
              <div className="act-meta">
                <span>👤 {item.userEmail}</span>
                <span>🔖 {item.refNumber}</span>
              </div>
            </div>
          </div>
        ))}
        {!loading && filtered.length === 0 && (
          <div className="empty">No {filter.toLowerCase()} reports found.</div>
        )}
      </div>
    </div>
  );
}

export default ActivitiesPage;