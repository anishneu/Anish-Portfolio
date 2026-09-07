const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');
const createAuthRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const { getCredentialsStatus } = require('./loadSecrets');

function createApp() {
  const app = express();

  if (process.env.RENDER || process.env.TRUST_PROXY === '1') {
    app.set('trust proxy', 1);
  }

  const corsOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
    : true;

  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
  app.use(bodyParser.json({ limit: '1mb' }));

  app.get('/', (req, res) => {
    res.json({
      service: 'portfolio-api',
      endpoints: {
        health: 'GET /health',
        emailStatus: 'GET /email/status',
        sendContact: 'POST /email/send',
        content: 'GET /content',
        resume: 'GET /resume',
        media: 'GET /media/:id',
        adminOtp: 'POST /admin/otp',
      },
    });
  });

  app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'portfolio-api', email: getCredentialsStatus() });
  });

  app.use('/email', emailRoutes);
  app.use('/content', contentRoutes);
  app.use('/resume', resumeRoutes);
  app.use('/media', mediaRoutes);
  app.use('/admin', createAuthRoutes());
  app.use('/admin', adminRoutes);

  app.use((req, res) => {
    res.status(404).json({
      message: `No route for ${req.method} ${req.path}`,
      hint:
        req.path === '/email/send' && req.method === 'GET'
          ? 'Use POST /email/send with JSON body { fullName, senderEmail, message }. Opening this URL in a browser sends GET.'
          : undefined,
    });
  });

  return app;
}

module.exports = { createApp };
