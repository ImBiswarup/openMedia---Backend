// controllers/User.js

const User = require('../models/User');
const bcrypt = require('bcrypt');

// Signup Handler
const signupHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ msg: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ msg: error })
  }
};

// Login Handler
const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Incorrect password' });
    }

    res.status(200).json({ msg: 'Login successful' });
  } catch (error) {
    res.status(400).json({ msg: error })
  }
};

module.exports = { signupHandler, loginHandler };
