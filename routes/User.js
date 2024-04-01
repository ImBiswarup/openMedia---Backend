const express = require('express');
const router = express.Router();
const { loginHandler, signupHandler, getUsers } = require('../controllers/User');

router.get('/', getUsers);

router.post('/login', loginHandler);

router.post('/signup', signupHandler);



module.exports = router;
