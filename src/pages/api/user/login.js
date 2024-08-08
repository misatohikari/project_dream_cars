// pages/api/user/login.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../user-api/models/User');
const passport = require('passport');

const authenticate = passport.authenticate('jwt', { session: false });

router.post('/', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id, userName: user.userName };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: 'Server error' });
      }
      res.json({ user: { id: user.id, userName: user.userName }, token: 'Bearer ' + token });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
