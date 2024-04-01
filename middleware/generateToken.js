const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
    const payload = {
        user: {
            id: user._id,
            name: user.username,
            email: user.email,
            role: user.role
        }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
};

module.exports = generateAuthToken;
