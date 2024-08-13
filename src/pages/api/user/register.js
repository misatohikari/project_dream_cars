import connectToDatabase from '@/pages/utils/mongodb';
import User from '../../user-api/models/User';
import allowCors from '../../utils/cors';

const registerHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { userName, password } = req.body;

    try {
      // Ensure MongoDB connection
      await connectToDatabase();

      // Check if user already exists
      let user = await User.findOne({ userName });
      if (user) {
        return res.status(400).json({ msg: 'Username already exists' });
      }

      // Create new user
      user = new User({ userName, password });
      await user.save();

      res.json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error('Server error:', err);
      res.status(500).send('Server error');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default allowCors(registerHandler);
