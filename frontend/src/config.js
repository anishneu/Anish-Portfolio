/**
 * Backend API base URL.
 * Netlify: set REACT_APP_API_URL to your Render URL (https only, no /email path).
 * Example: https://anish-portfolio-api.onrender.com
 */
function resolveApiBaseUrl() {
  let base = process.env.REACT_APP_API_URL?.trim();
  if (!base) return 'http://localhost:5000';

  base = base.replace(/\/+$/, '');
  // Allow pasting the full contact URL by mistake
  base = base.replace(/\/email\/send$/i, '').replace(/\/email$/i, '');

  // HTTP → HTTPS redirect on Render turns POST into GET; always use https in production
  if (
    base.startsWith('http://') &&
    !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(base)
  ) {
    base = `https://${base.slice('http://'.length)}`;
  }

  return base;
}

export const API_BASE_URL = resolveApiBaseUrl();
export const CONTACT_EMAIL_ENDPOINT = `${API_BASE_URL}/email/send`;
