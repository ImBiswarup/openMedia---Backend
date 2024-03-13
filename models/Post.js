const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    username: String,
    desc: String,
    image: String,
    time: Date
});
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
