const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
}, 
{ timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
