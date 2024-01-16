// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import GameContainer from '../GameContainer';

const LandingPage = () => (
  <GameContainer>
    <h1>Gloablist Run</h1>
    <p>Ready to takedown the evil globalist?</p>
    <Link to="/level-selector" className="link-button">Start Game</Link>
  </GameContainer>
);

export default LandingPage;

