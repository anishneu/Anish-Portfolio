const fs = require('fs');
const path = require('path');

/** Keys loaded from Render secret files (filename must match key name). */
const SECRET_KEYS = ['GMAIL_USER', 'GMAIL_PASS', 'PORTFOLIO_CONTACT_TO'];

/**
 * Render secret files are mounted at /etc/secrets/<filename>.
 * This fills process.env when values are not already set (e.g. from .env locally).
 */
function loadSecretsFromFiles() {
  const dirs = [process.env.SECRETS_PATH, '/etc/secrets'].filter(Boolean);
  let loaded = 0;

  for (const key of SECRET_KEYS) {
    if (process.env[key]) continue;

    for (const dir of dirs) {
      const filePath = path.join(dir, key);
      if (!fs.existsSync(filePath)) continue;

      const value = fs.readFileSync(filePath, 'utf8').trim();
      if (value) {
        process.env[key] = value;
        loaded += 1;
        break;
      }
    }
  }

  return loaded;
}

module.exports = { loadSecretsFromFiles, SECRET_KEYS };
