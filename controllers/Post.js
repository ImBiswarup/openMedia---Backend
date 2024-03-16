// postController.js

const Post = require('../models/Post');

exports.uploadPost = (req, res) => {
    let imageUrl = '';
    if (req.file) {
        imageUrl = req.file
    }

    const { user,content } = req.body; // Assuming user ID is obtained from authentication middleware

    // Assuming user ID is obtained from authentication middleware
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
