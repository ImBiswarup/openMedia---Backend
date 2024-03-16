const User = require('../models/User');
const bcrypt = require('bcrypt');

const signupHandler = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({ email, name, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}; // Assuming User model is defined in a separate file

const logInHandler = async (req, res) => {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const existingUser = await User.findOne({ email });

        // If user doesn't exist, return error
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare passwords securely
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        // If password is invalid, return error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Successful login
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { logInHandler, signupHandler };
