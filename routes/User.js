
const express = require('express');
const router = express.Router();
const { loginHandler, signupHandler } = require('../controllers/User');
const User = require('../models/User');
const Post = require('../models/Posts');

router.post('/login', loginHandler);

router.post('/signup', signupHandler);



module.exports = router;
