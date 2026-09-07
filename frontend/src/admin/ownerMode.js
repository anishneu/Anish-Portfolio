const KEY = 'portfolioOwner';
const TOKEN_KEY = 'adminToken';
const EXP_KEY = 'adminTokenExpires';

export function isOwnerMode() {
  if (typeof window === 'undefined') return false;
  if (sessionStorage.getItem(KEY) === '1') return true;
  const params = new URLSearchParams(window.location.search);
  if (params.get('owner') === '1') {
    sessionStorage.setItem(KEY, '1');
    return true;
  }
  return false;
}

export function enableOwnerMode() {
  sessionStorage.setItem(KEY, '1');
}

export function markAdminSession(expiresInSec) {
  const seconds = Number(expiresInSec);
  if (!seconds || seconds <= 0) return;
  sessionStorage.setItem(EXP_KEY, String(Date.now() + seconds * 1000));
}

export function setAdminToken(token, expiresInSec = 15 * 60) {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
    markAdminSession(expiresInSec);
    return;
  }
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXP_KEY);
}

export function getAdminToken() {
  const remaining = adminSessionMsLeft();
  if (remaining === 0 && sessionStorage.getItem(EXP_KEY)) {
    setAdminToken('');
    return '';
  }
  return sessionStorage.getItem(TOKEN_KEY) || '';
}

export function adminSessionMsLeft() {
  const raw = sessionStorage.getItem(EXP_KEY);
  if (!raw) return null;
  return Math.max(0, Number(raw) - Date.now());
}
