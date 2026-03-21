import React, { useState } from 'react';

function RegisterPage({ onNavigate, onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [err, setErr] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ email: '', password: '', confirm: '' });

  const validateEmail = (email) => {
    if (!email.includes('@gmail.com')) {
      return 'Email must be a valid @gmail.com address';
    }
    return '';
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasUppercase || !hasNumber) {
      return 'Password must contain at least one uppercase letter and one number';
    }
    return '';
  };

  const validateConfirm = (password, confirm) => {
    if (confirm && password !== confirm) {
      return 'Passwords do not match';
    }
    return '';
  };

  const handleEmailBlur = () => {
    const error = validateEmail(form.email);
    setFieldErrors({ ...fieldErrors, email: error });
  };

  const handlePasswordBlur = () => {
    const error = validatePassword(form.password);
    setFieldErrors({ ...fieldErrors, password: error });
  };

  const handleConfirmBlur = () => {
    const error = validateConfirm(form.password, form.confirm);
    setFieldErrors({ ...fieldErrors, confirm: error });
  };

  const submit = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setErr('Please fill in all fields.');
      return;
    }

    // Validate all fields
    const emailErr = validateEmail(form.email);
    const passwordErr = validatePassword(form.password);
    const confirmErr = validateConfirm(form.password, form.confirm);

    setFieldErrors({
      email: emailErr,
      password: passwordErr,
      confirm: confirmErr,
    });

    // Don't proceed if any errors
    if (emailErr || passwordErr || confirmErr) {
      setErr('');
      return;
    }

    setErr('');
    onLogin({ email: form.email, name: form.name });
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
        <h2>Create account</h2>
        <p>Join CleanTrack today</p>
      </div>
      <div className="auth-body">
        <div className="auth-card">
          <div className="fg">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Juan Dela Cruz"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="fg">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={handleEmailBlur}
            />
            {fieldErrors.email && <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px' }}>{fieldErrors.email}</p>}
          </div>
          <div className="fg">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onBlur={handlePasswordBlur}
            />
            {fieldErrors.password && <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px' }}>{fieldErrors.password}</p>}
          </div>
          <div className="fg">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              onBlur={handleConfirmBlur}
            />
            {fieldErrors.confirm && <p style={{ fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px' }}>{fieldErrors.confirm}</p>}
          </div>
          {err && <p className="form-err">{err}</p>}
          <button className="btn-green" onClick={submit}>
            Create Account
          </button>
          <p className="auth-switch">
            Already have an account? <span onClick={() => onNavigate('login')}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
