const express = require('express');
const { sendPortfolioMessage } = require('../services/emailService');

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/send', async (req, res) => {
  const fullName = String(req.body.fullName ?? req.body.name ?? '').trim();
  const senderEmail = String(req.body.senderEmail ?? req.body.email ?? '').trim();
  const message = String(req.body.message ?? req.body.text ?? '').trim();

  if (!fullName || !senderEmail || !message) {
    return res.status(400).json({
      message: 'Full name, email, and message are required.',
    });
  }

  if (!EMAIL_RE.test(senderEmail)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  if (message.length > 5000) {
    return res.status(400).json({ message: 'Message is too long (max 5000 characters).' });
  }

  try {
    await sendPortfolioMessage({ fullName, senderEmail, message });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    const isConfig = /not configured/i.test(error.message);
    return res.status(500).json({
      message: isConfig
        ? 'Contact form is temporarily unavailable.'
        : 'Failed to send email. Please try again or email directly.',
    });
  }
});

module.exports = router;
