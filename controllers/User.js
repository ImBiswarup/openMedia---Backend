const generateAuthToken = require('../middleware/generateToken');
const User = require('../models/User');
const bcrypt = require('bcrypt');


const signupHandler = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, email, password: hashedPassword });

    const token = generateAuthToken(newUser);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ msg: 'Signup successful', user: newUser, token });

  } catch (error) {
    res.status(400).json({ msg: error })
  }
};


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

    const token = generateAuthToken(user);

    res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ msg: error })
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: 'No users found' });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signupHandler, loginHandler, getUsers };
