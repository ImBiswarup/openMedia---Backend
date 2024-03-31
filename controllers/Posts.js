const Post = require('../models/Posts');

const getPosts = async (req, res) => {
    const posts = await Post.find({})
    if (!posts) return res.status(401).json({ msg: 'No posts found' });
    res.status(200).json({ posts: posts });
}

const createPosts = async (req, res) => {
    const { text } = req.body
    if (!text) return res.status(401).json({ msg: 'No text found, can not post like that' });
    const posts = await Post.create({
        text: text,
    })
    res.status(200).json({ posts: posts, msg: 'Post created successfully' });
}

module.exports = {
    getPosts, createPosts,
};