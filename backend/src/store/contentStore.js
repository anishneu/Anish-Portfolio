const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');
const defaults = require('../content/defaults');

const DATA_DIR = process.env.CONTENT_DATA_DIR
  ? path.resolve(process.env.CONTENT_DATA_DIR)
  : path.join(__dirname, '..', '..', 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');
const RESUME_FILE = path.join(DATA_DIR, 'resume.pdf');
const DOC_ID = 'main';

let mongoClient = null;
let mongoDb = null;

function cloneDefaults() {
  return JSON.parse(JSON.stringify({
    profile: defaults.profile,
    experience: defaults.experience,
    education: defaults.education,
    skillGroups: defaults.skillGroups,
    projects: defaults.projects,
    resume: { file: null, updatedAt: null },
  }));
}

function publicContent(doc) {
  const data = doc || cloneDefaults();
  return {
    profile: data.profile || defaults.profile,
    experience: data.experience || defaults.experience,
    education: data.education || defaults.education,
    skillGroups: data.skillGroups || defaults.skillGroups,
    projects: data.projects || defaults.projects,
    resume: {
      file: data.resume?.file || null,
      updatedAt: data.resume?.updatedAt || null,
      available: Boolean(data.resume?.file),
    },
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

async function getContent() {
  return publicContent(await readDoc());
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

async function saveResume(filename, buffer) {
  const db = await getMongo();
  const updatedAt = new Date().toISOString();
  if (db) {
    await db.collection('files').updateOne(
      { _id: 'resume' },
      { $set: { filename, updatedAt, data: buffer } },
      { upsert: true }
    );
  } else {
    ensureDataDir();
    fs.writeFileSync(RESUME_FILE, buffer);
  }
  const doc = await readDoc();
  doc.resume = { file: filename, updatedAt };
  await writeDoc(doc);
  return publicContent(doc);
}

async function deleteResume() {
  const db = await getMongo();
  if (db) {
    await db.collection('files').deleteOne({ _id: 'resume' });
  } else if (fs.existsSync(RESUME_FILE)) {
    fs.unlinkSync(RESUME_FILE);
  }
  const doc = await readDoc();
  doc.resume = { file: null, updatedAt: null };
  await writeDoc(doc);
  return publicContent(doc);
}

async function getResume() {
  const db = await getMongo();
  if (db) {
    const file = await db.collection('files').findOne({ _id: 'resume' });
    if (!file?.data) return null;
    return {
      filename: file.filename || 'resume.pdf',
      buffer: file.data.buffer ? Buffer.from(file.data.buffer) : Buffer.from(file.data),
    };
  }
  if (!fs.existsSync(RESUME_FILE)) return null;
  const doc = readFileDoc();
  return {
    filename: doc.resume?.file || 'resume.pdf',
    buffer: fs.readFileSync(RESUME_FILE),
  };
}

module.exports = {
  getContent,
  updateSection,
  saveResume,
  deleteResume,
  getResume,
};
