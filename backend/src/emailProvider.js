function resolveProvider() {
  const forced = process.env.EMAIL_PROVIDER?.trim().toLowerCase();
  if (forced === 'resend' || forced === 'smtp') return forced;
  if (process.env.RESEND_API_KEY?.trim()) return 'resend';
  return 'smtp';
}

function requiredKeysForProvider(provider) {
  if (provider === 'resend') {
    return ['RESEND_API_KEY', 'PORTFOLIO_CONTACT_TO'];
  }
  return ['GMAIL_USER', 'GMAIL_PASS', 'PORTFOLIO_CONTACT_TO'];
}

module.exports = { resolveProvider, requiredKeysForProvider };
