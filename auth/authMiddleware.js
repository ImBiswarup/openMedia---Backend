const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('headers: ', req.headers.authorization)


    console.log("object2")

    const newToken = token.split(" ")[1];
    console.log('new token:', newToken)

    if (!newToken) {
        console.log("object")
        return res.status(401).json({ msg: 'Unauthorized: No token provided' });
    }
    jwt.verify(newToken, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log('decoded: ', decodedToken);
        console.log(err)
        console.log(process.env.JWT_SECRET)
        if (err) {
            return res.status(403).json({ msg: 'Forbidden: Invalid token' });
        }
        req.user = decodedToken.user;
        console.log('user: ', req.user);
        next();
    });

};

module.exports = authenticateToken;