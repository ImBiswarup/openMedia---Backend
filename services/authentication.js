var JWT = require('jsonwebtoken');

const secretKey = "BiswarupGhosh";

function createTokenForUser(user) {
    const payload = {
        name: user.name,
        _id: user._id,
        email: user.email,
        imageUrl: user.imageUrl,
    };
    const token = JWT.sign(payload, secretKey);
    return token;
}

function validateToken(token) {
    const payload = JWT.verify(token, secretKey);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}