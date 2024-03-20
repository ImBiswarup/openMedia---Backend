const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token) {
            throw new Error('Authorization token is missing');
        }

        const decoded = jwt.verify(token.replace('Bearer ', ''), 'BiswarupGhosh@2003');

        const user = await User.findById(decoded._id);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user; // Store user information in the request object
        next();
        console.log(req.user, user)
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = authMiddleware;
