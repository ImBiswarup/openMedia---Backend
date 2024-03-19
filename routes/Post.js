const express = require('express');
const router = express.Router();
const { uploadPost, upload, getPosts } = require('../controllers/Post');

router.post('/posts/upload', upload, uploadPost);
router.get('/posts', getPosts);

module.exports = router;
