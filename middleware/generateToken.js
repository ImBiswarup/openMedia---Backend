const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
    const payload = {
        user: {
            name: user.username,
            email: user.email,
        }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
};

module.exports = generateAuthToken;