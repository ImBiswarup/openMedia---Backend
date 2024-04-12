const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Router } = require("express");
const router = Router();
const { getPosts, fetchPosts, createPosts } = require('../controllers/Posts')
const authenticateToken = require("../auth/authMiddleware");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, './public/uploads');
    // },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

router.get('/', getPosts);

router.post('/uploads', upload.single('image'), authenticateToken, createPosts);

router.get('/:postID', fetchPosts);

module.exports = router;