const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// MongoDB connection (replace with your MongoDB URI)
mongoose.connect('mongodb://localhost/pollution_control_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Passport JWT configuration
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret' // Replace with a secure secret key
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => console.log(err));
}));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/challenges', require('./routes/challenges'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboard');

router.get('/', leaderboardController.getLeaderboard);

module.exports = router;