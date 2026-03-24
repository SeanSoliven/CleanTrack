import React, { useState } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import SubHeader from '../components/shared/SubHeader';

function ChangePasswordPage({ onNavigate }) {
  const [form, setForm] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState('');

  const changePassword = async () => {
    setErr('');
    if (!form.current || !form.newPass || !form.confirm) {
      setErr('Please fill in all fields.');
      return;
    }
    if (form.newPass !== form.confirm) {
      setErr('New passwords do not match.');
      return;
    }
    if (form.newPass.length < 6) {
      setErr('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        form.current
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, form.newPass);
      setSuccess(true);
      setForm({ current: '', newPass: '', confirm: '' });
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        setErr('Current password is incorrect.');
      } else {
        setErr('Failed to change password. Try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="sub-page page-full">
      <SubHeader title="Change Password" onBack={() => onNavigate('profile')} />
      <div className="sub-body">
        <div className="info-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="fg">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.current}
              onChange={(e) => setForm({ ...form, current: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.newPass}
              onChange={(e) => setForm({ ...form, newPass: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
          </div>
          {err && <p className="form-err">{err}</p>}
          {success && <p style={{ color: 'var(--g600)', textAlign: 'center', fontWeight: '600' }}>✅ Password changed!</p>}
        </div>
        <button className="save-btn" onClick={changePassword} disabled={loading}>
          {loading ? 'Changing...' : 'Change Password'}
        </button>
      </div>
    </div>
  );
}

export default ChangePasswordPage;