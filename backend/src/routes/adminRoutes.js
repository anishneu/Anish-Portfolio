const express = require('express');
const multer = require('multer');
const { requireAdmin } = require('../auth/session');
const { getContent, updateSection, saveResume, deleteResume } = require('../store/contentStore');

const router = express.Router();
const upload = multer({
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

router.use(requireAdmin);

router.get('/content', async (req, res) => {
  try {
    res.json(await getContent());
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    return res.json(content);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post('/resume', (req, res) => {
  upload.single('file')(req, res, async (err) => {
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

router.delete('/resume', async (req, res) => {
  try {
    res.json(await deleteResume());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
