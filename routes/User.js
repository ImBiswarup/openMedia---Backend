
const express = require('express');
const router = express.Router();
const { loginHandler, signupHandler } = require('../controllers/User');
const User = require('../models/User');

router.post('/login', loginHandler);

router.post('/signup', signupHandler);

router.get('/', async (req, res) => {
    const users = await User.find({});
    res.json({ users: users });
})

module.exports = router;
