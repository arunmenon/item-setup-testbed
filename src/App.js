// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
