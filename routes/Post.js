const express = require('express');
const router = express.Router();
const { uploadPost, getPosts, createPost, getPostsByUserId } = require('../controllers/Post');
const upload = require('../middleware/multer')
const authMiddleware = require('../auth/authMiddleware');

router.post('/posts/upload', authMiddleware, upload, uploadPost);
router.get('/posts', authMiddleware, getPosts);
router.get('/posts/:userId', authMiddleware, getPostsByUserId);

module.exports = router;



module.exports = router;
