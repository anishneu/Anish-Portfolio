const express = require('express');
const multer = require('multer');
const { requireAdmin } = require('../auth/session');
const {
  getContent,
  updateSection,
  saveResume,
  deleteResume,
  deleteResumeVersion,
  getResume,
  saveProjectImage,
} = require('../store/contentStore');

const router = express.Router();

const pdfUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const name = (file.originalname || '').toLowerCase();
    const type = file.mimetype || '';
    if (type === 'application/pdf' || name.endsWith('.pdf')) {
      cb(null, true);
      return;
    }
    cb(new Error('Only PDF resumes are allowed.'));
  },
});

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const name = (file.originalname || '').toLowerCase();
    const type = file.mimetype || '';
    if (type.startsWith('image/') || /\.(png|jpe?g|webp|gif)$/.test(name)) {
      cb(null, true);
      return;
    }
    cb(new Error('Only PNG, JPG, WEBP, or GIF images are allowed.'));
  },
});

function sniffImage(buffer) {
  if (!buffer || buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8) return { mime: 'image/jpeg', ext: '.jpg' };
  if (buffer[0] === 0x89 && buffer.slice(1, 4).toString() === 'PNG') return { mime: 'image/png', ext: '.png' };
  if (buffer.slice(0, 4).toString() === 'RIFF' && buffer.slice(8, 12).toString() === 'WEBP') {
    return { mime: 'image/webp', ext: '.webp' };
  }
  if (buffer.slice(0, 3).toString() === 'GIF') return { mime: 'image/gif', ext: '.gif' };
  return null;
}

router.use(requireAdmin);

router.get('/content', async (req, res) => {
  try {
    res.json(await getContent({ history: true }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/resume/:id', async (req, res) => {
  try {
    const file = await getResume(req.params.id);
    if (!file) return res.status(404).json({ message: 'Resume version not found.' });
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${file.filename.replace(/"/g, '')}"`,
      'Cache-Control': 'no-store',
    });
    return res.send(file.buffer);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

const SECTION_KEYS = {
  about: 'profile',
  profile: 'profile',
  experience: 'experience',
  skills: 'skillGroups',
  skillGroups: 'skillGroups',
  projects: 'projects',
};

router.put('/:section', async (req, res) => {
  const section = SECTION_KEYS[req.params.section];
  if (!section) {
    return res.status(404).json({ message: 'Unknown section.' });
  }
  try {
    let value = req.body;
    if (section === 'profile') {
      const current = await getContent();
      const about = Array.isArray(req.body?.about)
        ? req.body.about.map((p) => String(p || '').trim()).filter(Boolean)
        : current.profile.about;
      value = { ...current.profile, ...req.body, about };
    } else {
      value = Array.isArray(req.body) ? req.body : req.body?.items;
      if (!Array.isArray(value)) {
        return res.status(400).json({ message: 'Expected a list of items.' });
      }
    }
    const content = await updateSection(section, value);
    return res.json(await getContent({ history: true }));
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post('/resume', (req, res) => {
  pdfUpload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file?.buffer?.length) {
      return res.status(400).json({ message: 'Choose a PDF to upload.' });
    }
    if (req.file.buffer.slice(0, 5).toString() !== '%PDF-') {
      return res.status(400).json({ message: 'That file is not a valid PDF.' });
    }
    try {
      const filename = (req.file.originalname || 'resume.pdf').replace(/[^\w.\- ()]/g, '');
      const content = await saveResume(filename || 'resume.pdf', req.file.buffer);
      return res.json(content);
    } catch (saveErr) {
      return res.status(500).json({ message: saveErr.message });
    }
  });
});

router.post('/project-image', (req, res) => {
  imageUpload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file?.buffer?.length) {
      return res.status(400).json({ message: 'Choose an image to upload.' });
    }
    const sniffed = sniffImage(req.file.buffer);
    if (!sniffed) {
      return res.status(400).json({ message: 'That file is not a valid image.' });
    }
    try {
      const filename = (req.file.originalname || `project${sniffed.ext}`).replace(/[^\w.\- ()]/g, '');
      const saved = await saveProjectImage(filename || `project${sniffed.ext}`, req.file.buffer, sniffed.mime);
      return res.json(saved);
    } catch (saveErr) {
      return res.status(500).json({ message: saveErr.message });
    }
  });
});

router.delete('/resume/:id', async (req, res) => {
  try {
    res.json(await deleteResumeVersion(req.params.id));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/resume', async (req, res) => {
  try {
    res.json(await deleteResume());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
