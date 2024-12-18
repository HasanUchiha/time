import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Time Tracker</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/info">Info</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;