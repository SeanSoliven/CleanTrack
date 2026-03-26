import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function LoginPage({ onNavigate, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  
  // 1. Add visibility state
  const [showPass, setShowPass] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      setErr('Please fill in all fields.');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : 'user';

      onLogin({ email: user.email, name: user.email.split('@')[0], role });
    } catch (error) {
      setErr('Invalid email or password.');
    }
  };

  // 2. Reuse the styling for the icon positioning
  const eyeButtonStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    zIndex: 2
  };

  return (
    <div className="auth-page page-full">
      <div className="auth-hdr">
        <div className="auth-hdr-blob" />
        <button className="back-btn" onClick={() => onNavigate('startup')}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 4L6 10L12 16"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h2>Welcome back</h2>
        <p>Sign in to CleanTrack</p>
      </div>
      <div className="auth-body">
        <div className="auth-card">
          <div className="fg">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* 3. Wrap Password input in a relative div */}
          <div className="fg" style={{ position: 'relative' }}>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{ paddingRight: '45px' }} // Room for the icon
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)} 
                style={eyeButtonStyle}
              >
                {showPass ? '👁️' : '🙈'}
              </button>
            </div>
          </div>

          {err && <p className="form-err">{err}</p>}
          <button className="btn-green" onClick={submit}>
            Sign In
          </button>
          <p className="auth-switch">
            Don't have an account? <span onClick={() => onNavigate('register')}>Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;