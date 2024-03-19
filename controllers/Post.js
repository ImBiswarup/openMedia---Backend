const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./uploads`));
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({
    storage: storage
}).single('image');

const uploadPost = async (req, res) => {
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.path;
        }

        const { createdBy, description } = req.body;

        const newPost = await Post.create({
            createdBy,
            description,
            imageUrl,
        });

        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save post' });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
};


module.exports = { uploadPost, upload, getPosts };
