import connectToDatabase from '@/pages/utils/mongodb';
import User from '../../user-api/models/User';
import allowCors from '../../utils/cors';
import passport from 'passport';

// Initialize passport (assuming you have passport setup somewhere)
passport.initialize();

const authenticate = passport.authenticate('jwt', { session: false });

const historyHandler = async (req, res) => {
  if (req.method === 'GET') {
    // Use the authenticate middleware
    authenticate(req, res, async () => {
      try {
        // Ensure MongoDB connection
        await connectToDatabase();
        const user = await User.findById(req.user._id).populate('history');
        res.json(user.history);
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else if (req.method === 'PUT') {
    // Use the authenticate middleware
    authenticate(req, res, async () => {
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
  } else if (req.method === 'DELETE') {
    // Use the authenticate middleware
    authenticate(req, res, async () => {
      try {
        const user = await User.findById(req.user._id);
        user.history = user.history.filter(hist => hist.toString() !== req.body.id);
        await user.save();
        res.json(user.history);
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default allowCors(historyHandler);
