const jwt = require('jsonwebtoken');

const COOKIE = 'admin_session';
const MAX_AGE_SEC = 15 * 60;

function jwtSecret() {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error('JWT_SECRET is not configured');
  }
  return secret;
}

function signAdminToken() {
  return jwt.sign({ role: 'owner' }, jwtSecret(), { expiresIn: MAX_AGE_SEC });
}

function verifyAdminToken(token) {
  if (!token) return null;
  try {
    const payload = jwt.verify(token, jwtSecret());
    if (payload?.role !== 'owner') return null;
    return payload;
  } catch {
    return null;
  }
}

function tokenFromRequest(req) {
  const header = req.headers.authorization || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (bearer) return bearer;
  const cookie = req.headers.cookie || '';
  const match = cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE}=`));
  return match ? decodeURIComponent(match.slice(COOKIE.length + 1)) : '';
}

function setSessionCookie(res, token) {
  const secure = Boolean(process.env.RENDER) || process.env.NODE_ENV === 'production';
  const parts = [
    `${COOKIE}=${encodeURIComponent(token)}`,
    'HttpOnly',
    'Path=/',
    `Max-Age=${MAX_AGE_SEC}`,
    secure ? 'Secure' : '',
    secure ? 'SameSite=None' : 'SameSite=Lax',
  ].filter(Boolean);
  res.setHeader('Set-Cookie', parts.join('; '));
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; HttpOnly; Path=/; Max-Age=0`);
}

function requireAdmin(req, res, next) {
  try {
    jwtSecret();
  } catch {
    return res.status(503).json({ message: 'Admin auth is not configured.' });
  }
  const payload = verifyAdminToken(tokenFromRequest(req));
  if (!payload) {
    return res.status(401).json({ message: 'Admin session required.' });
  }
  req.admin = payload;
  return next();
}

module.exports = {
  COOKIE,
  MAX_AGE_SEC,
  signAdminToken,
  verifyAdminToken,
  tokenFromRequest,
  setSessionCookie,
  clearSessionCookie,
  requireAdmin,
};
