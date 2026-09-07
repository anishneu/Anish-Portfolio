const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const speakeasy = require('speakeasy');

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-cms-'));
const totp = speakeasy.generateSecret({ length: 20 });

process.env.CONTENT_DATA_DIR = dataDir;
process.env.TOTP_SECRET = totp.base32;
process.env.JWT_SECRET = 'test-jwt-secret-please-change-32b!!';
process.env.MONGODB_URI = '';
process.env.CORS_ORIGINS = '';

const { createApp } = require('../src/createApp');

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({ server, base: `http://127.0.0.1:${port}` });
    });
  });
}

function currentCode() {
  return speakeasy.totp({ secret: totp.base32, encoding: 'base32' });
}

describe('admin CMS', () => {
  let server;
  let base;

  before(async () => {
    ({ server, base } = await listen(createApp()));
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  it('serves live content without auth', async () => {
    const res = await fetch(`${base}/content`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.profile.name, 'Anish Kuila');
    assert.ok(Array.isArray(body.projects));
    assert.ok(Array.isArray(body.skillGroups));
    assert.equal(body.resume.available, false);
  });

  it('rejects unauthenticated writes', async () => {
    const res = await fetch(`${base}/admin/about`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ about: ['Nope'] }),
    });
    assert.equal(res.status, 401);
  });

  it('rejects a bad OTP', async () => {
    const res = await fetch(`${base}/admin/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: '000000' }),
    });
    assert.equal(res.status, 401);
  });

  it('unlocks with a valid TOTP and persists about/skills', async () => {
    const otp = await fetch(`${base}/admin/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: currentCode() }),
    });
    assert.equal(otp.status, 200);
    const session = await otp.json();
    assert.ok(session.token);

    const auth = { Authorization: `Bearer ${session.token}`, 'Content-Type': 'application/json' };

    const about = await fetch(`${base}/admin/about`, {
      method: 'PUT',
      headers: auth,
      body: JSON.stringify({ about: ['Live about from the admin desk.'] }),
    });
    assert.equal(about.status, 200);
    const saved = await about.json();
    assert.deepEqual(saved.profile.about, ['Live about from the admin desk.']);

    const skills = await fetch(`${base}/admin/skills`, {
      method: 'PUT',
      headers: auth,
      body: JSON.stringify({ items: [{ title: 'Tools', items: ['Cypress'] }] }),
    });
    assert.equal(skills.status, 200);

    const publicContent = await fetch(`${base}/content`).then((res) => res.json());
    assert.deepEqual(publicContent.profile.about, ['Live about from the admin desk.']);
    assert.deepEqual(publicContent.skillGroups, [{ title: 'Tools', items: ['Cypress'] }]);
  });

  it('validates resume uploads and serves the latest PDF', async () => {
    const otp = await fetch(`${base}/admin/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: currentCode() }),
    });
    const { token } = await otp.json();

    const notPdf = new FormData();
    notPdf.append('file', new Blob(['hello'], { type: 'text/plain' }), 'notes.txt');
    const rejectType = await fetch(`${base}/admin/resume`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: notPdf,
    });
    assert.equal(rejectType.status, 400);

    const fakePdf = new FormData();
    fakePdf.append('file', new Blob(['not-a-pdf'], { type: 'application/pdf' }), 'resume.pdf');
    const rejectMagic = await fetch(`${base}/admin/resume`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: fakePdf,
    });
    assert.equal(rejectMagic.status, 400);

    const pdf = new FormData();
    pdf.append(
      'file',
      new Blob(['%PDF-1.4 test resume'], { type: 'application/pdf' }),
      'Anish Kuila.pdf'
    );
    const uploaded = await fetch(`${base}/admin/resume`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: pdf,
    });
    assert.equal(uploaded.status, 200);
    const body = await uploaded.json();
    assert.equal(body.resume.available, true);

    const file = await fetch(`${base}/resume`);
    assert.equal(file.status, 200);
    assert.match(file.headers.get('content-type'), /pdf/);
    const bytes = Buffer.from(await file.arrayBuffer());
    assert.equal(bytes.slice(0, 5).toString(), '%PDF-');
  });
});

describe('OTP rate limit', () => {
  it('blocks a sixth attempt in the window', async () => {
    const { server, base } = await listen(createApp());
    try {
      let last;
      for (let i = 0; i < 6; i += 1) {
        last = await fetch(`${base}/admin/otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: '111111' }),
        });
      }
      assert.equal(last.status, 429);
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });
});
