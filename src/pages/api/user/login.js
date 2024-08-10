import jwt from 'jsonwebtoken';
import User from '../../user-api/models/User'; // Ensure this path is correct
import passport from 'passport';
import allowCors from '../../utils/cors'; // Adjust path as needed

const authenticate = passport.authenticate('jwt', { session: false });

const loginHandler = async (req, res) => {
  console.log('MongoDB connection status in login:', req.mongoConnected);

  if (!req.mongoConnected) {
    return res.status(503).json({ message: 'Service unavailable: MongoDB not connected' });
  }

  console.log('Login request received:', req.body); // Log request body
  

  if (req.method === 'POST') {
    const { userName, password } = req.body;

    try {
      console.log('Finding user...'); // Log before DB operation
      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      console.log('Comparing password...'); // Log before password comparison
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      console.log('Signing JWT...'); // Log before signing JWT
      const payload = { id: user.id, userName: user.userName };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Server error' });
        }
        res.json({ user: { id: user.id, userName: user.userName }, token: 'Bearer ' + token });
      });
    } catch (err) {
      console.error('Server error:', err); // Log errors
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default allowCors(loginHandler);


// import jwt from 'jsonwebtoken';
// import User from '../../user-api/models/User'; // Ensure this path is correct
// import passport from 'passport';
// import allowCors from '../../utils/cors'; // Adjust path as needed

// const authenticate = passport.authenticate('jwt', { session: false });

// const loginHandler = async (req, res) => {
//   if (req.method === 'POST') {
//     const { userName, password } = req.body;

//     try {
//       const user = await User.findOne({ userName });
//       if (!user) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       const isMatch = await user.comparePassword(password);
//       if (!isMatch) {
//         return res.status(400).json({ message: 'Invalid credentials' });
//       }

//       const payload = { id: user.id, userName: user.userName };
//       jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
//         if (err) {
//           return res.status(500).json({ message: 'Server error' });
//         }
//         res.json({ user: { id: user.id, userName: user.userName }, token: 'Bearer ' + token });
//       });
//     } catch (err) {
//       res.status(500).json({ message: 'Server error' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// };

// export default allowCors(loginHandler);


// // pages/api/user/login.js
// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const User = require('../../user-api/models/User');
// const passport = require('passport');

// const authenticate = passport.authenticate('jwt', { session: false });

// router.post('/', async (req, res) => {
//   const { userName, password } = req.body;

//   try {
//     const user = await User.findOne({ userName });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const payload = { id: user.id, userName: user.userName };
//     jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
//       if (err) {
//         return res.status(500).json({ message: 'Server error' });
//       }
//       res.json({ user: { id: user.id, userName: user.userName }, token: 'Bearer ' + token });
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
