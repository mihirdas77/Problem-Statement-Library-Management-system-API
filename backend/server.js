// server.js (or your relevant backend file)
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());

// Example user data storage
const users = [];

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // Simple validation (expand as needed)
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required!' });
  }

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists!' });
  }

  // Store the user (in a real app, hash the password and save to DB)
  users.push({ email, password });
  res.status(201).json({ message: 'User registered successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
