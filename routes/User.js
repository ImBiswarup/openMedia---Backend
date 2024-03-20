// routes/User.js
const express = require('express');
const router = express.Router();
const { signupHandler, logInHandler } = require('../controllers/User');
const authMiddleware = require('../auth/authMiddleware');

router.post('/login', logInHandler);
router.post('/signup', signupHandler);
router.get('/profile', authMiddleware, (req, res) => {
    res.send(req.user); 
});

module.exports = router;
