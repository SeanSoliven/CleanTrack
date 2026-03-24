import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function LoginPage({ onNavigate, onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  const submit = async () => {
    if (!form.email || !form.password) {
      setErr('Please fill in all fields.');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;
      onLogin({ email: user.email, name: user.email.split('@')[0] });
    } catch (error) {
      setErr('Invalid email or password.');
    }
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
          <div className="fg">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
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