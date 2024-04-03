const { Router } = require("express");
const { getPosts, createPosts, fetchPosts } = require("../controllers/Posts");
const authenticateToken = require("../auth/authMiddleware");

const router = Router();

router.get('/', getPosts);
router.post('/create-post', authenticateToken, createPosts);
router.get('/:postID', authenticateToken, fetchPosts);

// router.post('/create-post', async (req, res) => {
//     try {
//         const { text, imageUrl, createdBy } = req.body;
//         const newPost = new Post({ text, imageUrl, createdBy });
//         console.log(newPost);
//         await newPost.save();
//         res.status(200).json({ message: 'Post created successfully', post: newPost });
//     } catch (error) {
//         res.status(500).json({ error: 'Error creating post', details: error.message });
//     }
// });

module.exports = router;
