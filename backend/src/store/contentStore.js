const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const defaults = require('../content/defaults');

const DATA_DIR = process.env.CONTENT_DATA_DIR
  ? path.resolve(process.env.CONTENT_DATA_DIR)
  : path.join(__dirname, '..', '..', 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const RESUME_FILE = path.join(DATA_DIR, 'resume.pdf');
const RESUME_DIR = path.join(DATA_DIR, 'resumes');
const IMAGE_DIR = path.join(DATA_DIR, 'images');
const DOC_ID = 'main';

function makeId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeResume(doc) {
  if (Array.isArray(doc.resume?.versions)) return doc;
  const file = doc.resume?.file || null;
  const updatedAt = doc.resume?.updatedAt || null;
  if (!file) {
    doc.resume = { currentId: null, versions: [] };
    return doc;
  }
  doc.resume = {
    currentId: 'legacy',
    versions: [{ id: 'legacy', file, updatedAt }],
  };
  return doc;
}

function resumeView(doc) {
  const data = normalizeResume(doc || {});
  const versions = data.resume.versions || [];
  const current = versions.find((item) => item.id === data.resume.currentId) || versions[0] || null;
  return {
    file: current?.file || null,
    updatedAt: current?.updatedAt || null,
    available: Boolean(current),
    currentId: current?.id || null,
    versions,
  };
}

let mongoClient = null;
let mongoDb = null;

function cloneDefaults() {
  return JSON.parse(JSON.stringify({
    profile: defaults.profile,
    experience: defaults.experience,
    education: defaults.education,
    skillGroups: defaults.skillGroups,
    projects: defaults.projects,
    resume: { currentId: null, versions: [] },
  }));
}

function publicContent(doc, { history = false } = {}) {
  const data = doc || cloneDefaults();
  const resume = resumeView(data);
  return {
    profile: data.profile || defaults.profile,
    experience: data.experience || defaults.experience,
    education: data.education || defaults.education,
    skillGroups: data.skillGroups || defaults.skillGroups,
    projects: data.projects || defaults.projects,
    resume: history
      ? resume
      : { file: resume.file, updatedAt: resume.updatedAt, available: resume.available },
  };
}

async function getMongo() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) return null;
  if (mongoDb) return mongoDb;
  mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  mongoDb = mongoClient.db(process.env.MONGODB_DB || 'portfolio');
  return mongoDb;
}

function ensureDataDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readFileDoc() {
  ensureDataDir();
  if (!fs.existsSync(CONTENT_FILE)) {
    const fresh = cloneDefaults();
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(fresh, null, 2));
    return fresh;
  }
  return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
}

function writeFileDoc(doc) {
  ensureDataDir();
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(doc, null, 2));
}

async function readDoc() {
  const db = await getMongo();
  if (!db) return readFileDoc();
  const found = await db.collection('content').findOne({ _id: DOC_ID });
  if (found) return found;
  const fresh = cloneDefaults();
  await db.collection('content').insertOne({ _id: DOC_ID, ...fresh });
  return fresh;
}

async function writeDoc(doc) {
  const db = await getMongo();
  if (!db) {
    writeFileDoc(doc);
    return;
  }
  const { _id, ...rest } = doc;
  await db.collection('content').updateOne(
    { _id: DOC_ID },
    { $set: rest },
    { upsert: true }
  );
}

async function getContent(options) {
  return publicContent(await readDoc(), options);
}

async function updateSection(section, value) {
  const allowed = new Set(['profile', 'experience', 'education', 'skillGroups', 'projects']);
  if (!allowed.has(section)) {
    throw new Error('Unknown section');
  }
  const doc = await readDoc();
  doc[section] = value;
  await writeDoc(doc);
  return publicContent(doc);
}

async function writeBinary(kind, id, filename, buffer, mime) {
  const db = await getMongo();
  const updatedAt = new Date().toISOString();
  if (db) {
    await db.collection('files').updateOne(
      { _id: `${kind}:${id}` },
      { $set: { kind, filename, mime, updatedAt, data: buffer } },
      { upsert: true }
    );
    return updatedAt;
  }
  ensureDataDir();
  if (kind === 'resume') {
    fs.mkdirSync(RESUME_DIR, { recursive: true });
    fs.writeFileSync(path.join(RESUME_DIR, `${id}.pdf`), buffer);
  } else {
    const ext = path.extname(filename || '') || '.img';
    fs.mkdirSync(IMAGE_DIR, { recursive: true });
    fs.writeFileSync(path.join(IMAGE_DIR, `${id}${ext}`), buffer);
    fs.writeFileSync(path.join(IMAGE_DIR, `${id}.json`), JSON.stringify({ filename, mime, ext }));
  }
  return updatedAt;
}

