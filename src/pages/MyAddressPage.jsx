import React, { useState } from 'react';
import SubHeader from '../components/shared/SubHeader';

function MyAddressPage({ onNavigate }) {
  const [addr, setAddr] = useState({
    street: '12 Mabini Street',
    barangay: 'Barangay 1',
    city: 'Quezon City',
    zone: 'Zone A',
  });

  return (
    <div className="sub-page page-full">
      <SubHeader title="My Address" onBack={() => onNavigate('profile')} />
      <div className="sub-body">
        <div className="info-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: 'var(--g50)', borderRadius: 'var(--r-md)', padding: '14px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.3rem' }}>📍</span>
            <p style={{ fontSize: '.85rem', color: 'var(--gray600)', lineHeight: '1.5' }}>
              Your address is used to show nearby trucks and schedule pickup reminders.
            </p>
          </div>
          <div className="fg">
            <label>Street / House No.</label>
            <input
              type="text"
              value={addr.street}
              onChange={(e) => setAddr({ ...addr, street: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>Barangay</label>
            <input
              type="text"
              value={addr.barangay}
              onChange={(e) => setAddr({ ...addr, barangay: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>City / Municipality</label>
            <input
              type="text"
              value={addr.city}
              onChange={(e) => setAddr({ ...addr, city: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>Collection Zone</label>
            <input
              type="text"
              value={addr.zone}
              onChange={(e) => setAddr({ ...addr, zone: e.target.value })}
              placeholder="e.g. Zone A"
            />
          </div>
        </div>
        <button className="save-btn">Save Address</button>
      </div>
    </div>
  );
}

export default MyAddressPage;
