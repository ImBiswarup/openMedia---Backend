const { mongoose, Schema } = require('mongoose');

const postSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
