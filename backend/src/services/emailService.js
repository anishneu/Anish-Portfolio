const axios = require('axios');
const nodemailer = require('nodemailer');
const { resolveProvider } = require('../emailProvider');
const { buildPlainText, buildHtmlEmail } = require('./emailTemplates');

const DEFAULT_INBOX = 'cyberzerox27@gmail.com';
const DEFAULT_RESEND_FROM = 'Anish Portfolio <onboarding@resend.dev>';

function normalizeAppPassword(pass) {
  return String(pass).trim().replace(/\s+/g, '');
}

function isRenderHost() {
  return Boolean(process.env.RENDER);
}

function getAuth() {
  const user = process.env.GMAIL_USER?.trim();
  const pass = process.env.GMAIL_PASS ? normalizeAppPassword(process.env.GMAIL_PASS) : '';

  if (!user || !pass) {
    throw new Error('Email is not configured. Set GMAIL_USER and GMAIL_PASS (env or secret files).');
  }

  return { user, pass };
}

function createSmtpTransport(port) {
  const { user, pass } = getAuth();
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: { user, pass },
    ...(port === 587 ? { requireTLS: true } : {}),
    connectionTimeout: 25000,
    greetingTimeout: 25000,
    socketTimeout: 25000,
  });
}

async function verifySmtpConnection() {
  const ports = process.env.SMTP_PORT
    ? [Number(process.env.SMTP_PORT)]
    : [587, 465];

  let lastError;
  for (const port of ports) {
    try {
      const transporter = createSmtpTransport(port);
      await transporter.verify();
      process.env.SMTP_PORT = String(port);
      return { ok: true, provider: 'smtp', port };
    } catch (error) {
      lastError = error;
      console.warn(`SMTP verify failed on port ${port}:`, error.code, error.message);
    }
  }
  throw lastError || new Error('SMTP verification failed');
}

async function sendViaSmtp({ fullName, senderEmail, message }) {
  const { user } = getAuth();
  const to = process.env.PORTFOLIO_CONTACT_TO?.trim() || DEFAULT_INBOX;
  const subject = `Portfolio · Message from ${fullName}`;

  const mailOptions = {
    from: `"Anish Portfolio" <${user}>`,
    to,
    replyTo: senderEmail,
    subject,
    text: buildPlainText({ fullName, senderEmail, message }),
    html: buildHtmlEmail({ fullName, senderEmail, message }),
  };

  const ports = process.env.SMTP_PORT
    ? [Number(process.env.SMTP_PORT)]
    : [587, 465];

  let lastError;
  for (const port of ports) {
    try {
      const transporter = createSmtpTransport(port);
      return await transporter.sendMail(mailOptions);
    } catch (error) {
      lastError = error;
      console.warn(`Send failed on SMTP port ${port}:`, error.code, error.message);
    }
  }
  throw lastError;
}

async function sendViaResend({ fullName, senderEmail, message }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured.');
  }

  const to = process.env.PORTFOLIO_CONTACT_TO?.trim() || DEFAULT_INBOX;
  const from = process.env.RESEND_FROM?.trim() || DEFAULT_RESEND_FROM;
  const subject = `Portfolio · Message from ${fullName}`;

  try {
    const { data } = await axios.post(
      'https://api.resend.com/emails',
      {
        from,
        to: [to],
        reply_to: senderEmail,
        subject,
        html: buildHtmlEmail({ fullName, senderEmail, message }),
        text: buildPlainText({ fullName, senderEmail, message }),
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );
    return data;
  } catch (error) {
    const status = error.response?.status;
    const detail =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message;
    const wrapped = new Error(detail || 'Resend API request failed');
    wrapped.code = error.code;
    wrapped.status = status;
    throw wrapped;
  }
}

async function verifyEmailConnection() {
  const provider = resolveProvider();

  if (provider === 'resend') {
    console.log('Email provider: Resend (HTTPS) — works on Render free tier');
    return { ok: true, provider: 'resend' };
  }

  if (isRenderHost()) {
    console.warn(
      'Running on Render with Gmail SMTP. Free tier blocks ports 587/465 (ETIMEDOUT). ' +
        'Set RESEND_API_KEY + EMAIL_PROVIDER=resend, or upgrade Render to a paid instance.'
    );
  }

  const result = await verifySmtpConnection();
  return { ...result, provider: 'smtp' };
}

async function sendPortfolioMessage(payload) {
  const provider = resolveProvider();
  if (provider === 'resend') {
    return sendViaResend(payload);
  }
  return sendViaSmtp(payload);
}

module.exports = {
  sendPortfolioMessage,
  verifyEmailConnection,
  verifySmtpConnection,
  buildHtmlEmail,
  buildPlainText,
};
