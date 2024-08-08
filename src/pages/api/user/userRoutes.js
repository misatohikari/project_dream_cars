

// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const User = require('../../user-api/models/User');

// const authenticate = passport.authenticate('jwt', { session: false });

// router.post('/register', async (req, res) => {
//   try {
//       console.log('Register endpoint hit');
//       const { userName, password } = req.body;
//       console.log(`Received username: ${userName}, password: ${password}`);
//       let user = await User.findOne({ userName });
//       if (user) {
//           console.log('User already exists');
//           return res.status(400).json({ msg: 'Username already exists' });
//       }
//       user = new User({ userName, password });
//       await user.save();
//       console.log('User registered successfully');
//       res.json({ msg: 'User registered successfully' });
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//   }
// });

// router.post('/login', async (req, res) => {
//   console.log('/login route is called in the userRoute.js');
//   const { userName, password } = req.body;
//   console.log(`Login attempt with username: ${userName}`);
  
//   try {
//     const user = await User.findOne({ userName });
//     if (!user) {
//       console.log('No user found with that username');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       console.log('Password does not match');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const payload = { id: user.id, userName: user.userName };
//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 3600 },
//       (err, token) => {
//         if (err) {
//           console.log('Error generating token:', err);
//           return res.status(500).json({ message: 'Server error' });
//         }
//         console.log('Login successful, token generated');
//         res.json({ user: { id: user.id, userName: user.userName }, token: 'Bearer ' + token });
//       }
//     );
//   } catch (err) {
//     console.error('Server error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// router.get('/favorites', authenticate, async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id).populate('favorites');
//       res.json(user.favorites);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

//   router.put('/favorites/:id', authenticate, async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id);
//       if (!user.favorites.includes(req.params.id)) {
//         user.favorites.push(req.params.id);
//         await user.save();
//       }
//       res.json(user.favorites);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   router.delete('/favorites/:id', authenticate, async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id);
//       user.favorites = user.favorites.filter(fav => fav.toString() !== req.params.id);
//       await user.save();
//       res.json(user.favorites);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   router.get('/history', authenticate, async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id).populate('history');
//       res.json(user.history);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   router.put('/history/:id', authenticate, async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id);
//       if (!user.history.includes(req.params.id)) {
//         user.history.push(req.params.id);
//         await user.save();
//       }
//       res.json(user.history);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   router.delete('/history/:id', authenticate, async (req, res) => {
//     try {
//       const user = await User.findById(req.user._id);
//       user.history = user.history.filter(hist => hist.toString() !== req.params.id);
//       await user.save();
//       res.json(user.history);
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

// module.exports = router;
