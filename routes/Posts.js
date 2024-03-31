const { Router } = require("express");
const { getPosts, createPosts } = require("../controllers/Posts");

const router = Router();

router.get('/', getPosts);

router.post('/create-post', createPosts);

router.get('/:postID', async (req, res) => {
    try {
        const postID = req.params.postID;
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ post });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;