// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure the folder is named 'context'
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">DreamEstate</Link>

        <div className="navbar-links">
          <Link to="/home" className="navbar-link">Home</Link>
          <Link to="/about" className="navbar-link">About</Link>
          <Link to="/contact" className="navbar-link">Contact</Link>
        </div>

        <div className="navbar-buttons">
          {user ? (
            <>
              <Link to="/profile" className="user-icon" title="Profile">
                <span role="img" aria-label="user">👤</span> 
              </Link>
              <button onClick={handleLogout} className="navbar-button">Logout</button>
            </>
          ) : (
            <Link to="/login" className="navbar-button">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
