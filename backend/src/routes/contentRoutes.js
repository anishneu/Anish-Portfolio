const express = require('express');
const { getContent } = require('../store/contentStore');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const content = await getContent();
    res.set('Cache-Control', 'no-store');
    res.json(content);
  } catch (err) {
    console.error('Content read failed:', err.message);
    res.status(500).json({ message: 'Could not load content.' });
  }
});

module.exports = router;
