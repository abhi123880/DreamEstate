import React from "react";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h2 className="footer-title">DreamEstate</h2>
          <p className="footer-text">Find your dream home with ease and confidence.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h4 className="footer-subtitle">Quick Links</h4>
          <div className="footer-links-row">
            <a href="/home" className="footer-link">Home</a>
            <a href="/about" className="footer-link">About</a>
            <a href="/contact" className="footer-link">Contact</a>
            <a href="/profile" className="footer-link">My Account</a>
          </div>
        </div>
        <div className="footer-column">
          <h4 className="footer-subtitle">Contact Us</h4>
          <p className="footer-text">Feel free to reach out to us for any inquiries:</p>
          <p className="footer-text">📍 123 Dream Estate St., Cityville, USA</p>
          <p className="footer-text">📞 Phone: (123) 456-7890</p>
          <p className="footer-text">📧 Email: contact@dreamestate.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} DreamEstate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
