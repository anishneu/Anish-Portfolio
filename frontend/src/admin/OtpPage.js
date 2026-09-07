import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkSession, verifyOtp } from './api';
import { enableOwnerMode } from './ownerMode';
import './admin.css';

export default function OtpPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const refs = useRef([]);

  useEffect(() => {
    enableOwnerMode();
    checkSession().then((session) => {
      if (session.ok) navigate('/admin', { replace: true });
    });
  }, [navigate]);

  const setAt = (index, value) => {
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    return next;
  };

  const submit = async (code) => {
    const token = (code || digits.join('')).replace(/\D/g, '');
    if (token.length !== 6) {
      setError('Enter the 6-digit code from Authenticator.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      await verifyOtp(token);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
      setDigits(['', '', '', '', '', '']);
      refs.current[0]?.focus();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-page admin-otp">
      <div className="admin-card">
        <p className="admin-kicker">Owner</p>
        <h1>Enter your code</h1>
        <p>Use the 6-digit TOTP from Google Authenticator. This page does nothing without that code.</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <div className="admin-digits">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(node) => {
                  refs.current[index] = node;
                }}
                inputMode="numeric"
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                maxLength={1}
                value={digit}
                aria-label={`Digit ${index + 1}`}
                onChange={(event) => {
                  const raw = event.target.value.replace(/\D/g, '');
                  if (raw.length > 1) {
                    const chars = raw.slice(0, 6).split('');
                    const next = ['', '', '', '', '', ''];
                    chars.forEach((ch, i) => {
                      next[i] = ch;
                    });
                    setDigits(next);
                    if (chars.length === 6) submit(chars.join(''));
                    else refs.current[chars.length]?.focus();
                    return;
                  }
                  const next = setAt(index, raw.slice(-1));
                  if (raw && index < 5) refs.current[index + 1]?.focus();
                  if (next.join('').length === 6) submit(next.join(''));
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && !digits[index] && index > 0) {
                    refs.current[index - 1]?.focus();
                  }
                }}
                onPaste={(event) => {
                  const text = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                  if (!text) return;
                  event.preventDefault();
                  const next = ['', '', '', '', '', ''];
                  text.split('').forEach((ch, i) => {
                    next[i] = ch;
                  });
                  setDigits(next);
                  if (text.length === 6) submit(text);
                }}
              />
            ))}
          </div>
          <p className="admin-error">{error}</p>
          <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>
            {busy ? 'Checking…' : 'Unlock'}
          </button>
        </form>
        <Link className="admin-link" to="/">Back to site</Link>
      </div>
    </div>
  );
}
