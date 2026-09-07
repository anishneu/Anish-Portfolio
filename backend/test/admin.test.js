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
    assert.equal(session.expiresIn, 15 * 60);

    const live = await fetch(`${base}/admin/session`, {
      headers: { Authorization: `Bearer ${session.token}` },
    });
    assert.equal(live.status, 200);
    const liveBody = await live.json();
    assert.ok(liveBody.expiresIn > 0);
    assert.ok(liveBody.expiresIn <= 15 * 60);

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
    assert.equal(body.resume.versions.length, 1);

    const second = new FormData();
    second.append(
      'file',
      new Blob(['%PDF-1.4 second resume'], { type: 'application/pdf' }),
      'Anish Kuila v2.pdf'
    );
    const uploadedAgain = await fetch(`${base}/admin/resume`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: second,
    });
    const history = await uploadedAgain.json();
    assert.equal(history.resume.versions.length, 2);
    assert.equal(history.resume.file, 'Anish Kuila v2.pdf');

    const file = await fetch(`${base}/resume`);
    assert.equal(file.status, 200);
    assert.match(file.headers.get('content-type'), /pdf/);
    const bytes = Buffer.from(await file.arrayBuffer());
    assert.equal(bytes.slice(0, 5).toString(), '%PDF-');

    const oldId = history.resume.versions[1].id;
    const removed = await fetch(`${base}/admin/resume/${oldId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(removed.status, 200);
    const afterDelete = await removed.json();
    assert.equal(afterDelete.resume.versions.length, 1);
  });

  it('accepts a project image upload and serves it', async () => {
    const otp = await fetch(`${base}/admin/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: currentCode() }),
    });
    const { token } = await otp.json();
    const png = Buffer.from(
      '89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000a49444154789c63000100000500010d0a2db40000000049454e44ae426082',
      'hex'
    );
    const image = new FormData();
    image.append('file', new Blob([png], { type: 'image/png' }), 'cover.png');
    const uploaded = await fetch(`${base}/admin/project-image`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: image,
    });
    assert.equal(uploaded.status, 200);
    const saved = await uploaded.json();
    assert.match(saved.url, /\/media\//);
    const served = await fetch(`${base}${saved.url}`);
    assert.equal(served.status, 200);
    assert.match(served.headers.get('content-type'), /image\/png/);
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
