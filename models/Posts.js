// post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
