// routes/Posts.js
const { Router } = require("express");
const { getPosts, createPosts, fetchPosts } = require("../controllers/Posts");
const authenticateToken = require("../auth/authMiddleware"); // Import the middleware

const router = Router();

router.get('/', getPosts); // Apply the middleware to getPosts route
router.post('/create-post', createPosts); // Apply the middleware to createPosts route
router.get('/:postID', fetchPosts); // Apply the middleware to fetchPosts route

module.exports = router;
