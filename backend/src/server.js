const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const { loadSecretsFromFiles, getCredentialsStatus } = require('./loadSecrets');
const { verifySmtpConnection } = require('./services/emailService');

// Load .env first, then secret files (files override env when present)
dotenv.config();
const secretsLoaded = loadSecretsFromFiles();
const credentials = getCredentialsStatus();

console.log('CWD:', process.cwd());
console.log('Secrets loaded from files:', secretsLoaded);
console.log('Credential status:', credentials.sources);
if (credentials.secretFilesPresent.length) {
  console.log('Filenames found in secret search dirs:', credentials.secretFilesPresent.join(', '));
}
if (credentials.missing.length) {
  console.warn('Missing:', credentials.missing.join(', '));
}

const emailRoutes = require(path.join(__dirname, 'routes', 'emailRoutes'));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'portfolio-api', email: getCredentialsStatus() });
});

app.use('/email', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (credentials.configured) {
    verifySmtpConnection()
      .then(({ port }) => console.log(`SMTP ready on port ${port}`))
      .catch((err) => console.error('SMTP startup check failed:', err.code, err.message));
  }
});
