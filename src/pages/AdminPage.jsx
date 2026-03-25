import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function AdminPage({ user, onNavigate, onLogout }) {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const colRef = collection(db, 'reports');

  const fetchReports = async () => {
    const snapshot = await getDocs(colRef);
    setReports(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => { fetchReports(); }, []);

  const handleAdd = async () => {
    if (!form.title || !form.description) return;
    await addDoc(colRef, { ...form, createdAt: new Date().toISOString() });
    setForm({ title: '', description: '', status: 'Pending' });
    setShowForm(false);
    fetchReports();
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    await updateDoc(doc(db, 'reports', editingId), form);
    setEditingId(null);
    setForm({ title: '', description: '', status: 'Pending' });
    setShowForm(false);
    fetchReports();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'reports', id));
    fetchReports();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description, status: item.status || 'Pending' });
    setShowForm(true);
  };

  const cancelForm = () => {
    setEditingId(null);
    setForm({ title: '', description: '', status: 'Pending' });
    setShowForm(false);
  };

  const statusColor = (status) => {
    if (status === 'Resolved') return 'var(--g600)';
    if (status === 'In Progress') return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div style={{ background: 'var(--gray100)', minHeight: '100dvh' }}>

      {/* HEADER */}
      <div className="auth-hdr" style={{ paddingBottom: '1.5rem' }}>
        <div className="auth-hdr-blob" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0 }}>Admin Panel</h2>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '0.85rem' }}>
              Welcome, {user?.name || 'Admin'}
            </p>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.4)',
              borderRadius: '8px',
              color: 'white',
              padding: '0.4rem 0.9rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '1rem' }}>

        {/* STATS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {[
            { label: 'Total', count: reports.length, emoji: '📋' },
            { label: 'Pending', count: reports.filter(r => r.status === 'Pending' || !r.status).length, emoji: '🔴' },
            { label: 'Resolved', count: reports.filter(r => r.status === 'Resolved').length, emoji: '✅' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '0.75rem',
              textAlign: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            }}>
              <div style={{ fontSize: '1.4rem' }}>{s.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--g800)' }}>{s.count}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--g500)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ADD BUTTON */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="btn-green"
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            + Add New Report
          </button>
        )}

        {/* FORM */}
        {showForm && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1rem',
            marginBottom: '1rem',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
          }}>
            <h3 style={{ margin: '0 0 0.75rem', color: 'var(--g800)', fontSize: '1rem' }}>
              {editingId ? '✏️ Edit Report' : '➕ New Report'}
            </h3>
            <div className="fg">
              <label>Title</label>
              <input
                type="text"
                placeholder="Report title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="fg">
              <label>Description</label>
              <input
                type="text"
                placeholder="Report description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="fg">
              <label>Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  border: '1.5px solid var(--gray300)',
                  fontSize: '0.95rem',
                  background: 'white',
                  color: 'var(--g800)',
                }}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="btn-green"
                style={{ flex: 1 }}
              >
                {editingId ? 'Update' : 'Add Report'}
              </button>
              <button
                onClick={cancelForm}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '1.5px solid var(--gray300)',
                  background: 'white',
                  color: 'var(--g600)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* REPORTS LIST */}
        <h3 style={{ margin: '0 0 0.75rem', color: 'var(--g800)', fontSize: '1rem' }}>
          All Reports
        </h3>
        {reports.length === 0 && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--g500)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
            <p style={{ margin: 0 }}>No reports yet</p>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {reports.map(item => (
            <div key={item.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: 'var(--g800)', fontSize: '0.95rem' }}>
                    {item.title}
                  </p>
                  <p style={{ margin: '0 0 0.5rem', color: 'var(--g500)', fontSize: '0.82rem' }}>
                    {item.description}
                  </p>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: statusColor(item.status),
                    background: `${statusColor(item.status)}18`,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '999px',
                  }}>
                    {item.status || 'Pending'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', marginLeft: '0.5rem' }}>
                  <button
                    onClick={() => startEdit(item)}
                    style={{
                      background: 'var(--g100)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.4rem 0.7rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      color: 'var(--g700)',
                      fontWeight: 600,
                    }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      background: '#fef2f2',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.4rem 0.7rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      color: '#ef4444',
                      fontWeight: 600,
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;