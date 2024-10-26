const Challenge = require('../models/challenge');
const User = require('../models/user');

exports.getDailyChallenge = async (req, res) => {
  try {
    // Logic to get or generate a daily challenge
    const challenge = await Challenge.findOne().sort({ createdAt: -1 });
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily challenge', error: error.message });
  }
};

exports.completeChallenge = async (req, res) => {
  try {
    const { challengeId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (user.completedChallenges.includes(challengeId)) {
      return res.status(400).json({ message: 'Challenge already completed' });
    }

    user.completedChallenges.push(challengeId);
    user.points += challenge.points;
    await user.save();

    res.json({ message: 'Challenge completed successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error completing challenge', error: error.message });
  }
};
const Challenge = require('../models/challenge');
const User = require('../models/user');

exports.getDailyChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findOne().sort({ createdAt: -1 });
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching daily challenge', error: error.message });
  }
};

exports.completeChallenge = async (req, res) => {
  try {
    const { challengeId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const challenge = await Challenge.findById(challengeId);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (user.completedChallenges.includes(challengeId)) {
      return res.status(400).json({ message: 'Challenge already completed' });
    }

    user.completedChallenges.push(challengeId);
    user.points += challenge.points;
    await user.save();

    res.json({ message: 'Challenge completed successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error completing challenge', error: error.message });
  }
};