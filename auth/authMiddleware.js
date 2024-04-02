const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('headers: ', req.headers.authorization)

    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log('decoded: ', decodedToken);
        if (err) {
            return res.status(403).json({ msg: 'Forbidden: Invalid token' });
        }
        req.user = decodedToken.user;
        console.log('user: ', req.user);
        next();
    });

};

module.exports = authenticateToken;