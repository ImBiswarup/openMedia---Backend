const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
}, 
{ timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
