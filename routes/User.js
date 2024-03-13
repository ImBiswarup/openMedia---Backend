const express = require('express');
const router = express.Router();
const {signupHandler, signinHandler} = require('../controllers/User')

router.post('/signup', signinHandler);
router.post('/api/signup', signupHandler);



module.exports = router;
