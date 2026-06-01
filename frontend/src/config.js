/** Backend API — set REACT_APP_API_URL in production (e.g. Netlify env var) */
export const API_BASE_URL =
  process.env.REACT_APP_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

export const CONTACT_EMAIL_ENDPOINT = `${API_BASE_URL}/email/send`;
