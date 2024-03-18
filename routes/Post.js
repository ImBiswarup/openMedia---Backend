const express = require('express');
const router = express.Router();
const { uploadPost, upload } = require('../controllers/Post');

router.post('/upload', upload, uploadPost);

module.exports = router;
