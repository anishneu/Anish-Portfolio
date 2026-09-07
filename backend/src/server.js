const dotenv = require('dotenv');
const { loadSecretsFromFiles, getCredentialsStatus } = require('./loadSecrets');
const { verifyEmailConnection } = require('./services/emailService');
const { createApp } = require('./createApp');

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

const app = createApp();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (credentials.configured) {
    verifyEmailConnection()
      .then((result) => {
        if (result.provider === 'resend') {
          console.log('Email ready via Resend API');
        } else {
          console.log(`SMTP ready on port ${result.port}`);
        }
      })
      .catch((err) => console.error('Email startup check failed:', err.code, err.message));
  } else if (credentials.renderSmtpBlocked) {
    console.error(credentials.hint);
  }
});
