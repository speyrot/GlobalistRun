// LevelSelector.js
import React from 'react';
import { Link } from 'react-router-dom';
import GameContainer from '../GameContainer';
import './LevelSelector.css'; 

const LevelSelector = () => (
    <GameContainer>
      <div className="level-selector-container">
        <h2>Select a Level</h2>
        <div className="level-grid">
          {[...Array(15)].map((_, index) => (
            <Link 
              key={index} 
              to={`/game?level=${index + 1}`} // Pass the level number in the URL
              className="level-tile"
            >
              Level {index + 1}
            </Link>
          ))}
        </div>
      </div>
    </GameContainer>
);

export default LevelSelector;