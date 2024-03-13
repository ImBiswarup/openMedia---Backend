const express = require('express');
const router = express.Router();
const User = require('../models/User');


const signinHandler = async (req, res, next) => {
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
}

const signupHandler = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({ email, name, password });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' }
            // .redirect('/log-in')
        );
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { signinHandler, signupHandler };