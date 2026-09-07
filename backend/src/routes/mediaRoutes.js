const express = require('express');
const { getProjectImage } = require('../store/contentStore');

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const file = await getProjectImage(String(req.params.id || '').replace(/[^\w-]/g, ''));
    if (!file) {
      return res.status(404).json({ message: 'Image not found.' });
    }
    res.set({
      'Content-Type': file.mime || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000',
    });
    return res.send(file.buffer);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
