// pages/api/user/favorites.js
const express = require('express');
const router = express.Router();
const User = require('../../user-api/models/User');
const passport = require('passport');

const authenticate = passport.authenticate('jwt', { session: false });

router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.favorites.includes(req.body.id)) {
      user.favorites.push(req.body.id);
      await user.save();
    }
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(fav => fav.toString() !== req.body.id);
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
