const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const app = express();

let users = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.get('/check-auth', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});


app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).json({ message: 'Username already exists!' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  users[username] = { username, password: hashedPassword };
  res.status(200).json({ message: 'Registration successful!' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.user = user;
    return res.status(200).json({ message: 'Login successful!' });
  }
  res.status(401).json({ message: 'Invalid username or password!' });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out successfully!' });
});

app.post('/updateProfile', (req, res) => {
  const { username, newPassword } = req.body;
  if (!users[username]) {
    return res.status(404).json({ message: 'User not found!' });
  }
  const hashedPassword = bcrypt.hashSync(newPassword, 10);
  users[username].password = hashedPassword;
  res.status(200).json({ message: 'Profile updated successfully!' });
});

module.exports = {
  path: '/api',
  handler: app
};
