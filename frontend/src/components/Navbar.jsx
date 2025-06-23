import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/home');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/home" className="navbar-logo" onClick={closeMenu}>
          DreamEstate
        </Link>

        {/* Hamburger Icon */}
        <button
          className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          type="button"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Overlay for mobile */}
        {menuOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}

        {/* Slide Menu */}
        <div
          className={`navbar-links${menuOpen ? ' show' : ''}`}
          ref={menuRef}
        >
          <Link to="/home" className="navbar-link" onClick={closeMenu}>Home</Link>
          <Link to="/about" className="navbar-link" onClick={closeMenu}>About</Link>
          <Link to="/contact" className="navbar-link" onClick={closeMenu}>Contact</Link>
          {user ? (
            <>
              <Link to="/profile" className="user-icon" title="Profile" onClick={closeMenu}>
                <span role="img" aria-label="user">👤</span>
              </Link>
              <button onClick={handleLogout} className="navbar-button">Logout</button>
            </>
          ) : (
            <Link to="/login" className="navbar-button" onClick={closeMenu}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
