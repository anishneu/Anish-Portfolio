const speakeasy = require('speakeasy');
const crypto = require('crypto');

const secret = speakeasy.generateSecret({
  name: 'Anish Portfolio (admin)',
  issuer: 'Anish Portfolio',
  length: 20,
});
const jwt = crypto.randomBytes(32).toString('hex');

console.log('Add these to backend/.env and Render secret files:\n');
console.log(`TOTP_SECRET=${secret.base32}`);
console.log(`JWT_SECRET=${jwt}`);
console.log('\nThen add this account in Google Authenticator:\n');
console.log(secret.otpauth_url);
console.log('\nDo not commit the secret. The TOTP secret must never reach the frontend.');
