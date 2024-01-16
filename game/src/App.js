// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import LevelSelector from './Components/LevelSelector';
import Game from './Components/Game';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/level-selector" element={<LevelSelector />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </Router>
);

export default App;