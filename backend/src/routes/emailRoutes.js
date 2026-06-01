const express = require('express');
const { sendPortfolioMessage } = require('../services/emailService');
const { getCredentialsStatus } = require('../loadSecrets');

const router = express.Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get('/status', (req, res) => {
  const credentials = getCredentialsStatus();
  res.json({ ok: credentials.configured, credentials });
});

router.get('/send', (req, res) => {
  res.status(405).json({
    message:
      'Contact form requires POST /email/send with JSON: { fullName, senderEmail, message }.',
    method: 'POST',
    path: '/email/send',
  });
});

router.post('/send', async (req, res) => {
  const fullName = String(req.body.fullName ?? req.body.name ?? '').trim();
  const senderEmail = String(req.body.senderEmail ?? req.body.email ?? '').trim();
  const message = String(req.body.message ?? req.body.text ?? '').trim();

  if (!fullName || !senderEmail || !message) {
    return res.status(400).json({ message: 'Full name, email, and message are required.' });
  }
  if (!EMAIL_RE.test(senderEmail)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }
  if (message.length > 5000) {
    return res.status(400).json({ message: 'Message is too long (max 5000 characters).' });
  }

  const credentials = getCredentialsStatus();
  if (!credentials.configured) {
    console.error('Email not configured. Missing:', credentials.missing);
    console.error('Dirs checked:', credentials.searchDirs);
    console.error('Files seen:', credentials.secretFilesPresent);
    return res.status(500).json({
      message: 'Contact form is temporarily unavailable (email credentials missing on server).',
    });
  }

  try {
    await sendPortfolioMessage({ fullName, senderEmail, message });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', {
      code: error.code,
      status: error.status,
      responseCode: error.responseCode,
      message: error.message,
    });
    const isConfig = /not configured/i.test(error.message);
    const isAuth = error.code === 'EAUTH' || error.responseCode === 535;
    const isSmtpBlocked = error.code === 'ETIMEDOUT' || credentials.renderSmtpBlocked;
    const isResend = credentials.provider === 'resend';

    return res.status(500).json({
      message: isConfig
        ? 'Contact form is temporarily unavailable.'
        : isSmtpBlocked
          ? 'Email cannot use Gmail SMTP on Render free tier. Add RESEND_API_KEY and set EMAIL_PROVIDER=resend, then redeploy.'
          : isAuth
            ? 'Gmail rejected the server login. Regenerate the app password and update GMAIL_PASS.'
            : isResend && error.status === 401
              ? 'Invalid Resend API key. Update RESEND_API_KEY on Render.'
              : 'Failed to send email. Please try again later.',
    });
  }
});

module.exports = router;
