const express = require('express');
const router = express.Router();
const { signupHandler, logInHandler } = require('../controllers/User');

router.post('/login', logInHandler);
router.post('/signup', signupHandler);

module.exports = router;
