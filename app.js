import React, { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import Badges from './Badges';
import Rewards from './Rewards';
import Challenges from './Challenges';

export function App() {
  const [user, setUser] = useState({
    name: 'John Doe',
    points: 0,
    badges: [],
    rewards: []
  });
}