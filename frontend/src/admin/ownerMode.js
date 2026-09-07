const KEY = 'portfolioOwner';

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

export function getAdminToken() {
  return sessionStorage.getItem('adminToken') || '';
}

export function setAdminToken(token) {
  if (token) sessionStorage.setItem('adminToken', token);
  else sessionStorage.removeItem('adminToken');
}
