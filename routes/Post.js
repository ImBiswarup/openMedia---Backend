const express = require('express');
const router = express.Router();
const postController = require('../controllers/Post');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5000000 }, 
}).single('image');

router.post('/upload', upload, postController.uploadPost);

module.exports = router;
