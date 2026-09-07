const express = require('express');
const rateLimit = require('express-rate-limit');
const { totpConfigured, verifyTotp } = require('../auth/totp');
const {
  signAdminToken,
  setSessionCookie,
  clearSessionCookie,
  requireAdmin,
  MAX_AGE_SEC,
} = require('../auth/session');

function createAuthRoutes() {
  const router = express.Router();

  const otpLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many codes. Try again in a few minutes.' },
  });

  router.get('/status', (req, res) => {
    res.json({ configured: totpConfigured() });
  });

  router.post('/otp', otpLimiter, (req, res) => {
    if (!totpConfigured()) {
      return res.status(503).json({ message: 'TOTP is not configured on the server.' });
    }
    if (!process.env.JWT_SECRET?.trim()) {
      return res.status(503).json({ message: 'JWT_SECRET is not configured.' });
    }
    const code = String(req.body?.code ?? req.body?.token ?? '').trim();
    if (!verifyTotp(code)) {
      return res.status(401).json({ message: 'That code is not valid.' });
    }
    const token = signAdminToken();
    setSessionCookie(res, token);
    return res.json({ ok: true, token, expiresIn: MAX_AGE_SEC });
  });

  router.get('/session', requireAdmin, (req, res) => {
    const expMs = req.admin?.exp ? req.admin.exp * 1000 : Date.now() + MAX_AGE_SEC * 1000;
    res.json({
      ok: true,
      role: 'owner',
      expiresIn: Math.max(0, Math.floor((expMs - Date.now()) / 1000)),
    });
  });

  router.post('/logout', (req, res) => {
    clearSessionCookie(res);
    res.json({ ok: true });
  });

  return router;
}

module.exports = createAuthRoutes;
