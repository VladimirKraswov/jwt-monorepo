const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5001;
const SECRET_KEY = process.env.SECRET_KEY || 'your-256-bit-secret';

const users = [
  { id: 1, username: 'user', password: 'password', isAdmin: false },
  { id: 2, username: 'admin', password: 'adminpassword', isAdmin: true }
];

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '7d' });
  user.refreshToken = refreshToken;
  return refreshToken;
};

app.use(cors());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({ accessToken, refreshToken });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/register', (req, res) => {
  const { username, password, isAdmin } = req.body;
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { id: users.length + 1, username, password, isAdmin };
  users.push(newUser);
  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);
  res.json({ accessToken, refreshToken });
});

app.post('/api/token', (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
