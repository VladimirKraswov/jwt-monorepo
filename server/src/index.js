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

const users = [{ id: 1, username: 'user', password: 'password' }]; // Пример пользователей

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '7d' });
  user.refreshToken = refreshToken;
  return refreshToken;
};

app.use(cors()); // Добавлено использование CORS

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
