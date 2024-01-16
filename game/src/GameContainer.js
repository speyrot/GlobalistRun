// GameContainer.js
import React from 'react';
import './App.css';

const GameContainer = ({ children }) => (
  <div id="game-container">
    {children}
  </div>
);

export default GameContainer;