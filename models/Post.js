const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    createdBy: {
        type: String,
        ref: 'User',
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String
    }
},
    { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
