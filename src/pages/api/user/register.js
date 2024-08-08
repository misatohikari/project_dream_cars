// pages/api/user/register.js
const express = require('express');
const router = express.Router();
const User = require('../../user-api/models/User');

router.post('/', async (req, res) => {
  const { userName, password } = req.body;

  try {
    let user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    user = new User({ userName, password });
    await user.save();
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
