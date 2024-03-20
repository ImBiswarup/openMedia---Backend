const Post = require('../models/Post');

const uploadPost = async (req, res) => {
    try {
        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.path;
        }
        const { createdBy, description } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Description cannot be empty' });
        }

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
const createPost = async (req, res) => {
    try {
        const userId = req.user._id;

        const { description, imageUrl } = req.body;

        if (!description) {
            return res.status(400).json({ error: 'Description cannot be empty' });
        }

        const post = await Post.create({
            createdBy: userId,
            description,
            imageUrl
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message);
    }
    console.log("user is",req.user)
};



const getPostsByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const posts = await Post.find({ createdBy: userId });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};


module.exports = { uploadPost, getPosts, createPost, getPostsByUserId };
