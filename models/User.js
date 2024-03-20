const { mongoose, Schema } = require("mongoose");
// const bcrypt = require('bcrypt');
const { createHmac, randomBytes } = require("crypto");

const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("No user found...");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    console.log("password: ", hashedPassword, userProvidedHash);

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect password...");

    const token = createTokenForUser(user);
    return token;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
