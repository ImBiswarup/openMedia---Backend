const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

const uploadPost = (req, res) => {
    let imageUrl = '';
    if (req.file) {
        imageUrl = req.file.path;
    }

    const { user, content } = req.body;

    const userId = req.user;

    const newPost = new Post({ user: userId, content, imageUrl });
    newPost.save()
        .then(post => {
            res.json(post);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to save post' });
        });
};

const storage = multer.diskStorage({
    destination: './uploads/', 
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

// Multer upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: fileFilter
}).single('image');

module.exports = { uploadPost, upload, fileFilter };
