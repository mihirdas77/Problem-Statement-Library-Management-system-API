const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new member
exports.register = async (req, res) => {
  const { username, password, name, email } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: 'User already exists.' });

  const user = new User({ username, password, name, email });
  await user.save();
  res.status(201).json({ message: 'User registered successfully.' });
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
};
