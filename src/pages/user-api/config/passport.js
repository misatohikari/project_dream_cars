const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
require('dotenv').config()

// const UserSchema = new mongoose.Schema({
//   userName: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
//   history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
// });

// const User = mongoose.model('User', UserSchema);

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.error(err);
        return done(err, false);
      }
    })
  );
};