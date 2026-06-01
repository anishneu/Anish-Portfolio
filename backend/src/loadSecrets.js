const fs = require('fs');
const path = require('path');
const { resolveProvider, requiredKeysForProvider } = require('./emailProvider');

const SECRET_KEYS = [
  'GMAIL_USER',
  'GMAIL_PASS',
  'PORTFOLIO_CONTACT_TO',
  'RESEND_API_KEY',
  'RESEND_FROM',
  'EMAIL_PROVIDER',
];

function secretSearchDirs() {
  const dirs = new Set();
  if (process.env.SECRETS_PATH) dirs.add(process.env.SECRETS_PATH);
  dirs.add('/etc/secrets');
  dirs.add(process.cwd());
  dirs.add(path.join(process.cwd(), 'backend'));
  dirs.add(path.resolve(__dirname, '..'));
  return [...dirs];
}

function readFileTrim(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '').trim();
}

function tryReadSecretFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return null;
    const value = readFileTrim(filePath);
    return value || null;
  } catch {
    return null;
  }
}

function listSecretFilenames() {
  const names = new Set();
  for (const dir of secretSearchDirs()) {
    if (!fs.existsSync(dir)) continue;
    try {
      for (const entry of fs.readdirSync(dir)) {
        names.add(entry);
      }
    } catch {
      /* ignore */
    }
  }
  return [...names];
}

/**
 * Load Render secret files. File values override existing env vars when present.
 * Render mounts at /etc/secrets/<filename> and (native Node) service root directory.
 */
function loadSecretsFromFiles() {
  const keyByUpper = new Map(SECRET_KEYS.map((k) => [k.toUpperCase(), k]));
  const applied = new Set();

  for (const dir of secretSearchDirs()) {
    if (!fs.existsSync(dir)) continue;

    let entries = [];
    try {
      entries = fs.readdirSync(dir);
    } catch {
      continue;
    }

    for (const filename of entries) {
      const base = filename.replace(/\.txt$/i, '');
      const envKey = keyByUpper.get(base.toUpperCase());
      if (!envKey) continue;

      const value = tryReadSecretFile(path.join(dir, filename));
      if (value) {
        process.env[envKey] = value;
        applied.add(envKey);
      }
    }
  }

  for (const key of SECRET_KEYS) {
    for (const dir of secretSearchDirs()) {
      const value = tryReadSecretFile(path.join(dir, key));
      if (value) {
        process.env[key] = value;
        applied.add(key);
      }
    }
  }

  return applied.size;
}

function getCredentialsStatus() {
  const provider = resolveProvider();
  const required = requiredKeysForProvider(provider);
  const missing = required.filter((key) => !process.env[key]?.trim());
  const onRender = Boolean(process.env.RENDER);

  return {
    provider,
    configured: missing.length === 0,
    missing,
    onRender,
    renderSmtpBlocked: onRender && provider === 'smtp',
    hint:
      onRender && provider === 'smtp'
        ? 'Render free tier blocks Gmail SMTP (ETIMEDOUT). Add RESEND_API_KEY and EMAIL_PROVIDER=resend.'
        : undefined,
    secretFilesPresent: listSecretFilenames(),
    searchDirs: secretSearchDirs().filter((d) => fs.existsSync(d)),
    sources: Object.fromEntries(
      SECRET_KEYS.map((key) => [key, process.env[key]?.trim() ? 'set' : 'missing'])
    ),
  };
}

module.exports = {
  loadSecretsFromFiles,
  getCredentialsStatus,
  listSecretFilenames,
  SECRET_KEYS,
};
