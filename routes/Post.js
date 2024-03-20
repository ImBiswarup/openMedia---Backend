const express = require('express');
const router = express.Router();
const { uploadPost, getPosts } = require('../controllers/Post');
const upload = require('../middleware/multer')

router.post('/posts/upload', upload, uploadPost);
router.get('/posts', getPosts);

module.exports = router;
