// pages/api/user/history.js
const express = require('express');
const router = express.Router();
const User = require('../../user-api/models/User');
const passport = require('passport');

const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('history');
    res.json(user.history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.history.includes(req.body.id)) {
      user.history.push(req.body.id);
      await user.save();
    }
    res.json(user.history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.history = user.history.filter(hist => hist.toString() !== req.body.id);
    await user.save();
    res.json(user.history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
