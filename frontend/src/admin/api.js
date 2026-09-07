import {
  ADMIN_CONTENT_ENDPOINT,
  ADMIN_LOGOUT_ENDPOINT,
  ADMIN_OTP_ENDPOINT,
  ADMIN_SESSION_ENDPOINT,
} from '../config';
import { getAdminToken, setAdminToken } from './ownerMode';

function headers(extra = {}) {
  const token = getAdminToken();
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

async function readError(res) {
  try {
    const data = await res.json();
    return data.message || res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function verifyOtp(code) {
  const res = await fetch(ADMIN_OTP_ENDPOINT, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'That code is not valid.');
  setAdminToken(data.token);
  return data;
}

export async function checkSession() {
  const res = await fetch(ADMIN_SESSION_ENDPOINT, {
    credentials: 'include',
    headers: headers(),
  });
  return res.ok;
}

export async function logoutAdmin() {
  await fetch(ADMIN_LOGOUT_ENDPOINT, { method: 'POST', credentials: 'include', headers: headers() });
  setAdminToken('');
}

export async function fetchAdminContent() {
  const res = await fetch(`${ADMIN_CONTENT_ENDPOINT}/content`, {
    credentials: 'include',
    headers: headers(),
  });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
}

export async function saveSection(section, payload) {
  const res = await fetch(`${ADMIN_CONTENT_ENDPOINT}/${section}`, {
    method: 'PUT',
    credentials: 'include',
    headers: headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
}

export async function uploadResume(file) {
  const body = new FormData();
  body.append('file', file);
  const res = await fetch(`${ADMIN_CONTENT_ENDPOINT}/resume`, {
    method: 'POST',
    credentials: 'include',
    headers: headers(),
    body,
  });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
}

export async function removeResume() {
  const res = await fetch(`${ADMIN_CONTENT_ENDPOINT}/resume`, {
    method: 'DELETE',
    credentials: 'include',
    headers: headers(),
  });
  if (!res.ok) throw new Error(await readError(res));
  return res.json();
}
