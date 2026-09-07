const express = require('express');
const { getResume } = require('../store/contentStore');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const file = await getResume();
    if (!file) {
      return res.status(404).json({ message: 'No uploaded resume yet.' });
    }
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${file.filename.replace(/"/g, '')}"`,
      'Cache-Control': 'no-store',
    });
    return res.send(file.buffer);
  } catch (err) {
    console.error('Resume read failed:', err.message);
    return res.status(500).json({ message: 'Could not load resume.' });
  }
});

module.exports = router;
