// authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // Get token from request headers or cookies or query parameters, depending on your setup
    const token = req.headers.authorization;

    console.log('token: ', token);

    // If token is not provided, send unauthorized response
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ msg: 'Forbidden: Invalid token' });
        }

        // If token is valid, set the decoded user information on the request object
        req.user = decodedToken.user;
        console.log(req.user);
        next();
    });
};

module.exports = authenticateToken;
