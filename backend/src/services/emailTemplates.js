function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildPlainText({ fullName, senderEmail, message }) {
  return [
    'New message from your portfolio',
    '────────────────────────────',
    `Full name: ${fullName}`,
    `Email:     ${senderEmail}`,
    '',
    'Message:',
    message,
    '',
    `Reply to: ${senderEmail}`,
  ].join('\n');
}

function buildHtmlEmail({ fullName, senderEmail, message }) {
  const safeName = escapeHtml(fullName);
  const safeEmail = escapeHtml(senderEmail);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const sentAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Portfolio contact</title>
</head>
<body style="margin:0;padding:0;background:#f3ede4;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3ede4;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#fffcf8;border-radius:16px;overflow:hidden;border:1px solid rgba(28,25,23,0.08);box-shadow:0 12px 40px rgba(28,25,23,0.08);">
          <tr>
            <td style="background:linear-gradient(135deg,#a67c52 0%,#c97852 100%);padding:28px 32px;">
              <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,252,248,0.85);font-weight:600;">Portfolio</p>
              <h1 style="margin:0;font-size:22px;line-height:1.3;color:#fffcf8;font-weight:700;">New contact message</h1>
              <p style="margin:10px 0 0;font-size:13px;color:rgba(255,252,248,0.9);">${sentAt}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:14px 16px;background:#faf7f2;border-radius:12px;border:1px solid rgba(28,25,23,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#787068;font-weight:600;">Full name</p>
                    <p style="margin:0;font-size:16px;color:#1c1917;font-weight:600;">${safeName}</p>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="padding:14px 16px;background:#faf7f2;border-radius:12px;border:1px solid rgba(28,25,23,0.06);">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#787068;font-weight:600;">Email ID</p>
                    <p style="margin:0;font-size:16px;">
                      <a href="mailto:${safeEmail}" style="color:#a67c52;text-decoration:none;font-weight:600;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#787068;font-weight:600;">Your message</p>
              <div style="padding:18px 20px;background:#ffffff;border-radius:12px;border:1px solid rgba(166,124,82,0.22);border-left:4px solid #a67c52;">
                <p style="margin:0;font-size:15px;line-height:1.65;color:#1c1917;">${safeMessage}</p>
              </div>
              <p style="margin:24px 0 0;font-size:13px;color:#787068;line-height:1.5;">
                You can reply directly to this email — it will go to <strong style="color:#1c1917;">${safeEmail}</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid rgba(28,25,23,0.06);">
              <p style="margin:0;font-size:12px;color:#a39e94;text-align:center;">Sent from anishkuila.com · Contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

module.exports = { buildPlainText, buildHtmlEmail };
