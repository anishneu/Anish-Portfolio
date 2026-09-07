const speakeasy = require('speakeasy');

function totpSecret() {
  return process.env.TOTP_SECRET?.trim() || '';
}

function totpConfigured() {
  return totpSecret().length >= 16;
}

function verifyTotp(code) {
  const secret = totpSecret();
  if (!secret) return false;
  const token = String(code || '').replace(/\s+/g, '');
  if (!/^\d{6}$/.test(token)) return false;
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1,
  });
}

module.exports = { totpConfigured, verifyTotp };
