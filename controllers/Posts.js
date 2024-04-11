const Post = require('../models/Posts');
const User = require('../models/User');
const cloudinary = require('cloudinary').v2;


const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('createdBy')
        if (!posts) return res.status(401).json({ msg: 'No posts found' });
        res.status(200).json({ posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createPosts = async (req, res) => {
    try {
        const { text } = req.body;
        const imageFile = req.file;
        const userID = await User.find({ email: req.user.email })
        if (!text) {
            return res.status(400).json({ msg: 'No text found, cannot post like that' });
        }
        let imageUrl = null;
        if (imageFile) {
            const cloudinaryResult = await cloudinary.uploader.upload(imageFile.path);
            imageUrl = cloudinaryResult.secure_url;
        }

        const newPost = await Post.create({
            text: text,
            imageUrl: imageUrl,
            createdBy: userID[0]._id,
        });

        // console.log('New post created:', newPost);

        res.status(201).json({ post: newPost, msg: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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