const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ error: 'Unauthorized: No token provided', msg: 'Please login first' });
    }

    const newToken = token.split(" ")[1];

    jwt.verify(newToken, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden: Invalid token', msg: 'Please login first' });
        }
        req.user = decodedToken.user;
        next();
    });
};

module.exports = authenticateToken;
