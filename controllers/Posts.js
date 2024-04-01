const Post = require('../models/Posts');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('createdBy');
        if (!posts) return res.status(401).json({ msg: 'No posts found' });
        res.status(200).json({ posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createPosts = async (req, res) => {
    const { text } = req.body
    if (!text) return res.status(401).json({ msg: 'No text found, can not post like that' });
    try {
        const posts = await Post.create({
            text: text,
            createdBy: req.user.id // Assuming you have authenticated the user and added their ID to req.user
        });
        res.status(200).json({ posts, msg: 'Post created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const fetchPosts = async (req, res) => {
    try {
        const postID = req.params.postID;
        const post = await Post.findById(postID).populate('createdBy');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getPosts, createPosts, fetchPosts
};