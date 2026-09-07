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

export function setAdminToken(token, expiresInSec = 15 * 60) {
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(EXP_KEY, String(Date.now() + expiresInSec * 1000));
    return;
  }
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(EXP_KEY);
}

export function getAdminToken() {
  const expires = Number(sessionStorage.getItem(EXP_KEY) || 0);
  if (expires && Date.now() >= expires) {
    setAdminToken('');
    return '';
  }
  return sessionStorage.getItem(TOKEN_KEY) || '';
}

export function adminSessionMsLeft() {
  const expires = Number(sessionStorage.getItem(EXP_KEY) || 0);
  return Math.max(0, expires - Date.now());
}
