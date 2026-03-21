import React, { useState } from 'react';
import SubHeader from '../components/shared/SubHeader';

function EditProfilePage({ user, onNavigate }) {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+63 912 345 6789',
    barangay: 'Barangay 1',
  });

  return (
    <div className="sub-page page-full">
      <SubHeader title="Edit Profile" onBack={() => onNavigate('profile')} />
      <div className="sub-body">
        <div className="info-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingBottom: '16px', borderBottom: '1px solid var(--gray200)' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--g100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
              👤
            </div>
            <button style={{ background: 'none', color: 'var(--g700)', fontWeight: '800', fontSize: '.88rem' }}>
              Change Photo
            </button>
          </div>
          <div className="fg">
            <label>Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>Barangay</label>
            <input
              type="text"
              value={form.barangay}
              onChange={(e) => setForm({ ...form, barangay: e.target.value })}
            />
          </div>
        </div>
        <button className="save-btn">Save Changes</button>
      </div>
    </div>
  );
}

export default EditProfilePage;
