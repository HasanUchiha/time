import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Settings from './Settings';
import Info from './Info'; 
import Navbar from './Navbar';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/info" element={<Info />} /> {/* New Route */}
      </Routes>
    </div>
  );
};

export default App;