async function readBinary(kind, id) {
  const db = await getMongo();
  if (db) {
    const file = await db.collection('files').findOne({ _id: `${kind}:${id}` });
    if (!file?.data) return null;
    return {
      filename: file.filename || (kind === 'resume' ? 'resume.pdf' : 'image'),
      mime: file.mime || (kind === 'resume' ? 'application/pdf' : 'application/octet-stream'),
      buffer: file.data.buffer ? Buffer.from(file.data.buffer) : Buffer.from(file.data),
    };
  }
  if (kind === 'resume') {
    const versionPath = path.join(RESUME_DIR, `${id}.pdf`);
    if (fs.existsSync(versionPath)) {
      return { filename: `${id}.pdf`, mime: 'application/pdf', buffer: fs.readFileSync(versionPath) };
    }
    if (id === 'legacy' && fs.existsSync(RESUME_FILE)) {
      const doc = readFileDoc();
      return {
        filename: doc.resume?.file || 'resume.pdf',
        mime: 'application/pdf',
        buffer: fs.readFileSync(RESUME_FILE),
      };
    }
    return null;
  }
  if (!fs.existsSync(IMAGE_DIR)) return null;
  const metaPath = path.join(IMAGE_DIR, `${id}.json`);
  const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf8')) : { ext: '', mime: 'application/octet-stream', filename: id };
  const filePath = path.join(IMAGE_DIR, `${id}${meta.ext || ''}`);
  if (!fs.existsSync(filePath)) return null;
  return { filename: meta.filename || id, mime: meta.mime, buffer: fs.readFileSync(filePath) };
}

async function removeBinary(kind, id) {
  const db = await getMongo();
  if (db) {
    await db.collection('files').deleteOne({ _id: `${kind}:${id}` });
    return;
  }
  if (kind === 'resume') {
    const versionPath = path.join(RESUME_DIR, `${id}.pdf`);
    if (fs.existsSync(versionPath)) fs.unlinkSync(versionPath);
    if (id === 'legacy' && fs.existsSync(RESUME_FILE)) fs.unlinkSync(RESUME_FILE);
    return;
  }
  if (!fs.existsSync(IMAGE_DIR)) return;
  for (const entry of fs.readdirSync(IMAGE_DIR)) {
    if (entry === `${id}.json` || entry.startsWith(`${id}.`)) {
      fs.unlinkSync(path.join(IMAGE_DIR, entry));
    }
  }
}

async function saveResume(filename, buffer) {
  const doc = normalizeResume(await readDoc());
  const id = makeId();
  const updatedAt = await writeBinary('resume', id, filename, buffer, 'application/pdf');
  doc.resume.versions = [{ id, file: filename, updatedAt }, ...(doc.resume.versions || [])];
  doc.resume.currentId = id;
  await writeDoc(doc);
  return publicContent(doc, { history: true });
}

async function deleteResumeVersion(id) {
  const doc = normalizeResume(await readDoc());
  const versions = doc.resume.versions || [];
  const target = id || doc.resume.currentId;
  if (!target) return publicContent(doc, { history: true });
  await removeBinary('resume', target);
  doc.resume.versions = versions.filter((item) => item.id !== target);
  if (doc.resume.currentId === target) {
    doc.resume.currentId = doc.resume.versions[0]?.id || null;
  }
  await writeDoc(doc);
  return publicContent(doc, { history: true });
}

async function deleteResume() {
  return deleteResumeVersion(null);
}

async function getResume(id) {
  const doc = normalizeResume(await readDoc());
  const resume = resumeView(doc);
  const versionId = id || resume.currentId;
  if (!versionId) return null;
  const file = await readBinary('resume', versionId);
  if (!file) return null;
  const meta = resume.versions.find((item) => item.id === versionId);
  return { filename: meta?.file || file.filename, buffer: file.buffer };
}

async function saveProjectImage(filename, buffer, mime) {
  const id = makeId();
  await writeBinary('image', id, filename, buffer, mime);
  return { id, url: `/media/${id}` };
}

async function getProjectImage(id) {
  return readBinary('image', id);
}

module.exports = {
  getContent,
  updateSection,
  saveResume,
  deleteResume,
  deleteResumeVersion,
  getResume,
  saveProjectImage,
  getProjectImage,
};
